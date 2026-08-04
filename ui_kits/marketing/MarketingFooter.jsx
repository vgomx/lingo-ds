(function(){
const MarketingFooter_DS = window.LingoToolboxDesignSystem_898611;
const Icon = MarketingFooter_DS.Icon; const Input = MarketingFooter_DS.Input; const Button = MarketingFooter_DS.Button; const Tag = MarketingFooter_DS.Tag;

const footerStyles = {
  wrap: { background: 'var(--ink-900)', color: 'var(--ink-100)' },
  inner: { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '56px 24px 32px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 'var(--space-9)' },
  head: { fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--ink-300)', marginBottom: 'var(--space-5)' },
  link: { fontSize: 'var(--fs-14)', color: 'var(--ink-100)', textDecoration: 'none', cursor: 'pointer' },
  col: { display: 'flex', flexDirection: 'column', gap: 10 },
  bottom: { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '20px 24px 40px', display: 'flex', alignItems: 'center', gap: 'var(--space-6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06)', flexWrap: 'wrap' },
  langs: { display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'var(--space-5)' },
};

const LANGS = ['Spanish', 'Japanese', 'Turkish', 'French', 'German', 'Portuguese', 'Italian', 'Korean', 'Dutch', 'Polish', 'Greek', 'Swedish', 'Arabic', 'Hindi'];

function MarketingFooter() {
  return (
    <footer style={footerStyles.wrap}>
      <div style={footerStyles.inner}>
        <div>
          <img src="../../assets/logo/logo-wordmark-white.svg" alt="Lingo Toolbox" style={{ height: 38 }} />
          <p style={{ margin: '16px 0 0', fontSize: 'var(--fs-14)', lineHeight: 'var(--lh-relaxed)', color: 'var(--ink-200)', maxWidth: 300 }}>
            The tools you open after the lesson. Built in the open, MIT licensed.
          </p>
          <div style={{ maxWidth: 280, marginTop: 20 }}>
            <span style={footerStyles.head}>Word of the day, by email</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input placeholder="you@email.com" size="md" />
              <Button size="md">Join</Button>
            </div>
          </div>
        </div>
        <div>
          <div style={footerStyles.head}>Tools</div>
          <div style={footerStyles.col}>
            {['Flashcards', 'Etymology Explorer', 'Conjugation Drill', 'Phrasebook', 'Grammar Notes'].map((l) => <a key={l} style={footerStyles.link}>{l}</a>)}
          </div>
        </div>
        <div>
          <div style={footerStyles.head}>Project</div>
          <div style={footerStyles.col}>
            {['About', 'Blog', 'Roadmap', 'Press kit', 'Contact'].map((l) => <a key={l} style={footerStyles.link}>{l}</a>)}
          </div>
        </div>
        <div>
          <div style={footerStyles.head}>Support</div>
          <div style={footerStyles.col}>
            {['Docs', 'Self-hosting guide', 'Import from Anki', 'Issue tracker', 'Privacy'].map((l) => <a key={l} style={footerStyles.link}>{l}</a>)}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 24px' }}>
        <div style={footerStyles.head}>14 languages</div>
        <div style={footerStyles.langs}>
          {LANGS.map((l) => <Tag key={l} color="var(--violet-300)">{l}</Tag>)}
        </div>
      </div>
      <div style={footerStyles.bottom}>
        <span style={{ fontSize: 'var(--fs-13)', color: 'var(--ink-300)', flex: 1 }}>© 2026 Lingo Toolbox contributors · MIT licence</span>
        {['globe', 'mail', 'share-2'].map((i) => (
          <span key={i} style={{ color: 'var(--ink-200)' }}><Icon name={i} size={18} /></span>
        ))}
      </div>
    </footer>
  );
}

Object.assign(window, { MarketingFooter, footerStyles });
})();
