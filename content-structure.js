/* Places each section description directly below its H2 as a supporting H3. */
document.addEventListener('DOMContentLoaded', () => {
  const descriptions = document.querySelectorAll(
    '.section-head > .lead, .coverage-head > .lead, .section > .wrap > h2 + .section-intro, .google > h2 + .section-intro, .section > .wrap > h2 + .copy'
  );
  descriptions.forEach((description) => {
    if (description.tagName !== 'P') return;
    const heading = document.createElement('h3');
    heading.className = 'section-description';
    heading.textContent = description.textContent.trim();
    description.replaceWith(heading);
  });
});
