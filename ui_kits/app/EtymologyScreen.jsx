(function(){
const EtymologyScreen_DS = window.LingoToolboxDesignSystem_898611;
const EtymologyNode = EtymologyScreen_DS.EtymologyNode; const Input = EtymologyScreen_DS.Input; const Icon = EtymologyScreen_DS.Icon; const Button = EtymologyScreen_DS.Button; const Card = EtymologyScreen_DS.Card; const Tag = EtymologyScreen_DS.Tag; const Tabs = EtymologyScreen_DS.Tabs; const IconButton = EtymologyScreen_DS.IconButton; const Tooltip = EtymologyScreen_DS.Tooltip; const Badge = EtymologyScreen_DS.Badge;

const etymStyles = {
  page: { display: 'grid', gridTemplateColumns: '1fr var(--panel-width)', height: '100%', minHeight: 0 },
  left: { padding: '24px 32px 40px', overflowY: 'auto' },
  right: { borderLeft: '1px solid var(--border-subtle)', padding: 20, display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', overflowY: 'auto' },
  panelBlock: { flex: 'none' },
  eyebrow: { fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' },
  word: { margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--fs-56)', fontWeight: 'var(--fw-black)', lineHeight: 1, letterSpacing: 'var(--ls-tight)', color: 'var(--text-strong)' },
  phon: { fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-16)', color: 'var(--text-muted)' },
  chain: { marginTop: 'var(--space-8)', paddingLeft: 4 },
};

const CHAIN = [
  { word: 'sobremesa', language: 'Spanish', era: 'c. 1600', gloss: 'the time spent at the table after eating, talking', current: true },
  { word: 'sobre + mesa', language: 'Old Spanish', era: 'c. 1300', gloss: 'over + table — first attested as a compound in monastic records' },
  { word: 'super mensam', language: 'Latin', era: 'classical', gloss: 'over the table; also "on account of"' },
  { word: 'mensa', language: 'Latin', era: 'archaic', gloss: 'table, altar, the meal itself' },
  { word: '*mens-', language: 'Proto-Indo-European', era: 'reconstructed', gloss: 'to measure out — the same root that gives month and moon', connector: false },
];

function EtymologyScreen() {
  const [tab, setTab] = React.useState('descent');
  return (
    <div style={etymStyles.page}>
      <div style={etymStyles.left}>
        <div style={{ maxWidth: 560, marginBottom: 'var(--space-8)' }}>
          <Input placeholder="Trace a word — sobremesa, madrugar, tertulia…" iconLeft={<Icon name="search" size={16} />}
            iconRight={<kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-11)', color: 'var(--text-faint)', background: 'var(--surface-raised)', borderRadius: 'var(--radius-xs)', padding: '2px 5px' }}>/</kbd>}
            defaultValue="sobremesa" size="lg" />
        </div>

        <span style={etymStyles.eyebrow}>Spanish · noun, feminine</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-5)', margin: '6px 0 10px', flexWrap: 'wrap' }}>
          <h1 style={etymStyles.word}>sobremesa</h1>
          <Tooltip label="Play pronunciation"><IconButton label="Play pronunciation" variant="solid" size="lg"><Icon name="volume-2" size={18} /></IconButton></Tooltip>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
          <span style={etymStyles.phon}>/so.bɾeˈme.sa/</span>
          <Tag color="var(--tool-etymology)">noun</Tag>
          <Tag color="var(--mint-500)">B1</Tag>
          <Badge tone="info" dot>In 2 of your decks</Badge>
        </div>

        <div style={{ marginTop: 'var(--space-8)', maxWidth: 640 }}>
          <Tabs items={[{ value: 'descent', label: 'Descent', count: 5 }, { value: 'cognates', label: 'Cognates', count: 11 }, { value: 'usage', label: 'Usage' }]} value={tab} onChange={setTab} />
        </div>

        {tab === 'descent' && (
          <div style={{ ...etymStyles.chain, maxWidth: 640 }}>
            {CHAIN.map((n) => (
              <EtymologyNode key={n.word} {...n} />
            ))}
          </div>
        )}

        {tab === 'cognates' && (
          <div style={{ marginTop: 'var(--space-7)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-4)', maxWidth: 640 }}>
            {[['mesa', 'Spanish', 'table'], ['mensa', 'Italian', 'canteen'], ['mesa', 'Portuguese', 'table'], ['mensal', 'French', 'monthly'], ['month', 'English', 'lunar period'], ['Monat', 'German', 'month'], ['mās', 'Sanskrit', 'moon, month'], ['mensis', 'Latin', 'month'], ['μήνη', 'Greek', 'moon']].map(([w, l, g]) => (
              <Card key={w + l} padding="14px">
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-20)', fontWeight: 'var(--fw-black)', color: 'var(--text-strong)', lineHeight: 1.1 }}>{w}</span>
                <span style={{ ...etymStyles.eyebrow, color: 'var(--tool-etymology)' }}>{l}</span>
                <span style={{ fontSize: 'var(--fs-13)', color: 'var(--text-muted)' }}>{g}</span>
              </Card>
            ))}
          </div>
        )}

        {tab === 'usage' && (
          <div style={{ marginTop: 'var(--space-7)', maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {[['Nos quedamos de sobremesa hasta las cinco.', 'We stayed talking at the table until five.'], ['La sobremesa es sagrada en esta casa.', 'The after-lunch talk is sacred in this house.'], ['Hubo una sobremesa larguísima.', 'There was an extremely long sobremesa.']].map(([es, en]) => (
              <Card key={es} padding="16px">
                <span style={{ fontSize: 'var(--fs-16)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', lineHeight: 'var(--lh-relaxed)' }}>{es}</span>
                <span style={{ fontSize: 'var(--fs-13)', color: 'var(--text-faint)' }}>{en}</span>
              </Card>
            ))}
          </div>
        )}
      </div>

      <aside style={etymStyles.right}>
        <Card title="Add to a deck" padding="16px" style={etymStyles.panelBlock}>
          <p style={{ margin: 0, fontSize: 'var(--fs-13)', color: 'var(--text-muted)', lineHeight: 'var(--lh-relaxed)' }}>
            Save the word with its gloss and the first two links of its descent.
          </p>
          <Button block iconLeft={<Icon name="plus" size={16} />}>Add to Kitchen Spanish</Button>
          <Button variant="ghost" size="sm" block>Choose another deck</Button>
        </Card>

        <div style={etymStyles.panelBlock}>
          <span style={etymStyles.eyebrow}>Root family</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {['mesa', 'mensual', 'mes', 'comensal', 'mensajero'].map((w) => <Tag key={w} color="var(--tool-etymology)">{w}</Tag>)}
          </div>
        </div>

        <div style={etymStyles.panelBlock}>
          <span style={etymStyles.eyebrow}>Recently traced</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 8 }}>
            {['madrugar', 'tertulia', 'friolero', 'duende'].map((w) => (
              <button key={w} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 34, padding: '0 8px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-14)', fontWeight: 'var(--fw-bold)' }}>
                {w}<Icon name="chevron-right" size={16} />
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

Object.assign(window, { EtymologyScreen, etymStyles });
})();
