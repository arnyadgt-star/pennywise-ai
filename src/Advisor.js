/* Local finance advisor: reads the user's data and answers in plain language.
   No network needed. (An optional external AI endpoint can be set in Settings.) */

const pad = (n) => String(n).padStart(2, "0");
const monthKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
const pct = (n) => `${Math.round(n)}%`;

export const SUGGESTIONS = [
  "How am I doing?",
  "Where does my money go?",
  "How can I save more?",
  "Check my budgets",
  "When will I reach my goals?",
  "Can I afford 5000?",
  "Is my emergency fund enough?",
  "Should I invest?",
];

export function analyze(transactions, budgets, goals) {
  const now = new Date();
  const thisMk = monthKey(now);
  const lastMk = monthKey(new Date(now.getFullYear(), now.getMonth() - 1, 1));

  const sum = (type, m) =>
    transactions
      .filter((t) => t.type === type && (!m || t.date.startsWith(m)))
      .reduce((s, t) => s + t.amount, 0);
  const byCat = (m) => {
    const o = {};
    transactions
      .filter((t) => t.type === "expense" && t.date.startsWith(m))
      .forEach((t) => (o[t.category] = (o[t.category] || 0) + t.amount));
    return o;
  };

  const income = sum("income", thisMk);
  const expenses = sum("expense", thisMk);
  const lastIncome = sum("income", lastMk);
  const lastExpenses = sum("expense", lastMk);
  const balance = sum("income") - sum("expense");
  const savings = income - expenses;
  const rate = income > 0 ? (savings / income) * 100 : null;
  const cats = byCat(thisMk);
  const lastCats = byCat(lastMk);
  const topCats = Object.entries(cats).sort((a, b) => b[1] - a[1]);

  const budgetStatus = budgets.map((b) => {
    const spent = cats[b.name] || 0;
    return { ...b, spent, pct: b.amount ? (spent / b.amount) * 100 : 0 };
  });
  const over = budgetStatus.filter((b) => b.pct >= 100);
  const near = budgetStatus.filter((b) => b.pct >= 80 && b.pct < 100);

  const months = [0, 1, 2]
    .map((i) => monthKey(new Date(now.getFullYear(), now.getMonth() - i, 1)))
    .map((m) => ({ income: sum("income", m), expenses: sum("expense", m) }))
    .filter((m) => m.income || m.expenses);
  const avgExpense = months.length ? months.reduce((s, m) => s + m.expenses, 0) / months.length : 0;
  const avgSavings = months.length
    ? months.reduce((s, m) => s + m.income - m.expenses, 0) / months.length
    : 0;
  const coverMonths = avgExpense > 0 ? balance / avgExpense : null;

  const goalsInfo = goals.map((g) => {
    const remaining = Math.max(0, g.target - g.saved);
    return {
      ...g,
      remaining,
      pct: g.target ? (g.saved / g.target) * 100 : 0,
      months: remaining === 0 ? 0 : avgSavings > 0 ? Math.ceil(remaining / avgSavings) : null,
    };
  });

  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const projected = (expenses / now.getDate()) * daysInMonth;

  return {
    hasData: transactions.length > 0,
    income, expenses, lastIncome, lastExpenses, balance, savings, rate,
    cats, lastCats, topCats, budgetStatus, over, near,
    avgExpense, avgSavings, coverMonths, goalsInfo, projected,
  };
}

export function botStatus(s) {
  if (!s.hasData)
    return { mood: "curious", count: 0, message: "Add your first transaction and I'll start coaching you." };
  if (s.over.length)
    return {
      mood: "worried",
      count: s.over.length + s.near.length,
      message: `${s.over[0].name} budget is over its limit. Tap to see what to do.`,
    };
  if (s.income > 0 && s.savings < 0)
    return { mood: "worried", count: 1, message: "You're spending more than you earn this month." };
  if (s.near.length)
    return {
      mood: "alert",
      count: s.near.length,
      message: `${s.near[0].name} is at ${pct(s.near[0].pct)} of its budget.`,
    };
  if (s.rate !== null && s.rate >= 20)
    return { mood: "happy", count: 0, message: `Saving ${pct(s.rate)} of your income. Great pace!` };
  return { mood: "calm", count: 0, message: "All synced. Ask me anything about your money." };
}

function parseAmount(q) {
  const m = q.replace(/,/g, "").match(/(\d+(?:\.\d+)?)\s*(k|thousand|lakhs?|lacs?|l|crores?|cr)?\b/);
  if (!m) return null;
  let n = parseFloat(m[1]);
  const u = m[2];
  if (u === "k" || u === "thousand") n *= 1e3;
  else if (u && /^(l|lac|lacs|lakh|lakhs)$/.test(u)) n *= 1e5;
  else if (u && /^(cr|crore|crores)$/.test(u)) n *= 1e7;
  return n > 0 ? n : null;
}

export function answer(question, s, fmt, name = "there") {
  const q = question.toLowerCase().trim();
  const has = (...w) => w.some((x) => q.includes(x));

  if (/^(hi|hello|hey|yo|namaste)\b/.test(q)) {
    const st = botStatus(s);
    return `Hey ${name}! ${st.message}\nTry "How am I doing?" or ask me whether you can afford something.`;
  }
  if (has("thank")) return "Anytime! Small, steady habits are what move the needle.";

  if (!s.hasData)
    return `I don't have any transactions yet, ${name}. Add a few on the Transactions page and I can start spotting patterns.`;

  // Affordability
  if (has("afford", "buy", "purchase", "splurge", "worth it")) {
    const cost = parseAmount(q);
    if (!cost)
      return `Tell me the price, for example "Can I afford 25000?", and I'll check it against your balance, budgets and savings pace.`;
    if (cost > s.balance) {
      const m = s.avgSavings > 0 ? Math.ceil((cost - s.balance) / s.avgSavings) : null;
      return `Not right now. ${fmt(cost)} is more than your balance of ${fmt(s.balance)}.\n${
        m
          ? `At your current pace (about ${fmt(s.avgSavings)} saved per month) you could cover it in roughly ${m} month${m > 1 ? "s" : ""}. Consider making it a savings goal.`
          : "Your monthly savings are at or below zero, so the first step is to get income above spending."
      }`;
    }
    const after = s.balance - cost;
    const cover = s.avgExpense > 0 ? after / s.avgExpense : null;
    const share = (cost / s.balance) * 100;
    const verdict =
      share <= 10 && s.savings >= 0
        ? "Yes, you can afford it comfortably."
        : share <= 30
          ? "You can afford it, but it's a noticeable chunk. Sleep on it for 48 hours."
          : "Technically yes, but it uses a big share of your balance. I'd wait or save toward it.";
    return `${verdict}\n• It's ${pct(share)} of your balance\n• You'd have ${fmt(after)} left${
      cover !== null ? `, about ${cover.toFixed(1)} months of expenses` : ""
    }${s.over.length ? `\n• Heads up: ${s.over[0].name} is already over budget this month.` : ""}`;
  }

  // Emergency fund
  if (has("emergency", "rainy", "cushion", "runway")) {
    if (s.avgExpense <= 0) return "Add some expenses first, then I can size an emergency fund for you.";
    const low = s.avgExpense * 3;
    const high = s.avgExpense * 6;
    const c = s.coverMonths ?? 0;
    return `A solid emergency fund is 3–6 months of expenses: ${fmt(low)} to ${fmt(high)}.\nYour balance covers about ${c.toFixed(1)} months right now. ${
      c >= 6 ? "You're well covered." : c >= 3 ? "You're in the safe zone. Aim for 6 months when you can." : `Build it up to ${fmt(low)} before taking on risk.`
    }`;
  }

  // 50/30/20
  if (has("50/30/20", "50 30 20")) {
    if (s.income <= 0) return "Add this month's income so I can compare you to the 50/30/20 rule.";
    const needsCats = ["Housing", "Health", "Transport", "Education"];
    const needs = needsCats.reduce((t, c) => t + (s.cats[c] || 0), 0);
    const wants = s.expenses - needs;
    return `The 50/30/20 rule: 50% needs, 30% wants, 20% savings. This month you're at:\n• Needs: ${pct((needs / s.income) * 100)} (${fmt(needs)})\n• Wants: ${pct((wants / s.income) * 100)} (${fmt(wants)})\n• Savings: ${pct((s.savings / s.income) * 100)} (${fmt(s.savings)})`;
  }

  // Investing
  if (has("invest", "sip", "mutual", "stock", "fixed deposit", "crypto")) {
    const c = s.coverMonths ?? 0;
    return `General guidance (not licensed financial advice):\n1. Keep 3–6 months of expenses as an emergency fund first. You have about ${c.toFixed(1)} months.\n2. Clear any high-interest debt.\n3. Then invest regularly (a monthly SIP into low-cost index funds is a common start), based on your time horizon.\n${
      s.savings > 0 ? `You're saving about ${fmt(s.savings)} this month, which is a good amount to automate.` : "First, get monthly savings above zero."
    }`;
  }

  // Debt
  if (has("debt", "loan", "emi", "credit card")) {
    return `Tips for debt:\n• Pay the highest-interest debt first, and always make the minimums.\n• Keep total EMIs under about 35% of income${
      s.income ? ` (that's ${fmt(s.income * 0.35)} for you this month)` : ""
    }.\n• Log EMIs as expenses so I can include them in your advice.`;
  }

  // Goals
  if (has("goal", "target", "dream")) {
    if (!s.goalsInfo.length) return "You have no goals yet. Create one on the Goals page and I'll estimate when you'll reach it.";
    return `Here's where your goals stand:\n${s.goalsInfo
      .map(
        (g) =>
          `• ${g.name}: ${pct(g.pct)} (${fmt(g.saved)} of ${fmt(g.target)}). ${
            g.remaining === 0 ? "Done!" : g.months ? `About ${g.months} month${g.months > 1 ? "s" : ""} to go at your pace.` : "Raise your monthly savings to make progress."
          }`
      )
      .join("\n")}`;
  }

  // Budgets
  if (has("budget", "limit", "overspen")) {
    if (!s.budgetStatus.length) return "You haven't set any budgets yet. Create a few on the Budgets page and I'll keep watch.";
    return `Budget check for this month:\n${s.budgetStatus
      .map(
        (b) =>
          `• ${b.name}: ${fmt(b.spent)} of ${fmt(b.amount)} (${pct(b.pct)})${b.pct >= 100 ? " ⚠ over" : b.pct >= 80 ? " ⚠ close" : ""}`
      )
      .join("\n")}${
      s.over.length ? `\nBiggest worry: ${s.over[0].name}. Pause non-essential spending there for the rest of the month.` : ""
    }`;
  }

  // Saving advice
  if (has("save", "saving", "cut", "reduce", "cheaper", "tip", "advice", "improve")) {
    const tips = [];
    if (s.rate !== null && s.rate < 20)
      tips.push(`Aim to save 20% of income (${fmt(s.income * 0.2)}). You're at ${pct(s.rate)}.`);
    const flex = s.topCats.find(([c]) => c !== "Housing");
    if (flex) tips.push(`Trim ${flex[0]} by 10–15%. That frees up about ${fmt(flex[1] * 0.12)} a month.`);
    if (s.over.length) tips.push(`Get ${s.over[0].name} back under its limit first.`);
    tips.push("Automate savings on payday so it moves before you can spend it.");
    return `Here's how I'd save more, ${name}:\n${tips.map((t) => `• ${t}`).join("\n")}`;
  }

  // Spending
  if (has("spend", "expense", "where", "category", "money go")) {
    if (!s.topCats.length) return "No expenses recorded this month yet.";
    const lines = s.topCats
      .slice(0, 4)
      .map(([c, a]) => `• ${c}: ${fmt(a)} (${pct((a / s.expenses) * 100)})`)
      .join("\n");
    const [tc, ta] = s.topCats[0];
    const prev = s.lastCats[tc] || 0;
    const delta = prev ? ` That's ${ta >= prev ? "up" : "down"} ${pct((Math.abs(ta - prev) / prev) * 100)} from last month.` : "";
    return `This month you've spent ${fmt(s.expenses)}. Top categories:\n${lines}\n${tc} is your biggest.${delta}\nAt this pace you'll end the month near ${fmt(s.projected)}.`;
  }

  // Summary
  if (has("how am i", "doing", "summary", "overview", "status", "balance", "snapshot")) {
    const verdict =
      s.rate === null
        ? "No income recorded this month yet."
        : s.rate >= 20
          ? "That's a healthy savings rate. Keep it up!"
          : s.rate >= 0
            ? "You're in the green, with room to save more."
            : "You're spending more than you earn this month. Let's fix that.";
    return `Here's your snapshot, ${name}:\n• Balance: ${fmt(s.balance)}\n• This month: ${fmt(s.income)} in, ${fmt(s.expenses)} out\n• Savings rate: ${s.rate === null ? "n/a" : pct(s.rate)}\n${verdict}${
      s.over.length ? `\n⚠ ${s.over.length} budget${s.over.length > 1 ? "s are" : " is"} over the limit.` : ""
    }`;
  }

  return `I can help with things like:\n• "How am I doing?"\n• "Where does my money go?"\n• "How can I save more?"\n• "Can I afford 20000?"\n• "Check my budgets" or "When will I reach my goals?"\nWhat would you like to know?`;
}