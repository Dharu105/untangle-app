import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';
import type { Screen } from '../types';

const locations: { id: Screen; emoji: string; name: string; desc: string; accentColor: string; bgColor: string }[] = [
  { id: 'soundGarden',  emoji: '🔊', name: 'Sound Garden',    desc: 'Listen. Match. Untangle.',        accentColor: '#4B9180', bgColor: '#DDE9DD' },
  { id: 'letterGrove',  emoji: '🌳', name: 'Letter Grove',    desc: 'Meet the letter friends.',        accentColor: '#D9683B', bgColor: '#F7DDD0' },
  { id: 'kiteMeadow',   emoji: '🪁', name: 'Kite Meadow',     desc: 'Build it. Fly it.',               accentColor: '#756B63', bgColor: '#F0EAE0' },
  { id: 'pulsePath',    emoji: '🥁', name: 'Pulse Path',      desc: 'Follow the village beat.',        accentColor: '#4B9180', bgColor: '#DDE9DD' },
  { id: 'mindyMixup',   emoji: '🐱', name: "Mindy's House",   desc: 'Teach Mindy something new.',      accentColor: '#D9683B', bgColor: '#F7DDD0' },
  { id: 'bookCorner',   emoji: '📖', name: 'Book Corner',     desc: 'Explore a story.',                accentColor: '#756B63', bgColor: '#F0EAE0' },
  { id: 'theMela',      emoji: '🎪', name: 'The Mela',        desc: 'Festival adventures!',            accentColor: '#C8A200', bgColor: '#FFF3CC' },
];

function getGreeting(name: string) {
  const h = new Date().getHours();
  const part = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  return `${part}, ${name || 'Explorer'}!`;
}

export default function VillageHome() {
  const { state, navigate, adaptiveRecommendation } = useGame();
  const recommended = adaptiveRecommendation();
  const recLoc = locations.find(l => l.id === recommended);

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%', paddingBottom: 8 }}>

      {/* === Village illustrated header === */}
      <div style={{ position: 'relative', height: 180, overflow: 'hidden', background: 'linear-gradient(180deg, #C2D4E2 0%, #DDE9DD 80%, #FFF8EE 100%)', flexShrink: 0 }}>
        <svg viewBox="0 0 390 180" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* Sky */}
          {/* Storm clouds — lighter than welcome since 30% cleared */}
          <ellipse cx="70"  cy="38" rx="60" ry="28" fill="#C8D4DC" opacity="0.5"/>
          <ellipse cx="310" cy="44" rx="65" ry="30" fill="#C8D4DC" opacity="0.45"/>
          <ellipse cx="190" cy="28" rx="85" ry="34" fill="#C0CCDA" opacity="0.35"/>
          {/* Partial sun peeking through */}
          <circle cx="320" cy="28" r="20" fill="#F6C343" opacity="0.55"/>
          {/* Ground */}
          <rect x="0" y="138" width="390" height="42" fill="#C8D8B0" opacity="0.8"/>
          <ellipse cx="195" cy="138" rx="210" ry="12" fill="#B4C89A" opacity="0.6"/>
          {/* Storm swirl (subtle) */}
          <g style={{ transformOrigin: '80px 55px', animation: 'storm-swirl 20s linear infinite' }}>
            <path d="M80 38 Q102 46 97 60 Q92 74 80 67 Q68 60 72 46 Q75 37 80 38" fill="#9BA8B2" opacity="0.18"/>
          </g>
          {/* House 1 */}
          <rect x="14"  y="112" width="50" height="40" rx="3" fill="#EDD6B4"/>
          <polygon points="14,112 64,112 39,90" fill="#C4705A"/>
          <rect x="28"  y="128" width="16" height="24" rx="2" fill="#B09070" opacity="0.7"/>
          <rect x="26"  y="116" width="10" height="9"  rx="2" fill="#D4B882" opacity="0.8"/>
          <rect x="42"  y="116" width="10" height="9"  rx="2" fill="#D4B882" opacity="0.8"/>
          {/* House 2 */}
          <rect x="78"  y="120" width="36" height="32" rx="3" fill="#DDD0A8"/>
          <polygon points="78,120 114,120 96,102" fill="#4B9180" opacity="0.8"/>
          <rect x="87"  y="134" width="14" height="18" rx="2" fill="#A87848" opacity="0.65"/>
          {/* Trees */}
          <circle cx="144" cy="124" r="18" fill="#52A880" opacity="0.75"/>
          <rect   x="140"  y="134" width="8" height="26" fill="#8B6914" opacity="0.55"/>
          <circle cx="172" cy="128" r="13" fill="#48987A" opacity="0.7"/>
          {/* Bridge (partially built) */}
          <rect x="196" y="145" width="80" height="9" rx="3" fill="#C4A882" opacity="0.7"/>
          <line x1="206" y1="145" x2="206" y2="136" stroke="#A08060" strokeWidth="2.5" opacity="0.7"/>
          <line x1="226" y1="145" x2="226" y2="132" stroke="#A08060" strokeWidth="2.5" opacity="0.7"/>
          <line x1="246" y1="145" x2="246" y2="132" stroke="#A08060" strokeWidth="2.5" opacity="0.7"/>
          <line x1="266" y1="145" x2="266" y2="136" stroke="#A08060" strokeWidth="2.5" opacity="0.7"/>
          <line x1="206" y1="136" x2="266" y2="132" stroke="#A08060" strokeWidth="1.5" opacity="0.5"/>
          {/* Right houses */}
          <rect x="296" y="110" width="54" height="42" rx="3" fill="#EDD6B4"/>
          <polygon points="296,110 350,110 323,86" fill="#C4705A"/>
          <rect x="309"  y="126" width="16" height="26" rx="2" fill="#B09070" opacity="0.7"/>
          <rect x="307"  y="115" width="11" height="9"  rx="2" fill="#D4B882" opacity="0.8"/>
          <rect x="324"  y="115" width="11" height="9"  rx="2" fill="#D4B882" opacity="0.8"/>
          {/* Creature */}
          <text x="186" y="160" fontSize="18" opacity="0.9">🐝</text>
          <text x="268" y="158" fontSize="16" opacity="0.8">🌿</text>
          {/* Kite */}
          <polygon points="360,22 372,32 360,42 348,32" fill="#D9683B" opacity="0.45"/>
          <line x1="360" y1="42" x2="358" y2="68" stroke="#756B63" strokeWidth="1" opacity="0.35"/>
        </svg>

        {/* Greeting overlay */}
        <div style={{ position: 'absolute', top: 16, left: 16, right: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(255,248,238,0.9)', borderRadius: 14, padding: '8px 14px', backdropFilter: 'blur(4px)' }}>
              <p style={{ fontSize: 14, color: '#756B63', margin: '0 0 1px' }}>Untangle Village</p>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: '#24313A', margin: 0, lineHeight: 1.2 }}>{getGreeting(state.childName)}</h1>
            </div>
            {/* Coin + star counter */}
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ icon: '🪙', val: state.coins }, { icon: '⭐', val: state.stars }].map(s => (
                <div key={s.icon} style={{ background: 'rgba(255,248,238,0.92)', borderRadius: 12, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 4, boxShadow: '0 2px 8px rgba(36,49,58,0.12)', backdropFilter: 'blur(4px)' }}>
                  <span style={{ fontSize: 16 }}>{s.icon}</span>
                  <span style={{ fontWeight: 700, color: '#24313A', fontSize: 15 }}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === Storm progress bar === */}
      <div style={{ margin: '0 20px', marginTop: -14, background: 'white', borderRadius: 16, padding: '12px 16px', boxShadow: '0 4px 16px rgba(36,49,58,0.09)', zIndex: 2, position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 15 }}>⛅</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#4B9180' }}>Tangle Storm Clearing</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#24313A' }}>{state.stormProgress}%</span>
        </div>
        <div style={{ height: 10, background: '#F7DDD0', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${state.stormProgress}%`, background: 'linear-gradient(90deg, #4B9180, #8DC8B0)', borderRadius: 999, transition: 'width 0.8s ease' }}/>
        </div>
        <p style={{ fontSize: 11, color: '#756B63', margin: '5px 0 0' }}>
          {state.stormProgress < 50 ? `${50 - state.stormProgress}% more to unlock the Mela!` :
           state.stormProgress < 80 ? 'New areas are opening!' : 'Almost fully restored! 🌟'}
        </p>
      </div>

      {/* === Mindy suggestion === */}
      <div style={{ margin: '14px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Mindy mood="encouraging" size={72} style={{ flexShrink: 0 }}/>
        <div style={{ flex: 1 }}>
          {/* Adaptive recommendation chip */}
          <div style={{ background: '#DDE9DD', borderRadius: 14, padding: '12px 14px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#4B9180', margin: '0 0 4px' }}>✨ Mindy recommends:</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#24313A', margin: 0 }}>
                {recLoc?.emoji} {recLoc?.name || 'Sound Garden'}
              </p>
              <button
                onClick={() => navigate(recommended)}
                style={{ background: '#4B9180', color: 'white', border: 'none', borderRadius: 10, padding: '8px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'OpenDyslexic','Atkinson Hyperlegible',sans-serif", flexShrink: 0 }}
              >
                Go! →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* === Locations list === */}
      <div style={{ padding: '16px 20px 0' }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#756B63', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Explore the village</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {locations.map(loc => (
            <button
              key={loc.id}
              onClick={() => navigate(loc.id)}
              style={{
                background: 'white',
                borderRadius: 18,
                padding: '14px 16px',
                border: '1.5px solid rgba(36,49,58,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(36,49,58,0.07)',
                textAlign: 'left',
                width: '100%',
                fontFamily: "'OpenDyslexic','Atkinson Hyperlegible',sans-serif",
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              onTouchStart={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }}
              onTouchEnd={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            >
              <div style={{ width: 50, height: 50, borderRadius: 14, background: loc.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                {loc.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#24313A' }}>{loc.name}</span>
                  {loc.id === recommended && (
                    <span style={{ fontSize: 10, background: '#DDE9DD', color: '#4B9180', borderRadius: 6, padding: '2px 7px', fontWeight: 700 }}>✨ NOW</span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: '#756B63', margin: 0 }}>{loc.desc}</p>
              </div>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" style={{ flexShrink: 0 }}>
                <path d="M1 1l6 6-6 6" stroke={loc.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: 16 }}/>
    </div>
  );
}
