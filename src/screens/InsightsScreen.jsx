import { GlassCard, Eyebrow, Serif, MoodDot, moodGradient, MOODS } from '../components/primitives';

const DISTRIBUTION = [
  { m: 'calm',     w: 28 },
  { m: 'tender',   w: 22 },
  { m: 'grateful', w: 20 },
  { m: 'bright',   w: 14 },
  { m: 'heavy',    w: 10 },
  { m: 'restless', w: 6 },
];

const MOOD_PERCENTS = { calm: 28, tender: 22, heavy: 10, bright: 14, restless: 6, grateful: 20 };

export default function InsightsScreen({ dark }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 130 }}>
      <div style={{ padding: '70px 20px 16px' }}>
        <Eyebrow dark={dark}>April · last 30 days</Eyebrow>
        <Serif size={32} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 6 }}>
          How this month <span style={{ fontStyle: 'italic' }}>felt</span>
        </Serif>
      </div>

      {/* Mood distribution bar */}
      <div style={{ padding: '0 20px' }}>
        <GlassCard dark={dark} style={{ padding: '18px 18px 16px' }}>
          <Eyebrow dark={dark}>Mood distribution</Eyebrow>
          <div style={{ marginTop: 14, height: 14, borderRadius: 999, overflow: 'hidden', display: 'flex' }}>
            {DISTRIBUTION.map(s => (
              <div key={s.m} style={{ width: `${s.w}%`, background: moodGradient(s.m, dark) }} />
            ))}
          </div>
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {MOODS.map(m => (
              <div key={m.key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: dark ? '#A8A5BE' : '#55526B' }}>
                <MoodDot mood={m.key} dark={dark} size={10} />
                <span style={{ flex: 1, textTransform: 'capitalize' }}>{m.key}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums', color: dark ? '#ECEAF5' : '#1A1826' }}>
                  {MOOD_PERCENTS[m.key]}%
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Mood over time chart */}
      <div style={{ padding: '14px 20px 0' }}>
        <GlassCard dark={dark}>
          <Eyebrow dark={dark}>Mood over time</Eyebrow>
          <svg viewBox="0 0 300 110" style={{ width: '100%', marginTop: 12 }}>
            <defs>
              <linearGradient id="lg1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={dark ? '#9FA2FF' : '#7B7DE8'} stopOpacity="0.45" />
                <stop offset="100%" stopColor={dark ? '#9FA2FF' : '#7B7DE8'} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 70 C 40 50, 60 80, 100 55 S 160 35, 200 50 S 260 25, 300 40 L 300 110 L 0 110 Z" fill="url(#lg1)" />
            <path d="M0 70 C 40 50, 60 80, 100 55 S 160 35, 200 50 S 260 25, 300 40" fill="none" stroke={dark ? '#9FA2FF' : '#7B7DE8'} strokeWidth="1.5" />
            {[[0,70],[100,55],[200,50],[300,40]].map(([x,y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill={dark ? '#ECEAF5' : '#FDFBF7'} stroke={dark ? '#9FA2FF' : '#7B7DE8'} strokeWidth="1.5" />
            ))}
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: dark ? '#6E6B85' : '#8A8799', marginTop: 4, letterSpacing: '0.08em' }}>
            <span>W1</span><span>W2</span><span>W3</span><span>W4</span>
          </div>
        </GlassCard>
      </div>

      {/* Most felt + words written */}
      <div style={{ padding: '14px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <GlassCard dark={dark} style={{ padding: 16 }}>
          <Eyebrow dark={dark}>Most felt</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
            <MoodDot mood="calm" dark={dark} size={24} />
            <Serif size={22} color={dark ? '#ECEAF5' : '#1A1826'}>calm</Serif>
          </div>
        </GlassCard>
        <GlassCard dark={dark} style={{ padding: 16 }}>
          <Eyebrow dark={dark}>Written</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 10 }}>
            <Serif size={28} color={dark ? '#ECEAF5' : '#1A1826'}>4,280</Serif>
            <div style={{ fontSize: 11, color: dark ? '#A8A5BE' : '#55526B' }}>words</div>
          </div>
        </GlassCard>
      </div>

      {/* AI reflection */}
      <div style={{ padding: '14px 20px 0' }}>
        <GlassCard dark={dark} style={{ padding: '18px 20px' }}>
          <Eyebrow dark={dark}>Reflection</Eyebrow>
          <Serif size={20} italic color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 10 }}>
            You felt most settled on days you walked in the morning.
          </Serif>
        </GlassCard>
      </div>
    </div>
  );
}
