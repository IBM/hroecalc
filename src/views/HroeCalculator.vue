<script>
import * as hroe from "@/scripts/hroe.js"
import Translation from "@/components/Translation.vue";
import EditableTable from "@/components/EditableTable.vue";
import DisclaimerModal from "@/components/DisclaimerModal.vue";
import InfoPanel from "@/components/InfoPanel.vue";

export default {
  components: {
    Translation,
    EditableTable,
    DisclaimerModal,
    InfoPanel,
  },
  watch: {
    dataColumns: {
      deep: true,
      handler(newValue) {
        this.calculateHROE()
        this.validateCommaSeparatedInputs()
      }
    }
  },
  data() {
    return {
      ...hroe,
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
      hroeReady: false
    };
  },
  computed: {
    dataColumns() {
      return [
        this.capabilityCosts.split(','),
        this.orgRevenues.split(','),
        this.fineAvoidanceValues.split(','),
        this.economicReturns?.split(','),
        this.reputationalReturns.split(','),
        this.capabilityReturns.split(','),
      ];
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
  },  
  mounted () {
    // Load the links when the page loads
    document.addEventListener('DOMContentLoaded', this.loadLinks);

    document.addEventListener('click', (event) => {
      this.showStartupMessage = false
    });

    // Call validateCommaSeparatedInputs() on input change
    document.getElementById('years').addEventListener('input', this.validateCommaSeparatedInputs);
    this.fieldsToCheck.forEach(fieldId => {
        document.getElementById(fieldId).addEventListener('input', this.validateCommaSeparatedInputs);
    });

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

    this.inputFields.forEach(function (input) {
        input.addEventListener('input', this.clearMessageOnInput);  // 'input' event covers typing, pasting, etc.
        // input.addEventListener('click', clearMessageOnInput);  // 'click' event covers mouse clicks
    });

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

    // Attach event listeners to the original fields to update the table when they change
    document.querySelectorAll('#defaultview input').forEach(input => {
        input.addEventListener('input', () => {
            if (isTableView) {
                const years = parseInt(document.getElementById('years').value);
                const fields = [
                    { id: 'economic_returns', label: 'Economic Returns' },
                    { id: 'fine_avoidance', label: 'Fine Avoidance' },
                    { id: 'intangible_value', label: 'Intangible Value' },
                    { id: 'investment_cost', label: 'Investment Cost' },
                    { id: 'capability_returns', label: 'Capability Returns' }
                ];
                this.updateTableFromFields(fields, years);
            }
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
        const revenueField = document.getElementById('org_revenues');
        const fineAvoidanceField = document.getElementById('fine_avoidance');
        const economicReturnField = document.getElementById('calc_economic_returns');

        function calculateEconomicReturns() {
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
        }

        // Event listeners for syncing on input change
        revenueField.addEventListener('input', calculateEconomicReturns);
        fineAvoidanceField.addEventListener('input', calculateEconomicReturns);

        // Initial calculation for any pre-populated values
        calculateEconomicReturns();
    });

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

    document.addEventListener('DOMContentLoaded', () => {
        const inputFields = document.querySelectorAll('.field-to-check'); // Adjust the selector if needed
        const calculateButton = document.getElementById('hroebutton'); // Adjust the ID if it's different

        function checkFormValues() {
            let allFilled = true;
            inputFields.forEach(function (input) {
                if (input.value === '') {
                    allFilled = false;
                }
            });

            if (allFilled) {
                this.hroeReady = true; // Set hroeReady to true when all fields are filled
            } else {
                this.hroeReady = false; // Set hroeReady to false if any field is empty
            }
        }

        // Attach event listeners to all input fields
        inputFields.forEach(function (input) {
            input.addEventListener('input', checkFormValues);
        });

    });

    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(updateEconomicReturnsField, 50);
        resultsPanel('off')
        // updateEconomicReturnsField();
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
                      <div class="card-top-right">

                          <div class="memory-menu-container">
                              <a class="erase-form-text svgimage" @click="eraseForm();"><img src="/icons/erase.svg"
                                      data-tooltip-key="eraseForm" data-tooltip="Erase Form"
                                      data-tooltip-type="regular"></a>&nbsp;
                              <a class="erase-form-text svgimage" @click="deleteLocalStorage();"><img
                                      src="/icons/trash-can.svg" data-tooltip-key="deleteDefault"
                                      data-tooltip="Delete Default Form"
                                      data-tooltip-type="regular"></a>&nbsp;&nbsp;&nbsp;
                              <a class="svgimagedisabled"><img src="/icons/settings--edit.svg"
                                      data-tooltip-key="futureFeature"
                                      data-tooltip="<strong>--- FUTURE FEATURE ---</strong><br/>Configure Input Sources"
                                      data-tooltip-type="warning"></a>

                              <div class="populate-container">

                                  <a class="populate-icon svgimage" @click="populateWithSampleValues('first');"><img
                                          src="/icons/page--first.svg" data-tooltip-key="firstExample"
                                          data-tooltip="First Example (discussed in the paper)"
                                          data-tooltip-type="regular"></a>&nbsp;&nbsp;&nbsp;
                                  <a class="populate-icon svgimage" @click="populateWithSampleValues('left');"><img
                                          src="/icons/triangle--left--outline.svg" data-tooltip-key="previousExample"
                                          data-tooltip="Previous Example"
                                          data-tooltip-type="regular"></a>&nbsp;&nbsp;&nbsp;

                                  <div id="exampleMessage">&nbsp;</div>
                                  <a class="populate-icon svgimage" @click="populateWithSampleValues('right');"><img
                                          src="/icons/triangle--right--outline.svg" data-tooltip-key="nextExample"
                                          data-tooltip="Next Example"
                                          data-tooltip-type="regular"></a>&nbsp;&nbsp;&nbsp;
                                  <a class="populate-icon svgimage" @click="populateWithSampleValues('last');"><img
                                          src="/icons/page--last.svg" data-tooltip-key="lastExample"
                                          data-tooltip="Last Example" data-tooltip-type="regular"></a>
                              </div>

                              <a class="save-memory-text svgimage" @click="saveToMemory();"><img src="/icons/save.svg"
                                      data-tooltip-key="saveDefault" data-tooltip="Save Values as Default"
                                      data-tooltip-type="regular"></a>
                              <a class="save-memory-text svgimage" @click="showToolbarHelp();"><img
                                      src="/icons/help.svg" data-tooltip-key="helpToolbar"
                                      data-tooltip="Help With This Toolbar" data-tooltip-type="regular"></a>

                          </div>

                          <div
                            class="startupMessageOverlay"
                            id="startupMessageOverlay"
                            v-if="showStartupMessage"
                          >
                              <div class="startupMessageExcl1 blinkingText">&#10071;</div>
                              <div class="startupMessageText">
                                  <div class="startupMessageLine1">To get started, fill out the form below or click
                                      the</div>
                                  <div class="startupMessageLine2">controls above to navigate through examples.</div>
                              </div>
                          </div>

                      </div>

                      <div class="form-group" style="margin-top: 20px;">
                          <label id="yrs" for="years">Number of Years:</label>
                          <input v-model='years' type="number" id="years" oninput="validateCommaSeparatedInputs();" min="1"
                              class="field-to-check" @focus="highlightFormula('years'); updateExplanation('years')"
                              @mouseover="highlightFormula('years'); updateExplanation('years')"
                              @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
                              onchange="moveToNextInput(event)"
                          >
                      </div>
                      <div class="form-group">
                          <label id="costcap" for="discount">Cost of Capital (Discount Rate):</label>
                          <input v-model="discount" type="number" step="0.01" id="discount" min="0" max="1" class="field-to-check"
                              @focus="highlightFormula('discount'); updateExplanation('discount')"
                              oninput="highlightFormula('discount'); updateExplanation('discount');"
                              @mouseover="highlightFormula('discount'); updateExplanation('discount')"
                              @mouseout="clearExplanation()" onkeydown="moveToNextInput(event);"
                              onchange="moveToNextInput(event)">
                      </div>
                      <fieldset id="editableTableFieldSet" class="outer-group">
                          <legend>

                              <a href="#" id="editableTableViewToggle" @click="toggleEditableTable()"><img
                                      class="svgimage" height="22px" weight="22px" src="/icons/table--split.svg" /></a>
                              <a href="#" id="xxxxx" @click="displayReturnsChart()"><img class="svgimage"
                                      height="22px" weight="22px" src="/icons/chart--combo.svg" /></a>

                          </legend>
                          <!-- Economic Returns Section -->
                          <div id="defaultview">

                              <fieldset class="field-group">
                                  <legend id="investments">Investments</legend>
                                  <div class="form-group">
                                      <label for="initial_investment">Initial Investment (in millions):</label>
                                      <input type="number" step="0.1" id="initial_investment" min="0"
                                          class="field-to-check"
                                          @focus="highlightFormula('initial_investment'); updateExplanation('initial_investment');"
                                          oninput="highlightFormula('initial_investment'); updateExplanation('initial_investment');"
                                          @mouseover="highlightFormula('initial_investment'); updateExplanation('initial_investment')"
                                          @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
                                          onchange="moveToNextInput(event)"
                                          v-model="initialInvestment">
                                  </div>
                                  <div class="form-group">
                                      <label for="investment_cost">Cost for Capabilities (in millions per
                                          year,
                                          comma-separated):</label>
                                      <input type="text" id="investment_cost"
                                          @input="validateCommaSeparatedInputs();" class="field-to-check"
                                          pattern="^-?[0-9,]*$"
                                          @focus="highlightFormula('investment_cost'); updateExplanation('investment_cost')"
                                          @mouseover="highlightFormula('investment_cost'); updateExplanation('investment_cost')"
                                          @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
                                          v-model="capabilityCosts"
                                      >
                                  </div>

                              </fieldset>

                              <fieldset class="field-group">
                                  <legend id="returns">Returns</legend>
                                  <fieldset class="field-group">
                                      <legend id="economic">Economic Returns</legend>
                                      <div class="form-group">
                                          <label for="org_revenues">Organizational Revenue <br/>(in millions per year,
                                              comma-separated):</label>
                                          <input type="text" id="org_revenues"
                                              @input="validateCommaSeparatedInputs();"
                                              pattern="^-?[0-9,]*$"
                                              @focus="highlightFormula('economic_returns'); updateExplanation('economic_returns');"
                                              @mouseover="highlightFormula('economic_returns'); updateExplanation('economic_returns')"
                                              @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
                                              v-model="orgRevenues"
                                          >
                                      </div>
                                      <div class="form-group">
                                          <label for="fine_avoidance">Fine Avoidance Value (in % per year,
                                              comma-separated):</label>
                                          <input type="text" id="fine_avoidance"
                                              @input="validateCommaSeparatedInputs();"
                                              pattern="^-?[0-9,]*$"
                                              @focus="highlightFormula('fine_avoidance'); updateExplanation('fine_avoidance')"
                                              @mouseover="highlightFormula('fine_avoidance'); updateExplanation('fine_avoidance')"
                                              @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
                                              v-model="fineAvoidanceValues"
                                          >
                                      </div>
                                      <div class="form-group">
                                          <label for="calc_economic_returns">Economic Return <br/>(<em>in millions calculated as Revenue * Fine Avoidance %</em>)</label>
                                          <input 
                                            type="text"
                                            id="calc_economic_returns"
                                            class="field-to-check"
                                            readonly
                                            v-model="economicReturns"
                                          >
                                      </div>
                                      

                                  </fieldset>
                                  <a id="toggleReputationalIcon"
                                      @click="toggleBlur('reputationalReturnsFieldset')"><img
                                          class="toggleFormulaIcon svgimage" src="/icons/power.svg"></a>
                                  <fieldset id="reputationalReturnsFieldset" class="field-group">
                                      <legend id="intangible">Reputational Returns</legend>

                                      <div class="form-group">
                                          <label for="intangible_value">Intangible Returns (in millions per year,
                                              comma-separated):</label>
                                          <input type="text" id="intangible_value"
                                              @input="validateCommaSeparatedInputs();" class="field-to-check"
                                              pattern="^-?[0-9,]*$"
                                              @focus="highlightFormula('intangible_value'); updateExplanation('intangible_value')"
                                              @mouseover="highlightFormula('intangible_value'); updateExplanation('intangible_value')"
                                              onchange="updateExplanation('intangible_value')"
                                              @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
                                              v-model="reputationalReturns"
                                          >
                                      </div>
                                  </fieldset>
                                  <a id="toggleCapabilitiesIcon"
                                      @click="toggleBlur('capabilitiesReturnsFieldset')"><img
                                          class="toggleFormulaIcon svgimage" src="/icons/power.svg"></a>

                                  <fieldset id="capabilitiesReturnsFieldset" class="field-group">
                                      <legend id="capabilities">Returns on Capabilities</legend>

                                      <div class="form-group">
                                          <label for="capability_returns">Capability Returns (in millions per year,
                                              comma-separated):</label>
                                          <input type="text" id="capability_returns"
                                              @input="validateCommaSeparatedInputs();" class="field-to-check"
                                              pattern="^-?[0-9,]*$"
                                              @focus="highlightFormula('capability_returns'); updateExplanation('capability_returns')"
                                              @mouseover="highlightFormula('capability_returns'); updateExplanation('capability_returns')"
                                              @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
                                              v-model="capabilityReturns"
                                            >
                                      </div>
                                  </fieldset>
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
                      <div class="formula">
                          <div>
                              <h3 id="hroeformula">ROI in AI Ethics</h3>
                              <div id="paperSection">
                                  
                              </div>
                              <div class="fraction" id="formula">

                                  <div class="numerator">
                                      <span id="sum1">
                                          <em>ROI<sub>t,N,m</sub> = <br /><br />
                                              <div class="shift right" style="--shift-value: 12px;">( ∑</div>
                                              <span id="Ny" class="tooltip-target"><sup class="shift right"
                                                      style="--shift-value: 16px;">t+N</sup><sub class="shift left"
                                                      style="--shift-value: 16px;">j=t</sub></span>
                                              <span id="Alpha" class="tooltip-target">
                                                  <div class="shift left enlargefont"
                                                      style="--shift-value: 6px; --fontsize: 30px">α</div><sub
                                                      class="shift left" style="--shift-value: 5px;">j-t</sub>
                                              </span>
                                              [<span id="Re" class="tooltip-target">R<sup class="shift right"
                                                      style="--shift-value:1px;">e</sup><sub class="shift left"
                                                      style="--shift-value: 8px;">j</sub>(I<sub>t</sub>&nbsp;)</span>
                                              + <span id="Rr" class="tooltip-target">R<sup class="shift right"
                                                      style="--shift-value: 2px;">r</sup><sub class="shift left"
                                                      style="--shift-value: 6px;">j</sub>(I<sub>t</sub>&nbsp;)</span>
                                              + ∑<sup class="shift right" style="--shift-value: 6px;">m</sup><sub
                                                  class="shift left" style="--shift-value: 10px;">k=1</sub>
                                              <span id="Rc" class="tooltip-target">R<sup class="shift right"
                                                      style="--shift-value: 2px;">c</sup><sub class="shift left"
                                                      style="--shift-value: 8px;">t,k</sub>(γ<sub>k</sub>
                                                  <div class="shift right" style="--shift-value: 2px;">I</div><sup
                                                      class="shift right" style="--shift-value: 4px;">c</sup><sub
                                                      class="shift left" style="--shift-value:6px;">t</sub>)
                                              </span>])
                                              - (<span id="It1" class="tooltip-target">I<sub>t</sub></span>
                                              + <span id="Ic_t1" class="tooltip-target">I<sup class="shift right"
                                                      style="--shift-value: 2px;">c</sup><sub class="shift left"
                                                      style="--shift-value: 8px;">t</sub>)
                                                </span>
                                          </em>
                                      </span>
                                  </div>
                                  <hr id="dividerFull">
                                  <div class="denominator">
                                      <em><span id="It2" class="tooltip-target">I<sub>t</sub></span>
                                          + <span id="Ic_t2" class="tooltip-target">I<sup class="shift right"
                                                  style="--shift-value: 2px;">c</sup><sub class="shift left"
                                                  style="--shift-value: 8px;">t</sub></span></em>
                                  </div>
                                  <div id="formulaExplanationContainer">
                                      <div id="formula_explanation">
                                          The full ROI in AI Ethics formula considers Economic Returns, Reputational
                                          Returns, and
                                          Capability Returns, as well as Capability Costs.
                                          It calculates the ROI based on these factors, discounting future
                                          returns using the discount factor.
                                          The formula incorporates:
                                          <ul>
                                              <li>
                                                  <div class="bluefont">Economic Returns (Re)</div>: Returns from
                                                  economic benefits,
                                                  including fine avoidance (e.g., fine received for non-compliance
                                                  with regulation).
                                              </li>
                                              <li>
                                                  <div class="bluefont">Reputational Returns (Rr)</div>: Returns from
                                                  reputation.
                                              </li>
                                              <li>
                                                  <div class="bluefont">Capability Returns (Rc)</div>: Returns from
                                                  increased capabilities.
                                              </li>
                                          </ul>
                                          
                                      </div>
                                  </div>
                              </div>
                          </div>

                      </div>

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