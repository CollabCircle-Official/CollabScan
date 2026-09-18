"use client";

import { FormEvent, useState } from "react";
import { Check, Download, Link2, LoaderCircle, QrCode } from "lucide-react";
import Image from "next/image";
import QRCode from "qrcode";
import { downloadQr, type ImageFormat } from "@/lib/download";

export function QrGenerator() {
  const [value, setValue] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [format, setFormat] = useState<ImageFormat>("png");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function generate(event: FormEvent) {
    event.preventDefault();
    const content = value.trim();
    if (!content) return setError("Enter a link or some text first.");
    setBusy(true);
    setError("");
    try {
      setQrImage(
        await QRCode.toDataURL(content, {
          width: 720,
          margin: 3,
          errorCorrectionLevel: "H",
          color: { dark: "#17231d", light: "#ffffff" },
        }),
      );
    } catch {
      setError("We couldn’t generate that QR code. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="generator-grid">
      <form onSubmit={generate} className="tool-form">
        <p>Paste a URL or enter any text.</p>
        <label htmlFor="qr-content">Link or text</label>
        <div className="input-wrap">
          <Link2 size={20} />
          <input
            id="qr-content"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="https://your-link.com"
            maxLength={2048}
            autoComplete="off"
          />
        </div>
        <div className="format-row" aria-label="Download format">
          <span>File format</span>
          {(["png", "jpeg"] as ImageFormat[]).map((item) => (
            <button
              type="button"
              className={format === item ? "selected" : ""}
              onClick={() => setFormat(item)}
              key={item}
            >
              {format === item && <Check size={14} />}{" "}
              {item === "jpeg" ? "JPG" : "PNG"}
            </button>
          ))}
        </div>
        {error && (
          <p className="status error" role="alert">
            {error}
          </p>
        )}
        <button className="primary-button" disabled={busy}>
          {busy ? (
            <LoaderCircle className="spin" size={20} />
          ) : (
            <QrCode size={20} />
          )}
          {busy ? "Generating…" : "Generate QR"}
        </button>
      </form>
      <div className="preview-card">
        <div className={`qr-preview ${qrImage ? "ready" : ""}`}>
          {qrImage ? (
            <Image
              src={qrImage}
              alt="Generated QR code"
              width={720}
              height={720}
              unoptimized
            />
          ) : (
            <>
              <QrCode size={76} strokeWidth={1} />
              <span>
                Your QR code
                <br />
                will appear here
              </span>
            </>
          )}
        </div>
        <button
          className="secondary-button"
          disabled={!qrImage}
          onClick={() => qrImage && downloadQr(qrImage, format)}
        >
          <Download size={19} /> Download {format === "jpeg" ? "JPG" : "PNG"}
        </button>
      </div>
    </div>
  );
}
