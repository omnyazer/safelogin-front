import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import IllustrationPanel from '../components/IllustrationPanel';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { isUsernameTaken } from '../services/authService';

function validateForm({ username, password }, mode) {
  const errors = {};

  if (!username.trim()) {
    errors.username = "Le nom d'utilisateur est obligatoire.";
  } else if (username.trim().length < 3) {
    errors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères.";
  }

  if (!password) {
    errors.password = 'Le mot de passe est obligatoire.';
  } else if (password.length < 6) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
  }

  if (mode === 'register' && username.trim() && isUsernameTaken(username)) {
    errors.username = "Ce nom d'utilisateur est déjà pris.";
  }

  return errors;
}

export default function LoginPage() {
  const { user, login, register, authLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const onUsernameChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, username: value }));
    setErrors((prev) => ({ ...prev, username: undefined }));
  };

  const onPasswordChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, password: value }));
    setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleSubmit = async (mode) => {
    const formErrors = validateForm(formData, mode);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error('Corrige les champs invalides avant de continuer.');
      return;
    }

    const action = mode === 'login' ? login : register;
    const result = await action(formData.username.trim(), formData.password);

    if (result.ok) {
      toast.success(result.message || (mode === 'login' ? 'Connexion réussie.' : 'Inscription réussie.'));
      if (mode === 'login') {
        navigate('/dashboard');
      }
      if (mode === 'register') {
        setFormData((prev) => ({ ...prev, password: '' }));
      }
    } else {
      toast.error(result.message || 'Opération impossible.');
    }
  };

  return (
    <motion.div
      key="login-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="grid min-h-[calc(100vh-9rem)] grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_1.15fr]"
    >
      <Card
        title="Connexion sécurisée"
        subtitle="Accède à ton espace SafeLogin avec validation côté client, dark mode et animations."
        className="self-center"
      >
        <input
          type="text"
          name="fake-username"
          autoComplete="username"
          tabIndex={-1}
          className="sr-only"
          aria-hidden="true"
        />
        <input
          type="password"
          name="fake-password"
          autoComplete="current-password"
          tabIndex={-1}
          className="sr-only"
          aria-hidden="true"
        />

        <div className="space-y-4 text-left">
          <div>
            <label
              className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              htmlFor="login-username"
            >
              Nom d'utilisateur
            </label>
            <input
              id="login-username"
              name="login-username"
              value={formData.username}
              onChange={onUsernameChange}
              placeholder="ex: lisa.dev"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-cyan-700/30"
            />
            {errors.username && <p className="mt-1 text-xs font-medium text-rose-600">{errors.username}</p>}
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              htmlFor="login-password"
            >
              Mot de passe
            </label>
            <input
              id="login-password"
              name="login-password"
              type="password"
              value={formData.password}
              onChange={onPasswordChange}
              placeholder="Minimum 6 caractères"
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-cyan-700/30"
            />
            {errors.password && <p className="mt-1 text-xs font-medium text-rose-600">{errors.password}</p>}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -1 }}
            type="button"
            onClick={() => handleSubmit('login')}
            disabled={authLoading}
            className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-80 dark:bg-cyan-500 dark:text-slate-950"
          >
            {authLoading ? <Loader label="Connexion..." /> : 'Se connecter'}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -1 }}
            type="button"
            onClick={() => handleSubmit('register')}
            disabled={authLoading}
            className="rounded-xl bg-cyan-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-80 dark:bg-indigo-400 dark:text-slate-950"
          >
            {authLoading ? <Loader label="Inscription..." /> : "S'inscrire"}
          </motion.button>
        </div>
      </Card>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="h-full"
      >
        <IllustrationPanel />
      </motion.div>
    </motion.div>
  );
}
