import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

const starterThoughts = [
  'Morning pages',
  'Sensory details',
  'Metaphor clusters'
];

const hintShortcuts = [
  { combo: 'Esc', description: 'Toggle the hint palette anywhere in the app' },
  { combo: ':', description: 'Reveal the palette without leaving the keyboard' },
  { combo: 'Click Hints', description: 'Open the palette using the UI control' },
  { combo: 'Click Close', description: 'Dismiss the palette with the Close button' }
];

export default function App() {
  const [nodes] = useState(starterThoughts);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const headline = useMemo(
    () => 'Matins',
    []
  );

  const openPalette = useCallback(() => setIsPaletteOpen(true), []);
  const closePalette = useCallback(() => setIsPaletteOpen(false), []);
  const togglePalette = useCallback(
    () => setIsPaletteOpen((previous) => !previous),
    []
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        togglePalette();
        return;
      }

      if (event.key === ':' || (event.key === ';' && event.shiftKey)) {
        event.preventDefault();
        openPalette();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openPalette, togglePalette]);

  return (
    <div className="app-shell">
      <header>
        <div className="header-content">
          <div>
            <p className="eyebrow">Prototype kickoff</p>
            <h1>{headline}</h1>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="hint-trigger"
              onClick={openPalette}
              aria-expanded={isPaletteOpen}
              aria-controls="hint-palette"
            >
              Hints
            </button>
          </div>
        </div>
      </header>

      <div className={`workspace${isPaletteOpen ? ' workspace--palette' : ''}`}>
        <section className="node-grid" aria-label="Starter mind map nodes">
          {nodes.map((node) => (
            <article key={node}>
              <h2>{node}</h2>
              <p>Describe a writing cue or free-association starting point.</p>
            </article>
          ))}
        </section>

        {isPaletteOpen && (
          <aside
            id="hint-palette"
            className="hint-panel hint-panel--floating"
            aria-label="Hint palette"
          >
            <div className="panel-header">
              <p className="panel-title">Hint palette</p>
              <button type="button" onClick={closePalette}>
                Close hints
              </button>
            </div>

            <p className="panel-description">
              Keyboard-first and mouse-friendly entries into the Matins canvas.
            </p>

            <dl className="hint-list">
              {hintShortcuts.map((hint) => (
                <div key={hint.combo} className="hint-row">
                  <dt>{hint.combo}</dt>
                  <dd>{hint.description}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </div>
    </div>
  );
}
