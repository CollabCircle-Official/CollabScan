"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Camera, ExternalLink, ImageUp, ScanLine, Square } from "lucide-react";
import type { Html5Qrcode as ScannerType } from "html5-qrcode";
import { parseWifiQr } from "@/lib/wifi";
import { WifiResult } from "./WifiResult";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const SUPPORTED_IMAGE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
]);

export function QrScanner() {
  const scanner = useRef<ScannerType | null>(null);
  const [active, setActive] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function stopCamera() {
    if (scanner.current?.isScanning)
      await scanner.current.stop().catch(() => undefined);
    scanner.current?.clear();
    scanner.current = null;
    setActive(false);
  }

  useEffect(
    () => () => {
      void stopCamera();
    },
    [],
  );

  async function startCamera() {
    setError("");
    setResult("");
    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const instance = new Html5Qrcode("camera-reader");
      scanner.current = instance;
      await instance.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 230, height: 230 } },
        (text) => {
          setResult(text);
          void stopCamera();
        },
        () => undefined,
      );
      setActive(true);
    } catch {
      setError(
        "Camera access failed. Allow permission or upload an image instead.",
      );
      await stopCamera();
    }
  }

  async function scanFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    setResult("");
    if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
      setError("Choose a PNG, JPG, WebP, or GIF image.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Choose an image smaller than 10 MB.");
      event.target.value = "";
      return;
    }
    await stopCamera();
    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const fileScanner = new Html5Qrcode("file-reader");
      setResult(await fileScanner.scanFile(file, true));
      fileScanner.clear();
    } catch {
      setError("No readable QR code was found in that image.");
    } finally {
      event.target.value = "";
    }
  }

  const isLink = /^https?:\/\//i.test(result);
  const wifiNetwork = parseWifiQr(result);

  return (
    <div className="scanner-grid">
      <div className="tool-form">
        <p>
          Point your camera at a QR code or choose a clear image from your
          device.
        </p>
        <div className="scan-actions">
          <button
            className="primary-button"
            onClick={active ? stopCamera : startCamera}
          >
            {active ? <Square size={19} /> : <Camera size={20} />}{" "}
            {active ? "Stop camera" : "Use camera"}
          </button>
          <label className="secondary-button upload-button">
            <ImageUp size={19} /> Upload image
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={scanFile}
            />
          </label>
        </div>
        {error && (
          <p className="status error" role="alert">
            {error}
          </p>
        )}
      </div>
      <div className="scanner-preview">
        <div
          id="camera-reader"
          className={active ? "camera-box active" : "camera-box"}
        />
        <div id="file-reader" hidden />
        {!active && !result && (
          <div className="scan-placeholder">
            <ScanLine size={72} strokeWidth={1} />
            <span>
              Your camera or scan result
              <br />
              will appear here
            </span>
          </div>
        )}
        {result &&
          (wifiNetwork ? (
            <WifiResult network={wifiNetwork} rawValue={result} />
          ) : (
            <div className="scan-result">
              <span>QR code detected</span>
              <p>{result}</p>
              {isLink && (
                <a href={result} target="_blank" rel="noreferrer">
                  Open link <ExternalLink size={16} />
                </a>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
