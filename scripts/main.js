// Audio context for advanced audio control
let audioContext;
try {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
} catch (e) {
  alert("Web Audio API is not supported in this browser");
}

// Master gain node for controlling overall volume
const masterGain = audioContext.createGain();
masterGain.gain.value = 0.7;
masterGain.connect(audioContext.destination);

// Currently playing sounds
const activeSounds = {};

// Update master volume when slider changes
document.getElementById("masterVolume").addEventListener("input", function () {
  masterGain.gain.value = parseFloat(this.value);
});

// Sound data(id, title, description, category, backgroundImage, path)
// !LINKS TO IMAGES IN backgroundImage IS BEST TO BE KEPT INSIDE OF BACKTICKS ``
const sounds = [
  {
    id: "rain",
    icon: `<i class="fa-solid fa-cloud-rain"></i>`,
    title: "Gentle Rain",
    description: "Soft rainfall on leaves and rooftops",
    category: "weather",
    backgroundImage: `https://cdn.pixabay.com/photo/2015/06/19/20/14/water-815271_960_720.jpg`,
    path: "./assets/sounds/rain.ogg",
  },
  {
    id: "storm",
    icon: `<i class="fa-solid fa-cloud-bolt"></i>`,
    title: "Thunderstorm",
    description: "Powerful thunder and heavy rain",
    category: "weather",
    backgroundImage: `https://cdn.pixabay.com/photo/2020/03/24/11/21/thunder-4963719_960_720.jpg`,
    path: "./assets/sounds/storm.ogg",
  },
  {
    id: "stream",
    icon: `<i style="transform: rotate(-90deg);" class="fa-solid fa-water"></i>`,
    title: "Stream",
    description: "Flowing water in a mountain creek",
    category: "nature",
    backgroundImage: `https://images.pexels.com/photos/15323324/pexels-photo-15323324.jpeg`,
    path: "./assets/sounds/stream.ogg",
  },
  {
    id: "waves",
    icon: `<i class='bx  bx-horizon-sea'></i> `,
    title: "Ocean Waves",
    description: "Calming waves on the beach",
    category: "nature",
    backgroundImage: ``,
    path: "./assets/sounds/waves.ogg",
  },
    {
    id: "wind",
    icon: `<i class="fa-solid fa-wind"></i>`,
    title: "Wind in Trees",
    description: "Gentle breeze through forest leaves",
    category: "weather",
    backgroundImage: ``,
    path: "./assets/sounds/wind.ogg",
  },

  {
    id: "boat",
    icon: `<i class="fa-solid fa-sailboat"></i>`,
    title: "Boat",
    description: "Calming waves against a boat",
    category: "nature",
    backgroundImage: ``,
    path: "./assets/sounds/boat.ogg",
  },
  // Remaining sounds in original order
  {
    id: "birds",
    icon: `<i class="fa-solid fa-dove"></i>`,
    title: "Singing Birds",
    description: "Gentle bird songs in a peaceful forest setting",
    category: "nature",
    backgroundImage: ``,
    path: "./assets/sounds/birds.ogg",
  },
  {
    id: "city",
    icon: `<i class="fa-solid fa-city"></i>`,
    title: "City Ambience",
    description: "Distant traffic and urban atmosphere",
    category: "urban",
    backgroundImage: ``,
    path: "./assets/sounds/city.ogg",
  },
  {
    id: "fireplace",
    icon: `<i class="fa-solid fa-fire"></i>`,
    title: "Crackling Fireplace",
    description: "Warm fireplace sounds for cozy evenings",
    category: "nature",
    backgroundImage: ``,
    path: "./assets/sounds/fireplace.ogg",
  },
  {
    id: "train",
    icon: `<i class="fa-solid fa-train-subway"></i>`,
    title: "Train Journey",
    description: "Rhythmic train sounds for focus",
    category: "urban",
    backgroundImage: ``,
    path: "./assets/sounds/train.ogg",
  },
  {
    id: "white-noise",
    icon: `<i class="fa-solid fa-wave-square"></i>`,
    title: "White Noise",
    description: "Neutral background sound for concentration",
    category: "noise",
    backgroundImage: "",
    path: "./assets/sounds/white-noise.ogg",
  },
  {
    id: "tea-stall",
    icon: `<i class="fa-solid fa-mug-hot"></i>`,
    title: "Tea Stall",
    description: "Subtle chatter and kettle sounds",
    category: "urban",
    backgroundImage: `https://images.unsplash.com/photo-1723127024366-58d9272b95a1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    path: "./assets/sounds/coffee-shop.ogg",
  },
  {
    id: "pink-noise",
    icon: `<i class="fa-solid fa-wave-square"></i>`,
    title: "Pink Noise",
    description: "Soothing frequency for relaxation",
    category: "noise",
    backgroundImage: "",
    path: "./assets/sounds/pink-noise.ogg",
  },
  {
    id: "summer-night",
    icon: `<i class="fa-solid fa-moon"></i>`,
    title: "Summer Night",
    description: "Crickets and night sounds in the countryside",
    category: "nature",
    backgroundImage: `https://images.unsplash.com/photo-1617872503735-8d9e7e703f9f?q=80&w=741&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    path: "./assets/sounds/summer-night.ogg",
  },
  {
    id: "bicycle",
    icon: `<i class="fa-solid fa-moon"></i>`,
    title: "Bicycle",
    description: "Sound of a bicycle bell",
    category: "nature",
    backgroundImage: `https://images.pexels.com/photos/31911503/pexels-photo-31911503.jpeg`,
    path: "./assets/sounds/summer-night.ogg",
  },
];

// Function to generate sound cards
function generateSoundCards(soundList) {
  const soundGrid = document.getElementById("soundGrid");
  soundGrid.innerHTML = "";

  if (soundList.length === 0) {
    soundGrid.innerHTML =
      '<p class="no-sounds-message">No sounds match your search. Try a different filter.</p>';
    return;
  }

  soundList.forEach((sound) => {
    const isActive = activeSounds[sound.id] ? "active" : "";
    const playIcon = activeSounds[sound.id] ? "fa-pause" : "fa-play";

    const card = document.createElement("div");
    card.className = `sound-card ${isActive}`;
    card.dataset.category = sound.category;

    card.innerHTML = `<div class="card-body" style="position: relative">
        <div>
          <div class="card-head">
            <div class="icon-title">
              ${sound.icon}
              <h3 class="sound-title">${sound.title}</h3>
            </div>
            <div class="info-icon">
              <i
                class="bx bx-info-circle modal-activator"
                data-sound-id="${sound.id}"
              ></i>
            </div>
          </div>
        </div>
        <div class="audio-player">
          <button class="play-btn" data-sound="${sound.id}">
            <i class="fas ${playIcon}"></i>
          </button>
          <div class="volume-control">
            <i class="fas fa-volume-up"></i>
            <input type="range" class="volume-slider" min="0" max="1" step="0.1"
            value="${ activeSounds[sound.id] ? activeSounds[sound.id].volume :
            "0.7" }" data-sound="${sound.id}">
          </div>
        </div>
      </div>`;

    soundGrid.appendChild(card);
  });





  // Add event listeners to play buttons
  document.querySelectorAll(".play-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const soundId = this.dataset.sound;
      toggleSound(soundId, this);
    });
  });

  // Add event listeners to volume sliders
  document.querySelectorAll(".volume-slider").forEach((slider) => {
    slider.addEventListener("input", function () {
      const soundId = this.dataset.sound;
      if (activeSounds[soundId]) {
        activeSounds[soundId].gainNode.gain.value = parseFloat(this.value);
        activeSounds[soundId].volume = parseFloat(this.value);
      }
    });
  });
}

// Function to toggle sound on/off
async function toggleSound(soundId, button) {
  // If sound is already playing, stop it
  if (activeSounds[soundId]) {
    stopSound(soundId);
    button.innerHTML = '<i class="fas fa-play"></i>';
    button.closest(".sound-card").classList.remove("active");
    return;
  }

  // Show loading state
  const originalHTML = button.innerHTML;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  // Find the sound data
  const soundData = sounds.find((s) => s.id === soundId);

  try {
    // Fetch the audio file
    const response = await fetch(soundData.path);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Create audio source and gain node
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();

    // Configure audio nodes
    source.buffer = audioBuffer;
    source.loop = true;
    gainNode.gain.value = 0.7;

    // Connect nodes: source -> gain -> master gain -> destination
    source.connect(gainNode);
    gainNode.connect(masterGain);

    // Start playback
    source.start(0);

    // Store reference to active sound
    activeSounds[soundId] = {
      source,
      gainNode,
      buffer: audioBuffer,
      volume: 0.7,
    };

    // Update UI
    button.innerHTML = '<i class="fas fa-pause"></i>';
    button.closest(".sound-card").classList.add("active");

    // Update active sounds display
    updateActiveSoundsDisplay();
  } catch (error) {
    console.error("Error loading or playing sound:", error);
    button.innerHTML = originalHTML;
    alert("Failed to load sound. Please try again.");
  }
}

// Function to stop a sound
function stopSound(soundId) {
  if (activeSounds[soundId]) {
    // Stop the audio source
    activeSounds[soundId].source.stop();

    // Remove from active sounds
    delete activeSounds[soundId];

    // Update active sounds display
    updateActiveSoundsDisplay();
  }
}

// Function to update active sounds display
function updateActiveSoundsDisplay() {
  const activeSoundsContainer = document.getElementById("activeSounds");
  const activeKeys = Object.keys(activeSounds);

  if (activeKeys.length === 0) {
    activeSoundsContainer.innerHTML =
      '<div class="no-sounds-message">No sounds currently playing. Select sounds to begin mixing.</div>';
    return;
  }

  activeSoundsContainer.innerHTML = "";

  activeKeys.forEach((soundId) => {
    const soundData = sounds.find((s) => s.id === soundId);
    const chip = document.createElement("div");
    chip.className = "active-sound-chip";
    chip.innerHTML = `
                    ${soundData.title}
                    <button onclick="stopSoundFromChip('${soundId}')">
                        <i class="fas fa-times"></i>
                    </button>
                `;
    activeSoundsContainer.appendChild(chip);
  });
}

// Function to stop sound from chip
function stopSoundFromChip(soundId) {
  const button = document.querySelector(`.play-btn[data-sound="${soundId}"]`);
  if (button) {
    button.innerHTML = '<i class="fas fa-play"></i>';
    button.closest(".sound-card").classList.remove("active");
  }
  stopSound(soundId);
  generateSoundCards(sounds);
}

// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  const icon = this.querySelector("i");
  const text = this.querySelector("span");

  if (document.body.classList.contains("dark-mode")) {
    icon.className = "fas fa-sun";
    text.textContent = "Light Mode";
  } else {
    icon.className = "fas fa-moon";
    text.textContent = "Dark Mode";
  }
});

// Filter functionality
const categoryButtons = document.querySelectorAll(".category-btn");
const searchInput = document.getElementById("searchInput");

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Update active state
    categoryButtons.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    // Filter sounds
    const category = this.dataset.category;
    filterSounds(category, searchInput.value);
  });
});

searchInput.addEventListener("input", function () {
  const activeCategory = document.querySelector(".category-btn.active").dataset
    .category;
  filterSounds(activeCategory, this.value);
});

function filterSounds(category, searchTerm) {
  let filteredSounds = sounds;

  // Filter by category
  if (category !== "all") {
    filteredSounds = filteredSounds.filter(
      (sound) => sound.category === category
    );
  }

  // Filter by search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredSounds = filteredSounds.filter(
      (sound) =>
        sound.title.toLowerCase().includes(term) ||
        sound.description.toLowerCase().includes(term) ||
        sound.category.toLowerCase().includes(term)
    );
  }

  // Regenerate sound cards
  generateSoundCards(filteredSounds);
}

// Initialize the page
generateSoundCards(sounds);
createBubbles();

