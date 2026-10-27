export function motionAllowed(preference, reduced) { return preference === 'play' || (preference !== 'pause' && !reduced); }
export function shouldPlay({ enabled, visible, documentVisible, failed }) { return enabled && visible && documentVisible && !failed; }
export function observeDocumentVisibility(doc, onChange) {
  const report = () => onChange(!doc.hidden);
  doc.addEventListener('visibilitychange', report);
  report();
  return () => doc.removeEventListener('visibilitychange', report);
}
