export const ART_OPTIONS = [
  { id: "summit", label: "Summit" },
  { id: "growth", label: "Growth" },
  { id: "coins", label: "Coin stacks" },
  { id: "skyline", label: "Skyline" },
];

const Summit = () => (
  <svg viewBox="0 0 220 120" className="finance-art" aria-hidden="true">
    <defs>
      <linearGradient id="artSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4a35b8" stopOpacity=".55" />
        <stop offset="1" stopColor="#12132a" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="artFar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4d49b0" />
        <stop offset="1" stopColor="#25286a" />
      </linearGradient>
      <linearGradient id="artNear" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2f3290" />
        <stop offset="1" stopColor="#15173e" />
      </linearGradient>
    </defs>
    <rect width="220" height="120" fill="url(#artSky)" />
    <circle cx="176" cy="26" r="16" fill="#f5c26b" opacity=".16" />
    <circle cx="176" cy="26" r="8" fill="#f5c26b" opacity=".9" />
    {[[20, 18], [48, 34], [92, 14], [132, 30], [206, 52]].map(([x, y]) => (
      <circle key={x} cx={x} cy={y} r="1.2" fill="#c9c3ff" opacity=".8" />
    ))}
    <polygon points="0,120 38,58 66,86 104,40 150,92 182,64 220,120" fill="url(#artFar)" />
    <polygon points="30,120 82,62 108,86 136,30 176,96 196,78 220,120" fill="url(#artNear)" />
    <polygon points="136,30 126,48 134,44 140,52 146,44 154,50" fill="#e8e6ff" opacity=".9" />
    <path d="M62 120 C86 106 100 106 114 88 S132 62 136 46" fill="none" stroke="#a78bfa" strokeWidth="1.6" strokeDasharray="3 4" strokeLinecap="round" />
    <line x1="136" y1="30" x2="136" y2="12" stroke="#d9d4ff" strokeWidth="1.6" />
    <polygon points="136,12 154,17 136,23" fill="#7c4dff" />
  </svg>
);

const Growth = () => (
  <svg viewBox="0 0 220 120" className="finance-art" aria-hidden="true">
    <defs>
      <linearGradient id="artBar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#a78bfa" />
        <stop offset="1" stopColor="#4a3fd6" />
      </linearGradient>
    </defs>
    {[18, 32, 28, 52, 68, 92].map((h, i) => (
      <rect key={i} x={20 + i * 31} y={112 - h} width="21" height={h} rx="5" fill="url(#artBar)" opacity={0.35 + i * 0.13} />
    ))}
    <polyline points="30,86 61,72 92,80 123,56 154,42 185,18" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="185" cy="18" r="6" fill="#34d399" />
    <circle cx="185" cy="18" r="11" fill="#34d399" opacity=".2" />
  </svg>
);

const Coins = () => (
  <svg viewBox="0 0 220 120" className="finance-art" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <ellipse key={`a${i}`} cx="78" cy={104 - i * 12} rx="34" ry="10" fill="#f6ad45" stroke="#b87a1b" strokeWidth="1.5" />
    ))}
    {[0, 1, 2].map((i) => (
      <ellipse key={`b${i}`} cx="150" cy={104 - i * 12} rx="28" ry="8.5" fill="#fbbf6a" stroke="#b87a1b" strokeWidth="1.5" />
    ))}
    <circle cx="150" cy="44" r="11" fill="#7c4dff" opacity=".9" />
    <path d="M145 44 l4 4 l7 -8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Skyline = () => (
  <svg viewBox="0 0 220 120" className="finance-art" aria-hidden="true">
    <circle cx="170" cy="28" r="12" fill="#e8e6ff" opacity=".9" />
    {[[14, 56, 26], [44, 38, 30], [78, 62, 24], [106, 26, 32], [142, 48, 28], [176, 66, 30]].map(([x, y, w], i) => (
      <g key={i}>
        <rect x={x} y={y} width={w} height={116 - y} rx="3" fill={i % 2 ? "#2b2f6b" : "#383c8f"} />
        {[0, 1, 2].map((r) => (
          <rect key={r} x={x + 5} y={y + 8 + r * 14} width="5" height="6" fill="#f5c26b" opacity={0.45 + ((i + r) % 3) * 0.2} />
        ))}
      </g>
    ))}
  </svg>
);

export function ArtGraphic({ kind, custom }) {
  if (kind === "custom" && custom) return <img className="finance-art custom-art" src={custom} alt="" />;
  if (kind === "growth") return <Growth />;
  if (kind === "coins") return <Coins />;
  if (kind === "skyline") return <Skyline />;
  return <Summit />;
}

export function SidebarArt({ settings }) {
  return (
    <div className="sidebar-art">
      <ArtGraphic kind={settings.sidebarArt} custom={settings.customArt} />
      <strong>{settings.sidebarTitle}</strong>
      <p>{settings.sidebarText}</p>
    </div>
  );
}