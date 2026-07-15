export function NewsletterSection() {
  return (
    <section className="py-14 text-center" style={{ backgroundColor: "var(--background)" }}>
      <div className="container mx-auto max-w-lg px-4">
        <h2 className="mb-3 text-2xl font-bold">Sign up for Drops + Items + Restocks</h2>
        <p className="mb-6 text-neutral-600">Be the first to know about new collections and exclusive offers.</p>
        <form className="flex overflow-hidden rounded border border-border bg-white">
          <input
            type="email"
            placeholder="Your email"
            aria-label="Email"
            required
            className="w-full px-4 py-3 text-sm outline-none"
          />
          <button
            type="submit"
            disabled
            title="Newsletter signup will be wired up once the backend API is connected"
            className="flex items-center justify-center bg-accent px-5 text-white opacity-40"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" aria-hidden="true">
              <path d="M4.696 12h14.686m-7.007-7.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
