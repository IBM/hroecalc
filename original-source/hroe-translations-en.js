window.hroeTranslations_en = {
        title: "HROE Framework Calculator V0.8.6",
        hroeformula: "HROE Formula",
        readPaper: "Read the Paper",
        generatePDF: "Generate PDF",
        returnToCalculator: "Return to Calculator",
        helpInformation: "Help Information",
        eraseForm: "Erase Form",
        deleteDefault: "Delete Default Form",
        futureFeature: "<strong>--- FUTURE FEATURE ---</strong><br/>Configure Input Sources",
        firstExample: "First Example (discussed in the paper)",
        previousExample: "Previous Example",
        nextExample: "Next Example",
        lastExample: "Last Example",
        saveDefault: "Save Values as Default",
        helpToolbar: "Help With This Toolbar",
        helpFormToolbar: `
<button onclick="closeToolbarHelp()"
    style="position:absolute; top: 2px; right: 2px; background: none; border: none; font-size: 16px; cursor: pointer;color:black;">
    <img src='icons/close--large.svg'>
</button>
<h2 style="padding-left:20px; background-color:white; border-bottom:1px solid #ccc; padding-bottom:0px;">
    Form Toolbar Help</h2>
<div style="max-height: 300px; overflow-y: scroll; font-size:18px; padding: 20px; padding-top:0px;background-color:#fefeff;">
    <p>The toolbar above the input form has several buttons that help you work with the calculator's input values:</p>
    <div class="table">
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/help.svg" alt="Help">
            </div>
            <div class="details-column">
                <p><strong>Help With This Toolbar</strong>: Brings up this help screen.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/save.svg" alt="Save">
            </div>
            <div class="details-column">
                <p><strong>Save Values as Default</strong>: Pressing this button saves the current values in the input fields as the default form, which gets loaded automatically whenever the calculator is reloaded or the browser is restarted. </p>
                <p>This function stores the values of the form in the browser's local storage, which allows data to be retained even after the browser is closed and reopened. You can update the default form at any time by pressing the button again. Upon saving, the toolbar will display the message "Saved Default Form."</p>
                <p>If a default form has been previously saved, the toolbar will display the message "Loaded Default Form" when the calculator is reloaded.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/erase.svg" alt="Erase">
            </div>
            <div class="details-column">
                <p><strong>Erase Form</strong>: Pressing this button erases the input form and displays the message "--- BLANK FORM ---" in the toolbar. Note that if you erase the input form and then save the blank form as the default form, the calculator will always come up blank when the page loads, until you save a different form as default. Erasing the form does not clear the default form.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/trash-can.svg" alt="Trash">
            </div>
            <div class="details-column">
                <p><strong>Delete Default Form</strong>: This deletes the browser's local storage and therefore the default form. If you press this button and reload the web page or reopen the browser, you will see the following message, which also appears the very first time you use the calculator:</p>
                <div class="nolocalstorage"><img src="icons/nolocalstorage.jpg"></div>
                <p>The message disappears as soon as you start using the form or the toolbar. If you later save your form as the default, you will no longer see this message. This is true even if you save a blank form as the default. Deleting the default form does not erase the form.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                &nbsp;
            </div>
            <div class="details-column">
                <p><strong>Examples and Navigation Controls</strong>: The HROE calculator comes pre-loaded with 10 examples to help you better understand how the HROE formula works. The Examples Navigation controls are these:</p>
                <p><img src="icons/navcontrols.jpg"></p>
                <p>Navigating to an example fills the input form with predefined values and automatically calculates the HROE. The navigation wraps around, so, if you are on the last example and click "Next Example," it will take you back to the first example, which is the one explained in the paper. Similarly, if you are on the first example and click "Previous Example," it will take you to the last example.</p>
                <p>These examples are stored in the <strong>hroe-examples.js</strong> file, located in the <em>scripts</em> directory. Here is what it looks like:</p>
                <p><img src="icons/hroe-examples.jpg" width="70%" height="70%"></p>
                <p>You can edit this file to add new examples, as well as delete or modify existing ones. Remember to reload the page for your changes to take effect.</p>
                <p>If you plan to modify the <strong>hroe-examples.js</strong> file, we strongly recommend making a backup first and keeping the example from the paper as the first entry.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img src="icons/settings--edit.svg" alt="Settings" class="icon svgimagedisabled">
            </div>
            <div class="details-column">
                <p><strong>FUTURE FEATURE</strong>: This disabled button is a placeholder for a tentative future feature that would allow you to configure and connect to external sources to populate the different input fields.</p>
            </div>
        </div>
    </div>
    <div class="signature-box">
        <strong>Last updated</strong>: August 30, 2024
    </div>`,
        yearsLabel: "Number of years (N):",
        capabilitiesLabel: "Number of capability options (m):",
        discountLabel: "Cost of Capital (Discount Rate):",
        economicReturnsLabel: "Core economic returns (in millions per year, comma-separated):",
        fineAvoidanceLabel: "Fine avoidance value (in millions per year, comma-separated):",
        intangibleValueLabel: "Intangible aspect value in millions:",
        capabilityReturnsLabel: "Capability returns in millions (comma-separated):",
        gammaLabel: "Gamma (fractions of funds, comma-separated):",
        initialInvestmentLabel: "Initial investment in millions:",
        investmentCostLabel: "Additional investment cost for capabilities in millions:",
        results: "Results",
        calculate: "Calculate HROE",
        economic: "Economic Returns",
        intangible: "Reputational Returns",
        capabilities: "Returns on Capabilities",
        hoverText: "",
        explanationPanelDefault: `The return on investments in AI ethics and governance initiatives should be assessed holistically. While this calculator provides a helpful tool for assessing quantifiable returns, a holistic assessment should also include returns and impacts that are qualitative in nature. It is important to consider a broad set of stakeholders and the impact on society at large during the holistic assessment process.`,
        commaSeparatedEntry: 'comma-separated entry',
        commaSeparatedEntries: 'comma-separated entries',
        extraComma: 'has an extra comma',
        extraCommas: 'has extra commas',
        extraEntry: 'entry',
        extraEntries: 'entries',
        missing: 'is missing',
        missingPlural: 'have missing',
        and: 'and',
        fieldListIntro: 'Since the number of years is',
        proceed: 'You can still proceed with the calculation, but note that missing entries will be set to 0 for that year.',
        ignore: 'Extra entries will be ignored.',
        warning: 'Please note the following:',
        chart: {
            economicReturns: "Economic Returns",
            intangibles: "Reputational Returns",
            capabilityReturns: "Capability Returns",
            value: "Values (in millions)",
            year: "Year"
        },
        helpPopupTitle: "Holistic Return on Ethics (HROE) Framework Calculator",
        helpPopupContent: `
            <p>Organizations are motivated to implement ethical AI practices for various reasons. For example, because they believe it is the right thing to do or to avoid costs such as lawsuits and fines. You can use this calculator to estimate your potential returns on AI ethics investments, and refer to the paper titled, "The Return on Investment in AI Ethics: A Holistic Framework" (<a href="#" onclick="togglePanel();">https://arxiv.org/pdf/2309.13057</a>) for a deeper understanding of the benefits. The paper proposes a comprehensive approach to understanding the returns on investments in AI ethics.</p>
        <p>The Holistic Return on Ethics (HROE) framework considers not only direct economic returns but also intangible benefits related to reputation and real options connected to organizational capabilities. This framework is designed to help organizations justify their investments in AI ethics by demonstrating how these investments can lead to cost savings, revenue generation, improved stakeholder perceptions, and enhanced future opportunities.</p>
        <p class="note-box"><strong>Note</strong>: The return on investments in AI ethics and governance initiatives should be assessed holistically. While this calculator provides a helpful tool for assessing quantifiable returns, a holistic assessment should also include returns and impacts that are qualitative in nature. It is important to consider a broad set of stakeholders and the impact on society at large during the holistic assessment process.</p>
        <br />
        <p>AI technologies, while beneficial, pose significant ethical challenges such as bias, fairness, and privacy concerns. Addressing these issues requires substantial investments, which organizations often find difficult to justify without clear evidence of return on investment.</p>
        <p>The HROE framework addresses this gap by integrating economic impacts, such as direct financial returns and cost avoidance, with intangible impacts, like improved reputation and stakeholder trust. Additionally, it includes real options that offer future flexibility and adaptability. This approach provides a comprehensive view of how AI ethics investments can contribute to an organization's overall success and sustainability, making it easier to justify and sustain these critical initiatives.</p>
        <p>In line with this holistic approach, this program uses the formulas provided in the paper to calculate the ROI of AI ethics investments over multiple years. This program prompts users for inputs related to economic returns, reputational returns, and capability returns for each year, as well as the discount factor and initial investment costs.</p>
        <p>By incorporating these variables, the program computes the HROE by discounting future returns to their present value and summing up the total returns from economic, reputational, and capability investments. This multi-year approach allows organizations to better evaluate the long-term benefits of their AI ethics investments, providing a clearer picture of how these investments impact their overall performance and strategic flexibility.</p>
        `,
        helpPopupSignature: "<strong>Last updated</strong>: August 30, 2024",
        explanation: {
            years: "<strong>Years:</strong> This represents each year from now (<em>t</em>) to some number of years (<div class='varvalue'>{value}</div>) in the future (<em>t+N</em>).",
            discount: "<strong>Discount Rate (α):</strong> This is a number between 0 and 1 that tells us how much less we value money in the future compared to money now. For example, if the discount rate is <div class='varvalue'>{value}</div>, it means we value money next year at <div class='varvalue'>{percentage}%</div> of what we value it this year.",
            economic_returns: "Returns",
            fine_avoidance: "<strong>Fine Avoidance:</strong> This is the amount that your company wants to avoid in fines per year. Use commas to separate your values.",
            intangible_value: "<strong>Intangible Aspect Value:</strong> This is the additional intangible benefit, such as positive media coverage, that you expect your company to receive. Use commas to separate your values.",
            capability_returns: "Returns",
            initial_investment: "<strong>Initial Investment:</strong> This is your company's initial investment amount: {value}.",
            investment_cost: "<strong>Investment Cost for Capabilities:</strong> This is the amount that the additional capabilities would cost per year. Use commas to separate your values.",
            explanation_of_results: `
                <h2>Explanation of Results</h2>
                <div class="enlargefont" style="--fontsize:18px;">
                    Your company plans to initially invest <span class="varvalue">{I_t} million</span> in AI ethics and governance to potentially
                    avoid <span class="varvalue">{fineAvoidanceValue} million</span> in fines over <span class="varvalue">{N}</span>, which has a present value of <span class="varvalue">{discountedValue} million</span> when discounted at a <span class="varvalue">{alpha}%</span> cost of capital.  
                    This results in a net return of <span class="varvalue">{netReturn} million</span> after the initial investment.
                    Additionally, the platform's intangible benefits, such as positive media coverage, are valued at <span class="varvalue">{intangibleValue} million</span>, with a discounted value of
                    <span class="varvalue">{discountedIntangibleReturn} million</span>.
                    The total return, including these intangibles, is <span class="varvalue">{totalReturn} million</span>, resulting in an ROI of <span class="varvalue">{finalROI}</span>.
                </div>
                <br/>
                <br/>
            `
        },
        // --- NEW KEYS ADDED ---
        roiInAIEthics: "ROI in AI Ethics",
        investments: "Investments",
        returns: "Returns",
        orgRevenuesLabel: "Organizational Revenue (in millions per year, comma-separated):",
        fineAvoidanceValueLabel: "Fine Avoidance Value (in % per year, comma-separated):",
        calcEconomicReturnsLabel: "Economic Return (in millions calculated as Revenue * Fine Avoidance %)",
        reputationalReturns: "Reputational Returns",
        returnsOnCapabilities: "Returns on Capabilities",
        calculateROI: "Calculate ROI"
        // --- END NEW KEYS ---
    };
