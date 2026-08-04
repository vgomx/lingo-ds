(function(){
const HomeScreen_DS = window.LingoToolboxDesignSystem_898611;
const Card = HomeScreen_DS.Card; const Button = HomeScreen_DS.Button; const Icon = HomeScreen_DS.Icon; const Tag = HomeScreen_DS.Tag; const ProgressBar = HomeScreen_DS.ProgressBar; const Badge = HomeScreen_DS.Badge; const StreakPill = HomeScreen_DS.StreakPill;

const homeStyles = {
  page: { padding: '28px 32px 48px', maxWidth: 'var(--content-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--gap-section)' },
  eyebrow: { fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' },
  hero: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-8)' },
  h1: { margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--fs-40)', fontWeight: 'var(--fw-black)', lineHeight: 1.05, color: 'var(--text-strong)' },
  sub: { margin: '8px 0 0', fontSize: 'var(--fs-16)', color: 'var(--text-muted)', maxWidth: 460, lineHeight: 'var(--lh-relaxed)' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-5)' },
  grid2: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--space-5)', alignItems: 'start' },
  stat: { fontFamily: 'var(--font-display)', fontSize: 'var(--fs-32)', fontWeight: 'var(--fw-black)', color: 'var(--text-strong)', lineHeight: 1 },
  toolTile: { display: 'flex', flexDirection: 'column', gap: 10, padding: 18, borderRadius: 'var(--radius-lg)', background: 'var(--surface-card)', boxShadow: 'var(--ring-inset)', cursor: 'pointer', border: 'none', textAlign: 'left', fontFamily: 'var(--font-ui)' },
};

function HomeScreen({ onTool, onStart }) {
  const due = LINGO_DATA.decks.reduce((n, d) => n + d.due, 0);
  const tools = [
    { id: 'review', label: 'Flashcards', icon: 'layers', color: 'var(--tool-flashcards)', copy: '50 cards due today' },
    { id: 'etymology', label: 'Etymology Explorer', icon: 'git-branch', color: 'var(--tool-etymology)', copy: 'Trace a word back' },
    { id: 'conjugation', label: 'Conjugation Drill', icon: 'spell-check', color: 'var(--tool-conjugation)', copy: 'Preterite, 40 forms' },
    { id: 'phrasebook', label: 'Phrasebook', icon: 'message-square-quote', color: 'var(--tool-phrasebook)', copy: '86 saved phrases' },
    { id: 'grammar', label: 'Grammar Notes', icon: 'scroll-text', color: 'var(--tool-grammar)', copy: 'Subjunctive, part 2' },
  ];
  return (
    <div style={homeStyles.page}>
      <div style={homeStyles.hero}>
        <div>
          <span style={homeStyles.eyebrow}>Spanish · intermediate</span>
          <h1 style={homeStyles.h1}>Good morning, Mara</h1>
          <p style={homeStyles.sub}>{due} cards are due across six decks. Most are ones you rated Hard last week, so take them slowly.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flex: 'none' }}>
          <StreakPill days={26} size="lg" />
          <Button size="xl" iconLeft={<Icon name="play" size={18} />} onClick={onStart}>Start review</Button>
        </div>
      </div>

      <div style={homeStyles.grid3}>
        <Card>
          <span style={homeStyles.eyebrow}>Due today</span>
          <span style={homeStyles.stat}>{due}</span>
          <ProgressBar value={18} max={18 + due} valueLabel="18 done" label="Session progress" />
        </Card>
        <Card>
          <span style={homeStyles.eyebrow}>Words mastered</span>
          <span style={homeStyles.stat}>1,204</span>
          <ProgressBar label="Mastery mix" segments={[{ weight: 62, color: 'var(--success)' }, { weight: 24, color: 'var(--warning)' }, { weight: 14, color: 'var(--surface-raised)' }]} />
        </Card>
        <Card>
          <span style={homeStyles.eyebrow}>This week</span>
          <span style={homeStyles.stat}>4h 12m</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 34 }}>
            {[40, 62, 28, 80, 55, 96, 34].map((h, i) => (
              <span key={i} style={{ flex: 1, height: h + '%', background: i === 5 ? 'var(--brand)' : 'var(--surface-raised)', borderRadius: 3, display: 'block' }} />
            ))}
          </div>
        </Card>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--fs-24)', fontWeight: 'var(--fw-black)', color: 'var(--text-strong)' }}>Your toolbox</h2>
          <Button variant="link" size="sm" iconRight={<Icon name="arrow-right" size={14} />}>Browse all tools</Button>
        </div>
        <div style={homeStyles.grid3}>
          {tools.map((t) => (
            <button key={t.id} style={homeStyles.toolTile} onClick={() => onTool(t.id)}>
              <span style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center', background: 'color-mix(in oklab,' + t.color + ' 18%, transparent)', color: t.color }}>
                <Icon name={t.icon} size={20} />
              </span>
              <span style={{ fontSize: 'var(--fs-16)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{t.label}</span>
              <span style={{ fontSize: 'var(--fs-13)', color: 'var(--text-muted)' }}>{t.copy}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={homeStyles.grid2}>
        <div>
          <h2 style={{ margin: '0 0 var(--space-5)', fontFamily: 'var(--font-display)', fontSize: 'var(--fs-24)', fontWeight: 'var(--fw-black)', color: 'var(--text-strong)' }}>Pick up where you left off</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {LINGO_DATA.decks.slice(0, 3).map((d) => (
              <Card key={d.id} accent={d.accent} interactive padding="16px" onClick={onStart}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-18)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{d.name}</span>
                      {d.due > 0 && <Badge tone="warning">{d.due} due</Badge>}
                    </div>
                    <span style={{ fontSize: 'var(--fs-13)', color: 'var(--text-muted)' }}>{d.cards} cards · {Math.round(d.mastery * 100)}% mastered</span>
                  </div>
                  <div style={{ width: 120, flex: 'none' }}><ProgressBar value={d.mastery * 100} height={6} color={d.accent} /></div>
                  <Icon name="chevron-right" size={18} style={{ color: 'var(--text-faint)' }} />
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Card title="Word of the day" accent="var(--tool-etymology)">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-32)', fontWeight: 'var(--fw-black)', color: 'var(--text-strong)', lineHeight: 1.05 }}>madrugada</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-13)', color: 'var(--text-muted)' }}>/ma.ðɾuˈɣa.ða/</span>
          <p style={{ margin: 0, fontSize: 'var(--fs-14)', color: 'var(--text-body)', lineHeight: 'var(--lh-relaxed)' }}>the small hours — the stretch of night that is already morning</p>
          <div style={{ display: 'flex', gap: 6 }}><Tag color="var(--cyan-500)">noun</Tag><Tag color="var(--amber-500)">B1</Tag></div>
          <Button variant="secondary" size="sm" block iconLeft={<Icon name="git-branch" size={14} />} onClick={() => onTool('etymology')}>Trace it back</Button>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, homeStyles });
})();
