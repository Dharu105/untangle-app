import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';

export default function Welcome() {
  const { navigate, dispatch } = useGame();

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Illustrated sky / village header */}
      <div style={{ position: 'relative', height: 220, overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(180deg, #C8D8E8 0%, #DDE9DD 60%, #FFF8EE 100%)' }}>
        <svg viewBox="0 0 390 220" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* Storm clouds — slowly moving */}
          <ellipse cx="80"  cy="50" rx="70" ry="35" fill="#B0BCC6" opacity="0.55"/>
          <ellipse cx="55"  cy="55" rx="45" ry="25" fill="#A8B8C2" opacity="0.5"/>
          <ellipse cx="220" cy="35" rx="95" ry="42" fill="#B0BCC6" opacity="0.45"/>
          <ellipse cx="320" cy="60" rx="65" ry="32" fill="#A8B8C2" opacity="0.5"/>
          {/* Storm swirl */}
          <g style={{ transformOrigin: '195px 80px', animation: 'storm-swirl 18s linear infinite' }}>
            <path d="M195 50 Q235 65 225 90 Q215 115 195 102 Q175 90 182 65 Q188 48 195 50" fill="#9BA8B2" opacity="0.25"/>
          </g>
          {/* Ground / grass */}
          <rect x="0" y="175" width="390" height="45" fill="#C8D8B8" opacity="0.7"/>
          <ellipse cx="195" cy="175" rx="210" ry="14" fill="#B0C8A0" opacity="0.5"/>
          {/* Village houses */}
          <rect x="18"  y="140" width="52" height="50" rx="4" fill="#E8CEB0" opacity="0.9"/>
          <polygon points="18,140 70,140 44,112" fill="#C4705A" opacity="0.85"/>
          <rect x="34"  y="158" width="20" height="32" rx="3" fill="#A87858" opacity="0.6"/>
          <rect x="28"  y="145" width="12" height="12" rx="2" fill="#D4A87A" opacity="0.7"/>
          <rect x="48"  y="145" width="12" height="12" rx="2" fill="#D4A87A" opacity="0.7"/>

          <rect x="88"  y="148" width="38" height="42" rx="4" fill="#DCCCA0" opacity="0.85"/>
          <polygon points="88,148 126,148 107,126" fill="#4B9180" opacity="0.75"/>
          <rect x="99"  y="166" width="16" height="24" rx="3" fill="#A87858" opacity="0.55"/>

          <rect x="270" y="138" width="56" height="52" rx="4" fill="#E8CEB0" opacity="0.9"/>
          <polygon points="270,138 326,138 298,110" fill="#C4705A" opacity="0.85"/>
          <rect x="284" y="156" width="18" height="34" rx="3" fill="#A87858" opacity="0.6"/>
          <rect x="282" y="143" width="13" height="11" rx="2" fill="#D4A87A" opacity="0.7"/>
          <rect x="301" y="143" width="13" height="11" rx="2" fill="#D4A87A" opacity="0.7"/>

          <rect x="338" y="152" width="40" height="38" rx="4" fill="#DCCCA0" opacity="0.8"/>
          <polygon points="338,152 378,152 358,132" fill="#4B9180" opacity="0.7"/>

          {/* Trees */}
          <circle cx="158" cy="160" r="20" fill="#5AA080" opacity="0.7"/>
          <rect   x="154"  y="172" width="8"  height="28" fill="#8B6914" opacity="0.5"/>
          <circle cx="240" cy="164" r="16" fill="#5AA080" opacity="0.65"/>
          <rect   x="237"  y="174" width="6"  height="22" fill="#8B6914" opacity="0.5"/>

          {/* Kites in the sky */}
          <polygon points="340,28 352,38 340,48 328,38" fill="#D9683B" opacity="0.5"/>
          <line x1="340" y1="48" x2="338" y2="78" stroke="#756B63" strokeWidth="1" opacity="0.4"/>
          <polygon points="60,30 70,40 60,50 50,40" fill="#4B9180" opacity="0.45"/>
          <line x1="60" y1="50" x2="58" y2="72" stroke="#756B63" strokeWidth="1" opacity="0.4"/>
        </svg>

        {/* UNTANGLE wordmark */}
        <div style={{ position: 'absolute', top: 20, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,248,238,0.88)', borderRadius: 20, padding: '10px 28px', backdropFilter: 'blur(4px)' }}>
            <span style={{ fontSize: 34, fontWeight: 700, color: '#D9683B', letterSpacing: '-0.5px', lineHeight: 1 }}>UNTANGLE</span>
            <span style={{ fontSize: 13, color: '#756B63', marginTop: 3, letterSpacing: '0.04em' }}>Untangle the sounds. Unlock the world.</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '0 28px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Mindy + speech */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: -20, marginBottom: 24, width: '100%' }}>
          <Mindy mood="happy" size={120} className="float-anim"/>
          <div style={{
            flex: 1,
            background: 'white',
            borderRadius: '20px 20px 20px 4px',
            padding: '16px 18px',
            boxShadow: '0 4px 20px rgba(36,49,58,0.1)',
            position: 'relative',
          }}>
            <p style={{ fontSize: 16, color: '#24313A', margin: '0 0 6px', lineHeight: 1.6, fontWeight: 700 }}>
              Hi! I'm <span style={{ color: '#D9683B' }}>Mindy</span>! 👋
            </p>
            <p style={{ fontSize: 15, color: '#756B63', margin: 0, lineHeight: 1.5 }}>
              The Tangle Storm mixed up our village. Help me fix it?
            </p>
          </div>
        </div>

        {/* Storm status */}
        <div style={{ width: '100%', background: 'white', borderRadius: 18, padding: '14px 18px', marginBottom: 24, boxShadow: '0 2px 12px rgba(36,49,58,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16 }}>⛅</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#4B9180' }}>Tangle Storm Status</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#24313A' }}>30% cleared</span>
          </div>
          <div style={{ height: 10, background: '#F7DDD0', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: '30%', height: '100%', background: 'linear-gradient(90deg, #4B9180, #8DC8B0)', borderRadius: 999, transition: 'width 1s ease' }}/>
          </div>
          <p style={{ fontSize: 12, color: '#756B63', margin: '6px 0 0' }}>The village needs a hero — that's you! 🌟</p>
        </div>

        {/* CTA buttons */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            className="btn-primary"
            onClick={() => navigate('childProfile')}
            style={{ fontSize: 20, padding: '20px 32px', letterSpacing: '0.03em' }}
          >
            🚀 Let's Start!
          </button>
          <button
            className="btn-secondary"
            onClick={() => { dispatch({ type: 'SET_PARENT_MODE', value: true }); navigate('parentLogin'); }}
          >
            I'm a Parent
          </button>
        </div>

        {/* Tagline footer */}
        <p style={{ fontSize: 12, color: '#B0A89E', marginTop: 24, textAlign: 'center', lineHeight: 1.6 }}>
          A safe, game-based learning companion · No medical labels, ever
        </p>
      </div>
    </div>
  );
}
