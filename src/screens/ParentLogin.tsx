import { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function ParentLogin() {
  const { dispatch, navigate } = useGame();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  function handleLogin() {
    dispatch({ type: 'SET_PARENT_MODE', value: true });
    dispatch({ type: 'SET_PARENT_NAV', tab: 'home' });
    navigate('parentDashboard');
  }

  const inputStyle = {
    width: '100%',
    padding: '16px 18px',
    fontSize: 16,
    borderRadius: 14,
    border: '2px solid #F7DDD0',
    background: 'white',
    color: '#24313A',
    fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif",
    outline: 'none',
    boxSizing: 'border-box' as const,
    display: 'block',
  };

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%', padding: '40px 28px' }}>
      <button
        onClick={() => { dispatch({ type: 'SET_PARENT_MODE', value: false }); navigate('welcome'); }}
        style={{ background: 'transparent', border: 'none', color: '#756B63', fontSize: 14, cursor: 'pointer', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif", padding: 0 }}
      >
        ← Back
      </button>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>👨‍👩‍👧</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#24313A', margin: '0 0 6px' }}>
          {mode === 'login' ? 'Welcome back!' : 'Create account'}
        </h1>
        <p style={{ fontSize: 15, color: '#756B63', margin: 0 }}>
          {mode === 'login' ? "See your child's learning journey" : "Start tracking your child's progress"}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 14, fontWeight: 700, color: '#756B63', display: 'block', marginBottom: 8 }}>
            Email or phone
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = '#D9683B'; }}
            onBlur={e => { e.target.style.borderColor = '#F7DDD0'; }}
          />
        </div>
        <div>
          <label style={{ fontSize: 14, fontWeight: 700, color: '#756B63', display: 'block', marginBottom: 8 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = '#D9683B'; }}
            onBlur={e => { e.target.style.borderColor = '#F7DDD0'; }}
          />
        </div>
      </div>

      <button className="btn-primary" onClick={handleLogin} style={{ marginBottom: 12 }}>
        {mode === 'login' ? 'Log In' : 'Create Account'}
      </button>

      <button
        onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')}
        style={{ background: 'transparent', border: 'none', color: '#D9683B', fontSize: 15, cursor: 'pointer', width: '100%', padding: '12px', fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}
      >
        {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
      </button>

      {/* Demo notice */}
      <div style={{ marginTop: 28, background: '#DDE9DD', borderRadius: 14, padding: '14px 16px' }}>
        <p style={{ fontSize: 13, color: '#4B9180', margin: 0, textAlign: 'center' }}>
          🔒 Demo mode — tap Log In to explore the parent view
        </p>
      </div>

      <button
        onClick={() => navigate('responsibleScreening')}
        style={{ background: 'transparent', border: 'none', color: '#756B63', fontSize: 13, cursor: 'pointer', width: '100%', padding: '12px', marginTop: 12, fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif" }}
      >
        About Untangle →
      </button>
    </div>
  );
}
