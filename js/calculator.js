document.addEventListener('DOMContentLoaded', () => {
    // Mode toggle functionality
    const modeButtons = document.querySelectorAll('.mode-toggle button');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.querySelector('.result');
    
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    // Calculate function
    calculateBtn.addEventListener('click', () => {
        const activeMode = document.querySelector('.mode-toggle button.active').dataset.mode;
        const x = parseFloat(document.getElementById('x-input').value);
        const y = parseFloat(document.getElementById('y-input').value);
        const z = parseFloat(document.getElementById('z-input').value);
        const edition = document.querySelector('input[name="edition"]:checked').value;
        
        if (isNaN(x) || isNaN(y) || isNaN(z)) {
            resultDiv.textContent = "❌ Please enter valid coordinates for all fields!";
            return;
        }
        
        let result;
        if (activeMode === "overworld-to-nether") {
            const netherX = x / 8;
            const netherZ = z / 8;
            result = `Nether Coordinates: X = ${netherX.toFixed(2)}, Y = ${y}, Z = ${netherZ.toFixed(2)}`;
        } else {
            const overworldX = x * 8;
            const overworldZ = z * 8;
            result = `Overworld Coordinates: X = ${overworldX.toFixed(2)}, Y = ${y}, Z = ${overworldZ.toFixed(2)}`;
        }
        
        // Add edition-specific note
        if (edition === "bedrock") {
            result += " (Bedrock Edition - verify chunk alignment)";
        } else {
            result += " (Java Edition)";
        }
        
        resultDiv.textContent = result;
    });
});
