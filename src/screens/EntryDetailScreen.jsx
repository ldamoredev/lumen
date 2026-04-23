import { Serif, MoodDot, LumenIcon } from '../components/primitives';

export default function EntryDetailScreen({ dark, entry, onBack }) {
  if (!entry) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}>
      {/* Back bar */}
      <div style={{ padding: '60px 16px 10px', display: 'flex', alignItems: 'center' }}>
        <button onClick={onBack} style={{
          width: 38, height: 38, borderRadius: 999, border: 'none',
          background: dark ? 'rgba(30,34,48,0.7)' : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: dark ? '#ECEAF5' : '#1A1826',
        }}>
          <LumenIcon name="chevron-left" size={20} />
        </button>
        <div style={{ flex: 1 }} />
        <button style={{
          width: 38, height: 38, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer',
          color: dark ? '#A8A5BE' : '#55526B',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <LumenIcon name="more-horizontal" size={18} />
        </button>
      </div>

      <div style={{ padding: '10px 24px 40px' }}>
        {/* Mood + date badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999,
          background: dark ? 'rgba(30,34,48,0.55)' : 'rgba(255,255,255,0.6)', fontSize: 12,
        }}>
          <MoodDot mood={entry.mood} dark={dark} size={10} />
          <span style={{ color: dark ? '#A8A5BE' : '#55526B' }}>{entry.mood}</span>
          <span style={{ color: dark ? '#6E6B85' : '#8A8799' }}>· {entry.date}</span>
        </div>

        <Serif size={40} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 18 }}>
          {entry.title}
        </Serif>

        <div style={{
          marginTop: 24, fontFamily: 'Fraunces, serif', fontSize: 17, lineHeight: '30px',
          fontVariationSettings: "'opsz' 24", color: dark ? '#ECEAF5' : '#1A1826',
        }}>
          {entry.excerpt}
          <br /><br />
          The afternoon was slower than I expected. I sat by the window and re-read a chapter I liked the first time, and it was still good — maybe even a little better. I think I'm learning to re-read things instead of only rushing to the next one.
          <br /><br />
          <em>What I'm grateful for:</em> the quiet · a second cup · the fact that nothing had to happen today.
        </div>

        {/* Tags */}
        <div style={{ marginTop: 28, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['morning','reading','slow'].map(t => (
            <span key={t} style={{
              fontSize: 12, fontWeight: 500, padding: '5px 10px', borderRadius: 6,
              background: dark ? 'rgba(159,162,255,0.16)' : 'rgba(123,125,232,0.12)',
              color: dark ? '#C7C9FF' : '#5A5CC7',
            }}>{t}</span>
          ))}
        </div>

        {/* Meta */}
        <div style={{ marginTop: 28, display: 'flex', gap: 12, fontSize: 11, color: dark ? '#6E6B85' : '#8A8799' }}>
          <span>☁ Cloudy · 58°F</span>
          <span>·</span>
          <span>Brooklyn</span>
          <span>·</span>
          <span>284 words</span>
        </div>
      </div>
    </div>
  );
}
