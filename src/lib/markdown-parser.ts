import type { JSONContent } from '@tiptap/react';

export interface ParsedCaseStudy {
  // Required fields
  title: string;
  slug: string;
  category: string;
  short_description: string;
  
  // Metadata
  industry?: string;
  client_type?: string;
  services?: string[];
  tech_stack?: string[];
  
  // Stats
  stat_value?: string;
  stat_metric?: string;
  
  // Results array
  results?: { label: string; value: string; context?: string }[];
  
  // FAQs array
  faqs?: { question: string; answer: string }[];
  
  // SEO
  meta_title?: string;
  meta_description?: string;
  
  // Section content
  section_content?: {
    context?: JSONContent;
    problem?: JSONContent;
    goals?: JSONContent;
    solution?: JSONContent;
    implementation?: JSONContent;
    results_narrative?: JSONContent;
    next_steps?: JSONContent;
  };
}

export interface ParseResult {
  success: boolean;
  data?: ParsedCaseStudy;
  errors?: string[];
}

const SECTION_MAPPING: Record<string, string> = {
  'Client & Context': 'context',
  'Problem': 'problem',
  'Goals / Success Criteria': 'goals',
  'Solution': 'solution',
  'Implementation': 'implementation',
  'Results Narrative': 'results_narrative',
  'Next Steps / CTA': 'next_steps',
};

const VALID_CATEGORIES = ['Digital Branding', 'Operations', 'AI Archives', 'Software Dev'];
const VALID_INDUSTRIES = ['Audit', 'Retail', 'Manufacturing', 'Healthcare', 'Fintech', 'Legal', 'Education', 'Other'];

/**
 * Parse a simple YAML-like frontmatter format
 */
function parseYamlValue(value: string): string | string[] | { label: string; value: string; context?: string }[] | { question: string; answer: string }[] {
  const trimmed = value.trim();
  
  // Check if it's a quoted string
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || 
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  
  return trimmed;
}

function parseYamlArray(lines: string[], startIndex: number): { items: string[]; endIndex: number } {
  const items: string[] = [];
  let i = startIndex;
  
  while (i < lines.length) {
    const line = lines[i];
    if (line.match(/^\s{2}-\s/)) {
      // Array item like "  - value"
      const value = line.replace(/^\s{2}-\s/, '').trim();
      // Remove quotes if present
      const cleanValue = value.replace(/^["']|["']$/g, '');
      items.push(cleanValue);
      i++;
    } else if (line.match(/^\s{4}/)) {
      // Nested property, continue
      i++;
    } else if (line.trim() === '' || line.match(/^[a-z_]+:/i) || line.startsWith('#')) {
      // End of array
      break;
    } else {
      i++;
    }
  }
  
  return { items, endIndex: i - 1 };
}

function parseResultsArray(lines: string[], startIndex: number): { results: { label: string; value: string; context?: string }[]; endIndex: number } {
  const results: { label: string; value: string; context?: string }[] = [];
  let i = startIndex;
  let currentResult: { label?: string; value?: string; context?: string } = {};
  
  while (i < lines.length) {
    const line = lines[i];
    
    if (line.match(/^\s{2}-\s*label:/)) {
      // Start of new result item
      if (currentResult.label && currentResult.value) {
        results.push(currentResult as { label: string; value: string; context?: string });
      }
      currentResult = { label: line.replace(/^\s{2}-\s*label:\s*/, '').replace(/^["']|["']$/g, '').trim() };
      i++;
    } else if (line.match(/^\s{4}value:/)) {
      currentResult.value = line.replace(/^\s{4}value:\s*/, '').replace(/^["']|["']$/g, '').trim();
      i++;
    } else if (line.match(/^\s{4}context:/)) {
      currentResult.context = line.replace(/^\s{4}context:\s*/, '').replace(/^["']|["']$/g, '').trim();
      i++;
    } else if (line.match(/^[a-z_]+:/i) && !line.match(/^\s/)) {
      // New top-level key
      break;
    } else if (line.trim() === '' || line.startsWith('#')) {
      i++;
    } else {
      i++;
    }
  }
  
  // Push last result
  if (currentResult.label && currentResult.value) {
    results.push(currentResult as { label: string; value: string; context?: string });
  }
  
  return { results, endIndex: i - 1 };
}

function parseFAQsArray(lines: string[], startIndex: number): { faqs: { question: string; answer: string }[]; endIndex: number } {
  const faqs: { question: string; answer: string }[] = [];
  let i = startIndex;
  let currentFAQ: { question?: string; answer?: string } = {};
  
  while (i < lines.length) {
    const line = lines[i];
    
    if (line.match(/^\s{2}-\s*question:/)) {
      // Start of new FAQ item
      if (currentFAQ.question && currentFAQ.answer) {
        faqs.push(currentFAQ as { question: string; answer: string });
      }
      currentFAQ = { question: line.replace(/^\s{2}-\s*question:\s*/, '').replace(/^["']|["']$/g, '').trim() };
      i++;
    } else if (line.match(/^\s{4}answer:/)) {
      currentFAQ.answer = line.replace(/^\s{4}answer:\s*/, '').replace(/^["']|["']$/g, '').trim();
      i++;
    } else if (line.match(/^[a-z_]+:/i) && !line.match(/^\s/)) {
      // New top-level key
      break;
    } else if (line.trim() === '' || line.startsWith('#')) {
      i++;
    } else {
      i++;
    }
  }
  
  // Push last FAQ
  if (currentFAQ.question && currentFAQ.answer) {
    faqs.push(currentFAQ as { question: string; answer: string });
  }
  
  return { faqs, endIndex: i - 1 };
}

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content: string): Record<string, unknown> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const yaml = match[1];
  const lines = yaml.split('\n');
  const result: Record<string, unknown> = {};
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // Skip comments and empty lines
    if (line.startsWith('#') || line.trim() === '') {
      i++;
      continue;
    }
    
    // Match top-level key
    const keyMatch = line.match(/^([a-z_]+):\s*(.*)?$/i);
    if (keyMatch) {
      const key = keyMatch[1];
      const inlineValue = keyMatch[2]?.trim();
      
      // Check if next line starts an array
      if (!inlineValue && i + 1 < lines.length && lines[i + 1].match(/^\s{2}-/)) {
        if (key === 'results') {
          const { results, endIndex } = parseResultsArray(lines, i + 1);
          result[key] = results;
          i = endIndex + 1;
        } else if (key === 'faqs') {
          const { faqs, endIndex } = parseFAQsArray(lines, i + 1);
          result[key] = faqs;
          i = endIndex + 1;
        } else {
          // Simple string array
          const { items, endIndex } = parseYamlArray(lines, i + 1);
          result[key] = items;
          i = endIndex + 1;
        }
      } else if (inlineValue) {
        result[key] = parseYamlValue(inlineValue);
        i++;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }
  
  return result;
}

/**
 * Convert markdown text to TipTap JSONContent format
 */
export function markdownToTipTap(markdown: string): JSONContent {
  const lines = markdown.trim().split('\n');
  const content: JSONContent[] = [];
  let currentParagraph: string[] = [];
  
  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        content.push({
          type: 'paragraph',
          content: [{ type: 'text', text }]
        });
      }
      currentParagraph = [];
    }
  };
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed === '') {
      flushParagraph();
    } else if (trimmed.startsWith('- ')) {
      // List item - for now just treat as paragraph
      flushParagraph();
      content.push({
        type: 'paragraph',
        content: [{ type: 'text', text: trimmed }]
      });
    } else {
      currentParagraph.push(trimmed);
    }
  }
  
  flushParagraph();
  
  return {
    type: 'doc',
    content: content.length > 0 ? content : [{ type: 'paragraph', content: [] }]
  };
}

/**
 * Extract sections from markdown content (after frontmatter)
 */
function extractSections(content: string): Record<string, string> {
  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n?/, '');
  
  const sections: Record<string, string> = {};
  const sectionRegex = /^## (.+?)$/gm;
  let match;
  const sectionStarts: { heading: string; index: number }[] = [];
  
  while ((match = sectionRegex.exec(withoutFrontmatter)) !== null) {
    sectionStarts.push({
      heading: match[1].trim(),
      index: match.index + match[0].length
    });
  }
  
  // Extract content for each section
  for (let i = 0; i < sectionStarts.length; i++) {
    const start = sectionStarts[i];
    const endIndex = i + 1 < sectionStarts.length 
      ? withoutFrontmatter.lastIndexOf('\n## ', sectionStarts[i + 1].index)
      : withoutFrontmatter.length;
    
    const sectionContent = withoutFrontmatter.slice(start.index, endIndex).trim();
    const sectionKey = SECTION_MAPPING[start.heading];
    
    if (sectionKey) {
      sections[sectionKey] = sectionContent;
    }
  }
  
  return sections;
}

/**
 * Parse a markdown file into structured case study data
 */
export function parseMarkdownCaseStudy(content: string): ParseResult {
  const errors: string[] = [];
  
  // Parse frontmatter
  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) {
    return {
      success: false,
      errors: ['Invalid markdown file: missing or malformed frontmatter (content between --- markers)']
    };
  }
  
  // Validate required fields
  if (!frontmatter.title) errors.push('Missing required field: title');
  if (!frontmatter.slug) errors.push('Missing required field: slug');
  if (!frontmatter.category) errors.push('Missing required field: category');
  if (!frontmatter.short_description) errors.push('Missing required field: short_description');
  
  // Validate category
  if (frontmatter.category && !VALID_CATEGORIES.includes(frontmatter.category as string)) {
    errors.push(`Invalid category: "${frontmatter.category}". Valid options: ${VALID_CATEGORIES.join(', ')}`);
  }
  
  // Validate industry
  if (frontmatter.industry && !VALID_INDUSTRIES.includes(frontmatter.industry as string)) {
    errors.push(`Invalid industry: "${frontmatter.industry}". Valid options: ${VALID_INDUSTRIES.join(', ')}`);
  }
  
  if (errors.length > 0) {
    return { success: false, errors };
  }
  
  // Extract sections
  const rawSections = extractSections(content);
  const sectionContent: ParsedCaseStudy['section_content'] = {};
  
  for (const [key, value] of Object.entries(rawSections)) {
    (sectionContent as Record<string, JSONContent>)[key] = markdownToTipTap(value);
  }
  
  // Build result
  const data: ParsedCaseStudy = {
    title: frontmatter.title as string,
    slug: frontmatter.slug as string,
    category: frontmatter.category as string,
    short_description: frontmatter.short_description as string,
    industry: frontmatter.industry as string | undefined,
    client_type: frontmatter.client_type as string | undefined,
    services: frontmatter.services as string[] | undefined,
    tech_stack: frontmatter.tech_stack as string[] | undefined,
    stat_value: frontmatter.stat_value as string | undefined,
    stat_metric: frontmatter.stat_metric as string | undefined,
    results: frontmatter.results as { label: string; value: string; context?: string }[] | undefined,
    faqs: frontmatter.faqs as { question: string; answer: string }[] | undefined,
    meta_title: frontmatter.meta_title as string | undefined,
    meta_description: frontmatter.meta_description as string | undefined,
    section_content: Object.keys(sectionContent).length > 0 ? sectionContent : undefined,
  };
  
  return { success: true, data };
}

/**
 * Example markdown template for case study import
 */
export const EXAMPLE_TEMPLATE = `---
# CASE STUDY IMPORT FILE
# Instructions:
# 1. Fill in the frontmatter (between --- lines) with metadata
# 2. Write content under each ## section heading
# 3. Images must be added manually after import
# 4. Display order and publish status are set in the CMS

# === REQUIRED FIELDS ===
title: "AI-Powered Invoice Processing for Global Audit Firm"
slug: "ai-invoice-processing-audit-firm"
category: "AI Archives"
short_description: "Reduced invoice processing time from 8 hours to 45 minutes using custom AI document extraction."

# === METADATA ===
industry: "Audit"
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

A leading Big 4 audit firm with operations in 45 countries was struggling with manual invoice processing across their global offices. Their legacy systems couldn't handle the volume and variety of invoice formats they received daily.

## Problem

Manual invoice processing required 8+ hours per batch of 1,000 invoices, leading to delays in client reporting and increased operational costs. The firm was losing competitive advantage due to slow turnaround times.

Key challenges included:
- High error rates in manual data entry (6% average)
- Inconsistent formatting across vendors
- No real-time visibility into processing status
- Difficulty scaling during peak audit seasons

## Goals / Success Criteria

The client defined success as:
- Reduce processing time by at least 80%
- Maintain or improve accuracy (target: 98%+)
- Enable real-time dashboard for processing status
- Support at least 50 different invoice formats

## Solution

We developed a custom AI pipeline combining OCR, NLP, and machine learning to automatically extract, validate, and categorize invoice data. The solution included:

- Multi-format document parser supporting PDF, images, and scanned documents
- Machine learning model trained on 50,000+ invoice samples
- Real-time validation against vendor database
- Dashboard with processing status and exception handling

## Implementation

Phase 1 (Weeks 1-4): Data collection and model training
- Gathered 50,000+ sample invoices across all formats
- Labeled training data with extraction specialists
- Built initial ML model with 92% accuracy

Phase 2 (Weeks 5-8): API development and integration
- Developed RESTful API for integration with existing systems
- Built real-time processing dashboard
- Integrated with client's ERP system

Phase 3 (Weeks 9-12): Testing, optimization, and deployment
- Conducted UAT with finance team
- Optimized model to 99.2% accuracy
- Deployed to production with 24/7 monitoring

## Results Narrative

Within the first month of deployment, the client processed over 50,000 invoices with 99.2% accuracy. The operations team reported significant reduction in overtime hours, and the finance department gained real-time visibility into invoice status for the first time.

The system now handles seasonal peaks without additional staffing, processing up to 10,000 invoices per day during busy periods.

## Next Steps / CTA

The client is now exploring expansion of the AI system to handle expense reports and purchase orders. Contact us to learn how we can transform your document processing workflows.
`;
