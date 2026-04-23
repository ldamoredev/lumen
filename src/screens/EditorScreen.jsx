import { useState } from 'react';
import { GlassCard, Eyebrow, Serif, MoodChip, LumenIcon } from '../components/primitives';

const TOOLBAR_ICONS = ['paperclip', 'mic', 'cloud-sun', 'map-pin', 'quote'];

export default function EditorScreen({ dark, onDone }) {
  const [title, setTitle] = useState('A quiet Thursday');
  const [body, setBody] = useState(
    "Walked the long way home. The light on the brick wall near the corner looked almost pink — noticed I wasn't in a hurry about anything.\n\nWhat I'm grateful for: the fact that I made coffee slowly. That the morning had space in it."
  );

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '60px 16px 12px',
        position: 'relative', zIndex: 10,
      }}>
        <button onClick={onDone} style={{
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
        <div style={{ fontSize: 12, color: dark ? '#A8A5BE' : '#55526B', fontWeight: 500 }}>
          Saved · just now
        </div>
        <button onClick={onDone} style={{
          padding: '8px 16px', borderRadius: 999, border: 'none', cursor: 'pointer',
          background: dark ? '#9FA2FF' : '#1A1826', color: dark ? '#0E1016' : '#FDFBF7',
          fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif',
        }}>Done</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px' }}>
        <Eyebrow dark={dark}>Thursday, April 23 · 9:42 AM</Eyebrow>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Untitled"
          style={{
            width: '100%', background: 'transparent', border: 'none', outline: 'none',
            fontFamily: 'Fraunces, serif', fontSize: 30, fontWeight: 400, letterSpacing: '-0.015em',
            fontVariationSettings: "'opsz' 96",
            color: dark ? '#ECEAF5' : '#1A1826', padding: '8px 0 2px', marginTop: 4,
          }}
        />

        <div style={{ display: 'flex', gap: 8, margin: '12px 0 16px', flexWrap: 'wrap' }}>
          <MoodChip mood="tender" dark={dark} active />
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 999,
            fontSize: 12, fontWeight: 500, color: dark ? '#A8A5BE' : '#55526B',
            border: `1px dashed ${dark ? 'rgba(255,255,255,0.14)' : 'rgba(26,24,38,0.14)'}`,
            cursor: 'pointer',
          }}>+ tag</div>
        </div>

        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Start writing…"
          style={{
            width: '100%', background: 'transparent', border: 'none', outline: 'none', resize: 'none',
            fontFamily: 'Fraunces, serif', fontSize: 17, lineHeight: '28px', fontVariationSettings: "'opsz' 24",
            color: dark ? '#ECEAF5' : '#1A1826', minHeight: 220,
          }}
        />

        <GlassCard dark={dark} style={{ marginTop: 12, padding: 14 }}>
          <Eyebrow dark={dark}>What went well</Eyebrow>
          <div style={{ marginTop: 6, fontSize: 14, color: dark ? '#ECEAF5' : '#1A1826', fontFamily: 'Fraunces, serif', fontVariationSettings: "'opsz' 24", lineHeight: '22px' }}>
            Slow coffee · the pink wall · finishing one thing
          </div>
        </GlassCard>
      </div>

      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
        margin: '0 14px 30px', borderRadius: 999,
        background: dark ? 'rgba(30,34,48,0.6)' : 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(24px) saturate(130%)',
        WebkitBackdropFilter: 'blur(24px) saturate(130%)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)'}`,
        boxShadow: '0 8px 24px rgba(40,30,80,0.08)',
      }}>
        {TOOLBAR_ICONS.map(icon => (
          <button key={icon} style={{
            width: 36, height: 36, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer',
            color: dark ? '#A8A5BE' : '#55526B',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <LumenIcon name={icon} size={18} />
          </button>
        ))}
        <div style={{ flex: 1, textAlign: 'right', fontSize: 11, color: dark ? '#6E6B85' : '#8A8799', paddingRight: 6 }}>
          {wordCount} words
        </div>
      </div>
    </div>
  );
}
