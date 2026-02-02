
# Fix Markdown-to-TipTap Conversion

The `markdownToTipTap` function in `src/lib/markdown-parser.ts` is too simplistic. It's treating all markdown content as plain text paragraphs instead of converting markdown syntax into proper TipTap JSON structures with marks (bold, italic) and nodes (headings, lists).

---

## Problem

The current function:
- Ignores `**bold**` syntax - outputs raw `**text**`
- Ignores `### Heading` syntax - outputs raw `### text`
- Ignores `- list item` syntax - outputs as plain text with `-`
- Ignores `*italic*` and other inline formatting

---

## Solution

Rewrite `markdownToTipTap` to properly convert:

| Markdown Syntax | TipTap JSON Structure |
|----------------|----------------------|
| `**text**` | `{ type: 'text', text: 'text', marks: [{ type: 'bold' }] }` |
| `*text*` | `{ type: 'text', text: 'text', marks: [{ type: 'italic' }] }` |
| `### Heading` | `{ type: 'heading', attrs: { level: 3 }, content: [...] }` |
| `- item` | `{ type: 'bulletList', content: [{ type: 'listItem', content: [...] }] }` |
| `1. item` | `{ type: 'orderedList', content: [{ type: 'listItem', content: [...] }] }` |

---

## Implementation Details

### 1. Parse Inline Marks

Create a function to parse inline markdown and convert to TipTap text nodes with marks:

```typescript
function parseInlineMarks(text: string): JSONContent[] {
  const nodes: JSONContent[] = [];
  // Regex to match **bold**, *italic*, `code`, [link](url)
  // Split and process each segment, applying appropriate marks
}
```

### 2. Handle Block-Level Elements

Update the main loop to detect and handle:

```typescript
// Headings: ### text
if (trimmed.match(/^#{1,6}\s/)) {
  const level = trimmed.match(/^(#+)/)[1].length;
  const text = trimmed.replace(/^#+\s*/, '');
  content.push({
    type: 'heading',
    attrs: { level },
    content: parseInlineMarks(text)
  });
}

// Bullet lists: - item
if (trimmed.startsWith('- ')) {
  // Collect consecutive list items into a bulletList node
}

// Ordered lists: 1. item
if (trimmed.match(/^\d+\.\s/)) {
  // Collect consecutive items into an orderedList node
}
```

### 3. Handle Nested Marks

Support combined formatting like `**bold *and italic* text**`:
- Parse outer marks first
- Recursively process inner content

---

## Supported Markdown Syntax After Fix

| Syntax | Renders As |
|--------|-----------|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `***bold italic***` | ***bold italic*** |
| `~~strikethrough~~` | ~~strikethrough~~ |
| `` `code` `` | `code` |
| `[link](url)` | clickable link |
| `### Heading` | H3 heading |
| `- item` | Bullet list |
| `1. item` | Numbered list |
| `> quote` | Blockquote |

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/lib/markdown-parser.ts` | Rewrite `markdownToTipTap` function to properly parse markdown syntax |

---

## Edge Cases Handled

1. **Nested formatting**: `**bold *italic* bold**`
2. **Escaped characters**: `\*not italic\*`
3. **Empty lines**: Properly separate paragraphs
4. **Mixed content**: Lists followed by paragraphs
5. **Incomplete marks**: `**bold without closing` treated as plain text
