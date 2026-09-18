export interface WifiNetwork {
  ssid: string;
  password: string;
  security: string;
  hidden: boolean;
}

const securityLabels: Record<string, string> = {
  WEP: "WEP",
  WPA: "WPA / WPA2",
  WPA2: "WPA2",
  WPA3: "WPA3",
  SAE: "WPA3",
  nopass: "Open network",
};

function unescapeWifiValue(value: string) {
  return value.replace(/\\([\\;,:"])/g, "$1");
}

/** Splits on Wi-Fi QR delimiters while preserving escaped semicolons. */
function splitFields(payload: string) {
  const fields: string[] = [];
  let current = "";
  let escaped = false;

  for (const character of payload) {
    if (character === ";" && !escaped) {
      fields.push(current);
      current = "";
      continue;
    }
    current += character;
    escaped = character === "\\" && !escaped;
    if (character !== "\\") escaped = false;
  }
  if (current) fields.push(current);
  return fields;
}

/** Parses the interoperable `WIFI:T:...;S:...;P:...;;` QR format. */
export function parseWifiQr(value: string): WifiNetwork | null {
  if (!value.startsWith("WIFI:")) return null;

  const values = new Map<string, string>();
  for (const field of splitFields(value.slice(5))) {
    const separator = field.indexOf(":");
    if (separator < 0) continue;
    values.set(
      field.slice(0, separator),
      unescapeWifiValue(field.slice(separator + 1)),
    );
  }

  const ssid = values.get("S") ?? "";
  if (!ssid) return null;
  const rawSecurity = values.get("T") || "nopass";

  return {
    ssid,
    password: values.get("P") ?? "",
    security: securityLabels[rawSecurity] ?? rawSecurity,
    hidden: values.get("H")?.toLowerCase() === "true",
  };
}
