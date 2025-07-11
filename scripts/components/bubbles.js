function createBubbles() {
  const container = document.querySelector('.bubbles');
  const bubbleCount = 15;
  
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Randomize size and position
    const size = Math.random() * 120 + 40;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.top = `${Math.random() * 100}%`;
    
    // Randomize animation
    const duration = Math.random() * 20 + 10;
    bubble.style.animationDuration = `${duration}s`;
    
    container.appendChild(bubble);
  }
}

// Call on DOMContentLoaded
document.addEventListener('DOMContentLoaded', createBubbles);