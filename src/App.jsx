import { useEffect, useMemo, useRef, useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Home,
  ArrowLeftRight,
  PieChart,
  Target,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Bell,
  Search,
  Sun,
  Sparkles,
  Leaf,
  Coffee,
  Car,
  ShoppingBag,
  Tv,
  GraduationCap,
  HeartPulse,
  Banknote,
  Briefcase,
  ShieldCheck,
  Plane,
  CircleDollarSign,
  Receipt,
  X,
  BarChart3,
  Settings as SettingsIcon,
  Save,
  PanelLeftClose,
  PanelLeftOpen,
  Download,
  Upload,
  RotateCcw,
  Send,
  Landmark,
  CalendarClock,
  Lock,
  BookOpen,
  CheckCircle2,
  Clock,
  Pencil,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceDot,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-synthesis: none; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased;
  --bg: #0b0c19; --surface: #131529; --surface-2: #1a1d37; --line: #252846;
  --text: #f2f2fb; --muted: #9496b4; --faint: #686b8d;
  --accent: #a78bfa; --accent-strong: #7c4dff;
  --green: #34d399; --red: #fb7185; --blue: #60a5fa; --amber: #fbbf24;
  --r-sm: 8px; --r-md: 12px; --r-lg: 20px;
  --shadow: 0 18px 44px rgba(0, 0, 0, .45);
  --ring: 0 0 0 3px color-mix(in srgb, var(--accent-strong) 30%, transparent);
  color: var(--text); background: var(--bg);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #root { height: 100%; }
body { min-width: 320px; overflow: hidden; background: var(--bg); color: var(--text); }
button, input, select { font: inherit; color: inherit; }
button { cursor: pointer; }
::selection { background: color-mix(in srgb, var(--accent-strong) 45%, transparent); }
button:focus-visible, input:focus-visible, select:focus-visible, .stat-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
.muted { color: var(--muted); font-size: 13px; line-height: 1.6; }
.positive { color: var(--green); }
.negative { color: var(--red); }
.r { text-align: right; font-variant-numeric: tabular-nums; }

/* ============ layout: sidebar is fixed, only the page scrolls ============ */
.app { display: flex; height: 100vh; height: 100dvh; overflow: hidden; background: var(--bg); }
.main { flex: 1; min-width: 0; height: 100%; padding: 0 40px; overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--line) transparent; }
.page-content { max-width: 1400px; margin: 0 auto; padding-bottom: 56px; }

/* ============ sidebar ============ */
.sidebar { position: relative; flex-shrink: 0; width: 248px; height: 100%; padding: 18px 14px 14px; display: flex; flex-direction: column; z-index: 20; background: linear-gradient(180deg, #10112a, #0d0e1f); border-right: 1px solid var(--line); transition: width .25s ease, padding .25s ease; }
.sidebar-collapsed { width: 76px; padding: 18px 10px 14px; }
.logo-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 46px; margin-bottom: 22px; }
.sidebar-collapsed .logo-row { justify-content: center; }
.logo { display: flex; align-items: center; gap: 10px; min-width: 0; }
.logo-icon { width: 40px; height: 40px; flex-shrink: 0; display: grid; place-items: center; border-radius: 12px; color: #fff; background: linear-gradient(135deg, color-mix(in srgb, var(--accent-strong) 65%, #6d8dff), var(--accent-strong)); box-shadow: 0 8px 20px color-mix(in srgb, var(--accent-strong) 35%, transparent); transition: opacity .18s ease; }
.brand { font-size: 19px; font-weight: 800; letter-spacing: -.03em; white-space: nowrap; }
.logo-accent { color: var(--accent); }
.sidebar-close { flex-shrink: 0; width: 32px; height: 32px; display: grid; place-items: center; border-radius: 10px; border: 1px solid var(--line); background: var(--surface); color: var(--muted); transition: color .15s, background .15s, border-color .15s; }
.sidebar-close:hover { color: var(--text); background: var(--surface-2); border-color: var(--accent); }
.logo-toggle { position: relative; width: 44px; height: 44px; display: grid; place-items: center; border: none; border-radius: 14px; background: none; padding: 0; }
.logo-toggle > * { grid-area: 1 / 1; }
.logo-open { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 13px; color: #fff; background: var(--surface-2); border: 1px solid var(--accent); opacity: 0; transform: scale(.92); transition: opacity .18s ease, transform .18s ease; }
.logo-toggle:hover .logo-icon, .logo-toggle:focus-visible .logo-icon { opacity: 0; }
.logo-toggle:hover .logo-open, .logo-toggle:focus-visible .logo-open { opacity: 1; transform: none; }

.nav-scroll { flex: 1; min-height: 0; overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: none; }
.nav-scroll::-webkit-scrollbar { display: none; }
.nav-group + .nav-group { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--line); }
.navigation { display: flex; flex-direction: column; gap: 3px; }
.menu-item { position: relative; width: 100%; min-height: 42px; display: flex; align-items: center; gap: 12px; padding: 9px 12px; border: none; border-radius: 12px; background: transparent; color: var(--muted); text-align: left; font-size: 13.5px; font-weight: 600; line-height: 1.25; transition: background .15s, color .15s; }
.menu-item svg { flex-shrink: 0; }
.menu-item:hover:not(.active) { color: var(--text); background: var(--surface); }
.menu-item.active { color: #fff; background: linear-gradient(100deg, var(--accent-strong), color-mix(in srgb, var(--accent-strong) 38%, #0c0d1a)); box-shadow: 0 8px 22px color-mix(in srgb, var(--accent-strong) 32%, transparent), inset 0 1px 0 rgba(255, 255, 255, .12); }
.nav-badge { margin-left: auto; min-width: 20px; height: 20px; padding: 0 6px; display: grid; place-items: center; border-radius: 999px; background: var(--red); color: #fff; font-size: 11px; font-style: normal; font-weight: 800; }
.sidebar-collapsed .menu-item span { display: none; }
.sidebar-collapsed .navigation { align-items: center; }
.sidebar-collapsed .menu-item { width: 46px; height: 44px; min-height: 44px; padding: 0; justify-content: center; }
.sidebar-collapsed .nav-badge { position: absolute; top: 3px; right: 3px; min-width: 16px; height: 16px; padding: 0 4px; font-size: 10px; }

/* ============ top bar ============ */
.topbar { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; gap: 14px; min-height: 72px; margin-bottom: 26px; background: rgba(11, 12, 25, .82); backdrop-filter: blur(16px); border-bottom: 1px solid var(--line); }
.search-box { display: flex; align-items: center; gap: 8px; width: min(280px, 100%); height: 44px; padding-left: 14px; border: 1px solid var(--line); border-radius: 14px; background: var(--surface); color: var(--faint); transition: border-color .15s, box-shadow .15s; }
.search-box:focus-within { border-color: var(--accent); box-shadow: var(--ring); }
.search-box input { flex: 1; min-width: 0; height: 100%; padding: 0 14px 0 0; border: none; background: transparent; outline: none; font-size: 14px; }
.search-box input::placeholder { color: var(--faint); }
.topsearch { flex: 1; width: auto; max-width: 560px; }
.topbar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }
.profile { display: flex; align-items: center; gap: 10px; padding: 5px 8px 5px 5px; border: none; border-radius: 14px; background: transparent; text-align: left; transition: background .15s; }
.profile:hover { background: var(--surface); }
.avatar { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 50%; color: #fff; font-size: 12px; font-weight: 800; background: linear-gradient(135deg, color-mix(in srgb, var(--accent-strong) 65%, #6d8dff), var(--accent-strong)); }
.profile-text { display: flex; flex-direction: column; line-height: 1.3; }
.profile-text strong { font-size: 14px; }
.profile-text small { color: var(--muted); font-size: 12px; }
.bell { position: relative; }
.bell-dot { position: absolute; top: 7px; right: 8px; width: 8px; height: 8px; border-radius: 50%; background: var(--red); box-shadow: 0 0 0 2px var(--bg); }
.notif-wrap { position: relative; }
.notif { position: absolute; right: 0; top: calc(100% + 10px); z-index: 200; width: 310px; max-width: calc(100vw - 32px); display: flex; flex-direction: column; gap: 6px; padding: 12px; border-radius: 18px; background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow); }
.notif strong { padding: 2px 4px 6px; font-size: 14px; }
.notif p { padding: 4px; }
.notif button { padding: 10px 12px; border: none; border-radius: 10px; background: var(--surface-2); text-align: left; font-size: 13px; line-height: 1.4; }
.notif button:hover { background: var(--bg); }

/* ============ shared building blocks ============ */
.page-intro { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin: 8px 0 26px; }
.page-intro h1 { font-size: clamp(24px, 2.6vw, 32px); font-weight: 800; letter-spacing: -.035em; line-height: 1.15; }
.page-icon { width: 58px; height: 58px; display: grid; place-items: center; border-radius: 18px; color: var(--accent); background: linear-gradient(145deg, var(--surface-2), var(--surface)); border: 1px solid var(--line); }
.panel { min-width: 0; margin-bottom: 20px; padding: 26px; border-radius: 22px; border: 1px solid var(--line); background: linear-gradient(180deg, var(--surface), color-mix(in srgb, var(--surface) 88%, #000)); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .03); }
.panel-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 22px; }
.panel-heading h2 { font-size: 17px; font-weight: 700; letter-spacing: -.02em; }
.panel-heading > svg { color: var(--faint); }
.with-icon { display: flex; align-items: center; gap: 8px; }
.with-icon svg { color: var(--accent); }
.section-title { display: flex; align-items: baseline; justify-content: space-between; margin: 6px 2px 14px; }
.section-title h2 { font-size: 17px; font-weight: 700; letter-spacing: -.02em; }
.empty-state { display: flex; flex-direction: column; align-items: center; padding: 48px 16px; text-align: center; color: var(--muted); }
.empty-state > svg { margin-bottom: 14px; color: var(--accent); }
.empty-state h3 { margin-bottom: 6px; font-size: 16px; color: var(--text); }
.empty-state p { max-width: 36ch; font-size: 13px; line-height: 1.6; }
.rail-empty { padding: 20px 0; }
.pill { display: inline-flex; align-items: center; gap: 6px; padding: 5px 11px; border-radius: 999px; background: var(--surface-2); color: var(--muted); font-size: 12px; font-weight: 700; white-space: nowrap; }
.pill.on { color: var(--green); background: rgba(52, 211, 153, .12); }
.banner-note { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 20px; padding: 13px 16px; border-radius: 14px; border: 1px solid var(--line); background: var(--surface-2); color: var(--muted); font-size: 13px; line-height: 1.6; }
.banner-note.warn { border-color: rgba(251, 191, 36, .45); color: var(--text); }
.status { padding: 4px 11px; border-radius: 999px; background: var(--surface-2); color: var(--muted); font-size: 12px; font-weight: 700; white-space: nowrap; }
.status.completed, .status.ok { color: var(--green); background: rgba(52, 211, 153, .14); }
.status.pending, .status.warn { color: var(--amber); background: rgba(251, 191, 36, .14); }
.status.declined, .status.failed, .status.bad { color: var(--red); background: rgba(251, 113, 133, .14); }

/* buttons */
.icon-button { display: grid; place-items: center; padding: 8px; border: none; border-radius: var(--r-sm); background: transparent; color: var(--muted); transition: background .15s, color .15s; }
.icon-button:hover { color: var(--text); background: var(--surface-2); }
.delete-button { opacity: .6; }
.delete-button:hover { opacity: 1; color: var(--red); background: rgba(251, 113, 133, .12); }
.text-button { display: inline-flex; align-items: center; gap: 4px; padding: 6px 8px; border: none; border-radius: var(--r-sm); background: transparent; color: var(--accent); font-size: 13px; font-weight: 600; }
.text-button:hover { background: rgba(167, 139, 250, .12); }
.primary-button { display: inline-flex; align-items: center; justify-content: center; align-self: flex-start; gap: 8px; padding: 12px 20px; border: none; border-radius: var(--r-md); color: #fff; font-size: 14px; font-weight: 700; background: linear-gradient(135deg, color-mix(in srgb, var(--accent-strong) 80%, #fff 20%), var(--accent-strong)); box-shadow: 0 8px 20px color-mix(in srgb, var(--accent-strong) 30%, transparent); transition: filter .15s, transform .15s; }
.primary-button:hover { filter: brightness(1.08); }
.primary-button:active { transform: scale(.98); }
.primary-button:disabled { opacity: .5; cursor: not-allowed; filter: none; }
.ghost-button { display: inline-flex; align-items: center; gap: 8px; padding: 11px 16px; border: 1px solid var(--line); border-radius: var(--r-md); background: transparent; font-size: 14px; font-weight: 600; transition: background .15s, border-color .15s; }
.ghost-button:hover { background: var(--surface-2); border-color: var(--faint); }
.pill-select { appearance: none; padding: 9px 14px; border: 1px solid var(--line); border-radius: var(--r-md); background: var(--bg); font-size: 13px; }

/* forms */
.transaction-form { display: flex; flex-direction: column; gap: 18px; max-width: 760px; }
.form-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.form-group label { color: var(--muted); font-size: 13px; font-weight: 600; }
.form-group input, .form-group select { width: 100%; min-width: 0; height: 46px; padding: 0 14px; border: 1px solid var(--line); border-radius: var(--r-md); background: var(--bg); font-size: 14px; outline: none; transition: border-color .15s, box-shadow .15s; }
.form-group input:hover, .form-group select:hover { border-color: var(--faint); }
.form-group input:focus, .form-group select:focus { border-color: var(--accent); box-shadow: var(--ring); }
.form-group input::placeholder { color: var(--faint); }
.form-group input[type="date"] { color-scheme: dark; }
.form-group select { cursor: pointer; appearance: none; -webkit-appearance: none; padding-right: 40px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a78bfa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; background-size: 16px; }
.seg { display: inline-flex; gap: 2px; padding: 4px; border-radius: var(--r-md); background: var(--bg); border: 1px solid var(--line); }
.seg button { padding: 8px 16px; border: none; border-radius: 9px; background: transparent; color: var(--muted); font-size: 13px; font-weight: 600; transition: background .15s, color .15s; }
.seg button:hover { color: var(--text); }
.seg button.on { background: var(--accent-strong); color: #fff; }
.seg button:disabled { opacity: .4; cursor: not-allowed; }
.switch { position: relative; flex-shrink: 0; width: 46px; height: 26px; padding: 0; border-radius: 999px; border: 1px solid var(--line); background: var(--bg); transition: background .2s, border-color .2s; }
.switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; border-radius: 50%; background: var(--muted); transition: transform .2s, background .2s; }
.switch.on { background: var(--accent-strong); border-color: transparent; }
.switch.on::after { transform: translateX(20px); background: #fff; }
.swatches { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; min-height: 46px; }
.swatch { width: 32px; height: 32px; padding: 0; border-radius: 50%; border: 2px solid transparent; transition: transform .15s; }
.swatch:hover { transform: scale(1.1); }
.swatch.on { border-color: #fff; box-shadow: 0 0 0 3px rgba(255, 255, 255, .15); }
.set-row { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 16px 0; border-bottom: 1px solid var(--line); }
.set-row:last-child { border-bottom: none; }

/* progress */
.progress-track { width: 100%; height: 10px; overflow: hidden; border-radius: 999px; background: var(--bg); }
.progress-fill { height: 100%; border-radius: 999px; background: var(--accent-strong); transition: width .4s ease; }
.progress-fill.over-budget { background: var(--red); }
.progress-caption { margin-top: 8px; color: var(--muted); font-size: 12px; }
.budget-list, .goal-list { display: flex; flex-direction: column; gap: 22px; }
.budget-item, .goal-item { padding-bottom: 22px; border-bottom: 1px solid var(--line); }
.budget-item:last-child, .goal-item:last-child { padding-bottom: 0; border-bottom: none; }
.budget-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
.budget-heading strong { display: block; margin-bottom: 2px; font-size: 15px; }
.goal-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 10px; color: var(--muted); font-size: 13px; }

/* ============ dashboard ============ */
.dash { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 24px; align-items: start; }
.dash-main, .rail { min-width: 0; }
.greet { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
.greet h1 { font-size: clamp(26px, 3vw, 34px); font-weight: 800; letter-spacing: -.03em; }
.stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 24px; }
.stat-card { position: relative; min-width: 0; display: flex; flex-direction: column; gap: 2px; padding: 20px; border-radius: 20px; border: 1px solid var(--line); background: var(--surface); cursor: pointer; transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
.stat-card:hover { transform: translateY(-3px); box-shadow: 0 14px 34px rgba(0, 0, 0, .3); }
.stat-card h2 { margin: 4px 0 10px; font-size: clamp(20px, 2vw, 26px); font-weight: 800; letter-spacing: -.03em; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
.stat-icon { width: 42px; height: 42px; display: grid; place-items: center; margin-bottom: 16px; border-radius: 50%; color: #fff; }
.stat-icon.green { background: #2fbf86; } .stat-icon.blue { background: #3b82f6; } .stat-icon.pink { background: #d946a8; } .stat-icon.purple { background: #7c5cff; }
.tone-green { background: linear-gradient(145deg, #11322f, #131529 70%); border-color: #1d4a43; }
.tone-blue { background: linear-gradient(145deg, #11294a, #131529 70%); border-color: #1d3a66; }
.tone-pink { background: linear-gradient(145deg, #3a1738, #131529 70%); border-color: #5a2457; }
.tone-purple { background: linear-gradient(145deg, #261f5c, #131529 70%); border-color: #3b3490; }
.stat-trend { font-size: 13px; font-weight: 600; }
.stat-trend span { color: var(--muted); font-weight: 500; }
.stat-trend.up { color: var(--green); } .stat-trend.down { color: var(--red); } .stat-trend.flat { color: var(--faint); font-weight: 500; }
.stat-hint { position: absolute; top: 18px; right: 16px; display: inline-flex; align-items: center; gap: 2px; font-size: 12px; font-weight: 600; color: var(--muted); opacity: 0; transform: translateX(-4px); transition: opacity .2s, transform .2s; }
.stat-card:hover .stat-hint, .stat-card:focus-visible .stat-hint { opacity: 1; transform: none; }
@media (hover: none) { .stat-hint { opacity: .8; transform: none; } }

.two-col { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 20px; }
.donut-wrap { display: flex; flex-wrap: wrap; align-items: center; gap: 24px; }
.donut { position: relative; width: 190px; height: 190px; flex-shrink: 0; }
.donut-center { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; pointer-events: none; }
.donut-center strong { font-size: 18px; font-variant-numeric: tabular-nums; }
.donut-center span { color: var(--muted); font-size: 12px; }
.legend-list { flex: 1; min-width: 190px; display: flex; flex-direction: column; gap: 12px; list-style: none; }
.legend-list li { display: grid; grid-template-columns: 10px 1fr auto 52px; align-items: center; gap: 10px; font-size: 13px; }
.legend-list i { width: 10px; height: 10px; border-radius: 50%; }
.legend-list em { color: var(--muted); font-style: normal; text-align: right; }
.legend-list strong { font-variant-numeric: tabular-nums; }
.trend-chart { height: 220px; }

.tx-row { display: grid; grid-template-columns: 120px minmax(0, 1.5fr) minmax(0, 1fr) 130px 76px; align-items: center; gap: 12px; padding: 13px 10px; margin: 0 -10px; border-bottom: 1px solid var(--line); border-radius: 12px; font-size: 14px; transition: background .15s; }
.tx-row:last-child { border-bottom: none; }
.tx-row:not(.tx-head):hover { background: rgba(255, 255, 255, .025); }
.tx-head { padding-top: 0; color: var(--muted); font-size: 12px; font-weight: 600; }
.tx-desc { display: flex; align-items: center; gap: 10px; min-width: 0; overflow-wrap: anywhere; }
.tx-dot { width: 30px; height: 30px; min-width: 30px; display: grid; place-items: center; border-radius: 50%; background: var(--surface-2); color: var(--muted); }
.tx-dot.income { color: var(--green); background: rgba(52, 211, 153, .12); }
.tx-cat { color: var(--muted); }

.goal-row { display: flex; gap: 14px; margin-bottom: 20px; }
.goal-row:last-child { margin-bottom: 0; }
.goal-badge { width: 48px; height: 48px; min-width: 48px; display: grid; place-items: center; border-radius: 50%; color: #fff; }
.goal-body { flex: 1; min-width: 0; }
.goal-body .muted { margin-bottom: 8px; }
.goal-body .progress-track { height: 8px; }
.goal-top { display: flex; justify-content: space-between; gap: 8px; font-size: 14px; }
.goal-top span { color: var(--muted); font-size: 13px; }
.insight-list { display: flex; flex-direction: column; gap: 10px; }
.insight { display: flex; align-items: center; gap: 14px; padding: 14px; border-radius: var(--r-md); background: var(--surface-2); transition: background .15s; }
.insight:hover { background: color-mix(in srgb, var(--surface-2) 70%, var(--bg)); }
.insight p { font-size: 14px; line-height: 1.5; }
.insight-icon { width: 40px; height: 40px; min-width: 40px; display: grid; place-items: center; border-radius: 50%; }
.insight-icon.green { color: var(--green); background: rgba(52, 211, 153, .15); }
.insight-icon.orange { color: #fb923c; background: rgba(251, 146, 60, .16); }
.insight-icon.purple { color: var(--accent); background: rgba(167, 139, 250, .16); }
.banner { position: relative; overflow: hidden; min-height: 190px; padding: 24px; border-radius: var(--r-lg); border: 1px solid #36307a; background: linear-gradient(160deg, #1b1a45, #3a2a63 60%, #7a4a6a); }
.banner h3 { position: relative; z-index: 1; max-width: 14ch; font-size: 20px; line-height: 1.25; letter-spacing: -.02em; }
.banner p { position: relative; z-index: 1; margin-top: 6px; color: #cfc8ee; font-size: 13px; }
.peaks { position: absolute; right: 0; bottom: 0; width: 70%; height: 70%; background: linear-gradient(160deg, #6a5a9a, #20204a); clip-path: polygon(0 100%, 35% 30%, 50% 50%, 75% 5%, 100% 60%, 100% 100%); opacity: .9; }

/* ============ accounts / transfer / bills / savings ============ */
.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 22px; }
.kpi { position: relative; overflow: hidden; min-width: 0; display: flex; flex-direction: column; gap: 4px; padding: 18px 20px 18px 22px; border-radius: 18px; border: 1px solid var(--line); background: linear-gradient(160deg, var(--surface-2), var(--surface)); }
.kpi::before { content: ""; position: absolute; left: 0; top: 18px; bottom: 18px; width: 3px; border-radius: 0 3px 3px 0; background: var(--k, var(--accent-strong)); }
.kpi:nth-child(1) { --k: #7c5cff; } .kpi:nth-child(2) { --k: #34d399; } .kpi:nth-child(3) { --k: #60a5fa; } .kpi:nth-child(4) { --k: #d946a8; }
.kpi span { color: var(--muted); font-size: 13px; font-weight: 500; }
.kpi strong { font-size: 24px; font-weight: 800; letter-spacing: -.03em; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
.kpi em { color: var(--faint); font-size: 12px; font-style: normal; }

.acct-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin-bottom: 20px; }
.acct-card { --c: var(--accent-strong); display: flex; flex-direction: column; gap: 3px; padding: 20px; border-radius: 22px; border: 1px solid color-mix(in srgb, var(--c) 30%, var(--line)); background: linear-gradient(150deg, color-mix(in srgb, var(--c) 20%, var(--surface)), var(--surface) 72%); transition: transform .2s, box-shadow .2s; }
.acct-card:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
.type-checking { --c: #5b8cff; } .type-savings { --c: #34d399; } .type-cash { --c: #f6ad45; } .type-wallet { --c: #d946a8; }
.acct-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.acct-icon { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 15px; color: var(--c); background: color-mix(in srgb, var(--c) 22%, transparent); }
.acct-type { color: var(--muted); font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.acct-name { font-size: 16px; }
.acct-bal { margin-top: 8px; font-size: 28px; font-weight: 800; letter-spacing: -.035em; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
.acct-hold { margin-top: 4px; color: var(--amber); font-size: 12px; font-style: normal; }

.two-pane { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 20px; align-items: start; }
.xfer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 12px; margin: 0 -12px; border-bottom: 1px solid var(--line); border-radius: 12px; transition: background .15s; }
.xfer:hover { background: rgba(255, 255, 255, .025); }
.xfer:last-child { border-bottom: none; }
.xfer-main { display: flex; align-items: center; gap: 14px; min-width: 0; }
.xfer-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.day-badge { width: 48px; height: 52px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 13px; background: var(--surface-2); border: 1px solid var(--line); font-size: 18px; font-weight: 800; line-height: 1; }
.day-badge small { margin-bottom: 4px; color: var(--faint); font-size: 9px; font-weight: 700; letter-spacing: .09em; }

/* ============ education, reports ============ */
.lessons { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; align-items: start; }
.lesson { overflow: hidden; border-radius: 18px; border: 1px solid var(--line); background: var(--surface); transition: border-color .2s; }
.lesson:hover { border-color: var(--faint); }
.lesson-head { display: flex; align-items: center; gap: 14px; width: 100%; padding: 16px 18px; border: none; background: transparent; text-align: left; }
.lesson-body { padding: 0 18px 18px; color: var(--muted); font-size: 14px; line-height: 1.7; }
.lesson-body ul { margin: 10px 0 16px; padding-left: 18px; }
.check { width: 26px; height: 26px; flex-shrink: 0; display: grid; place-items: center; border-radius: 50%; border: 2px solid var(--line); color: transparent; }
.check.on { background: var(--green); border-color: var(--green); color: #06281c; }
.calc-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-bottom: 22px; }
.table-scroll { overflow-x: auto; }
.rep-table { width: 100%; border-collapse: collapse; font-size: 14px; font-variant-numeric: tabular-nums; }
.rep-table th { padding: 8px 12px 8px 0; text-align: right; color: var(--muted); font-size: 12px; font-weight: 600; border-bottom: 1px solid var(--line); }
.rep-table td { padding: 13px 12px 13px 0; text-align: right; border-bottom: 1px solid var(--line); }
.rep-table th:first-child, .rep-table td:first-child { text-align: left; }
.rep-table tr:last-child td { border-bottom: none; }

/* ============ modals + toast ============ */
.summary-overlay { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(5, 6, 14, .75); backdrop-filter: blur(6px); }
.summary-modal { width: 100%; max-width: 660px; padding: 28px; border-radius: 24px; border: 1px solid var(--line); background: var(--surface); animation: appear .2s ease; }
.summary-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
.summary-header h2 { margin-bottom: 4px; font-size: 26px; letter-spacing: -.03em; }
.summary-header p { color: var(--muted); font-size: 14px; }
.summary-chart { width: 100%; height: 280px; margin-top: 22px; }
.detail-modal { max-width: 800px; max-height: 92vh; overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--line) transparent; }
.detail-controls { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-top: 20px; }
.chips { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 18px; }
.chip { min-width: 0; display: flex; flex-direction: column; gap: 2px; padding: 12px 14px; border-radius: var(--r-md); border: 1px solid var(--line); background: var(--surface-2); }
.chip span { color: var(--muted); font-size: 12px; }
.chip strong { font-size: 16px; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
.chip em { color: var(--faint); font-size: 12px; font-style: normal; }
.detail-sub { margin: 24px 0 6px; font-size: 15px; font-weight: 700; }
.toast { position: fixed; left: 50%; bottom: 28px; translate: -50% 0; z-index: 1100; padding: 11px 18px; border-radius: 14px; border: 1px solid var(--line); background: var(--surface-2); font-size: 13px; font-weight: 600; box-shadow: var(--shadow); animation: appear .2s ease; }
@keyframes appear { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

.tx-actions { display: flex; align-items: center; justify-content: flex-end; gap: 2px; }
.form-actions { display: flex; align-items: center; gap: 10px; }
.sync-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--faint); }
.sync-dot.ok { background: var(--green); }
.sync-dot.offline { background: var(--amber); }
.reset-btn:hover { color: var(--red); background: rgba(251, 113, 133, .12); }
.danger-button { display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; border: none; border-radius: var(--r-md); background: var(--red); color: #2a0a12; font-size: 14px; font-weight: 700; transition: filter .15s; }
.danger-button:hover { filter: brightness(1.08); }
.boot { height: 100vh; height: 100dvh; display: grid; place-items: center; padding: 24px; text-align: center; color: var(--muted); background: var(--bg); }
.spinner { width: 38px; height: 38px; margin: 0 auto 14px; border-radius: 50%; border: 3px solid var(--line); border-top-color: var(--accent); animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.boot-card { max-width: 440px; display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 32px; border-radius: 22px; border: 1px solid var(--line); background: var(--surface); }
.boot-card h2 { color: var(--text); font-size: 20px; }
.boot-card { text-align: left; align-items: flex-start; }
.boot-card a { color: var(--accent); }
.boot-steps { padding-left: 20px; color: var(--muted); font-size: 13px; line-height: 1.8; }
.boot-steps code { padding: 1px 6px; border-radius: 6px; background: var(--bg); color: var(--text); font-size: 12px; }

/* ============ glass finish ============ */
:root {
  --glass: linear-gradient(145deg, rgba(255, 255, 255, .085), rgba(255, 255, 255, .03));
  --glass-line: rgba(255, 255, 255, .11);
  --glass-blur: blur(18px) saturate(150%);
  --glass-shadow: 0 10px 34px rgba(0, 0, 0, .30), inset 0 1px 0 rgba(255, 255, 255, .14);
}

/* soft glowing colour behind everything, so the glass has something to blur */
.app { background: #090a17; }
.app::before, .app::after { content: ""; position: fixed; inset: -10%; z-index: 0; pointer-events: none; }
.app::before {
  background:
    radial-gradient(620px 440px at 14% 8%, color-mix(in srgb, var(--accent-strong) 42%, transparent), transparent 70%),
    radial-gradient(520px 420px at 88% 18%, rgba(59, 130, 246, .26), transparent 70%),
    radial-gradient(640px 520px at 72% 96%, rgba(217, 70, 168, .22), transparent 70%);
}
.app::after {
  background:
    radial-gradient(460px 360px at 40% 62%, rgba(52, 211, 153, .10), transparent 70%),
    radial-gradient(420px 340px at 6% 92%, color-mix(in srgb, var(--accent-strong) 26%, transparent), transparent 70%);
  animation: drift 26s ease-in-out infinite alternate;
}
@keyframes drift { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-3%, 2%, 0) scale(1.06); } }
.main { position: relative; z-index: 1; }

/* every panel-like surface */
.panel, .kpi, .acct-card, .lesson, .chip, .notif, .summary-modal, .boot-card, .stat-card, .banner-note, .page-icon, .toast {
  background: var(--glass);
  border: 1px solid var(--glass-line);
  -webkit-backdrop-filter: var(--glass-blur);
  backdrop-filter: var(--glass-blur);
  box-shadow: var(--glass-shadow);
}
.panel { position: relative; transition: border-color .2s ease; }
.panel::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; background: linear-gradient(125deg, rgba(255, 255, 255, .06), transparent 38%); }
.panel:hover { border-color: rgba(255, 255, 255, .18); }
.summary-modal, .notif, .toast, .boot-card { background: linear-gradient(145deg, rgba(36, 38, 74, .80), rgba(18, 20, 44, .74)); }
.summary-overlay { background: rgba(5, 6, 16, .6); }

/* tinted glass */
.tone-green { background: linear-gradient(145deg, rgba(47, 191, 134, .26), rgba(255, 255, 255, .03) 72%); border-color: rgba(47, 191, 134, .38); }
.tone-blue { background: linear-gradient(145deg, rgba(59, 130, 246, .26), rgba(255, 255, 255, .03) 72%); border-color: rgba(59, 130, 246, .38); }
.tone-pink { background: linear-gradient(145deg, rgba(217, 70, 168, .26), rgba(255, 255, 255, .03) 72%); border-color: rgba(217, 70, 168, .38); }
.tone-purple { background: linear-gradient(145deg, rgba(124, 92, 255, .30), rgba(255, 255, 255, .03) 72%); border-color: rgba(124, 92, 255, .42); }
.acct-card { background: linear-gradient(150deg, color-mix(in srgb, var(--c) 28%, transparent), rgba(255, 255, 255, .03) 75%); border-color: color-mix(in srgb, var(--c) 42%, rgba(255, 255, 255, .1)); }
.banner { background: linear-gradient(160deg, rgba(124, 92, 255, .38), rgba(217, 70, 168, .24)); border: 1px solid var(--glass-line); -webkit-backdrop-filter: var(--glass-blur); backdrop-filter: var(--glass-blur); box-shadow: var(--glass-shadow); }
.peaks { opacity: .5; }

/* frosted navigation */
.topbar { background: rgba(14, 15, 34, .50); -webkit-backdrop-filter: blur(22px) saturate(160%); backdrop-filter: blur(22px) saturate(160%); border-bottom: 1px solid rgba(255, 255, 255, .08); }
.sidebar { background: linear-gradient(180deg, rgba(255, 255, 255, .07), rgba(255, 255, 255, .02)); -webkit-backdrop-filter: blur(24px) saturate(150%); backdrop-filter: blur(24px) saturate(150%); border-color: rgba(255, 255, 255, .09); }
.menu-item:hover:not(.active) { background: rgba(255, 255, 255, .07); }
.sidebar-close, .logo-open { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .12); }
.sidebar-close:hover { background: rgba(255, 255, 255, .12); }

/* controls sitting on glass */
.form-group input, .form-group select, .search-box, .seg, .switch, .pill-select { background-color: rgba(6, 7, 18, .42); border-color: rgba(255, 255, 255, .10); }
.search-box { -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); }
.progress-track { background: rgba(0, 0, 0, .30); }
.insight { background: rgba(255, 255, 255, .05); border: 1px solid rgba(255, 255, 255, .07); }
.insight:hover { background: rgba(255, 255, 255, .09); }
.pill, .day-badge { background: rgba(255, 255, 255, .07); border-color: rgba(255, 255, 255, .10); }
.ghost-button { border-color: rgba(255, 255, 255, .14); }
.ghost-button:hover { background: rgba(255, 255, 255, .08); border-color: rgba(255, 255, 255, .24); }
.icon-button:hover, .profile:hover { background: rgba(255, 255, 255, .08); }
select option { background: #161833; color: #f2f2fb; }

/* browsers without blur, or users who prefer less transparency, get solid surfaces */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .panel, .kpi, .acct-card, .lesson, .chip, .notif, .summary-modal, .boot-card, .stat-card, .banner-note, .page-icon, .toast { background: var(--surface); }
  .topbar { background: rgba(11, 12, 25, .92); }
  .sidebar { background: #10112a; }
}
@media (prefers-reduced-transparency: reduce) {
  .panel, .kpi, .acct-card, .lesson, .chip, .notif, .summary-modal, .boot-card, .stat-card, .banner-note, .page-icon, .toast { background: var(--surface); -webkit-backdrop-filter: none; backdrop-filter: none; }
  .topbar { background: rgba(11, 12, 25, .95); -webkit-backdrop-filter: none; backdrop-filter: none; }
  .sidebar { background: #10112a; -webkit-backdrop-filter: none; backdrop-filter: none; }
}

/* ============ header + refined glass ============ */
:root {
  --glass: linear-gradient(145deg, rgba(255, 255, 255, .105), rgba(255, 255, 255, .035));
  --glass-blur: blur(22px) saturate(160%);
  --glass-shadow: inset 0 1px 0 rgba(255, 255, 255, .09), inset 0 -1px 0 rgba(0, 0, 0, .22), 0 24px 44px -16px rgba(0, 0, 0, .55), 0 3px 8px rgba(0, 0, 0, .22);
  --noise: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .07 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}
.panel, .kpi, .stat-card, .acct-card, .lesson, .notif, .banner, .topbar { border-color: rgba(255, 255, 255, .07); }
.panel, .kpi, .lesson, .notif { background: var(--noise), var(--glass); }
.tone-green { --edge: rgba(47, 191, 134, .8); background: var(--noise), linear-gradient(145deg, rgba(47, 191, 134, .28), rgba(255, 255, 255, .035) 72%); }
.tone-blue { --edge: rgba(59, 130, 246, .8); background: var(--noise), linear-gradient(145deg, rgba(59, 130, 246, .28), rgba(255, 255, 255, .035) 72%); }
.tone-pink { --edge: rgba(217, 70, 168, .8); background: var(--noise), linear-gradient(145deg, rgba(217, 70, 168, .28), rgba(255, 255, 255, .035) 72%); }
.tone-purple { --edge: rgba(124, 92, 255, .85); background: var(--noise), linear-gradient(145deg, rgba(124, 92, 255, .32), rgba(255, 255, 255, .035) 72%); }
.acct-card { position: relative; --edge: color-mix(in srgb, var(--c) 80%, white 10%); background: var(--noise), linear-gradient(150deg, color-mix(in srgb, var(--c) 30%, transparent), rgba(255, 255, 255, .035) 75%); }

/* bright gradient edge, like light catching the rim of the glass */
.panel::before, .stat-card::before, .acct-card::before, .lesson::before, .notif::before, .banner::before, .topbar::before, .kpi::after {
  content: ""; position: absolute; inset: 0; z-index: 2; padding: 1px; border-radius: inherit; pointer-events: none;
  background: linear-gradient(145deg, var(--edge, rgba(255, 255, 255, .34)), rgba(255, 255, 255, .05) 42%, var(--edge2, rgba(255, 255, 255, .15)));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
.panel::after { background: linear-gradient(125deg, rgba(255, 255, 255, .07), transparent 40%); transition: opacity .25s ease; }
.panel:hover { border-color: rgba(255, 255, 255, .10); box-shadow: var(--glass-shadow), 0 0 40px -12px color-mix(in srgb, var(--accent-strong) 40%, transparent); }
.stat-card:hover { box-shadow: var(--glass-shadow), 0 18px 40px -10px rgba(0, 0, 0, .55); }

/* floating glass header */
.topbar {
  position: sticky; top: 12px; z-index: 100; gap: 16px; min-height: 64px; margin: 12px 0 28px; padding: 0 14px 0 16px;
  border: 1px solid rgba(255, 255, 255, .07); border-radius: 22px;
  background: var(--noise), linear-gradient(145deg, rgba(255, 255, 255, .10), rgba(255, 255, 255, .035));
  -webkit-backdrop-filter: blur(24px) saturate(170%); backdrop-filter: blur(24px) saturate(170%);
  box-shadow: var(--glass-shadow);
}
.topbar-title { display: flex; align-items: center; gap: 12px; flex-shrink: 0; min-width: 0; }
.topbar-icon { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 12px; color: #fff; background: linear-gradient(135deg, color-mix(in srgb, var(--accent-strong) 70%, #6d8dff), var(--accent-strong)); box-shadow: 0 6px 16px color-mix(in srgb, var(--accent-strong) 40%, transparent), inset 0 1px 0 rgba(255, 255, 255, .28); }
.topbar-title strong { display: block; font-size: 15px; font-weight: 700; letter-spacing: -.01em; line-height: 1.2; white-space: nowrap; }
.topbar-title small { color: var(--muted); font-size: 12px; white-space: nowrap; }
.topsearch { height: 42px; max-width: 460px; }
.topsearch kbd { margin-right: 10px; padding: 2px 8px; border-radius: 7px; border: 1px solid rgba(255, 255, 255, .14); background: rgba(255, 255, 255, .06); color: var(--muted); font: 600 11px/1.5 inherit; }
.search-clear { margin-right: 6px; padding: 5px; }
.topbar-right { gap: 8px; }
.topbar-add { align-self: center; padding: 10px 16px; border-radius: 14px; }
.topbar-sep { width: 1px; height: 28px; margin: 0 4px; background: rgba(255, 255, 255, .12); }
.bell-count { position: absolute; top: 2px; right: 2px; min-width: 16px; height: 16px; padding: 0 4px; display: grid; place-items: center; border-radius: 999px; background: var(--red); color: #fff; font-size: 10px; font-weight: 800; box-shadow: 0 0 0 2px #1a1c3a; }
.avatar { box-shadow: 0 0 0 2px rgba(255, 255, 255, .16); }
.profile { border-radius: 16px; }

@media (max-width: 1100px) { .topbar-title small { display: none; } }
@media (max-width: 900px) { .topbar-title strong { display: none; } }
@media (max-width: 768px) { .topbar { top: 8px; margin: 8px 0 20px; border-radius: 18px; } }
@media (max-width: 640px) { .topbar-add span, .topsearch kbd { display: none; } .topbar-add { padding: 10px 12px; } .topbar-sep { display: none; } }

/* ============ responsive ============ */
@media (max-width: 1280px) {
  .dash { grid-template-columns: 1fr; }
  .rail { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
  .rail .banner { grid-column: 1 / -1; }
}
@media (max-width: 1150px) {
  .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .two-pane { grid-template-columns: 1fr; }
}
@media (max-width: 1000px) { .two-col { grid-template-columns: 1fr; } }

/* phones: navigation becomes a bottom tab bar that scrolls sideways */
@media (max-width: 768px) {
  .sidebar, .sidebar-collapsed { position: fixed; left: 0; right: 0; bottom: 0; top: auto; width: 100%; height: auto; flex-direction: row; padding: 8px 10px calc(8px + env(safe-area-inset-bottom, 0px)); border-right: none; border-top: 1px solid var(--line); z-index: 40; transition: none; }
  .logo-row { display: none; }
  .nav-scroll { display: flex; width: 100%; overflow-x: auto; overflow-y: hidden; }
  .nav-group { display: flex; }
  .nav-group + .nav-group { margin-top: 0; margin-left: 4px; padding-top: 0; border-top: none; }
  .navigation { flex-direction: row; width: auto; flex-wrap: nowrap; gap: 4px; }
  .menu-item, .sidebar-collapsed .menu-item { flex: 0 0 auto; flex-direction: column; justify-content: center; gap: 4px; width: auto; min-width: 80px; height: auto; min-height: 54px; padding: 8px 4px; font-size: 10.5px; text-align: center; box-shadow: none; }
  .sidebar-collapsed .menu-item span { display: inline; }
  .nav-badge, .sidebar-collapsed .nav-badge { position: absolute; top: 4px; right: 10px; margin: 0; }
  .main { padding: 0 18px 90px; }
  .topbar { min-height: 66px; margin-bottom: 20px; }
  .profile-text { display: none; }
  .rail { grid-template-columns: 1fr; }
  .toast { bottom: 96px; }
}
@media (max-width: 640px) {
  .tx-row { grid-template-columns: minmax(0, 1fr) auto 76px; }
  .tx-row > :nth-child(1), .tx-row > :nth-child(3), .tx-head { display: none; }
  .greet { flex-direction: column; }
  .donut { margin: 0 auto; }
  .calc-grid { grid-template-columns: 1fr; }
  .set-row { align-items: flex-start; }
  .panel { padding: 20px; }
}
@media (max-width: 520px) {
  .main { padding: 0 14px 90px; }
  .form-row { grid-template-columns: 1fr; }
  .stats { gap: 10px; }
  .stat-card { padding: 16px 14px; }
  .kpis { grid-template-columns: 1fr 1fr; gap: 10px; }
  .kpi { padding: 14px 14px 14px 18px; }
  .kpi strong { font-size: 19px; }
  .acct-grid { grid-template-columns: 1fr; }
  .search-box { width: 150px; }
  .chips { grid-template-columns: 1fr; }
  .detail-controls { flex-direction: column; align-items: stretch; }
  .seg { justify-content: space-between; }
  .goal-footer { flex-direction: column; align-items: flex-start; }
  .summary-modal { padding: 20px; }
  .summary-chart { height: 230px; }
}
`;

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const NAV_GROUPS = [
  {
    label: "MAIN MENU",
    items: [
      { name: "Dashboard", icon: Home },
      { name: "Transactions", icon: ArrowLeftRight },
      { name: "Accounts", icon: Landmark },
      { name: "Money Transfer", icon: Send },
      { name: "Budgets", icon: PieChart },
      { name: "Savings", icon: PiggyBank },
      { name: "Financial Goals", icon: Target },
      { name: "Bills & Subscriptions", icon: CalendarClock },
    ],
  },
  {
    label: "INSIGHTS",
    items: [
      { name: "Analytics & Reports", icon: BarChart3 },
      { name: "Financial Education", icon: BookOpen },
    ],
  },
  {
    label: "PREFERENCES",
    items: [
      { name: "Settings", icon: SettingsIcon },
      { name: "Privacy & Security", icon: Lock },
    ],
  },
];

const DEFAULT_SETTINGS = {
  name: "Arnav Yadav",
  tagline: "Financial Freedom",
  currency: "₹",
  accent: "#7c4dff",
  parentalOn: true,
  parentName: "Parent",
  approvalThreshold: 0,
  parentPinHash: "",
  hideBalances: false,
};

const STORAGE_KEY = "pocketninja:local:v1";
const OLD_STORAGE_KEY = "pocketninja:data:v2";
// The server is an OPTIONAL backup. Leave VITE_API_URL unset and the app is 100% local.
const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const SYNC_ON = API_URL !== "";

// A random id kept in this browser. It tells the server whose backup this is.
const DEVICE_ID = (() => {
  try {
    let id = localStorage.getItem("pocketninja:deviceId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("pocketninja:deviceId", id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
})();

async function api(path, { method = "GET", body } = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}/api/${path}`, {
      method,
      headers: { "Content-Type": "application/json", "x-device-id": DEVICE_ID },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    const err = new Error("Can't reach the server.");
    err.network = true;
    throw err;
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.message || `Server error (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

// update the server copy, or create it if it isn't there yet
async function upsert(name, item) {
  try {
    return await api(`${name}/${item.id}`, { method: "PUT", body: item });
  } catch (e) {
    if (e.status === 404) return api(name, { method: "POST", body: item });
    throw e;
  }
}

/* Backs a list up to the server in the background (push only, never reads back).
   Failed uploads are retried automatically. Without a server this does nothing. */
function useCollectionSync(name, items, enabled, retryTick, enqueue, setSyncState) {
  const known = useRef(new Map());
  useEffect(() => {
    if (!enabled) return;
    const next = new Map(items.map((i) => [i.id, JSON.stringify(i)]));
    next.forEach((json, id) => {
      if (known.current.get(id) === json) return;
      known.current.set(id, json);
      enqueue(async () => {
        try {
          await upsert(name, JSON.parse(json));
          setSyncState("ok");
        } catch (e) {
          if (e.network) {
            known.current.delete(id);
            setSyncState("offline");
          }
        }
      });
    });
    Array.from(known.current.keys()).forEach((id) => {
      if (next.has(id)) return;
      known.current.delete(id);
      enqueue(async () => {
        try {
          await api(`${name}/${id}`, { method: "DELETE" });
        } catch {
          /* already gone, or offline: the local copy is what matters */
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, enabled, retryTick]);
  return known;
}
let CUR = "₹";
let HIDE = false;
let OPENING = 0;
const downloadFile = (name, text, type) => {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

const EXPENSE_CATEGORIES = [
  "Housing",
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Education",
  "Health",
  "Bills",
  "Other",
];
const INCOME_CATEGORIES = ["Salary", "Business", "Investment", "Other"];

const CATEGORY_META = {
  Housing: { icon: Home, color: "#5b8cff" },
  "Food & Dining": { icon: Coffee, color: "#f6ad45" },
  Transport: { icon: Car, color: "#3fcf8e" },
  Shopping: { icon: ShoppingBag, color: "#8b5cf6" },
  Entertainment: { icon: Tv, color: "#f2597a" },
  Education: { icon: GraduationCap, color: "#22d3ee" },
  Health: { icon: HeartPulse, color: "#f472b6" },
  Salary: { icon: Banknote, color: "#34d399" },
  Business: { icon: Briefcase, color: "#60a5fa" },
  Investment: { icon: TrendingUp, color: "#34d399" },
  Other: { icon: CircleDollarSign, color: "#8b93b8" },
  Transfer: { icon: ArrowLeftRight, color: "#94a3b8" },
  Bills: { icon: CalendarClock, color: "#38bdf8" },
};
const metaFor = (category) => CATEGORY_META[category] || CATEGORY_META.Other;

const GOAL_STYLES = [
  { icon: ShieldCheck, color: "#2fbf86" },
  { icon: Car, color: "#3b82f6" },
  { icon: Plane, color: "#7c5cff" },
  { icon: Target, color: "#d946a8" },
];

const METRICS = {
  balance: { title: "Total Balance", key: "balance", color: "#34d399", sub: "Your balance at the end of each month" },
  income: { title: "Monthly Income", key: "income", color: "#60a5fa", sub: "Money received each month" },
  expenses: { title: "Monthly Expenses", key: "expenses", color: "#fb7185", sub: "Money spent each month" },
  savings: { title: "Savings", key: "savings", color: "#a78bfa", sub: "Income minus expenses each month" },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const plainMoney = (amount) =>
  `${CUR}${Number(amount || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
const currency = (amount) => (HIDE ? `${CUR}••••` : plainMoney(amount));

const compact = (v) =>
  HIDE
    ? "••"
    : Math.abs(v) >= 1000
      ? `${CUR}${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k`
      : `${CUR}${Math.round(v)}`;

const pad = (n) => String(n).padStart(2, "0");
const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const monthKeyOf = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
const shiftMonth = (offset) => {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() + offset);
  return d;
};
const formatDate = (key) =>
  new Date(`${key}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const signed = (t) => (t.type === "income" ? t.amount : -t.amount);
const sumType = (txs, type, monthKey) =>
  txs
    .filter((t) => t.type === type && (!monthKey || t.date.startsWith(monthKey)))
    .reduce((s, t) => s + t.amount, 0);
const balanceUpTo = (txs, limitKey) =>
  OPENING + txs.filter((t) => t.date <= limitKey).reduce((s, t) => s + signed(t), 0);

function monthlySeries(txs, n) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = shiftMonth(-i);
    const mk = monthKeyOf(d);
    const income = sumType(txs, "income", mk);
    const expenses = sumType(txs, "expense", mk);
    out.push({
      month: d.toLocaleString("en-IN", { month: "short" }),
      income,
      expenses,
      savings: income - expenses,
      balance: balanceUpTo(txs, `${mk}-31`),
    });
  }
  return out;
}

function trendOf(cur, prev, invert = false) {
  if (!prev && !cur) return { cls: "flat", text: "No data yet", dir: null };
  if (!prev) return { cls: "flat", text: "New this month", dir: null };
  const change = ((cur - prev) / Math.abs(prev)) * 100;
  const rounded = Math.round(change);
  if (rounded === 0) return { cls: "flat", text: "0%", dir: null };
  const good = invert ? change < 0 : change > 0;
  return {
    cls: good ? "up" : "down",
    text: `${rounded > 0 ? "+" : ""}${rounded}%`,
    dir: change > 0 ? "up" : "down",
  };
}


/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */

const newDefaultAccount = () => ({ id: crypto.randomUUID(), name: "Main Account", type: "Checking", opening: 0 });

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(OLD_STORAGE_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw);
    return Array.isArray(d.transactions) ? d : null;
  } catch {
    return null;
  }
}
const SAVED = loadSaved();
const INIT = {
  transactions: SAVED?.transactions ?? [],
  budgets: SAVED?.budgets ?? [],
  goals: SAVED?.goals ?? [],
  accounts: SAVED?.accounts?.length ? SAVED.accounts : [newDefaultAccount()],
  transfers: SAVED?.transfers ?? [],
  bills: SAVED?.bills ?? [],
  eduDone: SAVED?.eduDone ?? [],
  settings: { ...DEFAULT_SETTINGS, ...(SAVED?.settings || {}) },
};

function StatCard({ title, amount, icon: Icon, color, trend, onOpen }) {
  return (
    <div
      className={`stat-card tone-${color}`}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <span className="stat-hint">
        View graph <ChevronRight size={14} />
      </span>
      <div className={`stat-icon ${color}`}>
        <Icon size={21} />
      </div>
      <p className="muted">{title}</p>
      <h2>{currency(amount)}</h2>
      <p className={`stat-trend ${trend.cls}`}>
        {trend.dir === "up" && <ArrowUp size={13} style={{ verticalAlign: "-2px" }} />}
        {trend.dir === "down" && <ArrowDown size={13} style={{ verticalAlign: "-2px" }} />}{" "}
        {trend.text} <span>vs last month</span>
      </p>
    </div>
  );
}

function TxTable({ items, onDelete, onEdit }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <Receipt size={34} />
        <h3>No transactions found</h3>
        <p>Add a transaction and it will show up here.</p>
      </div>
    );
  }
  return (
    <div>
      <div className="tx-row tx-head">
        <span>Date</span>
        <span>Description</span>
        <span>Category</span>
        <span className="r">Amount</span>
        <span />
      </div>
      {items.map((t) => {
        const meta = metaFor(t.category);
        const Icon = meta.icon;
        const income = t.type === "income";
        return (
          <div className="tx-row" key={t.id}>
            <span className="tx-cat">{formatDate(t.date)}</span>
            <span className="tx-desc">
              <span className={`tx-dot ${income ? "income" : ""}`}>
                <Icon size={15} />
              </span>
              {t.name}
            </span>
            <span className="tx-cat with-icon" style={{ color: meta.color }}>
              <Icon size={15} style={{ color: meta.color }} />
              <span style={{ color: "var(--text)" }}>{t.category}</span>
            </span>
            <strong className={`r ${income ? "positive" : "negative"}`}>
              {income ? "+ " : "- "}
              {currency(t.amount)}
            </strong>
            <span className="tx-actions">
              {onEdit && t.category !== "Transfer" && (
                <button className="icon-button" onClick={() => onEdit(t)} title="Edit transaction" aria-label="Edit transaction">
                  <Pencil size={16} />
                </button>
              )}
              <button
                className="icon-button delete-button"
                onClick={() => onDelete(t.id)}
                title="Delete transaction"
                aria-label="Delete transaction"
              >
                <Trash2 size={16} />
              </button>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Donut({ segments, total }) {
  let offset = 25;
  return (
    <div className="donut">
      <svg viewBox="0 0 42 42" width="100%" height="100%" role="img" aria-label="Spending by category">
        <circle cx="21" cy="21" r="15.9155" fill="none" stroke="var(--surface-2)" strokeWidth="7" />
        {segments.map((s) => {
          const pct = (s.amount / total) * 100;
          const el = (
            <circle
              key={s.name}
              cx="21"
              cy="21"
              r="15.9155"
              fill="none"
              stroke={s.color}
              strokeWidth="7"
              strokeDasharray={`${Math.max(pct - 0.6, 0)} ${100 - Math.max(pct - 0.6, 0)}`}
              strokeDashoffset={offset}
            />
          );
          offset -= pct;
          return el;
        })}
      </svg>
      <div className="donut-center">
        <strong>{currency(total)}</strong>
        <span>Total Spend</span>
      </div>
    </div>
  );
}

function DetailModal({ metricId, transactions, onClose }) {
  const [range, setRange] = useState(6);
  const metric = METRICS[metricId];

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const series = useMemo(() => monthlySeries(transactions, range), [transactions, range]);
  const values = series.map((s) => s[metric.key]);
  const latest = values[values.length - 1] ?? 0;
  const average = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  const peakIndex = values.length ? values.indexOf(Math.max(...values)) : 0;
  const gradId = `grad-${metricId}`;

  return (
    <div className="summary-overlay" onClick={onClose}>
      <div
        className="summary-modal detail-modal"
        role="dialog"
        aria-modal="true"
        aria-label={metric.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="summary-header">
          <div>
            <h2>{metric.title}</h2>
            <p>{metric.sub}</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="detail-controls">
          <div className="seg" role="group" aria-label="Time range">
            {[3, 6, 12].map((n) => (
              <button key={n} className={range === n ? "on" : ""} onClick={() => setRange(n)}>
                {n} months
              </button>
            ))}
          </div>
        </div>

        <div className="chips">
          <div className="chip">
            <span>This month</span>
            <strong>{currency(latest)}</strong>
          </div>
          <div className="chip">
            <span>Average</span>
            <strong>{currency(Math.round(average))}</strong>
            <em>per month</em>
          </div>
          <div className="chip">
            <span>Highest</span>
            <strong>{currency(values[peakIndex] ?? 0)}</strong>
            <em>{series[peakIndex]?.month}</em>
          </div>
        </div>

        <p className="detail-sub">Monthly trend</p>
        <div className="summary-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={metric.color} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={metric.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#292b45" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" stroke="#6b6e8f" tickLine={false} />
              <YAxis stroke="#6b6e8f" tickLine={false} axisLine={false} tickFormatter={compact} width={52} />
              <Tooltip
                contentStyle={{
                  background: "rgba(20, 22, 42, .78)", backdropFilter: "blur(10px)",
                  border: "1px solid #262942",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                formatter={(v) => [currency(v), metric.title]}
              />
              <Area
                type="monotone"
                dataKey={metric.key}
                stroke={metric.color}
                strokeWidth={3}
                fill={`url(#${gradId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Summary analysis ---------------- */

const monthKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;

function analyze(transactions, budgets, goals, opening = 0) {
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
  const balance = opening + sum("income") - sum("expense");
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

/* ---------------- Parent PIN helper ---------------- */

async function hashPin(pin) {
  const bytes = new TextEncoder().encode(`pocketninja:parent:${pin}`);
  const buf = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/* ---------------- Shared bits ---------------- */

const ACCOUNT_TYPES = ["Checking", "Savings", "Cash", "Wallet"];
const ACCOUNT_ICONS = { Checking: Landmark, Savings: PiggyBank, Cash: Banknote, Wallet: Wallet };
const STATUS_LABEL = {
  pending: "Awaiting approval",
  completed: "Completed",
  declined: "Declined",
  cancelled: "Cancelled",
  failed: "Failed",
};
const ACCENTS = ["#7c4dff", "#3b82f6", "#10b981", "#f43f5e", "#f59e0b", "#06b6d4"];
const CURRENCIES = ["₹", "$", "€", "£", "¥"];

function ConfirmModal({ title, message, confirmLabel, onCancel, onConfirm }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);
  return (
    <div className="summary-overlay" onClick={onCancel}>
      <div className="summary-modal" style={{ maxWidth: 420 }} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="summary-header">
          <div>
            <h2 style={{ fontSize: 22 }}>{title}</h2>
            <p>{message}</p>
          </div>
          <button className="icon-button" onClick={onCancel} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="form-actions" style={{ marginTop: 22, justifyContent: "flex-end" }}>
          <button className="ghost-button" onClick={onCancel}>Cancel</button>
          <button className="danger-button" onClick={onConfirm} autoFocus>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

function Kpis({ items }) {
  return (
    <div className="kpis">
      {items.map((k) => (
        <div className="kpi" key={k.label}>
          <span>{k.label}</span>
          <strong>{k.value}</strong>
          {k.sub && <em>{k.sub}</em>}
        </div>
      ))}
    </div>
  );
}

function PageHead({ title, sub, icon: Icon, children }) {
  return (
    <div className="page-intro">
      <div>
        <h1>{title}</h1>
      </div>
      {children || (Icon && <div className="page-icon"><Icon size={30} /></div>)}
    </div>
  );
}

function Note({ tone = "", icon: Icon, children }) {
  return (
    <div className={`banner-note ${tone}`}>
      {Icon && <Icon size={18} style={{ flexShrink: 0, marginTop: 1 }} />}
      <div>{children}</div>
    </div>
  );
}

function Switch({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`switch ${on ? "on" : ""}`}
      onClick={() => onChange(!on)}
    />
  );
}

function PinModal({ title, subtitle, confirmLabel = "Confirm", onCancel, onSubmit }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [fails, setFails] = useState(0);
  const [lockUntil, setLockUntil] = useState(0);
  const [busy, setBusy] = useState(false);
  const [, tick] = useState(0);
  const locked = Date.now() < lockUntil;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  useEffect(() => {
    if (!locked) return;
    const t = setInterval(() => tick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [locked]);

  const submit = async (e) => {
    e.preventDefault();
    if (locked || busy || pin.length < 4) return;
    setBusy(true);
    const ok = await onSubmit(pin);
    setBusy(false);
    if (ok) return;
    const n = fails + 1;
    setPin("");
    if (n >= 3) {
      setFails(0);
      setLockUntil(Date.now() + 30000);
      setError("Too many wrong attempts. Try again in 30 seconds.");
    } else {
      setFails(n);
      setError(`Incorrect PIN. ${3 - n} attempt${3 - n === 1 ? "" : "s"} left.`);
    }
  };

  return (
    <div className="summary-overlay" onClick={onCancel}>
      <form
        className="summary-modal"
        style={{ maxWidth: 400 }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
      >
        <div className="summary-header">
          <div>
            <h2 style={{ fontSize: 22 }}>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <button type="button" className="icon-button" onClick={onCancel} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="form-group" style={{ marginTop: 22 }}>
          <label htmlFor="pin-input">Parent PIN</label>
          <input
            id="pin-input"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={6}
            autoFocus
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="••••"
            disabled={locked}
          />
        </div>
        {error && (
          <p className="negative" role="alert" style={{ fontSize: 13, marginTop: 10 }}>
            {locked ? "Too many wrong attempts. Please wait a moment." : error}
          </p>
        )}
        <button
          type="submit"
          className="primary-button"
          style={{ marginTop: 18, width: "100%" }}
          disabled={locked || busy || pin.length < 4}
        >
          {busy ? "Checking..." : confirmLabel}
        </button>
      </form>
    </div>
  );
}

function PinSetup({ hasPin, verifyPin, onSave }) {
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [conf, setConf] = useState("");
  const [msg, setMsg] = useState(null);
  const digits = (setter) => (e) => setter(e.target.value.replace(/\D/g, ""));

  const submit = async (e) => {
    e.preventDefault();
    if (!/^\d{4,6}$/.test(next)) return setMsg({ ok: false, text: "The PIN must be 4 to 6 digits." });
    if (next !== conf) return setMsg({ ok: false, text: "The two PINs don't match." });
    if (hasPin && !(await verifyPin(cur))) return setMsg({ ok: false, text: "Current PIN is incorrect." });
    await onSave(next);
    setCur("");
    setNext("");
    setConf("");
    setMsg({ ok: true, text: hasPin ? "PIN changed." : "Parent PIN set." });
  };

  return (
    <form className="transaction-form" onSubmit={submit} style={{ paddingTop: 16 }}>
      <div className="form-row">
        {hasPin && (
          <div className="form-group">
            <label htmlFor="pin-cur">Current PIN</label>
            <input id="pin-cur" type="password" inputMode="numeric" autoComplete="off" maxLength={6} value={cur} onChange={digits(setCur)} />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="pin-new">{hasPin ? "New PIN" : "Set a parent PIN"}</label>
          <input id="pin-new" type="password" inputMode="numeric" autoComplete="off" maxLength={6} placeholder="4–6 digits" value={next} onChange={digits(setNext)} />
        </div>
        <div className="form-group">
          <label htmlFor="pin-conf">Confirm PIN</label>
          <input id="pin-conf" type="password" inputMode="numeric" autoComplete="off" maxLength={6} value={conf} onChange={digits(setConf)} />
        </div>
      </div>
      {msg && (
        <p className={msg.ok ? "positive" : "negative"} role="status" style={{ fontSize: 13 }}>
          {msg.text}
        </p>
      )}
      <button type="submit" className="primary-button">
        <Lock size={16} /> {hasPin ? "Change PIN" : "Save PIN"}
      </button>
    </form>
  );
}

/* ---------------- Accounts ---------------- */

function AccountsPage({ accounts, balanceOf, availableOf, onAdd, onDelete, fmt }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Savings");
  const [opening, setOpening] = useState("");
  const total = accounts.reduce((s, a) => s + balanceOf(a.id), 0);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), type, opening: Number(opening) || 0 });
    setName("");
    setOpening("");
  };

  return (
    <>
      <PageHead title="Accounts" sub="All the places your money lives." icon={Landmark} />
      <Kpis items={[{ label: "Total across accounts", value: fmt(total) }, { label: "Accounts", value: accounts.length }]} />

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Add an account</h2>
          </div>
          <Plus size={22} />
        </div>
        <form className="transaction-form" onSubmit={submit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ac-name">Account name</label>
              <input id="ac-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Holiday fund" required />
            </div>
            <div className="form-group">
              <label htmlFor="ac-type">Type</label>
              <select id="ac-type" value={type} onChange={(e) => setType(e.target.value)}>
                {ACCOUNT_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group" style={{ maxWidth: 360 }}>
            <label htmlFor="ac-open">Current balance</label>
            <input id="ac-open" type="number" step="0.01" placeholder="0" value={opening} onChange={(e) => setOpening(e.target.value)} />
          </div>
          <button type="submit" className="primary-button">
            <Plus size={18} /> Add account
          </button>
        </form>
      </section>

      <div className="section-title">
        <h2>Your accounts</h2>
        <span className="muted">{accounts.length} total</span>
      </div>
      <div className="acct-grid">
        {accounts.map((a) => {
          const bal = balanceOf(a.id);
          const hold = bal - availableOf(a.id);
          const Icon = ACCOUNT_ICONS[a.type] || Landmark;
          return (
            <div className={`acct-card type-${a.type.toLowerCase()}`} key={a.id}>
              <div className="acct-top">
                <span className="acct-icon">
                  <Icon size={20} />
                </span>
                <button className="icon-button delete-button" onClick={() => onDelete(a.id)} title="Delete account" aria-label={`Delete ${a.name}`}>
                  <Trash2 size={17} />
                </button>
              </div>
              <p className="acct-type">{a.type}</p>
              <strong className="acct-name">{a.name}</strong>
              <span className="acct-bal">{fmt(bal)}</span>
              {hold > 0 && <em className="acct-hold">{fmt(hold)} on hold for approval</em>}
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ---------------- Money transfer ---------------- */

function TransferPage({ accounts, transfers, balanceOf, availableOf, parental, onRequest, onDecide, onCancel, onGoPrivacy, fmt }) {
  const [from, setFrom] = useState("");
  const [toType, setToType] = useState("external");
  const [toAcc, setToAcc] = useState("");
  const [toName, setToName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState(null);
  const [pinFor, setPinFor] = useState(null);

  const fromId = accounts.some((a) => a.id === from) ? from : accounts[0]?.id || "";
  const others = accounts.filter((a) => a.id !== fromId);
  const toAccId = others.some((a) => a.id === toAcc) ? toAcc : others[0]?.id || "";
  const nameOf = (id) => accounts.find((a) => a.id === id)?.name || "Deleted account";
  const target = (t) => (t.toType === "account" ? nameOf(t.to) : t.to);
  const pending = transfers.filter((t) => t.status === "pending");
  const history = transfers.filter((t) => t.status !== "pending");
  const amt = Number(amount) || 0;
  const willNeedApproval = amt > 0 && parental.needs(amt);
  const blocked = parental.on && !parental.hasPin;

  const submit = (e) => {
    e.preventDefault();
    const res = onRequest({ from: fromId, toType, to: toType === "account" ? toAccId : toName, amount, note });
    setMsg(res);
    if (res.ok) {
      setAmount("");
      setNote("");
      setToName("");
    }
  };

  return (
    <>
      <PageHead title="Money Transfer" sub="Move money between your accounts or send it to someone." icon={Send} />

      {parental.on && blocked && (
        <Note tone="warn" icon={ShieldCheck}>
          Set a parent PIN to enable transfers.{" "}
          <button className="text-button" onClick={onGoPrivacy} style={{ padding: 0 }}>
            Set PIN
          </button>
        </Note>
      )}

      <div className="two-pane">
        <div className="pane-main">
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Send money</h2>
          </div>
          <span className={`pill ${parental.on ? "on" : ""}`}>
            <ShieldCheck size={13} /> {parental.on ? "Parental approval on" : "Approval off"}
          </span>
        </div>
        <form className="transaction-form" onSubmit={submit}>
          <div className="form-group" style={{ maxWidth: 360 }}>
            <label htmlFor="tf-from">From</label>
            <select id="tf-from" value={fromId} onChange={(e) => setFrom(e.target.value)}>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} · {fmt(availableOf(a.id))} available
                </option>
              ))}
            </select>
          </div>

          <div className="seg" role="group" aria-label="Send to" style={{ alignSelf: "flex-start" }}>
            <button type="button" className={toType === "external" ? "on" : ""} onClick={() => setToType("external")}>
              Someone else
            </button>
            <button type="button" className={toType === "account" ? "on" : ""} onClick={() => setToType("account")} disabled={others.length === 0}>
              My account
            </button>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tf-to">{toType === "account" ? "To account" : "Recipient name"}</label>
              {toType === "account" ? (
                <select id="tf-to" value={toAccId} onChange={(e) => setToAcc(e.target.value)}>
                  {others.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input id="tf-to" value={toName} onChange={(e) => setToName(e.target.value)} placeholder="e.g. Riya Sharma" required />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="tf-amt">Amount</label>
              <input id="tf-amt" type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="tf-note">Note (optional)</label>
            <input id="tf-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="What's it for?" />
          </div>

          {msg && (
            <p className={msg.ok ? "positive" : "negative"} role="status" style={{ fontSize: 13 }}>
              {msg.message}
            </p>
          )}
          <button type="submit" className="primary-button" disabled={blocked}>
            <Send size={17} /> {willNeedApproval ? "Request approval" : "Send now"}
          </button>
        </form>
      </section>

        </div>
        <div className="pane-side">
      {pending.length > 0 && (
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Waiting for parent approval</h2>
            </div>
            <Clock size={22} />
          </div>
          {pending.map((t) => (
            <div className="xfer" key={t.id}>
              <div>
                <strong>
                  {fmt(t.amount)} → {target(t)}
                </strong>
                <p className="muted">
                  From {nameOf(t.from)}
                  {t.note ? ` · ${t.note}` : ""} · {new Date(t.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="xfer-actions">
                <button className="primary-button" onClick={() => setPinFor({ id: t.id, approve: true, t })}>
                  <CheckCircle2 size={16} /> Approve
                </button>
                <button className="ghost-button" onClick={() => setPinFor({ id: t.id, approve: false, t })}>
                  Decline
                </button>
                <button className="text-button" onClick={() => onCancel(t.id)}>
                  Cancel request
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="panel">
        <div className="panel-heading">
          <h2>Transfer history</h2>
        </div>
        {history.length === 0 ? (
          <p className="muted">No transfers yet.</p>
        ) : (
          history.map((t) => (
            <div className="xfer" key={t.id}>
              <div>
                <strong>
                  {fmt(t.amount)} → {target(t)}
                </strong>
                <p className="muted">
                  From {nameOf(t.from)}
                  {t.note ? ` · ${t.note}` : ""} · {new Date(t.decidedAt || t.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`status ${t.status}`}>{STATUS_LABEL[t.status]}</span>
            </div>
          ))
        )}
      </section>
        </div>
      </div>

      {pinFor && (
        <PinModal
          title={pinFor.approve ? "Parent approval" : "Decline transfer"}
          subtitle={`${parental.name}, enter your PIN to ${pinFor.approve ? "approve" : "decline"} sending ${fmt(pinFor.t.amount)} to ${target(pinFor.t)}.`}
          confirmLabel={pinFor.approve ? "Approve transfer" : "Decline transfer"}
          onCancel={() => setPinFor(null)}
          onSubmit={async (pin) => {
            const ok = await onDecide(pinFor.id, pinFor.approve, pin);
            if (ok) setPinFor(null);
            return ok;
          }}
        />
      )}
    </>
  );
}

/* ---------------- Savings ---------------- */

function SavingsPage({ accounts, balanceOf, availableOf, series, goalsSaved, savings, rate, onRequest, fmt, compact, parental }) {
  const savAccs = accounts.filter((a) => a.type === "Savings");
  const others = accounts.filter((a) => a.type !== "Savings");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState(null);
  const fromId = others.some((a) => a.id === from) ? from : others[0]?.id || "";
  const toId = savAccs.some((a) => a.id === to) ? to : savAccs[0]?.id || "";
  const totalSaved = savAccs.reduce((s, a) => s + balanceOf(a.id), 0);

  const submit = (e) => {
    e.preventDefault();
    const res = onRequest({ from: fromId, toType: "account", to: toId, amount, note: "Quick save" });
    setMsg(res);
    if (res.ok) setAmount("");
  };

  return (
    <>
      <PageHead title="Savings" sub="Watch your savings grow and top them up." icon={PiggyBank} />
      <Kpis
        items={[
          { label: "In savings accounts", value: fmt(totalSaved) },
          { label: "Saved this month", value: fmt(savings) },
          { label: "Savings rate", value: rate === null ? "–" : `${Math.round(rate)}%`, sub: "Aim for 20% or more" },
          { label: "Set aside for goals", value: fmt(goalsSaved) },
        ]}
      />

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Quick save</h2>
          </div>
          <PiggyBank size={22} />
        </div>
        {savAccs.length === 0 || others.length === 0 ? (
          <p className="muted">
            You need at least one Savings account and one other account. Add them on the Accounts page.
          </p>
        ) : (
          <form className="transaction-form" onSubmit={submit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sv-from">From</label>
                <select id="sv-from" value={fromId} onChange={(e) => setFrom(e.target.value)}>
                  {others.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} · {fmt(availableOf(a.id))}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="sv-to">To</label>
                <select id="sv-to" value={toId} onChange={(e) => setTo(e.target.value)}>
                  {savAccs.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group" style={{ maxWidth: 360 }}>
              <label htmlFor="sv-amt">Amount</label>
              <input id="sv-amt" type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            {msg && (
              <p className={msg.ok ? "positive" : "negative"} role="status" style={{ fontSize: 13 }}>
                {msg.message}
              </p>
            )}
            <button type="submit" className="primary-button">
              <Plus size={18} /> Save money
            </button>
          </form>
        )}
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Monthly savings</h2>
          </div>
        </div>
        <div className="summary-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="savGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#292b45" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" stroke="#6b6e8f" tickLine={false} />
              <YAxis stroke="#6b6e8f" tickLine={false} axisLine={false} tickFormatter={compact} width={52} />
              <Tooltip
                contentStyle={{ background: "rgba(20, 22, 42, .78)", backdropFilter: "blur(10px)", border: "1px solid #262942", borderRadius: "12px", color: "#fff" }}
                formatter={(v) => [fmt(v), "Saved"]}
              />
              <Area type="monotone" dataKey="savings" stroke="#a78bfa" strokeWidth={3} fill="url(#savGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
}

/* ---------------- Bills & subscriptions ---------------- */

function BillsPage({ bills, billStatus, categories, onAdd, onPay, onDelete, fmt }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDay, setDueDay] = useState("1");
  const [type, setType] = useState("Bill");
  const [category, setCategory] = useState("Bills");

  const submit = (e) => {
    e.preventDefault();
    const a = Number(amount);
    const d = Math.min(31, Math.max(1, Math.round(Number(dueDay) || 1)));
    if (!name.trim() || !(a > 0)) return;
    onAdd({ name: name.trim(), amount: a, dueDay: d, type, category });
    setName("");
    setAmount("");
  };

  const rows = bills
    .map((b) => ({ b, s: billStatus(b) }))
    .sort((x, y) => (x.s.label === "Paid") - (y.s.label === "Paid") || x.s.diff - y.s.diff);
  const monthly = bills.reduce((s, b) => s + b.amount, 0);
  const subs = bills.filter((b) => b.type === "Subscription").reduce((s, b) => s + b.amount, 0);
  const soon = rows.filter((r) => r.s.cls === "warn" || r.s.cls === "bad").length;

  return (
    <>
      <PageHead title="Bills & Subscriptions" sub="Never miss a due date or forget a subscription." icon={CalendarClock} />
      <Kpis
        items={[
          { label: "Monthly total", value: fmt(monthly) },
          { label: "Subscriptions", value: fmt(subs), sub: "per month" },
          { label: "Due soon or overdue", value: soon },
        ]}
      />

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Add a bill or subscription</h2>
          </div>
          <Plus size={22} />
        </div>
        <form className="transaction-form" onSubmit={submit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bl-name">Name</label>
              <input id="bl-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Wi-Fi" required />
            </div>
            <div className="form-group">
              <label htmlFor="bl-amt">Amount</label>
              <input id="bl-amt" type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bl-day">Due day of month</label>
              <input id="bl-day" type="number" min="1" max="31" value={dueDay} onChange={(e) => setDueDay(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="bl-type">Type</label>
              <select id="bl-type" value={type} onChange={(e) => setType(e.target.value)}>
                <option>Bill</option>
                <option>Subscription</option>
              </select>
            </div>
          </div>
          <div className="form-group" style={{ maxWidth: 360 }}>
            <label htmlFor="bl-cat">Category</label>
            <select id="bl-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="primary-button">
            <Plus size={18} /> Add
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h2>Upcoming</h2>
        </div>
        {rows.length === 0 ? (
          <div className="empty-state">
            <CalendarClock size={34} />
            <h3>Nothing here yet</h3>
            <p>Add your rent, phone plan or streaming services to keep track.</p>
          </div>
        ) : (
          rows.map(({ b, s }) => (
            <div className="xfer" key={b.id}>
              <div className="xfer-main">
                <span className="day-badge">
                  <small>DUE</small>
                  {b.dueDay}
                </span>
                <div>
                <strong>
                  {b.name} · {fmt(b.amount)}
                </strong>
                <p className="muted">
                  {b.type} · {b.category}
                </p>
                </div>
              </div>
              <div className="xfer-actions">
                <span className={`status ${s.cls || "plain"}`}>{s.label}</span>
                {s.label !== "Paid" && (
                  <button className="ghost-button" onClick={() => onPay(b)}>
                    Mark paid
                  </button>
                )}
                <button className="icon-button delete-button" onClick={() => onDelete(b.id)} aria-label={`Delete ${b.name}`}>
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}

/* ---------------- Financial education ---------------- */

const LESSONS = [
  {
    id: "l1", title: "Budgeting basics: the 50/30/20 rule", level: "Beginner", mins: 4,
    summary: "A simple way to split your money.",
    points: [
      "Split take-home pay: 50% needs, 30% wants, 20% savings and debt.",
      "Track every expense for a month before cutting anything.",
      "Give each rupee a job by setting category limits on the Budgets page.",
      "Review weekly. Adjust the plan instead of abandoning it.",
    ],
  },
  {
    id: "l2", title: "Build an emergency fund", level: "Beginner", mins: 4,
    summary: "Your safety net for surprises.",
    points: [
      "Aim for 3 to 6 months of essential expenses.",
      "Start small: your first goal can be just one month.",
      "Keep it in an easy-access savings account, separate from spending money.",
      "Use it only for real emergencies, then top it back up.",
    ],
  },
  {
    id: "l3", title: "Needs vs wants", level: "Beginner", mins: 3,
    summary: "Spend on what matters to you.",
    points: [
      "Needs: housing, basic food, transport to work or school, health, minimum debt payments.",
      "Wants: eating out, extra subscriptions, upgrades.",
      "Try a 48-hour wait before non-essential purchases.",
      "Cancel subscriptions you haven't used in 30 days.",
    ],
  },
  {
    id: "l4", title: "How compound interest works", level: "Intermediate", mins: 5,
    summary: "Why starting early matters so much.",
    points: [
      "Interest earns interest, so growth speeds up over time.",
      "Starting early beats investing more later.",
      "Rule of 72: divide 72 by the yearly return to estimate years to double.",
      "Try the calculator below to see the effect.",
    ],
  },
  {
    id: "l5", title: "Debt and credit scores", level: "Intermediate", mins: 5,
    summary: "Borrow wisely and protect your score.",
    points: [
      "High-interest debt, like credit cards, usually costs more than investments earn. Pay it first.",
      "Always pay at least the minimum, on time.",
      "Keep credit use under about 30% of your limit.",
      "Check your credit report regularly for mistakes.",
    ],
  },
  {
    id: "l6", title: "Spot and avoid money scams", level: "Essential", mins: 4,
    summary: "Keep your money and your PINs safe.",
    points: [
      "Banks never ask for your PIN, OTP or password.",
      "Be wary of guaranteed returns and pressure to act fast.",
      "Verify links and callers by contacting the company directly.",
      "If you are tricked, call your bank immediately and report it.",
    ],
  },
];

function EducationPage({ done, onToggle, fmt }) {
  const [open, setOpen] = useState("l1");
  const [monthly, setMonthly] = useState("5000");
  const [rate, setRate] = useState("10");
  const [years, setYears] = useState("10");

  const p = Number(monthly) || 0;
  const n = Math.max(0, Math.round((Number(years) || 0) * 12));
  const r = (Number(rate) || 0) / 100 / 12;
  const fv = r === 0 ? p * n : p * ((Math.pow(1 + r, n) - 1) / r);
  const invested = p * n;
  const pct = Math.round((done.length / LESSONS.length) * 100);

  return (
    <>
      <PageHead title="Financial Education" sub="Short lessons to build good money habits." icon={BookOpen} />
      <section className="panel">
        <div className="goal-top">
          <strong>Your progress</strong>
          <span>
            {done.length} of {LESSONS.length} lessons · {pct}%
          </span>
        </div>
        <div className="progress-track" style={{ marginTop: 10 }}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </section>

      <div className="lessons">
        {LESSONS.map((l) => {
          const isDone = done.includes(l.id);
          const isOpen = open === l.id;
          return (
            <div className="lesson" key={l.id}>
              <button className="lesson-head" onClick={() => setOpen(isOpen ? null : l.id)} aria-expanded={isOpen}>
                <span className={`check ${isDone ? "on" : ""}`}>
                  <CheckCircle2 size={16} />
                </span>
                <span style={{ flex: 1 }}>
                  <strong style={{ display: "block", fontSize: 15 }}>{l.title}</strong>
                  <span className="muted">
                    {l.level} · {l.mins} min read
                  </span>
                </span>
                <ChevronDown size={18} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
              </button>
              {isOpen && (
                <div className="lesson-body">
                  <p>{l.summary}</p>
                  <ul>
                    {l.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <button className={isDone ? "ghost-button" : "primary-button"} onClick={() => onToggle(l.id)}>
                    {isDone ? "Mark as not done" : "Mark as done"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <section className="panel" style={{ marginTop: 20 }}>
        <div className="panel-heading">
          <div>
            <h2>Compound interest calculator</h2>
          </div>
        </div>
        <div className="calc-grid">
          <div className="form-group">
            <label htmlFor="c-m">Monthly saving</label>
            <input id="c-m" type="number" min="0" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="c-r">Yearly return (%)</label>
            <input id="c-r" type="number" min="0" step="0.5" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="c-y">Years</label>
            <input id="c-y" type="number" min="1" max="60" value={years} onChange={(e) => setYears(e.target.value)} />
          </div>
        </div>
        <Kpis
          items={[
            { label: "You put in", value: fmt(invested) },
            { label: "Estimated value", value: fmt(fv) },
            { label: "Growth", value: fmt(fv - invested) },
          ]}
        />
      </section>
    </>
  );
}

/* ---------------- Settings + Privacy ---------------- */

function SettingsPage({ settings, update }) {
  return (
    <>
      <PageHead title="Settings" sub="Your profile and how the app looks. Changes are saved automatically." icon={SettingsIcon} />
      <section className="panel">
        <div className="panel-heading">
          <h2>Profile</h2>
        </div>
        <div className="transaction-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="s-name">Your name</label>
              <input id="s-name" value={settings.name} onChange={(e) => update({ name: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="s-tag">Tagline</label>
              <input id="s-tag" value={settings.tagline} onChange={(e) => update({ tagline: e.target.value })} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="s-cur">Currency symbol</label>
              <select id="s-cur" value={settings.currency} onChange={(e) => update({ currency: e.target.value })}>
                {CURRENCIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Accent colour</label>
              <div className="swatches">
                {ACCENTS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`swatch ${settings.accent === c ? "on" : ""}`}
                    style={{ background: c }}
                    onClick={() => update({ accent: c })}
                    aria-label={`Use accent ${c}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PrivacyPage({ settings, update, hasPin, verifyPin, onSavePin }) {
  return (
    <>
      <PageHead title="Privacy & Security" sub="Control who approves transfers and what is shared." icon={Lock} />

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Parental approval</h2>
          </div>
          <ShieldCheck size={22} />
        </div>
        <div className="set-row">
          <div>
            <strong>Require parental approval</strong>
          </div>
          <Switch on={settings.parentalOn} onChange={(v) => update({ parentalOn: v })} label="Require parental approval" />
        </div>
        <div className="transaction-form" style={{ paddingTop: 16 }}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="p-name">Parent or guardian name</label>
              <input id="p-name" value={settings.parentName} onChange={(e) => update({ parentName: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="p-th">Ask approval above (0 = all)</label>
              <input id="p-th" type="number" min="0" value={settings.approvalThreshold} onChange={(e) => update({ approvalThreshold: e.target.value })} />
            </div>
          </div>
        </div>
        <PinSetup hasPin={hasPin} verifyPin={verifyPin} onSave={onSavePin} />
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h2>Privacy</h2>
        </div>
        <div className="set-row">
          <div>
            <strong>Hide balances</strong>
          </div>
          <Switch on={settings.hideBalances} onChange={(v) => update({ hideBalances: v })} label="Hide balances" />
        </div>
      </section>

    </>
  );
}

/* ------------------------------------------------------------------ */
/* Reports page                                                        */
/* ------------------------------------------------------------------ */

function ReportsPage({ transactions, series, fmt, compact, colorFor, onExport, kpis }) {
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
          <h1>Analytics &amp; Reports</h1>
          <p className="muted">See how your money moved over the last six months.</p>
        </div>
        <button className="ghost-button" onClick={onExport}>
          <Download size={16} /> Export CSV
        </button>
      </div>

      {kpis && <Kpis items={kpis} />}

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Income vs expenses</h2>
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
                contentStyle={{ background: "rgba(20, 22, 42, .78)", backdropFilter: "blur(10px)", border: "1px solid #262942", borderRadius: "12px", color: "#fff" }}
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

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [transactions, setTransactions] = useState(INIT.transactions);
  const [budgets, setBudgets] = useState(INIT.budgets);
  const [goals, setGoals] = useState(INIT.goals);
  const [accounts, setAccounts] = useState(INIT.accounts);
  const [transfers, setTransfers] = useState(INIT.transfers);
  const [bills, setBills] = useState(INIT.bills);
  const [eduDone, setEduDone] = useState(INIT.eduDone);
  const [settings, setSettings] = useState(INIT.settings);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("pocketninja:collapsed") === "1";
    } catch {
      return false;
    }
  });
  const [toast, setToast] = useState("");
  const [showAlerts, setShowAlerts] = useState(false);

  CUR = settings.currency;
  HIDE = settings.hideBalances;
  OPENING = accounts.reduce((s, a) => s + (Number(a.opening) || 0), 0);
  const USER = {
    name: settings.name || "You",
    first: (settings.name || "there").split(" ")[0],
    tagline: settings.tagline,
  };
  const appStyle = {
    "--accent-strong": settings.accent,
    "--accent": `color-mix(in srgb, ${settings.accent} 60%, white)`,
  };

  /* ---------- saved in this browser (+ optional server backup) ---------- */
  const [syncState, setSyncState] = useState(SYNC_ON ? "ok" : "off");
  const [retryTick, setRetryTick] = useState(0);
  const [resetAsk, setResetAsk] = useState(false);
  const queue = useRef(Promise.resolve());
  const settingsSent = useRef("");

  // local save: instant, needs no server
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ transactions, budgets, goals, accounts, transfers, bills, eduDone, settings })
        );
      } catch {
        /* storage full or blocked: ignore */
      }
    }, 300);
    return () => clearTimeout(t);
  }, [transactions, budgets, goals, accounts, transfers, bills, eduDone, settings]);

  const enqueue = (op) => {
    queue.current = queue.current.then(op).catch(() => {});
  };
  const syncTx = useCollectionSync("transactions", transactions, SYNC_ON, retryTick, enqueue, setSyncState);
  const syncAcc = useCollectionSync("accounts", accounts, SYNC_ON, retryTick, enqueue, setSyncState);
  const syncBud = useCollectionSync("budgets", budgets, SYNC_ON, retryTick, enqueue, setSyncState);
  const syncGoal = useCollectionSync("goals", goals, SYNC_ON, retryTick, enqueue, setSyncState);
  const syncTr = useCollectionSync("transfers", transfers, SYNC_ON, retryTick, enqueue, setSyncState);
  const syncBill = useCollectionSync("bills", bills, SYNC_ON, retryTick, enqueue, setSyncState);

  // keep trying while the server is unreachable
  useEffect(() => {
    if (!SYNC_ON || syncState !== "offline") return;
    const t = setInterval(() => setRetryTick((n) => n + 1), 20000);
    return () => clearInterval(t);
  }, [syncState]);

  // back up preferences too (the PIN hash never leaves this browser)
  useEffect(() => {
    if (!SYNC_ON) return;
    const { parentPinHash: _pin, ...safe } = settings;
    const payload = JSON.stringify({ settings: safe, eduDone });
    if (payload === settingsSent.current) return;
    const t = setTimeout(() => {
      settingsSent.current = payload;
      enqueue(async () => {
        try {
          await api("settings", { method: "PUT", body: { settings: safe, eduDone } });
          setSyncState("ok");
        } catch (e) {
          if (e.network) {
            settingsSent.current = "";
            setSyncState("offline");
          }
        }
      });
    }, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, eduDone, retryTick]);

  // Reset clears this browser only. Nothing is deleted on the server.
  const resetAllData = () => {
    setResetAsk(false);
    [syncTx, syncAcc, syncBud, syncGoal, syncTr, syncBill].forEach((r) => {
      r.current = new Map(); // so the server isn't told to delete anything
    });
    setTransactions([]);
    setBudgets([]);
    setGoals([]);
    setTransfers([]);
    setBills([]);
    setEduDone([]);
    setAccounts([newDefaultAccount()]);
    setEditId(null);
    setSearchTerm("");
    setActivePage("Dashboard");
    flash("Everything is back to zero.");
  };

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };
  const updateSettings = (patch) => setSettings((p) => ({ ...p, ...patch }));
  const toggleCollapsed = () =>
    setCollapsed((c) => {
      const n = !c;
      try {
        localStorage.setItem("pocketninja:collapsed", n ? "1" : "0");
      } catch {
        /* ignore */
      }
      return n;
    });

  useEffect(() => {
    if (!showAlerts) return;
    const close = (e) => !e.target.closest(".notif-wrap") && setShowAlerts(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [showAlerts]);

  const searchRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "")) return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const quickAdd = () => {
    setActivePage("Transactions");
    setTimeout(() => {
      document.querySelector(".main")?.scrollTo({ top: 0, behavior: "smooth" });
      document.querySelector(".transaction-form input")?.focus();
    }, 60);
  };

  const exportCsv = () => {
    const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = [...transactions]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((t) => [t.date, esc(t.name), t.type, esc(t.category), t.amount].join(","));
    downloadFile(
      `pocketninja-transactions-${toKey(new Date())}.csv`,
      ["Date,Name,Type,Category,Amount", ...rows].join("\n"),
      "text/csv"
    );
  };

  /* ---------- accounts + transfers ---------- */
  const defaultAcc = accounts[0]?.id;
  const accountBalance = (id) => {
    const a = accounts.find((x) => x.id === id);
    if (!a) return 0;
    let b = Number(a.opening) || 0;
    transactions.forEach((t) => {
      if ((t.account || defaultAcc) === id) b += signed(t);
    });
    transfers.forEach((tr) => {
      if (tr.status === "completed" && tr.toType === "account") {
        if (tr.to === id) b += tr.amount;
        if (tr.from === id) b -= tr.amount;
      }
    });
    return b;
  };
  const reservedOf = (id, exceptId) =>
    transfers
      .filter((t) => t.status === "pending" && t.from === id && t.id !== exceptId)
      .reduce((s, t) => s + t.amount, 0);
  const availableOf = (id, exceptId) => accountBalance(id) - reservedOf(id, exceptId);

  const addAccount = (a) => {
    setAccounts((p) => [...p, { id: crypto.randomUUID(), ...a }]);
    flash("Account added.");
  };
  const deleteAccount = (id) => {
    if (accounts.length <= 1) return flash("Keep at least one account.");
    if (transfers.some((t) => t.from === id || t.to === id))
      return flash("This account has transfers, so it can't be deleted.");
    const fallback = accounts.find((a) => a.id !== id).id;
    setTransactions((p) => p.map((t) => ((t.account || defaultAcc) === id ? { ...t, account: fallback } : t)));
    setAccounts((p) => p.filter((a) => a.id !== id));
  };

  const needsApproval = (amount) =>
    settings.parentalOn && amount > (Number(settings.approvalThreshold) || 0);
  const hasPin = !!settings.parentPinHash;
  const verifyPin = async (pin) => (await hashPin(pin)) === settings.parentPinHash;
  const savePin = async (pin) => updateSettings({ parentPinHash: await hashPin(pin) });

  const recordExternal = (t) => {
    if (t.toType !== "external") return;
    setTransactions((p) => [
      {
        id: crypto.randomUUID(),
        name: `Transfer to ${t.to}`,
        amount: t.amount,
        category: "Transfer",
        type: "expense",
        date: toKey(new Date()),
        account: t.from,
      },
      ...p,
    ]);
  };

  const requestTransfer = ({ from, toType, to, amount, note }) => {
    const amt = Number(amount);
    if (!(amt > 0)) return { ok: false, message: "Enter an amount above zero." };
    const src = accounts.find((a) => a.id === from);
    if (!src) return { ok: false, message: "Choose an account to send from." };
    if (toType === "account") {
      if (!to || to === from) return { ok: false, message: "Choose a different account to send to." };
    } else if (!String(to || "").trim()) {
      return { ok: false, message: "Enter who you're sending to." };
    }
    if (amt > availableOf(from))
      return {
        ok: false,
        message: `Not enough available balance in ${src.name} (${currency(availableOf(from))}).`,
      };
    const approval = needsApproval(amt);
    if (approval && !hasPin)
      return { ok: false, message: "A parent PIN is needed first. Set one in Privacy & Security." };
    const now = new Date().toISOString();
    const t = {
      id: crypto.randomUUID(),
      createdAt: now,
      from,
      toType,
      to: toType === "external" ? String(to).trim() : to,
      amount: amt,
      note: (note || "").trim(),
      status: approval ? "pending" : "completed",
      decidedAt: approval ? null : now,
    };
    setTransfers((p) => [t, ...p]);
    if (!approval) recordExternal(t);
    return {
      ok: true,
      message: approval
        ? "Request sent. A parent needs to approve it with their PIN."
        : "Transfer completed.",
    };
  };

  const decideTransfer = async (id, approve, pin) => {
    if (!(await verifyPin(pin))) return false;
    const t = transfers.find((x) => x.id === id);
    if (!t || t.status !== "pending") return true;
    const now = new Date().toISOString();
    const setStatus = (status) =>
      setTransfers((p) => p.map((x) => (x.id === id ? { ...x, status, decidedAt: now } : x)));
    if (!approve) {
      setStatus("declined");
      flash("Transfer declined.");
    } else if (t.amount > availableOf(t.from, id)) {
      setStatus("failed");
      flash("Not enough balance any more, so the transfer failed.");
    } else {
      setStatus("completed");
      recordExternal(t);
      flash("Transfer approved and sent.");
    }
    return true;
  };
  const cancelTransfer = (id) =>
    setTransfers((p) =>
      p.map((x) =>
        x.id === id && x.status === "pending"
          ? { ...x, status: "cancelled", decidedAt: new Date().toISOString() }
          : x
      )
    );

  /* ---------- bills ---------- */
  const billStatus = (b) => {
    const today = new Date();
    if ((b.paid || []).includes(monthKeyOf(today))) return { label: "Paid", cls: "ok", diff: 999 };
    const last = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const diff = Math.min(b.dueDay, last) - today.getDate();
    if (diff < 0) return { label: `Overdue by ${-diff}d`, cls: "bad", diff };
    if (diff === 0) return { label: "Due today", cls: "warn", diff };
    if (diff <= 3) return { label: `Due in ${diff}d`, cls: "warn", diff };
    return { label: `Due in ${diff}d`, cls: "", diff };
  };
  const addBill = (b) => {
    setBills((p) => [...p, { id: crypto.randomUUID(), paid: [], ...b }]);
    flash(`${b.name} added.`);
  };
  const payBill = (b) => {
    const mk = monthKeyOf(new Date());
    setBills((p) => p.map((x) => (x.id === b.id ? { ...x, paid: [...(x.paid || []), mk] } : x)));
    setTransactions((p) => [
      {
        id: crypto.randomUUID(),
        name: b.name,
        amount: b.amount,
        category: b.category,
        type: "expense",
        date: toKey(new Date()),
        account: defaultAcc,
      },
      ...p,
    ]);
    flash(`${b.name} marked as paid.`);
  };
  const deleteBill = (id) => setBills((p) => p.filter((b) => b.id !== id));

  const snap = useMemo(
    () => analyze(transactions, budgets, goals, OPENING),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactions, budgets, goals, accounts]
  );

  /* ---------- notifications ---------- */
  const alerts = [
    ...transfers
      .filter((t) => t.status === "pending")
      .map((t) => ({ id: `t${t.id}`, text: `Transfer of ${currency(t.amount)} awaits parent approval`, page: "Money Transfer" })),
    ...bills
      .filter((b) => ["bad", "warn"].includes(billStatus(b).cls))
      .map((b) => ({ id: `b${b.id}`, text: `${b.name}: ${billStatus(b).label}`, page: "Bills & Subscriptions" })),
    ...snap.over.map((b) => ({ id: `o${b.id}`, text: `${b.name} budget is over its limit`, page: "Budgets" })),
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [period, setPeriod] = useState("This Month");
  const [openMetric, setOpenMetric] = useState(null);

  // form state
  const [txName, setTxName] = useState("");
  const [txAmount, setTxAmount] = useState("");
  const [txType, setTxType] = useState("expense");
  const [txCategory, setTxCategory] = useState("Food & Dining");
  const [txDate, setTxDate] = useState(toKey(new Date()));
  const [txAccount, setTxAccount] = useState("");
  const [editId, setEditId] = useState(null);
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalSaved, setGoalSaved] = useState("");

  /* ---------- derived data ---------- */

  const sorted = useMemo(
    () => [...transactions].sort((a, b) => b.date.localeCompare(a.date)),
    [transactions]
  );

  const thisMk = monthKeyOf(shiftMonth(0));
  const lastMk = monthKeyOf(shiftMonth(-1));

  const totalBalance = balanceUpTo(transactions, "9999-12-31");
  const prevBalance = balanceUpTo(transactions, `${lastMk}-31`);
  const income = sumType(transactions, "income", thisMk);
  const prevIncome = sumType(transactions, "income", lastMk);
  const expenses = sumType(transactions, "expense", thisMk);
  const prevExpenses = sumType(transactions, "expense", lastMk);
  const savings = income - expenses;
  const prevSavings = prevIncome - prevExpenses;

  const monthExpenseByCategory = (mk) => {
    const map = {};
    transactions
      .filter((t) => t.type === "expense" && t.date.startsWith(mk))
      .forEach((t) => (map[t.category] = (map[t.category] || 0) + t.amount));
    return map;
  };

  const spending = useMemo(() => {
    const map = {};
    transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          (period === "All Time" ||
            t.date.startsWith(period === "This Month" ? thisMk : lastMk))
      )
      .forEach((t) => (map[t.category] = (map[t.category] || 0) + t.amount));
    const list = Object.entries(map)
      .map(([name, amount]) => ({ name, amount, color: metaFor(name).color }))
      .sort((a, b) => b.amount - a.amount);
    return { list, total: list.reduce((s, x) => s + x.amount, 0) };
  }, [transactions, period, thisMk, lastMk]);

  const trendData = useMemo(() => {
    const out = [];
    for (let i = 7; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      out.push({
        label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        balance: balanceUpTo(transactions, toKey(d)),
      });
    }
    return out;
  }, [transactions, accounts]);

  const filtered = sorted.filter((t) =>
    `${t.name} ${t.category}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const insights = useMemo(() => {
    const list = [];
    const cur = monthExpenseByCategory(thisMk);
    const prev = monthExpenseByCategory(lastMk);

    const dNow = cur["Food & Dining"] || 0;
    const dPrev = prev["Food & Dining"] || 0;
    if (dNow && dPrev) {
      const pct = Math.round((Math.abs(dNow - dPrev) / dPrev) * 100);
      list.push({
        tone: "green",
        icon: Leaf,
        text:
          dNow <= dPrev
            ? `You spent ${pct}% less on dining out this month. Great job!`
            : `You spent ${pct}% more on dining out this month. Worth a look.`,
      });
    }

    const top = Object.entries(cur)
      .filter(([name]) => name !== "Housing")
      .sort((a, b) => b[1] - a[1])[0];
    if (top) {
      list.push({
        tone: "orange",
        icon: TrendingUp,
        text: `Consider reducing ${top[0].toLowerCase()} expenses. A 10% cut could save you ${currency(
          Math.round(top[1] * 0.1)
        )} this month.`,
      });
    }

    const open = goals.find((g) => g.saved < g.target);
    if (open) {
      const series = monthlySeries(transactions, 3);
      const avg = series.reduce((s, m) => s + m.savings, 0) / series.length;
      list.push({
        tone: "purple",
        icon: Target,
        text:
          avg > 0
            ? `You're on track to reach your ${open.name} goal in ${Math.ceil(
                (open.target - open.saved) / avg
              )} months!`
            : `Increase your monthly savings to make progress on ${open.name}.`,
      });
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions, goals, thisMk, lastMk]);

  /* ---------- actions ---------- */

  const changeType = (type) => {
    setTxType(type);
    setTxCategory(type === "income" ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[1]);
  };

  const addTransaction = (e) => {
    e.preventDefault();
    const amount = Number(txAmount);
    if (!txName.trim() || !Number.isFinite(amount) || amount <= 0) return;
    const fields = {
      name: txName.trim(),
      amount,
      category: txCategory,
      type: txType,
      date: txDate,
      account: txAccount || accounts[0]?.id,
    };
    if (editId) setTransactions((p) => p.map((t) => (t.id === editId ? { ...t, ...fields } : t)));
    else setTransactions((p) => [{ id: crypto.randomUUID(), ...fields }, ...p]);
    setEditId(null);
    setTxName("");
    setTxAmount("");
  };
  const startEdit = (t) => {
    setEditId(t.id);
    setTxName(t.name);
    setTxAmount(String(t.amount));
    setTxType(t.type);
    setTxCategory(t.category);
    setTxDate(t.date);
    setTxAccount(t.account || accounts[0]?.id || "");
    setActivePage("Transactions");
    setTimeout(() => document.querySelector(".main")?.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };
  const cancelEdit = () => {
    setEditId(null);
    setTxName("");
    setTxAmount("");
  };
  const deleteTransaction = (id) => setTransactions((p) => p.filter((t) => t.id !== id));

  const addBudget = (e) => {
    e.preventDefault();
    const amount = Number(budgetAmount);
    if (!budgetName || !Number.isFinite(amount) || amount <= 0) return;
    setBudgets((p) => [...p, { id: crypto.randomUUID(), name: budgetName, amount }]);
    setBudgetName("");
    setBudgetAmount("");
  };
  const deleteBudget = (id) => setBudgets((p) => p.filter((b) => b.id !== id));

  const addGoal = (e) => {
    e.preventDefault();
    const target = Number(goalAmount);
    const saved = Number(goalSaved || 0);
    if (!goalName.trim() || !(target > 0) || !(saved >= 0) || saved > target) return;
    setGoals((p) => [...p, { id: crypto.randomUUID(), name: goalName.trim(), target, saved }]);
    setGoalName("");
    setGoalAmount("");
    setGoalSaved("");
  };
  const deleteGoal = (id) => setGoals((p) => p.filter((g) => g.id !== id));
  const contributeToGoal = (id, amount) => {
    const c = Number(amount);
    if (!Number.isFinite(c) || c <= 0) return;
    setGoals((p) =>
      p.map((g) => (g.id === id ? { ...g, saved: Math.min(g.target, g.saved + c) } : g))
    );
  };

  const spentThisMonth = (category) =>
    transactions
      .filter((t) => t.type === "expense" && t.category === category && t.date.startsWith(thisMk))
      .reduce((s, t) => s + t.amount, 0);

  const onSearch = (value) => {
    setSearchTerm(value);
    if (value) setActivePage("Transactions");
  };

  /* ---------- pages ---------- */

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const todayLabel = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const renderDashboard = () => (
    <div className="dash">
      <div className="dash-main">
        <div className="greet">
          <div>
            <h1>
              {greeting}, {USER.first}{" "}
              <Sun size={28} color="#fbbf24" style={{ verticalAlign: "-3px" }} />
            </h1>
          </div>
          <span className="muted">{todayLabel}</span>
        </div>

        <div className="stats">
          <StatCard
            title="Total Balance"
            amount={totalBalance}
            icon={Wallet}
            color="green"
            trend={trendOf(totalBalance, prevBalance)}
            onOpen={() => setOpenMetric("balance")}
          />
          <StatCard
            title="Monthly Income"
            amount={income}
            icon={TrendingUp}
            color="blue"
            trend={trendOf(income, prevIncome)}
            onOpen={() => setOpenMetric("income")}
          />
          <StatCard
            title="Monthly Expenses"
            amount={expenses}
            icon={TrendingDown}
            color="pink"
            trend={trendOf(expenses, prevExpenses, true)}
            onOpen={() => setOpenMetric("expenses")}
          />
          <StatCard
            title="Savings"
            amount={savings}
            icon={PiggyBank}
            color="purple"
            trend={trendOf(savings, prevSavings)}
            onOpen={() => setOpenMetric("savings")}
          />
        </div>

        <div className="two-col">
          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>Spending Overview</h2>
              </div>
              <select
                className="pill-select"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                aria-label="Period"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>All Time</option>
              </select>
            </div>

            {spending.total === 0 ? (
              <div className="empty-state">
                <PieChart size={34} />
                <h3>No spending yet</h3>
                <p>Expenses for this period will be broken down here.</p>
              </div>
            ) : (
              <div className="donut-wrap">
                <Donut segments={spending.list} total={spending.total} />
                <ul className="legend-list">
                  {spending.list.map((s) => (
                    <li key={s.name}>
                      <i style={{ background: s.color }} />
                      <span>{s.name}</span>
                      <strong>{currency(s.amount)}</strong>
                      <em>{((s.amount / spending.total) * 100).toFixed(1)}%</em>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <h2>Balance Trend</h2>
              </div>
            </div>
            <div className="trend-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#292b45" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="label" stroke="#6b6e8f" tickLine={false} interval="preserveStartEnd" />
                  <YAxis stroke="#6b6e8f" tickLine={false} axisLine={false} tickFormatter={compact} width={52} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(20, 22, 42, .78)", backdropFilter: "blur(10px)",
                      border: "1px solid #262942",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                    formatter={(v) => [currency(v), "Balance"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#34d399"
                    strokeWidth={3}
                    fill="url(#balanceGradient)"
                  />
                  <ReferenceDot
                    x={trendData[trendData.length - 1].label}
                    y={trendData[trendData.length - 1].balance}
                    r={5}
                    fill="#34d399"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <section className="panel">
          <div className="panel-heading">
            <h2>Recent Transactions</h2>
            <button className="text-button" onClick={() => setActivePage("Transactions")}>
              View all <ArrowRight size={14} />
            </button>
          </div>
          <TxTable items={sorted.slice(0, 5)} onDelete={deleteTransaction} onEdit={startEdit} />
        </section>
      </div>

      <aside className="rail">
        <section className="panel">
          <div className="panel-heading">
            <h2>Your Goals</h2>
            <button className="text-button" onClick={() => setActivePage("Financial Goals")}>
              View all <ArrowRight size={14} />
            </button>
          </div>
          {goals.length === 0 ? (
            <p className="muted rail-empty">Create a savings goal to track it here.</p>
          ) : (
            goals.slice(0, 3).map((g, i) => {
              const style = GOAL_STYLES[i % GOAL_STYLES.length];
              const Icon = style.icon;
              const pct = Math.min(100, (g.saved / g.target) * 100);
              return (
                <div className="goal-row" key={g.id}>
                  <div className="goal-badge" style={{ background: style.color }}>
                    <Icon size={22} />
                  </div>
                  <div className="goal-body">
                    <div className="goal-top">
                      <strong>{g.name}</strong>
                      <span>{pct.toFixed(0)}%</span>
                    </div>
                    <p className="muted">
                      {currency(g.saved)} / {currency(g.target)}
                    </p>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${pct}%`, background: style.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>

        <section className="panel">
          <div className="panel-heading">
            <h2 className="with-icon">
              <Sparkles size={20} /> Insights
            </h2>
          </div>
          {insights.length === 0 ? (
            <p className="muted rail-empty">Add a few transactions and goals to unlock insights.</p>
          ) : (
            <div className="insight-list">
              {insights.map((x) => {
                const Icon = x.icon;
                return (
                  <div className="insight" key={x.text}>
                    <div className={`insight-icon ${x.tone}`}>
                      <Icon size={19} />
                    </div>
                    <p>{x.text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <div className="banner">
          <h3>Your future self will thank you.</h3>
          <p>Save today. Live tomorrow.</p>
          <div className="peaks" />
        </div>
      </aside>
    </div>
  );

  const categoryOptions = txType === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const renderTransactions = () => (
    <>
      <div className="page-intro">
        <div>
          <h1>Transactions</h1>
          <p className="muted">Track every rupee coming in and going out.</p>
        </div>
        <div className="page-icon">
          <Receipt size={30} />
        </div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>{editId ? "Edit transaction" : "Add transaction"}</h2>
          </div>
          <Plus size={22} />
        </div>
        <form className="transaction-form" onSubmit={addTransaction}>
          <div className="form-row">
            <div className="form-group">
              <label>Transaction name</label>
              <input
                type="text"
                placeholder="e.g. Monthly salary"
                value={txName}
                onChange={(e) => setTxName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Amount ({CUR})</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter amount"
                value={txAmount}
                onChange={(e) => setTxAmount(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select value={txType} onChange={(e) => changeType(e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={txCategory} onChange={(e) => setTxCategory(e.target.value)}>
                {categoryOptions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={txDate} onChange={(e) => setTxDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Account</label>
              <select value={txAccount || accounts[0]?.id || ""} onChange={(e) => setTxAccount(e.target.value)}>
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="primary-button">
              {editId ? <Pencil size={16} /> : <Plus size={18} />} {editId ? "Save changes" : "Add transaction"}
            </button>
            {editId && (
              <button type="button" className="ghost-button" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>All transactions</h2>
            <p className="muted">
              {searchTerm
                ? `${filtered.length} of ${transactions.length} match "${searchTerm}"`
                : `${transactions.length} total records`}
            </p>
          </div>
          {searchTerm && (
            <button className="text-button" onClick={() => setSearchTerm("")}>
              Clear search
            </button>
          )}
        </div>
        <TxTable items={filtered} onDelete={deleteTransaction} onEdit={startEdit} />
      </section>
    </>
  );

  const renderBudgets = () => (
    <>
      <div className="page-intro">
        <div>
          <h1>Budgets</h1>
          <p className="muted">Monthly spending limits, tracked against this month's expenses.</p>
        </div>
        <div className="page-icon">
          <PieChart size={30} />
        </div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Create a budget</h2>
          </div>
          <Plus size={22} />
        </div>
        <form className="transaction-form" onSubmit={addBudget}>
          <div className="form-row">
            <div className="form-group">
              <label>Budget category</label>
              <select value={budgetName} onChange={(e) => setBudgetName(e.target.value)} required>
                <option value="">Select category</option>
                {EXPENSE_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Monthly limit ({CUR})</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter limit"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="primary-button">
            <Plus size={18} /> Create budget
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Your budgets</h2>
          </div>
          <Target size={22} />
        </div>
        {budgets.length === 0 ? (
          <div className="empty-state">
            <Target size={34} />
            <h3>No budgets yet</h3>
            <p>Create your first budget to start tracking spending.</p>
          </div>
        ) : (
          <div className="budget-list">
            {budgets.map((b) => {
              const spent = spentThisMonth(b.name);
              const pct = Math.min(100, (spent / b.amount) * 100);
              return (
                <div className="budget-item" key={b.id}>
                  <div className="budget-heading">
                    <div>
                      <strong>{b.name}</strong>
                      <p className="muted">
                        {currency(spent)} spent of {currency(b.amount)}
                      </p>
                    </div>
                    <button
                      className="icon-button delete-button"
                      onClick={() => deleteBudget(b.id)}
                      title="Delete budget"
                      aria-label="Delete budget"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                  <div className="progress-track">
                    <div
                      className={`progress-fill ${pct >= 100 ? "over-budget" : ""}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="progress-caption">
                    {spent > b.amount
                      ? `${currency(spent - b.amount)} over budget`
                      : `${currency(b.amount - spent)} remaining`}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );

  const renderGoals = () => (
    <>
      <div className="page-intro">
        <div>
          <h1>Goals</h1>
          <p className="muted">Turn your plans into achievable milestones.</p>
        </div>
        <div className="page-icon">
          <PiggyBank size={30} />
        </div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Create a savings goal</h2>
          </div>
          <Plus size={22} />
        </div>
        <form className="transaction-form" onSubmit={addGoal}>
          <div className="form-group">
            <label>Goal name</label>
            <input
              type="text"
              placeholder="e.g. New laptop"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Target amount ({CUR})</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Target amount"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Already saved ({CUR})</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0"
                value={goalSaved}
                onChange={(e) => setGoalSaved(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="primary-button">
            <Plus size={18} /> Create goal
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Your goals</h2>
          </div>
          <PiggyBank size={22} />
        </div>
        {goals.length === 0 ? (
          <div className="empty-state">
            <PiggyBank size={34} />
            <h3>No savings goals yet</h3>
            <p>Create a goal and start tracking your progress.</p>
          </div>
        ) : (
          <div className="goal-list">
            {goals.map((g, i) => {
              const style = GOAL_STYLES[i % GOAL_STYLES.length];
              const pct = Math.min(100, (g.saved / g.target) * 100);
              return (
                <div className="goal-item" key={g.id}>
                  <div className="budget-heading">
                    <div>
                      <strong>{g.name}</strong>
                      <p className="muted">
                        {currency(g.saved)} saved of {currency(g.target)}
                      </p>
                    </div>
                    <button
                      className="icon-button delete-button"
                      onClick={() => deleteGoal(g.id)}
                      title="Delete goal"
                      aria-label="Delete goal"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${pct}%`, background: style.color }}
                    />
                  </div>
                  <div className="goal-footer">
                    <span>{pct.toFixed(0)}% completed</span>
                    {g.saved >= g.target ? (
                      <span className="positive">Goal achieved!</span>
                    ) : (
                      <button
                        className="text-button"
                        onClick={() => {
                          const value = window.prompt("How much would you like to add?");
                          if (value !== null) contributeToGoal(g.id, value);
                        }}
                      >
                        <Plus size={15} /> Add savings
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );

  const parental = {
    on: settings.parentalOn,
    hasPin,
    threshold: Number(settings.approvalThreshold) || 0,
    name: settings.parentName || "Parent",
    needs: needsApproval,
  };

  const renderPage = () => {
    switch (activePage) {
      case "Transactions":
        return renderTransactions();
      case "Accounts":
        return (
          <AccountsPage
            accounts={accounts}
            balanceOf={accountBalance}
            availableOf={availableOf}
            onAdd={addAccount}
            onDelete={deleteAccount}
            fmt={currency}
          />
        );
      case "Money Transfer":
        return (
          <TransferPage
            accounts={accounts}
            transfers={transfers}
            balanceOf={accountBalance}
            availableOf={availableOf}
            parental={parental}
            onRequest={requestTransfer}
            onDecide={decideTransfer}
            onCancel={cancelTransfer}
            onGoPrivacy={() => setActivePage("Privacy & Security")}
            fmt={currency}
          />
        );
      case "Budgets":
        return renderBudgets();
      case "Savings":
        return (
          <SavingsPage
            accounts={accounts}
            balanceOf={accountBalance}
            availableOf={availableOf}
            series={monthlySeries(transactions, 6)}
            goalsSaved={goals.reduce((s, g) => s + g.saved, 0)}
            savings={savings}
            rate={snap.rate}
            onRequest={requestTransfer}
            fmt={currency}
            compact={compact}
            parental={parental}
          />
        );
      case "Financial Goals":
        return renderGoals();
      case "Bills & Subscriptions":
        return (
          <BillsPage
            bills={bills}
            billStatus={billStatus}
            categories={EXPENSE_CATEGORIES}
            onAdd={addBill}
            onPay={payBill}
            onDelete={deleteBill}
            fmt={currency}
          />
        );
      case "Analytics & Reports": {
        const biggest = transactions
          .filter((t) => t.type === "expense" && t.category !== "Transfer" && t.date.startsWith(thisMk))
          .sort((a, b) => b.amount - a.amount)[0];
        const kpis = [
          { label: "Savings rate", value: snap.rate === null ? "–" : `${Math.round(snap.rate)}%`, sub: "this month" },
          { label: "Average daily spend", value: currency(expenses / new Date().getDate()), sub: "this month" },
          { label: "Largest expense", value: biggest ? currency(biggest.amount) : "–", sub: biggest?.name },
          { label: "Projected month-end spend", value: currency(snap.projected) },
        ];
        return (
          <ReportsPage
            transactions={transactions}
            series={monthlySeries(transactions, 6)}
            fmt={currency}
            compact={compact}
            colorFor={(c) => metaFor(c).color}
            onExport={exportCsv}
            kpis={kpis}
          />
        );
      }
      case "Financial Education":
        return (
          <EducationPage
            done={eduDone}
            onToggle={(id) => setEduDone((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))}
            fmt={currency}
          />
        );
      case "Settings":
        return <SettingsPage settings={settings} update={updateSettings} />;
      case "Privacy & Security":
        return (
          <PrivacyPage
            settings={settings}
            update={updateSettings}
            hasPin={hasPin}
            verifyPin={verifyPin}
            onSavePin={savePin}
          />
        );
      default:
        return renderDashboard();
    }
  };

  const CurrentIcon = NAV_GROUPS.flatMap((g) => g.items).find((i) => i.name === activePage)?.icon;

  /* ---------- shell ---------- */

  return (
    <>
    <style>{STYLES}</style>
    <div className="app" style={appStyle}>
      <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : "sidebar-open"}`}>
        <div className="logo-row">
          {collapsed ? (
            <button className="logo-toggle" onClick={toggleCollapsed} aria-label="Open sidebar" title="Open sidebar">
              <span className="logo-icon">
                <Wallet size={22} />
              </span>
              <span className="logo-open">
                <PanelLeftOpen size={20} />
              </span>
            </button>
          ) : (
            <>
              <div className="logo">
                <div className="logo-icon">
                  <Wallet size={22} />
                </div>
                <div className="brand">
                  <span>
                    Pocket<span className="logo-accent">Ninja</span>
                  </span>
                </div>
              </div>
              <button className="sidebar-close" onClick={toggleCollapsed} aria-label="Close sidebar" title="Close sidebar">
                <X size={18} />
              </button>
            </>
          )}
        </div>

        <div className="nav-scroll">
          {NAV_GROUPS.map((group) => (
            <div className="nav-group" key={group.label}>
              <nav className="navigation" aria-label={group.label}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const badge =
                    item.name === "Money Transfer" ? transfers.filter((t) => t.status === "pending").length : 0;
                  return (
                    <button
                      key={item.name}
                      title={item.name}
                      className={`menu-item ${activePage === item.name ? "active" : ""}`}
                      onClick={() => setActivePage(item.name)}
                    >
                      <Icon size={19} />
                      <span>{item.name}</span>
                      {badge > 0 && <em className="nav-badge">{badge}</em>}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-title">
            <span className="topbar-icon">{CurrentIcon && <CurrentIcon size={18} />}</span>
            <div>
              <strong>{activePage}</strong>
              <small>{todayLabel}</small>
            </div>
          </div>

          <div className="search-box topsearch">
            <Search size={18} />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search transactions or categories"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              aria-label="Search transactions"
            />
            {searchTerm ? (
              <button className="icon-button search-clear" onClick={() => setSearchTerm("")} aria-label="Clear search">
                <X size={15} />
              </button>
            ) : (
              <kbd title="Press / to search">/</kbd>
            )}
          </div>

          <div className="topbar-right">
            <button className="primary-button topbar-add" onClick={quickAdd}>
              <Plus size={17} /> <span>Add</span>
            </button>
            <span className="topbar-sep" />
            {SYNC_ON && (
              <span
                className={`sync-dot ${syncState}`}
                title={syncState === "ok" ? "Backed up to the server" : "Server offline. The backup will retry."}
              />
            )}
            <button className="icon-button reset-btn" onClick={() => setResetAsk(true)} title="Reset all data" aria-label="Reset all data">
              <RotateCcw size={19} />
            </button>
            <div className="notif-wrap">
              <button
                className="icon-button bell"
                aria-label="Notifications"
                aria-expanded={showAlerts}
                onClick={() => setShowAlerts((v) => !v)}
              >
                <Bell size={20} />
                {alerts.length > 0 && <span className="bell-count">{alerts.length}</span>}
              </button>
              {showAlerts && (
                <div className="notif" role="menu">
                  <strong>Notifications</strong>
                  {alerts.length === 0 ? (
                    <p className="muted">You're all caught up.</p>
                  ) : (
                    alerts.map((a) => (
                      <button
                        key={a.id}
                        role="menuitem"
                        onClick={() => {
                          setActivePage(a.page);
                          setShowAlerts(false);
                        }}
                      >
                        {a.text}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            <button className="profile" aria-label="Profile and settings" onClick={() => setActivePage("Settings")}>
              <div className="avatar">
                {USER.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="profile-text">
                <strong>{USER.name}</strong>
                <small>{USER.tagline}</small>
              </div>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <div className="page-content">{renderPage()}</div>
      </main>

      {resetAsk &&
        (hasPin && settings.parentalOn ? (
          <PinModal
            title="Reset all data"
            subtitle="Enter the parent PIN to erase every transaction, account, budget, goal and bill."
            confirmLabel="Reset everything"
            onCancel={() => setResetAsk(false)}
            onSubmit={async (pin) => {
              if (!(await verifyPin(pin))) return false;
              resetAllData();
              return true;
            }}
          />
        ) : (
          <ConfirmModal
            title="Reset all data?"
            message={SYNC_ON ? "This deletes everything stored in this browser and sets it all back to zero. Copies already backed up to the server are not touched." : "This permanently deletes every transaction, account, budget, goal, transfer and bill, and sets everything back to zero."}
            confirmLabel="Reset everything"
            onCancel={() => setResetAsk(false)}
            onConfirm={resetAllData}
          />
        ))}

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}

      {openMetric && (
        <DetailModal
          metricId={openMetric}
          transactions={transactions}
          onClose={() => setOpenMetric(null)}
        />
      )}
    </div>
    </>
  );
}

export default App;