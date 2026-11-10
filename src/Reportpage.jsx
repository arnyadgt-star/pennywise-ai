import { BarChart3, Download } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function ReportsPage({ transactions, series, fmt, compact, colorFor, onExport }) {
  const byCat = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => (byCat[t.category] = (byCat[t.category] || 0) + t.amount));
  const cats = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
  const total = cats.reduce((s, [, a]) => s + a, 0);

  return (
    <>
      <div className="page-intro">
        <div>
          <h1>Reports</h1>
          <p className="muted">See how your money moved over the last six months.</p>
        </div>
        <button className="ghost-button" onClick={onExport}>
          <Download size={16} /> Export CSV
        </button>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Income vs expenses</h2>
            <p className="muted">Last 6 months</p>
          </div>
          <BarChart3 size={22} />
        </div>
        <div className="summary-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={series} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#292b45" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" stroke="#6b6e8f" tickLine={false} />
              <YAxis stroke="#6b6e8f" tickLine={false} axisLine={false} tickFormatter={compact} width={52} />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,.04)" }}
                contentStyle={{ background: "#14162a", border: "1px solid #262942", borderRadius: "12px", color: "#fff" }}
                formatter={(v) => fmt(v)}
              />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#60a5fa" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#fb7185" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h2>Monthly summary</h2>
        </div>
        <div className="table-scroll">
          <table className="rep-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Income</th>
                <th>Expenses</th>
                <th>Saved</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {[...series].reverse().map((m) => (
                <tr key={m.month}>
                  <td>{m.month}</td>
                  <td>{fmt(m.income)}</td>
                  <td>{fmt(m.expenses)}</td>
                  <td className={m.savings >= 0 ? "positive" : "negative"}>{fmt(m.savings)}</td>
                  <td>{m.income ? `${Math.round((m.savings / m.income) * 100)}%` : "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Where it all went</h2>
            <p className="muted">All-time spending by category</p>
          </div>
        </div>
        {cats.length === 0 ? (
          <p className="muted">No expenses recorded yet.</p>
        ) : (
          <div className="budget-list">
            {cats.map(([name, amount]) => (
              <div key={name}>
                <div className="goal-top">
                  <strong>{name}</strong>
                  <span>
                    {fmt(amount)} · {((amount / total) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="progress-track" style={{ marginTop: 8 }}>
                  <div
                    className="progress-fill"
                    style={{ width: `${(amount / total) * 100}%`, background: colorFor(name) }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}