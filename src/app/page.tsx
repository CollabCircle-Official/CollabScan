import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QrWorkspace } from "@/components/qr/QrWorkspace";
import { getSocialLinks } from "@/lib/social-links";

export default function Home() {
  const socialLinks = getSocialLinks();
  const websiteUrl = socialLinks.find(({ label }) => label === "Website")?.href;

  return (
    <div className="site-shell" id="top">
      <main className="desk-main">
        <section className="desk-scene" aria-label="CollabScan QR tools">
          <Header websiteUrl={websiteUrl} />
          <div className="monitor-screen">
            <QrWorkspace />
          </div>
          <div className="trust-row" aria-label="Product benefits">
            <div>
              <strong>100%</strong>
              <span>Browser based</span>
            </div>
            <div>
              <strong>0</strong>
              <span>Data collected</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>Free scans</span>
            </div>
          </div>
        </section>
      </main>
      <Footer links={socialLinks} />
    </div>
  );
}
