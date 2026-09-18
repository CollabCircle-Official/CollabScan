import {
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { SocialLink } from "@/lib/social-links";

const icons = {
  Website: FaGlobe,
  Linkedin: FaLinkedinIn,
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  X: FaXTwitter,
  YouTube: FaYoutube,
};

export function Footer({ links }: { links: SocialLink[] }) {
  return (
    <footer className="footer" id="footer">
      <div>
        <p className="footer-brand">
          Collab<span>Scan</span>
        </p>
        <p>Useful tools, thoughtfully made by CollabCircle.</p>
      </div>
      <nav aria-label="Social media">
        {links.map(({ label, href }) => {
          const Icon = icons[label as keyof typeof icons];
          return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
            >
              <Icon size={18} aria-hidden="true" />
            </a>
          );
        })}
      </nav>
      <p>© {new Date().getFullYear()} CollabCircle. All rights reserved.</p>
    </footer>
  );
}
