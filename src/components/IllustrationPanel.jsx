import heroImage from '../assets/hero.png';

export default function IllustrationPanel() {
  return (
    <div className="hidden h-full rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-soft lg:block dark:border-slate-700/70 dark:bg-slate-900/70">
      <img
        src={heroImage}
        alt="Illustration de connexion sécurisée"
        className="h-full w-full rounded-2xl object-cover"
      />
      <p className="mt-3 text-center text-sm text-slate-600 dark:text-slate-300">
        Authentification moderne et expérience utilisateur fluide.
      </p>
    </div>
  );
}
