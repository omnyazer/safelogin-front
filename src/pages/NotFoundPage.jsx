import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <motion.section
      key="not-found-page"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto mt-16 max-w-xl rounded-3xl border border-slate-200 bg-white/90 p-8 text-center shadow-soft dark:border-slate-700 dark:bg-slate-900/70"
    >
      <p className="font-display text-6xl font-bold text-slate-900 dark:text-slate-50">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-slate-50">Page introuvable</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        La route demandée n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
      >
        Retour à la connexion
      </Link>
    </motion.section>
  );
}
