export default function autoScroll() {
  let scrollInterval: NodeJS.Timeout | null = null; // Declare scrollInterval outside
  setInterval(() => {
    chrome.storage.sync.get(["AutoScrollEnabled"], (result) => {
      if (result.AutoScrollEnabled) {
        if (!scrollInterval) {
          // If auto-scroll is enabled and no interval is running, start it
          scrollInterval = setInterval(
            autoScrollHelper
            , 2000);
        }
      } else {
        // If auto-scroll is disabled, clear the interval
        if (scrollInterval) {
          clearInterval(scrollInterval);
          scrollInterval = null; // Reset the interval reference
        }
      }
    })
  }, 1000); // Keep the interval alive
}

function autoScrollHelper(fastScrollSpeed = 2000, slowScrollSpeed = 200, slowdownThreshold = 0.985, resetThreshold = 0.6) {
  const currentScroll = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  fastScrollSpeed = maxScroll * 0.01; // Set fast scroll speed to 1% of max scroll
  slowScrollSpeed = maxScroll * 0.0015; // Set slow scroll speed to 0.1% of max scroll
  let scrollSpeed = fastScrollSpeed; // Default to fast scroll speed

  // Determine the appropriate scroll speed
  if (currentScroll >= maxScroll * slowdownThreshold && scrollSpeed === fastScrollSpeed) {
    scrollSpeed = slowScrollSpeed; // Slow down near the bottom
  } else if (currentScroll <= maxScroll * resetThreshold && scrollSpeed === slowScrollSpeed) {
    scrollSpeed = fastScrollSpeed; // Reset to normal speed when below the reset threshold
  }
  // console.log(`Current Scroll: ${currentScroll}, Max Scroll: ${maxScroll}, Scroll Speed: ${scrollSpeed}`);

  // Perform the scrolling
  window.scrollBy(0, scrollSpeed);

  // If we've reached or exceeded the max scroll, adjust behavior
  if (currentScroll >= maxScroll) {
    scrollSpeed = slowScrollSpeed; // Switch to slow speed
  }
}
