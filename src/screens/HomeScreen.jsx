import { GlassCard, Eyebrow, Serif, MoodChip, PrimaryBtn, GhostBtn, MoodDot, moodGradient, MOODS } from '../components/primitives';

const RECENT_ENTRIES = [
  { date: 'Wed · Apr 22', title: 'The rain finally stopped', mood: 'grateful', excerpt: 'Walked the long way. The air after rain has a specific quietness I keep forgetting about.' },
  { date: 'Tue · Apr 21', title: 'A difficult call', mood: 'heavy', excerpt: "I told the truth, which was what needed to happen. That doesn't mean I feel good about it yet." },
  { date: 'Mon · Apr 20', title: 'New week, small plans', mood: 'calm', excerpt: 'Three things on the list. That feels like a kind amount for a Monday.' },
];

export default function HomeScreen({ dark, onWrite, onOpenEntry }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 130 }}>
      <div style={{ padding: '70px 20px 24px' }}>
        <Eyebrow dark={dark}>Thursday · April 23</Eyebrow>
        <Serif size={40} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 8 }}>
          Good morning,<br />
          <span style={{ fontStyle: 'italic', color: dark ? '#9FA2FF' : '#7B7DE8' }}>Ada</span>.
        </Serif>
        <div style={{ marginTop: 12, fontSize: 15, lineHeight: '22px', color: dark ? '#A8A5BE' : '#55526B', fontFamily: 'Inter, sans-serif' }}>
          A quiet start. How are you, really?
        </div>
      </div>

      {/* Mood check-in */}
      <div style={{ padding: '0 20px' }}>
        <GlassCard dark={dark} style={{ padding: '18px 18px 16px' }}>
          <Eyebrow dark={dark}>Mood check-in</Eyebrow>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {MOODS.slice(0, 5).map((m, i) => (
              <MoodChip key={m.key} dark={dark} mood={m.key} active={i === 1} />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Today's prompt */}
      <div style={{ padding: '14px 20px 0' }}>
        <GlassCard dark={dark} style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px 20px 22px', position: 'relative' }}>
            <div style={{
              position: 'absolute', right: -30, top: -30, width: 160, height: 160, borderRadius: '50%',
              background: dark
                ? 'radial-gradient(circle, rgba(159,162,255,0.25), transparent 70%)'
                : 'radial-gradient(circle, rgba(232,181,200,0.45), transparent 70%)',
              filter: 'blur(12px)',
            }} />
            <Eyebrow dark={dark}>Today's prompt</Eyebrow>
            <Serif size={22} italic color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 10, maxWidth: 280 }}>
              What's something small that went well this week?
            </Serif>
            <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
              <PrimaryBtn dark={dark} accent onClick={onWrite}>Start writing</PrimaryBtn>
              <GhostBtn dark={dark}>Skip</GhostBtn>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Streak + week bar chart */}
      <div style={{ padding: '14px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <GlassCard dark={dark} style={{ padding: 16 }}>
          <Eyebrow dark={dark}>Streak</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
            <Serif size={40} color={dark ? '#ECEAF5' : '#1A1826'}>12</Serif>
            <div style={{ fontSize: 12, color: dark ? '#A8A5BE' : '#55526B' }}>quiet days</div>
          </div>
        </GlassCard>
        <GlassCard dark={dark} style={{ padding: 16 }}>
          <Eyebrow dark={dark}>This week</Eyebrow>
          <div style={{ display: 'flex', gap: 5, marginTop: 10, alignItems: 'flex-end', height: 36 }}>
            {['calm','tender','bright','calm','grateful','tender','calm'].map((mood, i) => (
              <div key={i} style={{
                flex: 1, height: [18,22,30,24,32,26,20][i],
                borderRadius: 4,
                background: moodGradient(mood, dark),
                opacity: i === 6 ? 1 : 0.85,
              }} />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent entries */}
      <div style={{ padding: '24px 20px 0' }}>
        <Eyebrow dark={dark} style={{ marginBottom: 10 }}>Recent entries</Eyebrow>
        {RECENT_ENTRIES.map((e, i) => (
          <div key={i} onClick={() => onOpenEntry(e)} style={{ marginBottom: 10, cursor: 'pointer' }}>
            <GlassCard dark={dark} style={{ padding: '14px 16px 16px 22px', position: 'relative' }}>
              <div style={{
                position: 'absolute', left: 10, top: 14, bottom: 14, width: 4, borderRadius: 2,
                background: moodGradient(e.mood, dark),
              }} />
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: dark ? '#A8A5BE' : '#55526B' }}>
                {e.date}
              </div>
              <Serif size={18} color={dark ? '#ECEAF5' : '#1A1826'} style={{ margin: '4px 0' }}>{e.title}</Serif>
              <div style={{ fontSize: 13, lineHeight: '19px', color: dark ? '#A8A5BE' : '#55526B', fontFamily: 'Inter, sans-serif' }}>
                {e.excerpt}
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
}
