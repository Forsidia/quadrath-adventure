/** Token highlighting uses React text nodes, never injected HTML. */
export function JsonCode({ value }: { value: unknown }) {
  const text = JSON.stringify(value, null, 2);
  const pattern = /("(?:\\.|[^"\\])*"\s*:)|("(?:\\.|[^"\\])*")|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;
  const parts: React.ReactNode[] = [];
  let end = 0;
  for (const match of text.matchAll(pattern)) {
    parts.push(text.slice(end, match.index));
    const kind = match[1] ? 'key' : match[2] ? 'string' : match[3] ? 'literal' : 'number';
    parts.push(<span className={'json-' + kind} key={match.index}>{match[0]}</span>);
    end = match.index! + match[0].length;
  }
  parts.push(text.slice(end));
  return <pre className="json-code"><code>{parts}</code></pre>;
}
