import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/nav";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "./icons";

export function Footer() {
  return (
    <footer className="text-foreground" style={{ backgroundColor: "var(--color-badge-bg)" }}>
      <div className="container mx-auto grid gap-10 px-4 py-12 sm:grid-cols-3">
        <div>
          <h2 className="mb-3 font-heading font-bold text-lg">Contact</h2>
          <p className="text-sm">
            <strong>Address:</strong> {siteConfig.address}
          </p>
          <p className="text-sm">
            <strong>Email:</strong>{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-link underline">
              {siteConfig.email}
            </a>
          </p>
          <ul className="mt-4 flex gap-4">
            <li>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener"
                aria-label="Grandad's Cards on Facebook"
                className="text-foreground hover:text-accent"
              >
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Grandad's Cards on Instagram"
                className="text-foreground hover:text-accent"
              >
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener"
                aria-label="Grandad's Cards on Twitter"
                className="text-foreground hover:text-accent"
              >
                <TwitterIcon />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-heading font-bold text-lg">Store Policies</h2>
          <ul className="space-y-1 text-sm">
            <li><Link href="/policies/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/policies/refund-policy">Refund Policy</Link></li>
            <li><Link href="/policies/shipping-policy">Shipping Policy</Link></li>
            <li><Link href="/policies/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="text-center">
          <Image
            src="/images/site/logo-footer.png"
            alt={siteConfig.name}
            width={140}
            height={140}
            className="mx-auto"
          />
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-neutral-500">
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </div>
    </footer>
  );
}
