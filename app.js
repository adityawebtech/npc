// Minecraft Nether Portal Calculator - Completely Fixed Version
console.log('Starting Nether Portal Calculator...');

// Global variables
let portals = [];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing...');
    
    // Load saved portals
    loadPortals();
    
    // Setup all functionality
    setupTabs();
    setupCoordinateCalculator();
    setupConstructionCalculator();
    setupPortalTracker();
    
    // Initialize defaults
    initializeDefaults();
    
    console.log('Initialization complete!');
});

// Tab Navigation
function setupTabs() {
    console.log('Setting up tabs...');
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    console.log(`Found ${tabButtons.length} tabs and ${tabContents.length} contents`);
    
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetTab = this.getAttribute('data-tab');
            console.log(`Switching to tab: ${targetTab}`);
            
            // Hide all content
            tabContents.forEach(function(content) {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Remove active from all buttons
            tabButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            // Show target content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
                console.log(`Tab ${targetTab} activated successfully`);
            } else {
                console.error(`Target content not found: ${targetTab}`);
            }
            
            // Activate clicked button
            this.classList.add('active');
        });
    });
    
    // Make sure coordinates tab is active by default
    const coordsTab = document.getElementById('coordinates');
    if (coordsTab) {
        coordsTab.style.display = 'block';
        coordsTab.classList.add('active');
    }
}

// Coordinate Calculator
function setupCoordinateCalculator() {
    console.log('Setting up coordinate calculator...');
    
    const convertToNetherBtn = document.getElementById('convert-to-nether');
    const convertToOverworldBtn = document.getElementById('convert-to-overworld');
    const copyBtn = document.getElementById('copy-coordinates');
    const clearBtn = document.getElementById('clear-coordinates');
    
    // Convert to Nether
    if (convertToNetherBtn) {
        convertToNetherBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Convert to Nether clicked');
            
            const overworldX = document.getElementById('overworld-x');
            const overworldY = document.getElementById('overworld-y');
            const overworldZ = document.getElementById('overworld-z');
            const netherX = document.getElementById('nether-x');
            const netherY = document.getElementById('nether-y');
            const netherZ = document.getElementById('nether-z');
            const resultDisplay = document.getElementById('conversion-result');
            
            if (overworldX && overworldY && overworldZ && netherX && netherY && netherZ) {
                const x = parseFloat(overworldX.value) || 0;
                const y = parseFloat(overworldY.value) || 0;
                const z = parseFloat(overworldZ.value) || 0;
                
                console.log(`Converting: ${x}, ${y}, ${z}`);
                
                const netherCoords = {
                    x: Math.floor(x / 8),
                    y: Math.floor(y),
                    z: Math.floor(z / 8)
                };
                
                console.log(`Result: ${netherCoords.x}, ${netherCoords.y}, ${netherCoords.z}`);
                
                netherX.value = netherCoords.x;
                netherY.value = netherCoords.y;
                netherZ.value = netherCoords.z;
                
                if (resultDisplay) {
                    resultDisplay.textContent = `Overworld (${x}, ${y}, ${z}) → Nether (${netherCoords.x}, ${netherCoords.y}, ${netherCoords.z})`;
                    resultDisplay.className = 'result-display success';
                }
                
                showMessage('Coordinates converted to Nether!', 'success');
            } else {
                console.error('Input elements not found');
                showMessage('Error: Input elements not found', 'error');
            }
        });
    } else {
        console.error('Convert to Nether button not found');
    }
    
    // Convert to Overworld
    if (convertToOverworldBtn) {
        convertToOverworldBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Convert to Overworld clicked');
            
            const overworldX = document.getElementById('overworld-x');
            const overworldY = document.getElementById('overworld-y');
            const overworldZ = document.getElementById('overworld-z');
            const netherX = document.getElementById('nether-x');
            const netherY = document.getElementById('nether-y');
            const netherZ = document.getElementById('nether-z');
            const resultDisplay = document.getElementById('conversion-result');
            
            if (overworldX && overworldY && overworldZ && netherX && netherY && netherZ) {
                const x = parseFloat(netherX.value) || 0;
                const y = parseFloat(netherY.value) || 0;
                const z = parseFloat(netherZ.value) || 0;
                
                console.log(`Converting: ${x}, ${y}, ${z}`);
                
                const overworldCoords = {
                    x: Math.floor(x * 8),
                    y: Math.floor(y),
                    z: Math.floor(z * 8)
                };
                
                console.log(`Result: ${overworldCoords.x}, ${overworldCoords.y}, ${overworldCoords.z}`);
                
                overworldX.value = overworldCoords.x;
                overworldY.value = overworldCoords.y;
                overworldZ.value = overworldCoords.z;
                
                if (resultDisplay) {
                    resultDisplay.textContent = `Nether (${x}, ${y}, ${z}) → Overworld (${overworldCoords.x}, ${overworldCoords.y}, ${overworldCoords.z})`;
                    resultDisplay.className = 'result-display success';
                }
                
                showMessage('Coordinates converted to Overworld!', 'success');
            } else {
                console.error('Input elements not found');
                showMessage('Error: Input elements not found', 'error');
            }
        });
    } else {
        console.error('Convert to Overworld button not found');
    }
    
    // Copy coordinates
    if (copyBtn) {
        copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const overworldX = document.getElementById('overworld-x').value;
            const overworldY = document.getElementById('overworld-y').value;
            const overworldZ = document.getElementById('overworld-z').value;
            const netherX = document.getElementById('nether-x').value;
            const netherY = document.getElementById('nether-y').value;
            const netherZ = document.getElementById('nether-z').value;
            
            const text = `Overworld: ${overworldX}, ${overworldY}, ${overworldZ}\nNether: ${netherX}, ${netherY}, ${netherZ}`;
            copyToClipboard(text);
            showMessage('Coordinates copied to clipboard!', 'success');
        });
    }
    
    // Clear coordinates
    if (clearBtn) {
        clearBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.getElementById('overworld-x').value = '';
            document.getElementById('overworld-y').value = '';
            document.getElementById('overworld-z').value = '';
            document.getElementById('nether-x').value = '';
            document.getElementById('nether-y').value = '';
            document.getElementById('nether-z').value = '';
            
            const resultDisplay = document.getElementById('conversion-result');
            if (resultDisplay) {
                resultDisplay.textContent = 'Enter coordinates and click convert to see results';
                resultDisplay.className = 'result-display';
            }
            
            showMessage('Coordinates cleared!', 'success');
        });
    }
    
    console.log('Coordinate calculator setup complete');
}

// Construction Calculator
function setupConstructionCalculator() {
    console.log('Setting up construction calculator...');
    
    const widthInput = document.getElementById('portal-width');
    const heightInput = document.getElementById('portal-height');
    const includeCornersCheckbox = document.getElementById('include-corners');
    const calculateBtn = document.getElementById('calculate-obsidian');
    
    function updateCalculation() {
        console.log('Updating obsidian calculation...');
        
        const width = parseInt(widthInput.value) || 4;
        const height = parseInt(heightInput.value) || 5;
        const includeCorners = includeCornersCheckbox ? includeCornersCheckbox.checked : false;
        
        console.log(`Portal: ${width}x${height}, corners: ${includeCorners}`);
        
        if (width >= 4 && width <= 23 && height >= 5 && height <= 23) {
            const obsidianNeeded = calculateObsidianBlocks(width, height, includeCorners);
            displayObsidianResults(obsidianNeeded, width, height, includeCorners);
            updatePortalSchematic(width, height);
            console.log(`Calculated ${obsidianNeeded} obsidian blocks`);
        } else {
            console.log('Invalid portal dimensions');
        }
    }
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            updateCalculation();
        });
    }
    
    // Auto-update on input changes
    if (widthInput) {
        widthInput.addEventListener('input', updateCalculation);
    }
    if (heightInput) {
        heightInput.addEventListener('input', updateCalculation);
    }
    if (includeCornersCheckbox) {
        includeCornersCheckbox.addEventListener('change', updateCalculation);
    }
    
    console.log('Construction calculator setup complete');
}

// Portal Tracker
function setupPortalTracker() {
    console.log('Setting up portal tracker...');
    
    const form = document.getElementById('add-portal-form');
    const exportBtn = document.getElementById('export-portals');
    const importBtn = document.getElementById('import-portals');
    const fileInput = document.getElementById('file-input');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addPortal();
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            exportPortals();
        });
    }
    
    if (importBtn && fileInput) {
        importBtn.addEventListener('click', function(e) {
            e.preventDefault();
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function(e) {
            importPortals(e);
        });
    }
    
    renderPortalList();
    console.log('Portal tracker setup complete');
}

// Helper Functions
function calculateObsidianBlocks(width, height, includeCorners) {
    const baseBlocks = 2 * (width + height) - 4;
    return includeCorners ? baseBlocks + 4 : baseBlocks;
}

function updatePortalSchematic(width, height) {
    const container = document.getElementById('portal-schematic');
    if (!container) return;
    
    if (width < 4 || width > 23 || height < 5 || height > 23) {
        container.innerHTML = '<p>Invalid dimensions. Width: 4-23, Height: 5-23</p>';
        return;
    }
    
    const grid = document.createElement('div');
    grid.className = 'schematic-grid';
    grid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const block = document.createElement('div');
            block.className = 'schematic-block';
            
            if (row === 0 || row === height - 1 || col === 0 || col === width - 1) {
                block.classList.add('obsidian-block');
            } else {
                block.classList.add('air-block');
            }
            
            grid.appendChild(block);
        }
    }
    
    container.innerHTML = '';
    container.appendChild(grid);
}

function displayObsidianResults(obsidianNeeded, width, height, includeCorners) {
    const container = document.getElementById('obsidian-results');
    if (!container) return;
    
    const stacks = Math.ceil(obsidianNeeded / 64);
    const remainder = obsidianNeeded % 64;
    const miningTime = Math.ceil(obsidianNeeded * 9.4 / 60);
    
    container.innerHTML = `
        <h3 class="section-title">📊 Obsidian Requirements</h3>
        <div class="obsidian-info">
            <div class="obsidian-stat">
                <div class="obsidian-number">${obsidianNeeded}</div>
                <div class="obsidian-label">Total Blocks</div>
            </div>
            <div class="obsidian-stat">
                <div class="obsidian-number">${stacks}</div>
                <div class="obsidian-label">Stacks (64)</div>
            </div>
            <div class="obsidian-stat">
                <div class="obsidian-number">${remainder}</div>
                <div class="obsidian-label">Extra Blocks</div>
            </div>
            <div class="obsidian-stat">
                <div class="obsidian-number">${width}×${height}</div>
                <div class="obsidian-label">Portal Size</div>
            </div>
        </div>
        <p><strong>Note:</strong> ${includeCorners ? 'Includes corner blocks' : 'Standard frame only'}</p>
        <p><strong>Mining Time:</strong> ~${miningTime} minutes with Diamond Pickaxe</p>
    `;
}

function addPortal() {
    const nameInput = document.getElementById('portal-name');
    const xInput = document.getElementById('portal-overworld-x');
    const yInput = document.getElementById('portal-overworld-y');
    const zInput = document.getElementById('portal-overworld-z');
    const notesInput = document.getElementById('portal-notes');
    
    const name = nameInput.value.trim();
    const x = parseInt(xInput.value);
    const y = parseInt(yInput.value);
    const z = parseInt(zInput.value);
    const notes = notesInput ? notesInput.value.trim() : '';
    
    if (!name || isNaN(x) || isNaN(y) || isNaN(z)) {
        showMessage('Please fill in all required fields with valid coordinates', 'error');
        return;
    }
    
    const netherCoords = {
        x: Math.floor(x / 8),
        y: y,
        z: Math.floor(z / 8)
    };
    
    const portal = {
        id: Date.now(),
        name: name,
        overworld: { x: x, y: y, z: z },
        nether: netherCoords,
        notes: notes,
        created: new Date().toISOString()
    };
    
    portals.push(portal);
    savePortals();
    renderPortalList();
    
    // Clear form
    nameInput.value = '';
    xInput.value = '';
    yInput.value = '';
    zInput.value = '';
    if (notesInput) notesInput.value = '';
    
    showMessage(`Portal "${name}" added successfully!`, 'success');
}

function deletePortal(id) {
    portals = portals.filter(function(portal) {
        return portal.id !== id;
    });
    savePortals();
    renderPortalList();
    showMessage('Portal deleted successfully!', 'success');
}

function copyPortalCoords(id) {
    const portal = portals.find(function(p) {
        return p.id === id;
    });
    
    if (portal) {
        const text = `${portal.name}:\nOverworld: ${portal.overworld.x}, ${portal.overworld.y}, ${portal.overworld.z}\nNether: ${portal.nether.x}, ${portal.nether.y}, ${portal.nether.z}`;
        copyToClipboard(text);
        showMessage('Portal coordinates copied!', 'success');
    }
}

function renderPortalList() {
    const container = document.getElementById('portal-list');
    if (!container) return;
    
    if (portals.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🌀</div>
                <p>No portals saved yet. Add your first portal above!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = portals.map(function(portal) {
        return `
            <div class="portal-item">
                <div class="portal-header">
                    <div class="portal-name">${escapeHtml(portal.name)}</div>
                    <div class="portal-actions">
                        <button class="btn btn--outline btn--sm" onclick="copyPortalCoords(${portal.id})">📋</button>
                        <button class="btn btn--outline btn--sm" onclick="deletePortal(${portal.id})">🗑️</button>
                    </div>
                </div>
                <div class="portal-coords">
                    <div class="coord-group">
                        <div class="coord-label">🌍 Overworld</div>
                        <div class="coord-values">${portal.overworld.x}, ${portal.overworld.y}, ${portal.overworld.z}</div>
                    </div>
                    <div class="coord-group">
                        <div class="coord-label">🔥 Nether</div>
                        <div class="coord-values">${portal.nether.x}, ${portal.nether.y}, ${portal.nether.z}</div>
                    </div>
                </div>
                ${portal.notes ? `<div class="portal-notes">${escapeHtml(portal.notes)}</div>` : ''}
            </div>
        `;
    }).join('');
}

function exportPortals() {
    const data = {
        portals: portals,
        exported: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nether-portals-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showMessage('Portals exported successfully!', 'success');
}

function importPortals(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.portals && Array.isArray(data.portals)) {
                portals = portals.concat(data.portals);
                savePortals();
                renderPortalList();
                showMessage(`Imported ${data.portals.length} portals successfully!`, 'success');
            } else {
                showMessage('Invalid file format', 'error');
            }
        } catch (error) {
            showMessage('Error reading file: ' + error.message, 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function loadPortals() {
    try {
        const stored = localStorage.getItem('nether-portals');
        portals = stored ? JSON.parse(stored) : [];
        console.log(`Loaded ${portals.length} portals`);
    } catch (error) {
        console.error('Error loading portals:', error);
        portals = [];
    }
}

function savePortals() {
    try {
        localStorage.setItem('nether-portals', JSON.stringify(portals));
        console.log(`Saved ${portals.length} portals`);
    } catch (error) {
        console.error('Error saving portals:', error);
    }
}

function initializeDefaults() {
    console.log('Initializing defaults...');
    
    // Initialize portal schematic
    updatePortalSchematic(4, 5);
    
    // Initialize obsidian calculation
    displayObsidianResults(10, 4, 5, false);
    
    // Set default result message
    const resultDisplay = document.getElementById('conversion-result');
    if (resultDisplay) {
        resultDisplay.textContent = 'Enter coordinates and click convert to see results';
        resultDisplay.className = 'result-display';
    }
}

function showMessage(message, type) {
    console.log(`${type.toUpperCase()}: ${message}`);
    
    // Remove existing messages
    const existing = document.querySelectorAll('.success-message, .error-message');
    existing.forEach(function(el) {
        el.remove();
    });
    
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    const container = document.querySelector('.main-content .container');
    if (container) {
        container.insertBefore(messageDiv, container.firstChild);
        
        setTimeout(function() {
            messageDiv.remove();
        }, 4000);
    }
}

async function copyToClipboard(text) {
    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    } catch (error) {
        console.error('Error copying to clipboard:', error);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions globally available for onclick handlers
window.deletePortal = deletePortal;
window.copyPortalCoords = copyPortalCoords;

console.log('Nether Portal Calculator script loaded successfully!');
