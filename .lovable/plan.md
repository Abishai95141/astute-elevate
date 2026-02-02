

# Add Markdown Import Feature for Case Studies

This plan adds an "Import from Markdown" button that allows editors to quickly populate all case study fields from a structured `.md` file. Images and display order are excluded from import.

---

## Implementation Overview

### 1. Create MarkdownImporter Component

**File: `src/components/admin/MarkdownImporter.tsx`**

A dialog-based component with:
- File input accepting `.md` files
- Example markdown template with download button
- Import button that parses the file and returns structured data
- Clear instructions and validation feedback

### 2. Markdown File Structure

The markdown file uses YAML frontmatter for metadata fields and markdown sections for content:

```markdown
---
# CASE STUDY IMPORT FILE
# Instructions:
# 1. Fill in the frontmatter (between --- lines) with metadata
# 2. Write content under each ## section heading
# 3. Images must be added manually after import
# 4. Display order and publish status are set in the CMS

# === REQUIRED FIELDS ===
title: "AI-Powered Invoice Processing for Global Audit Firm"
slug: "ai-invoice-processing-audit-firm"
category: "AI Archives"  # Options: Digital Branding, Operations, AI Archives, Software Dev
short_description: "Reduced invoice processing time from 8 hours to 45 minutes using custom AI document extraction."

# === METADATA ===
industry: "Audit"  # Options: Audit, Retail, Manufacturing, Healthcare, Fintech, Legal, Education, Other
client_type: "Big 4 Audit Firm (Global)"
services:
  - "AI Automation"
  - "Document Digitization"
tech_stack:
  - "Python"
  - "TensorFlow"
  - "React"
  - "Supabase"

# === KEY RESULTS (2-4 items) ===
results:
  - label: "Processing time reduced"
    value: "8 hours → 45 minutes"
    context: "per 1,000 invoices"
  - label: "Accuracy improved"
    value: "99.2%"
    context: "vs 94% manual"
  - label: "Cost savings"
    value: "$2.4M annually"

# === STATS (shown on card) ===
stat_value: "94%"
stat_metric: "Time Saved"

# === SEO (optional - auto-generated if empty) ===
meta_title: ""
meta_description: ""

# === FAQs (optional, 3-5 recommended for SEO) ===
faqs:
  - question: "How long did the implementation take?"
    answer: "The full implementation took 12 weeks, including integration testing and staff training."
  - question: "What was the ROI timeline?"
    answer: "The client achieved positive ROI within 4 months of deployment."
---

## Client & Context

Provide background about the client without revealing confidential information.
Focus on their industry, size, and relevant context for the case study.

Example: A leading Big 4 audit firm with operations in 45 countries was struggling with manual invoice processing across their global offices.

## Problem

Describe the challenge or pain point the client faced.
Be specific about the business impact and urgency.

Example: Manual invoice processing required 8+ hours per batch of 1,000 invoices, leading to delays in client reporting and increased operational costs.

## Goals / Success Criteria

Define what success looked like for this project.
Include measurable targets where possible.

Example:
- Reduce processing time by at least 80%
- Maintain or improve accuracy (target: 98%+)
- Enable real-time dashboard for processing status

## Solution

Explain how you solved the problem.
Focus on the approach and key decisions, not just the technology.

Example: We developed a custom AI pipeline combining OCR, NLP, and machine learning to automatically extract, validate, and categorize invoice data.

## Implementation

Describe the technical approach and process.
Include timeline, phases, and any challenges overcome.

Example: 
Phase 1 (Weeks 1-4): Data collection and model training
Phase 2 (Weeks 5-8): API development and integration
Phase 3 (Weeks 9-12): Testing, optimization, and deployment

## Results Narrative

Provide a detailed narrative of the outcomes and impact.
This complements the quantitative results in the frontmatter.

Example: Within the first month of deployment, the client processed over 50,000 invoices with 99.2% accuracy. The operations team reported significant reduction in overtime hours.

## Next Steps / CTA

Describe future plans or include a call to action.

Example: The client is now exploring expansion of the AI system to handle expense reports and purchase orders. Contact us to learn how we can transform your document processing.
```

---

### 3. Parsing Logic

The import function will:

1. **Extract frontmatter** using regex to find content between `---` markers
2. **Parse YAML** frontmatter into structured fields
3. **Extract sections** by splitting on `## ` headings
4. **Convert markdown to TipTap JSON** for rich text sections
5. **Validate required fields** (title, slug, category, short_description)
6. **Return structured data** matching the form state types

### 4. Section Mapping

Markdown headings map to `sectionContent` keys:

| Markdown Heading | sectionContent Key |
|-----------------|-------------------|
| `## Client & Context` | `context` |
| `## Problem` | `problem` |
| `## Goals / Success Criteria` | `goals` |
| `## Solution` | `solution` |
| `## Implementation` | `implementation` |
| `## Results Narrative` | `results_narrative` |
| `## Next Steps / CTA` | `next_steps` |

### 5. UI Integration

Add import button to the CaseStudyEdit header (near Save/Publish buttons):

```tsx
<Button variant="outline" onClick={() => setImportDialogOpen(true)}>
  <Upload className="h-4 w-4 mr-2" />
  Import MD
</Button>
```

The dialog contains:
- Instructions text
- "Download Example Template" button
- File drop zone / file input
- Preview of parsed data (optional)
- "Import" and "Cancel" buttons

### 6. Import Handler

When a file is imported:

1. Parse the markdown file
2. Show confirmation if form already has data ("This will overwrite existing data")
3. Populate all form state variables except:
   - `thumbnailUrl` / `thumbnailAlt` (images added manually)
   - `displayOrder` (set in CMS)
   - `isPublished` (always false on import)
   - `relatedCaseStudyIds` / `relatedServiceIds` (require ID lookups)

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/admin/MarkdownImporter.tsx` | Dialog component with file parsing |
| `src/lib/markdown-parser.ts` | Parsing utilities for frontmatter and sections |

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/admin/CaseStudyEdit.tsx` | Add import button and dialog integration |

---

## Technical Details

### Frontmatter Parsing

Use a simple regex-based YAML parser (no external dependency needed):

```typescript
function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const yaml = match[1];
  // Parse YAML key-value pairs, arrays, and nested objects
  return parseYaml(yaml);
}
```

### Markdown to TipTap JSON

Convert markdown paragraphs to TipTap's `JSONContent` format:

```typescript
function markdownToTipTap(markdown: string): JSONContent {
  const paragraphs = markdown.split('\n\n').filter(p => p.trim());
  return {
    type: 'doc',
    content: paragraphs.map(p => ({
      type: 'paragraph',
      content: [{ type: 'text', text: p.trim() }]
    }))
  };
}
```

### Validation

Display errors for:
- Missing required fields (title, slug, category, short_description)
- Invalid category value
- Invalid industry value
- Malformed YAML

---

## User Flow

1. User clicks "Import MD" button
2. Dialog opens with instructions and example template
3. User downloads template, fills it out
4. User drags/selects the `.md` file
5. System validates and shows preview
6. User clicks "Import" to populate form
7. User manually adds thumbnail image
8. User reviews and saves/publishes

---

## Example Template Download

The component includes a button to download the example template:

```typescript
const downloadTemplate = () => {
  const blob = new Blob([EXAMPLE_TEMPLATE], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'case-study-template.md';
  a.click();
};
```

