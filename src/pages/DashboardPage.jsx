import { motion } from 'framer-motion';
import Card from '../components/Card';
import AvatarBadge from '../components/AvatarBadge';
import { useAuth } from '../context/AuthContext';

const dashboardCards = [
  {
    title: 'Score sécurité',
    value: '98%',
    description: 'Excellent niveau de sécurité détecté sur votre session.',
  },
  {
    title: 'Sessions actives',
    value: '01',
    description: 'Aucune connexion suspecte sur les dernières 24h.',
  },
  {
    title: 'Statut API',
    value: 'UP',
    description: 'Le backend Spring Boot répond correctement.',
  },
];

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

      <div className="grid gap-4 md:grid-cols-3">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * index, duration: 0.3 }}
          >
            <Card>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{card.title}</p>
              <p className="mt-2 font-display text-4xl font-bold text-slate-900 dark:text-slate-50">{card.value}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{card.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
