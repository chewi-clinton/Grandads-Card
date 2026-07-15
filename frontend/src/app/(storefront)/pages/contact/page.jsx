import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/data/nav";

export const metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}. ${siteConfig.address}.`,
  alternates: { canonical: "/pages/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <Breadcrumbs items={[{ text: "Home", href: "/" }, { text: "Contact" }]} />
      <div className="container mx-auto max-w-2xl px-4 py-10">
        <h1 className="mb-12 text-center text-4xl font-bold">Contact</h1>

        <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="name">
              Name
            </label>
            <input id="name" name="name" required className="w-full rounded border border-border p-3" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="email">
              Email
            </label>
            <input id="email" type="email" name="email" required className="w-full rounded border border-border p-3" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="phone">
              Phone
            </label>
            <input id="phone" type="tel" name="phone" className="w-full rounded border border-border p-3" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold" htmlFor="message">
              Message
            </label>
            <textarea id="message" name="message" rows={5} required className="w-full rounded border border-border p-3" />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled
              title="Contact form submission will be wired up once the backend API is connected"
              className="rounded bg-[#1a1a1a] px-6 py-3 text-sm font-bold text-white opacity-40"
            >
              Send
            </button>
            <p className="mt-2 text-xs text-neutral-500">
              Form submission connects once the backend API is live &mdash; email us directly for now.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
