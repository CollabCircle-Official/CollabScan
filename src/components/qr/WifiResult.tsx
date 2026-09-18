"use client";

import { useState } from "react";
import { Check, Copy, Eye, EyeOff, LockKeyhole, Wifi } from "lucide-react";
import type { WifiNetwork } from "@/lib/wifi";

export function WifiResult({
  network,
  rawValue,
}: {
  network: WifiNetwork;
  rawValue: string;
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyPassword() {
    try {
      await navigator.clipboard.writeText(network.password);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="wifi-result">
      <div className="wifi-heading">
        <span className="wifi-icon">
          <Wifi size={25} />
        </span>
        <div>
          <span>Wi-Fi network</span>
          <h3>{network.ssid}</h3>
        </div>
      </div>

      <dl className="wifi-details">
        <div>
          <dt>Security</dt>
          <dd>
            <LockKeyhole size={15} /> {network.security}
          </dd>
        </div>
        {network.hidden && (
          <div>
            <dt>Visibility</dt>
            <dd>Hidden network</dd>
          </div>
        )}
        <div className="password-detail">
          <dt>Password</dt>
          <dd>
            <code>
              {network.password
                ? passwordVisible
                  ? network.password
                  : "••••••••••••"
                : "No password"}
            </code>
            {network.password && (
              <div className="password-actions">
                <button
                  type="button"
                  onClick={() => setPasswordVisible((visible) => !visible)}
                  aria-label={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                >
                  {passwordVisible ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
                <button
                  type="button"
                  onClick={copyPassword}
                  aria-label="Copy password"
                >
                  {copied ? <Check size={17} /> : <Copy size={17} />}
                </button>
              </div>
            )}
          </dd>
        </div>
      </dl>

      {copied && (
        <p className="copy-confirmation" role="status">
          Password copied
        </p>
      )}
      <p className="connect-hint">
        Open your device’s Wi-Fi settings, choose{" "}
        <strong>{network.ssid}</strong>, and enter the password above.
      </p>
      <details className="raw-result">
        <summary>Show raw QR content</summary>
        <code>{rawValue}</code>
      </details>
    </div>
  );
}
