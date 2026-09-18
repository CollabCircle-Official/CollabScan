"use client";

import { useState } from "react";
import { QrCode, ScanLine } from "lucide-react";
import { QrGenerator } from "./QrGenerator";
import { QrScanner } from "./QrScanner";

type Mode = "generate" | "scan";

export function QrWorkspace() {
  const [mode, setMode] = useState<Mode>("generate");
  return (
    <section className="workspace" aria-label="QR code tools">
      <div className="mode-tabs" role="tablist" aria-label="Choose a QR tool">
        <button
          role="tab"
          aria-selected={mode === "generate"}
          onClick={() => setMode("generate")}
        >
          <QrCode size={18} /> Generate
        </button>
        <button
          role="tab"
          aria-selected={mode === "scan"}
          onClick={() => setMode("scan")}
        >
          <ScanLine size={18} /> Scan
        </button>
      </div>
      <div className="tool-panel">
        {mode === "generate" ? <QrGenerator /> : <QrScanner />}
      </div>
    </section>
  );
}
