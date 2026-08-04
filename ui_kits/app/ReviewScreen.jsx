(function(){
const ReviewScreen_DS = window.LingoToolboxDesignSystem_898611;
const Flashcard = ReviewScreen_DS.Flashcard; const ReviewRating = ReviewScreen_DS.ReviewRating; const Button = ReviewScreen_DS.Button; const Icon = ReviewScreen_DS.Icon; const IconButton = ReviewScreen_DS.IconButton; const Tooltip = ReviewScreen_DS.Tooltip; const Tag = ReviewScreen_DS.Tag; const ProgressBar = ReviewScreen_DS.ProgressBar; const Card = ReviewScreen_DS.Card; const Badge = ReviewScreen_DS.Badge;

const reviewStyles = {
  wrap: { display: 'flex', height: '100%', minHeight: 0 },
  stage: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-7)', padding: '24px 32px 32px' },
  bar: { width: '100%', maxWidth: 620, display: 'flex', alignItems: 'center', gap: 'var(--space-5)' },
  panel: { width: 'var(--panel-width)', flex: 'none', borderLeft: '1px solid var(--border-subtle)', padding: '20px', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', overflowY: 'auto' },
  panelBlock: { flex: 'none' },
  eyebrow: { fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' },
  statRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 'var(--fs-13)', color: 'var(--text-muted)' },
  statVal: { fontFamily: 'var(--font-display)', fontSize: 'var(--fs-16)', fontWeight: 'var(--fw-black)', color: 'var(--text-strong)' },
};

function ReviewScreen({ onDone, onGraded }) {
  const [index, setIndex] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [done, setDone] = React.useState(18);
  const card = LINGO_DATA.cards[index % LINGO_DATA.cards.length];

  const grade = (key) => {
    setFlipped(false);
    setDone((d) => d + 1);
    setIndex((i) => i + 1);
    onGraded && onGraded(key);
  };

  return (
    <div style={reviewStyles.wrap}>
      <div style={reviewStyles.stage}>
        <div style={reviewStyles.bar}>
          <span style={{ ...reviewStyles.eyebrow, flex: 'none' }}>Kitchen Spanish</span>
          <ProgressBar value={done} max={40} height={6} />
          <span style={{ ...reviewStyles.statVal, flex: 'none' }}>{done}/40</span>
        </div>

        <div style={{ width: '100%', maxWidth: 620 }}>
          <Flashcard
            language="Spanish"
            front={card.front}
            phonetic={card.phonetic}
            back={card.back}
            flipped={flipped}
            onFlip={setFlipped}
            height={280}
            hint={flipped ? 'Grade yourself below' : 'Click or press Space to flip'}
            tags={card.tags.map((t) => <Tag key={t} color="var(--cyan-300)">{t}</Tag>)}
          />
        </div>

        <div style={{ width: '100%', maxWidth: 620, minHeight: 78 }}>
          {flipped ? (
            <ReviewRating onGrade={grade} />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)' }}>
              <Tooltip label="Play audio" shortcut="P"><IconButton label="Play audio" variant="solid" size="lg"><Icon name="volume-2" size={18} /></IconButton></Tooltip>
              <Button size="lg" variant="secondary" onClick={() => setFlipped(true)} iconRight={<Icon name="repeat" size={16} />}>Show answer</Button>
              <Tooltip label="Skip card" shortcut="→"><IconButton label="Skip card" variant="solid" size="lg" onClick={() => setIndex((i) => i + 1)}><Icon name="arrow-right" size={18} /></IconButton></Tooltip>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-5)', color: 'var(--text-faint)', fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-semibold)' }}>
          <span>Space flip</span><span>1–4 grade</span><span>P audio</span><span>Esc end session</span>
        </div>
      </div>

      <aside style={reviewStyles.panel}>
        <div style={reviewStyles.panelBlock}>
          <span style={reviewStyles.eyebrow}>Session</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
            <div style={reviewStyles.statRow}><span>Reviewed</span><span style={reviewStyles.statVal}>{done}</span></div>
            <div style={reviewStyles.statRow}><span>Correct</span><span style={reviewStyles.statVal}>86%</span></div>
            <div style={reviewStyles.statRow}><span>Time</span><span style={reviewStyles.statVal}>7m 20s</span></div>
          </div>
        </div>

        <Card padding="14px" style={reviewStyles.panelBlock}>
          <span style={reviewStyles.eyebrow}>This card</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 2 }}>
            <div style={reviewStyles.statRow}><span>Seen</span><span style={reviewStyles.statVal}>9 times</span></div>
            <div style={reviewStyles.statRow}><span>Lapses</span><span style={reviewStyles.statVal}>2</span></div>
            <div style={reviewStyles.statRow}><span>Interval</span><span style={reviewStyles.statVal}>4d</span></div>
          </div>
        </Card>

        <div style={reviewStyles.panelBlock}>
          <span style={reviewStyles.eyebrow}>In context</span>
          <p style={{ margin: '8px 0 0', fontSize: 'var(--fs-14)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-body)' }}>
            Nos quedamos de <strong style={{ color: 'var(--violet-200)' }}>sobremesa</strong> hasta las cinco.
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 'var(--fs-13)', color: 'var(--text-faint)' }}>We stayed talking at the table until five.</p>
        </div>

        <div style={reviewStyles.panelBlock}>
          <span style={reviewStyles.eyebrow}>Related</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {['mesa', 'sobremesa', 'merienda', 'tertulia'].map((w) => <Tag key={w} color="var(--violet-400)">{w}</Tag>)}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--gap-inline)', marginTop: 'auto', flex: 'none' }}>
          <Button variant="ghost" size="sm" iconLeft={<Icon name="pencil" size={14} />}>Edit card</Button>
          <Button variant="ghost" size="sm" onClick={onDone} iconLeft={<Icon name="x" size={14} />}>End session</Button>
        </div>
      </aside>
    </div>
  );
}

Object.assign(window, { ReviewScreen, reviewStyles });
})();
