import { useState } from 'react';
import { useGame } from '../context/GameContext';
import type { Language } from '../types';

const languages: { code: Language; label: string; native: string; flag: string }[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🌸' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '⭐' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🌺' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🌴' },
];

const avatars = ['🦊', '🐱', '🐻', '🦋', '🐸', '🦄', '🐼', '🐯'];
const ages = [5, 6, 7, 8, 9, 10, 11, 12];

export default function ChildProfileSetup() {
  const { state, dispatch, navigate } = useGame();
  const [name, setName] = useState(state.childName || '');
  const [age, setAge] = useState(state.childAge);
  const [language, setLanguage] = useState<Language>(state.childLanguage);
  const [avatar, setAvatar] = useState(state.childAvatar);
  const [step, setStep] = useState(1);

  function handleContinue() {
    if (step === 1) {
      if (!name.trim()) return;
      dispatch({ type: 'SET_CHILD_NAME', name: name.trim() });
      dispatch({ type: 'SET_CHILD_AVATAR', avatar });
      setStep(2);
    } else {
      dispatch({ type: 'SET_CHILD_AGE', age });
      dispatch({ type: 'SET_CHILD_LANGUAGE', language });
      dispatch({ type: 'SET_CHILD_NAV', tab: 'home' });
      navigate('villageHome');
    }
  }

  return (
    <div className="screen" style={{ background: '#FFF8EE', padding: '32px 24px 40px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>👋</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#24313A', margin: '0 0 6px' }}>
          Who's playing?
        </h1>
        <p style={{ fontSize: 16, color: '#756B63', margin: 0 }}>
          {step === 1 ? 'Tell us about yourself!' : 'Choose your age and language'}
        </p>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
        {[1, 2].map(s => (
          <div key={s} style={{
            width: 32, height: 6, borderRadius: 999,
            background: step >= s ? '#D9683B' : '#F7DDD0',
            transition: 'background 0.3s',
          }}/>
        ))}
      </div>

      {step === 1 ? (
        <>
          {/* Avatar picker */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#756B63', marginBottom: 12 }}>Choose your friend:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {avatars.map(a => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  style={{
                    height: 64,
                    borderRadius: 16,
                    background: avatar === a ? '#F7DDD0' : 'white',
                    border: `2px solid ${avatar === a ? '#D9683B' : 'transparent'}`,
                    fontSize: 30,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(36,49,58,0.07)',
                    transition: 'all 0.2s',
                    transform: avatar === a ? 'scale(1.08)' : 'scale(1)',
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Name input */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 15, fontWeight: 700, color: '#756B63', display: 'block', marginBottom: 10 }}>
              What's your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Type your name..."
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: 20,
                borderRadius: 16,
                border: '2px solid #F7DDD0',
                background: 'white',
                color: '#24313A',
                fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif",
                outline: 'none',
                boxShadow: '0 2px 8px rgba(36,49,58,0.07)',
                letterSpacing: '0.03em',
              }}
              onFocus={e => { e.target.style.borderColor = '#D9683B'; }}
              onBlur={e => { e.target.style.borderColor = '#F7DDD0'; }}
            />
          </div>
        </>
      ) : (
        <>
          {/* Age picker */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#756B63', marginBottom: 12 }}>How old are you?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {ages.map(a => (
                <button
                  key={a}
                  onClick={() => setAge(a)}
                  style={{
                    height: 56,
                    borderRadius: 14,
                    background: age === a ? '#D9683B' : 'white',
                    color: age === a ? 'white' : '#24313A',
                    border: `2px solid ${age === a ? '#D9683B' : 'transparent'}`,
                    fontSize: 22,
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(36,49,58,0.07)',
                    fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif",
                    transition: 'all 0.2s',
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Language picker */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#756B63', marginBottom: 12 }}>Choose language:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 14,
                    background: language === lang.code ? '#F7DDD0' : 'white',
                    border: `2px solid ${language === lang.code ? '#D9683B' : 'transparent'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(36,49,58,0.06)',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 24 }}>{lang.flag}</span>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#24313A', fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif" }}>{lang.native}</div>
                    <div style={{ fontSize: 13, color: '#756B63' }}>{lang.label}</div>
                  </div>
                  {language === lang.code && <span style={{ marginLeft: 'auto', color: '#D9683B', fontSize: 20 }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <button
        className="btn-primary"
        onClick={handleContinue}
        disabled={step === 1 && !name.trim()}
        style={{ opacity: step === 1 && !name.trim() ? 0.5 : 1, fontSize: 19, padding: '18px' }}
      >
        {step === 1 ? "Continue →" : "Let's Go! 🚀"}
      </button>

      {step === 2 && (
        <button className="btn-secondary" onClick={() => setStep(1)} style={{ marginTop: 10 }}>
          ← Back
        </button>
      )}
    </div>
  );
}
