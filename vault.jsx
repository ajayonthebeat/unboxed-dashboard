import { useState, useEffect } from "react";

const PIN = "2026";

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [tab, setTab] = useState("backup");
  const [status, setStatus] = useState("");
  const [counts, setCounts] = useState(null);
  const [exportData, setExportData] = useState("");
  const [importText, setImportText] = useState("");
  const [vault, setVault] = useState([]);
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");
  const [showValues, setShowValues] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auto-login check
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("ub-auth");
        if (r?.value) setAuthed(true);
      } catch (e) {}
      setLoading(false);
    })();
  }, []);

  // Load vault
  useEffect(() => {
    if (!authed) return;
    (async () => {
      try {
        const r = await window.storage.get("ub-vault2");
        if (r?.value) setVault(JSON.parse(r.value));
      } catch (e) {}
      // Check data counts
      try {
        const r = await window.storage.get("ub-e3");
        const b = await window.storage.get("ub-bank");
        const p = await window.storage.get("ub-ppl");
        const entries = r?.value ? JSON.parse(r.value) : [];
        const bank = b?.value ? JSON.parse(b.value) : [];
        const ppl = p?.value ? JSON.parse(p.value) : {};
        setCounts({ entries: entries.length, bank: bank.length, ppl: Object.keys(ppl).length });
      } catch (e) {
        setCounts({ error: e.message });
      }
    })();
  }, [authed]);

  const saveVault = async (v) => {
    setVault(v);
    try { await window.storage.set("ub-vault2", JSON.stringify(v)); } catch (e) {}
  };

  const doExport = async () => {
    setStatus("Loading data...");
    try {
      const r = await window.storage.get("ub-e3");
      const b = await window.storage.get("ub-bank");
      const p = await window.storage.get("ub-ppl");
      const data = {
        entries: r?.value ? JSON.parse(r.value) : [],
        bankTxns: b?.value ? JSON.parse(b.value) : [],
        pplInfo: p?.value ? JSON.parse(p.value) : {},
        exported: new Date().toISOString()
      };
      const json = JSON.stringify(data);
      setExportData(json);
      setStatus(`✓ Ready! ${data.entries.length} entries, ${data.bankTxns.length} bank txns. Select all and copy.`);
    } catch (e) {
      setStatus("Error: " + e.message);
    }
  };

  const doImport = async () => {
    if (!importText.trim()) { setStatus("Paste data first"); return; }
    try {
      const data = JSON.parse(importText.trim());
      if (!data.entries) { setStatus("Invalid format"); return; }
      const confirmMsg = `Replace ALL data with:\n${data.entries.length} entries\n${(data.bankTxns || []).length} bank txns\n${Object.keys(data.pplInfo || {}).length} people\n\nThis cannot be undone!`;
      if (!confirm(confirmMsg)) return;
      await window.storage.set("ub-e3", JSON.stringify(data.entries));
      if (data.bankTxns) await window.storage.set("ub-bank", JSON.stringify(data.bankTxns));
      if (data.pplInfo) await window.storage.set("ub-ppl", JSON.stringify(data.pplInfo));
      setCounts({ entries: data.entries.length, bank: (data.bankTxns || []).length, ppl: Object.keys(data.pplInfo || {}).length });
      setImportText("");
      setStatus("✓ Data imported successfully!");
    } catch (e) {
      setStatus("Error: " + e.message);
    }
  };

  const is = { background: "#27272a", border: "1px solid #3f3f46", borderRadius: 8, padding: "10px 12px", color: "#fafafa", fontSize: 13, outline: "none", width: "100%" };
  const btn = (active) => ({ padding: "10px 16px", borderRadius: 8, border: "none", background: active ? "#3f3f46" : "transparent", color: active ? "#fafafa" : "#71717a", cursor: "pointer", fontSize: 12, fontWeight: 600 });

  if (loading) return <div style={{ minHeight: "100vh", background: "#09090b" }} />;

  if (!authed) return (
    <div style={{ minHeight: "100vh", background: "#09090b", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 340, textAlign: "center" }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: "#fafafa", marginBottom: 4 }}>🔒 VAULT</div>
        <div style={{ color: "#52525b", fontSize: 10, marginBottom: 32 }}>Unboxed TCG · Backup & Secrets</div>
        <div style={{ background: "rgba(24,24,27,.9)", borderRadius: 12, padding: 24, border: "1px solid #27272a" }}>
          <input type="password" value={pin} onChange={e => setPin(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && pin === PIN) { setAuthed(true); window.storage.set("ub-auth", "1").catch(() => {}); }}} placeholder="••••" style={{ ...is, textAlign: "center", letterSpacing: 8, fontSize: 18, fontFamily: "monospace", marginBottom: 12 }} />
          <button onClick={() => { if (pin === PIN) { setAuthed(true); window.storage.set("ub-auth", "1").catch(() => {}); } else { setPin(""); }}} style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#000", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>Unlock</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#09090b", color: "#fafafa", padding: "0 0 40px" }}>
      <div style={{ padding: "16px 16px 0", maxWidth: 500, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 18, fontWeight: 900 }}>🔒 VAULT</span>
            <span style={{ color: "#52525b", fontSize: 9, marginLeft: 8 }}>Unboxed TCG</span>
          </div>
          <button onClick={async () => { try { await window.storage.delete("ub-auth"); } catch (e) {} setAuthed(false); setPin(""); }} style={{ background: "transparent", border: "1px solid #3f3f46", borderRadius: 6, color: "#71717a", cursor: "pointer", fontSize: 9, padding: "4px 10px" }}>🔒 Lock</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
          {[["backup", "💾 Backup"], ["vault", "🔑 Secrets"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={btn(tab === k)}>{l}</button>
          ))}
        </div>

        {/* Status Bar */}
        {counts && !counts.error && (
          <div style={{ display: "flex", gap: 12, marginBottom: 16, padding: "10px 14px", background: "#18181b", borderRadius: 8, border: "1px solid #27272a" }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ color: "#f59e0b", fontSize: 18, fontWeight: 900 }}>{counts.entries}</div>
              <div style={{ color: "#71717a", fontSize: 8 }}>ENTRIES</div>
            </div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ color: "#3b82f6", fontSize: 18, fontWeight: 900 }}>{counts.bank}</div>
              <div style={{ color: "#71717a", fontSize: 8 }}>BANK TXN</div>
            </div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ color: "#10b981", fontSize: 18, fontWeight: 900 }}>{counts.ppl}</div>
              <div style={{ color: "#71717a", fontSize: 8 }}>PEOPLE</div>
            </div>
          </div>
        )}
        {counts?.error && (
          <div style={{ padding: "10px 14px", background: "rgba(239,68,68,.1)", borderRadius: 8, border: "1px solid #ef444440", marginBottom: 16, color: "#ef4444", fontSize: 10 }}>
            Storage error: {counts.error}
          </div>
        )}

        {/* Status message */}
        {status && <div style={{ padding: "8px 12px", background: "#27272a", borderRadius: 6, marginBottom: 12, fontSize: 10, color: "#a1a1aa", wordBreak: "break-all" }}>{status}</div>}

        {/* BACKUP TAB */}
        {tab === "backup" && (
          <div>
            {/* Export */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ color: "#10b981", fontSize: 11, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>EXPORT</div>
              <button onClick={doExport} style={{ width: "100%", padding: "14px", borderRadius: 8, border: "1px solid #10b98140", background: "rgba(16,185,129,.1)", color: "#10b981", cursor: "pointer", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
                📋 Generate Backup
              </button>
              {exportData && (
                <div>
                  <div style={{ color: "#71717a", fontSize: 9, marginBottom: 4 }}>Tap the box → Select All → Copy → Paste somewhere safe</div>
                  <textarea readOnly value={exportData} style={{ ...is, height: 120, fontSize: 7, fontFamily: "monospace", resize: "vertical" }} onFocus={e => e.target.select()} />
                </div>
              )}
            </div>

            {/* Import */}
            <div>
              <div style={{ color: "#3b82f6", fontSize: 11, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>IMPORT</div>
              <div style={{ color: "#71717a", fontSize: 9, marginBottom: 6 }}>Paste exported data here to restore</div>
              <textarea value={importText} onChange={e => setImportText(e.target.value)} placeholder="Paste backup JSON here..." style={{ ...is, height: 100, fontSize: 9, fontFamily: "monospace", marginBottom: 8, resize: "vertical" }} />
              <button onClick={doImport} disabled={!importText.trim()} style={{ width: "100%", padding: "14px", borderRadius: 8, border: "none", background: importText.trim() ? "#3b82f6" : "#27272a", color: importText.trim() ? "#fff" : "#52525b", cursor: importText.trim() ? "pointer" : "default", fontSize: 13, fontWeight: 700 }}>
                📥 Import & Replace Data
              </button>
            </div>
          </div>
        )}

        {/* VAULT TAB */}
        {tab === "vault" && (
          <div>
            <div style={{ color: "#f59e0b", fontSize: 11, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>STORED SECRETS</div>
            
            {vault.length === 0 && <div style={{ color: "#52525b", fontSize: 11, marginBottom: 16 }}>No secrets stored yet</div>}
            
            {vault.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: "#18181b", borderRadius: 8, border: "1px solid #27272a", marginBottom: 6 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#f59e0b", fontSize: 9, fontWeight: 700, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ color: "#fafafa", fontSize: 11, fontFamily: "monospace", wordBreak: "break-all" }}>
                    {showValues ? item.value : "••••••••••••"}
                  </div>
                </div>
                <button onClick={() => {
                  const ta = document.createElement("textarea");
                  ta.value = item.value;
                  ta.style.position = "fixed";
                  ta.style.left = "-9999px";
                  document.body.appendChild(ta);
                  ta.select();
                  document.execCommand("copy");
                  document.body.removeChild(ta);
                  setStatus(`✓ Copied ${item.label}`);
                }} style={{ background: "transparent", border: "1px solid #3f3f46", borderRadius: 4, color: "#71717a", cursor: "pointer", fontSize: 8, padding: "4px 8px" }}>Copy</button>
                <button onClick={() => { const nv = vault.filter((_, j) => j !== i); saveVault(nv); }} style={{ background: "transparent", border: "none", color: "#52525b", cursor: "pointer", fontSize: 14 }}>×</button>
              </div>
            ))}

            <button onClick={() => setShowValues(!showValues)} style={{ background: "transparent", border: "1px solid #3f3f46", borderRadius: 6, color: "#71717a", cursor: "pointer", fontSize: 9, padding: "6px 12px", marginTop: 8, marginBottom: 16 }}>
              {showValues ? "🙈 Hide Values" : "👁 Show Values"}
            </button>

            {/* Add new */}
            <div style={{ borderTop: "1px solid #27272a", paddingTop: 16 }}>
              <div style={{ color: "#71717a", fontSize: 9, fontWeight: 600, marginBottom: 8 }}>ADD NEW SECRET</div>
              <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Label (e.g. Shopify API Key)" style={{ ...is, marginBottom: 6 }} />
              <input value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Value / Password / Key" type={showValues ? "text" : "password"} style={{ ...is, marginBottom: 8, fontFamily: "monospace" }} />
              <button onClick={() => {
                if (!newLabel.trim() || !newValue.trim()) { setStatus("Enter both label and value"); return; }
                const nv = [...vault, { label: newLabel.trim(), value: newValue.trim() }];
                saveVault(nv);
                setNewLabel("");
                setNewValue("");
                setStatus(`✓ Saved "${newLabel.trim()}"`);
              }} style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#000", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
                + Save Secret
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
