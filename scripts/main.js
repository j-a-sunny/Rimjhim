        // Create bubbles function
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

        // Audio context for advanced audio control
        let audioContext;
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            alert('Web Audio API is not supported in this browser');
        }
        
        // Master gain node for controlling overall volume
        const masterGain = audioContext.createGain();
        masterGain.gain.value = 0.7;
        masterGain.connect(audioContext.destination);
        
        // Currently playing sounds
        const activeSounds = {};
        
        // Update master volume when slider changes
        document.getElementById('masterVolume').addEventListener('input', function() {
            masterGain.gain.value = parseFloat(this.value);
        });
        
        // Sample sound data with categories
        const sounds = [
            { 
                id: 'birds', 
                title: 'Singing Birds', 
                description: 'Gentle bird songs in a peaceful forest setting', 
                category: 'nature',
                duration: '3:45',
                path: './assets/sounds/birds.ogg'
            },
            { 
                id: 'city', 
                title: 'City Ambience', 
                description: 'Distant traffic and urban atmosphere', 
                category: 'urban',
                duration: '4:20',
                path: 'https://assets.mixkit.co/sfx/preview/mixkit-city-traffic-outdoor-2469.mp3'
            },
            { 
                id: 'fireplace', 
                title: 'Crackling Fireplace', 
                description: 'Warm fireplace sounds for cozy evenings', 
                category: 'nature',
                duration: '5:10',
                path: 'https://assets.mixkit.co/sfx/preview/mixkit-crackling-fireplace-loop-1240.mp3'
            },
            { 
                id: 'rain', 
                title: 'Gentle Rain', 
                description: 'Soft rainfall on leaves and rooftops', 
                category: 'weather',
                duration: '6:15',
                path: 'https://assets.mixkit.co/sfx/preview/mixkit-rain-loop-1241.mp3'
            },
            { 
                id: 'stream', 
                title: 'Mountain Stream', 
                description: 'Flowing water in a mountain creek', 
                category: 'nature',
                duration: '4:50',
                path: 'https://assets.mixkit.co/sfx/preview/mixkit-mountain-stream-loop-1244.mp3'
            },
            { 
                id: 'train', 
                title: 'Train Journey', 
                description: 'Rhythmic train sounds for focus', 
                category: 'urban',
                duration: '7:05',
                path: 'https://assets.mixkit.co/sfx/preview/mixkit-train-passing-by-1247.mp3'
            },
            { 
                id: 'white-noise', 
                title: 'White Noise', 
                description: 'Neutral background sound for concentration', 
                category: 'noise',
                duration: '8:00',
                path: 'https://assets.mixkit.co/sfx/preview/mixkit-wind-in-the-trees-1243.mp3'
            },
            { 
                id: 'boat', 
                title: 'Ocean Waves', 
                description: 'Calming waves against a boat', 
                category: 'nature',
                duration: '5:30',
                path: 'https://assets.mixkit.co/sfx/preview/mixkit-ocean-waves-loop-1245.mp3'
            },
            { 
                id: 'coffee-shop', 
                title: 'Coffee Shop', 
                description: 'Subtle chatter and espresso sounds', 
                category: 'urban',
                duration: '4:45',
                path: 'https://assets.mixkit.co/sfx/preview/mixkit-restaurant-crowd-talking-ambience-444.mp3'
            },
            { 
                id: 'pink-noise', 
                title: 'Pink Noise', 
                description: 'Soothing frequency for relaxation', 
                category: 'noise',
                duration: '6:30',
                path: 'https://assets.mixkit.co/sfx/preview/mixkit-wind-in-the-trees-1243.mp3'
            },
            { 
                id: 'storm', 
                title: 'Thunderstorm', 
                description: 'Powerful thunder and heavy rain', 
                category: 'weather',
                duration: '5:55',
                path: 'https://assets.mixkit.co/sfx/preview/mixkit-thunder-ambience-1246.mp3'
            },
            { 
                id: 'summer-night', 
                title: 'Summer Night', 
                description: 'Crickets and night sounds in the countryside', 
                category: 'nature',
                duration: '6:10',
                path: 'https://assets.mixkit.co/sfx/preview/mixkit-night-crickets-and-insects-in-wild-ambience-1254.mp3'
            },
            { 
                id: 'waves', 
                title: 'Ocean Waves', 
                description: 'Calming waves on the beach', 
                category: 'nature',
                duration: '7:20',
                path: 'https://assets.mixkit.co/sfx/preview/mixkit-ocean-waves-loop-1245.mp3'
            },
            { 
                id: 'wind', 
                title: 'Wind in Trees', 
                description: 'Gentle breeze through forest leaves', 
                category: 'weather',
                duration: '4:25',
                path: 'https://assets.mixkit.co/sfx/preview/mixkit-wind-in-the-trees-1243.mp3'
            }
        ];
        
        // Image mapping for sound categories
        const categoryImages = {
            nature: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80',
            weather: 'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?auto=format&fit=crop&w=600&q=80',
            urban: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80',
            noise: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?auto=format&fit=crop&w=600&q=80'
        };
        
        // Function to generate sound cards
        function generateSoundCards(soundList) {
            const soundGrid = document.getElementById('soundGrid');
            soundGrid.innerHTML = '';
            
            if (soundList.length === 0) {
                soundGrid.innerHTML = '<p class="no-sounds-message">No sounds match your search. Try a different filter.</p>';
                return;
            }
            
            soundList.forEach(sound => {
                const isActive = activeSounds[sound.id] ? 'active' : '';
                const playIcon = activeSounds[sound.id] ? 'fa-pause' : 'fa-play';
                
                const card = document.createElement('div');
                card.className = `sound-card ${isActive}`;
                card.dataset.category = sound.category;
                
                card.innerHTML = `
                    <div class="card-header">
                        <img src="${categoryImages[sound.category]}" alt="${sound.title}" class="card-image">
                        <span class="sound-category">${sound.category.charAt(0).toUpperCase() + sound.category.slice(1)}</span>
                    </div>
                    <div class="card-body">
                        <h3 class="sound-title">${sound.title}</h3>
                        <p class="sound-description">${sound.description}</p>
                        <div class="audio-player">
                            <button class="play-btn" data-sound="${sound.id}">
                                <i class="fas ${playIcon}"></i>
                            </button>
                            <div class="volume-control">
                                <i class="fas fa-volume-up"></i>
                                <input type="range" class="volume-slider" min="0" max="1" step="0.1" value="${activeSounds[sound.id] ? activeSounds[sound.id].volume : '0.7'}" data-sound="${sound.id}">
                            </div>
                        </div>
                    </div>
                `;
                
                soundGrid.appendChild(card);
            });
            
            // Add event listeners to play buttons
            document.querySelectorAll('.play-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const soundId = this.dataset.sound;
                    toggleSound(soundId, this);
                });
            });
            
            // Add event listeners to volume sliders
            document.querySelectorAll('.volume-slider').forEach(slider => {
                slider.addEventListener('input', function() {
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
                button.closest('.sound-card').classList.remove('active');
                return;
            }
            
            // Show loading state
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            // Find the sound data
            const soundData = sounds.find(s => s.id === soundId);
            
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
                    volume: 0.7
                };
                
                // Update UI
                button.innerHTML = '<i class="fas fa-pause"></i>';
                button.closest('.sound-card').classList.add('active');
                
                // Update active sounds display
                updateActiveSoundsDisplay();
            } catch (error) {
                console.error('Error loading or playing sound:', error);
                button.innerHTML = originalHTML;
                alert('Failed to load sound. Please try again.');
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
            const activeSoundsContainer = document.getElementById('activeSounds');
            const activeKeys = Object.keys(activeSounds);
            
            if (activeKeys.length === 0) {
                activeSoundsContainer.innerHTML = '<div class="no-sounds-message">No sounds currently playing. Select sounds to begin mixing.</div>';
                return;
            }
            
            activeSoundsContainer.innerHTML = '';
            
            activeKeys.forEach(soundId => {
                const soundData = sounds.find(s => s.id === soundId);
                const chip = document.createElement('div');
                chip.className = 'active-sound-chip';
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
                button.closest('.sound-card').classList.remove('active');
            }
            stopSound(soundId);
            generateSoundCards(sounds);
        }
        
        // Theme toggle functionality
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            const text = this.querySelector('span');
            
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
                text.textContent = 'Light Mode';
            } else {
                icon.className = 'fas fa-moon';
                text.textContent = 'Dark Mode';
            }
        });
        
        // Filter functionality
        const categoryButtons = document.querySelectorAll('.category-btn');
        const searchInput = document.getElementById('searchInput');
        
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active state
                categoryButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter sounds
                const category = this.dataset.category;
                filterSounds(category, searchInput.value);
            });
        });
        
        searchInput.addEventListener('input', function() {
            const activeCategory = document.querySelector('.category-btn.active').dataset.category;
            filterSounds(activeCategory, this.value);
        });
        
        function filterSounds(category, searchTerm) {
            let filteredSounds = sounds;
            
            // Filter by category
            if (category !== 'all') {
                filteredSounds = filteredSounds.filter(sound => sound.category === category);
            }
            
            // Filter by search term
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                filteredSounds = filteredSounds.filter(sound => 
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
