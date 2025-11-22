import { useMemo, useState } from 'react';
import './App.css';

const starterThoughts = [
  'Morning pages',
  'Sensory details',
  'Metaphor clusters'
];

export default function App() {
  const [nodes] = useState(starterThoughts);
  const headline = useMemo(
    () => 'Matins — associative mind mapping inspired by Gabrielle Rico',
    []
  );

  return (
    <div className="app-shell">
      <header>
        <p className="eyebrow">Prototype kickoff</p>
        <h1>{headline}</h1>
        <p>
          Step 1 complete: the React + TypeScript workspace is ready. Next up,
          we will capture scenarios in Gherkin and drive features with tests.
        </p>
      </header>

      <section className="node-grid">
        {nodes.map((node) => (
          <article key={node}>
            <h2>{node}</h2>
            <p>Describe a writing cue or free-association starting point.</p>
          </article>
        ))}
      </section>
    </div>
  );
}
