import { motion } from 'framer-motion';
import Card from '../components/Card';
import AvatarBadge from '../components/AvatarBadge';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <motion.div
      key="dashboard-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6"
    >
      <Card className="overflow-hidden">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-cyan-600 dark:text-cyan-300">Dashboard</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-slate-100">
              Bienvenue, {user?.username}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">
              Voici un aperçu de votre espace sécurisé. L'authentification React + Spring Boot fonctionne.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 dark:border-cyan-700/40 dark:bg-cyan-900/20">
            <AvatarBadge username={user?.username} />
            <div>
              <p className="text-xs uppercase tracking-wide text-cyan-700 dark:text-cyan-300">Profil actif</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Connecté</p>
            </div>
          </div>
        </div>
      </Card>

    </motion.div>
  );
}
