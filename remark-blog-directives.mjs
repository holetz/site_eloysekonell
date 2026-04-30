import { visit } from 'unist-util-visit';

function extractText(node) {
  let text = '';
  function walk(n) {
    if (n.type === 'text') text += escapeHtml(n.value);
    if (n.type === 'break') text += '\n';
    if (n.children) n.children.forEach(walk);
  }
  walk(node);
  return text;
}

function inlineToHtml(nodes) {
  return (nodes || []).map(n => {
    if (n.type === 'text') return escapeHtml(n.value);
    if (n.type === 'strong') return `<strong>${inlineToHtml(n.children)}</strong>`;
    if (n.type === 'emphasis') return `<em>${inlineToHtml(n.children)}</em>`;
    return '';
  }).join('');
}

function splitAtBreaks(nodes) {
  // Split inline nodes into line segments, handling both hard-break nodes
  // and soft newlines embedded inside text node values (single \n in remark).
  const segments = [];
  let current = [];
  for (const n of nodes || []) {
    if (n.type === 'break') {
      segments.push(current);
      current = [];
    } else if (n.type === 'text' && n.value.includes('\n')) {
      const parts = n.value.split('\n');
      for (let i = 0; i < parts.length; i++) {
        if (i > 0) { segments.push(current); current = []; }
        if (parts[i] !== '') current.push({ type: 'text', value: parts[i] });
      }
    } else {
      current.push(n);
    }
  }
  if (current.length) segments.push(current);
  return segments;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function remarkBlogDirectives() {
  return (tree) => {
    visit(tree, (node) => {

      // ::pullquote[text] — leaf directive
      if (node.type === 'leafDirective' && node.name === 'pullquote') {
        const text = extractText(node);
        Object.assign(node, {
          type: 'html',
          value: `<div class="pullquote"><p>${text}</p></div>`,
          children: undefined,
          name: undefined,
          attributes: undefined,
        });
      }

      // :::data-grid — pipe-delimited lines: "num | label"
      if (node.type === 'containerDirective' && node.name === 'data-grid') {
        const raw = extractText(node);
        const items = raw
          .split('\n')
          .filter((l) => l.includes('|'))
          .map((line) => {
            const [num, ...rest] = line.split('|').map((s) => s.trim());
            return `<div class="data-item"><div class="data-num">${num}</div><div class="data-label">${rest.join(' ')}</div></div>`;
          })
          .join('');
        Object.assign(node, {
          type: 'html',
          value: `<div class="data-grid">${items}</div>`,
          children: undefined,
          name: undefined,
          attributes: undefined,
        });
      }

      // :::inline-cta{eyebrow heading link} body text :::
      if (node.type === 'containerDirective' && node.name === 'inline-cta') {
        const attrs = node.attributes || {};
        const eyebrow = escapeHtml(attrs.eyebrow || 'Vamos conversar');
        const heading = escapeHtml(attrs.heading || '');
        const rawLink = attrs.link || 'https://wa.me/5547991443844';
        const link = escapeHtml(/^https?:\/\//i.test(rawLink) ? rawLink : 'https://wa.me/5547991443844');
        const text = extractText(node).trim();
        Object.assign(node, {
          type: 'html',
          value: `<div class="inline-cta">
  <span class="art-eyebrow">${eyebrow}</span>
  <h3>${heading}</h3>
  <p>${text}</p>
  <a href="${link}" target="_blank" rel="noopener" class="btn-cta">Falar com Eloyse</a>
</div>`,
          children: undefined,
          name: undefined,
          attributes: undefined,
        });
      }

      // :::exercise{title description} pipe-delimited items :::
      // Each line: "01 | **Question** | Hint text"
      // Uses inlineToHtml+splitAtBreaks because remark already parsed **bold** into strong nodes
      // before this plugin runs — extractText+regex would strip the formatting.
      if (node.type === 'containerDirective' && node.name === 'exercise') {
        const attrs = node.attributes || {};
        const title = escapeHtml(attrs.title || 'Exercício prático');
        const description = escapeHtml(attrs.description || '');
        const segments = (node.children || [])
          .filter(c => c.type === 'paragraph')
          .flatMap(p => splitAtBreaks(p.children));
        const items = segments
          .map(seg => {
            const lineHtml = inlineToHtml(seg);
            if (!lineHtml.includes('|')) return '';
            const parts = lineHtml.split('|').map(s => s.trim());
            const num = parts[0] || '';
            const question = parts[1] || '';
            const hint = parts[2] || '';
            return `<div class="exercise-item">
  <div class="exercise-num">${num}</div>
  <div class="exercise-body">
    <p>${question}</p>
    ${hint ? `<p class="exercise-hint">${hint}</p>` : ''}
  </div>
</div>`;
          })
          .filter(Boolean)
          .join('');
        Object.assign(node, {
          type: 'html',
          value: `<div class="exercise">
  <div class="exercise-header">
    <span class="art-eyebrow">${title}</span>
    ${description ? `<p>${description}</p>` : ''}
  </div>
  <div class="exercise-items">${items}</div>
</div>`,
          children: undefined,
          name: undefined,
          attributes: undefined,
        });
      }
    });
  };
}
