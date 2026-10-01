import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const recipes = [
  {
    id: 'html-structure',
    title: 'Build page structure with HTML',
    description: 'Use semantic elements like header, main, section, and article to organize content.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['HTML', 'Semantic elements'],
    lesson: 'HTML gives the page its structure and meaning. Good semantic markup helps browsers, search engines, and assistive technologies understand what each part does.',
    code: `<header>
  <nav>Menu</nav>
</header>
<main>
  <section>
    <h1>Welcome</h1>
    <p>Learn the basics.</p>
  </section>
</main>`,
  },
  {
    id: 'html-document',
    title: 'Create a complete HTML document',
    description: 'Set up the doctype, language, metadata, page title, and body content.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['HTML', 'Document', 'Metadata'],
    lesson: 'A valid document starts with a doctype and an html element with a language. The head contains page metadata; the body contains visible content.',
    code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My page</title>
  </head>
  <body>
    <main><h1>Hello, web</h1></main>
  </body>
</html>`,
  },
  {
    id: 'html-text-content',
    title: 'Structure text with headings and paragraphs',
    description: 'Use a logical heading outline and the right elements for text content.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['HTML', 'Headings', 'Text'],
    lesson: 'Headings describe the structure of a page, not just how text should look. Use one clear page heading, then nest headings by section; use paragraphs for prose.',
    code: `<article>
  <h1>Learning HTML</h1>
  <p>HTML describes the structure of web content.</p>
  <h2>Text elements</h2>
  <p>Use <strong>strong</strong> for importance and <em>em</em> for emphasis.</p>
</article>`,
  },
  {
    id: 'html-links',
    title: 'Connect pages with links',
    description: 'Create links to other pages, sections, email addresses, and external resources.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['HTML', 'Links', 'Navigation'],
    lesson: 'The href attribute tells a link where to go. Use descriptive link text so its destination makes sense out of context, and use fragment IDs for in-page navigation.',
    code: `<nav aria-label="Main navigation">
  <a href="/courses/">Courses</a>
  <a href="#contact">Contact</a>
</nav>

<section id="contact">
  <h2>Contact</h2>
  <a href="mailto:hello@example.com">Email us</a>
</section>`,
  },
  {
    id: 'html-lists',
    title: 'Represent grouped information with lists',
    description: 'Choose ordered, unordered, or description lists to match the content.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['HTML', 'Lists'],
    lesson: 'Use ul when order does not matter, ol for a sequence, and dl for terms with descriptions. Lists communicate relationships to assistive technology.',
    code: `<ol>
  <li>Plan the page</li>
  <li>Write the markup</li>
  <li>Check the result</li>
</ol>`,
  },
  {
    id: 'html-images',
    title: 'Add images with useful alternatives',
    description: 'Use responsive image sizing and write alt text based on an image’s purpose.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['HTML', 'Images', 'Alt text'],
    lesson: 'Give meaningful images concise alternative text. For decorative images, use an empty alt value. Width and height help reserve space while an image loads.',
    code: `<img
  src="/images/workshop.jpg"
  alt="Learners working together at a table"
  width="800"
  height="500"
/>`,
  },
  {
    id: 'html-tables',
    title: 'Present tabular data accessibly',
    description: 'Use table headers, captions, and scopes to explain rows and columns.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['HTML', 'Tables', 'Data'],
    lesson: 'Tables are for data with row and column relationships, not page layout. Captions and scoped header cells help users understand the data.',
    code: `<table>
  <caption>Course schedule</caption>
  <thead>
    <tr><th scope="col">Day</th><th scope="col">Topic</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Monday</th><td>HTML</td></tr>
  </tbody>
</table>`,
  },
  {
    id: 'html-forms',
    title: 'Build forms with labeled controls',
    description: 'Connect labels to inputs and choose appropriate control types.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['HTML', 'Forms', 'Input'],
    lesson: 'A label gives a form control an accessible name and a larger click target. Use an input type that matches the expected data, and give submitted controls a name.',
    code: `<form action="/subscribe" method="post">
  <label for="email">Email address</label>
  <input id="email" name="email" type="email" required />
  <button type="submit">Subscribe</button>
</form>`,
  },
  {
    id: 'html-form-controls',
    title: 'Choose the right form controls',
    description: 'Use select menus, checkboxes, radio groups, and text areas appropriately.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['HTML', 'Forms', 'Controls'],
    lesson: 'Use a fieldset and legend to group related controls. Radio buttons allow one choice from a group; checkboxes allow independent choices.',
    code: `<fieldset>
  <legend>Choose a learning format</legend>
  <label><input type="radio" name="format" value="video" /> Video</label>
  <label><input type="radio" name="format" value="text" /> Text</label>
</fieldset>

<label for="notes">Notes</label>
<textarea id="notes" name="notes" rows="4"></textarea>`,
  },
  {
    id: 'html-media',
    title: 'Embed audio and video',
    description: 'Use native media elements with controls and fallback content.',
    category: 'HTML',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['HTML', 'Audio', 'Video'],
    lesson: 'Native media elements provide built-in playback controls. Include captions for video with speech and provide fallback text or alternate formats when possible.',
    code: `<video controls width="640" poster="/images/preview.jpg">
  <source src="/media/lesson.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="/media/lesson-en.vtt"
    srclang="en"
    label="English"
  />
  Your browser does not support video.
</video>`,
  },
  {
    id: 'html-metadata',
    title: 'Add useful page metadata',
    description: 'Set the document title, description, language, and responsive viewport.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['HTML', 'Metadata', 'SEO'],
    lesson: 'The title appears in browser tabs and search results. A concise description can summarize a page, and the viewport setting lets mobile browsers use the device width.',
    code: `<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="A practical guide to HTML." />
  <title>HTML Guide | Learning Path</title>
</head>`,
  },
  {
    id: 'html-landmarks',
    title: 'Organize pages with semantic landmarks',
    description: 'Use header, nav, main, aside, and footer to express page regions.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['HTML', 'Semantics', 'Landmarks'],
    lesson: 'Landmark elements let browsers and assistive technologies identify important page regions. Use main once for the primary content and label navigation regions when a page has more than one.',
    code: `<header><a href="/">Site name</a></header>
<nav aria-label="Primary"><a href="/courses">Courses</a></nav>
<main>
  <article><h1>Page title</h1><p>Main content.</p></article>
  <aside aria-label="Related links">Related links</aside>
</main>
<footer>Contact and legal information</footer>`,
  },
  {
    id: 'html-attributes',
    title: 'Use HTML attributes and data attributes',
    description: 'Configure elements with global attributes and attach custom data for scripts.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['HTML', 'Attributes', 'data-*'],
    lesson: 'Attributes provide element-specific information. Global attributes such as id, class, lang, and hidden apply broadly. data-* attributes hold application-specific values that scripts can read.',
    code: `<button
  class="save-button"
  id="save-profile"
  data-record-id="42"
  type="button"
>
  Save profile
</button>`,
  },
  {
    id: 'html-buttons-and-links',
    title: 'Choose between links and buttons',
    description: 'Use links to navigate and buttons to perform actions.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['HTML', 'Buttons', 'Links'],
    lesson: 'An anchor with href changes location; a button performs an action on the current page. Choosing the native element gives keyboard and assistive technology behavior for free.',
    code: `<a href="/account/settings">Account settings</a>

<button type="button" id="save-button">
  Save changes
</button>`,
  },
  {
    id: 'html-responsive-images',
    title: 'Serve responsive images',
    description: 'Offer browser-selected image sizes and art direction with srcset, sizes, and picture.',
    category: 'HTML',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['HTML', 'Images', 'Performance'],
    lesson: 'srcset and sizes let the browser select an efficient image for the display size. picture can provide alternate crops or formats; keep one useful img alt description.',
    code: `<picture>
  <source media="(max-width: 600px)" srcset="/images/team-small.jpg" />
  <img
    src="/images/team-large.jpg"
    srcset="/images/team-large.jpg 1200w, /images/team-medium.jpg 800w"
    sizes="(max-width: 800px) 100vw, 800px"
    alt="The team planning a project"
    width="1200"
    height="800"
  />
</picture>`,
  },
  {
    id: 'html-disclosure',
    title: 'Create disclosures with details and summary',
    description: 'Build a native expandable section without JavaScript.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['HTML', 'Interactive', 'details'],
    lesson: 'details and summary provide a built-in disclosure widget that works with a mouse, keyboard, and assistive technology. Use summary as the first child and make its text describe what opens.',
    code: `<details>
  <summary>What will I learn?</summary>
  <p>You will learn document structure, semantics, forms, and more.</p>
</details>`,
  },
  {
    id: 'html-svg',
    title: 'Include scalable vector graphics',
    description: 'Use SVG for sharp icons and illustrations with accessible names where needed.',
    category: 'HTML',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['HTML', 'SVG', 'Graphics'],
    lesson: 'SVG scales cleanly because it describes shapes rather than pixels. If an SVG communicates information, provide an accessible name; mark purely decorative graphics as hidden from assistive technology.',
    code: `<svg viewBox="0 0 24 24" role="img" aria-labelledby="check-title">
  <title id="check-title">Completed</title>
  <path d="M4 12l5 5L20 6" fill="none" stroke="currentColor" stroke-width="2" />
</svg>`,
  },
  {
    id: 'html-iframe',
    title: 'Embed another page responsibly',
    description: 'Give iframes a title and restrict capabilities when embedding external content.',
    category: 'HTML',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['HTML', 'iframe', 'Security'],
    lesson: 'An iframe creates a nested browsing context. Give it a descriptive title, lazy-load below-the-fold embeds, and use sandbox permissions conservatively for untrusted content.',
    code: `<iframe
  src="https://example.com/embed"
  title="Course introduction video"
  loading="lazy"
  sandbox="allow-scripts allow-same-origin"
  width="640"
  height="360"
></iframe>`,
  },
  {
    id: 'html-form-validation',
    title: 'Validate form fields with HTML',
    description: 'Use required, min, max, pattern, and autocomplete for common input rules.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['HTML', 'Forms', 'Validation'],
    lesson: 'Native constraints improve input on many devices and give users immediate feedback. Server-side validation is still required because client-side rules can be bypassed.',
    code: `<label for="username">Username</label>
<input
  id="username"
  name="username"
  autocomplete="username"
  minlength="3"
  maxlength="24"
  required
/>

<label for="age">Age</label>
<input id="age" name="age" type="number" min="13" max="120" />`,
  },
  {
    id: 'html-accessibility',
    title: 'Build accessible HTML by default',
    description: 'Provide names, labels, language, keyboard support, and clear structure.',
    category: 'HTML',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['HTML', 'Accessibility', 'ARIA'],
    lesson: 'Prefer native semantic elements because they include expected roles and keyboard behavior. Associate labels with controls, provide text alternatives, and add ARIA only when native HTML does not express the needed meaning.',
    code: `<html lang="en">
  <body>
    <a href="#main-content">Skip to content</a>
    <main id="main-content">
      <label for="search">Search courses</label>
      <input id="search" type="search" />
    </main>
  </body>
</html>`,
  },
  {
    id: 'html-scripts',
    title: 'Load scripts without blocking the page',
    description: 'Use module scripts or defer classic scripts so HTML can be parsed efficiently.',
    category: 'HTML',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['HTML', 'Scripts', 'Modules'],
    lesson: 'Module scripts are deferred automatically and support import/export. For classic scripts, defer waits until parsing completes. Avoid inline event-handler attributes; keep behavior in JavaScript files.',
    code: `<head>
  <script type="module" src="/src/main.js"></script>
  <script defer src="/scripts/analytics.js"></script>
</head>`,
  },
  {
    id: 'html-popover',
    title: 'Build lightweight popovers with native HTML',
    description: 'Use popover and popovertarget for browser-managed menus and hints.',
    category: 'HTML',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['HTML', 'Popover API', 'Modern platform'],
    lesson: 'The Popover API can show and hide content without custom JavaScript, and the browser handles top-layer display and light dismissal for auto popovers. Check support for the exact popover features you plan to use and provide a fallback when needed.',
    code: `<button popovertarget="course-help">Course details</button>

<div id="course-help" popover="auto">
  <p>Lessons include examples and practice ideas.</p>
</div>`,
  },
  {
    id: 'html-dialog',
    title: 'Use the native dialog element',
    description: 'Create modal dialogs with built-in focus handling and keyboard behavior.',
    category: 'HTML',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['HTML', 'dialog', 'Accessibility'],
    lesson: 'Use showModal() for a modal dialog and include an explicit close control. The browser manages modality and Escape behavior; test focus placement and check support for newer dialog attributes separately.',
    code: `<dialog id="confirm-dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Delete this item?</h2>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm">Delete</button>
  </form>
</dialog>

<button id="open-dialog" type="button">Delete item</button>

<script type="module">
  const dialog = document.querySelector('#confirm-dialog');
  document.querySelector('#open-dialog').addEventListener('click', () => dialog.showModal());
</script>`,
  },
  {
    id: 'css-cascade',
    title: 'Understand the cascade and specificity',
    description: 'Predict which rule applies by considering origin, importance, specificity, and source order.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['CSS', 'Cascade', 'Specificity'],
    lesson: 'When declarations conflict, the cascade resolves them by priority and specificity, then source order. Prefer simple selectors and avoid using !important as a routine override.',
    code: `p {
  color: #343b36;
}

.notice p {
  color: #176b52;
}

/* The more specific rule applies inside .notice. */`,
  },
  {
    id: 'css-units',
    title: 'Choose useful CSS units',
    description: 'Use rem, percentages, viewport units, and pixels for the right sizing behavior.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['CSS', 'Units', 'Sizing'],
    lesson: 'Use rem for scalable text and spacing, percentages for relative sizing, and px for fine details such as borders. Avoid fixed widths that make content overflow small screens.',
    code: `.article {
  width: min(100% - 2rem, 68rem);
  margin-inline: auto;
  padding: 1.5rem;
}

h1 {
  font-size: 2rem;
}`, 
  },
  {
    id: 'css-typography',
    title: 'Style readable typography',
    description: 'Set font families, line height, text width, and hierarchy for comfortable reading.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['CSS', 'Typography', 'Text'],
    lesson: 'Readable typography depends on more than font size. Use a comfortable line height, a sensible measure for paragraphs, and a clear hierarchy between headings and body text.',
    code: `body {
  font-family: Georgia, serif;
  font-size: 1rem;
  line-height: 1.6;
}

p {
  max-width: 68ch;
}`, 
  },
  {
    id: 'css-colors-backgrounds',
    title: 'Use color and backgrounds',
    description: 'Apply color, gradients, borders, and background images without harming readability.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['CSS', 'Colors', 'Backgrounds'],
    lesson: 'Use CSS color values intentionally and check text contrast against its background. Background images should not carry information that users need to understand the page.',
    code: `.notice {
  color: #183b2f;
  background-color: #e7f3eb;
  border: 1px solid #8db39b;
  border-radius: 4px;
}`, 
  },
  {
    id: 'css-display-position',
    title: 'Control display and positioning',
    description: 'Understand normal flow, block and inline layout, and positioned elements.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['CSS', 'Display', 'Position'],
    lesson: 'Elements participate in normal flow by default. Use display to choose layout behavior, and use positioning for overlays or anchored UI rather than as a replacement for page layout.',
    code: `.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
}

.dialog-backdrop {
  position: fixed;
  inset: 0;
}`, 
  },
  {
    id: 'css-pseudo-classes',
    title: 'Style interaction states',
    description: 'Use pseudo-classes for hover, focus, disabled, and selected states.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['CSS', 'Pseudo-classes', 'Focus'],
    lesson: 'Interactive controls need visible focus as well as hover feedback. Do not remove the browser focus outline unless you replace it with an equally clear indicator.',
    code: `button:hover {
  background-color: #d8eadf;
}

button:focus-visible {
  outline: 3px solid #176b52;
  outline-offset: 3px;
}

button:disabled {
  cursor: not-allowed;
}`, 
  },
  {
    id: 'css-custom-properties',
    title: 'Reuse design values with custom properties',
    description: 'Define CSS variables for colors, spacing, and other values that should stay consistent.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['CSS', 'Custom properties', 'Variables'],
    lesson: 'Custom properties help keep a design consistent and make theme changes easier. Define shared values on a common ancestor and reference them with var().',
    code: `:root {
  --color-accent: #176b52;
  --space-3: 1rem;
}

.button {
  color: white;
  background: var(--color-accent);
  padding: var(--space-3);
}`, 
  },
  {
    id: 'css-transitions',
    title: 'Add restrained transitions',
    description: 'Animate small state changes while respecting reduced-motion preferences.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['CSS', 'Transitions', 'Motion'],
    lesson: 'Transitions can make state changes easier to follow. Keep motion brief and optional for users who request reduced motion.',
    code: `.button {
  transition: background-color 160ms ease;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}`, 
  },
  {
    id: 'css-selectors-and-box-model',
    title: 'Use CSS selectors and the box model',
    description: 'Target elements precisely and control spacing, borders, and sizing with the CSS box model.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['CSS', 'Selectors', 'Box model'],
    lesson: 'CSS selectors target specific elements and the box model decides how each element occupies space. Together they control layout, spacing, and appearance.',
    code: `.card {
  width: 240px;
  padding: 16px;
  margin: 12px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

.card h2 {
  color: #1e2825;
}`,
  },
  {
    id: 'css-layout',
    title: 'Lay out pages with Flexbox and Grid',
    description: 'Arrange content in rows and columns with modern CSS layout systems.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Flexbox', 'Grid', 'Responsive'],
    lesson: 'Flexbox is great for one-dimensional alignment, while CSS Grid is ideal for two-dimensional layouts. Together they make responsive interfaces manageable.',
    code: `.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}`,
  },
  {
    id: 'responsive-design',
    title: 'Build responsive pages',
    description: 'Adapt the layout across mobile, tablet, and desktop sizes with media queries and flexible sizing.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Responsive', 'Media queries'],
    lesson: 'Responsive design keeps content readable and useful on every screen size. Flexible widths, media queries, and breakpoint-based adjustments help create a better user experience.',
    code: `.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 700px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}`,
  },
  {
    id: 'accessibility-basics',
    title: 'Make pages accessible',
    description: 'Use labels, semantics, contrast, and keyboard-friendly patterns to help everyone use your site.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Accessibility', 'ARIA', 'Labels'],
    lesson: 'Accessibility is a core part of frontend quality. Clear labels, semantic structure, and readable contrast improve usability for users with different needs.',
    code: `<label for="email">Email</label>
<input id="email" name="email" type="email" />

<button aria-label="Save changes">Save</button>`,
  },
  {
    id: 'css-styling',
    title: 'Style a page with CSS',
    description: 'Use selectors, colors, spacing, and layout rules to design the page.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['CSS', 'Selectors', 'Layout'],
    lesson: 'CSS controls the appearance of HTML. It separates structure from design so pages are easier to maintain and adapt across screen sizes.',
    code: `body {
  font-family: sans-serif;
  background: #f5f5f5;
}

h1 {
  color: #1e2825;
}

.card {
  padding: 16px;
  border: 1px solid #ddd;
}`,
  },
  {
    id: 'css-inheritance',
    title: 'Work with inheritance and initial values',
    description: 'Understand which properties inherit and how to reset or reuse values explicitly.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['CSS', 'Inheritance', 'Values'],
    lesson: 'Text-related properties commonly inherit from parent elements, while layout properties usually do not. inherit, initial, unset, and revert let you control how a declaration gets its value.',
    code: `body {
  color: #24332a;
  font-family: system-ui, sans-serif;
}

button {
  font: inherit;
  color: inherit;
}`, 
  },
  {
    id: 'css-box-sizing-overflow',
    title: 'Size elements and manage overflow',
    description: 'Apply predictable box sizing and decide how content behaves when it exceeds a box.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['CSS', 'Box model', 'Overflow'],
    lesson: 'With border-box, declared width includes padding and border, which makes sizing easier to reason about. Choose overflow behavior intentionally so content remains reachable and layouts do not clip unexpectedly.',
    code: `*,
*::before,
*::after {
  box-sizing: border-box;
}

.code-example {
  max-width: 100%;
  overflow: auto;
}`, 
  },
  {
    id: 'css-logical-properties',
    title: 'Use writing-mode-aware logical properties',
    description: 'Set spacing and borders relative to the text flow instead of physical directions.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['CSS', 'Logical properties', 'Internationalization'],
    lesson: 'Logical properties such as margin-inline and padding-block adapt to right-to-left and vertical writing modes. They make components more reusable across languages.',
    code: `.card {
  padding-block: 1rem;
  padding-inline: 1.5rem;
  border-inline-start: 4px solid #176b52;
  margin-block-end: 1rem;
}`, 
  },
  {
    id: 'css-pseudo-elements',
    title: 'Decorate content with pseudo-elements',
    description: 'Use before and after for non-essential decorative details.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['CSS', 'Pseudo-elements', 'Decoration'],
    lesson: 'Pseudo-elements create a styled part of an element without extra markup. Use them for decoration, not meaningful text or controls, because generated content may not be available consistently to assistive technology.',
    code: `.external-link::after {
  content: " ↗";
  color: currentColor;
}

.quote {
  border-inline-start: 3px solid #176b52;
  padding-inline-start: 1rem;
}`, 
  },
  {
    id: 'css-flexbox-details',
    title: 'Control wrapping and alignment with Flexbox',
    description: 'Use flex direction, wrapping, gaps, and item sizing for flexible one-dimensional layouts.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['CSS', 'Flexbox', 'Layout'],
    lesson: 'Flexbox distributes space along a main axis and aligns items along a cross axis. flex-wrap and gap support responsive rows; avoid visual order that differs from keyboard and reading order.',
    code: `.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.toolbar-search {
  flex: 1 1 16rem;
}`, 
  },
  {
    id: 'css-grid-areas',
    title: 'Build page layouts with named Grid areas',
    description: 'Create readable two-dimensional layouts with named regions and responsive tracks.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['CSS', 'Grid', 'Layout'],
    lesson: 'Grid is designed for rows and columns together. Named areas make a page layout easy to understand, and minmax lets tracks shrink without overflowing.',
    code: `.page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 16rem;
  grid-template-areas: "content sidebar";
  gap: 2rem;
}

@media (max-width: 700px) {
  .page {
    grid-template-columns: 1fr;
    grid-template-areas: "content" "sidebar";
  }
}`, 
  },
  {
    id: 'css-stacking-context',
    title: 'Understand stacking and z-index',
    description: 'Control overlapping elements and diagnose why z-index sometimes has no effect.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['CSS', 'Stacking context', 'z-index'],
    lesson: 'z-index is compared within a stacking context, not across the entire page. Properties such as transform and positioned elements with z-index can create new contexts that contain their descendants.',
    code: `.menu-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10;
}

.menu {
  position: fixed;
  z-index: 11;
}`, 
  },
  {
    id: 'css-container-queries',
    title: 'Adapt components with container queries',
    description: 'Style a component based on its available container width rather than the viewport.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['CSS', 'Container queries', 'Responsive'],
    lesson: 'Container queries let reusable components respond to the space they receive wherever they are placed. Establish an inline-size container, then query that container from its descendants.',
    code: `.card-list {
  container-type: inline-size;
}

@container (min-width: 36rem) {
  .card {
    display: grid;
    grid-template-columns: 10rem 1fr;
    gap: 1rem;
  }
}`, 
  },
  {
    id: 'css-media-preferences',
    title: 'Adapt to user and device preferences',
    description: 'Respond to reduced motion, dark color schemes, and other media features.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['CSS', 'Media queries', 'Accessibility'],
    lesson: 'Media features describe user preferences and device capabilities. Respect reduced motion and ensure color-scheme changes preserve contrast and meaning.',
    code: `@media (prefers-reduced-motion: reduce) {
  .animated-panel {
    animation: none;
    scroll-behavior: auto;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}`, 
  },
  {
    id: 'css-keyframe-animations',
    title: 'Create keyframe animations carefully',
    description: 'Animate a small set of properties and provide a reduced-motion alternative.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['CSS', 'Animation', 'Motion'],
    lesson: 'Use keyframes for multi-step motion and favor transform and opacity for smoother animation. Keep motion purposeful and switch it off when the user requests reduced motion.',
    code: `@keyframes appear {
  from { opacity: 0; transform: translateY(0.5rem); }
  to { opacity: 1; transform: translateY(0); }
}

.panel {
  animation: appear 180ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .panel { animation: none; }
}`, 
  },
  {
    id: 'css-layers',
    title: 'Organize cascade layers',
    description: 'Set predictable precedence for reset, vendor, component, and utility styles.',
    category: 'CSS',
    difficulty: 'Advanced',
    time: '2 min',
    tags: ['CSS', 'Cascade layers', 'Architecture'],
    lesson: 'Cascade layers let a stylesheet define precedence groups explicitly. For normal declarations, later layers outrank earlier layers, making intentional override boundaries easier to maintain.',
    code: `@layer reset, base, components, utilities;

@layer base {
  h1 { line-height: 1.1; }
}

@layer components {
  .card h1 { margin: 0; }
}`, 
  },
  {
    id: 'css-feature-queries',
    title: 'Progressively enhance with feature queries',
    description: 'Provide a baseline style and apply optional enhancements when supported.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['CSS', '@supports', 'Compatibility'],
    lesson: 'Feature queries let CSS test whether a browser supports a property-value pair. Start with a usable baseline, then layer on the enhancement for supporting browsers.',
    code: `.card-grid {
  display: block;
}

@supports (display: grid) {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 1rem;
  }
}`, 
  },
  {
    id: 'css-print-styles',
    title: 'Prepare pages for printing',
    description: 'Hide controls and preserve legibility when a page is printed.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '1 min',
    tags: ['CSS', 'Print', 'Media queries'],
    lesson: 'Print styles can remove navigation and interactive controls, adjust colors, and avoid splitting important content across pages. Check the print preview for the actual result.',
    code: `@media print {
  nav,
  button,
  .no-print {
    display: none !important;
  }

  body {
    color: black;
    background: white;
  }
}`, 
  },
  {
    id: 'css-debugging',
    title: 'Debug styles in browser developer tools',
    description: 'Inspect computed styles, box dimensions, layout overlays, and media queries.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['CSS', 'Debugging', 'DevTools'],
    lesson: 'Inspect the element and check the computed panel to see which declarations win. Use layout overlays for Grid and Flexbox, and temporarily toggle declarations to isolate the cause.',
    code: `/* A temporary outline makes element boundaries visible. */
* {
  outline: 1px solid rgb(220 40 40 / 20%);
}

/* Remove this debugging rule when finished. */`, 
  },
  {
    id: 'css-nesting',
    title: 'Nest related CSS rules',
    description: 'Group component styles with native CSS nesting instead of a preprocessor.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['CSS', 'Nesting', 'Modern CSS'],
    lesson: 'Native CSS nesting is parsed directly by browsers. Use the & nesting selector for clear parent relationships, keep nesting shallow, and check target-browser support when serving older environments.',
    code: `.card {
  padding: 1rem;
  border: 1px solid #cbd3c8;

  & > h2 {
    margin-block-start: 0;
  }

  &:hover {
    border-color: #176b52;
  }
}`, 
  },
  {
    id: 'css-scope',
    title: 'Scope styles to a component subtree',
    description: 'Use @scope to target descendants without overly specific selectors.',
    category: 'CSS',
    difficulty: 'Advanced',
    time: '2 min',
    tags: ['CSS', '@scope', 'Modern CSS'],
    lesson: '@scope limits which subtree can match a set of rules and can reduce selector coupling. Support is newer and may differ across browser versions, so check current compatibility data and keep a fallback for required browsers.',
    code: `@scope (.course-card) {
  h2 {
    color: #176b52;
  }

  a {
    text-underline-offset: 0.2em;
  }
}`, 
  },
  {
    id: 'variables',
    title: 'Store values with const and let',
    description: 'Use const by default and let when a value needs to change.',
    category: 'JavaScript Basics',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['const', 'let', 'Variables'],
    lesson: 'Variables hold the data your app works with. Prefer const so values do not get reassigned accidentally.',
    code: `const productName = 'Notebook';
let quantity = 1;

quantity += 1;
console.log(productName, quantity);
// Notebook 2`,
  },
  {
    id: 'functions',
    title: 'Reuse logic with a function',
    description: 'Give a task a name, accept inputs, and return a result.',
    category: 'JavaScript Basics',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['Functions', 'Parameters', 'return'],
    lesson: 'Small functions are easier to test, reuse, and understand than repeating the same steps throughout a project.',
    code: `function calculateTotal(price, quantity) {
  return price * quantity;
}

console.log(calculateTotal(12, 3));
// 36`,
  },
  {
    id: 'loops',
    title: 'Repeat work with loops',
    description: 'Use for and while loops when you need to run the same logic multiple times.',
    category: 'JavaScript Basics',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['Loops', 'for', 'while'],
    lesson: 'Loops help automate repeated work, such as visiting every item in a list or checking values until a condition changes.',
    code: `for (let index = 0; index < 3; index += 1) {
  console.log('Step:', index);
}

// Step: 0
// Step: 1
// Step: 2`,
  },
  {
    id: 'string-methods',
    title: 'Use string methods',
    description: 'Manipulate text with built-in helpers for trimming, replacing, splitting, and searching.',
    category: 'JavaScript Basics',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['Strings', 'trim', 'slice'],
    lesson: 'String methods let you clean and transform text without writing custom parsing logic for common tasks.',
    code: `const text = '  JavaScript  ';
const cleanText = text.trim();
const firstWord = cleanText.split(' ')[0];

console.log(cleanText);
console.log(firstWord);
// JavaScript
// JavaScript`,
  },
  {
    id: 'array-built-ins',
    title: 'Use array built-ins',
    description: 'Work with arrays using methods like map, filter, and reduce instead of manual loops.',
    category: 'JavaScript Basics',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['Array methods', 'map', 'filter'],
    lesson: 'Array built-ins make data transformation clearer and shorter. They are the standard way to work with collections in JavaScript.',
    code: `const numbers = [1, 2, 3, 4];
const doubled = numbers.map((value) => value * 2);
const even = numbers.filter((value) => value % 2 === 0);

console.log(doubled);
console.log(even);
// [2, 4, 6, 8]
// [2, 4]`,
  },
  {
    id: 'object-methods',
    title: 'Work with object methods',
    description: 'Read, copy, and inspect object values with standard methods and property access.',
    category: 'JavaScript Basics',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['Objects', 'Object.keys', 'Object.values'],
    lesson: 'Objects are central to JavaScript data modeling. Built-in object methods help you inspect, transform, and organize data in a predictable way.',
    code: `const user = { name: 'Ari', role: 'editor' };
const keys = Object.keys(user);
const values = Object.values(user);

console.log(keys);
console.log(values);
// ['name', 'role']
// ['Ari', 'editor']`,
  },
  {
    id: 'built-in-functions',
    title: 'Use built-in JavaScript functions',
    description: 'Use ready-made functions and methods the language already provides.',
    category: 'JavaScript Basics',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['Built-in', 'Math', 'String methods'],
    lesson: 'JavaScript provides many built-in functions for common tasks like string cleaning, number conversion, random values, and math. They save time and help you solve routine problems without writing everything from scratch.',
    code: `const text = '  JavaScript  ';
  console.log(text.trim().toLowerCase());
  console.log(Number('42'));
  console.log(Math.random());`,
  },
  {
    id: 'set-methods',
    title: 'Compare sets with built-in set operations',
    description: 'Use union, intersection, and difference to compare collections of unique values.',
    category: 'JavaScript Basics',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Set', 'Collections', 'Modern JavaScript'],
    lesson: 'Recent ECMAScript versions add standard set-composition methods. They return new sets and accept set-like inputs; check the target runtime when supporting older browsers or Node.js versions.',
    code: `const required = new Set(['html', 'css', 'javascript']);
const completed = new Set(['html', 'css']);

const remaining = required.difference(completed);
const overlap = required.intersection(completed);

console.log([...remaining]);
console.log([...overlap]);
// ['javascript']
// ['html', 'css']`,
  },
  {
    id: 'regexp-escape',
    title: 'Escape dynamic text for regular expressions',
    description: 'Use RegExp.escape() instead of writing a custom escaping function.',
    category: 'JavaScript Basics',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['RegExp', 'Security', 'Modern JavaScript'],
    lesson: 'RegExp.escape() safely quotes literal text before it is inserted into a regular expression. It is a recent built-in, so check runtime compatibility or use a maintained polyfill when targeting older environments.',
    code: `const searchText = 'price: $5.00 (sale)';
const literalPattern = new RegExp(RegExp.escape(searchText), 'i');

console.log(literalPattern.test('PRICE: $5.00 (SALE)'));
// true`,
  },
  {
    id: 'javascript-resource-management',
    title: 'Release resources with using declarations',
    description: 'Automatically dispose supported resources when a block exits.',
    category: 'JavaScript Basics',
    difficulty: 'Advanced',
    time: '2 min',
    tags: ['using', 'Resource management', 'Modern JavaScript'],
    lesson: 'The using declaration calls a resource’s Symbol.dispose method when its scope ends, including when control exits because of an error. This is newer syntax: confirm parser and runtime support before using it in production.',
    code: `class TemporaryResource {
  [Symbol.dispose]() {
    console.log('Resource released');
  }
}

{
  using resource = new TemporaryResource();
  console.log('Use the resource');
}
// Resource released`,
  },
  {
    id: 'array-filter',
    title: 'Filter a list by a condition',
    description: 'Keep only the items that match what a user is looking for.',
    category: 'Arrays & Data',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['filter', 'Arrays'],
    lesson: 'Filtering is a common part of search, category selection, and showing only the records relevant to a screen.',
    code: `const products = [
  { name: 'Notebook', inStock: true },
  { name: 'Pen', inStock: false },
];

const available = products.filter(product => product.inStock);
console.log(available.map(product => product.name));
// ['Notebook']`,
  },
  {
    id: 'array-map',
    title: 'Transform data with map',
    description: 'Turn each item into display-ready data without changing the original list.',
    category: 'Arrays & Data',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['map', 'Arrays'],
    lesson: 'Use map when each input item should produce one output item, such as turning API records into labels for a page.',
    code: `const names = ['Ada', 'Lin'];
const greetingLabels = names.map(name => 'Hello, ' + name);

console.log(greetingLabels);
// ['Hello, Ada', 'Hello, Lin']`,
  },
  {
    id: 'get-element-by-id',
    title: 'Find a page element by its id',
    description: 'Use getElementById() to find an HTML element before working with it.',
    category: 'Browser & DOM',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['DOM', 'getElementById'],
    lesson: 'Add the matching element to your HTML first. The lookup returns null if the id is missing, so check before using it.',
    code: `// HTML: <p id="greeting">Hello!</p>
const greeting = document.getElementById('greeting');

if (greeting !== null) {
  greeting.textContent = 'Welcome to my site!';
}

console.log(greeting?.textContent);
// Welcome to my site!`,
  },
  {
    id: 'click-event',
    title: 'Respond to a button click',
    description: 'Listen for a user action and run code in response.',
    category: 'Browser & DOM',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['Events', 'addEventListener'],
    lesson: 'Events connect the page to user actions. Put a button with this id in the HTML before running the script.',
    code: `const saveButton = document.getElementById('save-button');

if (saveButton !== null) {
  saveButton.addEventListener('click', () => {
    console.log('Changes saved');
  });
}`, 
  },
  {
    id: 'form-data',
    title: 'Read values from a form',
    description: 'Handle submit events and collect named form fields with FormData.',
    category: 'Forms & Input',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['FormData', 'submit', 'Events'],
    lesson: 'Give the form an id and each input a name. Prevent the default page reload so your JavaScript can handle the submitted values.',
    code: `const form = document.getElementById('signup-form');

if (form !== null) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    console.log(formData.get('email'));
  });
}

// HTML fields need name="email" and form id="signup-form".`,
  },
  {
    id: 'validate-input',
    title: 'Validate input before using it',
    description: 'Trim user input and check required values before continuing.',
    category: 'Forms & Input',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['Validation', 'Strings'],
    lesson: 'Browser input is untrusted. Validate it before sending it to a server or using it to update important data.',
    code: `function validateName(value) {
  const name = value.trim();
  if (name.length === 0) return 'Name is required.';
  return null;
}

console.log(validateName('  '));
// Name is required.`,
  },
  {
    id: 'text-content',
    title: 'Update page text safely',
    description: 'Use textContent to display text without interpreting it as HTML.',
    category: 'Browser & DOM',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['textContent', 'DOM', 'Security'],
    lesson: 'For text from a user or server, textContent avoids treating that text as markup. This helps prevent HTML injection bugs.',
    code: `const message = document.getElementById('message');
const userName = '<img src=x onerror=alert(1)>';

if (message !== null) {
  message.textContent = 'Hello, ' + userName;
}`, 
  },
  {
    id: 'render-list',
    title: 'Render a list without unsafe HTML',
    description: 'Create elements and set textContent instead of building HTML strings.',
    category: 'Browser & DOM',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['createElement', 'textContent', 'DOM'],
    lesson: 'Creating elements and assigning text keeps user-provided values as text, not executable markup.',
    code: `const tasks = ['Plan the page', 'Write the code'];
const list = document.getElementById('task-list');

if (list !== null) {
  const items = tasks.map((task) => {
    const item = document.createElement('li');
    item.textContent = task;
    return item;
  });
  list.replaceChildren(...items);
}`, 
  },
  {
    id: 'debug-console',
    title: 'Inspect data while debugging',
    description: 'Use the browser console to check values and spot mistakes.',
    category: 'Debugging',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['console', 'Debugging'],
    lesson: 'Logging a small, relevant value helps reveal what your code is doing. Remove temporary logs before shipping.',
    code: `const cart = [
  { item: 'Notebook', quantity: 2 },
  { item: 'Pen', quantity: 1 },
];

console.table(cart);
console.log('Items in cart:', cart.length);`,
  },
  {
    id: 'fetch-data',
    title: 'Load data from an API',
    description: 'Use fetch and async/await to request JSON from a server.',
    category: 'Network & Async',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['fetch', 'async', 'await'],
    lesson: 'Replace the example URL with your API endpoint. Check response.ok because fetch does not reject just because the server returns an HTTP error status.',
    code: `async function loadProducts() {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }
  return response.json();
}

loadProducts()
  .then(products => console.log(products))
  .catch(error => console.error(error.message));`,
  },
  {
    id: 'try-catch',
    title: 'Handle errors gracefully',
    description: 'Catch expected failures and show a useful fallback.',
    category: 'Errors & Reliability',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['try', 'catch', 'Errors'],
    lesson: 'Handle errors at a boundary where you can recover or explain what happened. Avoid silently swallowing failures.',
    code: `try {
  const settings = JSON.parse('{invalid json}');
  console.log(settings);
} catch (error) {
  console.error('Could not read settings:', error.message);
}`, 
  },
  {
    id: 'local-storage',
    title: 'Remember a small preference',
    description: 'Save and restore a simple setting with localStorage.',
    category: 'Browser & DOM',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['localStorage', 'Persistence'],
    lesson: 'localStorage survives page reloads, but stores strings only. Do not put passwords, tokens, or other secrets in it.',
    code: `localStorage.setItem('theme', 'dark');

const savedTheme = localStorage.getItem('theme') ?? 'light';
console.log(savedTheme);
// dark`,
  },
  {
    id: 'json',
    title: 'Convert data to and from JSON',
    description: 'Serialize objects for storage or APIs, then parse them back.',
    category: 'Arrays & Data',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['JSON.stringify', 'JSON.parse'],
    lesson: 'JSON is a text format for exchanging data. Parsing can fail if the text is not valid JSON, so handle untrusted input with care.',
    code: `const settings = { theme: 'dark', fontSize: 16 };
const json = JSON.stringify(settings);
const restored = JSON.parse(json);

console.log(restored.theme);
// dark`,
  },
  {
    id: 'modules',
    title: 'Share code with modules',
    description: 'Export a reusable function and import it from another file.',
    category: 'Project Structure',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['export', 'import', 'Modules'],
    lesson: 'Modules help split a project into files with clear responsibilities. These examples belong in separate JavaScript files.',
    code: `// format.js
export function formatPrice(amount) {
  return '$' + amount.toFixed(2);
}

// In another JavaScript module:
import { formatPrice } from './format.js';
console.log(formatPrice(12));
// $12.00`,
  },
  {
    id: 'semantic-html',
    title: 'Use semantic HTML for meaning',
    description: 'Choose tags that describe the content instead of relying on generic divs.',
    category: 'HTML',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['HTML', 'Accessibility'],
    lesson: 'Semantic elements help assistive technologies, search engines, and developers understand the structure of the page. They also make markup easier to maintain.',
    code: `const article = document.querySelector('article');
console.log(article?.tagName);

// Better structure:
// <header></header>
// <main>
//   <article>
//     <h1>Post title</h1>
//   </article>
// </main>`,
  },
  {
    id: 'css-selectors',
    title: 'Target the right element with CSS selectors',
    description: 'Use selectors to style the exact parts of the page you want to update.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['CSS', 'Selectors'],
    lesson: 'Specific selectors keep styling predictable and reduce the chance that unrelated elements change when you add a new style.',
    code: `.card .title {
  color: #1e2825;
}

button.primary {
  background: #b9d84a;
}`,
  },
  {
    id: 'flexbox-layout',
    title: 'Lay out content with Flexbox',
    description: 'Align and distribute items in a row or column with a small set of layout rules.',
    category: 'CSS',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['Flexbox', 'Layout'],
    lesson: 'Flexbox is perfect for navigation bars, cards, and forms where content needs to align and wrap cleanly across screen sizes.',
    code: `.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}`,
  },
  {
    id: 'responsive-layout',
    title: 'Build responsive layouts',
    description: 'Use media queries and flexible dimensions to adapt a page for different screens.',
    category: 'CSS',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Responsive design', 'Media queries'],
    lesson: 'Responsive design keeps an interface usable on phones, tablets, and desktops by changing layout and spacing based on viewport size.',
    code: `.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 700px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}`,
  },
  {
    id: 'git-github',
    title: 'Track changes with Git and GitHub',
    description: 'Save checkpoints, review history, and share work with teammates or collaborators.',
    category: 'Workflow & Collaboration',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['Git', 'GitHub'],
    lesson: 'Version control makes experiments safe, helps you undo mistakes, and allows an entire team to contribute without overwriting each other’s work.',
    code: `git init
git add .
git commit -m "Add feature"
git push origin main`,
  },
  {
    id: 'npm-scripts',
    title: 'Run project tasks with npm scripts',
    description: 'Define common commands for install, build, test, and dev workflows in one place.',
    category: 'Project Setup',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['npm', 'Scripts'],
    lesson: 'A single script saves time and keeps teammates on the same commands for local development and production builds.',
    code: `{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run"
  }
}`,
  },
  {
    id: 'url-params',
    title: 'Read values from a URL',
    description: 'Use URLSearchParams for search terms, filters, and page numbers.',
    category: 'Browser & DOM',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['URLSearchParams', 'Navigation'],
    lesson: 'Query parameters make a view shareable and let browser navigation preserve filters or search state.',
    code: `const params = new URLSearchParams(window.location.search);
const searchTerm = params.get('q') ?? '';

console.log(searchTerm);
// Reads q from a URL such as ?q=javascript`,
  },
  {
    id: 'event-delegation',
    title: 'Handle clicks with event delegation',
    description: 'Use one parent listener to respond to clicks on many child buttons.',
    category: 'Browser & DOM',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Events', 'DOM'],
    lesson: 'Event delegation is useful for lists that change after they are rendered. Add the data-action buttons inside the parent element.',
    code: `const list = document.getElementById('task-list');

list?.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  console.log('Action:', button.dataset.action);
});`,
  },
  {
    id: 'object-spread',
    title: 'Update an object without mutating it',
    description: 'Copy existing properties and override only the value you need.',
    category: 'Arrays & Data',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['Spread', 'Objects', 'Immutability'],
    lesson: 'Making a new object keeps the old value intact, which makes changes easier to reason about in UI state and data flows.',
    code: `const user = { name: 'Ari', role: 'reader' };
const updatedUser = { ...user, role: 'editor' };

console.log(updatedUser);
// { name: 'Ari', role: 'editor' }
console.log(user.role);
// reader`,
  },
  {
    id: 'sort-data',
    title: 'Sort a copy of a list',
    description: 'Use a comparator to sort numbers without changing the original array.',
    category: 'Arrays & Data',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['toSorted', 'Comparator'],
    lesson: 'The default sort compares values as strings. A numeric comparator gives the order you intend; toSorted keeps the original list unchanged.',
    code: `const scores = [12, 3, 25, 8];
const ascending = scores.toSorted((left, right) => left - right);

console.log(ascending);
// [3, 8, 12, 25]
console.log(scores);
// [12, 3, 25, 8]`,
  },
  {
    id: 'debounce',
    title: 'Wait for typing to pause',
    description: 'Debounce search work so it does not run after every keystroke.',
    category: 'Performance',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Debounce', 'setTimeout'],
    lesson: 'Debouncing reduces repeated work for quick events such as typing. Use it when only the latest input matters.',
    code: `function debounce(callback, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

const searchLater = debounce((query) => console.log(query));`,
  },
  {
    id: 'promise-all',
    title: 'Run independent requests together',
    description: 'Use Promise.all() when several results are all needed.',
    category: 'Network & Async',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Promise.all', 'Promises'],
    lesson: 'Parallel requests can reduce total wait time when they do not depend on each other. Promise.all rejects if any request fails.',
    code: `const [profileResponse, tasksResponse] = await Promise.all([
  fetch('/api/profile'),
  fetch('/api/tasks'),
]);

const profile = await profileResponse.json();
const tasks = await tasksResponse.json();
console.log(profile, tasks);
// Use inside an async function or an ES module.`,
  },
  {
    id: 'format-currency',
    title: 'Format currency for people',
    description: 'Use Intl.NumberFormat instead of building currency strings by hand.',
    category: 'Internationalization',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['Intl', 'Currency'],
    lesson: 'Locale-aware formatting handles currency symbols, separators, and ordering for different regions.',
    code: `const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

console.log(formatter.format(1234.5));
// $1,234.50`,
  },
  {
    id: 'abort-fetch',
    title: 'Cancel a request that is no longer needed',
    description: 'Use AbortController to stop a fetch when a view changes.',
    category: 'Network & Async',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['AbortController', 'fetch'],
    lesson: 'Cancellation is useful when a user navigates away or starts a newer search. Handle the abort error separately from other failures.',
    code: `const controller = new AbortController();

fetch('/api/search?q=javascript', { signal: controller.signal })
  .then(response => response.json())
  .catch(error => {
    if (error.name === 'AbortError') return;
    console.error(error);
  });

controller.abort();`,
  },
  {
    id: 'regex-search',
    title: 'Find a pattern in text',
    description: 'Use a regular expression to extract a simple value from a string.',
    category: 'Strings & Text',
    difficulty: 'Medium',
    time: '1 min',
    tags: ['RegExp', 'Strings'],
    lesson: 'Regular expressions are powerful for pattern matching, but for complex input validation prefer well-defined parsers or platform validation.',
    code: `const text = 'Order #4821 is ready';
const orderNumber = text.match(/#(\\d+)/)?.[1];

console.log(orderNumber);
// 4821`,
  },
  {
    id: 'library-lodash',
    title: 'Group data with Lodash',
    description: 'Use a focused utility to group objects by a shared property.',
    category: 'JavaScript Libraries',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['Lodash', 'Utilities', 'Collections'],
    lesson: 'Install lodash-es and import only the helper you need. groupBy turns a list of objects into groups keyed by one property.',
    code: `import { groupBy } from 'lodash-es';

const tasks = [
  { title: 'Draft', status: 'open' },
  { title: 'Review', status: 'done' },
  { title: 'Ship', status: 'open' },
];

console.log(groupBy(tasks, 'status'));`,
  },
  {
    id: 'library-date-fns',
    title: 'Format dates with date-fns',
    description: 'Format dates with small, composable helpers instead of custom parsing code.',
    category: 'JavaScript Libraries',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['date-fns', 'Dates', 'Formatting'],
    lesson: 'Install date-fns and import the date helper you need. It provides focused functions for formatting, comparing, and calculating dates without adding methods to built-in objects.',
    code: `import { format } from 'date-fns';

console.log(format(new Date(2026, 0, 5), 'MMM d, yyyy'));
// Jan 5, 2026`,
  },
  {
    id: 'library-zod',
    title: 'Validate data with Zod',
    description: 'Parse untrusted values against a reusable schema.',
    category: 'JavaScript Libraries',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['Zod', 'Validation', 'Schemas'],
    lesson: 'Install zod and define a schema once. safeParse validates unknown input and returns either typed data or a structured error without throwing.',
    code: `import { z } from 'zod';

const User = z.object({ email: z.string().email() });
const result = User.safeParse({ email: 'ada@example.com' });

console.log(result.success);
// true`,
  },
  {
    id: 'library-axios',
    title: 'Request data with Axios',
    description: 'Fetch JSON with a promise-based HTTP client.',
    category: 'JavaScript Libraries',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['Axios', 'HTTP', 'Promises'],
    lesson: 'Install axios to use its promise-based request API. Axios parses JSON responses and exposes the response body as data; still handle network and server errors.',
    code: `import axios from 'axios';

async function loadUser() {
  const { data } = await axios.get('/api/users/1');
  console.log(data);
}

loadUser();`,
  },
  {
    id: 'library-react',
    title: 'Build interactive UI with React',
    description: 'Render a component from state and update it in response to an action.',
    category: 'JavaScript Libraries',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['React', 'Components', 'State'],
    lesson: 'React builds user interfaces from components. useState stores a value for a component and gives you a setter that schedules the UI to render again.',
    code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
  },
  {
    id: 'library-express',
    title: 'Create a web endpoint with Express',
    description: 'Handle an HTTP route with a small Node.js server.',
    category: 'JavaScript Libraries',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Express', 'Node.js', 'HTTP'],
    lesson: 'Install express to create a Node.js web server. A route pairs an HTTP method and path with a handler that sends a response.',
    code: `import express from 'express';

const app = express();
app.get('/api/hello', (_request, response) => {
  response.json({ message: 'Hello' });
});
app.listen(3000);`,
  },
  {
    id: 'library-tanstack-query',
    title: 'Cache server data with TanStack Query',
    description: 'Load and cache asynchronous data with a query key.',
    category: 'JavaScript Libraries',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['TanStack Query', 'React', 'Data fetching'],
    lesson: 'Install @tanstack/react-query and wrap the app in QueryClientProvider. useQuery tracks loading and error state and caches data by queryKey.',
    code: `import { useQuery } from '@tanstack/react-query';

function Users() {
  const { data, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((response) => response.json()),
  });
  return isPending ? 'Loading...' : <pre>{JSON.stringify(data)}</pre>;
}`,
  },
  {
    id: 'library-chartjs',
    title: 'Draw a chart with Chart.js',
    description: 'Turn labeled numeric data into a responsive bar chart.',
    category: 'JavaScript Libraries',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Chart.js', 'Visualization', 'Canvas'],
    lesson: 'Install chart.js and provide a canvas element. Chart.js handles drawing and updates while you supply the chart type, labels, and values.',
    code: `import Chart from 'chart.js/auto';

new Chart(document.querySelector('canvas'), {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb'],
    datasets: [{ label: 'Signups', data: [12, 19] }],
  },
});`,
  },
  {
    id: 'library-vitest',
    title: 'Test functions with Vitest',
    description: 'Write a small automated test that checks expected behavior.',
    category: 'JavaScript Libraries',
    difficulty: 'Medium',
    time: '1 min',
    tags: ['Vitest', 'Testing', 'Assertions'],
    lesson: 'Install vitest and write tests with test and expect. A focused assertion documents the expected result and catches regressions when code changes.',
    code: `import { expect, test } from 'vitest';

function add(first, second) {
  return first + second;
}

test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});`,
  },
  {
    id: 'library-playwright',
    title: 'Test browser behavior with Playwright',
    description: 'Check a page through the same accessible controls a user interacts with.',
    category: 'JavaScript Libraries',
    difficulty: 'Advanced',
    time: '2 min',
    tags: ['Playwright', 'Browser testing', 'Accessibility'],
    lesson: 'Install @playwright/test to automate a real browser. Locate controls by accessible role and assert what the user should see.',
    code: `import { expect, test } from '@playwright/test';

test('home page has a heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
});`,
  },
  {
    id: 'project-vite-setup',
    title: 'Create a React project with Vite',
    description: 'Scaffold a small app and start the local development server.',
    category: 'Project Setup',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['Vite', 'React', 'npm'],
    lesson: 'Vite creates a ready-to-run project and serves it locally while you work. Run these commands in a terminal, then open the local URL it prints.',
    code: `npm create vite@latest taskflow -- --template react
cd taskflow
npm install
npm run dev`,
  },
  {
    id: 'database-schema',
    title: 'Create tables with keys and constraints',
    description: 'Define a relational table that rejects missing or duplicate values.',
    category: 'Databases',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['SQL', 'Schema', 'Constraints'],
    lesson: 'A schema describes how data is stored. A primary key identifies each row, NOT NULL requires a value, and UNIQUE prevents duplicate emails.',
    code: `CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE
);`,
  },
  {
    id: 'database-select-filter',
    title: 'Find rows with SELECT and WHERE',
    description: 'Choose the columns and rows a query should return.',
    category: 'Databases',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['SQL', 'SELECT', 'Filtering'],
    lesson: 'SELECT names the columns to return, WHERE filters rows, and ORDER BY gives a predictable order. LIMIT caps the result size.',
    code: `SELECT title
FROM tasks
WHERE status = 'open'
ORDER BY created_at DESC
LIMIT 5;`,
  },
  {
    id: 'database-joins',
    title: 'Combine related tables with JOIN',
    description: 'Read matching data from two tables using their shared key.',
    category: 'Databases',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['SQL', 'JOIN', 'Relationships'],
    lesson: 'A foreign key stores a relationship between rows. JOIN combines matching rows so a query can return fields from both tables.',
    code: `SELECT orders.id, users.email
FROM orders
JOIN users ON users.id = orders.user_id;`,
  },
  {
    id: 'database-aggregates',
    title: 'Summarize rows with GROUP BY',
    description: 'Count and compare records within each group.',
    category: 'Databases',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['SQL', 'GROUP BY', 'Aggregates'],
    lesson: 'GROUP BY creates one result per distinct value. Aggregate functions such as COUNT summarize each group, while HAVING filters the groups after aggregation.',
    code: `SELECT status, COUNT(*) AS task_count
FROM tasks
GROUP BY status
HAVING COUNT(*) > 1;`,
  },
  {
    id: 'database-parameterized-queries',
    title: 'Pass values safely to a SQL query',
    description: 'Use query parameters instead of building SQL with string concatenation.',
    category: 'Databases',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['PostgreSQL', 'Node.js', 'Security'],
    lesson: 'Install pg and send values separately from SQL text. Parameterized queries keep user input as data instead of executable SQL.',
    code: `import pg from 'pg';

const db = new pg.Pool();
const email = 'ada@example.com';
const { rows } = await db.query(
  'SELECT id FROM users WHERE email = $1',
  [email],
);
console.log(rows);`,
  },
  {
    id: 'database-transactions',
    title: 'Group changes with a transaction',
    description: 'Commit related updates together or roll them all back.',
    category: 'Databases',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['SQL', 'Transactions', 'Consistency'],
    lesson: 'A transaction makes related changes succeed or fail as a unit. COMMIT saves the changes; ROLLBACK cancels them if an error occurs.',
    code: `BEGIN;
UPDATE accounts SET balance = balance - 20 WHERE id = 1;
UPDATE accounts SET balance = balance + 20 WHERE id = 2;
COMMIT;`,
  },
  {
    id: 'database-indexes',
    title: 'Speed up lookups with an index',
    description: 'Index a frequently searched column and understand the write tradeoff.',
    category: 'Databases',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['SQL', 'Indexes', 'Performance'],
    lesson: 'An index can make searches on a column faster, but it takes storage and adds work to inserts and updates. Add indexes for real query patterns, then measure.',
    code: `CREATE INDEX orders_customer_id
ON orders (customer_id);

SELECT id, total
FROM orders
WHERE customer_id = 42;`,
  },
  {
    id: 'database-mongodb',
    title: 'Read documents from MongoDB',
    description: 'Query a document collection with the MongoDB JavaScript driver.',
    category: 'Databases',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['MongoDB', 'NoSQL', 'Node.js'],
    lesson: 'Install mongodb and connect with a configured connection string. MongoDB stores document-shaped records in collections; choose a document model when it fits the data and access patterns.',
    code: `import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const users = await client.db('app').collection('users')
  .find({ active: true }).toArray();
console.log(users);
await client.close();`,
  },
  {
    id: 'database-prisma',
    title: 'Query a database with Prisma',
    description: 'Use a generated client to read typed records from a relational database.',
    category: 'Databases',
    difficulty: 'Advanced',
    time: '2 min',
    tags: ['Prisma', 'ORM', 'Type safety'],
    lesson: 'Install Prisma, define a schema, and generate its client. The client maps database queries to methods and returns objects that match your model.',
    code: `const users = await prisma.user.findMany({
  where: { active: true },
  select: { id: true, email: true },
});

console.log(users);`,
  },
  {
    id: 'big-o',
    track: 'Data Structures & Algorithms',
    title: 'Compare common Big O growth rates',
    description: 'Estimate how the work in an algorithm grows as input gets larger.',
    category: 'Complexity',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['Big O', 'Complexity'],
    lesson: 'Big O describes growth, not exact runtime. A single pass is O(n); a nested pass over the same input is O(n squared).',
    code: `function inspectPairs(values) {
  for (const value of values) {
    console.log(value); // O(n)
  }

  for (const first of values) {
    for (const second of values) {
      console.log(first, second); // O(n^2)
    }
  }
}

inspectPairs([1, 2, 3]);`,
  },
  {
    id: 'hash-map-count',
    track: 'Data Structures & Algorithms',
    title: 'Count values with a hash map',
    description: 'Use Map to count occurrences in one pass through the input.',
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['Map', 'Frequency count'],
    lesson: 'A map gives fast average lookup by key. Frequency maps are useful for duplicate checks, grouping, and comparing collections.',
    code: `const words = ['js', 'css', 'js', 'html'];
const counts = new Map();

for (const word of words) {
  counts.set(word, (counts.get(word) ?? 0) + 1);
}

console.log(counts.get('js'));
// 2`,
  },
  {
    id: 'two-pointers',
    track: 'Data Structures & Algorithms',
    title: 'Search sorted data with two pointers',
    description: 'Move inward from both ends instead of checking every pair.',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Arrays', 'Two pointers'],
    lesson: 'This O(n) approach assumes the array is sorted. Moving one pointer removes many impossible pairs at once.',
    code: `function hasPairWithSum(sortedValues, target) {
  let left = 0;
  let right = sortedValues.length - 1;

  while (left < right) {
    const sum = sortedValues[left] + sortedValues[right];
    if (sum === target) return true;
    if (sum < target) left += 1;
    else right -= 1;
  }
  return false;
}

console.log(hasPairWithSum([1, 3, 4, 7], 8));
// true`,
  },
  {
    id: 'sliding-window',
    track: 'Data Structures & Algorithms',
    title: 'Scan a range with a sliding window',
    description: 'Reuse the previous sum to find the largest fixed-size range.',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Arrays', 'Sliding window'],
    lesson: 'Instead of summing each range from scratch, subtract the value that leaves and add the value that enters. This makes the scan O(n).',
    code: `function maxWindowSum(values, width) {
  if (width <= 0 || width > values.length) return null;

  let sum = values.slice(0, width).reduce((total, value) => total + value, 0);
  let largest = sum;
  for (let index = width; index < values.length; index += 1) {
    sum += values[index] - values[index - width];
    largest = Math.max(largest, sum);
  }
  return largest;
}

console.log(maxWindowSum([2, 1, 5, 1, 3], 3));
// 9`,
  },
  {
    id: 'binary-search',
    track: 'Data Structures & Algorithms',
    title: 'Find a value with binary search',
    description: 'Halve the search range each time you check a sorted array.',
    category: 'Search',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Binary search', 'O(log n)'],
    lesson: 'Binary search is O(log n), but it only works when the values are sorted. Each comparison discards half the remaining range.',
    code: `function binarySearch(sortedValues, target) {
  let low = 0;
  let high = sortedValues.length - 1;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (sortedValues[middle] === target) return middle;
    if (sortedValues[middle] < target) low = middle + 1;
    else high = middle - 1;
  }
  return -1;
}

console.log(binarySearch([2, 4, 7, 9, 12], 9));
// 3`,
  },
  {
    id: 'stack-brackets',
    track: 'Data Structures & Algorithms',
    title: 'Match brackets with a stack',
    description: 'Use last-in, first-out order to check nested brackets.',
    category: 'Stacks & Queues',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Stack', 'Strings'],
    lesson: 'A stack is useful when the most recently opened item must be handled first, such as nested brackets or undo history.',
    code: `function hasBalancedBrackets(text) {
  const openingFor = new Map([[')', '('], [']', '['], ['}', '{']]);
  const stack = [];

  for (const character of text) {
    if ('([{'.includes(character)) stack.push(character);
    else if (openingFor.has(character) && stack.pop() !== openingFor.get(character)) return false;
  }
  return stack.length === 0;
}

console.log(hasBalancedBrackets('{[()]}'));
// true`,
  },
  {
    id: 'queue',
    track: 'Data Structures & Algorithms',
    title: 'Build a queue for first-in, first-out work',
    description: 'Add items at the end and track the next item without shifting an array.',
    category: 'Stacks & Queues',
    difficulty: 'Easy',
    time: '1 min',
    tags: ['Queue', 'Arrays'],
    lesson: 'A queue processes the oldest item first. Advancing a head index avoids the repeated reindexing caused by Array.shift().',
    code: `const jobs = ['email', 'report', 'backup'];
let nextJob = 0;

while (nextJob < jobs.length) {
  const currentJob = jobs[nextJob];
  nextJob += 1;
  console.log('Processing:', currentJob);
}
// email, report, backup`,
  },
  {
    id: 'linked-list-reverse',
    track: 'Data Structures & Algorithms',
    title: 'Reverse a linked list',
    description: 'Reverse next pointers in one pass using three references.',
    category: 'Linked Lists',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Linked list', 'Pointers'],
    lesson: 'Keep the next node before changing a pointer, or the rest of the list becomes unreachable. The runtime is O(n) with O(1) extra space.',
    code: `let head = {
  value: 'A',
  next: { value: 'B', next: { value: 'C', next: null } },
};
let previous = null;
let current = head;

while (current !== null) {
  const next = current.next;
  current.next = previous;
  previous = current;
  current = next;
}
head = previous;
console.log(head.value);
// C`,
  },
  {
    id: 'tree-dfs',
    track: 'Data Structures & Algorithms',
    title: 'Visit every node with tree depth-first search',
    description: 'Use recursion to visit a node and then its child branches.',
    category: 'Trees',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Trees', 'DFS', 'Recursion'],
    lesson: 'Depth-first search explores one branch before returning to another. This preorder traversal visits each node once: O(n) time.',
    code: `function visitPreorder(node) {
  if (node === null) return;
  console.log(node.value);
  visitPreorder(node.left);
  visitPreorder(node.right);
}

const tree = {
  value: 'A',
  left: { value: 'B', left: null, right: null },
  right: { value: 'C', left: null, right: null },
};
visitPreorder(tree);
// A B C`,
  },
  {
    id: 'tree-bfs',
    track: 'Data Structures & Algorithms',
    title: 'Visit a tree level by level',
    description: 'Use a queue to process every node before moving to the next level.',
    category: 'Trees',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Trees', 'BFS', 'Queue'],
    lesson: 'Breadth-first search is useful when you need the nearest match or level order. Each tree node is queued and visited once.',
    code: `function visitByLevel(root) {
  if (root === null) return;
  const queue = [root];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head];
    head += 1;
    console.log(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}

// Run with a tree whose nodes have value, left, and right fields.`,
  },
  {
    id: 'graph-bfs',
    track: 'Data Structures & Algorithms',
    title: 'Explore a graph with breadth-first search',
    description: 'Visit connected nodes in increasing distance from a start node.',
    category: 'Graphs',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Graphs', 'BFS', 'Queue'],
    lesson: 'Track visited nodes to avoid loops. With an adjacency list, breadth-first search takes O(V + E) time.',
    code: `const graph = new Map([
  ['A', ['B', 'C']],
  ['B', ['D']],
  ['C', []],
  ['D', []],
]);
const queue = ['A'];
const visited = new Set(queue);

for (let head = 0; head < queue.length; head += 1) {
  const node = queue[head];
  console.log(node);
  for (const neighbor of graph.get(node) ?? []) {
    if (visited.has(neighbor)) continue;
    visited.add(neighbor);
    queue.push(neighbor);
  }
}
// A B C D`,
  },
  {
    id: 'graph-dfs',
    track: 'Data Structures & Algorithms',
    title: 'Explore connected nodes with depth-first search',
    description: 'Follow one path as far as possible, then backtrack.',
    category: 'Graphs',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Graphs', 'DFS', 'Recursion'],
    lesson: 'A visited set prevents cycles from causing endless recursion. Depth-first search is O(V + E) with an adjacency list.',
    code: `function visit(node, graph, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  console.log(node);

  for (const neighbor of graph.get(node) ?? []) {
    visit(neighbor, graph, visited);
  }
}

const graph = new Map([['A', ['B']], ['B', ['A', 'C']], ['C', []]]);
visit('A', graph);
// A B C`,
  },
  {
    id: 'merge-sort',
    track: 'Data Structures & Algorithms',
    title: 'Sort with merge sort',
    description: 'Split a list, sort each half, and merge the sorted results.',
    category: 'Sorting',
    difficulty: 'Advanced',
    time: '3 min',
    tags: ['Merge sort', 'Divide and conquer'],
    lesson: 'Merge sort guarantees O(n log n) time and needs extra memory for the merged arrays. Built-in sort is usually the right choice in applications.',
    code: `function mergeSort(values) {
  if (values.length < 2) return values;
  const middle = Math.floor(values.length / 2);
  const left = mergeSort(values.slice(0, middle));
  const right = mergeSort(values.slice(middle));
  const merged = [];

  while (left.length && right.length) {
    merged.push(left[0] <= right[0] ? left.shift() : right.shift());
  }
  return [...merged, ...left, ...right];
}

console.log(mergeSort([4, 1, 3, 2]));
// [1, 2, 3, 4]`,
  },
  {
    id: 'memoization',
    track: 'Data Structures & Algorithms',
    title: 'Avoid repeated work with memoization',
    description: 'Cache subproblem results to make recursive calculations faster.',
    category: 'Dynamic Programming',
    difficulty: 'Advanced',
    time: '2 min',
    tags: ['Memoization', 'Dynamic programming'],
    lesson: 'Memoization turns repeated recursive work into a lookup. This Fibonacci example takes O(n) time instead of exponential time.',
    code: `function fibonacci(number, cache = new Map()) {
  if (number < 2) return number;
  if (cache.has(number)) return cache.get(number);

  const result = fibonacci(number - 1, cache) + fibonacci(number - 2, cache);
  cache.set(number, result);
  return result;
}

console.log(fibonacci(10));
// 55`,
  },
  {
    id: 'backtracking-subsets',
    track: 'Data Structures & Algorithms',
    title: 'Generate combinations with backtracking',
    description: 'Build each possible subset by choosing or skipping each value.',
    category: 'Backtracking',
    difficulty: 'Advanced',
    time: '3 min',
    tags: ['Backtracking', 'Recursion'],
    lesson: 'Backtracking explores choices recursively and undoes each choice afterward. The number of subsets grows as 2^n, so this is for small inputs.',
    code: `function getSubsets(values, index = 0, current = [], results = []) {
  if (index === values.length) {
    results.push([...current]);
    return results;
  }
  getSubsets(values, index + 1, current, results);
  current.push(values[index]);
  getSubsets(values, index + 1, current, results);
  current.pop();
  return results;
}

console.log(getSubsets([1, 2]));
// [[], [2], [1], [1, 2]]`,
  },
  {
    id: 'prefix-sums',
    track: 'Data Structures & Algorithms',
    title: 'Answer range sums with prefix sums',
    description: 'Precompute cumulative totals to answer repeated range queries in constant time.',
    category: 'Arrays & Range Queries',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Arrays', 'Prefix sums', 'Range queries'],
    lesson: 'A prefix-sum array stores the total before each position. Subtracting two prefix values answers any inclusive range sum in O(1) after O(n) preprocessing.',
    code: `const values = [3, 1, 4, 1, 5];
const prefix = [0];
for (const value of values) prefix.push(prefix.at(-1) + value);

function rangeSum(left, right) {
  return prefix[right + 1] - prefix[left];
}

console.log(rangeSum(1, 3));
// 6`,
  },
  {
    id: 'difference-array',
    track: 'Data Structures & Algorithms',
    title: 'Apply many range updates with a difference array',
    description: 'Record update boundaries, then recover the final values in one pass.',
    category: 'Arrays & Range Queries',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Arrays', 'Difference array', 'Range updates'],
    lesson: 'A difference array applies an increment to an interval with two boundary writes. A prefix pass applies all accumulated changes in O(n), making many range updates efficient.',
    code: `const values = [0, 0, 0, 0, 0];
const difference = Array(values.length + 1).fill(0);
const updates = [[1, 3, 4], [0, 2, 2]];

for (const [left, right, amount] of updates) {
  difference[left] += amount;
  difference[right + 1] -= amount;
}

let change = 0;
const result = values.map((value, index) => {
  change += difference[index];
  return value + change;
});
console.log(result);
// [2, 6, 6, 4, 0]`,
  },
  {
    id: 'monotonic-stack',
    track: 'Data Structures & Algorithms',
    title: 'Find next greater values with a monotonic stack',
    description: 'Resolve earlier values as soon as a larger value appears.',
    category: 'Stacks & Queues',
    difficulty: 'Advanced',
    time: '2 min',
    tags: ['Stack', 'Monotonic stack', 'Arrays'],
    lesson: 'A decreasing stack keeps only unresolved candidates. Each index is pushed and popped once, so next-greater queries take O(n) rather than checking every later value.',
    code: `const values = [2, 1, 4, 3];
const nextGreater = Array(values.length).fill(-1);
const stack = [];

for (let index = 0; index < values.length; index += 1) {
  while (stack.length && values[stack.at(-1)] < values[index]) {
    nextGreater[stack.pop()] = values[index];
  }
  stack.push(index);
}

console.log(nextGreater);
// [4, 4, -1, -1]`,
  },
  {
    id: 'priority-queue',
    track: 'Data Structures & Algorithms',
    title: 'Use a heap as a priority queue',
    description: 'Keep the smallest pending item ready without sorting after every change.',
    category: 'Heaps & Priority Queues',
    difficulty: 'Advanced',
    time: '3 min',
    tags: ['Heap', 'Priority queue', 'Scheduling'],
    lesson: 'A min-heap keeps its smallest value at the root. Insertion moves a new value up until the heap order is restored, taking O(log n); reading the root takes O(1).',
    code: `function push(heap, value) {
  let index = heap.length;
  heap.push(value);
  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);
    if (heap[parent] <= value) break;
    heap[index] = heap[parent];
    index = parent;
  }
  heap[index] = value;
}

const heap = [2, 7, 9];
push(heap, 1);
console.log(heap[0]);
// 1`,
  },
  {
    id: 'greedy-intervals',
    track: 'Data Structures & Algorithms',
    title: 'Choose non-overlapping intervals greedily',
    description: 'Sort by finishing time to fit as many compatible intervals as possible.',
    category: 'Greedy Algorithms',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Greedy', 'Sorting', 'Intervals'],
    lesson: 'For maximum interval scheduling, repeatedly choose the available interval that ends earliest. This greedy choice leaves as much room as possible for later intervals.',
    code: `const intervals = [[1, 3], [2, 4], [3, 5], [6, 8]];
intervals.sort((first, second) => first[1] - second[1]);

const chosen = [];
for (const [start, end] of intervals) {
  if (!chosen.length || start >= chosen.at(-1)) chosen.push(end);
}

console.log(chosen.length);
// 3`,
  },
  {
    id: 'union-find',
    track: 'Data Structures & Algorithms',
    title: 'Track connected groups with Union-Find',
    description: 'Join components and test connectivity with nearly constant-time operations.',
    category: 'Graphs & Connectivity',
    difficulty: 'Advanced',
    time: '3 min',
    tags: ['Union-Find', 'Disjoint sets', 'Connected components'],
    lesson: 'Union-Find stores a representative for each group. Path compression and union by size make repeated connectivity checks and group merges nearly constant time on average.',
    code: `const parent = [0, 1, 2, 3];
const size = [1, 1, 1, 1];
function find(node) {
  if (parent[node] !== node) parent[node] = find(parent[node]);
  return parent[node];
}
function union(first, second) {
  first = find(first);
  second = find(second);
  if (first === second) return;
  if (size[first] < size[second]) [first, second] = [second, first];
  parent[second] = first;
  size[first] += size[second];
}
union(0, 1);
union(1, 2);
console.log(find(0) === find(2));
// true`,
  },
  {
    id: 'topological-sort',
    track: 'Data Structures & Algorithms',
    title: 'Order dependencies with topological sorting',
    description: 'Use indegrees to schedule each prerequisite before its dependents.',
    category: 'Graphs & Connectivity',
    difficulty: 'Advanced',
    time: '3 min',
    tags: ['Graphs', 'Topological sort', 'DAG'],
    lesson: 'Kahn’s algorithm repeatedly removes a node with no remaining prerequisites. If it cannot output every node, the directed graph contains a cycle and has no topological order.',
    code: `const graph = [[2], [2, 3], [4], [4], []];
const indegree = Array(graph.length).fill(0);
graph.forEach((neighbors) => neighbors.forEach((node) => { indegree[node] += 1; }));

const queue = indegree.flatMap((degree, node) => degree === 0 ? [node] : []);
const order = [];
for (let head = 0; head < queue.length; head += 1) {
  const node = queue[head];
  order.push(node);
  for (const neighbor of graph[node]) {
    indegree[neighbor] -= 1;
    if (indegree[neighbor] === 0) queue.push(neighbor);
  }
}

console.log(order.length === graph.length, order);
// true, [0, 1, 2, 3, 4]`,
  },
  {
    id: 'dijkstra',
    track: 'Data Structures & Algorithms',
    title: 'Find weighted shortest paths with Dijkstra',
    description: 'Relax nonnegative graph edges in order of the best known distance.',
    category: 'Graphs & Connectivity',
    difficulty: 'Advanced',
    time: '3 min',
    tags: ['Graphs', 'Dijkstra', 'Shortest paths'],
    lesson: 'Dijkstra’s algorithm repeatedly expands the closest unsettled node and requires nonnegative edge weights. This compact sample sorts a simple frontier for clarity; a binary min-heap avoids repeated sorting and is more efficient on sparse graphs.',
    code: `const graph = [
  [[1, 4], [2, 1]],
  [[3, 1]],
  [[1, 2], [3, 5]],
  [],
];
const distance = Array(graph.length).fill(Infinity);
const pending = [[0, 0]];
distance[0] = 0;

while (pending.length) {
  pending.sort((first, second) => first[0] - second[0]);
  const [cost, node] = pending.shift();
  if (cost !== distance[node]) continue;
  for (const [neighbor, weight] of graph[node]) {
    const nextCost = cost + weight;
    if (nextCost >= distance[neighbor]) continue;
    distance[neighbor] = nextCost;
    pending.push([nextCost, neighbor]);
  }
}

console.log(distance);
// [0, 3, 1, 4]`,
  },
  {
    id: 'minimum-spanning-tree',
    track: 'Data Structures & Algorithms',
    title: 'Build a minimum spanning tree with Kruskal',
    description: 'Connect every vertex at minimum cost while avoiding cycles.',
    category: 'Graphs & Connectivity',
    difficulty: 'Advanced',
    time: '3 min',
    tags: ['Graphs', 'Kruskal', 'Minimum spanning tree'],
    lesson: 'Kruskal’s algorithm considers edges from cheapest to most expensive and keeps an edge only when it connects separate components. Union-Find detects whether an edge would create a cycle.',
    code: `const edges = [[1, 0, 1], [4, 0, 2], [2, 1, 2], [3, 2, 3]];
edges.sort((first, second) => first[0] - second[0]);
const parent = [0, 1, 2, 3];
const find = (node) => parent[node] === node ? node : (parent[node] = find(parent[node]));

let cost = 0;
for (const [weight, first, second] of edges) {
  const rootFirst = find(first);
  const rootSecond = find(second);
  if (rootFirst === rootSecond) continue;
  parent[rootFirst] = rootSecond;
  cost += weight;
}

console.log(cost);
// 6`,
  },
  {
    id: 'trie-prefix-tree',
    track: 'Data Structures & Algorithms',
    title: 'Store words by shared prefixes with a trie',
    description: 'Reuse prefix paths to search words and autocomplete efficiently.',
    category: 'Trees & Tries',
    difficulty: 'Advanced',
    time: '2 min',
    tags: ['Trie', 'Trees', 'Strings', 'Prefix search'],
    lesson: 'A trie gives each character its own branch. Inserting or looking up a word takes time proportional to its length, and words with common prefixes share nodes.',
    code: `const trie = {};
for (const word of ['cat', 'car', 'care']) {
  let node = trie;
  for (const character of word) node = (node[character] ??= {});
  node.isWord = true;
}

function contains(word) {
  let node = trie;
  for (const character of word) {
    if (!node[character]) return false;
    node = node[character];
  }
  return node.isWord === true;
}

console.log(contains('car'), contains('ca'));
// true, false`,
  },
  {
    id: 'fenwick-tree',
    track: 'Data Structures & Algorithms',
    title: 'Update values and query prefixes with a Fenwick tree',
    description: 'Support point updates and prefix sums in logarithmic time.',
    category: 'Trees & Range Queries',
    difficulty: 'Advanced',
    time: '3 min',
    tags: ['Fenwick tree', 'Binary indexed tree', 'Range queries'],
    lesson: 'A Fenwick tree stores partial sums indexed by the lowest set bit. It supports point updates and prefix-sum queries in O(log n), even when values change.',
    code: `const values = [3, 1, 4, 1, 5];
const tree = Array(values.length + 1).fill(0);

function add(index, amount) {
  for (index += 1; index < tree.length; index += index & -index) tree[index] += amount;
}
function prefixSum(index) {
  let total = 0;
  for (index += 1; index > 0; index -= index & -index) total += tree[index];
  return total;
}

values.forEach((value, index) => add(index, value));
console.log(prefixSum(3));
// 9`,
  },
  {
    id: 'segment-tree',
    track: 'Data Structures & Algorithms',
    title: 'Query and update ranges with a segment tree',
    description: 'Combine interval summaries to support dynamic range queries.',
    category: 'Trees & Range Queries',
    difficulty: 'Advanced',
    time: '3 min',
    tags: ['Segment tree', 'Range queries', 'Point updates'],
    lesson: 'A segment tree stores a summary for each interval. Updating one value or querying a range visits only O(log n) tree levels, unlike rescanning the whole array.',
    code: `const values = [2, 1, 5, 3];
const tree = Array(values.length * 4).fill(0);
function build(node, left, right) {
  if (left === right) { tree[node] = values[left]; return; }
  const middle = Math.floor((left + right) / 2);
  build(node * 2, left, middle);
  build(node * 2 + 1, middle + 1, right);
  tree[node] = tree[node * 2] + tree[node * 2 + 1];
}
function query(node, left, right, from, to) {
  if (from <= left && right <= to) return tree[node];
  const middle = Math.floor((left + right) / 2);
  let total = 0;
  if (from <= middle) total += query(node * 2, left, middle, from, to);
  if (to > middle) total += query(node * 2 + 1, middle + 1, right, from, to);
  return total;
}

build(1, 0, values.length - 1);
console.log(query(1, 0, values.length - 1, 1, 3));
// 9`,
  },
  {
    id: 'grid-dp',
    track: 'Data Structures & Algorithms',
    title: 'Count grid paths with dynamic programming',
    description: 'Build each cell’s answer from the states immediately above and to the left.',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Dynamic programming', 'Grids', 'State transitions'],
    lesson: 'Grid DP stores the number of ways to reach each cell. When movement is limited to right and down, every open cell combines the answers from its valid predecessors.',
    code: `const blocked = [[false, false, false], [false, true, false], [false, false, false]];
const paths = Array.from({ length: blocked.length }, () => Array(blocked[0].length).fill(0));
paths[0][0] = 1;

for (let row = 0; row < blocked.length; row += 1) {
  for (let column = 0; column < blocked[0].length; column += 1) {
    if (blocked[row][column]) { paths[row][column] = 0; continue; }
    if (row > 0) paths[row][column] += paths[row - 1][column];
    if (column > 0) paths[row][column] += paths[row][column - 1];
  }
}

console.log(paths.at(-1).at(-1));
// 2`,
  },
  {
    id: 'knapsack-dp',
    track: 'Data Structures & Algorithms',
    title: 'Solve 0/1 knapsack with dynamic programming',
    description: 'Choose each item at most once while staying within a capacity.',
    category: 'Dynamic Programming',
    difficulty: 'Advanced',
    time: '3 min',
    tags: ['Dynamic programming', 'Knapsack', 'Optimization'],
    lesson: 'For each item, compare keeping the previous best value with taking that item. Iterate capacity downward so the current item cannot be reused during the same pass.',
    code: `const weights = [2, 3, 4];
const values = [4, 5, 7];
const capacity = 5;
const best = Array(capacity + 1).fill(0);

for (let item = 0; item < weights.length; item += 1) {
  for (let room = capacity; room >= weights[item]; room -= 1) {
    best[room] = Math.max(best[room], best[room - weights[item]] + values[item]);
  }
}

console.log(best[capacity]);
// 9`,
  },
  {
    id: 'longest-increasing-subsequence',
    track: 'Data Structures & Algorithms',
    title: 'Find a longest increasing subsequence',
    description: 'Track the smallest tail for each subsequence length in O(n log n).',
    category: 'Dynamic Programming',
    difficulty: 'Advanced',
    time: '2 min',
    tags: ['Dynamic programming', 'Binary search', 'Subsequence'],
    lesson: 'The tails array stores the smallest ending value found for each subsequence length. Replacing a tail can make longer future sequences possible without changing the best length so far.',
    code: `const values = [3, 1, 5, 2, 6, 4, 9];
const tails = [];

for (const value of values) {
  let low = 0;
  let high = tails.length;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (tails[middle] < value) low = middle + 1;
    else high = middle;
  }
  tails[low] = value;
}

console.log(tails.length);
// 4`,
  },
  {
    id: 'sieve-primes',
    track: 'Data Structures & Algorithms',
    title: 'Generate prime numbers with the Sieve of Eratosthenes',
    description: 'Cross out multiples once to build a prime table up to a limit.',
    category: 'Number Theory',
    difficulty: 'Medium',
    time: '2 min',
    tags: ['Number theory', 'Primes', 'Sieve'],
    lesson: 'The sieve marks multiples of each prime as composite. Starting at the prime’s square avoids work already done by smaller factors, giving roughly O(n log log n) time.',
    code: `function primesUpTo(limit) {
  const prime = Array(limit + 1).fill(true);
  prime[0] = false;
  prime[1] = false;
  for (let value = 2; value * value <= limit; value += 1) {
    if (!prime[value]) continue;
    for (let multiple = value * value; multiple <= limit; multiple += value) prime[multiple] = false;
  }
  return prime.flatMap((isPrime, value) => isPrime ? [value] : []);
}

console.log(primesUpTo(20));
// [2, 3, 5, 7, 11, 13, 17, 19]`,
  },
  {
    id: 'modular-exponentiation',
    track: 'Data Structures & Algorithms',
    title: 'Compute modular powers with repeated squaring',
    description: 'Evaluate large exponents in logarithmic time while keeping values bounded.',
    category: 'Number Theory',
    difficulty: 'Advanced',
    time: '2 min',
    tags: ['Number theory', 'Modulo', 'Fast exponentiation'],
    lesson: 'Repeated squaring processes the exponent’s binary digits, reducing the number of multiplications from O(exponent) to O(log exponent). Taking the modulus at each step controls number growth.',
    code: `function powerMod(base, exponent, modulus) {
  let result = 1;
  base %= modulus;
  while (exponent > 0) {
    if (exponent % 2 === 1) result = (result * base) % modulus;
    base = (base * base) % modulus;
    exponent = Math.floor(exponent / 2);
  }
  return result;
}

console.log(powerMod(2, 10, 1000));
// 24`,
  },
  {
    id: 'kmp-string-search',
    track: 'Data Structures & Algorithms',
    title: 'Search for a pattern with KMP',
    description: 'Reuse known prefix matches to search text in linear time.',
    category: 'Strings & Matching',
    difficulty: 'Advanced',
    time: '3 min',
    tags: ['Strings', 'KMP', 'Pattern matching'],
    lesson: 'KMP preprocesses how a pattern overlaps with itself. When a character mismatches, its prefix table identifies the next possible match without rescanning text.',
    code: `function prefixTable(pattern) {
  const table = Array(pattern.length).fill(0);
  for (let index = 1, matched = 0; index < pattern.length; index += 1) {
    while (matched && pattern[index] !== pattern[matched]) matched = table[matched - 1];
    if (pattern[index] === pattern[matched]) matched += 1;
    table[index] = matched;
  }
  return table;
}

function containsPattern(text, pattern) {
  const table = prefixTable(pattern);
  for (let index = 0, matched = 0; index < text.length; index += 1) {
    while (matched && text[index] !== pattern[matched]) matched = table[matched - 1];
    if (text[index] === pattern[matched]) matched += 1;
    if (matched === pattern.length) return true;
  }
  return pattern.length === 0;
}

console.log(containsPattern('ababcabc', 'abc'));
// true`,
  },
  {
    id: 'meet-in-the-middle',
    track: 'Data Structures & Algorithms',
    title: 'Reduce exponential search with meet in the middle',
    description: 'Split a small search space into two halves and match their partial results.',
    category: 'Advanced Algorithms',
    difficulty: 'Advanced',
    time: '3 min',
    tags: ['Meet in the middle', 'Subset sums', 'Search'],
    lesson: 'Splitting n choices into two halves can reduce about 2^n work to two collections of about 2^(n/2) results. It is useful for medium-sized inputs that are too large for direct enumeration.',
    code: `function subsetSums(values) {
  let sums = [0];
  for (const value of values) sums = [...sums, ...sums.map((sum) => sum + value)];
  return sums;
}

const values = [3, 5, 7, 9];
const middle = Math.floor(values.length / 2);
const leftSums = subsetSums(values.slice(0, middle));
const rightSums = new Set(subsetSums(values.slice(middle)));
const target = 12;

console.log(leftSums.some((sum) => rightSums.has(target - sum)));
// true`,
  },
  {
    id: 'convex-hull',
    track: 'Data Structures & Algorithms',
    title: 'Build a convex hull from points',
    description: 'Use sorted points and cross products to find the outer boundary.',
    category: 'Computational Geometry',
    difficulty: 'Advanced',
    time: '3 min',
    tags: ['Geometry', 'Convex hull', 'Sorting'],
    lesson: 'The monotone chain algorithm constructs lower and upper hulls in O(n log n). A cross product detects whether the latest three points make a left turn, right turn, or straight line. This example uses distinct points.',
    code: `function cross(origin, first, second) {
  return (first[0] - origin[0]) * (second[1] - origin[1]) -
    (first[1] - origin[1]) * (second[0] - origin[0]);
}

function convexHull(points) {
  const sorted = [...points].sort((first, second) => first[0] - second[0] || first[1] - second[1]);
  const halfHull = (items) => {
    const hull = [];
    for (const point of items) {
      while (hull.length > 1 && cross(hull.at(-2), hull.at(-1), point) <= 0) hull.pop();
      hull.push(point);
    }
    return hull;
  };
  return [...halfHull(sorted).slice(0, -1), ...halfHull(sorted.reverse()).slice(0, -1)];
}

console.log(convexHull([[0, 0], [2, 0], [2, 2], [0, 2], [1, 1]]));`,
  },
  {
    id: 'contest-problem-solving',
    track: 'Data Structures & Algorithms',
    title: 'Turn a problem statement into a solution plan',
    description: 'Use constraints, examples, invariants, and edge cases to guide implementation.',
    category: 'Problem-Solving Workflow',
    difficulty: 'Easy',
    time: '2 min',
    tags: ['Problem solving', 'Constraints', 'Testing'],
    lesson: 'A reliable contest workflow is to restate the task, inspect input limits, work a small example, choose and justify an algorithm, then test edge cases and complexity before submitting.',
    code: `function analyzeProblem(inputSize, timeBudget) {
  const linearWork = inputSize;
  const pairWork = inputSize * inputSize;
  return {
    linearFits: linearWork <= timeBudget,
    pairFits: pairWork <= timeBudget,
  };
}

console.log(analyzeProblem(1000, 1_000_000));
// { linearFits: true, pairFits: true }`,
  },
]

const tracks = ['Development', 'Data Structures & Algorithms']
const standardsResources = [
  {
    topic: 'HTML',
    title: 'WHATWG HTML Living Standard',
    detail: 'The evolving HTML specification',
    href: 'https://html.spec.whatwg.org/multipage/',
  },
  {
    topic: 'HTML',
    title: 'MDN HTML reference',
    detail: 'Elements, attributes, guides, and compatibility',
    href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference',
  },
  {
    topic: 'CSS',
    title: 'MDN CSS guides and reference',
    detail: 'Current CSS modules, properties, and selectors',
    href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  },
  {
    topic: 'CSS',
    title: 'W3C CSS current work',
    detail: 'CSS specifications and working drafts',
    href: 'https://www.w3.org/Style/CSS/current-work',
  },
  {
    topic: 'JavaScript',
    title: 'MDN JavaScript guide and reference',
    detail: 'Language guides, built-ins, and runtime notes',
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    topic: 'JavaScript',
    title: 'ECMAScript language specification',
    detail: 'The current standardized JavaScript language',
    href: 'https://tc39.es/ecma262/',
  },
  {
    topic: 'JavaScript',
    title: 'TC39 proposal stages',
    detail: 'See what is proposed versus standardized',
    href: 'https://github.com/tc39/proposals',
  },
  {
    topic: 'Compatibility',
    title: 'Check browser feature support',
    detail: 'Compare support before using newer features',
    href: 'https://caniuse.com/',
  },
]
const getTrack = (recipe) => recipe.track ?? 'Development'
const difficultyRank = { Easy: 0, Medium: 1, Advanced: 2 }
const orderedRecipes = [...recipes].sort((first, second) => difficultyRank[first.difficulty] - difficultyRank[second.difficulty])
const categoriesByTrack = Object.fromEntries(tracks.map((track) => [
  track,
  [...new Set(orderedRecipes.filter((recipe) => getTrack(recipe) === track).map((recipe) => recipe.category))],
]))
const difficultyLabels = { Easy: 'Core skill', Medium: 'Common pattern', Advanced: 'Specialized' }
const normalizeSearchWord = (word) => word.length > 4 && word.endsWith('ies')
  ? `${word.slice(0, -3)}y`
  : word.length > 3 && word.endsWith('s') && !word.endsWith('ss') && !word.endsWith('us')
    ? word.slice(0, -1)
    : word
const normalizeSearchText = (value) => (value.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])
  .map(normalizeSearchWord)
  .join(' ')
const searchStopWords = new Set(['a', 'an', 'and', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with'])
const projectSteps = [
  {
    phase: 'PLAN & MODEL',
    title: 'Define the Samosa ordering website and its data',
    summary: 'Build a premium samosa ordering website for browsing handcrafted flavors, customizing carts, and tracking order status for a modern snack brand.',
    actions: [
      'Create the React app with Vite and run it locally.',
      'Define a samosa with id, name, flavor, spice level, price, description, and availability. Define an order with customer name, selected samosas, total, status, and created time.',
      'Plan the API routes: GET /api/menu, GET /api/orders, POST /api/orders, then PATCH /api/orders/:id and DELETE /api/orders/:id.',
    ],
    examples: [
      {
        file: 'Terminal',
        code: `npm create vite@latest samosa-ordering-website -- --template react
      cd samosa-ordering-website
npm install
npm run dev`,
      },
      {
        file: 'database/schema.sql',
        code: `CREATE TABLE menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  flavor TEXT NOT NULL,
  spice_level TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  description TEXT,
  available BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  total NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`,
      },
    ],
    lessonIds: ['project-vite-setup', 'database-schema', 'database-select-filter', 'database-aggregates'],
  },
  {
    phase: 'STRUCTURE THE UI',
    title: 'Build the premium storefront layout',
    summary: 'Create a high-end menu page, flavor filters, cart summary, and checkout form with polished and accessible markup.',
    actions: [
      'Use header, main, nav, section, and form elements to organize the storefront and checkout flow.',
      'Add a search field, flavor categories, product cards, and a cart summary with quantities, add-ons, and total.',
      'Create a SamosaMenuSection, CartPanel, and OrderForm component. Show an empty cart state when nothing has been added yet.',
    ],
    examples: [
      {
        file: 'src/App.jsx',
        code: `import { useState } from 'react';

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart((currentCart) => [...currentCart, item]);
  }

  return <main>
    <h1>Samosa ordering website</h1>
    <section>
      <h2>Signature samosas</h2>
      <button onClick={() => addToCart({ id: 1, name: 'Masala Samosa', price: 12 })}>
        Add to cart
      </button>
    </section>
    <ul>{cart.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
  </main>;
}`,
      },
    ],
    lessonIds: ['html-structure', 'html-forms', 'html-form-controls', 'library-react'],
  },
  {
    phase: 'STYLE & INTERACT',
    title: 'Make the shopping experience premium',
    summary: 'Add an elevated visual design with warm color palettes, live totals, responsive layout, and smooth interactions.',
    actions: [
      'Use CSS Grid for the menu and checkout layout and Flexbox for product rows; adapt the layout for mobile shoppers.',
      'Keep keyboard focus visible and make sauce, spice, and add-on choices clear without relying on color alone.',
      'Filter samosas by flavor category and search term. Use a Map to count cart items and date-fns to format order timestamps.',
    ],
    examples: [
      {
        file: 'src/filterMenu.js',
        code: `export function filterMenu(items, query, category) {
  return items.filter((item) => (
    item.name.toLowerCase().includes(query.toLowerCase()) &&
    (category === 'all' || item.category === category)
  );
}`,
      },
      {
        file: 'src/styles.css',
        code: `.menu-layout {
  display: grid;
  gap: 1rem;
}

.product-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button:focus-visible {
  outline: 3px solid #99632b;
}`,
      },
    ],
    lessonIds: ['css-styling', 'css-grid-areas', 'css-flexbox-details', 'css-pseudo-classes', 'hash-map-count', 'library-lodash', 'library-date-fns'],
  },
  {
    phase: 'API & DATABASE',
    title: 'Persist menu and orders with Express and PostgreSQL',
    summary: 'Store premium menu items and customer orders in a relational database and expose a validated JSON API.',
    actions: [
      'Create menu_items and orders tables with flavor, spice level, prices, add-ons, totals, and order statuses.',
      'Add Express routes for listing menu items, creating orders, updating order status, and deleting completed orders. Validate request bodies with Zod.',
      'Use parameterized SQL for all user input. Add indexes for flavor and status filtering and use a transaction when a new order updates multiple records.',
    ],
    examples: [
      {
        file: 'src/server.js',
        code: `import express from 'express';
import pg from 'pg';
import { z } from 'zod';

const app = express();
const db = new pg.Pool();
const OrderSchema = z.object({
  customerName: z.string().trim().min(1),
  items: z.array(z.object({ id: z.string(), quantity: z.number().int().positive() })).min(1),
});
app.use(express.json());

app.post('/api/orders', async (request, response) => {
  const input = OrderSchema.safeParse(request.body);
  if (!input.success) return response.status(400).json(input.error.flatten());

  const { rows } = await db.query(
    'INSERT INTO orders (id, customer_name, total, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [crypto.randomUUID(), input.data.customerName, 26.00, 'pending'],
  );
  response.status(201).json(rows[0]);
});`,
      },
    ],
    lessonIds: ['library-express', 'library-zod', 'database-schema', 'database-parameterized-queries', 'database-transactions', 'database-indexes'],
  },
  {
    phase: 'CONNECT & VERIFY',
    title: 'Connect the app and test the samosa flow',
    summary: 'Load the menu, build the cart, place an order, and validate the premium snack ordering flow from front end to database.',
    actions: [
      'Use TanStack Query to load menu items and orders, and refresh cached data after receiving or updating a customer order.',
      'Test filtering and validation with Vitest, including empty results and invalid order submissions.',
      'Use Playwright to add a samosa to the cart, place an order, update its status, and confirm it remains visible after a reload.',
    ],
    examples: [
      {
        file: 'src/MenuList.jsx',
        code: `import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function MenuList() {
  const { data: menu = [], isPending } = useQuery({
    queryKey: ['menu'],
    queryFn: async () => (await axios.get('/api/menu')).data,
  });

  if (isPending) return <p>Loading menu...</p>;
  return <ul>{menu.map((item) => <li key={item.id}>{item.name}</li>)}</ul>;
}`,
      },
      {
        file: 'src/filterMenu.test.js',
        code: `import { expect, test } from 'vitest';
import { filterMenu } from './filterMenu';

test('filters menu by flavor', () => {
  const items = [{ name: 'Masala Samosa', flavor: 'classic' }, { name: 'Paneer Burst', flavor: 'premium' }];
  expect(filterMenu(items, '', 'classic')).toHaveLength(1);
});`,
      },
      {
        file: 'tests/samosa-ordering-website.spec.js',
        code: `import { expect, test } from '@playwright/test';

test('places a samosa order', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.getByLabel('Customer name').fill('Aisha');
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page.getByText('Order placed')).toBeVisible();
});`,
      },
    ],
    lessonIds: ['library-tanstack-query', 'library-axios', 'library-vitest', 'library-playwright'],
  },
  {
    phase: 'RUN & STOP',
    title: 'Run and stop the Samosa ordering website locally',
    summary: 'Start the development server when you work, then stop it cleanly when you are finished.',
    actions: [
      'Run npm run dev in the project terminal and open the local URL printed by Vite.',
      'When you are finished, click inside the terminal running the server and press Ctrl+C. Wait for the command prompt to return before closing the terminal.',
      'To check the production build, run npm run build and then npm run preview. Press Ctrl+C in that preview terminal when you are done.',
    ],
    examples: [
      {
        file: 'Terminal · development',
        code: `npm run dev
# Open the local URL from the output.
# To stop: click inside this terminal and press Ctrl+C.`,
      },
      {
        file: 'Terminal · production preview',
        code: `npm run build
npm run preview
# To stop the preview: click inside this terminal and press Ctrl+C.`,
      },
    ],
    lessonIds: ['project-vite-setup'],
  },
]
const projectProgressKey = 'jspantry-samosa-society-progress'

function getCommentedRecipeCode(recipe) {
  return `// ${recipe.title}\n// ${recipe.description}\n\n${recipe.code}`
}

function App() {
  const [activeTrack, setActiveTrack] = useState(tracks[0])
  const [activeSection, setActiveSection] = useState(tracks[0])
  const [activeCategory, setActiveCategory] = useState('All topics')
  const [selectedId, setSelectedId] = useState(recipes[0].id)
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeProjectStep, setActiveProjectStep] = useState(0)
  const [completedProjectSteps, setCompletedProjectSteps] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(projectProgressKey) || '[]')
      return Array.isArray(saved) ? saved.filter((index) => Number.isInteger(index) && index >= 0 && index < projectSteps.length) : []
    } catch {
      return []
    }
  })
  const searchInputRef = useRef(null)

  useEffect(() => {
    function focusSearch(event) {
      if (event.key !== '/' || event.altKey || event.ctrlKey || event.metaKey) return
      const target = event.target
      if (target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return
      event.preventDefault()
      searchInputRef.current?.focus()
    }

    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  const filteredRecipes = useMemo(() => {
    const searchTerms = normalizeSearchText(query).split(' ').filter((term) => term && !searchStopWords.has(term))
    const normalizedQuery = searchTerms.join(' ')
    const searchableFields = (recipe) => [
      [recipe.title, 5],
      [recipe.category, 4],
      ...recipe.tags.map((tag) => [tag, 4]),
      [recipe.description, 3],
      [recipe.lesson ?? '', 2],
      [recipe.code, 1],
    ].map(([value, weight]) => [normalizeSearchText(value), weight])
    const scoreRecipe = (recipe) => {
      const fields = searchableFields(recipe)
      const termScore = searchTerms.reduce((score, term) => score + fields.reduce((highestScore, [value, weight]) => {
        const position = value.indexOf(term)
        return position < 0 ? highestScore : Math.max(highestScore, weight * 100 - position)
      }, 0), 0)
      const exactPhraseBonus = fields.some(([value]) => value.includes(normalizedQuery)) ? 100 : 0
      return termScore + exactPhraseBonus
    }

    return orderedRecipes.filter((recipe) => {
      const matchesTrack = Boolean(normalizedQuery) || getTrack(recipe) === activeTrack
      const matchesCategory = Boolean(normalizedQuery) || activeCategory === 'All topics' || recipe.category === activeCategory
      const searchableText = searchableFields(recipe).map(([value]) => value).join(' ')
      const matchesQuery = !searchTerms.length || searchTerms.every((term) => searchableText.includes(term))
      return matchesTrack && matchesCategory && matchesQuery
    }).sort((first, second) => difficultyRank[first.difficulty] - difficultyRank[second.difficulty]
      || scoreRecipe(second) - scoreRecipe(first))
  }, [activeCategory, activeTrack, query])

  const matchingCategories = useMemo(() => {
    const searchTerms = normalizeSearchText(query).split(' ').filter((term) => term && !searchStopWords.has(term))
    if (!searchTerms.length) return []

    return tracks.flatMap((track) => categoriesByTrack[track]
      .filter((category) => {
        const searchableCategory = normalizeSearchText(category)
        return searchTerms.every((term) => searchableCategory.includes(term))
      })
      .map((category) => ({
        track,
        category,
        count: recipes.filter((recipe) => getTrack(recipe) === track && recipe.category === category).length,
      })))
  }, [query])

  useEffect(() => {
    if (filteredRecipes.length > 0) setSelectedId(filteredRecipes[0].id)
  }, [filteredRecipes])

  const selectedRecipe = filteredRecipes.find((recipe) => recipe.id === selectedId) ?? filteredRecipes[0]
  const selectedTrackRank = selectedRecipe
    ? orderedRecipes.filter((recipe) => getTrack(recipe) === getTrack(selectedRecipe)).findIndex((recipe) => recipe.id === selectedRecipe.id) + 1
    : 0

  async function copyCode() {
    if (!selectedRecipe) return
    try {
      await navigator.clipboard.writeText(getCommentedRecipeCode(selectedRecipe))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  function chooseTrack(track) {
    setActiveTrack(track)
    setActiveSection(track)
    setActiveCategory('All topics')
    setQuery('')
    setMobileMenuOpen(false)
  }

  function chooseCategory(track, category) {
    setActiveTrack(track)
    setActiveSection(track)
    setActiveCategory(category)
    setMobileMenuOpen(false)
  }

  function chooseSection(section) {
    setActiveSection(section)
    setMobileMenuOpen(false)
    if (section === 'Project') return
    setActiveTrack(section)
    setActiveCategory('All topics')
    setQuery('')
    setCopied(false)
  }

  function openProjectLesson(recipeId) {
    const recipe = recipes.find((item) => item.id === recipeId)
    if (!recipe) return
    setActiveTrack(getTrack(recipe))
    setActiveSection(getTrack(recipe))
    setActiveCategory('All topics')
    setQuery(recipe.title)
    setMobileMenuOpen(false)
    document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' })
  }

  function toggleProjectStep(index) {
    const completed = completedProjectSteps.includes(index)
      ? completedProjectSteps.filter((step) => step !== index)
      : [...completedProjectSteps, index]
    setCompletedProjectSteps(completed)
    localStorage.setItem(projectProgressKey, JSON.stringify(completed))
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-note"><span className="status-dot" /> Web skills with current references</div>
        <nav className="topbar-links" aria-label="Site navigation">
          <a className="browse-link" href="#topics" onClick={() => chooseSection(activeTrack)}>Browse topics <span aria-hidden="true">→</span></a>
          <a className="browse-link" href="#standards">Standards &amp; support <span aria-hidden="true">→</span></a>
        </nav>
      </header>

      <main id="top">
        <section className="intro">
          <div className="intro-copy">
            <p className="eyebrow">PRACTICAL JAVASCRIPT</p>
            <h1>Build skills you&apos;ll use.<br /><span>Start with the essentials.</span></h1>
            <p className="intro-description">Learn HTML, CSS, JavaScript, libraries, databases, and data structures, then combine them in a guided project.</p>
            <button className="scroll-link" type="button" onClick={() => chooseSection('Project')}>Build the Samosa ordering website <span aria-hidden="true">↓</span></button>
          </div>
          <div className="intro-art" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="floating-card card-back"><span className="card-lines"><i /><i /><i /></span><span className="card-label">CORE SKILLS</span></div>
            <div className="floating-card card-front"><span className="mini-dot" /><span className="mini-dot" /><span className="mini-dot" /><code>const useful = true;</code><span className="scribble">{};</span></div>
            <span className="sparkle sparkle-one">✳</span><span className="sparkle sparkle-two">✳</span>
          </div>
          <div className="intro-index">01 <span>/</span> {String(recipes.length).padStart(2, '0')}</div>
        </section>

        <nav className="section-tabs" aria-label="Main sections">
          {['Development', 'Data Structures & Algorithms', 'Project'].map((section) => <button key={section} className="section-tab" type="button" aria-pressed={activeSection === section} onClick={() => chooseSection(section)}>{section}</button>)}
        </nav>

        {activeSection === 'Project' && <section className="learning-path" id="project-guide" aria-labelledby="project-guide-title">
          <div className="learning-path-heading">
            <span className="learning-path-kicker">GUIDED PROJECT · REACT + EXPRESS + POSTGRESQL</span>
            <h3 id="project-guide-title">Build the Samosa ordering website, one step at a time</h3>
            <p>Create a premium samosa ordering website for exploring handcrafted flavors, building a cart, and placing snack orders. Choose a stage, follow its checklist, and open the linked lessons as you build.</p>
          </div>
          <figure className="taskflow-preview">
            <img src={`${import.meta.env.BASE_URL}taskflow-preview.svg`} alt="Samosa ordering website storefront showing signature samosa flavors, cart totals, spice filters, and order status." />
            <figcaption>Samosa ordering website preview · premium flavors, cart totals, and snack order flow</figcaption>
          </figure>
          <div className="project-progress" aria-live="polite">
            <span>{completedProjectSteps.length} of {projectSteps.length} stages complete</span>
            <span className="project-progress-track"><span style={{ width: `${completedProjectSteps.length / projectSteps.length * 100}%` }} /></span>
          </div>
          <div className="project-layout">
            <aside className="project-sidebar" aria-label="Samosa ordering website project steps">
              <p className="sidebar-label">PROJECT STEPS</p>
              <nav className="project-topic-list" aria-label="Project steps">
                {projectSteps.map((step, index) => <button key={step.phase} className={`project-topic-link ${activeProjectStep === index ? 'active' : ''} ${completedProjectSteps.includes(index) ? 'done' : ''}`} onClick={() => setActiveProjectStep(index)} aria-pressed={activeProjectStep === index}>
                  <span className="project-topic-number">{completedProjectSteps.includes(index) ? '✓' : String(index + 1).padStart(2, '0')}</span>
                  <span className="project-topic-copy"><span>{step.phase}</span><strong>{step.title}</strong></span>
                  <span className="project-topic-arrow" aria-hidden="true">→</span>
                </button>)}
              </nav>
            </aside>
            <div className="project-step-main">
              <section className="project-step-content" aria-live="polite">
                <span className="learning-path-kicker">STEP {String(activeProjectStep + 1).padStart(2, '0')} · {projectSteps[activeProjectStep].phase}</span>
                <h4>{projectSteps[activeProjectStep].title}</h4>
                <p>{projectSteps[activeProjectStep].summary}</p>
                <ol className="project-step-actions">{projectSteps[activeProjectStep].actions.map((action) => <li key={action}>{action}</li>)}</ol>
                <button className={`project-complete-button ${completedProjectSteps.includes(activeProjectStep) ? 'complete' : ''}`} onClick={() => toggleProjectStep(activeProjectStep)} aria-pressed={completedProjectSteps.includes(activeProjectStep)}>
                  <span aria-hidden="true">{completedProjectSteps.includes(activeProjectStep) ? '✓' : '○'}</span>
                  {completedProjectSteps.includes(activeProjectStep) ? 'Step completed' : 'Mark step complete'}
                </button>
              </section>
              <div className="project-step-examples" aria-label="Code examples">
                {projectSteps[activeProjectStep].examples.map((example, index) => <details className="project-code-example" key={example.file} open={index === 0}>
                  <summary>{example.file}</summary>
                  <pre className="code-block"><code>{example.code}</code></pre>
                </details>)}
              </div>
              <aside className="project-step-lessons" aria-label="Related lessons">
                <span className="learning-path-kicker">LESSONS USED</span>
                {projectSteps[activeProjectStep].lessonIds.map((lessonId) => {
                  const recipe = recipes.find((item) => item.id === lessonId)
                  return recipe && <button className="project-lesson-link" key={lessonId} onClick={() => openProjectLesson(lessonId)}>
                    <span>{recipe.category}</span><strong>{recipe.title}</strong><span className="project-link-arrow" aria-hidden="true">→</span>
                  </button>
                })}
              </aside>
            </div>
          </div>
        </section>}

        {activeSection !== 'Project' && <section className="recipe-section" id="topics">
          <div className="section-heading">
            <div><p className="eyebrow">THE COLLECTION · {recipes.length} TOPICS</p></div>
            <label className="search-box"><span aria-hidden="true">⌕</span><input ref={searchInputRef} aria-label="Search topics" placeholder="Find a skill..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>/</kbd></label>
          </div>

          <div className="mobile-filter">
            <button className="mobile-filter-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen}><span className="mobile-filter-label">{activeCategory === 'All topics' ? activeTrack : `${activeTrack} / ${activeCategory}`}</span><span aria-hidden="true">⌄</span></button>
            {mobileMenuOpen && <div className="mobile-filter-menu">{categoriesByTrack[activeTrack].map((category) => <button className={`mobile-category-option ${activeCategory === category ? 'active' : ''}`} key={category} onClick={() => chooseCategory(activeTrack, category)}>{category}</button>)}</div>}
          </div>

          <div className="catalog-layout">
            <aside className="sidebar" aria-label="Learning tracks">
              <p className="sidebar-label">{activeTrack.toUpperCase()} TOPICS</p>
              <nav aria-label={`${activeTrack} topics`}>
                {categoriesByTrack[activeTrack].map((category, index) => <button key={category} className={`category-link ${activeCategory === category ? 'active' : ''}`} onClick={() => chooseCategory(activeTrack, category)}><span className="category-number">{String(index + 1).padStart(2, '0')}</span>{category}{activeCategory === category && <span className="category-arrow">→</span>}</button>)}
              </nav>
              <div className="sidebar-note"><span aria-hidden="true">01</span><span>Ordered from<br />basic to advanced.</span></div>
            </aside>

            <div className="catalog-main">
              <div className="catalog-meta"><span>{query.trim() ? 'SEARCH RESULTS' : activeTrack.toUpperCase()}</span><span className="meta-divider" /><span>{filteredRecipes.length} TOPICS · BASIC TO ADVANCED</span></div>
              {matchingCategories.length > 0 && <nav className="category-search-results" aria-label="Matching topics">
                <span className="category-search-label">MATCHING TOPICS</span>
                {matchingCategories.map(({ track, category, count }) => <button className="category-search-result" key={`${track}-${category}`} onClick={() => { setQuery(''); chooseCategory(track, category) }}>
                  <span>{track}</span><strong>{category}</strong><span>{count} lessons <span aria-hidden="true">→</span></span>
                </button>)}
              </nav>}
              {!filteredRecipes.length ? <div className="empty-state"><span aria-hidden="true">⌕</span><h3>No topics found</h3><p>Try another search or category.</p><button onClick={() => { setQuery(''); chooseTrack(activeTrack) }}>Clear filters</button></div> : <>
                <div className="recipe-list">{filteredRecipes.map((recipe, index) => <a key={recipe.id} href="#recipe-example" className={`recipe-row ${selectedRecipe?.id === recipe.id ? 'selected' : ''}`} onClick={() => { setSelectedId(recipe.id); setCopied(false) }} aria-current={selectedRecipe?.id === recipe.id ? 'true' : undefined}><span className="recipe-row-index">{String(index + 1).padStart(2, '0')}</span><span className="recipe-row-copy"><span className="recipe-title">{recipe.title}</span><span className="recipe-description">{recipe.description}</span></span><span className="recipe-row-category">{recipe.category}</span><span className="row-arrow" aria-hidden="true">→</span></a>)}</div>
                {selectedRecipe && <article className="code-panel" id="recipe-example" aria-live="polite">
                  <div className="code-panel-heading"><div><span className="panel-kicker">TOPIC {String(selectedTrackRank).padStart(2, '0')} / {selectedRecipe.category.toUpperCase()}</span><h3>{selectedRecipe.title}</h3></div><button className={`copy-button ${copied ? 'copied' : ''}`} onClick={copyCode} aria-label={copied ? 'Code copied' : 'Copy code'}><span aria-hidden="true">{copied ? '✓' : '▢'}</span>{copied ? 'Copied' : 'Copy code'}</button></div>
                  <div className="code-info"><span>{difficultyLabels[selectedRecipe.difficulty]}</span><span className="code-info-dot" />{selectedRecipe.time}<span className="code-tags">{selectedRecipe.tags.map((tag) => <span key={tag}>{tag}</span>)}</span></div>
                  <div className="kid-guide"><span className="kid-guide-label">WHY IT MATTERS</span><p>{selectedRecipe.lesson}</p></div>
                  <pre className="code-block"><code>{getCommentedRecipeCode(selectedRecipe)}</code></pre>
                  <div className="code-footer"><span><span className="live-dot" /> {selectedRecipe.category === 'HTML' ? 'HTML' : selectedRecipe.category === 'CSS' ? 'CSS' : 'JAVASCRIPT'}</span><span>USE IT. CHANGE IT. SHIP IT.</span></div>
                </article>}
              </>}
            </div>
          </div>
        </section>}
        <section className="standards-section" id="standards" aria-labelledby="standards-title">
          <div className="standards-heading">
            <p className="eyebrow">KEEP LEARNING CURRENT</p>
            <h2 id="standards-title">Standards &amp; support</h2>
            <p>Web standards evolve and feature support varies by browser. Use these maintained references to verify details and compatibility.</p>
            <p className="standards-note">Lesson examples are curated and do not update automatically. Check the linked references before relying on recently added features.</p>
          </div>
          <nav className="standards-grid" aria-label="Current web standards and compatibility references">
            {standardsResources.map((resource) => <a className="standards-link" href={resource.href} key={resource.title} target="_blank" rel="noreferrer">
              <span className="standards-topic">{resource.topic}</span>
              <span className="standards-copy"><strong>{resource.title}</strong><span>{resource.detail}</span></span>
              <span className="standards-arrow" aria-hidden="true">↗</span>
            </a>)}
          </nav>
        </section>
      </main>

      <footer className="footer"><span>Good snippets deserve to be shared.</span><span className="footer-right">BUILT FOR THE CURIOUS <span>↗</span></span></footer>
    </div>
  )
}

export default App