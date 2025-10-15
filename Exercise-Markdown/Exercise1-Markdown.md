# Playground 1 — What I Changed (and Why)

## (1) Split the code into separate script files & ES Modules (4 pts)

**What I did** 
- Create a small, mdular structure

- index.html file

- js/api.js -->  API access (fetch helpers)
- js/render.js --> rendering
- js/comments.js --> comments toggle + validation
- js/search.js --> search highlighting
- js/utils.js --> helpers
- js/main.js --> orchestration

- css/styles.css --> styling


## (2) Fix semantic HTML & accessibility issues (4 pts)

**What I did** 
- Replaced deprecated <font> with semantic headings: <h1>, <h2>, <h3>.
- Used properly: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>.
- Added proper labels for the search input and form fields.
- Added ARIA to the comment toggle (aria-expanded, aria-controls) and live regions for status/errors.
Added table headers with <th scope="col">…</th>
- improved keyboard navigation/accessiblity with ARIA

## (3) Robust error handling + image URL verification + placeholder (4 pts)
- Centralized fetchJSON() to throw on non-OK HTTP responses.
- Wrapped the entire load pipeline in try/catch and report a user-friendly error to the UI.
- Verified image URLs before rendering; fallback to a local placeholder if unreachable.

- Clear user feedback beats silent failures.
- Broken/missing images should not break layout or UX.


## (4) async/await + arrow functions (4 pts)
- Removed .then() chains and replaced them with async/await.
- Converted function declarations to arrow functions where appropriate.
- async/await reduces nesting and makes control flow obvious.


Before: 
fetch(url)
  .then(res => res.json())
  .then(data => { /* nested calls */ });

After: 
const data = await fetchJSON(params);
const url = await fetchImageUrlFromFile(fileName);

## (5) Removed remaining bad practices (4 pts)

### Deprecated tags 
<font size="7">Welcome to our wildlife website</font>
<font size="6">The trouble with Bears</font>

### Typos & now califation in comments

// Bad
var nameValue = nameField.valeu; // typo
namePara.textContnet = nameValue;

// Good
const name = qs('#name').value.trim();
const comment = qs('#comment').value.trim();
if (!name || !comment) { /* show error */ }

### Missing semantic HTML elements for structure

<div class="header">...</div>-> use <header>
<div class="nav">...</div> -> use <nav> 

### Inline styles / mixed concerns
dont use script/style Tag in index.html
<style>
  body { font-family: Arial, sans-serif; }
  .highlight { background-color: yellow; color: black; }
  .comment-wrapper { display: block; } 
</style>

### Excessive <br> for spacing instead of CSS
use css instead of <br><br>

### Search form input without a <label>
accessibility suffers
<form class="search">
  <input type="search" name="q" placeholder="Search query">
  <input type="submit" value="Go!">
</form>

### Comment toggle uses generic <div> text instead of a proper button & ARIA
<div class="show-hide">Show comment</div>

### var instead of const/let
use const/let for clarity.

var list = document.querySelector('.comment-container');

### No form validation (name/comment allowed to be empty)

### Using innerHTML += inside a loop
moreBears.innerHTML += html;

### Callback hell & nested then() chains
then()...then() --> use await

### No error handling for fetches --> fails silently
No safty mechanism. 

### Not verifying image URLs / no placeholder
Ui can be broken when images dont load

### Hardcoded Content

### Inconsistent casing & naming
<section class="more_bears">















































































































































