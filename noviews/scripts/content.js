function removeViewsNodes() {
  const nodes = document.querySelectorAll(
    'a[href*="/analytics"]'
  );

  if (nodes.length > 0) {
    for (let node of nodes) {
      // Single view page
      if (node.parentElement.parentElement.parentElement.parentElement.getAttribute('role') === 'group') {
        node.parentElement.parentElement.remove();
      }
      // List page
      if (node.parentElement.parentElement.getAttribute('role') === 'group') {
        node.parentElement.remove();
      }
    }
  }
}

const mainObserver = new MutationObserver(removeViewsNodes)
const bodyObserver = new MutationObserver(function () {
  const main = document.querySelector('main');
  // Observe the document until the main feed is intialised
  // Then remove and assign new observer to the main feed
  if (main) {
    mainObserver.observe(main, { childList: true, subtree: true });
    bodyObserver.disconnect();
  }
});

bodyObserver.observe(document.body, { childList: true, subtree: true });

  
  
