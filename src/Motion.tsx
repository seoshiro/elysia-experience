import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { motionAllowed, shouldPlay, observeDocumentVisibility } from './media-policy.mjs';

type Preference = 'auto' | 'play' | 'pause';
const testMode = import.meta.env.DEV ? new URLSearchParams(location.search).get('qa') : null;
const MotionContext = createContext({ enabled: false, reduced: false, toggle: () => {}, enable: () => {} });
export const useSceneMotion = () => useContext(MotionContext);
export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(() => testMode === 'reduced' || matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [preference, setPreference] = useState<Preference>(() => { if (testMode) return 'auto'; try { const p = localStorage.getItem('elysia-motion'); return p === 'pause' || p === 'play' ? p : 'auto'; } catch { return 'auto'; } });
  useEffect(() => { const query = matchMedia('(prefers-reduced-motion: reduce)'); const change = () => setReduced(testMode === 'reduced' || query.matches); query.addEventListener('change', change); return () => query.removeEventListener('change', change); }, []);
  const enabled = motionAllowed(preference, reduced);
  const save = (p: Preference) => { setPreference(p); try { localStorage.setItem('elysia-motion', p); } catch { /* Session state still works when storage is unavailable. */ } };
  return <MotionContext.Provider value={{ enabled, reduced, toggle: () => save(enabled ? 'pause' : 'play'), enable: () => save('play') }}>{children}</MotionContext.Provider>;
}
export function MotionToggle({ compact = false }: { compact?: boolean }) {
  const { enabled, toggle } = useSceneMotion();
  return <button className={`motion-toggle ${compact ? 'compact' : ''}`} onClick={toggle} aria-label={enabled ? 'Pause background motion' : 'Play background motion'} aria-pressed={enabled}>{enabled ? <Pause size={13} /> : <Play size={13} />}<span>Motion {enabled ? 'on' : 'off'}</span></button>;
}
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { reduced } = useSceneMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
export function SceneVideo({ name, alt, priority = false, className = '', controls = false }: { name: string; alt: string; priority?: boolean; className?: string; controls?: boolean }) {
  const wrapper = useRef<HTMLDivElement>(null), video = useRef<HTMLVideoElement>(null);
  const playback = useRef({ lastTime: 0, loops: 0 });
  const { enabled, enable } = useSceneMotion();
  const [near, setNear] = useState(priority), [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(!document.hidden);
  const [src, setSrc] = useState<string>(), [ready, setReady] = useState(false);
  const [issue, setIssue] = useState<'error' | 'blocked' | null>(null), [attempt, setAttempt] = useState(0);
  const base = `${import.meta.env.BASE_URL}media/${name}`;
  useEffect(() => { const element = wrapper.current!; const close = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setNear(true); }, { rootMargin: '240px' }); const inView = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.05), { threshold: [0, 0.05] }); close.observe(element); inView.observe(element); const stopVisibility = observeDocumentVisibility(document, setDocumentVisible); return () => { close.disconnect(); inView.disconnect(); stopVisibility(); }; }, []);
  useEffect(() => { if (!near || !enabled || src) return; const attach = () => setSrc(testMode === 'media-error' ? `${import.meta.env.BASE_URL}media/unavailable.mp4` : `${base}.mp4`); if (testMode === 'slow') { const timer = setTimeout(attach, 8000); return () => clearTimeout(timer); } attach(); }, [near, enabled, src, base]);
  const active = shouldPlay({ enabled, visible, documentVisible, failed: issue === 'error' });
  useEffect(() => {
    const element = video.current; if (!element || !src) return;
    let cancelled = false;
    if (active) {
      const playing = testMode === 'autoplay' && attempt === 0 ? Promise.reject(new DOMException('Autoplay blocked', 'NotAllowedError')) : element.play();
      playing.then(() => { if (cancelled) return; setIssue(null); }).catch((error: DOMException) => { if (!cancelled && error.name !== 'AbortError') { setIssue(error.name === 'NotAllowedError' ? 'blocked' : 'error'); setReady(false); } });
    } else element.pause();
    return () => { cancelled = true; element.pause(); };
  }, [active, src, attempt]);
  const retry = () => { enable(); setIssue(null); if (issue === 'error') video.current?.load(); setAttempt(n => n + 1); };
  return <div ref={wrapper} className={`scene-video ${className}`} data-scene={name} data-state={issue ?? (ready ? 'ready' : 'poster')}>
    <picture><img src={`${base}.webp`} alt={alt} width="1920" height="1080" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" /></picture>
    <video ref={video} src={src} muted loop playsInline preload={src ? 'auto' : 'none'} aria-hidden="true" tabIndex={-1} className={ready && issue !== 'error' ? 'is-ready' : ''} onPlaying={() => setReady(true)} onError={() => { setIssue('error'); setReady(false); }} onTimeUpdate={import.meta.env.DEV ? (event) => { const element = event.currentTarget; if (element.currentTime < playback.current.lastTime - 1) element.dataset.completedLoops = String(++playback.current.loops); playback.current.lastTime = element.currentTime; } : undefined} />
    {controls && <div className="scene-controls liquid-glass"><MotionToggle compact /></div>}
    {issue && <button className="scene-retry liquid-glass" onClick={retry}>{issue === 'error' ? <RotateCcw size={14} /> : <Play size={14} />}<span>{issue === 'error' ? 'Retry motion' : 'Play scene'}</span></button>}
  </div>;
}
