
# Fix Case Study Page: Render Section Content & Expandable FAQs

The case study page currently only displays the old `content` field and FAQs as static text. This plan updates the page to render the structured `section_content` with semantic H2 headings and converts FAQs to an expandable accordion.

---

## Problem Analysis

**Current Behavior:**
- Only the old `content` field is rendered via `ContentRenderer` (line 238)
- `section_content` (which contains Problem, Solution, etc.) is stored in the database but never displayed
- FAQs are rendered as static divs, not expandable accordions

**Expected Behavior:**
- Display each populated section from `section_content` with proper H2 headings
- Render FAQs at the bottom as an expandable accordion

---

## Implementation

### 1. Update CaseStudy.tsx to Render Section Content

Add section content rendering between the hero and FAQs:

```tsx
// Section configuration matching the editor
const SECTION_CONFIG = [
  { key: 'context', label: 'Client & Context' },
  { key: 'problem', label: 'The Problem' },
  { key: 'goals', label: 'Success Criteria' },
  { key: 'solution', label: 'Our Solution' },
  { key: 'implementation', label: 'Implementation' },
  { key: 'results_narrative', label: 'Results' },
  { key: 'next_steps', label: 'Next Steps' },
];

// Render each populated section
{sectionContent && (
  <section className="container-custom py-16">
    <div className="max-w-3xl mx-auto prose prose-lg prose-invert">
      {SECTION_CONFIG.map(({ key, label }) => {
        const content = sectionContent[key];
        if (!content || !content.content?.length) return null;
        return (
          <motion.div key={key}>
            <h2>{label}</h2>
            <ContentRenderer content={content} />
          </motion.div>
        );
      })}
    </div>
  </section>
)}
```

### 2. Convert FAQs to Accordion

Import the Accordion components and update the FAQs section:

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Updated FAQs section
{faqs.length > 0 && (
  <section className="container-custom py-16">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-lg">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
)}
```

### 3. Extract Section Content from Case Study Data

Add parsing of the `section_content` field from the case study:

```tsx
// Parse section_content from the case study
const sectionContent = (caseStudy as any).section_content as Record<string, JSONContent> | null;
```

### 4. Update Section Ordering

Ensure sections are rendered in the correct order:
1. Hero (title, description, results stats)
2. Section Content (Client & Context, Problem, Goals, Solution, Implementation, Results Narrative, Next Steps)
3. Gallery (if images exist)
4. FAQs (expandable accordion)
5. Related Services
6. Related Case Studies

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/CaseStudy.tsx` | Add section content rendering, convert FAQs to accordion |

---

## Visual Structure After Fix

```
[Hero Section]
  - Title, description, key results cards

[Content Sections]
  - H2: Client & Context
    - (content)
  - H2: The Problem
    - (content)
  - H2: Success Criteria
    - (content)
  - H2: Our Solution
    - (content)
  - H2: Implementation
    - (content)
  - H2: Results
    - (content)
  - H2: Next Steps
    - (content)

[Gallery] (if images)

[FAQs - Expandable Accordion]
  > How long did implementation take?
  > What was the ROI?
  > (etc.)

[Related Services]
[Related Case Studies]
```

---

## Technical Notes

- Section content is stored as TipTap JSONContent per section
- Only sections with actual content (content array length > 0) are rendered
- FAQs use `type="single" collapsible` so only one expands at a time
- The old `content` field rendering can be removed or kept as fallback for legacy case studies
