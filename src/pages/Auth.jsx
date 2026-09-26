import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import authHero from '../assets/auth_hero.png';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const switchMode = () => {
    if (loading) return;
    setIsLogin((current) => !current);
    setShowPassword(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (loading) return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password || (!isLogin && !name)) {
      toast.error('Please complete all required fields.');
      return;
    }

    // Demo-only sign-in: replace this simulated flow when backend auth is ready.
    setLoading(true);
    window.setTimeout(() => {
      const displayName = name || email.split('@')[0];
      login({
        name: displayName,
        email,
        avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
      });
      toast.success(`${isLogin ? 'Welcome back' : 'Welcome'}, ${displayName}!`);
      setLoading(false);
      navigate('/dashboard');
    }, 900);
  };

  const inputClassName =
    'block min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium text-text-main outline-none transition placeholder:font-normal placeholder:text-gray-400 hover:border-gray-300 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10';

  return (
    <div className="min-h-screen bg-[#faf9f6] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      {/* Brand / image panel */}
      <aside className="relative hidden min-h-screen overflow-hidden bg-gray-950 lg:flex">
        <img
          src={authHero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/35 to-primary/50" />

        <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
          <a href="/" aria-label="QuickBite home" className="inline-flex w-fit items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-black italic text-primary shadow-lg">Q</span>
            <span className="text-xl font-extrabold tracking-tight text-white">QuickBite</span>
          </a>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="max-w-xl pb-8"
          >
            <span className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur">
              A little joy in every bite
            </span>
            <h2 className="text-5xl font-black leading-[1.08] tracking-tight text-white xl:text-6xl">
              Your next great meal is <span className="text-orange-300">closer.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 xl:text-lg">
              Find something delicious, make it yours, and enjoy the good stuff with QuickBite.
            </p>
          </motion.div>

          <p className="text-xs font-medium text-white/60">
            © {new Date().getFullYear()} QuickBite. Made for food lovers.
          </p>
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex min-h-screen flex-col items-center justify-center px-5 py-8 sm:px-8 lg:px-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <a href="/" aria-label="QuickBite home" className="inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl font-black italic text-white">Q</span>
              <span className="text-lg font-extrabold tracking-tight text-text-main">QuickBite</span>
            </a>
            <span className="text-xs font-semibold text-text-muted">Food, made easy</span>
          </div>

          <motion.section
            key={isLogin ? 'login' : 'signup'}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            aria-labelledby="auth-heading"
          >
            <div className="mb-7">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                {isLogin ? 'Welcome to QuickBite' : 'Join QuickBite'}
              </p>
              <h1 id="auth-heading" className="text-3xl font-extrabold tracking-tight text-text-main sm:text-4xl">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
                {isLogin
                  ? 'Sign in to continue discovering meals you love.'
                  : 'A few details and you’ll be ready to explore the menu.'}
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 rounded-xl bg-gray-100 p-1" role="tablist" aria-label="Account access">
              <button
                type="button"
                role="tab"
                aria-selected={isLogin}
                onClick={() => !loading && setIsLogin(true)}
                className={`min-h-10 rounded-lg px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isLogin ? 'bg-white text-text-main shadow-sm' : 'text-gray-500 hover:text-gray-800'
                  }`}
              >
                Sign in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={!isLogin}
                onClick={() => !loading && setIsLogin(false)}
                className={`min-h-10 rounded-lg px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${!isLogin ? 'bg-white text-text-main shadow-sm' : 'text-gray-500 hover:text-gray-800'
                  }`}
              >
                Create account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence initial={false}>
                {!isLogin && (
                  <motion.div
                    key="name-field"
                    initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <label htmlFor="auth-name" className="mb-1.5 block text-sm font-semibold text-gray-700">
                      Full name
                    </label>
                    <div className="relative">
                      <FiUser aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                      <input
                        id="auth-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required={!isLogin}
                        disabled={loading}
                        className={inputClassName}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label htmlFor="auth-email" className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Email address
                </label>
                <div className="relative">
                  <FiMail aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                  <input
                    id="auth-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className={inputClassName}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label htmlFor="auth-password" className="text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => toast('Password recovery will be available when authentication is connected.', { icon: 'ℹ️' })}
                      className="rounded text-xs font-semibold text-primary hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <FiLock aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className={`${inputClassName} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {showPassword ? <FiEyeOff aria-hidden="true" size={17} /> : <FiEye aria-hidden="true" size={17} />}
                  </button>
                </div>
                {!isLogin && (
                  <p className="mt-2 text-xs text-text-muted">Use a password you can remember and keep private.</p>
                )}
              </div>

              <Button
                type="submit"
                variant="cta"
                size="lg"
                disabled={loading}
                className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-bold shadow-md shadow-primary/15 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                    <span>{isLogin ? 'Signing in…' : 'Creating account…'}</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? 'Sign in' : 'Create account'}</span>
                    <FiArrowRight aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-text-muted">
              {isLogin ? 'New to QuickBite?' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={switchMode}
                disabled={loading}
                className="rounded font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
              >
                {isLogin ? 'Create an account' : 'Sign in'}
              </button>
            </p>

            <p className="mt-8 text-center text-xs leading-relaxed text-gray-400">
              This is a frontend demo. Account access and password recovery are simulated and are not connected to a server.
            </p>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default Auth;