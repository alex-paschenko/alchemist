// Initialize Highlight.js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre code, .inline-code').forEach((block) => {
    hljs.highlightElement(block);
  });
});

// Global language switching for all blocks
document.querySelectorAll('.code-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-target');

    // Update buttons globally
    document.querySelectorAll('.code-buttons button').forEach(btn => {
      if (btn.getAttribute('data-target') === target) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update code blocks globally
    document.querySelectorAll('.code-block').forEach(block => {
      (block.querySelectorAll('pre') || []).forEach(pre => pre.classList.remove('active'));
      const languageBlocks = block.querySelector(`pre.${target}`);
      languageBlocks &&
        languageBlocks.classList.add('active');
      const highlightTarget = block.querySelector(`pre.${target} code`);
      highlightTarget &&
        hljs.highlightElement(block.querySelector(`pre.${target} code`));
    });
  });
});

// Select all spoilers
const spoilers = document.querySelectorAll('.spoiler');

spoilers.forEach(spoiler => {
  const showButton = spoiler.querySelector('.show-button');
  const hideButton = spoiler.querySelector('.hide-button');
  const header = spoiler.querySelector('.spoiler-header');
  const content = spoiler.querySelector('.spoiler-content');

  content.style.display = 'none';

  header.addEventListener('click', () => {
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
    showButton.style.display = content.style.display === 'none' ? 'inline' : 'none';
    hideButton.style.display = content.style.display === 'none' ? 'none' : 'inline';
  });
});

const openSpoilerFromHash = () => {
  const hash = window.location.hash;

  if (hash) {
    const targetSection = document.querySelector(hash);
    if (targetSection) {
      const spoilerContent = targetSection.querySelector('.spoiler-content');
      const showButton = targetSection.querySelector('.show-button');
      const hideButton = targetSection.querySelector('.hide-button');

      if (spoilerContent) {
        spoilerContent.style.display = 'block';
      }
      if (showButton) {
        showButton.style.display = 'none';
      }
      if (hideButton) {
        hideButton.style.display = 'inline';
      }

      targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
    }
  }
};

// Open spoiler on hash change
window.addEventListener('hashchange', openSpoilerFromHash);
let currentHash = window.location.hash;

setInterval(() => {
  if (currentHash !== window.location.hash) {
    currentHash = window.location.hash;
    openSpoilerFromHash();
  }
}, 100);
