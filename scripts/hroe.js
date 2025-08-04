/*
 * HROECalc – Return on Investment for Ethics in AI Calculator
 * Release: v0.85 (2025-01-01)
 * Release Notes: docs/releases/v0.85.md
 * SPDX-License-Identifier: MIT
 * Original Author: Jose De Jesus (jdejesus@us.ibm.com)
 * Additional contributors listed in CONTRIBUTORS.md
 *
 * The HROE Framework Calculator (“Calculator”) is an implementation of 
 * research conducted jointly by IBM and the University of Notre Dame through
 * the University of Notre Dame-IBM Technology Ethics Lab. The corresponding research paper 
 * is available at: https://arxiv.org/pdf/2309.13057
 *
 * Copyright IBM Corp. 2024–2025. All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
 * THE SOFTWARE.
 *
 * The above notice, including all attribution, copyright, and permission statements,
 * shall be included in all copies or substantial portions of the Software.
 */

// Global variables to store chart instance and various calculated values or references.
let investmentChart; // Chart.js instance for displaying ROI over time.
let capabilityCosts; // Array of capability costs per year.
let capabilityCostValues; // Sum of all capability costs.
let capabilityReturns; // Array of capability returns per year.
let capabilityReturnValues; // Sum of all capability returns.
let fineAvoidanceValue; // Array of fine avoidance values (percentages) per year.
let fineAvoidanceValues; // Sum of all fine avoidance values.
let formulaExplanationContainer; // Reference to the HTML element displaying formula explanations.
let economicReturn; // Array of calculated economic returns per year.
let economicReturnValues; // Sum of all economic returns.
let discountFactor; // Calculated discount factor (1 - alpha).
let reputationalReturnValues; // Sum of all reputational returns.
let discountedValue; // A temporary variable for discounted values.
let isTableView = true; // Boolean to track the current view (table vs. default form).
let I_t; // Initial investment (I_t).
let N; // Number of years (N).
let colIndex; // Column index (used in table navigation, might be redundant as a global).
let alpha; // Discount rate (alpha).
let netReturn; // Net return (not consistently used in final calculation).
let totalReturn; // Total return after discounting.
let intangibleValue; // Represents reputational returns, potentially used for yearly values.
let intangibleValues; // Sum of all intangible (reputational) values.
let roi; // Overall ROI (might be a temporary variable before finalROI).
let discountedIntangibleReturn; // Discounted intangible return.
let updatedroi; // Updated ROI.
let discountedReturn; // Discounted return (general, not specific).
let netReturnCapabilities; // Net return from capabilities.
let updatedTotalReturn; // Updated total return.
let totalInvestment; // Total investment for ROI calculation.
let finalROI; // The final calculated Return on Investment.

// References to the main panels for formula highlighting and content updates.
const leftPanel = document.querySelector('.formula-leftpanel');
const rightPanel = document.querySelector('.formula-container .formula');

/**
 * Highlights specific elements in the displayed formula based on the currently focused input field.
 * This provides visual feedback to the user about which part of the formula corresponds to their input.
 * @param {string} inputId - The ID of the input field that is currently focused or hovered.
 */
function highlightFormula(inputId) {
    // Define a mapping from input field IDs to the IDs of formula elements to be highlighted.
    const elements = {
        years: ['Ny'], // Highlight 'N' for number of years.
        capabilities: [], // Placeholder, no direct formula element.
        discount: ['Alpha'], // Highlight 'alpha' for discount rate.
        economic_returns: ['Re'], // Highlight 'Re' for economic returns.
        fine_avoidance: ['Rr'], // Highlight 'Rr' for reputational returns (indirectly via fine avoidance).
        capability_returns: ['Rc'], // Highlight 'Rc' for capability returns.
        initial_investment: ['It1', 'It2'], // Highlight 'I_t' in both numerator and denominator.
        investment_cost: ['Ic_t1', 'Ic_t2'] // Highlight 'I^c_t' in both numerator and denominator.
    };

    // Reset the color of all potentially highlighted formula elements to their default.
    document.querySelectorAll('#sum1, #Ny, #Alpha, #Re, #Rr, #Rc, #It1, #It2, #Ic_t1, #Ic_t2').forEach(el => {
        if (el) el.style.color = '#4f4f4f'; // Default color for formula elements.
    });

    // If the inputId has corresponding formula elements, apply the highlight color.
    if (elements[inputId]) {
        elements[inputId].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.color = '#3498db'; // Highlight color (blue).
            }
        });
    }
}

/**
 * Updates the explanation panel with context-specific text based on the user's interaction
 * with different input fields. Translations are applied using the `translationsData` object.
 * @param {string} inputId - The ID of the input field that triggered the explanation update.
 */
function updateExplanation(inputId) {
    const currentLang = document.getElementById('language').value; // Get current language from dropdown.
    const translation = translationsData[currentLang].explanation; // Access relevant translation data.

    let explanation;
    switch (inputId) {
        case 'initial_investment':
            explanation = translation.initial_investment.replace('{value}', formatValue(document.getElementById('initial_investment').value));
            break;
        case 'years':
            explanation = translation.years.replace('{value}', document.getElementById('years').value);
            break;
        case 'discount':
            const discountValue = document.getElementById('discount').value;
            explanation = translation.discount.replace('{value}', discountValue).replace('{percentage}', ((1 - discountValue) * 100).toFixed(2));
            break;
        case 'org_revenues':
            // For comma-separated inputs, generate a detailed yearly breakdown.
            explanation = generateYearlyExplanation('org_revenues', translation.economic_returns);
            document.querySelector('.info-panel').innerHTML = explanation; // Update the info panel.
            validateCommaSeparatedInputs(); // Re-validate input formats.
            break;
        case 'fine_avoidance':
            explanation = translation.fine_avoidance.replace('{value}', document.getElementById('fine_avoidance').value);
            validateCommaSeparatedInputs(); // Re-validate input formats.
            break;
        case 'intangible_value':
            explanation = translation.intangible_value.replace('{value}', formatValue(document.getElementById('intangible_value').value));
            validateCommaSeparatedInputs(); // Re-validate input formats.
            break;
        case 'investment_cost':
            explanation = translation.investment_cost.replace('{value}', formatValue(document.getElementById('investment_cost').value));
            validateCommaSeparatedInputs(); // Re-validate input formats.
            break;
        case 'capability_returns':
            explanation = generateYearlyExplanation('capability_returns', translation.capability_returns);
            validateCommaSeparatedInputs(); // Re-validate input formats.
            break;
        default:
            // Default hover text when no specific input is highlighted.
            explanation = translationsData[currentLang].hoverText;
    }

    document.getElementById('explanation-panel').innerHTML = explanation; // Update the main explanation panel.
}

/**
 * Generates a detailed explanation string for yearly, comma-separated input fields.
 * It formats each year's value for display.
 * @param {string} inputId - The ID of the comma-separated input field (e.g., 'org_revenues').
 * @param {string} baseText - The base translation text which contains a '{details}' placeholder.
 * @returns {string} - The formatted explanation string.
 */
function generateYearlyExplanation(inputId, baseText) {
    const values = document.getElementById(inputId).value.split(','); // Split input string by comma.
    const yearExplanations = values.map((value, index) => {
        // Format each year's value and include the year number.
        return `Year ${index + 1} = <div class="varvalue">${parseFloat(value)} million</div>`;
    }).join(' '); // Join all yearly explanations into a single string.
    return baseText.replace('{details}', yearExplanations); // Insert yearly details into the base text.
}

/**
 * Formats a numeric value into a localized currency string (USD millions).
 * @param {string} value - The string value to format.
 * @returns {string} - The formatted currency string wrapped in a `div` for styling.
 */
function formatValue(value) {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
        return '?'; // Return '?' if the value is not a number.
    }
    // Format the number as USD currency, converting from millions to full value for display.
    const formattedValue = (numValue * 1000000).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return `<div class="varvalue">${formattedValue}</div>`; // Wrap in div for styling.
}

/**
 * Clears the explanation panel and resets formula highlight colors to default.
 */
function clearExplanation() {
    // Set explanation panel text back to the default hover message.
    document.getElementById('explanation-panel').innerText = translationsData[document.getElementById('language').value].hoverText;
    // Reset color for all formula elements.
    document.querySelectorAll('#sum1, #Ny, #Alpha, #Re, #Rr, #Rc, #It1, #It2, #Ic_t1, #Ic_t2').forEach(el => el.style.color = '#4f4f4f');
}

/**
 * Sums a string of comma-separated numbers.
 * @param {string} numberString - A string containing numbers separated by commas (e.g., "10,20,30").
 * @returns {number} - The total sum of the numbers.
 */
function sumCommaSeparatedNumbers(numberString) {
    let numbersArray = numberString.split(','); // Split the string into an array of strings.
    // Use reduce to sum all parsed numbers.
    let total = numbersArray.reduce((sum, number) => sum + parseFloat(number), 0);
    return total;
}

/**
 * Checks if a string contains multiple consecutive commas (e.g., "10,,20").
 * @param {string} str - The string to check.
 * @returns {boolean} - True if multiple consecutive commas are found, false otherwise.
 */
function hasMultipleConsecutiveCommas(str) {
    const regex = /,{2,}/; // Regular expression to match two or more consecutive commas.
    return regex.test(str); // Test the string against the regex.
}

// Array of input field IDs to be validated for comma-separated values.
const fieldsToCheck = ['calc_economic_returns', 'intangible_value', 'investment_cost', 'capability_returns'];
// Original default note message for the info panel.
const originalNote = `<img src="icons/notification.svg" alt="Information Icon" style="width: 24px; height: 24px; position:relative;top:-2px;vertical-align: middle;"> The return on investments in AI ethics and governance initiatives should be assessed holistically. While this calculator provides a helpful tool for assessing quantifiable returns, a holistic assessment should also include returns and impacts that are qualitative in nature. It is important to consider a broad set of stakeholders and the impact on society at large during the holistic assessment process.`;

/**
 * Validates comma-separated input fields based on the specified number of years.
 * It provides visual feedback (color changes) and warning messages in the info panel
 * if the number of entries doesn't match the `years` input.
 */
function validateCommaSeparatedInputs() {
    const years = parseInt(document.getElementById('years').value); // Get the target number of years.
    const returnsChartContainer = document.getElementById('returnsChartContainer');
    const editableTableContainer = document.getElementById('editableTableContainer');

    // Update chart or table view if they are active.
    if (returnsChartContainer.style.display === 'block') {
        displayReturnsChart();
    } else if (editableTableContainer.style.display === 'block') {
        generateEditableTable(years);
    }

    let message = '';
    let hasInvalidInput = false;
    let hasExtraEntries = false;
    let hasMissingEntries = false;

    const missingEntriesCount = {};
    const extraEntriesCount = {};
    let extraEntriesMessage = '';
    let missingEntriesMessage = '';
    const language = document.getElementById('language').value; // Get current language.

    // Iterate through each field that requires comma-separated validation.
    fieldsToCheck.forEach(fieldId => {
        const fieldElement = document.getElementById(fieldId);
        // Split input by comma and trim whitespace.
        const values = fieldElement.value.split(',').map(v => v.trim());
        // Format field name for display in messages.
        const fieldName = fieldId.replace(/_/g, ' ').replace(/(^|\s)\S/g, letter => letter.toUpperCase());

        if (values.length < years) {
            // Case: Missing entries.
            hasMissingEntries = true;
            const missingEntries = years - values.length;
            if (!missingEntriesCount[missingEntries]) {
                missingEntriesCount[missingEntries] = [];
            }
            missingEntriesCount[missingEntries].push(fieldName);

            fieldElement.style.color = 'darkred'; // Highlight field in red.
            fieldElement.style.backgroundColor = 'rgb(250, 250, 239)'; // Light yellow background.
            hasInvalidInput = true;
        } else if (values.length > years) {
            // Case: Extra entries.
            hasExtraEntries = true;
            const extraEntries = values.length - years;
            // Check for specific extra comma scenarios.
            if (hasMultipleConsecutiveCommas(values.toLocaleString())) {
                extraEntriesMessage += `<div style="display:inline-block; color:darkblue;">${fieldName}</div> ${translationsData[language].extraCommas}. `;
            } else if (values.toLocaleString().trim().endsWith(',') || values.toLocaleString().trim() === ',') {
                extraEntriesMessage += `<div style="display:inline-block; color:darkblue;">${fieldName}</div> ${translationsData[language].extraComma}. `;
            } else {
                if (!extraEntriesCount[extraEntries]) {
                    extraEntriesCount[extraEntries] = [];
                }
                extraEntriesCount[extraEntries].push(fieldName);
            }

            fieldElement.style.color = 'darkblue'; // Highlight field in blue.
            fieldElement.style.backgroundColor = '#f5ffff'; // Light blue background.
            hasInvalidInput = true;
        } else {
            // Case: Correct number of entries.
            fieldElement.style.color = ''; // Reset color.
            fieldElement.style.backgroundColor = ''; // Reset background.
        }
    });

    // Construct the message for missing entries.
    for (const count in missingEntriesCount) {
        const fields = missingEntriesCount[count];
        if (fields.length > 1) {
            const lastField = fields.pop();
            const fieldList = fields.length > 1
                ? `${fields.map(f => `<div style="display:inline-block;color:darkred;">${f}</div>`).join(', ')}, ${translationsData[language].and} <div style="display:inline-block;color:darkred;">${lastField}</div>`
                : `<div style="display:inline-block;color:darkred;">${fields[0]}</div> ${translationsData[language].and} <div style="display:inline-block;color:darkred;">${lastField}</div>`;
            missingEntriesMessage += `<div style="display:inline-block;">${fieldList}</div> ${translationsData[language].missingPlural} ${count} ${count == 1 ? translationsData[language].commaSeparatedEntry : translationsData[language].commaSeparatedEntries}. `;
        } else {
            missingEntriesMessage += `<div style="display:inline-block;color:darkred;">${fields[0]}</div> ${translationsData[language].missing} ${count} ${count == 1 ? translationsData[language].commaSeparatedEntry : translationsData[language].commaSeparatedEntries}. `;
        }
    }

    // Construct the message for extra entries.
    for (const count in extraEntriesCount) {
        const fields = extraEntriesCount[count];
        if (fields.length > 1) {
            const lastField = fields.pop();
            const fieldList = fields.length > 1
                ? `${fields.map(f => `<div style="display:inline-block;color:darkblue;">${f}</div>`).join(', ')}, ${translationsData[language].and} <div style="display:inline-block;color:darkblue;">${lastField}</div>`
                : `<div style="display:inline-block;color:darkblue;">${fields[0]}</div> ${translationsData[language].and} <div style="display:inline-block;color:darkblue;">${lastField}</div>`;
            extraEntriesMessage += `<div style="display:inline-block;">${fieldList}</div> ${count} ${count == 1 ? translationsData[language].extraEntry : translationsData[language].extraEntries}. `;
        } else {
            extraEntriesMessage += `<div style="display:inline-block;color:darkblue;">${fields[0]}</div> ${count} ${count == 1 ? translationsData[language].extraEntry : translationsData[language].extraEntries}. `;
        }
    }

    const infoPanel = document.querySelector('.info-panel');
    const discmsg = `<a href="#" onclick="openDisclaimer();">Additional Information</a>.`;

    if (hasInvalidInput) {
        // Display warning message if there's any invalid input.
        message = `${translationsData[language].fieldListIntro} <strong>${years}</strong>, ${translationsData[language].warning} `;
        if (hasMissingEntries) {
            message += `${missingEntriesMessage}${translationsData[language].proceed} `;
        }
        if (hasExtraEntries) {
            message += `${extraEntriesMessage}${translationsData[language].ignore}`;
        }
        // Set info panel content with warning icon and message.
        infoPanel.innerHTML = `<img src="icons/warning--multiple.svg" alt="Warning Icon" style="width: 24px; height: 24px; position:relative;top:-3px;vertical-align: middle;"> ${message} ${discmsg}`;
        infoPanel.classList.add('warning'); // Add 'warning' class for styling.
    } else {
        // Reset info panel to original note if no invalid input.
        infoPanel.innerHTML = originalNote;
        infoPanel.classList.remove('warning'); // Remove 'warning' class.
    }
}

/**
 * Dynamically loads the `hroe-links.js` script, which contains external reference links.
 * Upon successful loading, it calls `populateDropdown` to fill the disclaimer's dropdown.
 */
function loadLinks() {
    const script = document.createElement('script');
    script.src = 'scripts/hroe-links.js'; // Path to the links script.
    script.onload = populateDropdown; // Callback to populate dropdown after script loads.
    document.head.appendChild(script); // Append script to the document's head.
}

/**
 * Populates the 'referenceLinks' dropdown menu in the disclaimer modal
 * with links defined in the `hroeLinks` array (loaded from `hroe-links.js`).
 */
function populateDropdown() {
    const dropdown = document.getElementById('referenceLinks');

    // Add each link from the hroeLinks array as an option in the dropdown.
    hroeLinks.forEach(linkObj => {
        const option = document.createElement('option');
        option.value = linkObj.link; // Set option value to the URL.
        option.textContent = linkObj.title; // Set option text to the link title.
        dropdown.appendChild(option);
    });
}

/**
 * Opens the selected link from the reference links dropdown in a new browser tab.
 * @param {HTMLSelectElement} selectElement - The select element from which the link was chosen.
 */
function openLink(selectElement) {
    const selectedLink = selectElement.value;
    if (selectedLink) {
        window.open(selectedLink, '_blank'); // Open the URL in a new tab.
    }
}

// Event listener to load external links when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', loadLinks);

/**
 * Displays the disclaimer modal.
 */
function openDisclaimer() {
    document.getElementById('disclaimerModal').style.display = 'block';
}

/**
 * Closes the disclaimer modal.
 */
function closeDisclaimer() {
    document.getElementById('disclaimerModal').style.display = 'none';
}

// Global click event listener to close the disclaimer modal if clicked outside its content.
window.onclick = function (event) {
    var modal = document.getElementById('disclaimerModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/**
 * Displays the main help popup.
 */
function showHelp() {
    document.getElementById('helpPopup').style.display = 'block';
}

/**
 * Closes the main help popup.
 */
function closeHelp() {
    document.getElementById('helpPopup').style.display = 'none';
}

/**
 * Displays the legal disclaimer popup (Note: this function is present but not explicitly called in the provided HTML).
 */
function showLegalDisclaimer() {
    document.getElementById('legalDisclaimer').style.display = 'block';
}

/**
 * Closes the legal disclaimer popup (Note: this function is present but not explicitly called in the provided HTML).
 */
function closeLegalDisclaimer() {
    document.getElementById('legalDisclaimer').style.display = 'none';
}

/**
 * Displays the toolbar help popup.
 */
function showToolbarHelp() {
    document.getElementById('helpFormToolbar').style.display = 'block';
}

/**
 * Closes the toolbar help popup.
 */
function closeToolbarHelp() {
    document.getElementById('helpFormToolbar').style.display = 'none';
}

/**
 * Handles navigation between input fields using the 'Enter' key.
 * Also triggers input validation and UI updates.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
function moveToNextInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default Enter key behavior (e.g., form submission).
        if (event.target.id === 'capability_returns') {
            // If at the last input, loop back to 'initial_investment'.
            document.getElementById('initial_investment').focus();
        } else {
            // Find the next input field and focus it.
            let inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
            let currentIndex = Array.from(inputs).indexOf(event.target);
            let nextIndex = currentIndex + 1;

            if (nextIndex < inputs.length) {
                inputs[nextIndex].focus();
            }
        }
    } else {
        // If any other input changes, update results panel, validate inputs, and check all fields.
        resultsPanel('off'); // Turn off results panel.
        validateCommaSeparatedInputs(); // Re-validate comma-separated inputs.
        checkAllFields(); // Check if all required fields are filled.
    }
}

// Event listener for the 'years' input to trigger validation on change.
document.getElementById('years').addEventListener('input', validateCommaSeparatedInputs);
// Event listeners for other comma-separated fields to trigger validation on change.
fieldsToCheck.forEach(fieldId => {
    document.getElementById(fieldId).addEventListener('input', validateCommaSeparatedInputs);
});

// Event listeners for all input/number fields to update explanation panel on focus/click.
document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
    input.addEventListener('focus', (event) => {
        updateExplanation(event.target.id);
    });

    input.addEventListener('click', (event) => {
        updateExplanation(event.target.id);
    });
});

/**
 * Populates global arrays with parsed numeric values from input fields.
 * This is primarily used before calculations or table updates.
 */
function updateValuesForTable() {
    economicReturns = document.getElementById('economic_returns').value.split(',').map(Number);
    fineAvoidanceValue = document.getElementById('fine_avoidance').value.split(',').map(Number);
    capabilityReturns = document.getElementById('capability_returns').value.split(',').map(Number);
    intangibleValues = document.getElementById('intangible_value').value.split(',').map(Number);
    capabilityCosts = document.getElementById('investment_cost').value.split(',').map(Number);
}

/**
 * Calculates the Holistic Return on Investment (HROE) based on user inputs.
 * It retrieves values, performs calculations based on the selected formula version,
 * and updates the UI with the final ROI and a detailed explanation.
 */
function calculateHROE() {
    const ROIValueElement = document.getElementById('roi_value'); // Element to display final ROI value.
    const resultsElement = document.querySelector('.results'); // Main results section.
    const explanationElement = document.getElementById('initial_explanation'); // Detailed explanation section.

    resultsPanel('on'); // Enable and show the results panel.
    enableHROEButton(); // Ensure the HROE calculation button is enabled.

    let totalReturn = 0;
    let finalROI = 0;

    // Retrieve core input values.
    I_t = parseFloat(document.getElementById('initial_investment').value);
    N = parseInt(document.getElementById('years').value);
    alpha = parseFloat(document.getElementById('discount').value);
    discountFactor = 1 - alpha; // Calculate the discount factor.

    // Process comma-separated input values by converting to arrays of numbers and summing them.
    economicReturn = document.getElementById('calc_economic_returns').value.split(',').map(Number);
    fineAvoidanceValue = document.getElementById('fine_avoidance').value.split(',').map(Number);
    fineAvoidanceValues = sumCommaSeparatedNumbers(fineAvoidanceValue.join(',')); // Sum fine avoidance for combined value.
    economicReturnValues = sumCommaSeparatedNumbers(economicReturn.join(',')); // Sum economic returns for combined value.

    capabilityReturns = document.getElementById('capability_returns').value.split(',').map(Number);
    capabilityReturnValues = sumCommaSeparatedNumbers(capabilityReturns.join(','));

    intangibleValues = document.getElementById('intangible_value').value.split(',').map(Number);
    reputationalReturnValues = sumCommaSeparatedNumbers(intangibleValues.join(','));

    capabilityCosts = document.getElementById('investment_cost').value.split(',').map(Number);
    capabilityCostValues = sumCommaSeparatedNumbers(capabilityCosts.join(','));

    // Calculate ROI based on the currently active formula version (full, reputationalOnly, or economicOnly).
    if (currentFormulaVersion === 'full') {
        // Full formula: Economic + Reputational + Capability Returns, less Initial + Capability Costs.
        totalReturn = discountFactor * (economicReturnValues + reputationalReturnValues + capabilityReturnValues);
        const combinedI_t = I_t + capabilityCostValues;
        finalROI = (totalReturn - combinedI_t) / combinedI_t;
        // Render chart with all components.
        renderROIOverTimeChart(N, I_t, capabilityCosts, economicReturn, intangibleValues, capabilityReturns, discountFactor, finalROI);
    } else if (currentFormulaVersion === 'reputationalOnly') {
        // Reputational Only formula: Economic + Reputational Returns, less Initial Investment.
        totalReturn = discountFactor * (economicReturnValues + reputationalReturnValues);
        finalROI = (totalReturn - I_t) / I_t;
        // Render chart with relevant components (capability costs/returns are zero).
        renderROIOverTimeChart(N, I_t, 0, economicReturn, intangibleValues, 0, discountFactor, finalROI);
    } else if (currentFormulaVersion === 'economicOnly') {
        // Economic Only formula: Economic Returns, less Initial Investment.
        totalReturn = discountFactor * economicReturnValues;
        finalROI = (totalReturn - I_t) / I_t;
        // Render chart with only economic components.
        renderROIOverTimeChart(N, I_t, 0, economicReturn, 0, 0, discountFactor, finalROI);
    }

    // Display results in the UI.
    document.getElementById('resultsHeader').style.display = 'block';
    document.getElementById('hroeDisplay').style.display = 'block';
    ROIValueElement.innerHTML = `${(finalROI).toFixed(2)}`; // Display formatted ROI.

    // Populate the detailed explanation with calculated values.
    const currentLang = document.getElementById('language').value;
    document.getElementById('initial_explanation').innerHTML = translationsData[currentLang].explanation.explanation_of_results
        .replace('{I_t}', I_t)
        .replace('{N}', (N === 1 ? 'a year' : N + ' years'))
        .replace('{fineAvoidanceValue}', fineAvoidanceValues)
        .replace('{discountedValue}', (fineAvoidanceValues * (1 - alpha)).toFixed(2))
        .replace('{alpha}', (alpha * 100).toFixed(2))
        .replace('{netReturn}', (fineAvoidanceValues * (1 - alpha) - I_t).toFixed(2))
        .replace('{intangibleValue}', reputationalReturnValues)
        .replace('{discountedIntangibleReturn}', (reputationalReturnValues * discountFactor).toFixed(2))
        .replace('{totalReturn}', totalReturn.toFixed(2))
        .replace('{capabilityReturns}', capabilityReturnValues)
        .replace('{investmentCost}', capabilityCostValues)
        .replace('{finalROI}', finalROI.toFixed(2));

    resultsElement.classList.remove('hidden'); // Show results section.
    explanationElement.classList.remove('hidden'); // Show explanation section.

    showGeneratePDFButton(); // Display PDF generation button.
}

/**
 * Renders a Chart.js bar chart displaying annual investments, annual returns, and the final ROI.
 * This chart provides a visual breakdown of financial flows over the specified number of years.
 * @param {number} N - The number of years.
 * @param {number} initialInvestment - The initial investment value.
 * @param {number[]} capabilityCosts - Array of capability costs per year.
 * @param {number[]} economicReturns - Array of economic returns per year.
 * @param {number[]} reputationalReturns - Array of reputational returns per year.
 * @param {number[]} capabilityReturns - Array of capability returns per year.
 * @param {number} discountFactor - The discount factor (1 - alpha).
 * @param {number} finalROI - The final calculated ROI.
 */
function renderROIOverTimeChart(N, initialInvestment, capabilityCosts, economicReturns, reputationalReturns, capabilityReturns, discountFactor, finalROI) {
    const chartContainer = document.getElementById('roiChartContainer');
    const chartExplanation = document.getElementById('chartExplanation');

    if (!chartContainer || !chartExplanation) {
        console.error("Chart container or explanation element is missing in the HTML.");
        return;
    }

    chartContainer.classList.remove('hidden'); // Show the chart container.
    chartExplanation.innerHTML = `<h3>Annual Returns, Investments, and Final ROI</h3>`; // Set chart title.

    const ctx = document.createElement('canvas'); // Create a canvas element for the chart.
    chartExplanation.innerHTML = ""; // Clear previous chart if exists.
    chartExplanation.appendChild(ctx); // Append the new canvas to the explanation element.

    if (investmentChart) {
        investmentChart.destroy(); // Destroy existing chart instance to prevent duplicates.
    }

    // Initialize arrays to hold annual investments and returns data for the chart.
    const annualInvestments = [];
    const annualReturns = [];

    // Populate arrays with annual investment and return values.
    for (let year = 0; year < N; year++) {
        // Retrieve individual return components for the current year.
        const economicReturn = economicReturns[year] || 0;
        // Discount reputational and capability returns if they exist for the year.
        const reputationalReturn = (reputationalReturns && reputationalReturns[year] !== undefined) ? reputationalReturns[year] * discountFactor : 0;
        const capabilityReturn = (capabilityReturns && capabilityReturns[year] !== undefined) ? capabilityReturns[year] * discountFactor : 0;
        // Get capability cost for the current year.
        const capabilityCost = (Array.isArray(capabilityCosts) && capabilityCosts[year] !== undefined) ? capabilityCosts[year] : 0;

        const currentYearReturn = economicReturn + reputationalReturn + capabilityReturn;
        // Initial investment is only in year 0, subsequent years only have capability costs.
        const currentYearInvestment = year === 0 ? initialInvestment + capabilityCost : capabilityCost;

        annualInvestments.push(currentYearInvestment.toFixed(2));
        annualReturns.push(currentYearReturn.toFixed(2));
    }

    // Render a combo chart using Chart.js.
    investmentChart = new Chart(ctx, {
        type: 'bar', // Base chart type is bar.
        data: {
            labels: Array.from({ length: N }, (_, i) => `Year ${i + 1}`), // X-axis labels (Year 1, Year 2, etc.).
            datasets: [
                {
                    label: "Annual Investments",
                    data: annualInvestments,
                    backgroundColor: 'rgba(70, 130, 180, 0.6)', // Muted Steel Blue.
                    borderColor: 'rgba(70, 130, 180, 1)',
                    borderWidth: 1
                },
                {
                    label: "Annual Returns",
                    data: annualReturns,
                    backgroundColor: 'rgba(148, 208, 180, 0.6)', // Soft teal.
                    borderColor: 'rgba(100, 181, 205, 1)',
                    borderWidth: 1
                },
                {
                    label: "Final ROI",
                    data: Array(N).fill(finalROI.toFixed(2)), // Final ROI as a dashed line across all years.
                    borderColor: 'rgba(160, 82, 45, 0.8)', // Subtle Taupe.
                    backgroundColor: 'rgba(160, 82, 45, 0.3)',
                    type: 'line', // This dataset is a line chart.
                    borderDash: [5, 5], // Dashed line.
                    fill: false, // Do not fill area under the line.
                    yAxisID: 'y1' // Use a secondary Y-axis.
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { // Primary Y-axis for investments and returns.
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Annual Values'
                    }
                },
                y1: { // Secondary Y-axis for Final ROI.
                    beginAtZero: true,
                    position: 'right', // Position on the right side.
                    title: {
                        display: true,
                        text: 'Final ROI'
                    },
                    grid: {
                        drawOnChartArea: false // Do not draw grid lines on the chart area for this axis.
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

/**
 * Resets the content and styling of the info panel to its original state.
 */
function resetInfoPanel() {
    const infoPanel = document.querySelector('.info-panel');
    infoPanel.innerHTML = originalNote; // Restore original note content.
    infoPanel.classList.remove('warning'); // Remove warning styling.
}

let currentFormulaVersion = 'full'; // Global variable to track the currently displayed formula version.

/**
 * Updates the displayed ROI formula based on the enabled/disabled state of
 * the reputational and capability returns fieldsets. This reflects the different
 * versions of the HROE framework.
 */
function updateFormulaBasedOnReturns() {
    const reputationalFieldset = document.getElementById("reputationalReturnsFieldset");
    const capabilitiesFieldset = document.getElementById("capabilitiesReturnsFieldset");
    const formulaContainer = document.getElementById("formula"); // Target element for formula HTML.
    const paperSection = document.getElementById("paperSection"); // Section where formula is displayed.
    paperSection.innerHTML = ""; // Clear existing content.

    // HTML templates for the three formula versions.
    // Each template includes the mathematical formula and a brief explanation.
    const formulaFull = `
    <div id="paperSection">
    <div class="fraction" id="formula">
            <div class="numerator">
                <span id="sum1">
                    <em>ROI<sub>t,N,m</sub> = <br /><br />
                        <div class="shift right" style="--shift-value: 12px;">( ∑</div>
                        <span id="Ny" class="tooltip-target"><sup class="shift right" style="--shift-value: 16px;">t+N</sup><sub class="shift left" style="--shift-value: 16px;">j=t</sub></span>
                        <span id="Alpha" class="tooltip-target">
                            <div class="shift left enlargefont" style="--shift-value: 6px; --fontsize: 30px">α</div><sub class="shift left" style="--shift-value: 5px;">j-t</sub>
                        </span>
                        [<span id="Re" class="tooltip-target">R<sup class="shift right" style="--shift-value:1px;">e</sup><sub class="shift left" style="--shift-value: 8px;">j</sub>(I<sub>t</sub>&nbsp;)</span>
                        + <span id="Rr" class="tooltip-target">R<sup class="shift right" style="--shift-value: 2px;">r</sup><sub class="shift left" style="--shift-value: 6px;">j</sub>(I<sub>t</sub>&nbsp;)</span>
                        + ∑<sup class="shift right" style="--shift-value: 6px;">m</sup><sub class="shift left" style="--shift-value: 10px;">k=1</sub>
                        <span id="Rc" class="tooltip-target">R<sup class="shift right" style="--shift-value: 2px;">c</sup><sub class="shift left" style="--shift-value: 8px;">t,k</sub>(γ<sub>k</sub><div class="shift right" style="--shift-value: 2px;">I</div><sup class="shift right" style="--shift-value: 4px;">c</sup><sub class="shift left" style="--shift-value:6px;">t</sub>))</span>]
                        - (<span id="It1" class="tooltip-target">I<sub>t</sub></span> + <span id="Ic_t1" class="tooltip-target">I<sup class="shift right" style="--shift-value: 2px;">c</sup><sub class="shift left" style="--shift-value: 8px;">t</sub>)</span>
                    </em>
                </span>
            </div><hr id="dividerFull">
            <div class="denominator">
                <em><span id="It2" class="tooltip-target">I<sub>t</sub></span> + <span id="Ic_t2" class="tooltip-target">I<sup class="shift right" style="--shift-value: 2px;">c</sup><sub class="shift left" style="--shift-value: 8px;">t</sub></span></em>
            </div>
            <div id="formulaExplanationContainer">
              <div id="formula_explanation">
                The full ROI in AI Ethics formula considers Economic Returns, Reputational Returns, and
                Capability Returns, as well as Capability Costs.
                It calculates the ROI based on these factors, discounting future
                returns using the discount factor.
                The formula incorporates:
                <ul>
                 <li><div class="bluefont">Economic Returns (Re)</div>: Returns from economic benefits,
                     including fine avoidance (e.g., fine received for non-compliance with regulation).
                 </li>
                 <li><div class="bluefont">Reputational Returns (Rr)</div>: Returns from reputation.
                 </li>
                 <li><div class="bluefont">Capability Returns (Rc)</div>: Returns from increased capabilities.
                 </li>
                </ul>
                
            </div>
    </div>
    </div>`;

    const formulaReputational = `
         <div id="paperSection">
         <div class="fraction" id="formula">
            <div class="numerator">
                <span id="sum1">
                    <em>ROI<sub>t,N</sub> =
                        <div class="shift right" style="--shift-value: 12px;">( ∑</div>
                        <span id="Ny" class="tooltip-target"><sup class="shift right" style="--shift-value: 16px;">t+N</sup><sub class="shift left" style="--shift-value: 16px;">j=t</sub></span>
                        <span id="Alpha" class="tooltip-target">
                            <div class="shift left enlargefont" style="--shift-value: 6px; --fontsize: 30px">α</div><sub class="shift left" style="--shift-value: 5px;">j-t</sub>
                        </span>
                        [<span id="Re" class="tooltip-target">R<sup class="shift right" style="--shift-value:1px;">e</sup><sub class="shift left" style="--shift-value: 8px;">j</sub>(I<sub>t</sub>&nbsp;)</span>
                        + <span id="Rr" class="tooltip-target">R<sup class="shift right" style="--shift-value: 2px;">r</sup><sub class="shift left" style="--shift-value: 6px;">j</sub>(I<sub>t</sub>&nbsp;)</span>])
                        - <span id="It1" class="tooltip-target">I<sub>t</sub></span>
                    </em>
                </span>
            </div>
            <hr id="dividerReputational">
            <div class="denominator">
                <em><span id="It2" class="tooltip-target">I<sub>t</sub></span></em>
            </div>
            <div id="formulaExplanationContainer">
                                        <div id="formula_explanation">
                                            The ROI in AI Ethics formula in this mode considers Economic Returns and Reputational Returns only.
            It calculates ROI based on the economic and reputational returns, discounting future returns.
            The formula incorporates:
            <ul>
                <li><div class="bluefont">Economic Returns (Re)</div>: Returns from economic benefits, including fine avoidance (e.g., fine received for non-compliance with regulation)
                </li>
                <li><div class="bluefont">Reputational Returns (Rr)</div>: Returns from reputation.</li>
            </ul>
            The final ROI calculation divides the total return minus initial investment by the initial investment.
            
                                        </div>
                                    </div>
        </div>`;

    const formulaEconomicOnly = `
        <div id="paperSection">
        <div class="fraction" id="formula">
            <div class="numerator">
                <span id="sum1">
                    <em>ROI<sub>t,N</sub> =
                        <div class="shift right" style="--shift-value: 12px;">( ∑</div>
                        <span id="Ny" class="tooltip-target"><sup class="shift right" style="--shift-value: 16px;">t+N</sup><sub class="shift left" style="--shift-value: 16px;">j=t</sub></span>
                        <span id="Alpha" class="tooltip-target">
                            <div class="shift left enlargefont" style="--shift-value: 6px; --fontsize: 30px">α</div><sub class="shift left" style="--shift-value: 5px;">j-t</sub>
                        </span>
                        <span id="Re" class="tooltip-target">R<sup class="shift right" style="--shift-value:1px;">e</sup><sub class="shift left" style="--shift-value: 8px;">j</sub>(I<sub>t</sub>&nbsp;))</span>
                        - <span id="It1" class="tooltip-target">I<sub>t</sub></span>
                    </em>
                </span>
            </div>
            <hr id="dividerEconomic">
            <div class="denominator">
                <em><span id="It2" class="tooltip-target">I<sub>t</sub></span></em>
            </div>
            <div id="formulaExplanationContainer">
                                        <div id="formula_explanation">
                                            The ROI in AI Ethics formula in this mode considers only Economic Returns.
            It calculates ROI based solely on economic returns and fine avoidance without additional returns.
            The formula incorporates:
            <ul>
                <li><div class="bluefont">Economic Returns (Re)</div>: Returns from economic benefits.</li>
            </ul>
            The final ROI calculation divides the total return minus initial investment by the initial investment.
                                        </div>
                                    </div>
        </div>`;

    // Determine which formula to display based on the data-disabled attributes of the fieldsets.
    if (reputationalFieldset.getAttribute("data-disabled") === "false" &&
        capabilitiesFieldset.getAttribute("data-disabled") === "false") {
        currentFormulaVersion = 'full'; // Both reputational and capabilities are enabled.
        formulaContainer.innerHTML = formulaFull;
    } else if (reputationalFieldset.getAttribute("data-disabled") === "false" &&
        capabilitiesFieldset.getAttribute("data-disabled") === "true") {
        currentFormulaVersion = 'reputationalOnly'; // Reputational is enabled, capabilities are disabled.
        formulaContainer.innerHTML = formulaReputational;
    } else {
        currentFormulaVersion = 'economicOnly'; // Both reputational and capabilities are disabled (or just reputational).
        formulaContainer.innerHTML = formulaEconomicOnly;
    }
}

/**
 * Creates and sets the width of a horizontal divider element (Not fully used in the current version).
 * @param {number} length - The desired length of the divider in pixels.
 * @returns {HTMLElement} - The divider element.
 */
function createDivider(length) {
    const divider = document.getElementById('divider'); // Assuming a single divider element.
    divider.style.width = length + 'px';
    return divider;
}


/**
 * Initializes the `data-disabled` attributes for the reputational and capabilities fieldsets
 * to "false" (enabled) when the page loads. This sets the initial state for formula selection.
 */
function initializeFieldsetStates() {
    const reputationalFieldset = document.getElementById("reputationalReturnsFieldset");
    const capabilitiesFieldset = document.getElementById("capabilitiesReturnsFieldset");

    reputationalFieldset.setAttribute("data-disabled", "false");
    capabilitiesFieldset.setAttribute("data-disabled", "false");
}

// Call this function after the page loads to set initial fieldset states.
window.addEventListener('DOMContentLoaded', initializeFieldsetStates);

/**
 * Toggles the enabled/disabled state (blur effect) of the reputational or capabilities fieldsets.
 * Disabling a fieldset also updates the displayed formula and resets results.
 * @param {string} fieldsetId - The ID of the fieldset to toggle ('reputationalReturnsFieldset' or 'capabilitiesReturnsFieldset').
 */
function toggleBlur(fieldsetId) {
    const reputationalFieldset = document.getElementById("reputationalReturnsFieldset");
    const capabilitiesFieldset = document.getElementById("capabilitiesReturnsFieldset");
    const reputationalIcon = document.getElementById("toggleReputationalIcon"); // Icon for reputational toggle.
    const capabilitiesIcon = document.getElementById("toggleCapabilitiesIcon"); // Icon for capabilities toggle.

    if (fieldsetId === "reputationalReturnsFieldset") {
        const isDisabled = reputationalFieldset.getAttribute("data-disabled") === "true"; // Check current state.

        // Toggle `data-disabled` for both reputational and capabilities fieldsets.
        reputationalFieldset.setAttribute("data-disabled", isDisabled ? "false" : "true");
        capabilitiesFieldset.setAttribute("data-disabled", isDisabled ? "false" : "true");

        // Apply blur/opacity styles and disable/enable inputs for both.
        toggleDisableFieldset(reputationalFieldset, !isDisabled);
        toggleDisableFieldset(capabilitiesFieldset, !isDisabled);

        // Adjust display of capability icon based on new state.
        capabilitiesIcon.style.display = isDisabled ? "block" : "none";

    } else if (fieldsetId === "capabilitiesReturnsFieldset") {
        // Only toggle capabilities if reputational is currently enabled.
        if (reputationalFieldset.getAttribute("data-disabled") === "false") {
            const isDisabled = capabilitiesFieldset.getAttribute("data-disabled") === "true";

            capabilitiesFieldset.setAttribute("data-disabled", isDisabled ? "false" : "true");

            toggleDisableFieldset(capabilitiesFieldset, !isDisabled);
        }
    }

    updateFormulaBasedOnReturns(); // Update the formula display based on new states.
    resultsPanel('off'); // Turn off results panel as inputs have changed.
}

/**
 * Applies or removes visual disabled styles (color, opacity) and actual `disabled` attribute
 * to all form elements within a given fieldset.
 * @param {HTMLElement} fieldset - The fieldset element to modify.
 * @param {boolean} disable - True to disable, false to enable.
 */
function toggleDisableFieldset(fieldset, disable) {
    // Select all relevant form elements and text within the fieldset.
    const elements = fieldset.querySelectorAll("input, button, select, textarea, label, span, legend");

    elements.forEach(element => {
        element.disabled = disable; // Set HTML `disabled` attribute.
        element.style.color = disable ? "#333" : ""; // Change text color to gray when disabled.
        element.style.opacity = disable ? "0.50" : "1"; // Reduce opacity when disabled.
    });

    // Apply the same style to the fieldset itself for consistent appearance.
    fieldset.style.color = disable ? "#333" : "";
    fieldset.style.opacity = disable ? "0.50" : "1";
}

/**
 * Displays the calculated HROE value in the specified element,
 * applying positive (green) or negative (red) color based on its sign.
 * @param {HTMLElement} element - The HTML element where the HROE value will be displayed.
 * @param {number} hroeValue - The calculated HROE value.
 */
function displayHROE(element, hroeValue) {
    element.innerHTML = `<div class="varvalue">${hroeValue.toFixed(2)}</div>`; // Display with 2 decimal places.
    if (hroeValue >= 0) {
        element.classList.add('positive-value');
        element.classList.remove('negative-value');
    } else {
        element.classList.add('negative-value');
        element.classList.remove('positive-value');
    }
}

/**
 * Saves the current form input values to local storage under the key 'defaults'.
 * @deprecated - Use `saveToMemory()` instead for more robust storage.
 */
function saveDefaults() {
    const inputs = document.querySelectorAll('.left-column input');
    const defaults = {};

    inputs.forEach(input => {
        defaults[input.id] = input.value;
    });

    localStorage.setItem('defaults', JSON.stringify(defaults));
    alert('Defaults have been saved!'); // Using alert, consider replacing with a custom modal in Canvas.

    console.log('Defaults saved to localStorage:', defaults); // Debugging output.
}

/**
 * Toggles the visibility and interactivity of the results panel.
 * When 'off', the panel is blurred, opaque, and non-interactive.
 * @param {string} toggleSwitch - 'on' to enable/show, 'off' to disable/hide.
 */
function resultsPanel(toggleSwitch) {
    const bottomPanel = document.querySelector('.bottom-panel'); // The main results panel container.
    const toggleImage = document.querySelector('.toggle-img'); // Reference to a toggle image, possibly for visual state.

    if (toggleSwitch === 'off') {
        // Apply blur, reduce opacity, and disable pointer events.
        bottomPanel.style.filter = 'blur(5px)';
        bottomPanel.style.opacity = '0.5';
        bottomPanel.style.pointerEvents = 'none';

        // Clear specific elements within the results panel.
        document.getElementById('explanation-panel').innerText = '';
        document.getElementById('hroeResultDisplay').innerText = '';
        document.getElementById('hroeDisplay').style.display = 'none';
        document.getElementById('resultsHeader').style.display = 'none';
    } else {
        // Remove blur, restore opacity, and enable pointer events.
        bottomPanel.style.filter = 'none';
        bottomPanel.style.opacity = '1';
        bottomPanel.style.pointerEvents = 'auto';
    }
}

/**
 * Disables the HROE calculation button visually and functionally.
 */
function disableHROEButton() {
    const hroebutton = document.getElementById('hroebutton');
    hroebutton.classList.add('disabled');
    hroebutton.disabled = true; // Disable the button attribute.
}

/**
 * Enables the HROE calculation button visually and functionally.
 */
function enableHROEButton() {
    const hroebutton = document.getElementById('hroebutton');
    hroebutton.classList.remove('disabled');
    hroebutton.disabled = false; // Enable the button attribute.
}

/**
 * Loads saved form values from local storage.
 * It retrieves the 'memory' object and populates input fields.
 */
function loadDefaults() {
    const inputs = document.querySelectorAll('.left-column input');
    const memory = JSON.parse(localStorage.getItem('memory')); // Retrieve the 'memory' object.

    if (memory) {
        inputs.forEach(input => {
            const key = input.id;
            if (memory.hasOwnProperty(key)) {
                input.value = memory[key]; // Set input value from memory.
            } else {
                // Handle cases where a key might be missing in memory.
            }
        });
        document.getElementById('exampleMessage').innerHTML = "Loaded Default Form" // Update status message.
    } else {
        console.log('No memory object found in localStorage.');
    }
}

/**
 * Displays the startup message overlay, guiding the user to interact with the form.
 */
function showStartupMessage() {
    document.querySelector('.startupMessageLine1').style.display = 'block';
    document.querySelector('.startupMessageLine2').style.display = 'block';
    document.querySelector('.startupMessageOverlay').style.display = 'block';
}

/**
 * Hides the startup message overlay.
 */
function hideStartupMessage() {
    document.querySelector('.startupMessageLine1').style.display = 'none';
    document.querySelector('.startupMessageLine2').style.display = 'none';
    document.querySelector('.startupMessageOverlay').style.display = 'none';
}

/**
 * Checks if all required input fields are blank.
 * @returns {boolean} - True if all fields are blank, false otherwise.
 */
function allFieldsBlank() {
    const allFields = document.querySelectorAll('.field-to-check');
    let allFilled = true; // Assume all are filled initially.

    // Iterate through fields; if any is empty, set allFilled to false.
    allFields.forEach(field => {
        if (field.value.trim() === '') {
            allFilled = false;
        }
    });
    return !allFilled; // Returns true if *any* field is blank (opposite of allFilled).
}

/**
 * Checks the fill status of all required input fields and enables/disables the HROE button accordingly.
 */
function checkAllFields() {
    const allFields = document.querySelectorAll('.field-to-check');
    let allFilled = true;

    allFields.forEach(field => {
        if (field.value.trim() === '') {
            allFilled = false;
        }
    });

    if (allFilled) {
        hideStartupMessage(); // Hide startup message if all fields are filled.
        enableHROEButton(); // Enable calculation button.
    } else {
        // showStartupMessage(); // Can optionally show startup message, currently commented out.
        disableHROEButton(); // Disable calculation button.
    }
}

/**
 * Saves the current state of all input form data to local storage under the key 'memory'.
 * It also triggers a save of local storage to a file.
 */
function saveToMemory() {
    const inputs = document.querySelectorAll('.left-column input');
    const formData = {};

    // Collect all input values into an object.
    inputs.forEach(input => {
        formData[input.id] = input.value;
    });

    localStorage.setItem('memory', JSON.stringify(formData)); // Save the data to local storage.
    document.getElementById('exampleMessage').innerHTML = 'Saved Default Form'; // Update status message.

    saveLocalStorageToFile(); // Trigger saving local storage to a file.
}

/**
 * Updates the 'Economic Returns' calculated field based on 'Organizational Revenues' and 'Fine Avoidance' inputs.
 * It handles comma-separated values for yearly entries.
 */
function updateEconomicReturns() {
    const revenueField = document.getElementById('org_revenues');
    const fineAvoidanceField = document.getElementById('fine_avoidance');
    const economicReturnField = document.getElementById('calc_economic_returns');

    // Parse comma-separated revenues and fine avoidance percentages.
    const revenues = revenueField.value.split(',').map(value => parseFloat(value.replace(/,/g, '').trim()));
    const fineAvoidances = fineAvoidanceField.value.split(',').map(value => parseFloat(value.trim()));

    const maxLength = Math.max(revenues.length, fineAvoidances.length); // Determine max length for iteration.
    const economicReturns = [];

    // Calculate economic return for each year.
    for (let i = 0; i < maxLength; i++) {
        const revenue = revenues[i];
        const fineAvoidance = fineAvoidances[i];

        if (!isNaN(revenue) && !isNaN(fineAvoidance)) {
            const calculatedReturn = revenue * (fineAvoidance / 100);
            economicReturns.push(calculatedReturn.toLocaleString('en-US', { // Format to 2 decimal places.
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }));
        } else {
            economicReturns.push("0.00"); // Default to "0.00" if input is invalid or missing.
        }
    }

    economicReturnField.value = economicReturns.join(','); // Display calculated returns as comma-separated string.
}

// Variable to track the current index of the displayed example (from hroeExamples array).
let currentIndex = 0;

/**
 * Populates the form with sample values from the `hroeExamples` array.
 * Allows navigation through examples (first, last, previous, next).
 * @param {string} direction - 'first', 'last', 'left', or 'right' to navigate examples.
 */
function populateWithSampleValues(direction) {
    // Adjust currentIndex based on navigation direction.
    if (direction === 'right') {
        if (currentIndex >= (hroeExamples.length - 1)) currentIndex = -1;
        currentIndex = (currentIndex + 1) % hroeExamples.length;
    } else if (direction === 'left') {
        if (currentIndex <= 0) currentIndex = hroeExamples.length;
        currentIndex = (currentIndex - 1 + hroeExamples.length) % hroeExamples.length;
    } else if (direction === 'first') {
        currentIndex = 0;
    } else if (direction === 'last') {
        currentIndex = hroeExamples.length - 1;
    }

    // Update the example message display.
    if (currentIndex <= 0) {
        document.getElementById('exampleMessage').textContent = `Example from Paper`;
    } else {
        document.getElementById('exampleMessage').textContent = `Example ${currentIndex + 1} of ${hroeExamples.length}`;
    }

    const values = hroeExamples[currentIndex]; // Get the example data for the current index.

    // Populate all relevant input fields with example values.
    document.getElementById('initial_investment').value = values.initial_investment;
    document.getElementById('years').value = values.years;
    document.getElementById('discount').value = values.discount;
    document.getElementById('org_revenues').value = values.org_revenues;
    document.getElementById('fine_avoidance').value = values.fine_avoidance;
    document.getElementById('intangible_value').value = values.intangible_value;
    document.getElementById('investment_cost').value = values.investment_cost;
    document.getElementById('capability_returns').value = values.capability_returns;

    updateEconomicReturns(); // Recalculate economic returns based on new example data.
    generateEditableTable(values.years); // Re-generate/update the editable table.

    enableHROEButton(); // Enable calculation button.
    calculateHROE(); // Recalculate HROE.
    resultsPanel('on'); // Show results panel.
}

// Event listener for elements with `data-tooltip` attribute to display custom tooltips.
document.querySelectorAll('[data-tooltip]').forEach(function (element) {
    element.addEventListener('mouseover', function (event) {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltipType = element.getAttribute('data-tooltip-type');

        let tooltip = document.createElement('div');
        tooltip.className = 'tooltip-custom';
        if (tooltipType === 'warning') {
            tooltip.classList.add('tooltip-warning');
        }
        tooltip.innerHTML = tooltipText; // Use innerHTML to allow HTML content in tooltips.
        document.body.appendChild(tooltip); // Append tooltip to body.

        const rect = element.getBoundingClientRect();
        // Position tooltip relative to the element, adjusting for scroll and size.
        tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
        tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 5}px`;

        requestAnimationFrame(() => {
            tooltip.classList.add('tooltip-visible'); // Make tooltip visible with animation.
        });

        // Update tooltip position on mouse movement for dynamic follow.
        element.addEventListener('mousemove', function (event) {
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY - tooltip.offsetHeight - 10}px`;
        });

        // Hide and remove tooltip on mouse out.
        element.addEventListener('mouseout', function () {
            tooltip.classList.remove('tooltip-visible');
            tooltip.addEventListener('transitionend', function () {
                tooltip.remove(); // Remove tooltip from DOM after transition.
            }, { once: true });
        }, { once: true }); // Ensure mouseout listener only runs once.
    });
});

/**
 * Clears the example message when the user starts typing or interacting with an input field.
 * This indicates the user is no longer using an example.
 */
function clearMessageOnInput() {
    if (this.value.trim() !== '') {
        currentIndex = -1; // Reset example index.
        document.getElementById('exampleMessage').innerHTML = ''; // Clear message.
    }
}
// Attach 'input' event listeners to all input, select, and textarea elements to clear messages.
const inputFields = document.querySelectorAll('input, select, textarea');
inputFields.forEach(function (input) {
    input.addEventListener('input', clearMessageOnInput);
});

/**
 * Clears all data from local storage and updates the example message.
 */
function deleteLocalStorage() {
    localStorage.clear(); // Clear all key-value pairs from local storage.
    document.getElementById('exampleMessage').innerHTML = 'Deleted Default Form'; // Update message.
}

/**
 * Erases all input fields in the form and updates the example message.
 * It also turns off the results panel and disables the HROE button.
 */
function eraseForm() {
    document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
        input.value = ''; // Set all input values to empty.
    });

    currentIndex = -1; // Reset example index.
    document.getElementById('exampleMessage').innerHTML = '--- BLANK FORM ---'; // Set message for blank form.
    resultsPanel('off'); // Hide results.
    validateCommaSeparatedInputs(); // Re-validate (will likely show missing entries warning).
    disableHROEButton(); // Disable calculation button.
}

// Variable to track the current index when navigating through saved memory entries (Not fully implemented/used).
let currentMemoryIndex = 0;

/**
 * Navigates through saved memory entries in local storage (Functionality needs 'memory' to be an array of objects).
 * @param {number} direction - +1 for next, -1 for previous.
 */
function navigateMemory(direction) {
    let memory = JSON.parse(localStorage.getItem('memory')) || []; // Retrieve memory, default to empty array.

    if (memory.length > 0) {
        currentMemoryIndex += direction;

        // Keep index within valid bounds.
        if (currentMemoryIndex >= memory.length) {
            currentMemoryIndex = memory.length - 1;
        } else if (currentMemoryIndex < 0) {
            currentMemoryIndex = 0;
        }

        const memoryEntry = memory[currentMemoryIndex];

        // Populate input fields from the retrieved memory entry.
        const inputs = document.querySelectorAll('.left-column input');
        inputs.forEach((input, index) => {
            // Ensure `memoryEntry.values` is an array and access elements by index.
            // This suggests `memory` might be structured differently than just a simple object of defaults.
            input.value = memoryEntry.values[index] !== undefined ? memoryEntry.values[index] : '';
        });

        document.getElementById('timestampDisplay').textContent = `Retrieved on: ${memoryEntry.timestamp}`;
    } else {
        document.getElementById('timestampDisplay').textContent = 'No memory available';
    }
}

/**
 * Clears all memory entries from local storage and resets all input fields.
 * @deprecated - `deleteLocalStorage()` is more direct for clearing all storage.
 */
function clearMemory() {
    localStorage.clear(); // Clear all local storage.

    // Clear all input fields.
    const inputs = document.querySelectorAll('.left-column input');
    inputs.forEach(input => {
        input.value = '';
    });
}

/**
 * Loads local storage data from a user-selected JSON file.
 * The file must be named 'localStorageData.json'.
 */
function loadLocalStorageFromFile() {
    const filename = 'localStorageData.json';

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json'; // Accept only JSON files.

    input.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.name !== filename) {
            console.error(`Please select the file named ${filename}.`);
            return;
        }

        const text = await file.text(); // Read file content as text.
        const data = JSON.parse(text); // Parse JSON data.

        // Store each key-value pair from the file into local storage.
        for (const [key, value] of Object.entries(data)) {
            localStorage.setItem(key, value);
        }

        console.log('localStorage has been reloaded with data from the file.');
    });

    input.click(); // Programmatically open the file dialog.
}

/**
 * Saves all current local storage data to a JSON file named 'localStorageData.json'.
 */
function saveLocalStorageToFile() {
    const filename = 'localStorageData.json';

    const data = { ...localStorage }; // Get all data from localStorage.
    const jsonData = JSON.stringify(data, null, 2); // Convert to formatted JSON string.

    const blob = new Blob([jsonData], { type: 'application/json' }); // Create a Blob.
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename; // Set download filename.

    document.body.appendChild(link);
    link.click(); // Trigger download.
    document.body.removeChild(link); // Clean up the temporary link.

    console.log(`localStorage data saved to ${filename}.`);
}

// Initial state for table view toggle.
isTableView = false;

/**
 * Toggles between the default input form view and the editable table view.
 * It also hides the chart view if active.
 */
function toggleEditableTable() {
    const defaultView = document.getElementById('defaultview');
    const editableTableContainer = document.getElementById('editableTableContainer');
    const returnsChartContainer = document.getElementById('returnsChartContainer');
    const toggleLink = document.getElementById('editableTableViewToggle'); // The button that triggers this.
    const years = parseInt(document.getElementById('years').value);

    returnsChartContainer.style.display = 'none'; // Ensure chart is hidden.

    if (!isTableView) {
        generateEditableTable(years); // Generate table if switching to table view.
        defaultView.style.display = 'none';
        returnsChartContainer.style.display = 'none';
        editableTableContainer.style.display = 'block'; // Show table.
        toggleLink.innerHTML = '<img class="svgimage" src="icons/show-data--cards.svg" alt="Switch to Default View">'; // Update button icon/text.
    } else {
        updateFormFromTable(); // Sync table data back to form before switching.
        editableTableContainer.style.display = 'none';
        returnsChartContainer.style.display = 'none';
        defaultView.style.display = 'block'; // Show default form.
        toggleLink.innerHTML = '<img class="svgimage" src="icons/table--split.svg" alt="Switch to Table View">'; // Update button icon/text.
    }
    isTableView = !isTableView; // Toggle the view state.
}

/**
 * Displays the returns chart, hiding the default input form and editable table.
 * It retrieves the necessary data and calls `renderReturnsChart`.
 */
function displayReturnsChart() {
    const defaultView = document.getElementById('defaultview');
    const editableTableContainer = document.getElementById('editableTableContainer');
    const returnsChartContainer = document.getElementById('returnsChartContainer');

    defaultView.style.display = 'none';
    editableTableContainer.style.display = 'none';

    // Retrieve all input values needed for the chart.
    I_t = parseFloat(document.getElementById('initial_investment').value);
    N = parseInt(document.getElementById('years').value);
    alpha = parseFloat(document.getElementById('discount').value);
    economicReturns = document.getElementById('calc_economic_returns').value.split(',').map(Number);
    fineAvoidanceValue = document.getElementById('fine_avoidance').value.split(',').map(Number);
    capabilityReturns = document.getElementById('capability_returns').value.split(',').map(Number);
    intangibleValues = document.getElementById('intangible_value').value.split(',').map(Number);
    capabilityCosts = document.getElementById('investment_cost').value.split(',').map(Number);

    document.getElementById('resultsHeader').style.display = 'block';
    document.getElementById('hroeDisplay').style.display = 'block';

    // Render the chart with the collected data.
    renderReturnsChart(N, economicReturns, fineAvoidanceValue, capabilityReturns, intangibleValues, I_t, capabilityCosts);
    returnsChartContainer.style.display = 'block'; // Show the chart container.
}

/**
 * Dynamically generates an editable HTML table based on the number of years.
 * It populates the table with current form data and allows in-table editing.
 * @param {number} years - The number of years for which to generate table rows.
 */
function generateEditableTable(years) {
    const editableTableContainer = document.getElementById("editableTableContainer");
    editableTableContainer.innerHTML = ""; // Clear any existing table content.

    const editableDataTable = document.createElement("table");
    editableDataTable.id = "editableDataTable";

    // Fetch live values from form fields and split them into arrays.
    const capabilityCosts = document.getElementById('investment_cost').value.split(',');
    const orgRevenues = document.getElementById('org_revenues').value.split(',');
    const fineAvoidanceValues = document.getElementById('fine_avoidance').value.split(',');
    const economicReturns = document.getElementById('calc_economic_returns').value.split(',');
    const reputationalReturns = document.getElementById('intangible_value').value.split(',');
    const capabilityReturns = document.getElementById('capability_returns').value.split(',');

    // Array of column data, matching the order of table headers.
    const dataColumns = [capabilityCosts, orgRevenues, fineAvoidanceValues, economicReturns, reputationalReturns, capabilityReturns];

    // Create table headers.
    const thead = document.createElement('thead');
    const headers = ['Year', 'Cost for Capabilities', 'Organizational Revenue', 'Fine Avoidance Value', 'Economic Return', 'Reputational Returns', 'Returns on Capabilities'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    editableDataTable.appendChild(thead);

    // Create table body with editable cells.
    const tbody = document.createElement('tbody');
    for (let i = 0; i < years; i++) {
        const row = document.createElement('tr');

        // Year column (first column) - non-editable.
        const yearCell = document.createElement('td');
        yearCell.style.backgroundColor = '#f4f4f4'; // Light grey background for non-editable.
        yearCell.className = 'year-column';
        yearCell.innerText = `${i + 1}`;
        row.appendChild(yearCell);

        // Populate remaining columns with data.
        dataColumns.forEach((dataArray, colIndex) => {
            const cell = document.createElement('td');

            if (colIndex === 3) { // Economic Return column (index 3 in dataColumns, corresponds to 5th cell in row).
                cell.className = 'economic-return-column';
                cell.style.backgroundColor = '#f4f4f4'; // Non-editable.
                // Calculate and set economic return based on current row's revenue and fine avoidance.
                cell.innerText = calculateEconomicReturn(orgRevenues[i] || "0", fineAvoidanceValues[i] || "0");
            } else {
                // Other columns are editable.
                cell.contentEditable = true;
                cell.innerText = dataArray[i] ? dataArray[i].trim() : "0"; // Use existing value or "0".

                // Add event listeners for input changes in editable cells.
                cell.addEventListener("input", () => {
                    if (colIndex === 1 || colIndex === 2) { // If Org Revenue or Fine Avoidance changes.
                        const economicReturnCell = row.cells[4]; // Get the Economic Return cell (5th cell).
                        // Recalculate economic return for this row.
                        economicReturnCell.innerText = calculateEconomicReturn(row.cells[2].innerText, row.cells[3].innerText);
                    }
                    updateFormFromTable(); // Sync table changes back to the main form.
                });
                // Hover effects for editable cells.
                cell.addEventListener('mouseover', () => cell.style.backgroundColor = "#F4FFF4");
                cell.addEventListener('mouseout', () => cell.style.backgroundColor = "#fff");
                // cell.addEventListener("keydown", (event) => handleCellNavigation(event, years, i, colIndex)); // Disabled for now.
            }
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    }
    editableDataTable.appendChild(tbody);
    editableTableContainer.appendChild(editableDataTable);

    // Adjust container scrolling based on row count for better UX.
    editableTableContainer.style.maxHeight = years > 15 ? '400px' : 'unset';
    editableTableContainer.style.overflowY = years > 15 ? 'auto' : 'unset';
    editableTableContainer.style.display = 'block'; // Ensure the table is visible.

    updateTableFromForm(); // Initial synchronization to ensure table reflects form.
}

/**
 * Helper function to calculate Economic Return for a single year based on revenue and fine avoidance.
 * @param {string} revenue - The organizational revenue for the year.
 * @param {string} fineAvoidance - The fine avoidance percentage for the year.
 * @returns {string} - The formatted economic return value.
 */
function calculateEconomicReturn(revenue, fineAvoidance) {
    const orgRevenue = parseFloat(revenue.replace(/,/g, '')) || 0; // Parse revenue, remove commas.
    const fineAvoidancePercentage = parseFloat(fineAvoidance) || 0; // Parse fine avoidance.
    const economicReturn = orgRevenue * (fineAvoidancePercentage / 100); // Calculation.
    // Format to 2 decimal places and add locale string for commas.
    return economicReturn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Synchronizes data from the main input form fields to the editable table.
 * This ensures the table always reflects the latest data from the form.
 */
function updateTableFromForm() {
    const N = parseInt(document.getElementById('years').value);
    // Get values from all form fields (comma-separated strings).
    const capabilityCosts = document.getElementById('investment_cost').value.split(',');
    const orgRevenues = document.getElementById('org_revenues').value.split(',');
    const fineAvoidanceValues = document.getElementById('fine_avoidance').value.split(',');
    const economicReturns = document.getElementById('calc_economic_returns').value.split(',');
    const reputationalReturns = document.getElementById('intangible_value').value.split(',');
    const capabilityReturns = document.getElementById('capability_returns').value.split(',');

    // List of all data columns in table order.
    const dataColumns = [capabilityCosts, orgRevenues, fineAvoidanceValues, economicReturns, reputationalReturns, capabilityReturns];

    const tbody = document.getElementById("editableDataTable")?.querySelector("tbody"); // Get table body.
    if (tbody) {
        Array.from(tbody.rows).forEach((row, rowIndex) => {
            if (rowIndex < N) { // Only update rows within the specified number of years.
                dataColumns.forEach((columnData, colIndex) => {
                    const cell = row.cells[colIndex + 1]; // +1 because year column is first.
                    if (colIndex === 3) { // If it's the Economic Return column.
                        const orgRevenue = parseFloat(orgRevenues[rowIndex] || "0");
                        const fineAvoidance = parseFloat(fineAvoidanceValues[rowIndex] || "0");
                        const economicReturn = orgRevenue * (fineAvoidance / 100);
                        cell.innerText = economicReturn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    } else {
                        // For other columns, set cell text from corresponding data array.
                        cell.innerText = columnData[rowIndex] ? columnData[rowIndex].trim() : "0";
                    }
                });
            }
        });
    } else {
        console.error("Table body not found. Cannot update table from form.");
    }
}

/**
 * Synchronizes data from the editable table back to the main input form fields.
 * This ensures that changes made directly in the table are reflected in the form inputs.
 */
function updateFormFromTable() {
    resultsPanel('off'); // Hide results panel as inputs are changing.
    const N = parseInt(document.getElementById('years').value);

    // References to the main form input fields.
    const capabilityCostsField = document.getElementById('investment_cost');
    const orgRevenuesField = document.getElementById('org_revenues');
    const fineAvoidanceField = document.getElementById('fine_avoidance');
    const economicReturnsField = document.getElementById('calc_economic_returns');
    const reputationalReturnsField = document.getElementById('intangible_value');
    const capabilityReturnsField = document.getElementById('capability_returns');

    // Arrays to temporarily hold values collected from table columns.
    const columnValues = [[], [], [], [], [], []];
    const tbody = document.getElementById("editableDataTable")?.querySelector("tbody");

    if (tbody) {
        Array.from(tbody.rows).forEach((row, rowIndex) => {
            if (rowIndex < N) { // Only process rows up to the current number of years.
                Array.from(row.cells).forEach((cell, colIndex) => {
                    if (colIndex > 0) { // Skip the first column (Year).
                        if (colIndex === 4) { // If it's the Economic Return column (index 4 in row.cells).
                            // Recalculate economic return based on adjacent cells (Org Revenue, Fine Avoidance).
                            const orgRevenue = parseFloat(row.cells[2].innerText.replace(/,/g, '')) || 0;
                            const fineAvoidance = parseFloat(row.cells[3].innerText) || 0;
                            const economicReturn = orgRevenue * (fineAvoidance / 100);
                            row.cells[4].innerText = economicReturn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            columnValues[3].push(row.cells[4].innerText); // Store the calculated value.
                        } else {
                            // Store other column values from the cell text.
                            columnValues[colIndex - 1].push(cell.innerText.trim());
                        }
                    }
                });
            }
        });

        // Update the main form fields by joining the collected column values with commas.
        capabilityCostsField.value = columnValues[0].join(',');
        orgRevenuesField.value = columnValues[1].join(',');
        fineAvoidanceField.value = columnValues[2].join(',');
        economicReturnsField.value = columnValues[3].join(',');
        reputationalReturnsField.value = columnValues[4].join(',');
        capabilityReturnsField.value = columnValues[5].join(',');
    } else {
        console.error("Table body not found. Cannot update form from table.");
    }
}

/**
 * Handles cell navigation within the editable table using arrow keys and 'Enter'.
 * It includes input validation for numeric characters.
 * @param {KeyboardEvent} event - The keyboard event object.
 * @param {number} numYears - The total number of years/rows in the table.
 * @param {number} rowIndex - The current row index.
 * @param {number} colIndex - The current column index.
 */
function handleCellNavigation(event, numYears, rowIndex, colIndex) {
    // Allow only numeric input, decimal points, and essential editing/navigation keys.
    const isNumericInput = (event.key >= "0" && event.key <= "9") || event.key === ".";
    const isNavigationKey = [
        "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", // Arrow keys.
        "Backspace", "Delete", "Tab", "Enter", "Escape",   // Editing/navigation keys.
        "Home", "End"                                      // Home and End keys.
    ].includes(event.key);

    // If the key is not numeric or a navigation/editing key, prevent default input.
    if (!isNumericInput && !isNavigationKey) {
        event.preventDefault();
        return;
    }
    const currentCell = document.querySelector(`td[data-year="${rowIndex + 1}"][data-col="${colIndex}"]`);
    currentCell.style.backgroundColor = "#fff"; // Reset background color of current cell.

    // Only handle navigation logic for arrow keys and Enter.
    if (isNavigationKey && !isNumericInput) {
        let targetRow = rowIndex;

        switch (event.key) {
            case "Enter":
            case "ArrowDown":
                event.preventDefault();
                targetRow += 1;
                if (targetRow >= numYears) targetRow = 0; // Wrap around to first row.
                break;
            case "ArrowUp":
                event.preventDefault();
                targetRow -= 1;
                if (targetRow < 0) targetRow = numYears - 1; // Wrap around to last row.
                break;
            case "ArrowRight":
                event.preventDefault();
                colIndex += 1;
                if (colIndex >= 5) colIndex = 0; // Wrap around to first editable column.
                break;
            case "ArrowLeft":
                event.preventDefault();
                colIndex -= 1;
                if (colIndex <= -1) colIndex = 4; // Wrap around to last editable column.
                break;
        }

        // Focus the target cell based on calculated row and column indices.
        const targetCell = document.querySelector(`td[data-year="${targetRow + 1}"][data-col="${colIndex}"]`);
        if (targetCell) {
            targetCell.focus();
        }
    }
}


// Event listener when the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", () => {

    // Attach 'input' event listeners to form fields that are mirrored in the table
    // to trigger `updateTableFromForm` when they change.
    document.querySelectorAll(".field-to-check[data-col]").forEach(input => {
        input.addEventListener("input", updateTableFromForm);
    });

    // Attach 'input' event listeners to table cells to trigger `updateFormFromTable` when they change.
    // Note: This relies on the table cells having `data-year` and `data-col` attributes set during generation.
    document.querySelectorAll("td[data-year][data-col]").forEach(cell => {
        cell.addEventListener("input", updateFormFromTable);
    });

});

/**
 * Updates a single original form field based on values from the editable table.
 * @param {string} fieldId - The ID of the form field to update.
 * @param {number} years - The number of years/rows to consider.
 * @deprecated - `updateFormFromTable` handles this for all fields simultaneously.
 */
function updateOriginalField(fieldId, years) {
    // Selects cells from the second column onwards that are editable.
    const rowCells = Array.from(document.querySelectorAll(`#editableDataTable tr td:nth-child(n+2)[contentEditable="true"]`));
    // Extracts text content, trims, slices to the number of years, and joins with commas.
    const values = rowCells.map(cell => cell.textContent.trim()).slice(0, years).join(',');
    document.getElementById(fieldId).value = values;
}

/**
 * Updates the editable table based on changes in the original form fields.
 * @param {Array<Object>} fields - An array of objects, each with an `id` and `label` for a form field.
 * @param {number} years - The number of years/rows to update.
 * @deprecated - `updateTableFromForm` handles this for all fields.
 */
function updateTableFromFields(fields, years) {
    fields.forEach((field, fieldIndex) => {
        const fieldValues = document.getElementById(field.id).value.split(','); // Get values from form field.
        // Select corresponding cells in the table.
        const rowCells = Array.from(document.querySelectorAll(`#editableDataTable tr:nth-child(${fieldIndex + 2}) td:nth-child(n+2)`));

        rowCells.forEach((cell, yearIndex) => {
            if (yearIndex < years) {
                cell.textContent = fieldValues[yearIndex] || ''; // Set cell content.
            }
        });
    });
}

// Event listener for when the DOM content is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
    const revenueField = document.getElementById('org_revenues');
    const fineAvoidanceField = document.getElementById('fine_avoidance');
    const economicReturnField = document.getElementById('calc_economic_returns');

    /**
     * Calculates and updates the 'Economic Returns' field. This is a local function
     * within the DOMContentLoaded scope, but performs the same logic as the global `updateEconomicReturns`.
     */
    function calculateEconomicReturns() {
        const revenues = revenueField.value.split(',').map(value => parseFloat(value.replace(/,/g, '').trim()));
        const fineAvoidances = fineAvoidanceField.value.split(',').map(value => parseFloat(value.trim()));

        const maxLength = Math.max(revenues.length, fineAvoidances.length);
        const economicReturns = [];

        for (let i = 0; i < maxLength; i++) {
            const revenue = revenues[i];
            const fineAvoidance = fineAvoidances[i];

            if (!isNaN(revenue) && !isNaN(fineAvoidance)) {
                const calculatedReturn = revenue * (fineAvoidance / 100);
                economicReturns.push(calculatedReturn.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }));
            } else {
                economicReturns.push("0.00");
            }
        }

        economicReturnField.value = economicReturns.join(',');
    }

    // Event listeners to trigger `calculateEconomicReturns` when source fields change.
    revenueField.addEventListener('input', calculateEconomicReturns);
    fineAvoidanceField.addEventListener('input', calculateEconomicReturns);

    calculateEconomicReturns(); // Initial calculation for any pre-populated values.
});

// Event listener to hide the startup message overlay when any part of the document is clicked.
document.addEventListener('click', function (event) {
    var overlay = document.getElementById('startupMessageOverlay');
    if (overlay) { // Check if overlay exists to prevent errors.
        overlay.style.display = 'none';
    }
});

/**
 * Renders a chart for returns (Economic, Intangible, Capability).
 * This function seems to be an older or alternative chart rendering logic
 * compared to `renderROIOverTimeChart` as it uses `returnsChart` canvas directly.
 * @param {number} N - Number of years.
 * @param {number[]} economicReturns - Economic returns data.
 * @param {number[]} fineAvoidanceValue - Fine avoidance data.
 * @param {number[]} capabilityReturns - Capability returns data.
 * @param {number[]} intangibleValues - Intangible returns data.
 * @param {number} initialInvestment - Initial investment.
 * @param {number[]} capabilityCosts - Capability costs data.
 */
function renderReturnsChart(N, economicReturns, fineAvoidanceValue, capabilityReturns, intangibleValues, initialInvestment, capabilityCosts) {
    if (isNaN(N)) return;
    const language = document.getElementById('language').value;
    const labels = Array.from({ length: N }, (_, i) => translationsData[language].chart.year + ` ${i + 1}`);

    // Combine Economic Returns and Fine Avoidance for display in chart.
    const economicCombined = economicReturn.map((value, index) => value + (fineAvoidanceValue[index] || 0));

    // Cumulative sums (these are calculated but not directly used in the current chart data definition).
    const cumulativeCapabilityCosts = capabilityCosts.map((cost, index) => {
        return capabilityCosts.slice(0, index + 1).reduce((a, b) => a + b, 0);
    });

    const cumulativeCapabilityReturns = capabilityReturns.map((returnValue, index) => {
        return capabilityReturns.slice(0, index + 1).reduce((a, b) => a + b, 0);
    });

    // Chart.js data structure.
    const data = {
        labels: labels,
        datasets: [
            {
                label: translationsData[language].chart.economicReturns,
                data: economicCombined,
                backgroundColor: 'rgba(52, 152, 219, 0.5)', // Strong Blue.
                borderColor: 'rgba(41, 128, 185, 1)', // Darker Blue.
                borderWidth: 1
            },
            {
                label: translationsData[language].chart.intangibles,
                data: intangibleValues,
                backgroundColor: 'rgba(241, 196, 15, 0.5)', // Bright Yellow.
                borderColor: 'rgba(243, 156, 18, 1)', // Darker Yellow/Orange.
                borderWidth: 1
            },
            {
                label: translationsData[language].chart.capabilityReturns,
                data: capabilityReturns,
                backgroundColor: 'rgba(155, 89, 182, 0.5)', // Strong Purple.
                borderColor: 'rgba(142, 68, 173, 1)', // Darker Purple.
                borderWidth: 1
            }
        ]
    };

    if (investmentChart) {
        investmentChart.destroy(); // Destroy any existing chart instance.
    }

    const ctx = document.getElementById('returnsChart').getContext('2d'); // Get 2D rendering context of canvas.
    investmentChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: translationsData[language].chart.value,
                        font: {
                            size: 16
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 14
                        }
                    },
                    title: {
                        display: true,
                        text: '', // No X-axis title needed here as labels are self-explanatory.
                        font: {
                            size: 16
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 14
                        },
                        padding: 10
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (context.parsed.y !== null) {
                                // Custom tooltip label formatting to include currency and "M" for millions.
                                label += `: ${context.parsed.y.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1
                                }).replace("$", "$")}M`;
                            }
                            return label;
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 20
                    }
                }
            }
        }
    });
}

/**
 * Toggles the 'flipped' class on the 'flipper' element,
 * creating a 3D flip animation to show the back side (e.g., explanation panel).
 */
function togglePanel() {
    const flipper = document.getElementById('flipper');
    flipper.classList.toggle('flipped');
}

/**
 * Formats comma-separated entries into a string with "Year X: value million" for PDF generation.
 * @param {string} entries - A comma-separated string of values.
 * @returns {string} - Formatted string with each entry prefixed by its year.
 */
function classifyByYear(entries) {
    return entries.split(',').map((entry, index) => `Year ${index + 1}: ${entry.trim()} million`).join('\n');
}

/**
 * Generates a PDF document of the calculator's inputs, explanation, and chart using jsPDF.
 * It handles pagination for content overflow.
 */
function generatePDF() {
    // Check if jsPDF library is loaded.
    if (typeof window.jspdf === 'undefined') {
        console.error("jsPDF is not loaded or defined");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let currentPage = 1;
    let currentY = 20; // Starting Y position for content on each page.
    const maxY = doc.internal.pageSize.height - 20; // Max Y position before new page.

    /**
     * Adds a header to the current page of the PDF.
     */
    function addHeader() {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("HROE Framework Calculator Results", 105, 10, null, null, 'center');
    }

    /**
     * Adds a footer with page numbers to the current page of the PDF.
     * @param {number} pageNumber - The current page number.
     * @param {number} totalPages - The total number of pages.
     */
    function addFooter(pageNumber, totalPages) {
        doc.setFontSize(12);
        doc.text(`Page ${pageNumber} of ${totalPages}`, 105, 15, null, null, 'center');
    }

    /**
     * Checks if there's enough space on the current page for additional content.
     * If not, it adds a new page and resets the Y position.
     * @param {number} additionalHeight - The estimated height of the content to be added.
     */
    function checkPageSpace(additionalHeight) {
        const currentPageHeight = doc.internal.pageSize.height;
        if (currentY + additionalHeight > currentPageHeight - 20) { // 20 is a bottom margin buffer.
            doc.addPage();
            currentY = 20; // Reset Y position.
            currentPage++;
            addHeader(); // Add header to the new page.
        }
    }

    /**
     * Adds a block of text to the PDF, handling text wrapping and pagination.
     * @param {string} text - The text content to add.
     * @param {number} additionalY - Vertical spacing before the text block.
     * @param {number} maxWidth - Maximum width for text wrapping.
     */
    function addTextBlock(text, additionalY = 10, maxWidth = 180) {
        const splitText = doc.splitTextToSize(text, maxWidth); // Split text to fit width.
        checkPageSpace(splitText.length * 10); // Estimate height needed for text.
        doc.text(splitText, 10, currentY += additionalY); // Add text at current Y.
        currentY += splitText.length * 10; // Increment Y by actual height used.
    }

    // Fetch all relevant input values and results from the HTML.
    const initialInvestment = document.getElementById('initial_investment').value;
    const years = document.getElementById('years').value;
    const discount = document.getElementById('discount').value;
    // Format comma-separated inputs for PDF.
    const economicReturns = classifyByYear(document.getElementById('org_revenues').value); // Using org_revenues for consistency with displayed values
    const fineAvoidance = classifyByYear(document.getElementById('fine_avoidance').value);
    const intangibleValue = classifyByYear(document.getElementById('intangible_value').value);
    const investmentCost = classifyByYear(document.getElementById('investment_cost').value);
    const capabilityReturns = classifyByYear(document.getElementById('capability_returns').value);
    const explanationText = document.getElementById('initial_explanation').innerText;

    // Legal Disclaimer text.
    const disclaimerText = `The return on investments in AI ethics and governance initiatives should be assessed holistically. While this calculator provides a helpful tool for assessing quantifiable returns, a holistic assessment should also include returns and impacts that are qualitative in nature. It is important to consider a broad set of stakeholders and the impact on society at large during the holistic assessment process.`;

    addHeader(); // Add header to the first page.

    // Add note and disclaimer.
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Note:", 10, currentY);

    currentY += 10;

    doc.setFont("helvetica", "normal");
    addTextBlock(disclaimerText);

    currentY += 10;

    // Add main title for results.
    doc.setFontSize(20);
    doc.text("HROE Results", 10, currentY);

    currentY += 20;

    // Add input values to the PDF.
    doc.setFontSize(14);
    addTextBlock(`Initial Investment: ${initialInvestment} million`);
    addTextBlock(`Years: ${years}`);
    addTextBlock(`Discount Rate: ${discount}`);
    addTextBlock(`Economic Returns (Organizational Revenue):`);
    addTextBlock(economicReturns, 5); // Use 5 for smaller line spacing.
    addTextBlock(`Fine Avoidance Value:`);
    addTextBlock(fineAvoidance, 5);
    addTextBlock(`Intangible Aspect Value (Reputational):`);
    addTextBlock(intangibleValue, 5);
    addTextBlock(`Investment Cost for Capabilities:`);
    addTextBlock(investmentCost, 5);
    addTextBlock(`Capability Returns:`);
    addTextBlock(capabilityReturns, 5);

    // Add explanation of results.
    addTextBlock(`Explanation of Results:`, 20);
    addTextBlock(explanationText);

    // Add a new page for the chart.
    doc.addPage();
    currentPage++;
    currentY = 20;
    addHeader(); // Add header to the new chart page.

    // Add chart image to the PDF.
    const canvas = document.getElementById('returnsChart'); // Get the canvas element where the chart is drawn.
    if (canvas) {
        const imgData = canvas.toDataURL('image/png'); // Convert canvas content to PNG data URL.
        doc.addImage(imgData, 'PNG', 10, currentY, 180, 80); // Add image to PDF.
    }

    // Get the total number of pages after all content has been added.
    const totalPages = doc.internal.getNumberOfPages();

    // Loop through all pages to add footers with dynamic page numbers.
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i); // Set the current page.
        addFooter(i, totalPages); // Add footer to the current page.
    }

    doc.save('HROE_Results.pdf'); // Save the generated PDF file.
}

/**
 * Shows the "Generate PDF" button if the current language is not Chinese or Japanese.
 * (PDF generation for these languages might have specific display challenges).
 */
function showGeneratePDFButton() {
    const currentLang = document.getElementById('language').value;
    if (currentLang !== 'zh' && currentLang !== 'ja') {
        document.getElementById('generatePDFButton').style.display = 'block';
    } else {
        document.getElementById('generatePDFButton').style.display = 'none';
    }
}

// Event listener for window resize to adjust container dimensions (ensures minimum size).
window.addEventListener('resize', function () {
    let container = document.querySelector('.container');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Maintain minimum width and height for the container.
    if (width < 1280) {
        container.style.width = '1280px';
    } else if (width > 1280) {
        // If window grows past 1280, it still caps the container width at 1280px.
        container.style.width = '1280px';
    }

    if (height < 1024) {
        container.style.height = '1024px';
    } else if (height > 1024) {
        // If window grows past 1024, it still caps the container height at 1024px.
        container.style.height = '1024px';
    }
});

// Event listener for when the DOM content is fully loaded.
document.addEventListener('DOMContentLoaded', function () {
    const inputFields = document.querySelectorAll('.field-to-check'); // Select all input fields that need checking.
    const calculateButton = document.getElementById('hroebutton'); // Reference to the HROE calculation button.

    /**
     * Checks if all required input fields are filled and enables/disables the calculate button accordingly.
     */
    function checkFormValues() {
        let allFilled = true;
        inputFields.forEach(function (input) {
            if (input.value === '') {
                allFilled = false; // If any field is empty, set flag to false.
            }
        });

        if (allFilled) {
            calculateButton.classList.remove('disabled'); // Remove 'disabled' class.
            calculateButton.disabled = false; // Enable the button.
        } else {
            calculateButton.classList.add('disabled'); // Add 'disabled' class.
            calculateButton.disabled = true; // Disable the button.
        }
    }

    // Attach 'input' event listeners to all relevant input fields to check form values dynamically.
    inputFields.forEach(function (input) {
        input.addEventListener('input', checkFormValues);
    });

});

// Event listener for when the DOM content is fully loaded (another one).
document.addEventListener("DOMContentLoaded", function() {
    // A small delay before updating the economic returns field initially.
    setTimeout(updateEconomicReturnsField, 50);
    resultsPanel('off') // Ensure results panel is off on initial load.
});

/**
 * Updates the 'calc_economic_returns' field based on the 'org_revenues' and 'fine_avoidance' inputs.
 * This is similar to `updateEconomicReturns` but focuses on a single calculated field rather than arrays.
 */
function updateEconomicReturnsField() {
    const calcEconomicReturnsField = document.getElementById('calc_economic_returns');
    
    // Get numeric values, defaulting to 0 if invalid.
    const orgRevenues = parseFloat(document.getElementById('org_revenues').value) || 0;
    const fineAvoidance = parseFloat(document.getElementById('fine_avoidance').value) || 0;
    const economicReturn = orgRevenues * (fineAvoidance / 100); // Calculate.

    // Update the field with the calculated value, formatted.
    calcEconomicReturnsField.value = economicReturn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Updates the UI state on page load: checks local storage for defaults,
 * loads them if present, and manages the visibility/enabled state of UI elements.
 */
function updateUIState() {
    if (localStorage.length === 0) { // If local storage is empty (first time user).
        resultsPanel('off');
        disableHROEButton();
        showStartupMessage(); // Show a welcome message.
    } else {
        loadDefaults(); // Load saved defaults.
        if (allFieldsBlank()) { // If loaded defaults result in blank fields.
            resultsPanel('off');
            disableHROEButton();
        } else {
            resultsPanel('on'); // Show results panel.
            enableHROEButton(); // Enable calculation button.
            calculateHROE(); // Perform initial calculation.
            hideStartupMessage(); // Hide startup message.
        }
    }
}

// Global window load event listener to trigger the initial UI state update.
window.onload = () => {
    updateUIState();
};