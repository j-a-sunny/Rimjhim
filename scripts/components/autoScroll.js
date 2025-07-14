// Moves the filter-bar div up to the top when the input in search-container is clicked

document.getElementById("searchInput").addEventListener("click", function () {
  const target = document.getElementById("filterBar");
  const targetRect = target.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const offset = window.innerHeight * 0.05; // 14% from top

  // Check if the div is already within the top 20% of the viewport
  const quarter = window.innerHeight * 0.15;
  if (targetRect.top <= quarter && targetRect.bottom >= 0) {
    // myDiv is already within the top 1/4th, do nothing
    return;
  }

  // Otherwise, scroll so it's 30% from the top
  const scrollTo = targetRect.top + scrollTop - offset;
  window.scrollTo({ top: scrollTo, behavior: "smooth" });
});

// end--------------------------------------------------