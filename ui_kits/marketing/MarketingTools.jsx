(function(){
const MarketingTools_DS = window.LingoToolboxDesignSystem_898611;
const Card = MarketingTools_DS.Card; const Icon = MarketingTools_DS.Icon; const Tag = MarketingTools_DS.Tag; const Button = MarketingTools_DS.Button; const EtymologyNode = MarketingTools_DS.EtymologyNode; const Badge = MarketingTools_DS.Badge; const ProgressBar = MarketingTools_DS.ProgressBar;

const toolsStyles = {
  section: { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '64px 24px' },
  head: { maxWidth: 640, marginBottom: 'var(--space-9)' },
  eyebrow: { fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' },
  h2: { margin: '10px 0 0', fontFamily: 'var(--font-display)', fontSize: 'var(--fs-48)', fontWeight: 'var(--fw-black)', lineHeight: 1.05, letterSpacing: 'var(--ls-tight)', color: 'var(--text-strong)' },
  lead: { margin: '14px 0 0', fontSize: 'var(--fs-18)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-muted)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-5)' },
  feature: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-11)', alignItems: 'center', marginTop: 'var(--space-11)' },
  band: { background: 'var(--paper-50)', boxShadow: 'inset 0 1px 0 var(--border), inset 0 -1px 0 var(--border)' },
};

const TOOLS = [
  { label: 'Flashcards', icon: 'layers', color: 'var(--tool-flashcards)', copy: 'Spaced repetition that schedules itself around the words you keep dropping.' },
  { label: 'Etymology Explorer', icon: 'git-branch', color: 'var(--tool-etymology)', copy: 'Follow a word back through every language it passed through.' },
  { label: 'Conjugation Drill', icon: 'spell-check', color: 'var(--tool-conjugation)', copy: 'Forty forms in four minutes, weighted toward the ones you miss.' },
  { label: 'Phrasebook', icon: 'message-square-quote', color: 'var(--tool-phrasebook)', copy: 'Save whole phrases where they were said, not just the words.' },
  { label: 'Grammar Notes', icon: 'scroll-text', color: 'var(--tool-grammar)', copy: 'Short explanations you can pull up mid-review without losing your place.' },
];

function MarketingTools() {
  return (
    <>
      <section style={toolsStyles.section}>
        <div style={toolsStyles.head}>
          <span style={toolsStyles.eyebrow}>The toolbox</span>
          <h2 style={toolsStyles.h2}>Five tools, one workspace.</h2>
          <p style={toolsStyles.lead}>Each tool does one thing well and shares the same deck of words, so nothing you save is stranded in a single exercise.</p>
        </div>
        <div style={toolsStyles.grid}>
          {TOOLS.map((t) => (
            <Card key={t.label} accent={t.color} interactive>
              <span style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center', background: 'color-mix(in oklab,' + t.color + ' 16%, transparent)', color: t.color }}>
                <Icon name={t.icon} size={22} />
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-20)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{t.label}</span>
              <span style={{ fontSize: 'var(--fs-14)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-muted)' }}>{t.copy}</span>
            </Card>
          ))}
        </div>
      </section>

      <div style={toolsStyles.band}>
        <section style={{ ...toolsStyles.section, paddingTop: 72, paddingBottom: 72 }}>
          <div style={{ ...toolsStyles.feature, marginTop: 0 }}>
            <div>
              <span style={toolsStyles.eyebrow}>Etymology Explorer</span>
              <h2 style={{ ...toolsStyles.h2, fontSize: 'var(--fs-40)' }}>A word sticks once you know where it's been.</h2>
              <p style={toolsStyles.lead}>Trace any word down to its root and pick up its cousins on the way. Add the whole chain to a deck in one click.</p>
              <div style={{ marginTop: 'var(--space-7)' }}>
                <Button size="lg" pill variant="secondary" iconRight={<Icon name="arrow-right" size={16} />}>Try it on a word</Button>
              </div>
            </div>
            <Card padding="24px">
              <EtymologyNode word="sobremesa" language="Spanish" era="c. 1600" gloss="the time spent at the table after eating" current />
              <EtymologyNode word="super mensam" language="Latin" era="classical" gloss="over the table" />
              <EtymologyNode word="*mens-" language="Proto-Indo-European" era="reconstructed" gloss="to measure out — also month, moon" connector={false} />
            </Card>
          </div>

          <div style={toolsStyles.feature}>
            <Card padding="24px">
              <span style={toolsStyles.eyebrow}>Today · Kitchen Spanish</span>
              <ProgressBar label="Session" valueLabel="18 / 40" value={18} max={40} />
              <ProgressBar label="Mastery mix" segments={[{ weight: 62, color: 'var(--success)' }, { weight: 24, color: 'var(--warning)' }, { weight: 14, color: 'var(--paper-200)' }]} />
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Badge tone="success" dot>62% mastered</Badge><Badge tone="warning">24% learning</Badge><Badge>14% new</Badge>
              </div>
            </Card>
            <div>
              <span style={toolsStyles.eyebrow}>Flashcards</span>
              <h2 style={{ ...toolsStyles.h2, fontSize: 'var(--fs-40)' }}>It asks you before you forget.</h2>
              <p style={toolsStyles.lead}>Grade a card Again, Hard, Good or Easy and the schedule adjusts. Sessions end when you're done, not when a lesson says so.</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
                {['spaced repetition', 'reverse cards', 'audio on flip', 'leech rescue'].map((t) => <Tag key={t} color="var(--violet-600)">{t}</Tag>)}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

Object.assign(window, { MarketingTools, toolsStyles });
})();
