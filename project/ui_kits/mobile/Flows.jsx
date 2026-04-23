// Editor, MoodCheckin, Onboarding, Lock screens for Lumen.

const OnboardingScreen = ({ dark, onDone }) => {
  const [step, setStep] = React.useState(0);
  const steps = [
    { eyebrow: 'Welcome', title: 'A quieter place to think.', body: 'Lumen is a private journal. Just you, your thoughts, and a little structure when you want it.' },
    { eyebrow: 'Why write', title: 'Track how\nyou actually\nfeel.', body: 'Daily mood check-ins turn into patterns. Patterns turn into self-awareness.' },
    { eyebrow: 'Privacy first', title: 'Nothing leaves your phone.', body: 'Locked with Face ID, encrypted on-device. Optional iCloud backup is end-to-end.' },
  ];
  const s = steps[step];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '60px 28px 40px', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '-20%', right: '-30%', width: 400, height: 400, borderRadius: '50%',
        background: dark
          ? 'radial-gradient(circle, rgba(159,162,255,0.35), transparent 70%)'
          : 'radial-gradient(circle, rgba(232,181,200,0.55), transparent 70%)',
        filter: 'blur(20px)',
      }}/>
      <div style={{
        position: 'absolute', bottom: '5%', left: '-20%', width: 320, height: 320, borderRadius: '50%',
        background: dark
          ? 'radial-gradient(circle, rgba(201,138,168,0.25), transparent 70%)'
          : 'radial-gradient(circle, rgba(168,197,232,0.45), transparent 70%)',
        filter: 'blur(24px)',
      }}/>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow dark={dark}>{s.eyebrow}</Eyebrow>
        <Serif size={40} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 12, whiteSpace: 'pre-line' }}>{s.title}</Serif>
        <div style={{ marginTop: 20, fontSize: 17, lineHeight: '26px', fontFamily: 'Fraunces, serif', fontVariationSettings: "'opsz' 24", color: dark ? '#A8A5BE' : '#55526B', maxWidth: 300 }}>{s.body}</div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 6, marginBottom: 20 }}>
        {steps.map((_, i) => (
          <div key={i} style={{
            height: 4, flex: i === step ? 3 : 1, borderRadius: 2,
            background: i === step ? (dark ? '#9FA2FF' : '#7B7DE8') : (dark ? 'rgba(255,255,255,0.12)' : 'rgba(26,24,38,0.1)'),
            transition: 'all 300ms',
          }}/>
        ))}
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 10 }}>
        <GhostBtn dark={dark} onClick={onDone} style={{ flex: 1 }}>Skip</GhostBtn>
        <PrimaryBtn dark={dark} accent onClick={() => step < 2 ? setStep(step + 1) : onDone()} style={{ flex: 2 }}>
          {step < 2 ? 'Continue' : 'Begin'}
        </PrimaryBtn>
      </div>
    </div>
  );
};

const LockScreen = ({ dark, onUnlock }) => {
  const [pin, setPin] = React.useState([]);
  React.useEffect(() => {
    if (pin.length === 4) setTimeout(onUnlock, 250);
  }, [pin]);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
      <div style={{
        width: 72, height: 72, borderRadius: 999,
        background: dark ? 'rgba(159,162,255,0.14)' : 'rgba(123,125,232,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
      }}>
        <LumenIcon name="lock" size={28} color={dark ? '#9FA2FF' : '#7B7DE8'}/>
      </div>
      <Serif size={24} italic color={dark ? '#ECEAF5' : '#1A1826'}>Only for you.</Serif>
      <div style={{ marginTop: 8, fontSize: 14, color: dark ? '#A8A5BE' : '#55526B' }}>Enter passcode</div>
      <div style={{ display: 'flex', gap: 14, marginTop: 28 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            width: 14, height: 14, borderRadius: 999,
            background: pin.length > i ? (dark ? '#ECEAF5' : '#1A1826') : 'transparent',
            border: `1.5px solid ${dark ? 'rgba(255,255,255,0.25)' : 'rgba(26,24,38,0.25)'}`,
          }}/>
        ))}
      </div>
      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 64px)', gap: 16 }}>
        {[1,2,3,4,5,6,7,8,9,'face',0,'del'].map((n,i) => (
          <button key={i} onClick={() => {
            if (n === 'del') setPin(pin.slice(0,-1));
            else if (n === 'face') onUnlock();
            else if (pin.length < 4) setPin([...pin, n]);
          }} style={{
            width: 64, height: 64, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: typeof n === 'number' ? (dark ? 'rgba(30,34,48,0.6)' : 'rgba(255,255,255,0.7)') : 'transparent',
            backdropFilter: typeof n === 'number' ? 'blur(16px)' : 'none',
            color: dark ? '#ECEAF5' : '#1A1826',
            fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 400,
            boxShadow: typeof n === 'number' ? '0 2px 8px rgba(40,30,80,0.06)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {n === 'face' ? <LumenIcon name="scan-face" size={22} color={dark ? '#9FA2FF' : '#7B7DE8'}/> :
             n === 'del'  ? <LumenIcon name="delete" size={20} color={dark ? '#A8A5BE' : '#55526B'}/> : n}
          </button>
        ))}
      </div>
    </div>
  );
};

const MoodCheckinScreen = ({ dark, onDone }) => {
  const [selected, setSelected] = React.useState('tender');
  const [intensity, setIntensity] = React.useState(3);
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '60px 20px 40px', display: 'flex', flexDirection: 'column' }}>
      <Eyebrow dark={dark}>Check-in · Thu 9:42</Eyebrow>
      <Serif size={32} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 10 }}>How are you,<br/><span style={{ fontStyle: 'italic' }}>really</span>?</Serif>

      {/* Breathing mood picker */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', width: 220, height: 220, borderRadius: '50%',
          background: moodGradient(selected, dark),
          filter: 'blur(40px)', opacity: 0.6,
          animation: 'breath 2800ms var(--ease, cubic-bezier(0.32,0.72,0,1)) infinite alternate',
        }}/>
        <div style={{
          position: 'relative', width: 170, height: 170, borderRadius: '50%',
          background: moodGradient(selected, dark),
          boxShadow: '0 20px 60px rgba(40,30,80,0.2), inset 0 2px 0 rgba(255,255,255,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Fraunces, serif', fontSize: 26, fontStyle: 'italic', color: '#FDFBF7',
          letterSpacing: '-0.01em',
        }}>{selected}</div>
      </div>

      {/* Mood row */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
        {MOODS.map(m => (
          <MoodChip key={m.key} dark={dark} mood={m.key} active={selected === m.key} onClick={() => setSelected(m.key)}/>
        ))}
      </div>

      {/* Intensity */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: dark ? '#A8A5BE' : '#55526B', marginBottom: 8, fontWeight: 500, letterSpacing: '0.04em' }}>
          <span>Intensity</span>
          <span>{['barely','a little','clearly','strongly','intensely'][intensity-1]}</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[1,2,3,4,5].map(n => (
            <div key={n} onClick={() => setIntensity(n)} style={{
              flex: 1, height: 8, borderRadius: 4, cursor: 'pointer',
              background: n <= intensity ? moodGradient(selected, dark) : (dark ? 'rgba(255,255,255,0.08)' : 'rgba(26,24,38,0.08)'),
            }}/>
          ))}
        </div>
      </div>

      <PrimaryBtn dark={dark} accent full onClick={onDone}>Save how I feel</PrimaryBtn>
      <style>{`@keyframes breath { 0%{transform:scale(1)} 100%{transform:scale(1.08)} }`}</style>
    </div>
  );
};

const EditorScreen = ({ dark, onDone }) => {
  const [title, setTitle] = React.useState('A quiet Thursday');
  const [body, setBody] = React.useState("Walked the long way home. The light on the brick wall near the corner looked almost pink — noticed I wasn't in a hurry about anything.\n\nWhat I'm grateful for: the fact that I made coffee slowly. That the morning had space in it.");
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
          backdropFilter: 'blur(16px)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: dark ? '#ECEAF5' : '#1A1826',
        }}><LumenIcon name="chevron-left" size={20}/></button>
        <div style={{ flex: 1 }}/>
        <div style={{ fontSize: 12, color: dark ? '#A8A5BE' : '#55526B', fontWeight: 500 }}>Saved · just now</div>
        <button onClick={onDone} style={{
          padding: '8px 16px', borderRadius: 999, border: 'none', cursor: 'pointer',
          background: dark ? '#9FA2FF' : '#1A1826', color: dark ? '#0E1016' : '#FDFBF7',
          fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif',
        }}>Done</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px' }}>
        <Eyebrow dark={dark}>Thursday, April 23 · 9:42 AM</Eyebrow>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Untitled" style={{
          width: '100%', background: 'transparent', border: 'none', outline: 'none',
          fontFamily: 'Fraunces, serif', fontSize: 30, fontWeight: 400, letterSpacing: '-0.015em',
          fontVariationSettings: "'opsz' 96",
          color: dark ? '#ECEAF5' : '#1A1826', padding: '8px 0 2px', marginTop: 4,
        }}/>

        {/* Mood tag */}
        <div style={{ display: 'flex', gap: 8, margin: '12px 0 16px', flexWrap: 'wrap' }}>
          <MoodChip mood="tender" dark={dark} active/>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 999,
            fontSize: 12, fontWeight: 500, color: dark ? '#A8A5BE' : '#55526B',
            border: `1px dashed ${dark ? 'rgba(255,255,255,0.14)' : 'rgba(26,24,38,0.14)'}`,
          }}>+ tag</div>
        </div>

        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Start writing…" style={{
          width: '100%', background: 'transparent', border: 'none', outline: 'none', resize: 'none',
          fontFamily: 'Fraunces, serif', fontSize: 17, lineHeight: '28px', fontVariationSettings: "'opsz' 24",
          color: dark ? '#ECEAF5' : '#1A1826', minHeight: 260,
        }}/>

        {/* Gratitude mini-card */}
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
        {['paperclip','mic','cloud-sun','map-pin','quote'].map(i => (
          <button key={i} style={{
            width: 36, height: 36, borderRadius: 999, border: 'none', background: 'transparent', cursor: 'pointer',
            color: dark ? '#A8A5BE' : '#55526B',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}><LumenIcon name={i} size={18}/></button>
        ))}
        <div style={{ flex: 1, textAlign: 'right', fontSize: 11, color: dark ? '#6E6B85' : '#8A8799', paddingRight: 6 }}>142 words</div>
      </div>
    </div>
  );
};

const EntryDetailScreen = ({ dark, entry, onBack }) => (
  <div style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}>
    <div style={{ padding: '60px 16px 10px', display: 'flex', alignItems: 'center' }}>
      <button onClick={onBack} style={{
        width: 38, height: 38, borderRadius: 999, border: 'none',
        background: dark ? 'rgba(30,34,48,0.7)' : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(16px)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: dark ? '#ECEAF5' : '#1A1826',
      }}><LumenIcon name="chevron-left" size={20}/></button>
      <div style={{ flex: 1 }}/>
      <button style={{ width: 38, height: 38, borderRadius: 999, border: 'none', background: 'transparent', color: dark ? '#A8A5BE' : '#55526B' }}><LumenIcon name="more-horizontal" size={18}/></button>
    </div>

    <div style={{ padding: '10px 24px 40px' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999,
        background: dark ? 'rgba(30,34,48,0.55)' : 'rgba(255,255,255,0.6)', fontSize: 12 }}>
        <MoodDot mood={entry.mood} dark={dark} size={10}/>
        <span style={{ color: dark ? '#A8A5BE' : '#55526B' }}>{entry.mood}</span>
        <span style={{ color: dark ? '#6E6B85' : '#8A8799' }}>· {entry.date}</span>
      </div>

      <Serif size={40} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 18 }}>{entry.title}</Serif>

      <div style={{ marginTop: 24, fontFamily: 'Fraunces, serif', fontSize: 17, lineHeight: '30px',
        fontVariationSettings: "'opsz' 24", color: dark ? '#ECEAF5' : '#1A1826' }}>
        {entry.excerpt}
        <br/><br/>
        The afternoon was slower than I expected. I sat by the window and re-read a chapter I liked the first time, and it was still good — maybe even a little better. I think I'm learning to re-read things instead of only rushing to the next one.
        <br/><br/>
        <em>What I'm grateful for:</em> the quiet · a second cup · the fact that nothing had to happen today.
      </div>

      <div style={{ marginTop: 28, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['morning','reading','slow'].map(t => (
          <span key={t} style={{ fontSize: 12, fontWeight: 500, padding: '5px 10px', borderRadius: 6,
            background: dark ? 'rgba(159,162,255,0.16)' : 'rgba(123,125,232,0.12)',
            color: dark ? '#C7C9FF' : '#5A5CC7' }}>{t}</span>
        ))}
      </div>

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

const PromptsScreen = ({ dark, onBack }) => (
  <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 40 }}>
    <div style={{ padding: '60px 16px 10px', display: 'flex', alignItems: 'center' }}>
      <button onClick={onBack} style={{
        width: 38, height: 38, borderRadius: 999, border: 'none',
        background: dark ? 'rgba(30,34,48,0.7)' : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(16px)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: dark ? '#ECEAF5' : '#1A1826',
      }}><LumenIcon name="chevron-left" size={20}/></button>
    </div>
    <div style={{ padding: '10px 20px 20px' }}>
      <Eyebrow dark={dark}>For when you don't know where to start</Eyebrow>
      <Serif size={32} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 6 }}>Prompts</Serif>
    </div>

    {[
      { label: 'Gratitude', prompts: ["What's something small that went well this week?","Who are you quietly thankful for?","What did your body thank you for today?"] },
      { label: 'Reflection', prompts: ["What have you been avoiding?","What did you learn about yourself this month?","Where did you feel most yourself?"] },
      { label: 'Stress & anxiety', prompts: ["What do you need that you haven't asked for?","Name the feeling underneath the restlessness.","What would enough look like today?"] },
    ].map((sec, si) => (
      <div key={si} style={{ padding: '0 20px 16px' }}>
        <Eyebrow dark={dark} style={{ marginBottom: 10, paddingLeft: 4 }}>{sec.label}</Eyebrow>
        {sec.prompts.map((p, pi) => (
          <div key={pi} style={{ marginBottom: 10 }}>
            <GlassCard dark={dark} style={{ padding: '16px 18px' }}>
              <Serif size={18} italic color={dark ? '#ECEAF5' : '#1A1826'}>{p}</Serif>
            </GlassCard>
          </div>
        ))}
      </div>
    ))}
  </div>
);

Object.assign(window, { OnboardingScreen, LockScreen, MoodCheckinScreen, EditorScreen, EntryDetailScreen, PromptsScreen });
