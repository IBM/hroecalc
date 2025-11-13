let investmentChart;
let capabilityCosts;
let capabilityCostValues;
let capabilityReturns;
let capabilityReturnValues;
let fineAvoidanceValue;
let fineAvoidanceValues;
let formulaExplanationContainer;
let economicReturn;
let economicReturnValues;
let discountFactor;
let reputationalReturnValues;
let discountedValue;
let isTableView = true;
let I_t;
let N;
let colIndex;
let alpha;
let netReturn;
let totalReturn;
let intangibleValue;
let intangibleValues
let roi;
let discountedIntangibleReturn;
let updatedroi;
let discountedReturn;
let netReturnCapabilities;
let updatedTotalReturn;
let totalInvestment;
let finalROI;

const leftPanel = document.querySelector('.formula-leftpanel');
const rightPanel = document.querySelector('.formula-container .formula');

import translationsData from './hroe-translations.js';
import hroeExamples from './hroe-examples.js';

export function highlightFormula(inputId) {
    // DOM manipulation commented out for Vue compatibility
    // Define elements to highlight for each input type
    // const elements = {
    //     years: ['Ny'],
    //     capabilities: [],
    //     discount: ['Alpha'],
    //     economic_returns: ['Re'],
    //     fine_avoidance: ['Rr'],
    //     capability_returns: ['Rc'],
    //     initial_investment: ['It1', 'It2'],
    //     investment_cost: ['Ic_t1', 'Ic_t2']
    // };

    // Reset color for all elements that may be highlighted
    // document.querySelectorAll('#sum1, #Ny, #Alpha, #Re, #Rr, #Rc, #It1, #It2, #Ic_t1, #Ic_t2').forEach(el => {
    //     if (el) el.style.color = '#4f4f4f'; // Default color
    // });

    // Apply highlight color only to elements that exist in the current formula
    // if (elements[inputId]) {
    //     elements[inputId].forEach(id => {
    //         const element = document.getElementById(id);
    //         if (element) {
    //             element.style.color = '#3498db'; // Highlight color
    //         }
    //     });
    // }
}



export function updateExplanation(inputId) {
    // Use Vue method if available (when called from Vue component context)
    if (this && typeof this.updateExplanation === 'function') {
        this.updateExplanation(inputId);
    }
}

export function generateYearlyExplanation(inputId, baseText) {
    // DOM manipulation commented out for Vue compatibility
    // const values = document.getElementById(inputId).value.split(',');
    // const yearExplanations = values.map((value, index) => {
    //     return `Year ${index + 1} = <div class="varvalue">${parseFloat(value)} million</div>`;
    // }).join(' ');
    // return baseText.replace('{details}', yearExplanations);
    return baseText; // Return base text for Vue compatibility
}

export function formatValue(value) {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
        return '?';
    }
    const formattedValue = (numValue * 1000000).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return `<div class="varvalue">${formattedValue}</div>`;
}

export function clearExplanation() {
    // Use Vue method if available (when called from Vue component context)
    if (this && typeof this.clearExplanation === 'function') {
        this.clearExplanation();
        this.clearFormulaHighlight();
    }
}

export function sumCommaSeparatedNumbers(numberString) {
    let numbersArray = numberString.split(',');
    let total = numbersArray.reduce((sum, number) => sum + parseFloat(number), 0);
    return total;
}

export function hasMultipleConsecutiveCommas(str) {
    // Regular expression to match two or more consecutive commas
    const regex = /,{2,}/;
    // Test the string against the regex
    return regex.test(str);
}

// const fieldsToCheck = ['economic_returns', 'fine_avoidance', 'intangible_value', 'investment_cost', 'capability_returns'];
export const fieldsToCheck = ['calc_economic_returns', 'intangible_value', 'investment_cost', 'capability_returns'];
export const originalNote = `<img src="icons/notification.svg" alt="Information Icon" style="width: 24px; height: 24px; position:relative;top:-2px;vertical-align: middle;"> The return on investments in AI ethics and governance initiatives should be assessed holistically. While this calculator provides a helpful tool for assessing quantifiable returns, a holistic assessment should also include returns and impacts that are qualitative in nature. It is important to consider a broad set of stakeholders and the impact on society at large during the holistic assessment process.`;

export function validateCommaSeparatedInputs() {
    // TODO: Convert to Vue-based validation
    // DOM manipulation commented out - should be handled by Vue computed properties and validation
    
    /* 
    const years = parseInt(document.getElementById('years').value);
    const returnsChartContainer = document.getElementById('returnsChartContainer');
    const editableTableContainer = document.getElementById('editableTableContainer');
    if (returnsChartContainer.style.display === 'block') {
        displayReturnsChart();
    }
    else if (editableTableContainer.style.display === 'block') {
        // generateEditableTable(years);
        this.showEditableTable = true
    }
    let message = '';
    let hasInvalidInput = false;
    let hasExtraEntries = false;
    let hasMissingEntries = false;


    const missingEntriesCount = {};
    const extraEntriesCount = {};
    let extraEntriesMessage = '';
    let missingEntriesMessage = '';
    const language = document.getElementById('language').value;

    fieldsToCheck.forEach(fieldId => {
        const fieldElement = document.getElementById(fieldId);
        const values = fieldElement.value.split(',').map(v => v.trim());
        const fieldName = fieldId.replace(/_/g, ' ').replace(/(^|\s)\S/g, letter => letter.toUpperCase());

        if (values.length < years) {
            hasMissingEntries = true;
            const missingEntries = years - values.length;
            if (!missingEntriesCount[missingEntries]) {
                missingEntriesCount[missingEntries] = [];
            }
            missingEntriesCount[missingEntries].push(fieldName);

            fieldElement.style.color = 'darkred';
            fieldElement.style.backgroundColor = 'rgb(250, 250, 239)';
            hasInvalidInput = true;
        } else if (values.length > years) {
            hasExtraEntries = true;
            const extraEntries = values.length - years;
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

            fieldElement.style.color = 'darkblue';
            fieldElement.style.backgroundColor = '#f5ffff';
            hasInvalidInput = true;
        } else {
            fieldElement.style.color = '';
            fieldElement.style.backgroundColor = '';
        }
    });

    // Generate missing entries message
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

    // Generate extra entries message
    for (const count in extraEntriesCount) {
        const fields = extraEntriesCount[count];
        if (fields.length > 1) {
            const lastField = fields.pop();
            const fieldList = fields.length > 1
                ? `${fields.map(f => `<div style="display:inline-block;color:darkblue;">${f}</div>`).join(', ')}, ${translationsData[language].and} <div style="display:inline-block;color:darkblue;">${lastField}</div>`
                : `<div style="display:inline-block;color:darkblue;">${fields[0]}</div> ${translationsData[language].and} <div style="display:inline-block;color:darkblue;">${lastField</div>`;
            extraEntriesMessage += `<div style="display:inline-block;">${fieldList}</div> ${count} ${count == 1 ? translationsData[language].extraEntry : translationsData[language].extraEntries}. `;
        } else {
            extraEntriesMessage += `<div style="display:inline-block;color:darkblue;">${fields[0]}</div> ${count} ${count == 1 ? translationsData[language].extraEntry : translationsData[language].extraEntries}. `;
        }
    }

    if (hasInvalidInput) {
      message = `${translationsData[language].fieldListIntro} <strong>${years}</strong>, ${translationsData[language].warning} `;
      if (hasMissingEntries) {
          message += `${missingEntriesMessage}${translationsData[language].proceed} `;
      }
      if (hasExtraEntries) {
          message += `${extraEntriesMessage}${translationsData[language].ignore}`;
      }
      this.errorMessage = message
      this.infoPanelContent = "warning"

    } else {
      this.infoPanelContent = "default";
        // infoPanel.innerHTML = originalNote; // Reset to the original note message
        // infoPanel.classList.remove('warning');
    }
    */
}

export function openDisclaimer() {
    // TODO: Convert to Vue modal component
    // DOM manipulation commented out - should be handled by Vue modal components
    
    /* 
    document.getElementById('disclaimerModal').style.display = 'block';
    */
}

export function closeDisclaimer() {
    // TODO: Convert to Vue modal component
    // DOM manipulation commented out - should be handled by Vue modal components
    
    /* 
    document.getElementById('disclaimerModal').style.display = 'none';
    */
}

// Close the modal if the user clicks outside of the modal content
/* 
window.onclick = function (event) {
    var modal = document.getElementById('disclaimerModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
*/


export function showHelp() {
    // TODO: Convert to Vue modal component
    // DOM manipulation commented out - should be handled by Vue modal components
    
    /* 
    document.getElementById('helpPopup').style.display = 'block';
    */
}

export function closeHelp() {
    // TODO: Convert to Vue modal component
    // DOM manipulation commented out - should be handled by Vue modal components
    
    /* 
    document.getElementById('helpPopup').style.display = 'none';
    */
}

export function showLegalDisclaimer() {
    // TODO: Convert to Vue modal component
    // DOM manipulation commented out - should be handled by Vue modal components
    
    /* 
    document.getElementById('legalDisclaimer').style.display = 'block';
    */
}

export function closeLegalDisclaimer() {
    // TODO: Convert to Vue modal component
    // DOM manipulation commented out - should be handled by Vue modal components
    
    /* 
    document.getElementById('legalDisclaimer').style.display = 'none';
    */
}


export function showToolbarHelp() {
    document.getElementById('helpFormToolbar').style.display = 'block';
}

export function closeToolbarHelp() {
    document.getElementById('helpFormToolbar').style.display = 'none';
}

export function moveToNextInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (event.target.id === 'capability_returns') {
            // Move focus back to the Initial Investment field
            document.getElementById('initial_investment').focus();
        } else {
            // Move to the next input field
            let inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
            let currentIndex = Array.from(inputs).indexOf(event.target);
            let nextIndex = currentIndex + 1;

            if (nextIndex < inputs.length) {
                inputs[nextIndex].focus();
            }
        }
    }
    else {
        resultsPanel('off');
        this.validateCommaSeparatedInputs();
        checkAllFields();
    }
}

export function updateValuesForTable() {
    economicReturns = document.getElementById('economic_returns').value.split(',').map(Number);
    fineAvoidanceValue = document.getElementById('fine_avoidance').value.split(',').map(Number);
    capabilityReturns = document.getElementById('capability_returns').value.split(',').map(Number);
    intangibleValues = document.getElementById('intangible_value').value.split(',').map(Number);
    capabilityCosts = document.getElementById('investment_cost').value.split(',').map(Number);
}

export function calculateHROE(vue) {
    // TODO: Convert DOM result display to Vue data binding
    // DOM manipulation commented out - should be handled by Vue data binding
    
    /* 
    const ROIValueElement = document.getElementById('roi_value');
    const resultsElement = document.querySelector('.results');
    const explanationElement = document.getElementById('initial_explanation');
    */

    resultsPanel('on');
    this.hroeReady = true;

    let totalReturn = 0;
    let finalROI = 0;

    // Retrieve input values
    // I_t = parseFloat(document.getElementById('initial_investment').value);
    I_t = parseFloat(this.initialInvestment)
    // N = parseInt(document.getElementById('years').value);
    N = parseInt(this.years)
    // alpha = parseFloat(document.getElementById('discount').value);
    alpha = parseFloat(this.discount)
    discountFactor = 1 - alpha;

    // Process input values and calculate totals
    // economicReturn = document.getElementById('calc_economic_returns').value.split(',').map(Number);
    economicReturn = (this.economicReturns || '').split(',').map(val => parseFloat(val) || 0);
    // fineAvoidanceValue = document.getElementById('fine_avoidance').value.split(',').map(Number);
    fineAvoidanceValue = (this.fineAvoidanceValues || '').split(',').map(val => parseFloat(val) || 0);
    fineAvoidanceValues = sumCommaSeparatedNumbers(fineAvoidanceValue.join(','));
    economicReturnValues = sumCommaSeparatedNumbers(economicReturn.join(','));

    // capabilityReturns = document.getElementById('capability_returns').value.split(',').map(Number);
    capabilityReturns = (this.capabilityReturns || '').split(',').map(val => parseFloat(val) || 0);
    capabilityReturnValues = sumCommaSeparatedNumbers(capabilityReturns.join(','));

    // intangibleValues = document.getElementById('intangible_value').value.split(',').map(Number);
    intangibleValues = (this.reputationalReturns || '').split(',').map(val => parseFloat(val) || 0);
    reputationalReturnValues = sumCommaSeparatedNumbers(intangibleValues.join(','));

    // capabilityCosts = document.getElementById('investment_cost').value.split(',').map(Number);
    capabilityCosts = (this.capabilityCosts || '').split(',').map(val => parseFloat(val) || 0);
    capabilityCostValues = sumCommaSeparatedNumbers(capabilityCosts.join(','));

    // Calculate ROI based on the selected formula version
    if (currentFormulaVersion === 'full') {
        totalReturn = discountFactor * (economicReturnValues + reputationalReturnValues + capabilityReturnValues);
        const combinedI_t = I_t + capabilityCostValues;
        finalROI = (totalReturn - combinedI_t) / combinedI_t;
        renderROIOverTimeChart(N, I_t, capabilityCostValues, economicReturn, reputationalReturnValues, capabilityReturnValues, discountFactor, finalROI);
    } else if (currentFormulaVersion === 'reputationalOnly') {
        totalReturn = discountFactor * (economicReturnValues + reputationalReturnValues);
        finalROI = (totalReturn - I_t) / I_t;
        renderROIOverTimeChart(N, I_t, 0, economicReturn, reputationalReturnValues, 0, discountFactor, finalROI);
    } else if (currentFormulaVersion === 'economicOnly') {
        totalReturn = discountFactor * economicReturnValues;
        finalROI = (totalReturn - I_t) / I_t;
        renderROIOverTimeChart(N, I_t, 0, economicReturn, 0, 0, discountFactor, finalROI);
    }

    // TODO: Convert result display to Vue data binding
    // DOM manipulation commented out - should be handled by Vue data binding and computed properties
    
    /* 
    // Display results
    document.getElementById('resultsHeader').style.display = 'block';
    document.getElementById('hroeDisplay').style.display = 'block';
    ROIValueElement.innerHTML = `${(finalROI).toFixed(2)}`;

    // Set explanation text with calculated values
    const currentLang = document.getElementById('language').value;
    document.getElementById('initial_explanation').innerHTML = translationsData[currentLang].explanation.explanation_of_results
        .replace('{I_t}', I_t)
        .replace('{N}', (N === 1 ? 'a year' : N + ' years'))
        .replace('{fineAvoidanceValue}', fineAvoidanceValues)
        .replace('{discountedValue}', (fineAvoidanceValues * (1 - alpha)).toFixed(2))
        .replace('{alpha}', (alpha * 100).toFixed(2))
        .replace('{netReturn}', (fineAvoidanceValues * (1 - alpha) - I_t).toFixed(2))
        .replace('{intangibleValue}', reputationalReturnValues)  // Ensure it's the cumulative reputational value
        .replace('{discountedIntangibleReturn}', (reputationalReturnValues * discountFactor).toFixed(2))
        .replace('{totalReturn}', totalReturn.toFixed(2))
        .replace('{capabilityReturns}', capabilityReturnValues)
        .replace('{investmentCost}', capabilityCostValues)
        .replace('{finalROI}', finalROI.toFixed(2));

    resultsElement.classList.remove('hidden');
    explanationElement.classList.remove('hidden');
    */
    
    // Store the calculated results for Vue to access
    this.calculatedROI = finalROI.toFixed(2);
    this.calculatedTotalReturn = totalReturn.toFixed(2);
    this.calculatedValues = {
        I_t,
        N,
        fineAvoidanceValues,
        discountedValue: (fineAvoidanceValues * (1 - alpha)).toFixed(2),
        alpha: (alpha * 100).toFixed(2),
        netReturn: (fineAvoidanceValues * (1 - alpha) - I_t).toFixed(2),
        reputationalReturnValues,
        discountedIntangibleReturn: (reputationalReturnValues * discountFactor).toFixed(2),
        totalReturn: totalReturn.toFixed(2),
        capabilityReturnValues,
        capabilityCostValues,
        finalROI: finalROI.toFixed(2)
    };

    showGeneratePDFButton();
}

export function renderROIOverTimeChart(N, initialInvestment, capabilityCosts, economicReturns, reputationalReturns, capabilityReturns, discountFactor, finalROI) {
    const chartContainer = document.getElementById('roiChartContainer');
    const chartExplanation = document.getElementById('chartExplanation');

    if (!chartContainer || !chartExplanation) {
        console.error("Chart container or explanation element is missing in the HTML.");
        return;
    }

    // Safety check for N
    if (!N || N <= 0 || isNaN(N)) {
        console.error("Invalid number of years (N):", N);
        return;
    }

    chartContainer.classList.remove('hidden');  // Show the chart container
    chartExplanation.innerHTML = `<h3>Annual Returns, Investments, and Final ROI</h3>`;

    const ctx = document.createElement('canvas');
    chartExplanation.innerHTML = "";  // Clear previous chart if exists
    chartExplanation.appendChild(ctx);

    if (investmentChart) {
        investmentChart.destroy(); // Destroy existing chart if it exists
    }

    // Initialize arrays to hold annual investments and returns
    const annualInvestments = [];
    const annualReturns = [];

    // Populate arrays with annual investment and return values
    for (let year = 0; year < N; year++) {
        const economicReturn = economicReturns[year] || 0;
        const reputationalReturn = (reputationalReturns && reputationalReturns[year]) ? reputationalReturns[year] * discountFactor : 0;
        const capabilityReturn = (capabilityReturns && capabilityReturns[year]) ? capabilityReturns[year] * discountFactor : 0;
        const capabilityCost = (Array.isArray(capabilityCosts) && capabilityCosts[year]) ? capabilityCosts[year] : 0;

        const currentYearReturn = economicReturn + reputationalReturn + capabilityReturn;
        const currentYearInvestment = year === 0 ? initialInvestment + capabilityCost : capabilityCost;

        annualInvestments.push(currentYearInvestment.toFixed(2));
        annualReturns.push(currentYearReturn.toFixed(2));
    }

    // Render combo chart with bars for annual investments and returns, and a line for the final ROI
    investmentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: N }, (_, i) => `Year ${i + 1}`),
            datasets: [
                {
                    label: "Annual Investments",
                    data: annualInvestments,
                    backgroundColor: 'rgba(70, 130, 180, 0.6)',  // Muted Steel Blue
                    borderColor: 'rgba(70, 130, 180, 1)',
                    borderWidth: 1
                },
                {
                    label: "Annual Returns",
                    data: annualReturns,
                    backgroundColor: 'rgba(148, 208, 180, 0.6)',  // Soft teal
                    borderColor: 'rgba(100, 181, 205, 1)',
                    borderWidth: 1
                },
                {
                    label: "Final ROI",
                    data: Array(N).fill(finalROI.toFixed(2)),  // Create an array with the final ROI repeated for each year
                    borderColor: 'rgba(160, 82, 45, 0.8)',  // Subtle Taupe
                    backgroundColor: 'rgba(160, 82, 45, 0.3)',
                    type: 'line',
                    borderDash: [5, 5],  // Dashed line for visual distinction
                    fill: false,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Annual Values'
                    }
                },
                y1: {
                    beginAtZero: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Final ROI'
                    },
                    grid: {
                        drawOnChartArea: false  // Separate the grids
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

export function resetInfoPanel() {
  this.infoPanelContent = "default";
    // const infoPanel = document.querySelector('.info-panel');
    // infoPanel.innerHTML = originalNote;
    // infoPanel.classList.remove('warning');
}

let currentFormulaVersion = 'full';

export function updateFormulaBasedOnReturns() {
    const reputationalFieldset = document.getElementById("reputationalReturnsFieldset");
    const capabilitiesFieldset = document.getElementById("capabilitiesReturnsFieldset");
    const formulaContainer = document.getElementById("formula"); // Target for inserting formula content
    const paperSection = document.getElementById("paperSection");
    paperSection.innerHTML = "";

    // Full formula as provided (Section 4.3)
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

    // Reputational Returns formula (Section 4.2)
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

    // Economic Returns formula (Section 4.1)
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

    // Determine and update the formula version based on the disabled state of each fieldset
    if (reputationalFieldset.getAttribute("data-disabled") === "false" &&
        capabilitiesFieldset.getAttribute("data-disabled") === "false") {
        currentFormulaVersion = 'full';
        formulaContainer.innerHTML = formulaFull;
    } else if (reputationalFieldset.getAttribute("data-disabled") === "false" &&
        capabilitiesFieldset.getAttribute("data-disabled") === "true") {
        currentFormulaVersion = 'reputationalOnly';
        formulaContainer.innerHTML = formulaReputational;
    } else {
        currentFormulaVersion = 'economicOnly';
        formulaContainer.innerHTML = formulaEconomicOnly;
    }
}

export function createDivider(length) {
    const divider = document.getElementById('divider');
    divider.style.width = length + 'px';
    return divider;
}


// Initialize data-disabled attributes on page load
export function initializeFieldsetStates() {
    const reputationalFieldset = document.getElementById("reputationalReturnsFieldset");
    const capabilitiesFieldset = document.getElementById("capabilitiesReturnsFieldset");

    reputationalFieldset.setAttribute("data-disabled", "false");
    capabilitiesFieldset.setAttribute("data-disabled", "false");
}

// Rest of the toggleBlur function and updateFormulaBasedOnReturns function remain the same
export function toggleBlur(fieldsetId) {
    const reputationalFieldset = document.getElementById("reputationalReturnsFieldset");
    const capabilitiesFieldset = document.getElementById("capabilitiesReturnsFieldset");
    const reputationalIcon = document.getElementById("toggleReputationalIcon");
    const capabilitiesIcon = document.getElementById("toggleCapabilitiesIcon");

    if (fieldsetId === "reputationalReturnsFieldset") {
        const isDisabled = reputationalFieldset.getAttribute("data-disabled") === "true";

        reputationalFieldset.setAttribute("data-disabled", isDisabled ? "false" : "true");
        capabilitiesFieldset.setAttribute("data-disabled", isDisabled ? "false" : "true");

        toggleDisableFieldset(reputationalFieldset, !isDisabled);
        toggleDisableFieldset(capabilitiesFieldset, !isDisabled);

        capabilitiesIcon.style.display = isDisabled ? "block" : "none";

    } else if (fieldsetId === "capabilitiesReturnsFieldset") {
        if (reputationalFieldset.getAttribute("data-disabled") === "false") {
            const isDisabled = capabilitiesFieldset.getAttribute("data-disabled") === "true";

            capabilitiesFieldset.setAttribute("data-disabled", isDisabled ? "false" : "true");

            toggleDisableFieldset(capabilitiesFieldset, !isDisabled);
        }
    }

    updateFormulaBasedOnReturns();
    resultsPanel('off');
}

export function toggleDisableFieldset(fieldset, disable) {
    const elements = fieldset.querySelectorAll("input, button, select, textarea, label, span, legend");

    elements.forEach(element => {
        element.disabled = disable;
        element.style.color = disable ? "#333" : "";  // Set light gray color for disabled state
        element.style.opacity = disable ? "0.50" : "1";
    });

    // Apply the same style to the fieldset itself
    fieldset.style.color = disable ? "#333" : "";
    fieldset.style.opacity = disable ? "0.50" : "1";
}

export function displayHROE(element, hroeValue) {
    element.innerHTML = `<div class="varvalue">${hroeValue.toFixed(2)}</div>`;
    if (hroeValue >= 0) {
        element.classList.add('positive-value');
        element.classList.remove('negative-value');
    } else {
        element.classList.add('negative-value');
        element.classList.remove('positive-value');
    }
}

// Function to save form values to local storage
export function saveDefaults() {
    const inputs = document.querySelectorAll('.left-column input');
    const defaults = {};

    inputs.forEach(input => {
        defaults[input.id] = input.value;
    });

    localStorage.setItem('defaults', JSON.stringify(defaults));
    alert('Defaults have been saved!');

    console.log('Defaults saved to localStorage:', defaults); // Debug: Check if defaults are saved
}

export function resultsPanel(toggleSwitch) {
    // Use Vue method if available (when called from Vue component context)
    if (this && typeof this.toggleResultsPanel === 'function') {
        this.toggleResultsPanel(toggleSwitch);
    }
}

// Function to load the saved values from local storage
export function loadDefaults() {
    const inputs = document.querySelectorAll('.left-column input');
    const memory = JSON.parse(localStorage.getItem('memory')); // Retrieve the 'memory' object from local storage

    if (memory) {
        inputs.forEach(input => {
            const key = input.id;
            if (memory.hasOwnProperty(key)) {
                input.value = memory[key]; // Set the value of the input field based on the 'memory' object
            } else {
            }
        });
        document.getElementById('exampleMessage').innerHTML = "Loaded Default Form"
    } else {
        console.log('No memory object found in localStorage.');
    }
}

export function allFieldsBlank() {
    const allFields = document.querySelectorAll('.field-to-check');
    let allFilled = true;

    // Check if every field has a non-empty value
    allFields.forEach(field => {
        if (field.value.trim() === '') {
            allFilled = false;
        }
    });
    return !allFilled;
}

export function checkAllFields() {
    const allFields = document.querySelectorAll('.field-to-check');
    let allFilled = true;

    // Check if every field has a non-empty value
    allFields.forEach(field => {
        if (field.value.trim() === '') {
            allFilled = false;
        }
    });

    // Enable or disable the button based on whether all fields are filled
    if (allFilled) {
        hideStartupMessage();
        this.hroeReady = true;
    } else {
        // showStartupMessage();
        this.hroeReady = false;
    }
}


export function saveToMemory() {
    const inputs = document.querySelectorAll('.left-column input');
    const formData = {};

    inputs.forEach(input => {
        formData[input.id] = input.value;
    });

    localStorage.setItem('memory', JSON.stringify(formData));
    document.getElementById('exampleMessage').innerHTML = 'Saved Default Form';

    saveLocalStorageToFile();
}

export function updateEconomicReturns() {
    const revenueField = document.getElementById('org_revenues');
    const fineAvoidanceField = document.getElementById('fine_avoidance');
    const economicReturnField = document.getElementById('calc_economic_returns');

    // Split and parse values from revenue and fine avoidance fields
    const revenues = revenueField.value.split(',').map(value => parseFloat(value.replace(/,/g, '').trim()));
    const fineAvoidances = fineAvoidanceField.value.split(',').map(value => parseFloat(value.trim()));

    // Determine the maximum number of entries to process
    const maxLength = Math.max(revenues.length, fineAvoidances.length);
    const economicReturns = [];

    // Loop through each index up to the maximum length
    for (let i = 0; i < maxLength; i++) {
        const revenue = revenues[i];
        const fineAvoidance = fineAvoidances[i];

        // Only calculate if both values are valid numbers; otherwise, push "0.00" or an empty string if missing
        if (!isNaN(revenue) && !isNaN(fineAvoidance)) {
            const calculatedReturn = revenue * (fineAvoidance / 100);
            economicReturns.push(calculatedReturn.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }));
        } else {
            economicReturns.push("0.00"); // Default to "0.00" if there's no corresponding entry in one of the fields
        }
    }

    // Display the calculated economic returns as a comma-separated string
    economicReturnField.value = economicReturns.join(',');
    return economicReturns.join(',')
}

// Variable to track the current set index
let currentIndex = 0;

// Export hroeExamples and currentIndex so they can be used in Vue components
export { hroeExamples, currentIndex };

// Function to populate form with sample values
export function populateWithSampleValues(direction) {
    // Adjust index based on the direction

    
    if (direction === 'right') {
        if (currentIndex >= (hroeExamples.length - 1)) currentIndex = -1;
        currentIndex = (currentIndex + 1) % hroeExamples.length;
    } else if (direction === 'left') {
        if (currentIndex <= 0) currentIndex = hroeExamples.length;
        currentIndex = (currentIndex - 1 + hroeExamples.length) % hroeExamples.length;
    }
    else if (direction === 'first') {
        currentIndex = 0;
    }
    else if (direction === 'last') {
        currentIndex = hroeExamples.length - 1;
    }
    // Update the example text
    if (currentIndex <= 0) {
        document.getElementById('exampleMessage').textContent = `Example from Paper`;
    }
    else {
        document.getElementById('exampleMessage').textContent = `Example ${currentIndex + 1} of ${hroeExamples.length}`;
    }


    // Get the current set of values
    const values = hroeExamples[currentIndex];

    // Populate the form with the current set of values
    // TODO remove this getElementById dependency
    // NOTE: Vue component handles its own data updates
    // This function now only handles DOM elements and example navigation
    // The Vue component's populateWithSampleValues method handles Vue data updates
    
    // Try to populate DOM elements if they exist (for backward compatibility)
    const elements = {
        'initial_investment': values.initial_investment,
        'years': values.years,
        'discount': values.discount,
        'org_revenues': values.org_revenues,
        // 'calc_economic_returns': values.economic_returns, // Now handled by Vue component
        'fine_avoidance': values.fine_avoidance,
        'intangible_value': values.intangible_value,
        'investment_cost': values.investment_cost,
        'capability_returns': values.capability_returns
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            element.value = value;
        }
    }
}

export function clearMessageOnInput() {
    // Check if the input field has a value (i.e., not just focused)
    if (this.value.trim() !== '') {
        currentIndex = -1;  // Reset the index or any relevant variable
        document.getElementById('exampleMessage').innerHTML = '';  // Clear the message
    }
}
// Attach event listeners to all input fields
export const inputFields = document.querySelectorAll('input, select, textarea'); // Selects all input, select, and textarea elements

export function deleteLocalStorage() {
    localStorage.clear();
    document.getElementById('exampleMessage').innerHTML = 'Deleted Default Form';
}

export function eraseForm() {
    // Reset all input fields
    document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
        input.value = '';
    });

    currentIndex = -1;
    document.getElementById('exampleMessage').innerHTML = '--- BLANK FORM ---';
    resultsPanel('off');
    this.validateCommaSeparatedInputs();
    this.hroeReady = false;
}

// Function to navigate through memory entries in localStorage
export function navigateMemory(direction) {
    let memory = JSON.parse(localStorage.getItem('memory')) || [];

    if (memory.length > 0) {
        // Update the current index based on direction
        currentMemoryIndex += direction;

        // Ensure the index stays within bounds
        if (currentMemoryIndex >= memory.length) {
            currentMemoryIndex = memory.length - 1; // Stop at the last entry
        } else if (currentMemoryIndex < 0) {
            currentMemoryIndex = 0; // Stop at the first entry
        }

        const memoryEntry = memory[currentMemoryIndex];

        // Update the input fields with the retrieved values
        const inputs = document.querySelectorAll('.left-column input');
        inputs.forEach((input, index) => {
            input.value = memoryEntry.values[index] !== undefined ? memoryEntry.values[index] : ''; // Only set value if defined
        });

        // Display the timestamp of the retrieved entry
        document.getElementById('timestampDisplay').textContent = `Retrieved on: ${memoryEntry.timestamp}`;

    } else {
        document.getElementById('timestampDisplay').textContent = 'No memory available';
    }
}

// Function to clear all memory entries in localStorage
export function clearMemory() {
    localStorage.clear();

    // Clear all input fields
    const inputs = document.querySelectorAll('.left-column input');
    inputs.forEach(input => {
        input.value = '';
    });
}

export function loadLocalStorageFromFile() {
    const filename = 'localStorageData.json';

    // Create an input element to select the file
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    // Add an event listener to handle file selection
    input.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check if the file name matches the expected filename
        if (file.name !== filename) {
            console.error(`Please select the file named ${filename}.`);
            return;
        }

        // Read the file contents
        const text = await file.text();

        // Parse the JSON data
        const data = JSON.parse(text);

        // Store each entry in localStorage
        for (const [key, value] of Object.entries(data)) {
            localStorage.setItem(key, value);
        }

        console.log('localStorage has been reloaded with data from the file.');
    });

    // Programmatically click the input to open the file dialog
    input.click();
}

export function saveLocalStorageToFile() {
    const filename = 'localStorageData.json';

    // Get all data from localStorage
    const data = { ...localStorage };

    // Convert the data to JSON format
    const jsonData = JSON.stringify(data, null, 2);

    // Create a Blob from the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Append link to the body and trigger download, then remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`localStorage data saved to ${filename}.`);
}

isTableView = false;

export function toggleEditableTable() {
    const defaultView = document.getElementById('defaultview');
    const editableTableContainer = document.getElementById('editableTableContainer');
    const returnsChartContainer = document.getElementById('returnsChartContainer');
    const toggleLink = document.getElementById('editableTableViewToggle');
    const years = parseInt(document.getElementById('years').value);
    returnsChartContainer.style.display = 'none';
    if (!isTableView) {
        // generateEditableTable(years);
        defaultView.style.display = 'none';
        returnsChartContainer.style.display = 'none';
        editableTableContainer.style.display = 'block';
        toggleLink.innerHTML = '<img class="svgimage" src="icons/show-data--cards.svg" alt="Switch to Default View">';
        this.showEditableTable = true;
    } else {
        updateFormFromTable();
        editableTableContainer.style.display = 'none';
        returnsChartContainer.style.display = 'none';
        defaultView.style.display = 'block';
        toggleLink.innerHTML = '<img class="svgimage" src="icons/table--split.svg" alt="Switch to Table View">';
        this.showEditableTable = false;
    }
    isTableView = !isTableView;
}

export function displayReturnsChart() {
    const defaultView = document.getElementById('defaultview');
    const editableTableContainer = document.getElementById('editableTableContainer');
    const returnsChartContainer = document.getElementById('returnsChartContainer');
    // future: const toggleLink = document.getElementById('editableTableViewToggle');
    defaultView.style.display = 'none';
    editableTableContainer.style.display = 'none';

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
 
    renderReturnsChart(N, economicReturns, fineAvoidanceValue, capabilityReturns, intangibleValues, I_t, capabilityCosts);
    returnsChartContainer.style.display = 'block';
}

export function generateEditableTable(years) {
    // DOM manipulation commented out for Vue compatibility
    // const editableTableContainer = document.getElementById("editableTableContainer");
    // editableTableContainer.innerHTML = ""; // Clear previous table

    // const editableDataTable = document.createElement("table");
    // editableDataTable.id = "editableDataTable";

    // Fetch live values from form fields, split by commas
    // const capabilityCosts = document.getElementById('investment_cost').value.split(',');
    // const orgRevenues = document.getElementById('org_revenues').value.split(',');
    // const fineAvoidanceValues = document.getElementById('fine_avoidance').value.split(',');
    // const economicReturns = document.getElementById('calc_economic_returns').value.split(',');
    // const reputationalReturns = document.getElementById('intangible_value').value.split(',');
    // const capabilityReturns = document.getElementById('capability_returns').value.split(',');

    // DOM manipulation commented out for Vue compatibility
    // Columns order based on requirements
    // const dataColumns = [capabilityCosts, orgRevenues, fineAvoidanceValues, economicReturns, reputationalReturns, capabilityReturns];

    // Create table headers
    // const thead = document.createElement('thead');
    // const headers = ['Year', 'Cost for Capabilities', 'Organizational Revenue', 'Fine Avoidance Value', 'Economic Return', 'Reputational Returns', 'Returns on Capabilities'];
    // const headerRow = document.createElement('tr');
    // headers.forEach(header => {
    //     const th = document.createElement('th');
    //     th.textContent = header;
    //     headerRow.appendChild(th);
    // });
    // thead.appendChild(headerRow);
    // editableDataTable.appendChild(thead);

    // Create table body with editable cells
    // const tbody = document.createElement('tbody');
    // for (let i = 0; i < years; i++) {
    //     const row = document.createElement('tr');

    //     // Year column - non-editable
    //     const yearCell = document.createElement('td');
    //     yearCell.style.backgroundColor = '#f4f4f4';
    //     yearCell.className = 'year-column';
    //     yearCell.innerText = `${i + 1}`;
    //     row.appendChild(yearCell);

    //     // Populate remaining columns based on dataColumns order
    //     dataColumns.forEach((dataArray, colIndex) => {
    //         const cell = document.createElement('td');

    //         // Economic Return column - non-editable, calculated based on previous cells
    //         if (colIndex === 3) { // Index for Economic Return
    //             cell.className = 'economic-return-column';
    //             cell.style.backgroundColor = '#f4f4f4';
    //             cell.innerText = calculateEconomicReturn(orgRevenues[i] || "0", fineAvoidanceValues[i] || "0");
    //         } else {
    //             // Other columns - editable
    //             cell.contentEditable = true;
    //             cell.innerText = dataArray[i] ? dataArray[i].trim() : "0";

    //             // Event listeners to sync and calculate Economic Return
    //             cell.addEventListener("input", () => {
    //                 if (colIndex === 1 || colIndex === 2) { // Only if relevant columns change
    //                     const economicReturnCell = row.cells[4];
    //                     economicReturnCell.innerText = calculateEconomicReturn(row.cells[2].innerText, row.cells[3].innerText);
    //                 }
    //                 updateFormFromTable();
    //             });
    //             cell.addEventListener('mouseover', () => cell.style.backgroundColor = "#F4FFF4");
    //             cell.addEventListener('mouseout', () => cell.style.backgroundColor = "#fff");
    //             // cell.addEventListener("keydown", (event) => handleCellNavigation(event, years, i, colIndex));
    //         }
    //         row.appendChild(cell);
    //     });

    //     tbody.appendChild(row);
    // }
    // editableDataTable.appendChild(tbody);
    // editableTableContainer.appendChild(editableDataTable);

    // Adjust container scrolling based on row count
    // editableTableContainer.style.maxHeight = years > 15 ? '400px' : 'unset';
    // editableTableContainer.style.overflowY = years > 15 ? 'auto' : 'unset';
    // editableTableContainer.style.display = 'block';

    // Initial synchronization from form data
    // updateTableFromForm();
}


// Helper function to calculate Economic Return
export function calculateEconomicReturn(revenue, fineAvoidance) {
    const orgRevenue = parseFloat(revenue.replace(/,/g, '')) || 0;
    const fineAvoidancePercentage = parseFloat(fineAvoidance) || 0;
    const economicReturn = orgRevenue * (fineAvoidancePercentage / 100);
    return economicReturn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


export function updateTableFromForm() {
    // DOM manipulation commented out for Vue compatibility
    // const N = parseInt(document.getElementById('years').value);
    // const capabilityCosts = document.getElementById('investment_cost').value.split(',');
    // const orgRevenues = document.getElementById('org_revenues').value.split(',');
    // const fineAvoidanceValues = document.getElementById('fine_avoidance').value.split(',');
    // const economicReturns = document.getElementById('calc_economic_returns').value.split(',');
    // const reputationalReturns = document.getElementById('intangible_value').value.split(',');
    // const capabilityReturns = document.getElementById('capability_returns').value.split(',');

    // List of all data columns in table order
    // const dataColumns = [capabilityCosts, orgRevenues, fineAvoidanceValues, economicReturns, reputationalReturns, capabilityReturns];

    // const tbody = document.getElementById("editableDataTable").querySelector("tbody");
    // if (tbody) {
    //     Array.from(tbody.rows).forEach((row, rowIndex) => {
    //         if (rowIndex < N) {
    //             dataColumns.forEach((columnData, colIndex) => {
    //                 const cell = row.cells[colIndex + 1];
    //                 if (colIndex === 3) { // Economic Return column
    //                     const orgRevenue = parseFloat(orgRevenues[rowIndex] || "0");
    //                     const fineAvoidance = parseFloat(fineAvoidanceValues[rowIndex] || "0");
    //                     const economicReturn = orgRevenue * (fineAvoidance / 100);
    //                     cell.innerText = economicReturn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    //                 } else {
    //                     cell.innerText = columnData[rowIndex] ? columnData[rowIndex].trim() : "0";
    //                 }
    //             });
    //         }
    //     });
    // } else {
    //     console.error("Table body not found.");
    // }
}


export function updateFormFromTable() {
    // DOM manipulation commented out for Vue compatibility
    // resultsPanel('off');
    // const N = parseInt(document.getElementById('years').value);

    // const capabilityCostsField = document.getElementById('investment_cost');
    // const orgRevenuesField = document.getElementById('org_revenues');
    // const fineAvoidanceField = document.getElementById('fine_avoidance');
    // const economicReturnsField = document.getElementById('calc_economic_returns');
    // const reputationalReturnsField = document.getElementById('intangible_value');
    // const capabilityReturnsField = document.getElementById('capability_returns');

    // const columnValues = [[], [], [], [], [], []];
    // const tbody = document.getElementById("editableDataTable").querySelector("tbody");

    // if (tbody) {
    //     Array.from(tbody.rows).forEach((row, rowIndex) => {
    //         if (rowIndex < N) {
    //             Array.from(row.cells).forEach((cell, colIndex) => {
    //                 if (colIndex > 0) {
    //                     if (colIndex === 4) { // Economic Return calculation
    //                         const orgRevenue = parseFloat(row.cells[2].innerText.replace(/,/g, '')) || 0;
    //                         const fineAvoidance = parseFloat(row.cells[3].innerText) || 0;
    //                         const economicReturn = orgRevenue * (fineAvoidance / 100);
    //                         row.cells[4].innerText = economicReturn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    //                         columnValues[3].push(row.cells[4].innerText);
    //                     } else {
    //                         columnValues[colIndex - 1].push(cell.innerText.trim());
    //                     }
    //                 }
    //             });
    //         }
    //     });

    //     // Update form fields with collected column values
    //     capabilityCostsField.value = columnValues[0].join(',');
    //     orgRevenuesField.value = columnValues[1].join(',');
    //     fineAvoidanceField.value = columnValues[2].join(',');
    //     // economicReturnsField.value = columnValues[3].join(','); // Now handled by Vue component
    //     reputationalReturnsField.value = columnValues[4].join(',');
    //     capabilityReturnsField.value = columnValues[5].join(',');
    // } else {
    //     console.error("Table body not found.");
    // }
}

// Navigation for cells using arrow keys with wrapping functionality
export function handleCellNavigation(event, numYears, rowIndex, colIndex) {
    // DOM manipulation commented out for Vue compatibility
    // // Allow only numeric input, decimal points, and essential editing/navigation keys
    // const isNumericInput = (event.key >= "0" && event.key <= "9") || event.key === ".";
    // const isNavigationKey = [
    //     "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", // Arrow keys
    //     "Backspace", "Delete", "Tab", "Enter", "Escape",   // Editing/navigation keys
    //     "Home", "End"                                      // Home and End
    // ].includes(event.key);

    // // If the key is not numeric or a navigation/editing key, prevent input
    // if (!isNumericInput && !isNavigationKey) {
    //     event.preventDefault();
    //     return; // Stop further execution if an invalid key is pressed
    // }
    // const currentCell = document.querySelector(`td[data-year="${rowIndex + 1}"][data-col="${colIndex}"]`);
    // // currentCell.style.borderBottom = '1px solid #d4d4d4';
    // currentCell.style.backgroundColor = "#fff";
    // // Only handle navigation logic for arrow keys and Enter
    // if (isNavigationKey && !isNumericInput) {
    //     let targetRow = rowIndex;

    //     switch (event.key) {
    //         case "Enter":
    //         case "ArrowDown":
    //             event.preventDefault();
    //             targetRow += 1;
    //             if (targetRow >= numYears) targetRow = 0;
    //             break;
    //         case "ArrowUp":
    //             event.preventDefault();
    //             targetRow -= 1;
    //             if (targetRow < 0) targetRow = numYears - 1;
    //             break;
    //         case "ArrowRight":
    //             event.preventDefault();
    //             colIndex += 1;
    //             if (colIndex >= 5) colIndex = 0;
    //             break;
    //         case "ArrowLeft":
    //             event.preventDefault();
    //             colIndex -= 1;
    //             if (colIndex <= -1) colIndex = 4;
    //             break;
    //     }

    //     const targetCell = document.querySelector(`td[data-year="${targetRow + 1}"][data-col="${colIndex}"]`);
    //     if (targetCell) {
    //         targetCell.focus();
    //     }
    // }
}


// Update the original fields based on table changes
export function updateOriginalField(fieldId, years) {
    const rowCells = Array.from(document.querySelectorAll(`#editableDataTable tr td:nth-child(n+2)[contentEditable="true"]`));
    const values = rowCells.map(cell => cell.textContent.trim()).slice(0, years).join(',');
    document.getElementById(fieldId).value = values;
}

// Update the table based on changes in the original fields
export function updateTableFromFields(fields, years) {
    fields.forEach((field, fieldIndex) => {
        const fieldValues = document.getElementById(field.id).value.split(',');
        const rowCells = Array.from(document.querySelectorAll(`#editableDataTable tr:nth-child(${fieldIndex + 2}) td:nth-child(n+2)`));

        rowCells.forEach((cell, yearIndex) => {
            if (yearIndex < years) {
                cell.textContent = fieldValues[yearIndex] || '';
            }
        });
    });
}

export function renderReturnsChart(N, economicReturns, fineAvoidanceValue, capabilityReturns, intangibleValues, initialInvestment, capabilityCosts) {
    if (isNaN(N)) return;
    const language = document.getElementById('language').value;
    const labels = Array.from({ length: N }, (_, i) => translationsData[language].chart.year + ` ${i + 1}`);
    // Combine Economic Returns and Fine Avoidance into one array
    const economicCombined = economicReturn.map((value, index) => value + (fineAvoidanceValue[index] || 0));

    const cumulativeCapabilityCosts = capabilityCosts.map((cost, index) => {
        return capabilityCosts.slice(0, index + 1).reduce((a, b) => a + b, 0);
    });

    const cumulativeCapabilityReturns = capabilityReturns.map((returnValue, index) => {
        return capabilityReturns.slice(0, index + 1).reduce((a, b) => a + b, 0);
    });

    const data = {
        labels: labels,
        datasets: [
            {
                label: translationsData[language].chart.economicReturns,
                data: economicCombined,
                backgroundColor: 'rgba(52, 152, 219, 0.5)', // Strong Blue
                borderColor: 'rgba(41, 128, 185, 1)', // Darker Blue
                borderWidth: 1
            },
            {
                label: translationsData[language].chart.intangibles,
                data: intangibleValues,
                backgroundColor: 'rgba(241, 196, 15, 0.5)', // Bright Yellow
                borderColor: 'rgba(243, 156, 18, 1)', // Darker Yellow/Orange
                borderWidth: 1
            },
            {
                label: translationsData[language].chart.capabilityReturns,
                data: capabilityReturns,
                backgroundColor: 'rgba(155, 89, 182, 0.5)', // Strong Purple
                borderColor: 'rgba(142, 68, 173, 1)', // Darker Purple
                borderWidth: 1
            }
        ]
    };

    if (investmentChart) {
        investmentChart.destroy();
    }

    const ctx = document.getElementById('returnsChart').getContext('2d');
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
                        text: '',
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

export function togglePanel() {
    const flipper = document.getElementById('flipper');
    flipper.classList.toggle('flipped');
}

// Add this function in hroe.js

export function classifyByYear(entries) {
    return entries.split(',').map((entry, index) => `Year ${index + 1}: ${entry.trim()} million`).join('\n');
}

export function generatePDF() {
    // Check if jsPDF is accessible
    if (typeof window.jspdf === 'undefined') {
        console.error("jsPDF is not loaded or defined");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let currentPage = 1;
    let currentY = 20; // Start below the header
    const maxY = doc.internal.pageSize.height - 20; // Maximum Y position before adding a new page

    // Function to add header to every page without page number
    function addHeader() {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("HROE Framework Calculator Results", 105, 10, null, null, 'center');
    }

    // Function to add footer with page numbers
    function addFooter(pageNumber, totalPages) {
        doc.setFontSize(12);
        doc.text(`Page ${pageNumber} of ${totalPages}`, 105, 15, null, null, 'center');
    }

    // Function to check if there's enough space on the current page and add a new page if needed
    function checkPageSpace(additionalHeight) {
        const currentPageHeight = doc.internal.pageSize.height;
        if (currentY + additionalHeight > currentPageHeight - 20) { // 20 is a bottom margin buffer
            doc.addPage();
            currentY = 20; // Reset Y position after adding a new page
            currentPage++;
            addHeader(); // Only add header, not footer
        }
    }

    // Define a function to add text with dynamic height management
    function addTextBlock(text, additionalY = 10, maxWidth = 180) {
        const splitText = doc.splitTextToSize(text, maxWidth);
        checkPageSpace(splitText.length * 10); // Estimate height needed
        doc.text(splitText, 10, currentY += additionalY);
        currentY += splitText.length * 10; // Increment Y by estimated height
    }

    // Fetch input values and results
    const initialInvestment = document.getElementById('initial_investment').value;
    const years = document.getElementById('years').value;
    const discount = document.getElementById('discount').value;
    const economicReturns = classifyByYear(document.getElementById('economic_returns').value);
    const fineAvoidance = classifyByYear(document.getElementById('fine_avoidance').value);
    const intangibleValue = classifyByYear(document.getElementById('intangible_value').value);
    const investmentCost = classifyByYear(document.getElementById('investment_cost').value);
    const capabilityReturns = classifyByYear(document.getElementById('capability_returns').value);
    const explanationText = document.getElementById('initial_explanation').innerText;

    // Legal Disclaimer with bold "Note:"
    const disclaimerText = `The return on investments in AI ethics and governance initiatives should be assessed holistically. While this calculator provides a helpful tool for assessing quantifiable returns, a holistic assessment should also include returns and impacts that are qualitative in nature. It is important to consider a broad set of stakeholders and the impact on society at large during the holistic assessment process.`;

    // Add header to the first page
    addHeader();

    // Add note
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Note:", 10, currentY);

    currentY += 10;

    doc.setFont("helvetica", "normal");
    addTextBlock(disclaimerText);

    currentY += 10;

    // Add title
    doc.setFontSize(20);
    doc.text("HROE Results", 10, currentY);

    currentY += 20;

    // Add input values to the PDF
    doc.setFontSize(14);
    addTextBlock(`Initial Investment: ${initialInvestment} million`);
    addTextBlock(`Years: ${years}`);
    addTextBlock(`Discount Rate: ${discount}`);
    addTextBlock(`Economic Returns:`);
    addTextBlock(economicReturns, 5);
    addTextBlock(`Fine Avoidance Value:`);
    addTextBlock(fineAvoidance, 5);
    addTextBlock(`Intangible Aspect Value:`);
    addTextBlock(intangibleValue, 5);
    addTextBlock(`Investment Cost for Capabilities:`);
    addTextBlock(investmentCost, 5);
    addTextBlock(`Capability Returns:`);
    addTextBlock(capabilityReturns, 5);

    // Add explanation of results
    addTextBlock(`Explanation of Results:`, 20);
    addTextBlock(explanationText);

    // Add a new page for the chart
    doc.addPage();
    currentPage++;
    currentY = 20;
    addHeader(); // Add header to the new page

    // Add chart image to the PDF on the new page
    const canvas = document.getElementById('returnsChart');
    if (canvas) {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, currentY, 180, 80); // Placed on the new page
    }

    // Get the total pages dynamically after all content is added
    const totalPages = doc.internal.getNumberOfPages();

    // Update page numbers dynamically after content is added
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        addFooter(i, totalPages);
    }

    // Save the PDF
    doc.save('HROE_Results.pdf');
}

// Show Generate PDF button after Explanation of Results appears
export function showGeneratePDFButton() {
    const currentLang = document.getElementById('language').value;
    if (currentLang !== 'zh' && currentLang !== 'ja') {
        document.getElementById('generatePDFButton').style.display = 'block';
    }
    else {
        document.getElementById('generatePDFButton').style.display = 'none';
    }
}

export function updateEconomicReturnsField() {
    const calcEconomicReturnsField = document.getElementById('calc_economic_returns');
    
    const orgRevenues = parseFloat(document.getElementById('org_revenues').value) || 0;
    const fineAvoidance = parseFloat(document.getElementById('fine_avoidance').value) || 0;
    const economicReturn = orgRevenues * (fineAvoidance / 100);

    // Update the field with the calculated value
    calcEconomicReturnsField.value = economicReturn.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function updateUIState() {
    if (localStorage.length === 0) {
        resultsPanel('off');
        this.hroeReady = false;
        showStartupMessage();
    }
    else {
        loadDefaults();
        if (allFieldsBlank()) {
            resultsPanel('off');
            this.hroeReady = false;
        }
        else {
            resultsPanel('on');
            this.hroeReady = true;
            this.calculateHROE();
            hideStartupMessage();
        }
    }
}


