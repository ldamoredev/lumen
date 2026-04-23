// Home, Timeline, Insights, Profile screens for Lumen.

const HomeScreen = ({ dark, onWrite, onOpenEntry }) => {
  return (
    <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 130 }}>
      <div style={{ padding: '70px 20px 24px' }}>
        <Eyebrow dark={dark}>Thursday · April 23</Eyebrow>
        <Serif size={40} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 8 }}>
          Good morning,<br/>
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
            {MOODS.slice(0,5).map((m,i) => (
              <MoodChip key={m.key} dark={dark} mood={m.key} active={i===1}/>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Start writing CTA */}
      <div style={{ padding: '14px 20px 0' }}>
        <GlassCard dark={dark} style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px 20px 22px', position: 'relative' }}>
            <div style={{
              position: 'absolute', right: -30, top: -30, width: 160, height: 160, borderRadius: '50%',
              background: dark
                ? 'radial-gradient(circle, rgba(159,162,255,0.25), transparent 70%)'
                : 'radial-gradient(circle, rgba(232,181,200,0.45), transparent 70%)',
              filter: 'blur(12px)',
            }}/>
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

      {/* Streak + week */}
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
            {['calm','tender','bright','calm','grateful','tender','calm'].map((mood,i) => (
              <div key={i} style={{
                flex: 1, height: [18,22,30,24,32,26,20][i],
                borderRadius: 4,
                background: moodGradient(mood, dark),
                opacity: i === 6 ? 1 : 0.85,
              }}/>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent entries */}
      <div style={{ padding: '24px 20px 0' }}>
        <Eyebrow dark={dark} style={{ marginBottom: 10 }}>Recent entries</Eyebrow>
        {[
          { date: 'Wed · Apr 22', title: 'The rain finally stopped', mood: 'grateful', excerpt: 'Walked the long way. The air after rain has a specific quietness I keep forgetting about.' },
          { date: 'Tue · Apr 21', title: 'A difficult call', mood: 'heavy', excerpt: 'I told the truth, which was what needed to happen. That doesn\'t mean I feel good about it yet.' },
          { date: 'Mon · Apr 20', title: 'New week, small plans', mood: 'calm', excerpt: 'Three things on the list. That feels like a kind amount for a Monday.' },
        ].map((e,i) => (
          <div key={i} onClick={() => onOpenEntry(e)} style={{ marginBottom: 10, cursor: 'pointer' }}>
            <GlassCard dark={dark} style={{ padding: '14px 16px 16px 22px', position: 'relative' }}>
              <div style={{
                position: 'absolute', left: 10, top: 14, bottom: 14, width: 4, borderRadius: 2,
                background: moodGradient(e.mood, dark),
              }}/>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: dark ? '#A8A5BE' : '#55526B' }}>{e.date}</div>
              <Serif size={18} color={dark ? '#ECEAF5' : '#1A1826'} style={{ margin: '4px 0 4px' }}>{e.title}</Serif>
              <div style={{ fontSize: 13, lineHeight: '19px', color: dark ? '#A8A5BE' : '#55526B', fontFamily: 'Inter, sans-serif' }}>{e.excerpt}</div>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
};

const TimelineScreen = ({ dark, onOpenEntry }) => {
  const [view, setView] = React.useState('list');
  return (
    <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 130 }}>
      <div style={{ padding: '70px 20px 16px' }}>
        <Eyebrow dark={dark}>April 2026</Eyebrow>
        <Serif size={32} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 6 }}>Timeline</Serif>
      </div>

      {/* View toggle */}
      <div style={{ padding: '0 20px 14px', display: 'flex', gap: 8 }}>
        {['list','calendar'].map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            background: view === v ? (dark ? '#ECEAF5' : '#1A1826') : 'transparent',
            color: view === v ? (dark ? '#0E1016' : '#FDFBF7') : (dark ? '#A8A5BE' : '#55526B'),
            border: `1px solid ${view === v ? 'transparent' : (dark ? 'rgba(255,255,255,0.14)' : 'rgba(26,24,38,0.1)')}`,
            fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em', textTransform: 'capitalize',
          }}>{v}</button>
        ))}
        <div style={{ flex: 1 }}/>
        <button style={{
          width: 38, height: 38, borderRadius: 999, border: `1px solid ${dark ? 'rgba(255,255,255,0.14)' : 'rgba(26,24,38,0.1)'}`,
          background: 'transparent', color: dark ? '#A8A5BE' : '#55526B', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}><LumenIcon name="search" size={18}/></button>
      </div>

      {view === 'calendar' ? <CalendarView dark={dark}/> : <ListView dark={dark} onOpenEntry={onOpenEntry}/>}
    </div>
  );
};

const CalendarView = ({ dark }) => {
  const days = Array.from({length: 30}, (_,i) => i+1);
  const moodFor = (d) => ['calm','tender','bright','grateful','heavy','restless',null,null][d % 8];
  return (
    <div style={{ padding: '0 20px' }}>
      <GlassCard dark={dark}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 8 }}>
          {['M','T','W','T','F','S','S'].map((d,i) => (
            <div key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: dark ? '#6E6B85' : '#8A8799' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
          {[null,null,null,...days].map((d,i) => d === null ? <div key={i}/> : (
            <div key={i} style={{
              aspectRatio: '1', borderRadius: 10, position: 'relative',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
              background: d === 23 ? (dark ? 'rgba(159,162,255,0.18)' : 'rgba(123,125,232,0.14)') : 'transparent',
              border: d === 23 ? `1px solid ${dark ? '#9FA2FF' : '#7B7DE8'}` : 'none',
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: dark ? '#ECEAF5' : '#1A1826' }}>{d}</div>
              {moodFor(d) && <MoodDot mood={moodFor(d)} dark={dark} size={6}/>}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

const ListView = ({ dark, onOpenEntry }) => {
  const entries = [
    { date: 'Wed · Apr 22', title: 'The rain finally stopped', mood: 'grateful', excerpt: 'Walked the long way. The air after rain has a specific quietness.' },
    { date: 'Tue · Apr 21', title: 'A difficult call', mood: 'heavy', excerpt: 'I told the truth, which was what needed to happen.' },
    { date: 'Sun · Apr 19', title: 'Reading on the balcony', mood: 'calm', excerpt: 'Two chapters and nothing else. I needed that.' },
    { date: 'Sat · Apr 18', title: 'Dinner with M.', mood: 'tender', excerpt: 'We talked about old apartments. She remembered the fern.' },
    { date: 'Fri · Apr 17', title: 'Long week', mood: 'restless', excerpt: 'Trying to land. Some weeks just don\'t let you.' },
  ];
  return (
    <div style={{ padding: '0 20px' }}>
      {entries.map((e,i) => (
        <div key={i} onClick={() => onOpenEntry(e)} style={{ marginBottom: 10, cursor: 'pointer' }}>
          <GlassCard dark={dark} style={{ padding: '14px 16px 16px 22px', position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 10, top: 14, bottom: 14, width: 4, borderRadius: 2,
              background: moodGradient(e.mood, dark),
            }}/>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: dark ? '#A8A5BE' : '#55526B' }}>{e.date}</div>
            <Serif size={18} color={dark ? '#ECEAF5' : '#1A1826'} style={{ margin: '4px 0 4px' }}>{e.title}</Serif>
            <div style={{ fontSize: 13, lineHeight: '19px', color: dark ? '#A8A5BE' : '#55526B', fontFamily: 'Inter, sans-serif' }}>{e.excerpt}</div>
          </GlassCard>
        </div>
      ))}
    </div>
  );
};

const InsightsScreen = ({ dark }) => (
  <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 130 }}>
    <div style={{ padding: '70px 20px 16px' }}>
      <Eyebrow dark={dark}>April · last 30 days</Eyebrow>
      <Serif size={32} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 6 }}>
        How this month <span style={{ fontStyle: 'italic' }}>felt</span>
      </Serif>
    </div>

    <div style={{ padding: '0 20px' }}>
      <GlassCard dark={dark} style={{ padding: '18px 18px 16px' }}>
        <Eyebrow dark={dark}>Mood distribution</Eyebrow>
        <div style={{ marginTop: 14, height: 14, borderRadius: 999, overflow: 'hidden', display: 'flex' }}>
          {[
            { m: 'calm', w: 28 },
            { m: 'tender', w: 22 },
            { m: 'grateful', w: 20 },
            { m: 'bright', w: 14 },
            { m: 'heavy', w: 10 },
            { m: 'restless', w: 6 },
          ].map(s => (
            <div key={s.m} style={{ width: `${s.w}%`, background: moodGradient(s.m, dark) }}/>
          ))}
        </div>
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {MOODS.map(m => (
            <div key={m.key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: dark ? '#A8A5BE' : '#55526B' }}>
              <MoodDot mood={m.key} dark={dark} size={10}/>
              <span style={{ flex: 1, textTransform: 'capitalize' }}>{m.key}</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', color: dark ? '#ECEAF5' : '#1A1826' }}>{[28,22,10,14,6,20]['calm tender heavy bright restless grateful'.split(' ').indexOf(m.key)]}%</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>

    <div style={{ padding: '14px 20px 0' }}>
      <GlassCard dark={dark}>
        <Eyebrow dark={dark}>Mood over time</Eyebrow>
        <svg viewBox="0 0 300 110" style={{ width: '100%', marginTop: 12 }}>
          <defs>
            <linearGradient id="lg1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={dark ? '#9FA2FF' : '#7B7DE8'} stopOpacity="0.45"/>
              <stop offset="100%" stopColor={dark ? '#9FA2FF' : '#7B7DE8'} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0 70 C 40 50, 60 80, 100 55 S 160 35, 200 50 S 260 25, 300 40 L 300 110 L 0 110 Z" fill="url(#lg1)"/>
          <path d="M0 70 C 40 50, 60 80, 100 55 S 160 35, 200 50 S 260 25, 300 40" fill="none" stroke={dark ? '#9FA2FF' : '#7B7DE8'} strokeWidth="1.5"/>
          {[[0,70],[100,55],[200,50],[300,40]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3" fill={dark ? '#ECEAF5' : '#FDFBF7'} stroke={dark ? '#9FA2FF' : '#7B7DE8'} strokeWidth="1.5"/>
          ))}
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: dark ? '#6E6B85' : '#8A8799', marginTop: 4, letterSpacing: '0.08em' }}>
          <span>W1</span><span>W2</span><span>W3</span><span>W4</span>
        </div>
      </GlassCard>
    </div>

    <div style={{ padding: '14px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <GlassCard dark={dark} style={{ padding: 16 }}>
        <Eyebrow dark={dark}>Most felt</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
          <MoodDot mood="calm" dark={dark} size={24}/>
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

const ProfileScreen = ({ dark, onThemeToggle }) => (
  <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 130 }}>
    <div style={{ padding: '70px 20px 20px' }}>
      <Eyebrow dark={dark}>Your journal</Eyebrow>
      <Serif size={32} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 6 }}>Settings</Serif>
    </div>

    <div style={{ padding: '0 20px 14px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{
        width: 64, height: 64, borderRadius: 999,
        background: 'linear-gradient(145deg, #E8B5C8, #7B7DE8)',
        boxShadow: '0 8px 24px rgba(123,125,232,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Fraunces, serif', fontSize: 26, color: '#FDFBF7', fontStyle: 'italic',
      }}>A</div>
      <div>
        <Serif size={22} color={dark ? '#ECEAF5' : '#1A1826'}>Ada</Serif>
        <div style={{ fontSize: 13, color: dark ? '#A8A5BE' : '#55526B', marginTop: 2 }}>Writing since January</div>
      </div>
    </div>

    {[
      { header: 'Appearance', rows: [
        { icon: 'moon', label: 'Theme', value: dark ? 'Dark' : 'Light', onClick: onThemeToggle, toggle: true },
        { icon: 'bell', label: 'Daily reminder', value: '8:30 PM' },
      ]},
      { header: 'Privacy', rows: [
        { icon: 'lock', label: 'Passcode & Face ID', value: 'On' },
        { icon: 'eye-off', label: 'Hide previews', value: 'On' },
      ]},
      { header: 'Writing', rows: [
        { icon: 'quote', label: 'Daily prompts', value: 'Gentle' },
        { icon: 'cloud-sun', label: 'Auto-capture weather', value: 'On' },
      ]},
      { header: 'Data', rows: [
        { icon: 'upload', label: 'Export entries' },
        { icon: 'refresh-cw', label: 'Backup & sync', value: 'iCloud' },
      ]},
    ].map((section, si) => (
      <div key={si} style={{ padding: '0 20px 18px' }}>
        <Eyebrow dark={dark} style={{ marginBottom: 8, paddingLeft: 4 }}>{section.header}</Eyebrow>
        <GlassCard dark={dark} style={{ padding: 0, overflow: 'hidden' }}>
          {section.rows.map((r, ri) => (
            <div key={ri} onClick={r.onClick} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px',
              borderBottom: ri < section.rows.length - 1 ? `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(26,24,38,0.05)'}` : 'none',
              cursor: r.onClick ? 'pointer' : 'default',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: dark ? 'rgba(159,162,255,0.14)' : 'rgba(123,125,232,0.1)',
                color: dark ? '#9FA2FF' : '#7B7DE8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><LumenIcon name={r.icon} size={16}/></div>
              <div style={{ flex: 1, fontSize: 15, color: dark ? '#ECEAF5' : '#1A1826', fontFamily: 'Inter, sans-serif' }}>{r.label}</div>
              {r.toggle ? (
                <div style={{
                  width: 44, height: 26, borderRadius: 999,
                  background: dark ? '#9FA2FF' : 'rgba(26,24,38,0.12)',
                  position: 'relative', cursor: 'pointer',
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 999, background: '#FDFBF7',
                    position: 'absolute', top: 2, left: dark ? 20 : 2, transition: 'left 200ms',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }}/>
                </div>
              ) : (
                <div style={{ fontSize: 13, color: dark ? '#A8A5BE' : '#55526B', fontFamily: 'Inter, sans-serif' }}>{r.value}</div>
              )}
              {!r.toggle && <LumenIcon name="chevron-right" size={16} color={dark ? '#6E6B85' : '#8A8799'}/>}
            </div>
          ))}
        </GlassCard>
      </div>
    ))}
  </div>
);

Object.assign(window, { HomeScreen, TimelineScreen, InsightsScreen, ProfileScreen });
