<script>
import * as hroe from "@/scripts/hroe.js"
import translationsData from "@/scripts/hroe-translations.js";
import Translation from "@/components/Translation.vue";
import EditableTable from "@/components/EditableTable.vue";
import DisclaimerModal from "@/components/DisclaimerModal.vue";
import InfoPanel from "@/components/InfoPanel.vue";
import FormulaDisplay from "@/components/FormulaDisplay.vue";
import CalculatorToolbar from "@/components/CalculatorToolbar.vue";
import EconomicReturns from "@/components/form/EconomicReturns.vue";
import ReputationalReturns from "@/components/form/ReputationalReturns.vue";
import CapabilityReturns from "@/components/form/CapabilityReturns.vue";
import Investments from "@/components/form/Investments.vue";
import BasicInputs from "@/components/form/BasicInputs.vue";

export default {
  components: {
    Translation,
    EditableTable,
    DisclaimerModal,
    InfoPanel,
    FormulaDisplay,
    CalculatorToolbar,
    EconomicReturns,
    ReputationalReturns,
    CapabilityReturns,
    Investments,
    BasicInputs,
  },
  watch: {
    dataColumns: {
      deep: true,
      handler(newValue) {
        this.calculateHROE()
      }
    },

    validationResults: {
      immediate: true,
      handler(newValue) {
        // Update error message and info panel content
        this.errorMessage = newValue.message;
        this.infoPanelContent = newValue.infoPanelContent;
        
        // Update field styles
        this.fieldValidationStyles = newValue.fieldStyles;
      }
    },
    formReadyStatus: {
      immediate: true,
      handler(newValue) {
        this.hroeReady = newValue;
      }
    }
  },
  data() {
    return {
      years: null,
      initialInvestment: "",
      discount: "",
      capabilityCosts: "",
      orgRevenues: "",
      fineAvoidanceValues: "",
      economicReturns: "",
      reputationalReturns: "",
      capabilityReturns: "",
      showEditableTable: false,
      updateColumnTimeout: null,
      showDisclaimerModal: false,
      errorMessage: '',
      infoPanelContent: 'default',
      showStartupMessage: true,
      hroeReady: false,
      currentLanguage: 'en',
      fieldValidationStyles: {}, // For tracking field validation styles
      currentExampleIndex: 0, // Local management of current example index
      showResults: false, // Controls result panel visibility
      calculatedROI: null, // Stores calculated ROI
      calculatedTotalReturn: null, // Stores calculated total return
      calculatedValues: {}, // Stores all calculated values for display
      showHelpPopup: false, // Controls help popup visibility
      showToolbarHelp: false, // Controls toolbar help visibility
      explanationPanelContent: '', // Content for explanation panel
      highlightedElements: [], // Track highlighted formula elements
      exampleMessage: 'Example from Paper' // Message shown for current example
    };
  },
  computed: {
    dataColumns() {
      return [
        this.capabilityCosts.split(','),
        this.orgRevenues.split(','),
        this.fineAvoidanceValues.split(','),
        (this.economicReturns || '').split(','),
        this.reputationalReturns.split(','),
        this.capabilityReturns.split(','),
      ];
    },

    validationResults() {
      if (!this.years) return { valid: true, message: '', fieldStyles: {} };

      const fieldsToCheck = [
        { key: 'economicReturns', name: 'Economic Returns' },
        { key: 'reputationalReturns', name: 'Intangible Value' },
        { key: 'capabilityCosts', name: 'Investment Cost' },
        { key: 'capabilityReturns', name: 'Capability Returns' }
      ];

      let message = '';
      let hasInvalidInput = false;
      let hasExtraEntries = false;
      let hasMissingEntries = false;
      const fieldStyles = {};

      const missingEntriesCount = {};
      const extraEntriesCount = {};
      let extraEntriesMessage = '';
      let missingEntriesMessage = '';
      const language = this.currentLanguage;

      fieldsToCheck.forEach(({ key, name }) => {
        const fieldValue = this[key] || '';
        const values = fieldValue.split(',').map(v => v.trim());

        if (values.length < this.years) {
          hasMissingEntries = true;
          const missingEntries = this.years - values.length;
          if (!missingEntriesCount[missingEntries]) {
            missingEntriesCount[missingEntries] = [];
          }
          missingEntriesCount[missingEntries].push(name);

          fieldStyles[key] = {
            color: 'darkred',
            backgroundColor: 'rgb(250, 250, 239)'
          };
          hasInvalidInput = true;
        } else if (values.length > this.years) {
          hasExtraEntries = true;
          const extraEntries = values.length - this.years;
          
          // Check for multiple consecutive commas
          const hasMultipleCommas = /,{2,}/.test(fieldValue);
          
          if (hasMultipleCommas) {
            extraEntriesMessage += `<div style="display:inline-block; color:darkblue;">${name}</div> ${translationsData[language].extraCommas}. `;
          } else if (fieldValue.trim().endsWith(',') || fieldValue.trim() === ',') {
            extraEntriesMessage += `<div style="display:inline-block; color:darkblue;">${name}</div> ${translationsData[language].extraComma}. `;
          } else {
            if (!extraEntriesCount[extraEntries]) {
              extraEntriesCount[extraEntries] = [];
            }
            extraEntriesCount[extraEntries].push(name);
          }

          fieldStyles[key] = {
            color: 'darkblue',
            backgroundColor: '#f5ffff'
          };
          hasInvalidInput = true;
        } else {
          fieldStyles[key] = {
            color: '',
            backgroundColor: ''
          };
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
            : `<div style="display:inline-block;color:darkblue;">${fields[0]}</div> ${translationsData[language].and} <div style="display:inline-block;color:darkblue;">${lastField}</div>`;
          extraEntriesMessage += `<div style="display:inline-block;">${fieldList}</div> ${count} ${count == 1 ? translationsData[language].extraEntry : translationsData[language].extraEntries}. `;
        } else {
          extraEntriesMessage += `<div style="display:inline-block;color:darkblue;">${fields[0]}</div> ${count} ${count == 1 ? translationsData[language].extraEntry : translationsData[language].extraEntries}. `;
        }
      }

      if (hasInvalidInput) {
        message = `${translationsData[language].fieldListIntro} <strong>${this.years}</strong>, ${translationsData[language].warning} `;
        if (hasMissingEntries) {
          message += `${missingEntriesMessage}${translationsData[language].proceed} `;
        }
        if (hasExtraEntries) {
          message += `${extraEntriesMessage}${translationsData[language].ignore}`;
        }
        
        return { 
          valid: false, 
          message, 
          fieldStyles,
          infoPanelContent: 'warning'
        };
      } else {
        return { 
          valid: true, 
          message: '', 
          fieldStyles,
          infoPanelContent: 'default'
        };
      }
    },
    formReadyStatus() {
      const requiredFields = [
        'years', 'initialInvestment', 'discount', 'capabilityCosts',
        'orgRevenues', 'fineAvoidanceValues', 'economicReturns',
        'reputationalReturns', 'capabilityReturns'
      ];
      
      return requiredFields.every(field => {
        const value = this[field];
        return value !== null && value !== undefined && value !== '';
      });
    },
    
    // Force component re-render when data changes (for example loading)
    componentKey() {
      return `${this.years}-${this.initialInvestment}-${this.currentExampleIndex}`;
    },
  },
  methods: {
    updateColumn({ rowIndex, colIndex, value }) {
      // Clear the previous timeout if it exists
      if (this.updateColumnTimeout) {
        clearTimeout(this.updateColumnTimeout);
      }
      // Set a new timeout to update the column
      this.updateColumnTimeout = setTimeout(() => {
        const columns = [
          "capabilityCosts",
          "orgRevenues",
          "fineAvoidanceValues",
          "economicReturns",
          "reputationalReturns",
          "capabilityReturns",
        ];
        const column = this[columns[colIndex]];
        const values = column.split(',');
        values[rowIndex] = value;
        this[columns[colIndex]] = values.join(',');
      }, 1500)
    },
    handleFocusField(field) {
      // Call the original highlightFormula function from hroe.js
      if (typeof this.highlightFormula === 'function') {
        this.highlightFormula(field);
      }
    },
    handleUpdateExplanation(field) {
      // Call the original updateExplanation function from hroe.js
      if (typeof this.updateExplanation === 'function') {
        this.updateExplanation(field);
      }
    },
    handleClearExplanation() {
      // Call the original clearExplanation function from hroe.js
      if (typeof this.clearExplanation === 'function') {
        this.clearExplanation();
      }
    },
    populateWithSampleValues(direction) {
      // Import the examples and implement the logic here instead of calling hroe.js
      // to avoid binding issues with the Vue component context
      const hroeExamples = hroe.hroeExamples;
      let currentIndex = this.currentExampleIndex;
      
      // Adjust index based on the direction
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
      
      // Update the local current index
      this.currentExampleIndex = currentIndex;
      
      // Update the example text using Vue data
      if (currentIndex <= 0) {
        this.exampleMessage = `Example from Paper`;
      } else {
        this.exampleMessage = `Example ${currentIndex + 1} of ${hroeExamples.length}`;
      }

      // Get the current set of values
      const values = hroeExamples[currentIndex];

      // Populate the Vue component data directly
      console.log('Populating values:', values);
      this.initialInvestment = values.initial_investment;
      this.years = parseInt(values.years);
      this.discount = parseFloat(values.discount);
      this.orgRevenues = values.org_revenues;
      this.fineAvoidanceValues = values.fine_avoidance;
      this.capabilityReturns = values.capability_returns;
      this.capabilityCosts = values.investment_cost;
      this.reputationalReturns = values.intangible_value;

      // Economic returns will be calculated automatically by the EconomicReturns component
      this.showEditableTable = true;
      this.hroeReady = true;

      // Force reactivity update
      this.$nextTick(() => {
        console.log('After nextTick - values should be updated');
        console.log('Initial Investment:', this.initialInvestment);
        console.log('Years:', this.years);
        console.log('Discount:', this.discount);
        console.log('Component Key:', this.componentKey);
      });
      
      // Call calculate function if it exists
      if (typeof this.calculateHROE === 'function') {
        this.calculateHROE();
      }
      
      // Call results panel function if it exists
      if (typeof hroe.resultsPanel === 'function') {
        hroe.resultsPanel('on');
      }
    },
    moveToNextInput(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (event.target.id === 'capability_returns') {
          // Move focus back to the Initial Investment field
          const initialInvestmentField = document.getElementById('initial_investment');
          if (initialInvestmentField) initialInvestmentField.focus();
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
    },
    handleToggleBlur(fieldsetId) {
      // Call the original toggleBlur function from hroe.js if it exists
      if (typeof this.toggleBlur === 'function') {
        this.toggleBlur(fieldsetId);
      }
    },

    calculateHROE() {
      // Call the hroe.js calculateHROE function with the Vue component as context
      if (typeof hroe.calculateHROE === 'function') {
        hroe.calculateHROE.call(this);
      }
    },

    // Vue equivalent for updateExplanation function
    updateExplanation(inputId) {
      const currentLang = this.language;
      const translation = translationsData[currentLang].explanation;

      let explanation;
      switch (inputId) {
        case 'initial_investment':
          explanation = translation.initial_investment.replace('{value}', this.formatValueForDisplay(this.initialInvestment));
          break;
        case 'years':
          explanation = translation.years.replace('{value}', this.years);
          break;
        case 'discount':
          const discountValue = this.discount;
          explanation = translation.discount.replace('{value}', discountValue).replace('{percentage}', ((1 - discountValue) * 100).toFixed(2));
          break;
        case 'org_revenues':
          explanation = this.generateYearlyExplanationVue('org_revenues', translation.economic_returns);
          break;
        case 'fine_avoidance':
          explanation = translation.fine_avoidance.replace('{value}', this.fineAvoidanceValues);
          break;
        case 'intangible_value':
          explanation = translation.intangible_value.replace('{value}', this.formatValueForDisplay(this.reputationalReturns));
          break;
        case 'investment_cost':
          explanation = translation.investment_cost.replace('{value}', this.formatValueForDisplay(this.capabilityCosts));
          break;
        case 'capability_returns':
          explanation = this.generateYearlyExplanationVue('capability_returns', translation.capability_returns);
          break;
        default:
          explanation = translationsData[currentLang].hoverText;
      }

      this.explanationPanelContent = explanation;
    },

    // Vue equivalent for clearExplanation function
    clearExplanation() {
      this.explanationPanelContent = '';
    },

    // Vue equivalent for generateYearlyExplanation function
    generateYearlyExplanationVue(inputId, baseText) {
      let values = [];
      switch (inputId) {
        case 'org_revenues':
          values = this.orgRevenues.split(',');
          break;
        case 'capability_returns':
          values = this.capabilityReturns.split(',');
          break;
        default:
          return baseText;
      }
      
      const yearExplanations = values.map((value, index) => {
        return `Year ${index + 1} = <div class="varvalue">${parseFloat(value)} million</div>`;
      }).join(' ');
      
      return baseText.replace('{details}', yearExplanations);
    },

    // Vue equivalent for formatValue function
    formatValueForDisplay(value) {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        return '?';
      }
      const formattedValue = (numValue * 1000000).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      return `<div class="varvalue">${formattedValue}</div>`;
    },

    // Vue equivalent for modal functions
    showModal(modalType) {
      switch (modalType) {
        case 'help':
          this.showHelpPopup = true;
          break;
        case 'toolbar':
          this.showToolbarHelp = true;
          break;
      }
    },

    hideModal(modalType) {
      switch (modalType) {
        case 'help':
          this.showHelpPopup = false;
          break;
        case 'toolbar':
          this.showToolbarHelp = false;
          break;
        default:
          // Hide all modals
          this.showHelpPopup = false;
          this.showToolbarHelp = false;
      }
    },

    // Vue equivalent for highlightFormula function
    highlightFormula(inputId) {
      // Define elements to highlight for each input type
      const elements = {
        years: ['Ny'],
        capabilities: [],
        discount: ['Alpha'],
        economic_returns: ['Re'],
        fine_avoidance: ['Rr'],
        capability_returns: ['Rc'],
        initial_investment: ['It1', 'It2'],
        investment_cost: ['Ic_t1', 'Ic_t2']
      };

      // Reset all highlighted elements
      this.highlightedElements = [];

      // Set new highlighted elements if they exist for this input
      if (elements[inputId]) {
        this.highlightedElements = elements[inputId];
      }
    },

    // Clear all formula highlighting
    clearFormulaHighlight() {
      this.highlightedElements = [];
    },

    // Vue equivalent for resultsPanel function
    toggleResultsPanel(toggleSwitch) {
      if (toggleSwitch === 'off') {
        this.showResults = false;
        this.explanationPanelContent = '';
        this.calculatedROI = null;
        this.calculatedTotalReturn = null;
        this.calculatedValues = {};
      } else {
        this.showResults = true;
      }
    },

    // Vue equivalent for table and results display functions
    updateResultsDisplay(roi, totalReturn, calculatedValues) {
      this.calculatedROI = roi;
      this.calculatedTotalReturn = totalReturn;
      this.calculatedValues = calculatedValues || {};
      this.showResults = true;
    },
  },  
  mounted () {
    // Load the links when the page loads
    document.addEventListener('DOMContentLoaded', this.loadLinks);

    document.addEventListener('click', (event) => {
      this.showStartupMessage = false
    });

    // Validation is now handled by Vue computed properties and watchers

    document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
        input.addEventListener('focus', (event) => {
          this.updateExplanation(event.target.id);
        });

        // Ensure that clicking also updates the explanation panel
        input.addEventListener('click', (event) => {
          this.updateExplanation(event.target.id);
        });
    });


    // Call this function after the page loads
    window.addEventListener('DOMContentLoaded', this.initializeFieldsetStates);

    document.querySelectorAll('[data-tooltip]').forEach(function (element) {
        element.addEventListener('mouseover', function (event) {
            const tooltipText = element.getAttribute('data-tooltip');
            const tooltipType = element.getAttribute('data-tooltip-type');

            let tooltip = document.createElement('div');
            tooltip.className = 'tooltip-custom';
            if (tooltipType === 'warning') {
                tooltip.classList.add('tooltip-warning');
            }
            tooltip.innerHTML = tooltipText; // Use innerHTML to allow HTML content
            document.body.appendChild(tooltip);

            const rect = element.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
            tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 5}px`;

            requestAnimationFrame(() => {
                tooltip.classList.add('tooltip-visible');
            });

            element.addEventListener('mousemove', function (event) {
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY - tooltip.offsetHeight - 10}px`;
            });

            element.addEventListener('mouseout', function () {
                tooltip.classList.remove('tooltip-visible');
                tooltip.remove();
            }, { once: true });
        });
    });

    // Note: Input field event handling now done via Vue component event bindings
    // Legacy DOM-based event listeners removed in favor of Vue approach

    // Attach event listeners to keep both views in sync in real-time
    document.addEventListener("DOMContentLoaded", () => {
        
        // Sync from form to table when form input changes
        document.querySelectorAll(".field-to-check[data-col]").forEach(input => {
            input.addEventListener("input", () => {
              this.updateTableFromForm
            });
            // input.addEventListener("input", generateEditableTable);
        });

        // Sync from table to form when table cell changes
        document.querySelectorAll("td[data-year][data-col]").forEach(cell => {
            cell.addEventListener("input", this.updateFormFromTable);
        });

    });

    // Table updating is now handled by Vue reactivity through dataColumns computed property

    // Economic returns calculation is now handled by Vue computed property and watchers

    window.addEventListener('resize', () => {
        let container = document.querySelector('.container');
        let width = window.innerWidth;
        let height = window.innerHeight;

        if (width < 1280) {
            container.style.width = '1280px';
        } else if (width > 1280) {
            container.style.width = '1280px';
        }

        if (height < 1024) {
            container.style.height = '1024px';
        } else if (height > 1024) {
            container.style.height = '1024px';
        }
    });

    // Form ready checking is now handled by Vue computed properties and watchers

    document.addEventListener("DOMContentLoaded", () => {
        resultsPanel('off')
        // Economic returns are now handled by the EconomicReturns Vue component
    });

  }
};
</script>

<template>
  <div class="container">
      <div class="flipper" id="flipper">
          <div class="front">
              <Translation />
              <div class="header">
                  <h1 id="page-title">ROI in AI Ethics Framework Calculator v0.8.5</h1>
                  <div class="paperbutton" id="read-paper" @click="togglePanel()">Read the Paper</div>
              </div>
              <InfoPanel
                :infoPanelContent='infoPanelContent'
                :errorMessage='errorMessage'
                @showModal="showDisclaimerModal = true"
              />
              <!-- Disclaimer Modal -->
              <DisclaimerModal 
                v-if="showDisclaimerModal"
                @close="showDisclaimerModal = false"
              />

              <div class="formula-container" style="position: relative;">
                  <div @click="showHelp()" style="position: absolute; top: 7px; right: 10px; cursor: pointer;">
                      <img src="/icons/iconhelp.png" data-tooltip-key="helpInformation" data-tooltip="Help Information"
                          data-tooltip-type="regular" alt="Help Icon" style="width: 33px; height:33px;">
                  </div>
                  <div class="formula-leftpanel" id="explanation-panel"></div>
              </div>

              <!-- Help Popup (Initially Hidden) -->
              <div id="helpPopup">
                  <button id="closeHelp" @click="closeHelp()">
                      <img src='/icons/close--large.svg'>
                  </button>
                  <h2 id="helpPopupTitle">Holistic Return on AI Ethics Framework Calculator</h2>
                  <div id="helpPopupContent"
                      style="max-height: 600px; overflow-y: scroll; font-size:18px; padding: 20px; padding-top:0px;background-color:#fefeff;">
                      <p>Organizations are motivated to implement ethical AI practices for various reasons. For
                          example, because they believe it is the right thing to do or to avoid costs such as lawsuits
                          and fines. You can use this calculator to estimate your potential returns on AI ethics
                          investments, and refer to the paper titled, "The Return on Investment in AI Ethics: A
                          Holistic Framework" (<a href="#"
                              @click="togglePanel();">https://arxiv.org/pdf/2309.13057</a>) for a deeper
                          understanding of the benefits. The paper proposes a comprehensive approach to understanding
                          the returns on investments in AI ethics.</p>
                      <p>The Holistic Return on AI Ethics framework considers not only direct economic returns but
                          also intangible benefits related to reputation and real options connected to organizational
                          capabilities. This framework is designed to help organizations justify their investments in
                          AI ethics by demonstrating how these investments can lead to cost savings, revenue
                          generation, improved stakeholder perceptions, and enhanced future opportunities.</p>
                      <p class="note-box"><strong>Note</strong>: The return on investments in AI ethics and governance
                          initiatives should be assessed holistically. While this calculator provides a helpful tool
                          for assessing quantifiable returns, a holistic assessment should also include returns and
                          impacts that are qualitative in nature. It is important to consider a broad set of
                          stakeholders and the impact on society at large during the holistic assessment process.</p>
                      <br />
                      <p>AI technologies, while beneficial, pose significant ethical challenges such as bias,
                          fairness, and privacy concerns. Addressing these issues requires substantial investments,
                          which organizations often find difficult to justify without clear evidence of return on
                          investment.</p>
                      <p>The ROI in AI Ethics framework addresses this gap by integrating economic impacts, such as
                          direct
                          financial returns and cost avoidance, with intangible impacts, like improved reputation and
                          stakeholder trust. Additionally, it includes real options that offer future flexibility and
                          adaptability. This approach provides a comprehensive view of how AI ethics investments can
                          contribute to an organization's overall success and sustainability, making it easier to
                          justify and sustain these critical initiatives.</p>
                      <p>In line with this holistic approach, this program uses the formulas provided in the paper to
                          calculate the ROI of AI ethics investments over multiple years. This program prompts users
                          for inputs related to economic returns, reputational returns, and capability returns for
                          each year, as well as the discount factor and initial investment costs.</p>
                      <p>By incorporating these variables, the program computes the ROI by discounting future returns
                          to their present value and summing up the total returns from economic, reputational, and
                          capability investments. This multi-year approach allows organizations to better evaluate the
                          long-term benefits of their AI ethics investments, providing a clearer picture of how these
                          investments impact their overall performance and strategic flexibility.</p>
                  </div>
                  <div id="helpPopupSignature" class="signature-box">
                      <strong>Last updated</strong>: August 30, 2024
                  </div>
              </div>

              <div id="helpFormToolbar">
                  <button @click="closeToolbarHelp()"
                      style="position:absolute; top: 2px; right: 2px; background: none; border: none; font-size: 16px; cursor: pointer;color:black;">
                      <img src='/icons/close--large.svg'>
                  </button>
                  <h2
                      style="padding-left:20px; background-color:white; border-bottom:1px solid #ccc; padding-bottom:0px;">
                      Toolbar Help</h2>
                  <div
                      style="max-height: 300px; overflow-y: scroll; font-size:18px; padding: 20px; padding-top:0px;background-color:#fefeff;">
                      <p>The toolbar above the input form has several buttons that help you work with the calculator's
                          input values:</p>

                      <div class="table">
                          <div class="row">
                              <div class="icon-column">
                                  <img class="icon" src="/icons/help.svg" alt="Help">
                              </div>
                              <div class="details-column">
                                  <p><strong>Help With This Toolbar</strong>: Brings up this help screen.
                                  </p>
                              </div>
                          </div>
                          <div class="row">
                              <div class="icon-column">
                                  <img class="icon" src="/icons/save.svg" alt="Erase">
                              </div>
                              <div class="details-column">
                                  <p><strong>Save Values as Default</strong>: Pressing this
                                      button saves the current values in the input fields as the default form, which
                                      gets loaded automatically whenever the calculator is reloaded or the browser
                                      is restarted. </p>
                                  <p>This function
                                      stores the values of the form in the browser's local storage, which allows data
                                      to be retained even after the browser is closed and reopened. You
                                      can update the default form at any time by pressing the button again. Upon
                                      saving, the toolbar will display the message "Saved Default Form."</p>
                                  <p>If a default
                                      form has been previously saved, the toolbar will display the message "Loaded
                                      Default Form"
                                      when the calculator is reloaded. </p>
                              </div>
                          </div>
                          <div class="row">
                              <div class="icon-column">
                                  <img class="icon" src="/icons/erase.svg" alt="Erase">
                              </div>
                              <div class="details-column">
                                  <p><strong>Erase Form</strong>: Pressing this button erases the input form and
                                      displays the message "--- BLANK FORM ---" in the toolbar. Note that
                                      that, if you erase the input form and then save the blank form as the default
                                      form,
                                      the calculator will always come up blank when the page loads, until you save a
                                      different
                                      form as default. Erasing the form does not clear the default form.
                                  </p>
                              </div>
                          </div>
                          <div class="row">
                              <div class="icon-column">
                                  <img class="icon" src="/icons/trash-can.svg" alt="Trash">
                              </div>
                              <div class="details-column">
                                  <p><strong>Delete Default Form</strong>: This deletes the browser's local storage
                                      and therefore the default form.
                                      If you press this button and reload the web page or reopen the browser, you will
                                      see the following message, which
                                      also appears the very first time you use the calculator:
                                  <div class="nolocalstorage"><img src="/icons/nolocalstorage.jpg"></div>

                                  The message disappears as soon as you start using the form or the toolbar. If you
                                  later save your form as the default, you will no longer see this message. This is
                                  true
                                  even if you save a blank form as the default. Deleting the default form does not
                                  erase the form.
                                  </p>
                              </div>
                          </div>


                          <div class="row">
                              <div class="icon-column">
                                  &nbsp;
                              </div>
                              <div class="details-column">
                                  <p><strong>Examples and Navigation Controls</strong>:
                                      The ROI in AI Ethics calculator comes pre-loaded with 10 examples to help you
                                      better
                                      understand
                                      how the HROE formula works. The Examples Navigation controls are these:</p>
                                  <p><img src="/icons/navcontrols.jpg"></p>
                                  <p>
                                      Navigating to an example fills the input form with predefined values and
                                      automatically calculates the ROI. The navigation wraps around, so, if you are
                                      on the last example and click
                                      "Next Example," it will take you back to the first example, which is the one
                                      explained in the paper. Similarly,
                                      if you are on the first example and click "Previous Example," it will take you
                                      to the last example. </p>
                                  <p>These examples are stored in the
                                      <strong>hroe-examples.js</strong> file, located in the <em>scripts</em>
                                      directory. Here is what it looks like:
                                  </p>
                                  <p>
                                      <img src="/icons/hroe-examples.jpg" width="70%" height="70%">
                                  </p>
                                  <p>You can edit this file to add new examples, as well as delete or
                                      modify existing ones. Remember to reload the page for your changes to take
                                      effect.</p>
                                  <p>
                                      If you plan to modify the <strong>hroe-examples.js</strong> file, we strongly
                                      recommend making a backup first and keeping the example from the paper as the
                                      first entry.


                                  </p>

                              </div>
                          </div>
                      </div>

                      <div class="row">
                          <div class="icon-column">
                              <img src="/icons/settings--edit.svg" alt="Settings" class="icon svgimagedisabled">
                          </div>
                          <div class="details-column">
                              <p><strong>FUTURE FEATURE</strong>: This disabled button is a placeholder for a
                                  tentative future feature that would
                                  allow you to configure and connect to external sources to populate the different
                                  input fields.
                              </p>

                          </div>
                      </div>

                  </div>
                  <div class="signature-box">
                      <strong>Last updated</strong>: August 30, 2024
                  </div>
              </div>



              <div class="columns">
                  <div class="left-column">
                      <CalculatorToolbar 
                        :showStartupMessage="showStartupMessage"
                        @erase-form="eraseForm"
                        @delete-local-storage="deleteLocalStorage"
                        @populate-example="populateWithSampleValues"
                        @save-to-memory="saveToMemory"
                        @show-toolbar-help="showToolbarHelp"
                      />

                      <BasicInputs
                        :key="componentKey"
                        :years="years"
                        :discount="discount"
                        @update:years="years = $event"
                        @update:discount="discount = $event"
                        @focus-field="handleFocusField"
                        @update-explanation="handleUpdateExplanation"
                        @clear-explanation="handleClearExplanation"
                        @move-to-next-input="moveToNextInput"
                      />
                      <fieldset id="editableTableFieldSet" class="outer-group">
                          <legend>

                              <a href="#" id="editableTableViewToggle" @click="toggleEditableTable()"><img
                                      class="svgimage" height="22px" weight="22px" src="/icons/table--split.svg" /></a>
                              <a href="#" id="xxxxx" @click="displayReturnsChart()"><img class="svgimage"
                                      height="22px" weight="22px" src="/icons/chart--combo.svg" /></a>

                          </legend>
                          <!-- Economic Returns Section -->
                          <div id="defaultview">

                              <Investments
                                :key="componentKey"
                                :initialInvestment="initialInvestment"
                                :capabilityCosts="capabilityCosts"
                                :fieldValidationStyles="fieldValidationStyles"
                                @update:initialInvestment="initialInvestment = $event"
                                @update:capabilityCosts="capabilityCosts = $event"
                                @focus-field="handleFocusField"
                                @update-explanation="handleUpdateExplanation"
                                @clear-explanation="handleClearExplanation"
                                @move-to-next-input="moveToNextInput"
                              />

                              <fieldset class="field-group">
                                  <legend id="returns">Returns</legend>
                                  <EconomicReturns
                                    :key="componentKey"
                                    :orgRevenues="orgRevenues"
                                    :fineAvoidanceValues="fineAvoidanceValues"
                                    :economicReturns="economicReturns"
                                    :fieldValidationStyles="fieldValidationStyles"
                                    @update:orgRevenues="orgRevenues = $event"
                                    @update:fineAvoidanceValues="fineAvoidanceValues = $event"
                                    @update:economicReturns="economicReturns = $event"
                                    @focus-field="handleFocusField"
                                    @update-explanation="handleUpdateExplanation"
                                    @clear-explanation="handleClearExplanation"
                                    @move-to-next-input="moveToNextInput"
                                  />
                                  <ReputationalReturns
                                    :key="componentKey"
                                    :reputationalReturns="reputationalReturns"
                                    :fieldValidationStyles="fieldValidationStyles"
                                    @update:reputationalReturns="reputationalReturns = $event"
                                    @focus-field="handleFocusField"
                                    @update-explanation="handleUpdateExplanation"
                                    @clear-explanation="handleClearExplanation"
                                    @move-to-next-input="moveToNextInput"
                                    @toggle-blur="handleToggleBlur"
                                  />
                                  <CapabilityReturns
                                    :key="componentKey"
                                    :capabilityReturns="capabilityReturns"
                                    :fieldValidationStyles="fieldValidationStyles"
                                    @update:capabilityReturns="capabilityReturns = $event"
                                    @focus-field="handleFocusField"
                                    @update-explanation="handleUpdateExplanation"
                                    @clear-explanation="handleClearExplanation"
                                    @move-to-next-input="moveToNextInput"
                                    @toggle-blur="handleToggleBlur"
                                  />
                              </fieldset>
                          </div>
                          <div id="editableTableContainer" style="display: none;">
                              <!-- Table content will be dynamically generated -->
                          </div>
                          <EditableTable
                            v-if='showEditableTable'
                            :years="years"
                            :columns="dataColumns"
                            @update-column="updateColumn"
                          />
                          <!-- <div class="card"> -->
                          <div class="chart-container" id="returnsChartContainer" style="display:none;">
                              <canvas id="returnsChart"></canvas>
                          </div>
                          <!-- </div> -->
                      </fieldset>
                  </div>
                  <div class="right-column">
                      <FormulaDisplay />

                      <div class="leftcontainer">
                          <!-- <div class="paperbutton" style="position:relative;top:-23px;" @click="calculateHROE()">Calculate HROE</div> -->
                          <div 
                            :class="['hroebutton', !hroeReady && 'disabled']" 
                            id="hroebutton" 
                            @click="calculateHROE()"
                          >Calculate ROI</div>
                          <span id="hroeResultDisplay" class="hroe-result"></span>
                          <div id="resultsHeader" style="margin-bottom:25px;display: none;"></div>
                          <div class="enlargefont" id="hroeDisplay"
                              style="--fontsize: 24px; margin-bottom:45px; display: none;">
                              ROI: <span id="roi_value"></span>
                          </div>
                      </div>
                      <div class="card-top-right">
                      </div>
                      <div class="results">
                          <div class="bottom-panel">
                              <div id="roiChartContainer" class="hidden">
                                  <div id="chartExplanation" class="explanation"></div>
                                  <div id="initial_explanation"></div>
                              </div>
                              <div style="text-align: center; margin-top: 20px;">
                                  <button id="generatePDFButton" style="display:none;"
                                      @click="generatePDF()">Generate PDF</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div id="tooltip" class="tooltip"></div>
          </div>
          <div class="back">
              <div class="header">
                  <h1>The Return on Investment in AI Ethics: A Holistic Framework</h1>
                  <div class="paperbutton" id="return-calculator" @click="togglePanel()">Return to Calculator</div>
              </div>
              <iframe src="https://arxiv.org/pdf/2309.13057#zoom=125" title="HROE Paper"></iframe>
          </div>
      </div>
  </div>
</template>

<style scoped>

#editableTableFieldSet > legend {
    font-family: 'Arial', sans-serif; /* Change to your desired font */
    font-size: 14px; /* Adjust the font size */
    font-weight: 300; /* Optional: make it bold */
    text-align: right; /* Align text to the right */
    width: 100%; /* Ensure the text spans the width */
    direction: rtl; /* Ensure right alignment */
}
</style>