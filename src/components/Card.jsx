export default function Card({ title, subtitle, className = '', children }) {
  return (
    <section
      className={`rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-soft backdrop-blur-sm dark:border-slate-700/70 dark:bg-slate-900/70 ${className}`}
    >
      {(title || subtitle) && (
        <header className="mb-5">
          {title && <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
