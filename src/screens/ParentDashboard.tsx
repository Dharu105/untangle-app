import { useGame } from '../context/GameContext';

const weekActivity = [
  { day: 'M', mins: 12, done: true },
  { day: 'T', mins: 8,  done: true },
  { day: 'W', mins: 15, done: true },
  { day: 'T', mins: 0,  done: false },
  { day: 'F', mins: 10, done: true },
  { day: 'S', mins: 5,  done: true },
  { day: 'S', mins: 0,  done: false },
];

export default function ParentDashboard() {
  const { state, navigate } = useGame();

  const totalMins = weekActivity.reduce((s, d) => s + d.mins, 0);
  const activeDays = weekActivity.filter(d => d.done).length;

  const skills = [
    { label: '🔤 Letter Recognition', value: state.letterAccuracy,   color: '#D9683B' },
    { label: '🔊 Sound Awareness',    value: state.soundAccuracy,    color: '#4B9180' },
    { label: '🥁 Syllable Skills',    value: state.syllableAccuracy, color: '#756B63' },
    { label: '📖 Reading Patterns',   value: state.readingProgress,  color: '#C8A200' },
  ];

  const avg = Math.round(skills.reduce((s, sk) => s + sk.value, 0) / skills.length);

  function label(v: number) {
    if (v >= 75) return { text: 'Strong',        color: '#4B9180', bg: '#DDE9DD' };
    if (v >= 55) return { text: 'Growing',       color: '#D9683B', bg: '#F7DDD0' };
    return           { text: 'Needs Practice',  color: '#756B63', bg: '#F0EAE0' };
  }

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg, #F7DDD0 0%, #FFF8EE 100%)', padding: '28px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <div>
            <p style={{ fontSize: 13, color: '#756B63', margin: '0 0 3px' }}>Learning garden for</p>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: 0 }}>{state.childName || 'Aarav'}'s Journey 🌱</h1>
          </div>
          <button
            onClick={() => navigate('notifications')}
            style={{ position: 'relative', background: 'white', border: 'none', borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}
          >
            🔔
            {state.notificationsCount > 0 && (
              <div style={{ position: 'absolute', top: 7, right: 7, width: 14, height: 14, borderRadius: '50%', background: '#D9683B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: 'white', fontWeight: 700 }}>
                {state.notificationsCount}
              </div>
            )}
          </button>
        </div>

        {/* Summary row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { icon: '⏱️', val: `${totalMins}m`, label: 'This week' },
            { icon: '🗓️', val: `${activeDays}/7`,  label: 'Active days' },
            { icon: '📖', val: state.lessonCards.length, label: 'Lesson cards' },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: 14, padding: '14px 10px', textAlign: 'center', boxShadow: '0 2px 8px rgba(36,49,58,0.07)' }}>
              <div style={{ fontSize: 22, marginBottom: 3 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#24313A' }}>{s.val}</div>
              <div style={{ fontSize: 11, color: '#756B63' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px 28px' }}>

        {/* Storm progress */}
        <div style={{ background: 'white', borderRadius: 18, padding: '16px', marginBottom: 14, boxShadow: '0 2px 10px rgba(36,49,58,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#24313A' }}>⛅ Tangle Storm Clearing</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#4B9180' }}>{state.stormProgress}%</span>
          </div>
          <div style={{ height: 12, background: '#F7DDD0', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: `${state.stormProgress}%`, height: '100%', background: 'linear-gradient(90deg, #4B9180, #8DC8B0)', borderRadius: 999, transition: 'width 0.8s' }}/>
          </div>
          <p style={{ fontSize: 12, color: '#756B63', margin: '6px 0 0' }}>
            {state.stormProgress < 50 ? `${50 - state.stormProgress}% more to unlock the Mela!` : 'Great progress — the sky is clearing! 🌤️'}
          </p>
        </div>

        {/* Overall + weather link */}
        <button
          onClick={() => navigate('readingWeather')}
          style={{ width: '100%', background: avg >= 65 ? '#DDE9DD' : '#F7DDD0', borderRadius: 18, padding: '16px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, boxShadow: '0 2px 10px rgba(36,49,58,0.07)', fontFamily: "'OpenDyslexic','Atkinson Hyperlegible',sans-serif", textAlign: 'left' }}
        >
          <span style={{ fontSize: 36 }}>{avg >= 75 ? '☀️' : avg >= 55 ? '⛅' : '🌩️'}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#24313A', margin: '0 0 2px' }}>Reading Weather: {avg >= 75 ? 'Clear Sky' : avg >= 55 ? 'Clearing' : 'Tangle Storm'}</p>
            <p style={{ fontSize: 13, color: '#756B63', margin: 0 }}>Overall progress: {avg}% · Tap to see full weather</p>
          </div>
          <span style={{ color: '#756B63', fontSize: 18 }}>›</span>
        </button>

        {/* Skills */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#24313A' }}>🌱 Skills Growing</span>
            <button onClick={() => navigate('progressDetails')} style={{ background: 'transparent', border: 'none', color: '#D9683B', fontSize: 13, cursor: 'pointer', fontFamily: "'OpenDyslexic','Atkinson Hyperlegible',sans-serif", fontWeight: 700, padding: 0 }}>View all →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {skills.map(s => {
              const lbl = label(s.value);
              return (
                <div key={s.label} style={{ background: 'white', borderRadius: 16, padding: '14px 16px', boxShadow: '0 2px 8px rgba(36,49,58,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#24313A' }}>{s.label}</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, background: lbl.bg, color: lbl.color, borderRadius: 8, padding: '3px 9px', fontWeight: 700 }}>{lbl.text}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.value}%</span>
                    </div>
                  </div>
                  <div style={{ height: 8, background: '#F7DDD0', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${s.value}%`, height: '100%', background: s.color, borderRadius: 999, transition: 'width 0.8s' }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly activity bar chart */}
        <div style={{ background: 'white', borderRadius: 18, padding: '16px', marginBottom: 14, boxShadow: '0 2px 8px rgba(36,49,58,0.06)' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#24313A', margin: '0 0 12px' }}>📅 This Week</p>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'space-between', alignItems: 'flex-end', height: 64 }}>
            {weekActivity.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', maxWidth: 28, background: d.done ? '#4B9180' : '#F0ECE6', borderRadius: 5, height: d.mins ? Math.max(8, (d.mins / 15) * 52) : 8, transition: 'height 0.8s ease', alignSelf: 'flex-end' }}/>
                <span style={{ fontSize: 10, color: d.done ? '#24313A' : '#B0A89E', fontWeight: d.done ? 700 : 400 }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick nav grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: '🌱 Literacy Garden', screen: 'parentGarden',   bg: '#DDE9DD', color: '#4B9180' },
            { label: '💡 Insights',         screen: 'insights',       bg: '#F7DDD0', color: '#D9683B' },
            { label: '📋 Mela Report',      screen: 'melaReport',     bg: '#F0EAE0', color: '#756B63' },
            { label: '👨‍👩‍👧 Family Voice',     screen: 'familyVoice',   bg: '#FFF3CC', color: '#C8A200' },
          ].map(item => (
            <button
              key={item.screen}
              onClick={() => navigate(item.screen as any)}
              style={{ background: item.bg, borderRadius: 16, padding: '18px 14px', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: "'OpenDyslexic','Atkinson Hyperlegible',sans-serif", boxShadow: '0 2px 8px rgba(36,49,58,0.06)', transition: 'transform 0.15s' }}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.96)'; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              onTouchStart={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.96)'; }}
              onTouchEnd={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            >
              <span style={{ fontSize: 15, fontWeight: 700, color: item.color, lineHeight: 1.4, display: 'block' }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
