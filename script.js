class CorvetteGallery {
    constructor() {
        this.designs = [];
        this.filteredDesigns = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.init();
    }

    async init() {
		this.initTheme(); // Initialize theme first
        await this.loadDesigns();
        this.setupEventListeners();
		this.renderInstallInstructions();
        this.renderGallery();
    }

    initTheme() {
        // Check if user has a saved theme preference, otherwise default to dark
        const savedTheme = localStorage.getItem('corvette-theme');
        const defaultTheme = savedTheme || 'dark';
        
        // Apply the theme
        document.documentElement.setAttribute('data-theme', defaultTheme);
        
        // Update toggle button icon
        this.updateThemeToggleIcon(defaultTheme);
        
        // Setup theme toggle listener
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('corvette-theme', newTheme);
        this.updateThemeToggleIcon(newTheme);
    }

    updateThemeToggleIcon(theme) {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    async loadDesigns() {
        try {
            const response = await fetch('designs/index.json');
            if (!response.ok) {
                throw new Error('Failed to load designs index');
            }
            const data = await response.json();
            this.designs = data.designs || [];
            this.filteredDesigns = [...this.designs];
        } catch (error) {
            console.error('Error loading designs:', error);
            this.showError('Failed to load designs. Please check if designs/index.json exists.');
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterDesigns();
            });
        }

        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                
                this.currentFilter = e.target.dataset.filter;
                this.filterDesigns();
            });
        });
    }

    filterDesigns() {
        this.filteredDesigns = this.designs.filter(design => {
            // Filter by category
            const matchesFilter = this.currentFilter === 'all' || 
                                (design.tags && design.tags.includes(this.currentFilter));
            
            // Filter by search term
            const matchesSearch = this.searchTerm === '' ||
                                design.name.toLowerCase().includes(this.searchTerm) ||
                                design.author.toLowerCase().includes(this.searchTerm) ||
                                design.description.toLowerCase().includes(this.searchTerm) ||
                                (design.tags && design.tags.some(tag => 
                                    tag.toLowerCase().includes(this.searchTerm)));
            
            return matchesFilter && matchesSearch;
        });
        
        this.renderGallery();
    }

	renderInstallInstructions() {
		const main = document.querySelector('main');
		if (!main) return;

		const gallerySection = document.querySelector('.gallery-section');
		const section = document.createElement('section');
		section.className = 'instructions-section';
		section.innerHTML = `
			<h2>Share and Import Corvettes (Objects JSON)</h2>
			<div class="upload-instructions">
				<p><strong>Which player is this site for?</strong> Browsing and downloading designs here makes you <strong>Player 2 (Importer)</strong>. If you want to publish your own design to this site, you act as <strong>Player 1 (Sharer)</strong> by exporting your <code>Objects</code> and submitting a PR to add it to the gallery.</p>
				<p><strong>Safety:</strong> Always back up/copy your save data before accessing/editing JSON files. Changing JSON data can break your save.</p>
				<h3>Tooling</h3>
				<p>Use the lightweight Python utilities to export and reinsert a ship-associated base <code>Objects</code> payload. See <a href="https://github.com/Effex-D/nms-corvette-sharing/" target="_blank" rel="noopener">nms-corvette-sharing</a> for details.</p>
				<h3>To Share (Player 1)</h3>
				<ol>
					<li>Export your save to JSON (e.g., with NomNom).</li>
					<li>Run exporter, e.g.: <code>python nms_objects_exporter.py --input /path/to/save.json --ship \"Exact Ship Name\" --output ./objects.json --tolerance-seconds 60</code></li>
					<li>Share <code>objects.json</code> via a paste/link service.</li>
				</ol>
				<h3>To Import (Player 2)</h3>
				<ol>
					<li>Create a corvette to overwrite, then equip a different ship.</li>
					<li>Save by entering/exiting the cockpit, then exit the game.</li>
					<li>Run inserter, e.g.: <code>python nms_objects_inserter.py --save-in /path/to/save.json --ship \"Exact Ship Name\" --objects ./objects.json --save-out ./patched_save.json --tolerance-seconds 60</code></li>
					<li>Load your patched save and verify the ship.</li>
				</ol>
				<p><em>Notes:</em> Increase <code>--tolerance-seconds</code> if the base isn’t matched; only the matched base’s <code>Objects</code> field is modified. Guidance adapted from <a href="https://www.nexusmods.com/nomanssky/mods/3791?tab=posts" target="_blank" rel="noopener">Nexus Mods posts</a>.</p>
			</div>
		`;

		if (gallerySection && gallerySection.parentNode) {
			gallerySection.parentNode.insertBefore(section, gallerySection);
		} else {
			main.appendChild(section);
		}
	}

    renderGallery() {
        const gallery = document.getElementById('designGallery');
        if (!gallery) return;

        if (this.filteredDesigns.length === 0) {
            gallery.innerHTML = this.searchTerm || this.currentFilter !== 'all' 
                ? '<div class="error">No designs match your current filters.</div>'
                : '<div class="loading">No designs available yet. Be the first to contribute!</div>';
            return;
        }

        gallery.innerHTML = this.filteredDesigns.map(design => this.createDesignCard(design)).join('');
        
        // Add click listeners to cards
        this.setupCardListeners();
    }

    createDesignCard(design) {
        const imagePath = design.image ? `designs/images/${design.image}` : 'https://via.placeholder.com/300x200?text=No+Image';
        const tags = design.tags ? design.tags.map(tag => `<span class="design-tag">${tag}</span>`).join('') : '';
        
        return `
            <div class="design-card" data-design='${JSON.stringify(design)}'>
                <img src="${imagePath}" alt="${design.name}" class="design-image" 
                     onerror="this.src='https://via.placeholder.com/300x200?text=Image+Not+Found'">
                <div class="design-info">
                    <div class="design-title">${design.name}</div>
                    <div class="design-author">by ${design.author}</div>
                    <div class="design-description">${design.description}</div>
                    <div class="design-tags">${tags}</div>
                    <div class="design-stats">
                        <span>Added: ${new Date(design.dateAdded).toLocaleDateString()}</span>
                        <span>Version: ${design.version || '1.0'}</span>
                    </div>
                </div>
            </div>
        `;
    }

    setupCardListeners() {
        const cards = document.querySelectorAll('.design-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const designData = JSON.parse(card.dataset.design);
                this.showDesignModal(designData);
            });
        });
    }

    showDesignModal(design) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('designModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'designModal';
            modal.className = 'modal';
            document.body.appendChild(modal);
        }

        const imagePath = design.image ? `designs/images/${design.image}` : 'https://via.placeholder.com/400x300?text=No+Image';
        const tags = design.tags ? design.tags.map(tag => `<span class="design-tag">${tag}</span>`).join('') : '';
        const downloadLink = design.dataFile ? `designs/data/${design.dataFile}` : '#';
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>${design.name}</h2>
                <img src="${imagePath}" alt="${design.name}" style="width: 100%; max-width: 400px; border-radius: 10px; margin: 1rem 0;"
                     onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'">
                <p><strong>Author:</strong> ${design.author}</p>
                <p><strong>Description:</strong> ${design.description}</p>
                <p><strong>Version:</strong> ${design.version || '1.0'}</p>
                <p><strong>Date Added:</strong> ${new Date(design.dateAdded).toLocaleDateString()}</p>
                <div style="margin: 1rem 0;">
                    <strong>Tags:</strong> ${tags}
                </div>
                ${design.specifications ? `
                    <div style="margin: 1rem 0;">
                        <strong>Specifications:</strong>
                        <ul style="margin-left: 1rem;">
                            ${Object.entries(design.specifications).map(([key, value]) => 
                                `<li><strong>${key}:</strong> ${value}</li>`
                            ).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${design.buildNotes && design.buildNotes.length ? `
                    <div style="margin: 1rem 0;">
                        <strong>Build Notes:</strong>
                        <ul style=\"margin-left: 1rem;\">${design.buildNotes.map(n => `<li>${n}</li>`).join('')}</ul>
                    </div>
                ` : ''}
                ${design.dataFile ? `
                    <div style="margin: 1rem 0;">
                        <a href="${downloadLink}" download style="background: #667eea; color: white; padding: 0.5rem 1rem; border-radius: 5px; text-decoration: none; display: inline-block;">
                            📁 Download Objects (Player 2)
                        </a>
                    </div>
                ` : ''}
            </div>
        `;

        modal.style.display = 'block';

        // Close modal functionality
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    showError(message) {
        const gallery = document.getElementById('designGallery');
        if (gallery) {
            gallery.innerHTML = `<div class="error">${message}</div>`;
        }
    }
}

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CorvetteGallery();
});