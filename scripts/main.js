import { initializeApp } from './sound-player.js';
import { setupThemeToggle } from './theme-manager.js';
import { setupUIInteractions } from './ui-interactions.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    initializeApp();
    
    // Set up theme toggle
    setupThemeToggle();
    
    // Set up UI interactions
    setupUIInteractions();
});