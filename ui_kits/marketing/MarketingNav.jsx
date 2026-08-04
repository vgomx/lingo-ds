(function(){
const MarketingNav_DS = window.LingoToolboxDesignSystem_898611;
const Button = MarketingNav_DS.Button; const Icon = MarketingNav_DS.Icon; const Badge = MarketingNav_DS.Badge;

const navStyles = {
  bar: { position: 'sticky', top: 0, zIndex: 20, background: 'rgba(255,255,255,.86)', backdropFilter: 'var(--blur-overlay)', boxShadow: 'inset 0 -1px 0 var(--border)' },
  inner: { maxWidth: 'var(--content-max)', margin: '0 auto', height: 68, display: 'flex', alignItems: 'center', gap: 'var(--space-8)', padding: '0 24px' },
  links: { display: 'flex', gap: 'var(--space-7)', flex: 1 },
  link: { fontSize: 'var(--fs-14)', fontWeight: 'var(--fw-bold)', color: 'var(--text-body)', textDecoration: 'none', cursor: 'pointer' },
};

function MarketingNav({ onCta }) {
  return (
    <header style={navStyles.bar}>
      <div style={navStyles.inner}>
        <img src="../../assets/logo/logo-wordmark-violet.svg" alt="Lingo Toolbox" style={{ height: 34 }} />
        <nav style={navStyles.links}>
          {['Tools', 'How it works', 'Languages', 'Open source'].map((l) => <a key={l} style={navStyles.link}>{l}</a>)}
        </nav>
        <Button variant="ghost" size="md">Log in</Button>
        <Button size="md" pill onClick={onCta} iconRight={<Icon name="arrow-right" size={16} />}>Open the app</Button>
      </div>
    </header>
  );
}

Object.assign(window, { MarketingNav, navStyles });
})();
