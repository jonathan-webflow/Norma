/**
 * Reveal Animations — Norma Project
 * Blur + opacity + translateY revela ao scroll. Inspirado em novera.framer.ai.
 *
 * USO via data-reveal no markup:
 *   data-reveal="heading"        → word-by-word stagger (H1, H2s sem HTML interno)
 *   data-reveal="block"          → elemento inteiro (parágrafos, H2s com <br>, wrappers)
 *   data-reveal="section-header" → filhos diretos em stagger (colunas de texto)
 *   data-reveal="cards"          → filhos diretos em stagger (grids de cards)
 *
 * Regras de segurança (nunca adicionar data-reveal em):
 *   - descendentes de [data-tl-wrap]  → TimelineSection tem gsap.ticker próprio
 *   - data-omuda-item/text/visual/nav → OQueMudaSection tem clip-path próprio
 *   - data-tile-visual                → StickyFeatures tem scrub próprio
 *   - [data-char-btn] diretamente     → char-stagger do Layout já o controla
 *   - .marquee-inner e filhos         → CSS animation em loop (não pode opacity:0)
 *
 * Triggering via IntersectionObserver (não ScrollTrigger) para ser imune a
 * pin spacers e ScrollTrigger.refresh() calls das seções OQueMuda/Timeline.
 */

import gsap from 'gsap';

// ─── Easing ──────────────────────────────────────────────────────────────────
const EASE = 'power3.out';

// ─── Observers registry (para cleanup no astro:after-swap) ───────────────────
let observers: IntersectionObserver[] = [];

// ─── Utilitário: quebra texto em spans por palavra ────────────────────────────
function wrapWordsInSpans(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent ?? '';
  const parts = text.split(/(\s+)/);
  el.innerHTML = '';

  const spans: HTMLSpanElement[] = [];
  for (const part of parts) {
    if (/^\s+$/.test(part)) {
      el.appendChild(document.createTextNode(part));
    } else if (part.length > 0) {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.willChange = 'transform, opacity, filter';
      span.textContent = part;
      el.appendChild(span);
      spans.push(span);
    }
  }
  return spans;
}

// ─── Helper: observa uma vez e dispara callback ao entrar no viewport ─────────
// rootMargin '0px 0px -12% 0px'  ≡  ScrollTrigger start: 'top 88%'
// rootMargin '0px 0px -15% 0px'  ≡  ScrollTrigger start: 'top 85%'
function onEnter(el: Element, margin: string, callback: () => void) {
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      io.unobserve(el);
      callback();
    },
    { threshold: 0, rootMargin: margin }
  );
  io.observe(el);
  observers.push(io);
}

// ─── Animação 1: Heading — word-by-word stagger ───────────────────────────────
function initHeadingReveal(el: HTMLElement) {
  const spans = wrapWordsInSpans(el);
  if (!spans.length) return;

  gsap.set(spans, { autoAlpha: 0, y: 14, filter: 'blur(6px)' });

  onEnter(el, '0px 0px -12% 0px', () => {
    gsap.to(spans, {
      autoAlpha: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: EASE,
      stagger: 0.08,
    });
  });
}

// ─── Animação 2: Block — elemento inteiro ────────────────────────────────────
function initBlockReveal(el: HTMLElement) {
  gsap.set(el, { autoAlpha: 0, y: 20, filter: 'blur(4px)' });

  onEnter(el, '0px 0px -12% 0px', () => {
    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.7,
      ease: EASE,
    });
  });
}

// ─── Animação 3: Section-header — filhos diretos em stagger ─────────────────
function initSectionHeaderReveal(container: HTMLElement) {
  const children = Array.from(container.children) as HTMLElement[];
  if (!children.length) return;

  gsap.set(children, { autoAlpha: 0, y: 18, filter: 'blur(4px)' });

  onEnter(container, '0px 0px -15% 0px', () => {
    gsap.to(children, {
      autoAlpha: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.65,
      ease: EASE,
      stagger: 0.1,
    });
  });
}

// ─── Animação 4: Cards — filhos diretos em stagger (mais deslocamento) ───────
function initCardsReveal(container: HTMLElement) {
  const cards = Array.from(container.children) as HTMLElement[];
  if (!cards.length) return;

  gsap.set(cards, { autoAlpha: 0, y: 24, filter: 'blur(3px)' });

  onEnter(container, '0px 0px -15% 0px', () => {
    gsap.to(cards, {
      autoAlpha: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: EASE,
      stagger: 0.1,
    });
  });
}

// ─── Inicialização principal ──────────────────────────────────────────────────
function init() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-reveal="heading"]').forEach(initHeadingReveal);
  document.querySelectorAll<HTMLElement>('[data-reveal="block"]').forEach(initBlockReveal);
  document.querySelectorAll<HTMLElement>('[data-reveal="section-header"]').forEach(initSectionHeaderReveal);
  document.querySelectorAll<HTMLElement>('[data-reveal="cards"]').forEach(initCardsReveal);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Suporte a Astro View Transitions (astro:after-swap)
document.addEventListener('astro:after-swap', () => {
  observers.forEach((io) => io.disconnect());
  observers = [];
  init();
});
