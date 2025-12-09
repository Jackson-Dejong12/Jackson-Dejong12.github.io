const productData = {
    sweatshirt: {
        name: "Duck Sweatshirt",
        colors: ["black", "charcoal", "yellow", "green"],
        sizes: ["XS", "S", "M", "L", "XL"],
        baseImage: "images/mens-colosseum-black-oregon-ducks-blackout-30-pullover-hoodie_pi4331000_ff_4331008-2bde1cbebbc96261eb6f_full.avif",
        colorImages: {
            black: "images/mens-colosseum-black-oregon-ducks-blackout-30-pullover-hoodie_pi4331000_ff_4331008-2bde1cbebbc96261eb6f_full.avif",
            charcoal: "images/mens-colosseum-charcoal-oregon-ducks-arch-and-logo-30-pullover-hoodie_pi4333000_altimages_ff_4333317-fc6e904c83151894ccc0alt1_full.avif",
            yellow: "images/mens-colosseum-yellow-oregon-ducks-arch-and-logo-30-pullover-hoodie_pi4333000_altimages_ff_4333321-dda84a08098e4b7b95cdalt1_full.avif",
            green: "images/mens-colosseum-green-oregon-ducks-arch-and-logo-30-pullover-hoodie_pi4333000_altimages_ff_4333319-7886c64a5a2ed70b1b64alt1_full.avif"
        }
    },
    pants: {
        name: "Duck Pants",
        colors: ["grey", "black", "white"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        baseImage: "images/HVWB16ORG6_800x black.webp",
        colorImages: {
            grey: "images/HVWB16ORG005_800x grey.webp",
            black: "images/HVWB16ORG6_800x black.webp",
            white: "images/HVWB16ORG003_800x white.webp"
        }
    },
    jacket: {
        name: "Duck Jacket",
        colors: ["black", "white"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        baseImage: "images/mens-cutter-and-buck-black-oregon-ducks-adapt-eco-knit-quarter-zip-pullover-jacket_pi4433000_ff_4433367-5f541a60a34886dfe9a0_full black.avif",
        colorImages: {
            black: "images/mens-cutter-and-buck-black-oregon-ducks-adapt-eco-knit-quarter-zip-pullover-jacket_pi4433000_ff_4433367-5f541a60a34886dfe9a0_full black.avif",
            white: "images/mens-cutter-and-buck-white-oregon-ducks-adapt-eco-knit-quarter-zip-pullover-jacket_pi4433000_ff_4433415-be4191098aa8c7782554_full white.avif"
        }
    }
};

// Array of popular combinations for gallery
const popularCombinations = [
    { type: "sweatshirt", color: "black", size: "M" },
    { type: "pants", color: "black", size: "L" },
    { type: "jacket", color: "black", size: "M" },
    { type: "sweatshirt", color: "green", size: "S" },
    { type: "pants", color: "grey", size: "XL" }
];

// Current selection state
let currentSelection = {
    type: "",
    color: "",
    size: ""
};

/**
 * FUNCTION WITH RETURN VALUE
 * Gets product data for a specific garment type
 * @param {string} garmentType - The type of garment
 * @returns {Object|null} Product data object or null if not found
 */
function getProductData(garmentType) {
    if (productData.hasOwnProperty(garmentType)) {
        return productData[garmentType];
    }
    return null;
}

/**
 * FUNCTION WITH RETURN VALUE
 * Gets available colors for a garment type
 * @param {string} garmentType - The type of garment
 * @returns {Array} Array of available colors
 */
function getAvailableColors(garmentType) {
    const product = getProductData(garmentType);
    if (product) {
        return product.colors;
    }
    return [];
}

/**
 * FUNCTION WITH RETURN VALUE
 * Gets available sizes for a garment type
 * @param {string} garmentType - The type of garment
 * @returns {Array} Array of available sizes
 */
function getAvailableSizes(garmentType) {
    const product = getProductData(garmentType);
    if (product) {
        return product.sizes;
    }
    return [];
}

/**
 * FUNCTION WITH RETURN VALUE
 * Gets the image URL for the current selection
 * @returns {string} Image URL
 */
function getImageUrl() {
    if (!currentSelection.type || !currentSelection.color) {
        return "";
    }
    const product = getProductData(currentSelection.type);
    if (product && product.colorImages[currentSelection.color]) {
        return product.colorImages[currentSelection.color];
    }
    return product.baseImage;
}

/**
 * FUNCTION WITHOUT RETURN VALUE
 * Populates a dropdown with options from an array
 * @param {string} selectId - ID of the select element
 * @param {Array} options - Array of option values
 * @param {boolean} includeDefault - Whether to include default option
 */
function populateDropdown(selectId, options, includeDefault = true) {
    const select = document.getElementById(selectId);
    select.innerHTML = "";
    
    if (includeDefault) {
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = `-- Choose a ${selectId.replace("-", " ")} --`;
        select.appendChild(defaultOption);
    }
    
    // Using array method: forEach
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option.charAt(0).toUpperCase() + option.slice(1);
        select.appendChild(optionElement);
    });
}

/**
 * FUNCTION WITHOUT RETURN VALUE
 * Updates the product display with current selection
 */
function updateDisplay() {
    const displayArea = document.getElementById("product-display");
    const summaryContent = document.getElementById("summary-content");
    
    // Conditional logic: Check if all selections are made
    if (currentSelection.type && currentSelection.color && currentSelection.size) {
        const product = getProductData(currentSelection.type);
        const imageUrl = getImageUrl();
        
        // DOM manipulation: Creating and adding elements
        displayArea.innerHTML = `
            <img src="${imageUrl}" alt="${product.name}" class="product-image" 
                 onerror="this.src='https://via.placeholder.com/400?text=Duck+Attire'">
        `;
        
        // DOM manipulation: Updating summary content
        summaryContent.innerHTML = `
            <div class="summary-item">
                <strong>Type:</strong> ${product.name}
            </div>
            <div class="summary-item">
                <strong>Color:</strong> ${currentSelection.color.charAt(0).toUpperCase() + currentSelection.color.slice(1)}
            </div>
            <div class="summary-item">
                <strong>Size:</strong> ${currentSelection.size}
            </div>
        `;
    } else {
        // Conditional logic: Show placeholder if selections incomplete
        displayArea.innerHTML = `
            <div class="placeholder">
                <p>Select options above to see your customized attire</p>
            </div>
        `;
        summaryContent.innerHTML = "<p>No selections made yet.</p>";
    }
}

/**
 * FUNCTION WITHOUT RETURN VALUE
 * Enables or disables form controls based on selection state
 */
function updateFormState() {
    const colorSelect = document.getElementById("color");
    const sizeSelect = document.getElementById("size");
    const previewBtn = document.getElementById("preview-btn");
    
    // Conditional logic: Enable/disable based on selections
    if (currentSelection.type) {
        colorSelect.disabled = false;
    } else {
        colorSelect.disabled = true;
        sizeSelect.disabled = true;
    }
    
    if (currentSelection.type && currentSelection.color) {
        sizeSelect.disabled = false;
    } else {
        sizeSelect.disabled = true;
    }
    
    //Enable preview button only when all selections are made
    if (currentSelection.type && currentSelection.color && currentSelection.size) {
        previewBtn.disabled = false;
    } else {
        previewBtn.disabled = false; 
    }
}


function handleGarmentTypeChange() {
    const garmentSelect = document.getElementById("garment-type");
    const selectedType = garmentSelect.value;
    
    currentSelection.type = selectedType;
    currentSelection.color = "";
    currentSelection.size = "";
    
    if (selectedType) {
        const colors = getAvailableColors(selectedType);
        const sizes = getAvailableSizes(selectedType);
        
        populateDropdown("color", colors);
        populateDropdown("size", sizes);
    } else {
        populateDropdown("color", []);
        populateDropdown("size", []);
    }
    
    updateFormState();
    updateDisplay();
}


function handleColorChange() {
    const colorSelect = document.getElementById("color");
    currentSelection.color = colorSelect.value;
    
    updateFormState();
    updateDisplay();
}

/**
 * FUNCTION WITHOUT RETURN VALUE
 * Handles size selection change
 */
function handleSizeChange() {
    const sizeSelect = document.getElementById("size");
    currentSelection.size = sizeSelect.value;
    
    updateFormState();
    updateDisplay();
}

/**
 * FUNCTION WITHOUT RETURN VALUE
 * Resets all selections and form state
 */
function resetAll() {
    currentSelection = {
        type: "",
        color: "",
        size: ""
    };
    
    document.getElementById("garment-type").value = "";
    document.getElementById("color").value = "";
    document.getElementById("size").value = "";
    
    populateDropdown("color", []);
    populateDropdown("size", []);
    
    updateFormState();
    updateDisplay();
}

/**
 * FUNCTION WITHOUT RETURN VALUE
 * Handles preview button click
 */
function handlePreview() {
    if (currentSelection.type && currentSelection.color && currentSelection.size) {
        updateDisplay();
        // Could add animation or notification here
        alert(`Previewing your ${currentSelection.color} ${currentSelection.type} in size ${currentSelection.size}!`);
    }
}

/**
 * FUNCTION WITHOUT RETURN VALUE
 * Populates the gallery with popular combinations
 * Uses array methods: forEach, map
 */
function populateGallery() {
    const galleryGrid = document.getElementById("gallery-grid");
    galleryGrid.innerHTML = "";
    
    // Using array method: forEach
    popularCombinations.forEach(combination => {
        const product = getProductData(combination.type);
        if (product) {
            const imageUrl = product.colorImages[combination.color] || product.baseImage;
            const galleryItem = document.createElement("div");
            galleryItem.className = "gallery-item";
            galleryItem.innerHTML = `
                <img src="${imageUrl}" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/200?text=Duck+Attire'">
                <p>${product.name}</p>
                <p style="font-size: 0.9em; color: #666;">${combination.color} - ${combination.size}</p>
            `;
            
            // Add click event to gallery items
            galleryItem.addEventListener("click", () => {
                // Apply this combination to the form
                document.getElementById("garment-type").value = combination.type;
                handleGarmentTypeChange();
                document.getElementById("color").value = combination.color;
                handleColorChange();
                document.getElementById("size").value = combination.size;
                handleSizeChange();
                
                // Switch to customize tab
                switchTab("customize");
            });
            
            galleryGrid.appendChild(galleryItem);
        }
    });
}

/**
 * FUNCTION WITHOUT RETURN VALUE
 * Handles tab switching
 * @param {string} tabName - Name of the tab to switch to
 */
function switchTab(tabName) {
    // Hide all tab contents
    const allTabs = document.querySelectorAll(".tab-content");
    const allButtons = document.querySelectorAll(".tab-btn");
    
    // Using array method: forEach
    allTabs.forEach(tab => {
        tab.classList.add("hidden");
    });
    
    allButtons.forEach(btn => {
        btn.classList.remove("active");
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(`${tabName}-tab`);
    const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
    
    if (selectedTab) {
        selectedTab.classList.remove("hidden");
    }
    if (selectedButton) {
        selectedButton.classList.add("active");
    }
}

// Event Listeners Setup
document.addEventListener("DOMContentLoaded", () => {
    // Dropdown event listeners
    document.getElementById("garment-type").addEventListener("change", handleGarmentTypeChange);
    document.getElementById("color").addEventListener("change", handleColorChange);
    document.getElementById("size").addEventListener("change", handleSizeChange);
    
    // Button event listeners
    document.getElementById("preview-btn").addEventListener("click", handlePreview);
    document.getElementById("reset-btn").addEventListener("click", resetAll);
    
    // Tab event listeners
    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabName = btn.getAttribute("data-tab");
            switchTab(tabName);
        });
    });
    
    populateGallery();
    
   
    updateFormState();
    updateDisplay();
});

