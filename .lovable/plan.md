

# Update Markdown Import Template with Instructions

Replace the example-based template with an instruction-focused template that clearly documents what should go in each field, lists available options for selection fields, and adds missing sections.

---

## Changes to Template

### 1. Header with Clear Instructions

Add comprehensive instructions at the top explaining:
- How to fill in the frontmatter
- What to write in content sections
- What gets imported vs. what must be added manually

### 2. Required Fields Section

```yaml
# ═══════════════════════════════════════════════════════════════
# REQUIRED FIELDS
# ═══════════════════════════════════════════════════════════════

# Title of the case study (displayed as H1 on the page)
title: ""

# URL-friendly slug (lowercase, hyphens only, must be unique)
# Example format: "client-name-project-type" or "industry-solution-type"
slug: ""

# Category - SELECT ONE of these exact values:
#   - "Digital Branding"
#   - "Operations"
#   - "AI Archives"
#   - "Software Dev"
category: ""

# Brief summary (1-2 sentences, shown on cards and in search results)
# Keep under 160 characters for optimal SEO
short_description: ""
```

### 3. Metadata Section with Options Listed

```yaml
# ═══════════════════════════════════════════════════════════════
# METADATA
# ═══════════════════════════════════════════════════════════════

# Industry - SELECT ONE of these exact values:
#   - "Audit"
#   - "Retail"
#   - "Manufacturing"
#   - "Healthcare"
#   - "Fintech"
#   - "Legal"
#   - "Education"
#   - "Other"
industry: ""

# Non-identifying client descriptor (no PII)
# Examples: "Fortune 500 Retailer", "Mid-size Audit Firm (India)", "Global Logistics Provider"
client_type: ""

# Services provided - SELECT from these options:
#   - "Document Digitization"
#   - "AI Automation"
#   - "Custom Software Development"
#   - "Digital Transformation"
services:
  - ""

# Technologies used (free-form list)
# Examples: Python, TensorFlow, React, Node.js, Supabase, AWS
tech_stack:
  - ""
```

### 4. Results Section with Clear Structure

```yaml
# ═══════════════════════════════════════════════════════════════
# KEY RESULTS (2-4 items recommended)
# ═══════════════════════════════════════════════════════════════
# Each result should have:
#   - label: What was measured (e.g., "Processing time reduced")
#   - value: The result (e.g., "8 hours to 45 minutes", "99.2%", "$2.4M")
#   - context: (optional) Additional context (e.g., "per 1,000 invoices", "annually")

results:
  - label: ""
    value: ""
    context: ""
```

### 5. Card Stats Section

```yaml
# ═══════════════════════════════════════════════════════════════
# CARD STATISTICS
# ═══════════════════════════════════════════════════════════════
# These appear prominently on the case study card in listings

# The headline number/metric (e.g., "94%", "10x", "$2.4M")
stat_value: ""

# What the stat measures (e.g., "Time Saved", "ROI Increase", "Cost Reduction")
stat_metric: ""
```

### 6. NEW: SEO Section

```yaml
# ═══════════════════════════════════════════════════════════════
# SEO (Search Engine Optimization)
# ═══════════════════════════════════════════════════════════════

# Custom page title (leave empty to auto-generate from title)
# Recommended format: "Case Study: [Title] | Astute Computer"
# Keep under 60 characters
meta_title: ""

# Meta description for search results
# Summarize the case study in 1-2 sentences
# Keep between 120-160 characters for optimal display
meta_description: ""
```

### 7. NEW: Related Content Section

```yaml
# ═══════════════════════════════════════════════════════════════
# RELATED CONTENT (for internal linking)
# ═══════════════════════════════════════════════════════════════
# Note: Related content improves SEO through internal linking.
# Use slugs (URL paths) to reference other content.

# Related service page slugs - SELECT from:
#   - "document-digitization"
#   - "ai-automation"
#   - "custom-software-development"
#   - "digital-transformation"
related_services:
  - ""

# Related case study slugs (enter slugs of 2-3 other published case studies)
# Example: "healthcare-records-digitization"
related_case_studies:
  - ""
```

### 8. FAQs Section with Guidelines

```yaml
# ═══════════════════════════════════════════════════════════════
# FAQs (3-5 recommended for SEO)
# ═══════════════════════════════════════════════════════════════
# FAQs generate FAQ Schema markup which improves search visibility.
# Write questions that potential clients might ask about this project.
# Examples:
#   - "How long did the implementation take?"
#   - "What was the ROI timeline?"
#   - "How was data security handled?"
#   - "Can this solution scale?"

faqs:
  - question: ""
    answer: ""
```

### 9. Content Sections with Writing Guidelines

```markdown
## Client & Context

[INSTRUCTIONS]
Provide background about the client without revealing confidential information.
Focus on:
- Industry and sector
- Company size/scope (without naming)
- Relevant context that led to this project

DO NOT include:
- Client name or identifiable details
- Specific locations (unless authorized)
- Confidential business information


## Problem

[INSTRUCTIONS]
Describe the challenge or pain point the client faced.
Include:
- The specific business problem
- Impact on operations/revenue/efficiency
- Why existing solutions weren't working
- Urgency or timeline pressures


## Goals / Success Criteria

[INSTRUCTIONS]
Define what success looked like for this project.
List:
- Measurable targets (percentages, time savings, cost reduction)
- Qualitative goals (user experience, reliability)
- Must-have vs. nice-to-have requirements


## Solution

[INSTRUCTIONS]
Explain how you solved the problem.
Focus on:
- Overall approach and strategy
- Key technical decisions
- Why this approach was chosen
- Unique aspects of your solution


## Implementation

[INSTRUCTIONS]
Describe the technical approach and process.
Include:
- Project phases and timeline
- Key milestones
- Challenges overcome
- Team collaboration approach


## Results Narrative

[INSTRUCTIONS]
Provide a detailed narrative of outcomes and impact.
This complements the quantitative "results" in the frontmatter.
Include:
- Qualitative improvements
- Client feedback/testimonials (if available)
- Unexpected benefits
- Long-term impact


## Next Steps / CTA

[INSTRUCTIONS]
Describe future plans or include a call to action.
Options:
- Planned expansions of the solution
- How similar results can be achieved for readers
- Contact information or next step
```

---

## Parser Updates

### Add Related Content Fields to Interface

```typescript
export interface ParsedCaseStudy {
  // ... existing fields ...
  
  // NEW: Related content for internal linking
  related_services?: string[];
  related_case_studies?: string[];
}
```

### Update Parser to Extract New Fields

Parse `related_services` and `related_case_studies` from frontmatter and include them in the returned data.

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/lib/markdown-parser.ts` | Replace `EXAMPLE_TEMPLATE` with instruction-focused template, add related content fields to interface and parser |

---

## Template Download Filename

Change downloaded filename from `case-study-template.md` to `case-study-import-template.md` for clarity.

