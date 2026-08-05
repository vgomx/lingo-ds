(function(){
const MarketingHero_DS = window.LingoToolboxDesignSystem_898611;
const Button = MarketingHero_DS.Button; const Icon = MarketingHero_DS.Icon; const Flashcard = MarketingHero_DS.Flashcard; const Tag = MarketingHero_DS.Tag; const ReviewRating = MarketingHero_DS.ReviewRating; const StreakPill = MarketingHero_DS.StreakPill;

const heroStyles = {
  section: { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '72px 24px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-11)', alignItems: 'center' },
  eyebrow: { fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--violet-600)' },
  h1: { margin: '12px 0 0', fontFamily: 'var(--font-display)', fontSize: 'var(--fs-72)', fontWeight: 'var(--fw-black)', lineHeight: 1.02, letterSpacing: 'var(--ls-tight)', color: 'var(--text-strong)' },
  lead: { margin: '20px 0 0', fontSize: 'var(--fs-18)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-muted)', maxWidth: 460 },
  ctas: { display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-8)', alignItems: 'center', flexWrap: 'wrap' },
  proof: { display: 'flex', gap: 'var(--space-8)', marginTop: 'var(--space-9)' },
  stat: { fontFamily: 'var(--font-display)', fontSize: 'var(--fs-32)', fontWeight: 'var(--fw-black)', color: 'var(--text-strong)', lineHeight: 1 },
  statLabel: { fontSize: 'var(--fs-13)', color: 'var(--text-faint)' },
  stageWrap: { background: 'var(--violet-500)', borderRadius: 'var(--radius-2xl)', padding: 28, display: 'flex', flexDirection: 'column', gap: 16 },
};

function MarketingHero({ onCta }) {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <section style={heroStyles.section}>
      <div>
        <span style={heroStyles.eyebrow}>Open source · five tools · 14 languages</span>
        <h1 style={heroStyles.h1}>Practise the words you nearly know.</h1>
        <p style={heroStyles.lead}>
          Lingo Toolbox isn't another course. It's the set of tools you open after the lesson — flashcards that know when to ask, and an etymology explorer that makes a word stick for good.
        </p>
        <div style={heroStyles.ctas}>
          <Button size="xl" pill onClick={onCta} iconRight={<Icon name="arrow-right" size={18} />}>Open the app</Button>
          <Button size="xl" pill variant="outline" iconLeft={<Icon name="play" size={16} />}>See a review session</Button>
        </div>
        <div style={heroStyles.proof}>
          <div><div style={heroStyles.stat}>1.2M</div><span style={heroStyles.statLabel}>cards reviewed daily</span></div>
          <div><div style={heroStyles.stat}>14</div><span style={heroStyles.statLabel}>languages</span></div>
          <div><div style={heroStyles.stat}>MIT</div><span style={heroStyles.statLabel}>licensed, self-hostable</span></div>
        </div>
      </div>

      <div style={heroStyles.stageWrap}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'rgba(255,255,255,.75)' }}>Kitchen Spanish · 12 due</span>
          <StreakPill days={26} size="sm" />
        </div>
        <div data-theme="dark" style={{ background: 'var(--ink-700)', borderRadius: 'var(--radius-xl)', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Flashcard language="Spanish" front="sobremesa" phonetic="/so.bɾeˈme.sa/" back="the long talk after a meal"
            height={210} flipped={flipped} onFlip={setFlipped}
            hint={flipped ? 'Grade yourself below' : 'Click to flip'}
            tags={<><Tag color="var(--cyan-300)">noun</Tag><Tag color="var(--mint-300)">B1</Tag></>} />
          <ReviewRating onGrade={() => setFlipped(false)} showDue={false} />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MarketingHero, heroStyles });
})();
