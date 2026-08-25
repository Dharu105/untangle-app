import { useGame } from '../context/GameContext';

export default function Insights() {
  const { state, navigate } = useGame();

  const goingWell = [];
  const needsPractice = [];

  if (state.letterAccuracy >= 70) goingWell.push({ skill: 'Letter Recognition', detail: `${state.childName || "Aarav"} is showing strong letter recognition across repeated activities.` });
  else needsPractice.push({ skill: 'Letter Recognition', detail: 'More practice with letter shapes would be helpful.' });

  if (state.soundAccuracy >= 65) goingWell.push({ skill: 'Sound Awareness', detail: 'Sound matching accuracy is improving session by session.' });
  else needsPractice.push({ skill: 'Sound Awareness', detail: 'Sound awareness activities should be prioritised this week.' });

  if (state.syllableAccuracy >= 65) goingWell.push({ skill: 'Syllable Skills', detail: 'Beat-tapping rhythm is becoming more consistent.' });
  else needsPractice.push({ skill: 'Syllable Skills', detail: 'Syllable tapping practice would support reading fluency.' });

  if (state.readingProgress >= 45) goingWell.push({ skill: 'Reading Progress', detail: 'Story exploration is building reading confidence.' });
  else needsPractice.push({ skill: 'Reading Progress', detail: 'Short daily reading sessions will help build patterns.' });

  const recommendations = [
    needsPractice.length > 0 && `Try ${Math.min(4, needsPractice.length + 2)} short ${needsPractice[0]?.skill.toLowerCase()} activities this week.`,
    'Keep sessions under 15 minutes — short and consistent works best.',
    state.stormProgress < 50 && 'The Mela unlocks at 50% storm clearing — you\'re almost there!',
    'Using the Family Voice feature can help with motivation.',
  ].filter(Boolean);

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '24px 24px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('parentDashboard')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: 0 }}>💡 Insights</h1>
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        {/* What's going well */}
        {goingWell.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 4, height: 20, background: '#4B9180', borderRadius: 2 }}/>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#4B9180', margin: 0 }}>What's Going Well</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {goingWell.map((item, i) => (
                <div key={i} style={{ background: '#DDE9DD', borderRadius: 16, padding: '14px 16px' }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#4B9180', margin: '0 0 4px' }}>✓ {item.skill}</p>
                  <p style={{ fontSize: 14, color: '#24313A', margin: 0, lineHeight: 1.5 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Needs more practice */}
        {needsPractice.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 4, height: 20, background: '#D9683B', borderRadius: 2 }}/>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#D9683B', margin: 0 }}>Needs More Practice</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {needsPractice.map((item, i) => (
                <div key={i} style={{ background: '#F7DDD0', borderRadius: 16, padding: '14px 16px' }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#D9683B', margin: '0 0 4px' }}>→ {item.skill}</p>
                  <p style={{ fontSize: 14, color: '#24313A', margin: 0, lineHeight: 1.5 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 4, height: 20, background: '#756B63', borderRadius: 2 }}/>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#24313A', margin: 0 }}>What We Recommend</h2>
          </div>
          <div style={{ background: 'white', borderRadius: 16, padding: '16px', boxShadow: '0 2px 8px rgba(36,49,58,0.07)' }}>
            {recommendations.map((rec, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', paddingBottom: i < recommendations.length - 1 ? 12 : 0, borderBottom: i < recommendations.length - 1 ? '1px solid #F7DDD0' : 'none', marginBottom: i < recommendations.length - 1 ? 12 : 0 }}>
                <span style={{ fontSize: 16 }}>💡</span>
                <p style={{ fontSize: 14, color: '#24313A', margin: 0, lineHeight: 1.5 }}>{rec as string}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-primary" onClick={() => navigate('parentGarden')}>
          🌱 View Literacy Garden
        </button>
        <button className="btn-secondary" onClick={() => navigate('progressDetails')} style={{ marginTop: 10 }}>
          📊 View Progress Details
        </button>
      </div>
    </div>
  );
}
