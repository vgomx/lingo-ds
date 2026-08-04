(function(){
const MarketingOSS_DS = window.LingoToolboxDesignSystem_898611;
const Card = MarketingOSS_DS.Card; const Button = MarketingOSS_DS.Button; const Icon = MarketingOSS_DS.Icon; const Badge = MarketingOSS_DS.Badge; const Tag = MarketingOSS_DS.Tag;

const ossStyles = {
  section: { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '72px 24px' },
  head: { textAlign: 'center', maxWidth: 620, margin: '0 auto var(--space-9)' },
  eyebrow: { fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' },
  h2: { margin: '10px 0 0', fontFamily: 'var(--font-display)', fontSize: 'var(--fs-48)', fontWeight: 'var(--fw-black)', lineHeight: 1.05, color: 'var(--text-strong)' },
  sub: { margin: '14px 0 0', fontSize: 'var(--fs-18)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-muted)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-5)', alignItems: 'start' },
  row: { display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 'var(--fs-14)', color: 'var(--text-body)', lineHeight: 'var(--lh-normal)' },
  iconTile: { width: 42, height: 42, borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center', background: 'var(--surface-sunken)', color: 'var(--text-body)' },
  cta: { background: 'var(--violet-500)', borderRadius: 'var(--radius-2xl)', padding: '56px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' },
};

const WAYS = [
  { name: 'Run it hosted', icon: 'globe', copy: 'Use the community instance. Nothing to install, every tool unlocked.', cta: 'Open the app', variant: 'primary', badge: 'Easiest',
    points: ['All five tools, all 14 languages', 'Unlimited decks and cards', 'Your data exportable any time'] },
  { name: 'Self-host', icon: 'download', copy: 'One container, one Postgres. Keep every card on your own machine.', cta: 'Read the docs', variant: 'secondary',
    points: ['Docker compose in the repo', 'No telemetry, no accounts server', 'Import from CSV and Anki'] },
  { name: 'Contribute', icon: 'git-branch', copy: 'Add a tool, a language pack, or a better scheduler. Reviews are public.', cta: 'Good first issues', variant: 'secondary',
    points: ['MIT licensed, no CLA', 'Design system published here', 'Weekly community call'] },
];

function MarketingOpenSource({ onCta }) {
  return (
    <>
      <section style={ossStyles.section}>
        <div style={ossStyles.head}>
          <span style={ossStyles.eyebrow}>Open source</span>
          <h2 style={ossStyles.h2}>Free, and yours to fork.</h2>
          <p style={ossStyles.sub}>Lingo Toolbox is built in the open under the MIT licence. Use the hosted instance, run your own, or send a pull request — there is no paid tier to unlock.</p>
        </div>
        <div style={ossStyles.grid}>
          {WAYS.map((w) => (
            <Card key={w.name} padding="24px" selected={w.variant === 'primary'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={ossStyles.iconTile}><Icon name={w.icon} size={20} /></span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-20)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', flex: 1 }}>{w.name}</span>
                {w.badge && <Badge tone="brand">{w.badge}</Badge>}
              </div>
              <span style={{ fontSize: 'var(--fs-14)', color: 'var(--text-muted)', lineHeight: 'var(--lh-relaxed)' }}>{w.copy}</span>
              <Button block size="lg" variant={w.variant} onClick={onCta}>{w.cta}</Button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                {w.points.map((p) => (
                  <span key={p} style={ossStyles.row}>
                    <span style={{ color: 'var(--success)', flex: 'none', marginTop: 1 }}><Icon name="check" size={16} /></span>{p}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 'var(--space-7)', flexWrap: 'wrap' }}>
          {['MIT licence', 'Self-hostable', 'No tracking', 'Data export', 'Community translated'].map((t) => <Tag key={t} color="var(--violet-500)">{t}</Tag>)}
        </div>
      </section>

      <section style={{ ...ossStyles.section, paddingTop: 0 }}>
        <div style={ossStyles.cta}>
          <img src="../../assets/logo/logo-wordmark-white.svg" alt="Lingo Toolbox" style={{ height: 72 }} />
          <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--fs-32)', fontWeight: 'var(--fw-black)', color: '#fff', lineHeight: 1.1, maxWidth: 520 }}>
            Twelve cards a day is enough. Start with one.
          </p>
          <Button size="xl" pill variant="secondary" onClick={onCta} iconRight={<Icon name="arrow-right" size={18} />}>Open the app</Button>
          <span style={{ fontSize: 'var(--fs-13)', color: 'rgba(255,255,255,.75)' }}>MIT licensed · 14 languages · self-host any time</span>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { MarketingOpenSource, ossStyles });
})();
