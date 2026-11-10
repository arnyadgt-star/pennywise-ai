import { useState } from "react";
import { Save, Download, Upload, Trash2, RotateCcw, Settings as SettingsIcon } from "lucide-react";
import { ART_OPTIONS, ArtGraphic } from "./SidebarArt";

const ACCENTS = ["#7c4dff", "#3b82f6", "#10b981", "#f43f5e", "#f59e0b", "#06b6d4"];
const CURRENCIES = ["₹", "$", "€", "£", "¥", "د.إ"];

function Section({ title, hint, children }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>{title}</h2>
          {hint && <p className="muted">{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export default function SettingsPage({
  settings,
  update,
  dirty,
  lastSaved,
  onSave,
  onExport,
  onImport,
  onClear,
  onSample,
}) {
  const [artError, setArtError] = useState("");

  const onArtFile = (e) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!f.type.startsWith("image/")) return setArtError("Please choose an image file.");
    if (f.size > 1.5 * 1024 * 1024) return setArtError("That image is over 1.5 MB. Pick a smaller one.");
    const r = new FileReader();
    r.onload = () => {
      setArtError("");
      update({ customArt: r.result, sidebarArt: "custom" });
    };
    r.readAsDataURL(f);
  };

  return (
    <>
      <div className="page-intro">
        <div>
          <h1>Settings</h1>
          <p className="muted">Make PocketNinja yours. Changes show instantly; press Save to keep them.</p>
        </div>
        <div className="page-icon">
          <SettingsIcon size={30} />
        </div>
      </div>

      <Section title="Personalise" hint="Names and look across the app.">
        <div className="transaction-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="s-name">Your name</label>
              <input id="s-name" value={settings.name} onChange={(e) => update({ name: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="s-tag">Tagline under your name</label>
              <input id="s-tag" value={settings.tagline} onChange={(e) => update({ tagline: e.target.value })} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="s-app">App name</label>
              <input id="s-app" value={settings.appName} onChange={(e) => update({ appName: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="s-slogan">Slogan</label>
              <input id="s-slogan" value={settings.slogan} onChange={(e) => update({ slogan: e.target.value })} />
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
                <input
                  type="color"
                  value={settings.accent}
                  onChange={(e) => update({ accent: e.target.value })}
                  aria-label="Custom accent colour"
                  className="swatch-input"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Sidebar image" hint="Pick an illustration or upload your own, and edit the caption.">
        <div className="art-options">
          {ART_OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`art-option ${settings.sidebarArt === o.id ? "on" : ""}`}
              onClick={() => update({ sidebarArt: o.id })}
            >
              <ArtGraphic kind={o.id} />
              {o.label}
            </button>
          ))}
          {settings.customArt && (
            <button
              type="button"
              className={`art-option ${settings.sidebarArt === "custom" ? "on" : ""}`}
              onClick={() => update({ sidebarArt: "custom" })}
            >
              <ArtGraphic kind="custom" custom={settings.customArt} />
              Your image
            </button>
          )}
        </div>
        <div className="transaction-form" style={{ marginTop: 18 }}>
          <label className="ghost-button" style={{ alignSelf: "flex-start", cursor: "pointer" }}>
            <Upload size={16} /> Upload image
            <input type="file" accept="image/*" hidden onChange={onArtFile} />
          </label>
          {artError && <p className="negative" role="alert" style={{ fontSize: 13 }}>{artError}</p>}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="s-at">Caption title</label>
              <input id="s-at" value={settings.sidebarTitle} onChange={(e) => update({ sidebarTitle: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="s-ax">Caption text</label>
              <input id="s-ax" value={settings.sidebarText} onChange={(e) => update({ sidebarText: e.target.value })} />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Assistant" hint="Rename your bot and optionally connect a real AI.">
        <div className="transaction-form">
          <div className="form-group" style={{ maxWidth: 320 }}>
            <label htmlFor="s-bot">Bot name</label>
            <input id="s-bot" value={settings.botName} onChange={(e) => update({ botName: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="s-ai">AI endpoint URL (optional)</label>
            <input
              id="s-ai"
              type="url"
              placeholder="https://your-server.com/api/advice"
              value={settings.aiEndpoint}
              onChange={(e) => update({ aiEndpoint: e.target.value })}
            />
            <p className="muted">
              Leave empty to use the built-in advisor, which works offline. If set, the app POSTs
              {" { message, context, history }"} and expects {"{ reply }"} back. Keep any API keys on that server, never in this app.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Saving and data" hint="Your data stays in this browser until you save it.">
        <div className="set-row">
          <div>
            <strong>Auto-save</strong>
            <p className="muted">Off by default, so you decide when to save.</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={settings.autoSave}
            aria-label="Auto-save"
            className={`switch ${settings.autoSave ? "on" : ""}`}
            onClick={() => update({ autoSave: !settings.autoSave })}
          />
        </div>
        <div className="set-row">
          <div>
            <strong>{dirty ? "You have unsaved changes" : "Everything is saved"}</strong>
            <p className="muted">
              {lastSaved ? `Last saved ${new Date(lastSaved).toLocaleString()}` : "Not saved on this device yet"}
            </p>
          </div>
          <button type="button" className="primary-button" onClick={onSave}>
            <Save size={16} /> Save now
          </button>
        </div>
        <div className="set-actions">
          <button type="button" className="ghost-button" onClick={onExport}>
            <Download size={16} /> Export backup
          </button>
          <label className="ghost-button" style={{ cursor: "pointer" }}>
            <Upload size={16} /> Import backup
            <input
              type="file"
              accept="application/json"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (f) onImport(f);
              }}
            />
          </label>
          <button type="button" className="ghost-button" onClick={onSample}>
            <RotateCcw size={16} /> Load sample data
          </button>
          <button type="button" className="ghost-button danger" onClick={onClear}>
            <Trash2 size={16} /> Clear all data
          </button>
        </div>
      </Section>
    </>
  );
}