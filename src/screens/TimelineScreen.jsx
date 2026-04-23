import { useState } from 'react';
import { GlassCard, Eyebrow, Serif, MoodDot, moodGradient, LumenIcon } from '../components/primitives';

const ENTRIES = [
  { date: 'Wed · Apr 22', title: 'The rain finally stopped', mood: 'grateful', excerpt: 'Walked the long way. The air after rain has a specific quietness.' },
  { date: 'Tue · Apr 21', title: 'A difficult call', mood: 'heavy', excerpt: 'I told the truth, which was what needed to happen.' },
  { date: 'Sun · Apr 19', title: 'Reading on the balcony', mood: 'calm', excerpt: 'Two chapters and nothing else. I needed that.' },
  { date: 'Sat · Apr 18', title: 'Dinner with M.', mood: 'tender', excerpt: 'We talked about old apartments. She remembered the fern.' },
  { date: 'Fri · Apr 17', title: 'Long week', mood: 'restless', excerpt: "Trying to land. Some weeks just don't let you." },
  { date: 'Thu · Apr 16', title: 'Small wins', mood: 'bright', excerpt: 'Finally finished the thing I kept putting off. Nice to cross it off.' },
];

function CalendarView({ dark }) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const moodFor = (d) => ['calm','tender','bright','grateful','heavy','restless',null,null][d % 8];
  return (
    <div style={{ padding: '0 20px' }}>
      <GlassCard dark={dark}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 8 }}>
          {['M','T','W','T','F','S','S'].map((d, i) => (
            <div key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: dark ? '#6E6B85' : '#8A8799' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
          {[null, null, null, ...days].map((d, i) => d === null ? <div key={i} /> : (
            <div key={i} style={{
              aspectRatio: '1', borderRadius: 10, position: 'relative',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
              background: d === 23 ? (dark ? 'rgba(159,162,255,0.18)' : 'rgba(123,125,232,0.14)') : 'transparent',
              border: d === 23 ? `1px solid ${dark ? '#9FA2FF' : '#7B7DE8'}` : 'none',
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: dark ? '#ECEAF5' : '#1A1826' }}>{d}</div>
              {moodFor(d) && <MoodDot mood={moodFor(d)} dark={dark} size={6} />}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function ListView({ dark, onOpenEntry }) {
  return (
    <div style={{ padding: '0 20px' }}>
      {ENTRIES.map((e, i) => (
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
  );
}

export default function TimelineScreen({ dark, onOpenEntry }) {
  const [view, setView] = useState('list');
  return (
    <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 130 }}>
      <div style={{ padding: '70px 20px 16px' }}>
        <Eyebrow dark={dark}>April 2026</Eyebrow>
        <Serif size={32} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 6 }}>Timeline</Serif>
      </div>

      <div style={{ padding: '0 20px 14px', display: 'flex', gap: 8 }}>
        {['list','calendar'].map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            background: view === v ? (dark ? '#ECEAF5' : '#1A1826') : 'transparent',
            color: view === v ? (dark ? '#0E1016' : '#FDFBF7') : (dark ? '#A8A5BE' : '#55526B'),
            border: `1px solid ${view === v ? 'transparent' : (dark ? 'rgba(255,255,255,0.14)' : 'rgba(26,24,38,0.1)')}`,
            fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em', textTransform: 'capitalize',
            transition: 'background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)',
          }}>{v}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button style={{
          width: 38, height: 38, borderRadius: 999,
          border: `1px solid ${dark ? 'rgba(255,255,255,0.14)' : 'rgba(26,24,38,0.1)'}`,
          background: 'transparent', color: dark ? '#A8A5BE' : '#55526B',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <LumenIcon name="search" size={18} />
        </button>
      </div>

      {view === 'calendar' ? <CalendarView dark={dark} /> : <ListView dark={dark} onOpenEntry={onOpenEntry} />}
    </div>
  );
}
