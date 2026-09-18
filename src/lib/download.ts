export type ImageFormat = "png" | "jpeg";

/** Converts a QR data URL to the selected format and starts a local download. */
export async function downloadQr(dataUrl: string, format: ImageFormat) {
  const image = new Image();
  image.src = dataUrl;
  await image.decode();
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser could not prepare the image.");
  if (format === "jpeg") {
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(image, 0, 0);
  const anchor = document.createElement("a");
  anchor.download = `collabscan-qr.${format === "jpeg" ? "jpg" : "png"}`;
  anchor.href = canvas.toDataURL(`image/${format}`, 0.96);
  anchor.click();
}
