  // Modal functionality
const modal = document.getElementById("soundModal");
const modalTitle = document.getElementById("modalSoundTitle");
const modalDesc = document.getElementById("modalSoundDescription");
const modalCategory = document.getElementById("modalSoundCategory");

// Close modal when clicking X
document.querySelector(".close-modal").addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Add click handlers to all sound titles
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-activator")) {
    const soundId = e.target.getAttribute("data-sound-id");
    const sound = sounds.find(s => s.id === soundId);
    
    if (sound) {
      modalTitle.textContent = sound.title;
      modalDesc.textContent = sound.description;
      modalCategory.textContent = sound.category.charAt(0).toUpperCase() + sound.category.slice(1);      
      modal.style.display = "block";
    }
  }
});

  const showNumber = document.getElementById(`${sound.id}`);
const favDialog = document.getElementById(`${sound.id}modal`);
const number = document.getElementById("number");

showNumber.addEventListener("click", () => {
  number.innerText = Math.floor(Math.random() * 1000);
  favDialog.showModal();
});
