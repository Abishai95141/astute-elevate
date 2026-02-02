

# Add CMS Fields to Case Study Editor

This plan adds the new SEO fields to the admin case study editor form and fixes the secret sequence.

---

## Summary of Findings

**Sitemap Edge Function**: Working correctly and returns valid XML with all published pages:
- Static: `/`, `/case-studies`, `/about`, `/contact`
- Services: `/services/document-digitization`, `/services/ai-automation`, `/services/custom-software-development`, `/services/digital-transformation`
- Case Studies: 2 published case studies

**Secret Sequence Issue**: Current sequence is `shemanthika292504` but should be `shemanthika@292504` (with @ symbol).

---

## Implementation

### 1. Fix Secret Sequence (useSecretSequence.ts)

Update the secret sequence from `shemanthika292504` to `shemanthika@292504`:

```
const SECRET_SEQUENCE = 'shemanthika@292504';
```

---

### 2. Add New CMS Fields to CaseStudyEdit.tsx

#### 2.1 New State Variables

Add state for all new fields:
- `industry` (string)
- `selectedServices` (string[]) - service tags
- `techStack` (string[]) - tech tags
- `results` (array of {label, value, context})
- `clientType` (string)
- `faqs` (array of {question, answer})
- `relatedCaseStudyIds` (string[])
- `relatedServiceIds` (string[])
- `sectionContent` (object with keys for each section)

#### 2.2 Industry Field (Single Select)

Add dropdown with predefined industries:
- Audit
- Retail
- Manufacturing
- Healthcare
- Fintech
- Legal
- Education
- Other

#### 2.3 Services Multi-Select

Fetch available services from database and display as checkboxes:
- Document Digitization
- AI Automation
- Custom Software Development
- Digital Transformation

#### 2.4 Tech Stack Tags

Tag input component allowing multiple technology entries (React, Node.js, Supabase, etc.)

#### 2.5 Results Array Builder

Dynamic form for 2-4 result items:
- Label (e.g., "Processing time reduced")
- Value (e.g., "8 hours -> 45 minutes")
- Context (optional, e.g., "per 1,000 invoices")

Add/remove buttons for managing entries.

#### 2.6 Client Type Field

Simple text input for non-PII client description (e.g., "Mid-size audit firm (India)")

#### 2.7 FAQs Array Builder

Dynamic form for Q/A pairs:
- Question (text)
- Answer (textarea)

Add/remove buttons for managing entries (recommended 3-5).

#### 2.8 Related Case Studies Multi-Select

Fetch all other case studies and allow selecting 2-3 related ones.

#### 2.9 Related Services Multi-Select

Fetch all services and allow selecting relevant ones for cross-linking.

#### 2.10 Section Content Editors

Structured editors for semantic H2 sections:
- Client & Context
- Problem
- Goals / Success Criteria
- Solution
- Implementation
- Results Narrative
- Next Steps / CTA

Each section uses a simplified RichTextEditor (no headings allowed in editor).

---

### 3. Form Sections Layout

Organize the form into logical sections:

```
[Thumbnail Section]
[Basic Information] - title, slug, category, description, stats
[Metadata] - industry, client type, services, tech stack
[Results] - array builder for key metrics
[Section Content] - structured editors for each H2 section
[FAQs] - array builder for Q/A pairs
[Related Content] - related case studies & services
[Gallery]
[SEO] - meta title, description
[Publishing] - published toggle, display order
```

---

### 4. Save Handler Updates

Update `handleSave` function to include all new fields in the save payload:
- `industry`
- `services`
- `tech_stack`
- `results`
- `client_type`
- `faqs`
- `related_case_study_ids`
- `related_service_ids`
- `section_content`

---

### 5. Load Existing Data

Update the `useEffect` that populates the form to also load:
- All new fields from `existingStudy`
- Parse JSONB fields correctly (results, faqs, section_content)

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/hooks/useSecretSequence.ts` | Change sequence to include @ symbol |
| `src/pages/admin/CaseStudyEdit.tsx` | Add all new form fields and sections |

## New Helper Components (inline in CaseStudyEdit)

- `TagInput` - reusable component for tech stack and similar tag arrays
- `ResultsBuilder` - dynamic form for result entries
- `FAQBuilder` - dynamic form for FAQ entries
- `SectionEditor` - wrapper around RichTextEditor for each H2 section

---

## Technical Notes

- Use `usePublishedServices` hook to fetch available services for the multi-select
- Use `useAllCaseStudies` hook to populate related case studies picker
- JSONB fields (results, faqs, section_content) should be properly typed and validated before save
- The form already has responsive grid layouts - maintain this pattern for new sections

