type CleanupFunction = () => void;

export function onStoryDown(cleanFn: CleanupFunction) {
  const storyRoot = document.getElementById("storybook-root");
  if (!storyRoot) return;

  const observer = new MutationObserver((_records, observerInstance) => {
    cleanFn();
    observerInstance.disconnect();
  });

  observer.observe(storyRoot, { childList: true });
}

export function wrapStory(story: () => void | CleanupFunction) {
  // The wrapStory function is designed to manage setup and cleanup for a story in a Storybook context.
  return () => {
    const cleanup = story();
    if (cleanup) onStoryDown(cleanup);
  };
}