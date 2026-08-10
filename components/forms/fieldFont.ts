/**
 * The type size a text field may use without iOS zooming the page.
 *
 * Safari on iOS zooms the viewport when it focuses an input, textarea or
 * select whose computed font-size is below 16px, so that what you are typing
 * is legible. It does not zoom back out afterwards: you tap the search box,
 * the whole interface jumps, and you are left panning a page that no longer
 * fits. Every field here was 13 or 14px, so every field did this.
 *
 * The other way to stop it is `maximum-scale=1` in the viewport meta, which is
 * one line and costs the ability to pinch-zoom anything, permanently, for
 * everyone. Deliberately not that.
 *
 * Touch rather than viewport width, matching how the controls already choose
 * their height: a narrow desktop window is still a mouse, and a mouse has no
 * reason to read 16px fields.
 *
 * Only for the element that actually takes focus. Labels, hints and the tags
 * inside a TagInput are not focus targets and are left at their own sizes.
 */
export const fieldFontSize = (touch: boolean, small = false) => (
  touch ? 'var(--fs-16)' : small ? 'var(--fs-13)' : 'var(--fs-14)'
);
