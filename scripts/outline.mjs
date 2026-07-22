// Print a condensed outline of a mirrored page's <main> content so we can
// design positional extraction selectors.
import { load } from 'cheerio';
import { readFileSync } from 'node:fs';

const file = process.argv[2];
const selector = process.argv[3] || 'main';
const html = readFileSync(file, 'utf8');
const $ = load(html);

const root = $(selector).length ? $(selector).first() : $('body');

function walk(el, depth) {
  const $el = $(el);
  const tag = el.tagName;
  if (!tag) return;
  const cls = ($el.attr('class') || '')
    .split(/\s+/)
    .filter((c) => c && !/^has-|^is-layout|^wp-container|^wp-elements/.test(c))
    .slice(0, 4)
    .join('.');
  const ownText = $el
    .contents()
    .filter((_, n) => n.type === 'text')
    .text()
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, 80);
  const attrs = [];
  if (tag === 'img') attrs.push(($el.attr('src') || '').split('/').pop());
  if (tag === 'a') attrs.push(`→${$el.attr('href')}`);
  if (tag === 'video' || $el.attr('data-video-url')) attrs.push('VIDEO');
  const line = `${'  '.repeat(depth)}<${tag}${cls ? '.' + cls : ''}>${ownText ? ' "' + ownText + '"' : ''} ${attrs.join(' ')}`;
  if (ownText || attrs.length || ['section', 'div', 'figure', 'ul', 'form', 'details'].includes(tag) === false || true) console.log(line.trimEnd());
  $el.children().each((_, c) => walk(c, depth + 1));
}

root.children().each((_, c) => walk(c, 0));
