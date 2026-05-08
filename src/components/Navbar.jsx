import AvatarBadge from './AvatarBadge';

export default function Navbar({ user, onLogout, isDarkMode, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/30 bg-white/70 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-cyan-400 dark:text-slate-950">
            <span className="font-display text-lg font-bold">SL</span>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">SafeLogin</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Secure Access Center</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            {isDarkMode ? 'Mode clair' : 'Mode sombre'}
          </button>

          {user ? (
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-900">
              <AvatarBadge username={user.username} />
              <div className="hidden sm:block">
                <p className="text-xs text-slate-500 dark:text-slate-400">Connecté</p>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{user.username}</p>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-rose-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <span className="hidden rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 sm:inline-block dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              Invité
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
