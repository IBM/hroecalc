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
 * the Notre Dame–IBM Technology Ethics Lab. The corresponding research paper 
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

const translationsData = {
    en: {
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
        economic: "Economic",
        intangible: "Reputational / Intangible",
        capabilities: "Capabilities",
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
            economic_returns: "<strong>Economic Returns:</strong> This is the money you expect to get back each year <em>j</em> from your investment. Use commas to separate your values.",
            fine_avoidance: "<strong>Fine Avoidance:</strong> This is the amount that your company wants to avoid in fines per year. Use commas to separate your values.",
            intangible_value: "<strong>Intangible Aspect Value:</strong> This is the additional intangible benefit, such as positive media coverage, that you expect your company to receive. Use commas to separate your values.",
            capability_returns: "<strong>Capability Returns:</strong> This is the benefit you get from new skills or capabilities you develop because of your investment. Each capability 𝑘 has its own return, and 𝛾<sub>𝑘</sub> is the fraction of the total investment allocated to that capability.",
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
        }
    },
    es: {
        title: "Calculadora del Marco HROE V0.8.6",
        hroeformula: "Fórmula HROE",
        readPaper: "Leer el documento",
        generatePDF: "Generar PDF",
        returnToCalculator: "Volver a la Calculadora",
        helpInformation: "Información de Ayuda",
        eraseForm: "Borrar Formulario",
        deleteDefault: "Eliminar Formulario Predeterminado",
        futureFeature: "<strong>--- CARACTERÍSTICA FUTURA ---</strong><br/>Configurar Fuentes de Entrada",
        firstExample: "Primer Ejemplo (discutido en el documento)",
        previousExample: "Ejemplo Anterior",
        nextExample: "Siguiente Ejemplo",
        lastExample: "Último Ejemplo",
        saveDefault: "Guardar Valores como Predeterminado",
        helpToolbar: "Ayuda con esta Barra de Herramientas",
        helpFormToolbar: `
<button onclick="closeToolbarHelp()"
    style="position:absolute; top: 2px; right: 2px; background: none; border: none; font-size: 16px; cursor: pointer;color:black;">
    <img src='icons/close--large.svg'>
</button>
<h2 style="padding-left:20px; background-color:white; border-bottom:1px solid #ccc; padding-bottom:0px;">
    Ayuda con la Barra de Herramientas del Formulario</h2>
<div style="max-height: 300px; overflow-y: scroll; font-size:18px; padding: 20px; padding-top:0px;background-color:#fefeff;">
    <p>La barra de herramientas sobre el formulario de entrada tiene varios botones que te ayudan a trabajar con los valores de entrada de la calculadora:</p>
    <div class="table">
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/help.svg" alt="Ayuda">
            </div>
            <div class="details-column">
                <p><strong>Ayuda con esta Barra de Herramientas</strong>: Muestra esta pantalla de ayuda.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/save.svg" alt="Guardar">
            </div>
            <div class="details-column">
                <p><strong>Guardar Valores como Predeterminados</strong>: Al presionar este botón, se guardan los valores actuales en los campos de entrada como el formulario predeterminado, que se carga automáticamente cada vez que se recarga la calculadora o se reinicia el navegador.</p>
                <p>Esta función almacena los valores del formulario en el almacenamiento local del navegador, lo que permite retener los datos incluso después de cerrar y volver a abrir el navegador. Puedes actualizar el formulario predeterminado en cualquier momento presionando el botón nuevamente. Al guardar, la barra de herramientas mostrará el mensaje "Formulario Predeterminado Guardado."</p>
                <p>Si se ha guardado un formulario predeterminado anteriormente, la barra de herramientas mostrará el mensaje "Formulario Predeterminado Cargado" cuando se recargue la calculadora.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/erase.svg" alt="Borrar">
            </div>
            <div class="details-column">
                <p><strong>Borrar Formulario</strong>: Al presionar este botón, se borra el formulario de entrada y se muestra el mensaje "--- FORMULARIO EN BLANCO ---" en la barra de herramientas. Ten en cuenta que si borras el formulario de entrada y luego guardas el formulario en blanco como el formulario predeterminado, la calculadora siempre aparecerá en blanco cuando se cargue la página, hasta que guardes un formulario diferente como predeterminado. Borrar el formulario no borra el formulario predeterminado.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/trash-can.svg" alt="Eliminar">
            </div>
            <div class="details-column">
                <p><strong>Eliminar Formulario Predeterminado</strong>: Esto elimina el almacenamiento local del navegador y, por lo tanto, el formulario predeterminado. Si presionas este botón y recargas la página web o vuelves a abrir el navegador, verás el siguiente mensaje, que también aparece la primera vez que usas la calculadora:</p>
                <div class="nolocalstorage"><img src="icons/nolocalstorage.jpg"></div>
                <p>El mensaje desaparece tan pronto como empiezas a usar el formulario o la barra de herramientas. Si más tarde guardas tu formulario como predeterminado, ya no verás este mensaje. Esto es cierto incluso si guardas un formulario en blanco como predeterminado. Eliminar el formulario predeterminado no borra el formulario.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                &nbsp;
            </div>
            <div class="details-column">
                <p><strong>Ejemplos y Controles de Navegación</strong>: La calculadora HROE viene precargada con 10 ejemplos para ayudarte a comprender mejor cómo funciona la fórmula HROE. Los controles de navegación de los ejemplos son estos:</p>
                <p><img src="icons/navcontrols.jpg"></p>
                <p>Navegar a un ejemplo llena el formulario de entrada con valores predefinidos y calcula automáticamente el HROE. La navegación es circular, por lo que si estás en el último ejemplo y haces clic en "Siguiente Ejemplo," te llevará de vuelta al primer ejemplo, que es el que se explica en el documento. Del mismo modo, si estás en el primer ejemplo y haces clic en "Ejemplo Anterior," te llevará al último ejemplo.</p>
                <p>Estos ejemplos se almacenan en el archivo <strong>hroe-examples.js</strong>, ubicado en el directorio <em>scripts</em>. Aquí está cómo se ve:</p>
                <p><img src="icons/hroe-examples.jpg" width="70%" height="70%"></p>
                <p>Puedes editar este archivo para agregar nuevos ejemplos, así como eliminar o modificar los existentes. Recuerda recargar la página para que los cambios surtan efecto.</p>
                <p>Si planeas modificar el archivo <strong>hroe-examples.js</strong>, te recomendamos encarecidamente hacer una copia de seguridad primero y mantener el ejemplo del documento como la primera entrada.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img src="icons/settings--edit.svg" alt="Configuraciones" class="icon svgimagedisabled">
            </div>
            <div class="details-column">
                <p><strong>FUNCIÓN FUTURA</strong>: Este botón deshabilitado es un marcador de posición para una función futura tentativa que permitiría configurar y conectar fuentes externas para llenar los diferentes campos de entrada.</p>
            </div>
        </div>
    </div>
    <div class="signature-box">
        <strong>Última actualización</strong>: 30 de agosto de 2024
    </div>`,
        yearsLabel: "Número de años (N):",
        capabilitiesLabel: "Número de opciones de capacidad (m):",
        discountLabel: "Costo de Capital (Tasa de Descuento):",
        economicReturnsLabel: "Retornos económicos en millones (separados por comas):",
        fineAvoidanceLabel: "Valor de evitación de multas en millones:",
        intangibleValueLabel: "Valor del aspecto intangible en millones:",
        capabilityReturnsLabel: "Retornos de capacidad en millones (separados por comas):",
        gammaLabel: "Gamma (fracciones de fondos, separadas por comas):",
        initialInvestmentLabel: "Inversión inicial en millones:",
        investmentCostLabel: "Costo de inversión adicional para capacidades en millones:",
        results: "Resultados",
        calculate: "Calcular HROE",
        economic: "Económico",
        intangible: "Reputacional / Intangible",
        capabilities: "Capacidades",
        hoverText: "",
        explanationPanelDefault: "El retorno de la inversión en iniciativas de ética y gobernanza en IA debe evaluarse integralmente. Esta calculadora ayuda a medir retornos cuantificables, pero también se deben incluir los impactos cualitativos y considerar a todas las partes interesadas y el efecto en la sociedad.",
        commaSeparatedEntry: 'entrada separada por comas',
        commaSeparatedEntries: 'entradas separadas por comas',
        extraComma: 'tiene una coma adicional',
        extraCommas: 'tiene comas adicionales',
        extraEntry: 'entrada',
        extraEntries: 'entradas',
        missing: 'le falta',
        missingPlural: 'tienen falta de',
        and: 'y',
        fieldListIntro: 'Dado que el número de años es',
        proceed: 'Aún puede continuar con el cálculo, pero tenga en cuenta que las entradas faltantes se establecerán en 0 para ese año.',
        ignore: 'Las entradas adicionales serán ignoradas.',
        warning: 'Tenga en cuenta lo siguiente:',
        chart: {
            economicReturns: "Retornos Económicos",
            intangibles: "Valores Intangibles",
            capabilityReturns: "Retornos de Capacidad",
            value: "Valores (en millones)",
            year: "Año"
        },
        helpPopupTitle: "Calculadora del Marco Holístico de Retorno en Ética (HROE)",
        helpPopupContent: `
        <p>Las organizaciones están motivadas para implementar prácticas éticas de IA por diversas razones. Por ejemplo, porque creen que es lo correcto o para evitar costos como demandas y multas. Puede usar esta calculadora para estimar sus posibles retornos sobre las inversiones en ética de IA y consultar el documento titulado, "El Retorno de la Inversión en Ética de IA: Un Marco Holístico" (<a href="#" onclick="togglePanel();">https://arxiv.org/pdf/2309.13057</a>) para una comprensión más profunda de los beneficios. El documento propone un enfoque integral para entender los retornos sobre las inversiones en ética de IA.</p>
        <p>El marco del Retorno Holístico en Ética (HROE) considera no solo los retornos económicos directos, sino también los beneficios intangibles relacionados con la reputación y las opciones reales conectadas a las capacidades organizativas. Este marco está diseñado para ayudar a las organizaciones a justificar sus inversiones en ética de IA demostrando cómo estas inversiones pueden llevar a ahorros de costos, generación de ingresos, mejoras en la percepción de los grupos de interés y mayores oportunidades futuras.</p>
        <p class="note-box"><strong>Nota</strong>: El retorno de las inversiones en iniciativas de ética y gobernanza de la IA debe evaluarse de manera holística. Aunque esta calculadora proporciona una herramienta útil para evaluar los retornos cuantificables, una evaluación holística también debe incluir retornos e impactos de naturaleza cualitativa. Es importante considerar un amplio conjunto de partes interesadas y el impacto en la sociedad en general durante el proceso de evaluación holística.</p>
        <br />
        <p>Las tecnologías de IA, aunque beneficiosas, plantean desafíos éticos significativos como el sesgo, la equidad y las preocupaciones sobre la privacidad. Abordar estos problemas requiere inversiones sustanciales, que las organizaciones a menudo encuentran difíciles de justificar sin pruebas claras de retorno sobre la inversión.</p>
        <p>El marco HROE aborda esta brecha integrando los impactos económicos, como los retornos financieros directos y la evitación de costos, con los impactos intangibles, como la mejora de la reputación y la confianza de los grupos de interés. Además, incluye opciones reales que ofrecen flexibilidad y adaptabilidad futuras. Este enfoque proporciona una visión integral de cómo las inversiones en ética de IA pueden contribuir al éxito y la sostenibilidad general de una organización, facilitando la justificación y el mantenimiento de estas iniciativas críticas.</p>
        <p>En línea con este enfoque holístico, este programa utiliza las fórmulas proporcionadas en el documento para calcular el ROI de las inversiones en ética de IA durante varios años. Este programa solicita a los usuarios que ingresen datos relacionados con los retornos económicos, los retornos reputacionales y los retornos de capacidad para cada año, así como el factor de descuento y los costos de inversión iniciales.</p>
        <p>Al incorporar estas variables, el programa calcula el HROE descontando los retornos futuros a su valor presente y sumando el total de los retornos de las inversiones económicas, reputacionales y de capacidad. Este enfoque a varios años permite a las organizaciones evaluar mejor los beneficios a largo plazo de sus inversiones en ética de IA, proporcionando una imagen más clara de cómo estas inversiones impactan en su rendimiento general y en su flexibilidad estratégica.</p>
    `,
        helpPopupSignature: "<strong>Última actualización</strong>: 30 de agosto de 2024",
        explanation: {
            years: "<strong>Años:</strong> Esto representa cada año desde ahora (<em>t</em>) hasta algún número de años (<div class='varvalue'>{value}</div>) en el futuro (<em>t+N</em>).",
            discount: "<strong>Tasa de Descuento (α):</strong> Este es un número entre 0 y 1 que nos indica cuánto menos valoramos el dinero en el futuro en comparación con el dinero en el presente. Por ejemplo, si la tasa de descuento es <div class='varvalue'>{value}</div>, significa que valoramos el dinero del próximo año en un <div class='varvalue'>{percentage}%</div> de lo que lo valoramos este año.",
            economic_returns: "<strong>Retornos Económicos:</strong> Este es el dinero que espera recuperar de su inversión en cada año <em>j</em>. Por ejemplo: {details}",
            fine_avoidance: "<strong>Evitar Multas:</strong> Esta es la cantidad (por ejemplo, <span class='varvalue'>{value} millones</span>) que su empresa quiere evitar en multas.",
            intangible_value: "<strong>Valor del Aspecto Intangible:</strong> Este es el beneficio intangible adicional, como la cobertura mediática positiva, que espera que reciba su empresa (por ejemplo, <span class='varvalue'>{value}</span>).",
            capability_returns: "<strong>Retornos de Capacidad:</strong> Este es el beneficio que obtiene de las nuevas habilidades o capacidades que desarrolla debido a su inversión. Cada capacidad 𝑘 tiene su propio retorno, y 𝛾<sub>𝑘</sub> es la fracción de la inversión total asignada a esa capacidad.",
            initial_investment: "<strong>Inversión Inicial:</strong> Esta es la cantidad de inversión inicial de su empresa: {value}.",
            investment_cost: "<strong>Costo de Inversión para Capacidades:</strong> Esta es la cantidad que costarían las capacidades adicionales: {value}.",
            explanation_of_results: `
                <h2>Explicación de los Resultados</h2>
                <div class="enlargefont" style="--fontsize:18px;">
                    Su empresa planea inicialmente invertir <span class="varvalue">{I_t} millones</span> en una plataforma de gestión de riesgos de IA para
                    evitar una multa de <span class="varvalue">{fineAvoidanceValue} millones</span>, que tiene un valor presente de <span class="varvalue">{discountedValue} millones</span> cuando se descuenta a una tasa de capital del <span class="varvalue">{alpha}%</span>.  
                    Esto resulta en un retorno neto de <span class="varvalue">{netReturn} millones</span> después de la inversión inicial.
                    Además, los beneficios intangibles de la plataforma, como la cobertura mediática positiva, están valorados en <span class="varvalue">{intangibleValue} millones</span>, con un valor descontado de
                    <span class="varvalue">{discountedIntangibleReturn} millones</span>.
                    El retorno total, incluidos estos intangibles, es de <span class="varvalue">{totalReturn} millones</span>.
                </div>
                <br/>
                <div class="enlargefont" style="--fontsize:18px;">
                    La plataforma de gestión de riesgos puede ahorrar alrededor de <span class="varvalue">{capabilityReturns} millones</span>, pero estas capacidades adicionales costarían un adicional de <span class="varvalue">{investmentCost} millones</span>.
                </div>
                <br/>
            `
        }
    },
    it: {
        title: "Calcolatore del Quadro HROE V0.8.6",
        hroeformula: "Formula HROE",
        readPaper: "Leggi il documento",
        generatePDF: "Genera PDF",
        returnToCalculator: "Torna alla Calcolatrice",
        helpInformation: "Informazioni di Aiuto",
        eraseForm: "Cancella Modulo",
        deleteDefault: "Elimina Modulo Predefinito",
        futureFeature: "<strong>--- FUNZIONE FUTURA ---</strong><br/>Configura le Fonti di Input",
        firstExample: "Primo Esempio (discusso nel documento)",
        previousExample: "Esempio Precedente",
        nextExample: "Prossimo Esempio",
        lastExample: "Ultimo Esempio",
        saveDefault: "Salva Valori come Predefiniti",
        helpToolbar: "Aiuto con Questa Barra degli Strumenti",
        helpFormToolbar: `
<button onclick="closeToolbarHelp()"
    style="position:absolute; top: 2px; right: 2px; background: none; border: none; font-size: 16px; cursor: pointer;color:black;">
    <img src='icons/close--large.svg'>
</button>
<h2 style="padding-left:20px; background-color:white; border-bottom:1px solid #ccc; padding-bottom:0px;">
    Guida alla Barra degli Strumenti del Modulo</h2>
<div style="max-height: 300px; overflow-y: scroll; font-size:18px; padding: 20px; padding-top:0px;background-color:#fefeff;">
    <p>La barra degli strumenti sopra il modulo di input ha diversi pulsanti che ti aiutano a lavorare con i valori di input della calcolatrice:</p>
    <div class="table">
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/help.svg" alt="Aiuto">
            </div>
            <div class="details-column">
                <p><strong>Aiuto con questa Barra degli Strumenti</strong>: Visualizza questa schermata di aiuto.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/save.svg" alt="Salva">
            </div>
            <div class="details-column">
                <p><strong>Salva Valori come Predefiniti</strong>: Premendo questo pulsante, i valori correnti nei campi di input vengono salvati come modulo predefinito, che viene caricato automaticamente ogni volta che la calcolatrice viene ricaricata o il browser viene riavviato.</p>
                <p>Questa funzione memorizza i valori del modulo nell'archiviazione locale del browser, il che consente di mantenere i dati anche dopo la chiusura e la riapertura del browser. Puoi aggiornare il modulo predefinito in qualsiasi momento premendo nuovamente il pulsante. Al momento del salvataggio, la barra degli strumenti mostrerà il messaggio "Modulo Predefinito Salvato."</p>
                <p>Se un modulo predefinito è stato precedentemente salvato, la barra degli strumenti mostrerà il messaggio "Modulo Predefinito Caricato" quando la calcolatrice viene ricaricata.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/erase.svg" alt="Cancella">
            </div>
            <div class="details-column">
                <p><strong>Cancella Modulo</strong>: Premendo questo pulsante, il modulo di input viene cancellato e nella barra degli strumenti viene visualizzato il messaggio "--- MODULO VUOTO ---". Tieni presente che se cancelli il modulo di input e poi salvi il modulo vuoto come modulo predefinito, la calcolatrice apparirà sempre vuota quando la pagina viene caricata, fino a quando non salvi un modulo diverso come predefinito. Cancellare il modulo non cancella il modulo predefinito.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/trash-can.svg" alt="Elimina">
            </div>
            <div class="details-column">
                <p><strong>Elimina Modulo Predefinito</strong>: Questo elimina l'archiviazione locale del browser e quindi il modulo predefinito. Se premi questo pulsante e ricarichi la pagina web o riapri il browser, vedrai il seguente messaggio, che appare anche la prima volta che usi la calcolatrice:</p>
                <div class="nolocalstorage"><img src="icons/nolocalstorage.jpg"></div>
                <p>Il messaggio scompare non appena inizi a usare il modulo o la barra degli strumenti. Se in seguito salvi il tuo modulo come predefinito, non vedrai più questo messaggio. Questo è vero anche se salvi un modulo vuoto come predefinito. Eliminare il modulo predefinito non cancella il modulo.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                &nbsp;
            </div>
            <div class="details-column">
                <p><strong>Esempi e Controlli di Navigazione</strong>: La calcolatrice HROE viene pre-caricata con 10 esempi per aiutarti a comprendere meglio come funziona la formula HROE. I controlli di navigazione degli esempi sono questi:</p>
                <p><img src="icons/navcontrols.jpg"></p>
                <p>Navigare verso un esempio riempie il modulo di input con valori predefiniti e calcola automaticamente l'HROE. La navigazione è circolare, quindi, se sei sull'ultimo esempio e fai clic su "Esempio Successivo", verrai riportato al primo esempio, che è quello spiegato nel documento. Allo stesso modo, se sei sul primo esempio e fai clic su "Esempio Precedente", verrai riportato all'ultimo esempio.</p>
                <p>Questi esempi sono memorizzati nel file <strong>hroe-examples.js</strong>, situato nella directory <em>scripts</em>. Ecco come appare:</p>
                <p><img src="icons/hroe-examples.jpg" width="70%" height="70%"></p>
                <p>Puoi modificare questo file per aggiungere nuovi esempi, nonché eliminare o modificare quelli esistenti. Ricorda di ricaricare la pagina affinché le modifiche abbiano effetto.</p>
                <p>Se intendi modificare il file <strong>hroe-examples.js</strong>, ti consigliamo vivamente di fare prima un backup e di mantenere l'esempio del documento come prima voce.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img src="icons/settings--edit.svg" alt="Impostazioni" class="icon svgimagedisabled">
            </div>
            <div class="details-column">
                <p><strong>FUNZIONE FUTURA</strong>: Questo pulsante disabilitato è un segnaposto per una funzione futura che potrebbe consentire di configurare e collegare fonti esterne per popolare i diversi campi di input.</p>
            </div>
        </div>
    </div>
    <div class="signature-box">
        <strong>Ultimo aggiornamento</strong>: 30 agosto 2024
    </div>`,
        yearsLabel: "Numero di anni (N):",
        capabilitiesLabel: "Numero di opzioni di capacità (m):",
        discountLabel: "Costo del Capitale (Tasso di Sconto):",
        economicReturnsLabel: "Rendimenti economici in milioni (separati da virgole):",
        fineAvoidanceLabel: "Valore di evitamento delle multe in milioni:",
        intangibleValueLabel: "Valore dell'aspetto intangibile in milioni:",
        capabilityReturnsLabel: "Rendimenti delle capacità in milioni (separati da virgole):",
        gammaLabel: "Gamma (frazioni di fondi, separate da virgole):",
        initialInvestmentLabel: "Investimento iniziale in milioni:",
        investmentCostLabel: "Costo di investimento aggiuntivo per capacità in milioni:",
        results: "Risultati",
        calculate: "Calcolare HROE",
        economic: "Economico",
        intangible: "Reputazionale / Intangibile",
        capabilities: "Capacità",
        hoverText: "",
        explanationPanelDefault: "Il ritorno sugli investimenti nelle iniziative di etica e governance dell'intelligenza artificiale dovrebbe essere valutato in modo olistico. Sebbene questo calcolatore fornisca uno strumento utile per valutare i ritorni quantificabili, una valutazione olistica dovrebbe includere anche i ritorni e gli impatti di natura qualitativa. È importante considerare un ampio insieme di portatori di interesse e l'impatto sulla società in generale durante il processo di valutazione olistica.",
        commaSeparatedEntry: 'voce separata da virgole',
        commaSeparatedEntries: 'voci separate da virgole',
        extraComma: 'ha una virgola in più',
        extraCommas: 'ha virgole in più',
        extraEntry: 'voce',
        extraEntries: 'voci',
        missing: 'manca',
        missingPlural: 'hanno mancante',
        and: 'e',
        fieldListIntro: 'Poiché il numero di anni è',
        proceed: 'È possibile procedere con il calcolo, ma si noti che le voci mancanti saranno impostate a 0 per quell\'anno.',
        ignore: 'Le voci in più saranno ignorate.',
        warning: 'Si prega di notare quanto segue:',
        chart: {
            economicReturns: "Rendimenti Economici",
            intangibles: "Valori Intangibili",
            capabilityReturns: "Rendimenti delle Capacità",
            value: "Valori (in milioni)",
            year: "Anno"
        },
        helpPopupTitle: "Calcolatore del Quadro di Ritorno Etico Olistico (HROE)",
        helpPopupContent: `
        <p>Le organizzazioni sono motivate a implementare pratiche di IA etiche per vari motivi. Ad esempio, perché credono che sia la cosa giusta da fare o per evitare costi come cause legali e multe. Puoi usare questa calcolatrice per stimare i tuoi potenziali ritorni sugli investimenti etici in IA e consultare il documento intitolato, "Il Ritorno sull'Investimento nell'Etica dell'IA: Un Quadro Olistico" (<a href="#" onclick="togglePanel();">https://arxiv.org/pdf/2309.13057</a>) per una comprensione più profonda dei benefici. Il documento propone un approccio completo per comprendere i ritorni sugli investimenti nell'etica dell'IA.</p>
        <p>Il quadro di Ritorno Etico Olistico (HROE) considera non solo i ritorni economici diretti ma anche i benefici intangibili legati alla reputazione e alle opzioni reali connesse alle capacità organizzative. Questo quadro è progettato per aiutare le organizzazioni a giustificare i loro investimenti nell'etica dell'IA dimostrando come questi investimenti possano portare a risparmi sui costi, generazione di entrate, miglioramento delle percezioni degli stakeholder e maggiori opportunità future.</p>
        <p class="note-box"><strong>Nota</strong>: Il ritorno sugli investimenti nelle iniziative di etica e governance dell'IA deve essere valutato in modo olistico. Sebbene questa calcolatrice fornisca uno strumento utile per valutare i ritorni quantificabili, una valutazione olistica dovrebbe includere anche ritorni e impatti di natura qualitativa. È importante considerare un ampio insieme di stakeholder e l'impatto sulla società nel suo complesso durante il processo di valutazione olistica.</p>
        <br />
        <p>Le tecnologie di IA, pur essendo benefiche, pongono sfide etiche significative come bias, equità e preoccupazioni sulla privacy. Affrontare questi problemi richiede investimenti sostanziali, che le organizzazioni spesso trovano difficili da giustificare senza prove chiare del ritorno sull'investimento.</p>
        <p>Il quadro HROE colma questa lacuna integrando gli impatti economici, come i ritorni finanziari diretti e l'evitamento dei costi, con gli impatti intangibili, come il miglioramento della reputazione e la fiducia degli stakeholder. Inoltre, include opzioni reali che offrono flessibilità e adattabilità future. Questo approccio fornisce una visione completa di come gli investimenti nell'etica dell'IA possano contribuire al successo e alla sostenibilità complessivi di un'organizzazione, rendendo più facile giustificare e sostenere queste iniziative critiche.</p>
        <p>In linea con questo approccio olistico, questo programma utilizza le formule fornite nel documento per calcolare il ROI degli investimenti in etica dell'IA su più anni. Questo programma richiede agli utenti di inserire dati relativi ai ritorni economici, ai ritorni reputazionali e ai ritorni sulle capacità per ciascun anno, nonché il fattore di sconto e i costi di investimento iniziali.</p>
        <p>Incorporando queste variabili, il programma calcola l'HROE scontando i ritorni futuri al loro valore attuale e sommando i ritorni totali degli investimenti economici, reputazionali e sulle capacità. Questo approccio pluriennale consente alle organizzazioni di valutare meglio i benefici a lungo termine dei loro investimenti in etica dell'IA, fornendo un quadro più chiaro di come questi investimenti influenzino le loro prestazioni complessive e la flessibilità strategica.</p>
    `,
        helpPopupSignature: "<strong>Ultimo aggiornamento</strong>: 30 agosto 2024",
        explanation: {
            years: "<strong>Anni:</strong> Questo rappresenta ogni anno da ora (<em>t</em>) a un certo numero di anni (<div class='varvalue'>{value}</div>) nel futuro (<em>t+N</em>).",
            discount: "<strong>Tasso di Sconto (α):</strong> Questo è un numero compreso tra 0 e 1 che ci indica quanto meno valorizziamo il denaro in futuro rispetto al denaro attuale. Ad esempio, se il tasso di sconto è <div class='varvalue'>{value}</div>, significa che valorizziamo il denaro del prossimo anno al <div class='varvalue'>{percentage}%</div> di quanto lo valorizziamo quest'anno.",
            economic_returns: "<strong>Rendimenti Economici:</strong> Questo è il denaro che ci si aspetta di recuperare dal proprio investimento in ogni anno <em>j</em>. Ad esempio: {details}",
            fine_avoidance: "<strong>Evitamento delle Multe:</strong> Questo è l'importo (ad esempio, <span class='varvalue'>{value} milioni</span>) che la tua azienda vuole evitare in multe.",
            intangible_value: "<strong>Valore dell'Aspetto Intangibile:</strong> Questo è il beneficio intangibile aggiuntivo, come la copertura mediatica positiva, che ci si aspetta che la tua azienda riceva (ad esempio, <span class='varvalue'>{value}</span>).",
            capability_returns: "<strong>Rendimenti delle Capacità:</strong> Questo è il vantaggio che si ottiene dalle nuove abilità o capacità sviluppate grazie al proprio investimento. Ogni capacità 𝑘 ha il suo rendimento, e 𝛾<sub>𝑘</sub> è la frazione dell'investimento totale assegnata a quella capacità.",
            initial_investment: "<strong>Investimento Iniziale:</strong> Questo è l'importo dell'investimento iniziale della tua azienda: {value}.",
            investment_cost: "<strong>Costo di Investimento per Capacità:</strong> Questo è l'importo che costerebbero le capacità aggiuntive: {value}.",
            explanation_of_results: `
                <h2>Spiegazione dei Risultati</h2>
                <div class="enlargefont" style="--fontsize:18px;">
                    La tua azienda prevede di investire inizialmente <span class="varvalue">{I_t} milioni</span> in una piattaforma di gestione dei rischi IA per
                    evitare una multa di <span class="varvalue">{fineAvoidanceValue} milioni</span>, che ha un valore attuale di <span class="varvalue">{discountedValue} milioni</span> quando scontato a un costo del capitale del <span class="varvalue">{alpha}%</span>.  
                    Questo si traduce in un rendimento netto di <span class="varvalue">{netReturn} milioni</span> dopo l'investimento iniziale.
                    Inoltre, i benefici intangibili della piattaforma, come la copertura mediatica positiva, sono valutati <span class="varvalue">{intangibleValue} milioni</span>, con un valore scontato di
                    <span class="varvalue">{discountedIntangibleReturn} milioni</span>.
                    Il rendimento totale, inclusi questi intangibili, è <span class="varvalue">{totalReturn} milioni</span>.
                </div>
                <br/>
                <div class="enlargefont" style="--fontsize:18px;">
                    La piattaforma di gestione dei rischi può far risparmiare circa <span class="varvalue">{capabilityReturns} milioni</span>, ma queste capacità aggiuntive costerebbero un ulteriore <span class="varvalue">{investmentCost} milioni</span>.
                </div>
                <br/>
            `
        }
    },
    fr: {
        title: "Calculateur de Cadre HROE V0.8.6",
        readPaper: "Lire le document",
        hroeformula: "Formule HROE",
        generatePDF: "Générer PDF",
        returnToCalculator: "Retourner à la Calculatrice",
        helpInformation: "Informations d'Aide",
        eraseForm: "Effacer le Formulaire",
        deleteDefault: "Supprimer le Formulaire Par Défaut",
        futureFeature: "<strong>--- FONCTION FUTURE ---</strong><br/>Configurer les Sources d'Entrée",
        firstExample: "Premier Exemple (discuté dans le document)",
        previousExample: "Exemple Précédent",
        nextExample: "Exemple Suivant",
        lastExample: "Dernier Exemple",
        saveDefault: "Enregistrer les Valeurs par Défaut",
        helpToolbar: "Aide pour Cette Barre d'Outils",
        helpFormToolbar: `
<button onclick="closeToolbarHelp()"
    style="position:absolute; top: 2px; right: 2px; background: none; border: none; font-size: 16px; cursor: pointer;color:black;">
    <img src='icons/close--large.svg'>
</button>
<h2 style="padding-left:20px; background-color:white; border-bottom:1px solid #ccc; padding-bottom:0px;">
    Aide de la Barre d'Outils du Formulaire</h2>
<div style="max-height: 300px; overflow-y: scroll; font-size:18px; padding: 20px; padding-top:0px;background-color:#fefeff;">
    <p>La barre d'outils au-dessus du formulaire de saisie contient plusieurs boutons qui vous aident à travailler avec les valeurs de saisie de la calculatrice:</p>
    <div class="table">
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/help.svg" alt="Aide">
            </div>
            <div class="details-column">
                <p><strong>Aide pour cette Barre d'Outils</strong>: Affiche cet écran d'aide.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/save.svg" alt="Sauvegarder">
            </div>
            <div class="details-column">
                <p><strong>Sauvegarder les Valeurs comme Défaut</strong>: En appuyant sur ce bouton, les valeurs actuelles des champs de saisie sont enregistrées comme formulaire par défaut, qui est automatiquement chargé chaque fois que la calculatrice est rechargée ou que le navigateur est redémarré.</p>
                <p>Cette fonction stocke les valeurs du formulaire dans le stockage local du navigateur, ce qui permet de conserver les données même après la fermeture et la réouverture du navigateur. Vous pouvez mettre à jour le formulaire par défaut à tout moment en appuyant de nouveau sur le bouton. Après l'enregistrement, la barre d'outils affichera le message "Formulaire Défaut Enregistré."</p>
                <p>Si un formulaire par défaut a été précédemment enregistré, la barre d'outils affichera le message "Formulaire Défaut Chargé" lorsque la calculatrice est rechargée.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/erase.svg" alt="Effacer">
            </div>
            <div class="details-column">
                <p><strong>Effacer le Formulaire</strong>: En appuyant sur ce bouton, le formulaire de saisie est effacé et le message "--- FORMULAIRE VIDE ---" s'affiche dans la barre d'outils. Notez que si vous effacez le formulaire de saisie, puis enregistrez le formulaire vide comme formulaire par défaut, la calculatrice apparaîtra toujours vide lorsque la page est chargée, jusqu'à ce que vous enregistriez un formulaire différent comme défaut. Effacer le formulaire ne supprime pas le formulaire par défaut.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/trash-can.svg" alt="Supprimer">
            </div>
            <div class="details-column">
                <p><strong>Supprimer le Formulaire par Défaut</strong>: Cela supprime le stockage local du navigateur et donc le formulaire par défaut. Si vous appuyez sur ce bouton et rechargez la page web ou rouvrez le navigateur, vous verrez le message suivant, qui apparaît également la première fois que vous utilisez la calculatrice:</p>
                <div class="nolocalstorage"><img src="icons/nolocalstorage.jpg"></div>
                <p>Le message disparaît dès que vous commencez à utiliser le formulaire ou la barre d'outils. Si vous enregistrez plus tard votre formulaire comme défaut, vous ne verrez plus ce message. C'est vrai même si vous enregistrez un formulaire vide comme défaut. Supprimer le formulaire par défaut ne supprime pas le formulaire.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                &nbsp;
            </div>
            <div class="details-column">
                <p><strong>Exemples et Contrôles de Navigation</strong>: La calculatrice HROE est préchargée avec 10 exemples pour vous aider à mieux comprendre le fonctionnement de la formule HROE. Les contrôles de navigation des exemples sont les suivants:</p>
                <p><img src="icons/navcontrols.jpg"></p>
                <p>Naviguer vers un exemple remplit le formulaire de saisie avec des valeurs prédéfinies et calcule automatiquement le HROE. La navigation est circulaire, donc si vous êtes sur le dernier exemple et que vous cliquez sur "Exemple Suivant", il vous ramènera au premier exemple, qui est celui expliqué dans le document. De même, si vous êtes sur le premier exemple et que vous cliquez sur "Exemple Précédent", il vous ramènera au dernier exemple.</p>
                <p>Ces exemples sont stockés dans le fichier <strong>hroe-examples.js</strong>, situé dans le répertoire <em>scripts</em>. Voici à quoi cela ressemble:</p>
                <p><img src="icons/hroe-examples.jpg" width="70%" height="70%"></p>
                <p>Vous pouvez modifier ce fichier pour ajouter de nouveaux exemples, ainsi que supprimer ou modifier ceux existants. N'oubliez pas de recharger la page pour que vos modifications prennent effet.</p>
                <p>Si vous prévoyez de modifier le fichier <strong>hroe-examples.js</strong>, nous vous recommandons fortement de faire d'abord une sauvegarde et de conserver l'exemple du document comme première entrée.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img src="icons/settings--edit.svg" alt="Paramètres" class="icon svgimagedisabled">
            </div>
            <div class="details-column">
                <p><strong>FONCTION FUTURE</strong>: Ce bouton désactivé est un espace réservé pour une fonction future qui permettrait de configurer et de se connecter à des sources externes pour remplir les différents champs de saisie.</p>
            </div>
        </div>
    </div>
    <div class="signature-box">
        <strong>Dernière mise à jour</strong>: 30 août 2024
    </div>`,
        yearsLabel: "Nombre d'années (N):",
        capabilitiesLabel: "Nombre d'options de capacité (m):",
        discountLabel: "Coût du Capital (Taux d'Actualisation):",
        economicReturnsLabel: "Rendements économiques en millions (séparés par des virgules):",
        fineAvoidanceLabel: "Valeur de l'évitement des amendes en millions:",
        intangibleValueLabel: "Valeur de l'aspect intangible en millions:",
        capabilityReturnsLabel: "Rendements des capacités en millions (séparés par des virgules):",
        gammaLabel: "Gamma (fractions de fonds, séparées par des virgules):",
        initialInvestmentLabel: "Investissement initial en millions:",
        investmentCostLabel: "Coût d'investissement supplémentaire pour les capacités en millions:",
        results: "Résultats",
        calculate: "Calculer HROE",
        economic: "Économique",
        intangible: "Réputationnel / Intangible",
        capabilities: "Capacités",
        hoverText: "",
        explanationPanelDefault: "Le retour sur investissement dans les initiatives d'éthique et de gouvernance de l'IA doit être évalué de manière holistique. Bien que cette calculatrice fournisse un outil utile pour évaluer les retours quantifiables, une évaluation holistique doit également inclure les retours et impacts de nature qualitative. Il est important de considérer un large ensemble de parties prenantes et l'impact sur la société dans son ensemble lors du processus d'évaluation holistique.",
        commaSeparatedEntry: 'entrée séparée par des virgules',
        commaSeparatedEntries: 'entrées séparées par des virgules',
        extraComma: 'a une virgule en trop',
        extraCommas: 'a des virgules en trop',
        extraEntry: 'entrée',
        extraEntries: 'entrées',
        missing: 'manque',
        missingPlural: 'ont manquant',
        and: 'et',
        fieldListIntro: 'Puisque le nombre d\'années est',
        proceed: 'Vous pouvez toujours procéder au calcul, mais notez que les entrées manquantes seront fixées à 0 pour cette année.',
        ignore: 'Les entrées supplémentaires seront ignorées.',
        warning: 'Veuillez noter ce qui suit:',
        chart: {
            economicReturns: "Rendements Économiques",
            intangibles: "Valeurs Intangibles",
            capabilityReturns: "Rendements des Capacités",
            value: "Valeurs (en millions)",
            year: "Année"
        },
        helpPopupTitle: "Calculateur du Cadre Holistique de Retour sur l'Éthique (HROE)",
        helpPopupContent: `
        <p>Les organisations sont motivées à mettre en œuvre des pratiques éthiques en IA pour diverses raisons. Par exemple, parce qu'elles croient que c'est la bonne chose à faire ou pour éviter des coûts tels que des poursuites judiciaires et des amendes. Vous pouvez utiliser cette calculatrice pour estimer vos retours potentiels sur les investissements en éthique de l'IA et consulter le document intitulé, "Le Retour sur Investissement dans l'Éthique de l'IA: Un Cadre Holistique" (<a href="#" onclick="togglePanel();">https://arxiv.org/pdf/2309.13057</a>) pour une compréhension plus approfondie des avantages. Le document propose une approche globale pour comprendre les retours sur les investissements en éthique de l'IA.</p>
        <p>Le cadre du Retour Holistique sur l'Éthique (HROE) considère non seulement les retours économiques directs, mais aussi les bénéfices intangibles liés à la réputation et aux options réelles associées aux capacités organisationnelles. Ce cadre est conçu pour aider les organisations à justifier leurs investissements en éthique de l'IA en démontrant comment ces investissements peuvent conduire à des économies de coûts, à la génération de revenus, à une amélioration des perceptions des parties prenantes et à de meilleures opportunités futures.</p>
        <p class="note-box"><strong>Remarque</strong>: Le retour sur les investissements dans les initiatives d'éthique et de gouvernance de l'IA doit être évalué de manière holistique. Bien que cette calculatrice fournisse un outil utile pour évaluer les retours quantifiables, une évaluation holistique devrait également inclure des retours et impacts de nature qualitative. Il est important de considérer un large éventail de parties prenantes et l'impact sur la société dans son ensemble lors du processus d'évaluation holistique.</p>
        <br />
        <p>Les technologies de l'IA, bien que bénéfiques, posent des défis éthiques importants tels que les biais, l'équité et les préoccupations en matière de confidentialité. Traiter ces problèmes nécessite des investissements substantiels, que les organisations trouvent souvent difficiles à justifier sans preuves claires de retour sur investissement.</p>
        <p>Le cadre HROE comble cette lacune en intégrant les impacts économiques, tels que les retours financiers directs et l'évitement des coûts, avec les impacts intangibles, comme l'amélioration de la réputation et la confiance des parties prenantes. En outre, il inclut des options réelles qui offrent une flexibilité et une adaptabilité futures. Cette approche offre une vision complète de la manière dont les investissements en éthique de l'IA peuvent contribuer au succès et à la durabilité globale d'une organisation, facilitant ainsi la justification et le maintien de ces initiatives critiques.</p>
        <p>Conformément à cette approche holistique, ce programme utilise les formules fournies dans le document pour calculer le ROI des investissements en éthique de l'IA sur plusieurs années. Ce programme demande aux utilisateurs de fournir des données relatives aux retours économiques, aux retours réputationnels et aux retours sur les capacités pour chaque année, ainsi que le facteur de réduction et les coûts d'investissement initiaux.</p>
        <p>En incorporant ces variables, le programme calcule l'HROE en actualisant les retours futurs à leur valeur présente et en additionnant les retours totaux des investissements économiques, réputationnels et en capacités. Cette approche sur plusieurs années permet aux organisations de mieux évaluer les avantages à long terme de leurs investissements en éthique de l'IA, en fournissant une image plus claire de la manière dont ces investissements influencent leurs performances globales et leur flexibilité stratégique.</p>
    `,
        helpPopupSignature: "<strong>Dernière mise à jour</strong>: 30 août 2024",
        explanation: {
            years: "<strong>Années:</strong> Cela représente chaque année à partir de maintenant (<em>t</em>) jusqu'à un certain nombre d'années (<div class='varvalue'>{value}</div>) dans le futur (<em>t+N</em>).",
            discount: "<strong>Taux d'Actualisation (α):</strong> C'est un nombre entre 0 et 1 qui nous indique à quel point nous valorisons moins l'argent à l'avenir par rapport à l'argent maintenant. Par exemple, si le taux d'actualisation est <div class='varvalue'>{value}</div>, cela signifie que nous valorisons l'argent l'année prochaine à <div class='varvalue'>{percentage}%</div> de ce que nous le valorisons cette année.",
            economic_returns: "<strong>Rendements Économiques:</strong> C'est l'argent que vous vous attendez à récupérer de votre investissement chaque année <em>j</em>. Par exemple: {details}",
            fine_avoidance: "<strong>Évitement des Amendes:</strong> C'est le montant (par exemple, <span class='varvalue'>{value} millions</span>) que votre entreprise souhaite éviter en amendes.",
            intangible_value: "<strong>Valeur de l'Aspet Intangible:</strong> C'est le bénéfice intangible supplémentaire, tel que la couverture médiatique positive, que vous attendez de votre entreprise (par exemple, <span class='varvalue'>{value}</span>).",
            capability_returns: "<strong>Rendements des Capacités:</strong> C'est le bénéfice que vous tirez des nouvelles compétences ou capacités que vous développez grâce à votre investissement. Chaque capacité 𝑘 a son propre rendement, et 𝛾<sub>𝑘</sub> est la fraction de l'investissement total alloué à cette capacité.",
            initial_investment: "<strong>Investissement Initial:</strong> C'est le montant de l'investissement initial de votre entreprise: {value}.",
            investment_cost: "<strong>Coût d'Investissement pour les Capacités:</strong> C'est le montant que coûteraient les capacités supplémentaires: {value}.",
            explanation_of_results: `
                <h2>Explication des Résultats</h2>
                <div class="enlargefont" style="--fontsize:18px;">
                    Votre entreprise prévoit d'investir initialement <span class="varvalue">{I_t} millions</span> dans une plateforme de gestion des risques IA pour
                    éviter une amende de <span class="varvalue">{fineAvoidanceValue} millions</span>, qui a une valeur actuelle de <span class="varvalue">{discountedValue} millions</span> lorsqu'elle est actualisée à un coût du capital de <span class="varvalue">{alpha}%</span>.  
                    Cela se traduit par un rendement net de <span class="varvalue">{netReturn} millions</span> après l'investissement initial.
                    De plus, les avantages intangibles de la plateforme, tels qu'une couverture médiatique positive, sont évalués <span class="varvalue">{intangibleValue} millions</span>, avec une valeur actualisée de
                    <span class="varvalue">{discountedIntangibleReturn} millions</span>.
                    Le rendement total, y compris ces intangibles, est de <span class="varvalue">{totalReturn} millions</span>.
                </div>
                <br/>
                <div class="enlargefont" style="--fontsize:18px;">
                    La plateforme de gestion des risques peut économiser environ <span class="varvalue">{capabilityReturns} millions</span>, mais ces capacités supplémentaires coûteraient un supplément de <span class="varvalue">{investmentCost} millions</span>.
                </div>
                <br/>
            `
        }
    },
    de: {
        title: "HROE Rahmenrechner V0.8.6",
        hroeformula: "HROE-Formel",
        readPaper: "Dokument lesen",
        generatePDF: "PDF Erstellen",
        returnToCalculator: "Zurück zum Rechner",
        helpInformation: "Hilfeinformationen",
        eraseForm: "Formular Löschen",
        deleteDefault: "Standardformular Löschen",
        futureFeature: "<strong>--- ZUKÜNFTIGE FUNKTION ---</strong><br/>Eingabequellen Konfigurieren",
        firstExample: "Erstes Beispiel (im Dokument besprochen)",
        previousExample: "Vorheriges Beispiel",
        nextExample: "Nächstes Beispiel",
        lastExample: "Letztes Beispiel",
        saveDefault: "Werte als Standard Speichern",
        helpToolbar: "Hilfe für Diese Symbolleiste",
        helpFormToolbar: `
<button onclick="closeToolbarHelp()"
    style="position:absolute; top: 2px; right: 2px; background: none; border: none; font-size: 16px; cursor: pointer;color:black;">
    <img src='icons/close--large.svg'>
</button>
<h2 style="padding-left:20px; background-color:white; border-bottom:1px solid #ccc; padding-bottom:0px;">
    Hilfe zur Formular-Werkzeugleiste</h2>
<div style="max-height: 300px; overflow-y: scroll; font-size:18px; padding: 20px; padding-top:0px;background-color:#fefeff;">
    <p>Die Werkzeugleiste über dem Eingabeformular enthält mehrere Schaltflächen, die Ihnen helfen, mit den Eingabewerten des Rechners zu arbeiten:</p>
    <div class="table">
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/help.svg" alt="Hilfe">
            </div>
            <div class="details-column">
                <p><strong>Hilfe zu dieser Werkzeugleiste</strong>: Ruft diesen Hilfebildschirm auf.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/save.svg" alt="Speichern">
            </div>
            <div class="details-column">
                <p><strong>Werte als Standard Speichern</strong>: Durch Drücken dieser Schaltfläche werden die aktuellen Werte in den Eingabefeldern als Standardformular gespeichert, das automatisch geladen wird, wann immer der Rechner neu geladen oder der Browser neu gestartet wird.</p>
                <p>Diese Funktion speichert die Werte des Formulars im lokalen Speicher des Browsers, wodurch die Daten auch nach dem Schließen und erneuten Öffnen des Browsers erhalten bleiben. Sie können das Standardformular jederzeit aktualisieren, indem Sie die Schaltfläche erneut drücken. Beim Speichern zeigt die Werkzeugleiste die Nachricht "Standardformular Gespeichert" an.</p>
                <p>Wenn ein Standardformular zuvor gespeichert wurde, zeigt die Werkzeugleiste die Nachricht "Standardformular Geladen" an, wenn der Rechner neu geladen wird.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/erase.svg" alt="Löschen">
            </div>
            <div class="details-column">
                <p><strong>Formular Löschen</strong>: Durch Drücken dieser Schaltfläche wird das Eingabeformular gelöscht und in der Werkzeugleiste die Nachricht "--- LEERES FORMULAR ---" angezeigt. Beachten Sie, dass, wenn Sie das Eingabeformular löschen und dann das leere Formular als Standardformular speichern, der Rechner immer leer erscheint, wenn die Seite geladen wird, bis Sie ein anderes Formular als Standard speichern. Das Löschen des Formulars löscht nicht das Standardformular.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/trash-can.svg" alt="Papierkorb">
            </div>
            <div class="details-column">
                <p><strong>Standardformular Löschen</strong>: Dadurch wird der lokale Speicher des Browsers und somit das Standardformular gelöscht. Wenn Sie diese Schaltfläche drücken und die Webseite neu laden oder den Browser neu öffnen, sehen Sie die folgende Nachricht, die auch beim ersten Mal angezeigt wird, wenn Sie den Rechner verwenden:</p>
                <div class="nolocalstorage"><img src="icons/nolocalstorage.jpg"></div>
                <p>Die Nachricht verschwindet, sobald Sie das Formular oder die Werkzeugleiste verwenden. Wenn Sie Ihr Formular später als Standard speichern, sehen Sie diese Nachricht nicht mehr. Dies gilt auch, wenn Sie ein leeres Formular als Standard speichern. Das Löschen des Standardformulars löscht nicht das Formular.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                &nbsp;
            </div>
            <div class="details-column">
                <p><strong>Beispiele und Navigationssteuerung</strong>: Der HROE-Rechner wird mit 10 Beispielen vorinstalliert, die Ihnen helfen sollen, besser zu verstehen, wie die HROE-Formel funktioniert. Die Navigationssteuerung der Beispiele ist wie folgt:</p>
                <p><img src="icons/navcontrols.jpg"></p>
                <p>Wenn Sie zu einem Beispiel navigieren, wird das Eingabeformular mit vordefinierten Werten ausgefüllt und das HROE wird automatisch berechnet. Die Navigation erfolgt im Kreis, sodass Sie, wenn Sie sich im letzten Beispiel befinden und auf "Nächstes Beispiel" klicken, zum ersten Beispiel zurückgeführt werden, das im Dokument erläutert wird. Ebenso, wenn Sie sich im ersten Beispiel befinden und auf "Vorheriges Beispiel" klicken, gelangen Sie zum letzten Beispiel.</p>
                <p>Diese Beispiele werden in der Datei <strong>hroe-examples.js</strong> gespeichert, die sich im <em>scripts</em>-Verzeichnis befindet. So sieht es aus:</p>
                <p><img src="icons/hroe-examples.jpg" width="70%" height="70%"></p>
                <p>Sie können diese Datei bearbeiten, um neue Beispiele hinzuzufügen, sowie vorhandene Beispiele zu löschen oder zu ändern. Denken Sie daran, die Seite neu zu laden, damit Ihre Änderungen wirksam werden.</p>
                <p>Wenn Sie planen, die Datei <strong>hroe-examples.js</strong> zu ändern, empfehlen wir dringend, zuerst eine Sicherungskopie zu erstellen und das Beispiel aus dem Dokument als ersten Eintrag beizubehalten.</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img src="icons/settings--edit.svg" alt="Einstellungen" class="icon svgimagedisabled">
            </div>
            <div class="details-column">
                <p><strong>ZUKÜNFTIGE FUNKTION</strong>: Diese deaktivierte Schaltfläche ist ein Platzhalter für eine zukünftige Funktion, die es ermöglicht, externe Quellen zu konfigurieren und zu verbinden, um die verschiedenen Eingabefelder zu füllen.</p>
            </div>
        </div>
    </div>
    <div class="signature-box">
        <strong>Zuletzt aktualisiert</strong>: 30. August 2024
    </div>`,
        yearsLabel: "Anzahl der Jahre (N):",
        capabilitiesLabel: "Anzahl der Fähigkeitsoptionen (m):",
        discountLabel: "Kapitalrendite (Abzinsungssatz):",
        economicReturnsLabel: "Wirtschaftliche Renditen in Millionen (kommagetrennt):",
        fineAvoidanceLabel: "Vermeidungswert der Strafen in Millionen:",
        intangibleValueLabel: "Wert des immateriellen Aspekts in Millionen:",
        capabilityReturnsLabel: "Fähigkeitsrenditen in Millionen (kommagetrennt):",
        gammaLabel: "Gamma (Anteile der Mittel, kommagetrennt):",
        initialInvestmentLabel: "Anfangsinvestition in Millionen:",
        investmentCostLabel: "Zusätzliche Investitionskosten für Fähigkeiten in Millionen:",
        results: "Ergebnisse",
        calculate: "HROE berechnen",
        economic: "Wirtschaftlich",
        intangible: "Reputativ / Immateriell",
        capabilities: "Fähigkeiten",
        hoverText: "",
        explanationPanelDefault: "Die Rendite von Investitionen in KI-Ethik und -Governance sollte ganzheitlich bewertet werden. Dieser Rechner hilft, quantifizierbare Renditen zu bewerten, aber auch qualitative Renditen und Auswirkungen sowie die Einbeziehung aller Interessengruppen und der Gesellschaft sind wichtig.",
        commaSeparatedEntry: 'kommagetrennte Eingabe',
        commaSeparatedEntries: 'kommagetrennte Eingaben',
        extraComma: 'hat ein zusätzliches Komma',
        extraCommas: 'hat zusätzliche Kommas',
        extraEntry: 'Eingabe',
        extraEntries: 'Eingaben',
        missing: 'fehlt',
        missingPlural: 'haben fehlend',
        and: 'und',
        fieldListIntro: 'Da die Anzahl der Jahre ist',
        proceed: 'Sie können die Berechnung fortsetzen, beachten Sie jedoch, dass fehlende Einträge für dieses Jahr auf 0 gesetzt werden.',
        ignore: 'Zusätzliche Einträge werden ignoriert.',
        warning: 'Bitte beachten Sie folgendes:',
        chart: {
            economicReturns: "Wirtschaftliche Erträge",
            intangibles: "Immaterielle Werte",
            capabilityReturns: "Fähigkeitsrenditen",
            value: "Werte (in Millionen)",
            year: "Jahr"
        },
        helpPopupTitle: "Berechnungsprogramm des Ganzheitlichen Return on Ethics (HROE) Frameworks",
        helpPopupContent: `
        <p>Organisationen sind aus verschiedenen Gründen motiviert, ethische KI-Praktiken umzusetzen. Zum Beispiel, weil sie glauben, dass es das Richtige ist, oder um Kosten wie Klagen und Geldstrafen zu vermeiden. Sie können diesen Rechner verwenden, um Ihre potenziellen Erträge aus Investitionen in die KI-Ethik zu schätzen, und den Artikel mit dem Titel "Der Return on Investment in der KI-Ethik: Ein Ganzheitliches Rahmenwerk" (<a href="#" onclick="togglePanel();">https://arxiv.org/pdf/2309.13057</a>) konsultieren, um ein tieferes Verständnis der Vorteile zu erlangen. Der Artikel schlägt einen umfassenden Ansatz zur Bewertung der Erträge aus Investitionen in die KI-Ethik vor.</p>
        <p>Das Ganzheitliche Return on Ethics (HROE) Framework berücksichtigt nicht nur direkte wirtschaftliche Erträge, sondern auch immaterielle Vorteile im Zusammenhang mit der Reputation und den realen Optionen, die mit den organisatorischen Fähigkeiten verbunden sind. Dieses Framework wurde entwickelt, um Organisationen dabei zu helfen, ihre Investitionen in die KI-Ethik zu rechtfertigen, indem es zeigt, wie diese Investitionen zu Kosteneinsparungen, Umsatzsteigerungen, verbesserten Stakeholder-Wahrnehmungen und verbesserten zukünftigen Chancen führen können.</p>
        <p class="note-box"><strong>Hinweis</strong>: Der Return on Investment in Initiativen zur KI-Ethik und -Governance sollte ganzheitlich bewertet werden. Obwohl dieser Rechner ein hilfreiches Werkzeug zur Bewertung quantifizierbarer Erträge bietet, sollte eine ganzheitliche Bewertung auch Erträge und Auswirkungen umfassen, die qualitativer Natur sind. Es ist wichtig, ein breites Spektrum von Stakeholdern und die Auswirkungen auf die Gesellschaft als Ganzes während des ganzheitlichen Bewertungsprozesses zu berücksichtigen.</p>
        <br />
        <p>KI-Technologien sind zwar vorteilhaft, stellen jedoch erhebliche ethische Herausforderungen wie Vorurteile, Fairness und Datenschutz dar. Die Bewältigung dieser Probleme erfordert erhebliche Investitionen, die Organisationen häufig schwer zu rechtfertigen finden, wenn keine klaren Beweise für den Return on Investment vorliegen.</p>
        <p>Das HROE Framework schließt diese Lücke, indem es wirtschaftliche Auswirkungen, wie direkte finanzielle Erträge und Kostenvermeidung, mit immateriellen Auswirkungen, wie verbesserter Reputation und Vertrauen der Stakeholder, integriert. Darüber hinaus umfasst es reale Optionen, die zukünftige Flexibilität und Anpassungsfähigkeit bieten. Dieser Ansatz bietet einen umfassenden Überblick darüber, wie Investitionen in die KI-Ethik zum Gesamterfolg und zur Nachhaltigkeit einer Organisation beitragen können, was es erleichtert, diese kritischen Initiativen zu rechtfertigen und aufrechtzuerhalten.</p>
        <p>Im Einklang mit diesem ganzheitlichen Ansatz verwendet dieses Programm die im Artikel bereitgestellten Formeln, um den ROI von Investitionen in die KI-Ethik über mehrere Jahre zu berechnen. Dieses Programm fordert die Benutzer auf, Eingaben zu wirtschaftlichen Erträgen, Reputationsgewinnen und Erträgen aus Fähigkeiten für jedes Jahr sowie zum Diskontfaktor und zu den anfänglichen Investitionskosten zu machen.</p>
        <p>Durch die Einbeziehung dieser Variablen berechnet das Programm das HROE, indem es zukünftige Erträge auf ihren Barwert abzinst und die gesamten Erträge aus wirtschaftlichen, reputationsbezogenen und fähigkeitsbezogenen Investitionen zusammenfasst. Dieser mehrjährige Ansatz ermöglicht es Organisationen, die langfristigen Vorteile ihrer Investitionen in die KI-Ethik besser zu bewerten und ein klareres Bild davon zu erhalten, wie sich diese Investitionen auf ihre Gesamtleistung und strategische Flexibilität auswirken.</p>
    `,
        helpPopupSignature: "<strong>Zuletzt aktualisiert</strong>: 30. August 2024",
        explanation: {
            years: "<strong>Jahre:</strong> Dies stellt jedes Jahr ab jetzt (<em>t</em>) bis zu einer bestimmten Anzahl von Jahren (<div class='varvalue'>{value}</div>) in der Zukunft (<em>t+N</em>) dar.",
            discount: "<strong>Abzinsungssatz (α):</strong> Dies ist eine Zahl zwischen 0 und 1, die uns angibt, wie viel weniger wir Geld in der Zukunft im Vergleich zu Geld jetzt bewerten. Wenn der Abzinsungssatz beispielsweise <div class='varvalue'>{value}</div> beträgt, bedeutet dies, dass wir Geld im nächsten Jahr zu <div class='varvalue'>{percentage}%</div> dessen bewerten, was wir es in diesem Jahr bewerten.",
            economic_returns: "<strong>Wirtschaftliche Renditen:</strong> Dies ist das Geld, das Sie von Ihrer Investition in jedem Jahr <em>j</em> zurückerwarten. Zum Beispiel: {details}",
            fine_avoidance: "<strong>Vermeidungswert der Strafen:</strong> Dies ist der Betrag (z. B. <span class='varvalue'>{value} Millionen</span>), den Ihr Unternehmen vermeiden möchte, an Strafen zu zahlen.",
            intangible_value: "<strong>Wert des immateriellen Aspekts:</strong> Dies ist der zusätzliche immaterielle Nutzen, wie z. B. eine positive Medienberichterstattung, den Sie von Ihrem Unternehmen erwarten (z. B. <span class='varvalue'>{value}</span>).",
            capability_returns: "<strong>Fähigkeitsrenditen:</strong> Dies ist der Vorteil, den Sie aus den neuen Fähigkeiten oder Kompetenzen ziehen, die Sie durch Ihre Investition entwickeln. Jede Fähigkeit 𝑘 hat ihre eigene Rendite, und 𝛾<sub>𝑘</sub> ist der Anteil der gesamten Investition, der dieser Fähigkeit zugewiesen wird.",
            initial_investment: "<strong>Anfangsinvestition:</strong> Dies ist der Betrag der Anfangsinvestition Ihres Unternehmens: {value}.",
            investment_cost: "<strong>Zusätzliche Investitionskosten für Fähigkeiten:</strong> Dies ist der Betrag, den die zusätzlichen Fähigkeiten kosten würden: {value}.",
            explanation_of_results: `
                <h2>Erklärung der Ergebnisse</h2>
                <div class="enlargefont" style="--fontsize:18px;">
                    Ihr Unternehmen plant, anfänglich <span class="varvalue">{I_t} Millionen</span> in eine KI-Risikomanagementplattform zu investieren, um
                    eine Strafe von <span class="varvalue">{fineAvoidanceValue} Millionen</span> zu vermeiden, die einen Barwert von <span class="varvalue">{discountedValue} Millionen</span> hat, wenn sie zu einem Kapitalkostensatz von <span class="varvalue">{alpha}%</span> abgezinst wird.  
                    Dies führt nach der Anfangsinvestition zu einem Nettorendite von <span class="varvalue">{netReturn} Millionen</span>.
                    Darüber hinaus werden die immateriellen Vorteile der Plattform, wie z. B. eine positive Medienberichterstattung, auf <span class="varvalue">{intangibleValue} Millionen</span> geschätzt, mit einem abgezins ten Wert von
                    <span class="varvalue">{discountedIntangibleReturn} Millionen</span>.
                    Die Gesamtrendite, einschließlich dieser immateriellen Vermögenswerte, beträgt <span class="varvalue">{totalReturn} Millionen</span>.
                </div>
                <br/>
                <div class="enlargefont" style="--fontsize:18px;">
                    Die Risikomanagementplattform kann etwa <span class="varvalue">{capabilityReturns} Millionen</span> sparen, aber diese zusätzlichen Fähigkeiten würden zusätzliche Kosten von <span class="varvalue">{investmentCost} Millionen</span> verursachen.
                </div>
                <br/>
            `
        }
    },
    zh: {
        title: "HROE 框架计算器 V0.8.6",
        hroeformula: "HROE 公式",
        readPaper: "阅读文件",
        generatePDF: "生成 PDF",
        returnToCalculator: "返回计算器",
        helpInformation: "帮助信息",
        eraseForm: "清除表单",
        deleteDefault: "删除默认表单",
        futureFeature: "<strong>--- 未来功能 ---</strong><br/>配置输入源",
        firstExample: "第一个示例（在论文中讨论）",
        previousExample: "上一个示例",
        nextExample: "下一个示例",
        lastExample: "最后一个示例",
        saveDefault: "将值保存为默认值",
        helpToolbar: "此工具栏的帮助",
        helpFormToolbar: `
<button onclick="closeToolbarHelp()"
    style="position:absolute; top: 2px; right: 2px; background: none; border: none; font-size: 16px; cursor: pointer;color:black;">
    <img src='icons/close--large.svg'>
</button>
<h2 style="padding-left:20px; background-color:white; border-bottom:1px solid #ccc; padding-bottom:0px;">
    表单工具栏帮助</h2>
<div style="max-height: 300px; overflow-y: scroll; font-size:18px; padding: 20px; padding-top:0px;background-color:#fefeff;">
    <p>输入表单上方的工具栏有几个按钮，可以帮助您处理计算器的输入值：</p>
    <div class="table">
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/help.svg" alt="帮助">
            </div>
            <div class="details-column">
                <p><strong>工具栏帮助</strong>：显示此帮助屏幕。</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/save.svg" alt="保存">
            </div>
            <div class="details-column">
                <p><strong>保存值为默认值</strong>：按下此按钮将当前输入字段中的值保存为默认表单，每当重新加载计算器或重新启动浏览器时，默认表单会自动加载。</p>
                <p>此功能将表单的值存储在浏览器的本地存储中，即使关闭并重新打开浏览器，数据也能保留。您可以随时按下按钮再次更新默认表单。保存时，工具栏会显示“已保存默认表单”消息。</p>
                <p>如果之前已保存过默认表单，则在重新加载计算器时，工具栏将显示“已加载默认表单”消息。</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/erase.svg" alt="清除">
            </div>
            <div class="details-column">
                <p><strong>清除表单</strong>：按下此按钮将清除输入表单，并在工具栏中显示“--- 空白表单 ---”消息。请注意，如果您清除输入表单，然后将空白表单保存为默认表单，则每次加载页面时，计算器都会显示空白表单，直到您保存不同的默认表单。清除表单不会清除默认表单。</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/trash-can.svg" alt="删除">
            </div>
            <div class="details-column">
                <p><strong>删除默认表单</strong>：这将删除浏览器的本地存储，因此删除默认表单。如果您按下此按钮并重新加载网页或重新打开浏览器，您将看到以下消息，该消息也会在您第一次使用计算器时显示：</p>
                <div class="nolocalstorage"><img src="icons/nolocalstorage.jpg"></div>
                <p>一旦您开始使用表单或工具栏，消息将消失。如果您稍后将表单保存为默认表单，则不会再看到此消息。即使您将空白表单保存为默认表单也是如此。删除默认表单不会清除表单。</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                &nbsp;
            </div>
            <div class="details-column">
                <p><strong>示例和导航控件</strong>：HROE计算器预加载了10个示例，帮助您更好地理解HROE公式的工作原理。示例导航控件如下：</p>
                <p><img src="icons/navcontrols.jpg"></p>
                <p>导航到一个示例会用预定义的值填充输入表单，并自动计算HROE。导航是循环的，因此，如果您处于最后一个示例并点击“下一个示例”，它将带您回到第一个示例，即文中解释的示例。同样，如果您在第一个示例上点击“上一个示例”，它将带您到最后一个示例。</p>
                <p>这些示例存储在<strong>hroe-examples.js</strong>文件中，位于<em>scripts</em>目录中。它看起来是这样的：</p>
                <p><img src="icons/hroe-examples.jpg" width="70%" height="70%"></p>
                <p>您可以编辑此文件以添加新示例，以及删除或修改现有示例。请记住重新加载页面以使更改生效。</p>
                <p>如果您打算修改<strong>hroe-examples.js</strong>文件，我们强烈建议首先进行备份，并将文中的示例作为第一个条目。</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img src="icons/settings--edit.svg" alt="设置" class="icon svgimagedisabled">
            </div>
            <div class="details-column">
                <p><strong>未来功能</strong>：此禁用按钮是未来可能功能的占位符，该功能将允许您配置并连接到外部源以填充不同的输入字段。</p>
            </div>
        </div>
    </div>
    <div class="signature-box">
        <strong>最后更新</strong>：2024年8月30日
    </div>`,
        yearsLabel: "年份数 (N):",
        capabilitiesLabel: "能力选项的数量 (m):",
        discountLabel: "资本成本 (折现率):",
        economicReturnsLabel: "经济回报 (以百万为单位, 用逗号分隔):",
        fineAvoidanceLabel: "避免罚款的价值 (以百万为单位):",
        intangibleValueLabel: "无形资产价值 (以百万为单位):",
        capabilityReturnsLabel: "能力回报 (以百万为单位, 用逗号分隔):",
        gammaLabel: "伽玛 (资金份额, 用逗号分隔):",
        initialInvestmentLabel: "初始投资 (以百万为单位):",
        investmentCostLabel: "额外投资成本 (以百万为单位):",
        results: "结果",
        calculate: "计算 HROE",
        economic: "经济",
        intangible: "声誉 / 无形",
        capabilities: "能力",
        hoverText: "",
        explanationPanelDefault: "对人工智能伦理和治理倡议的投资回报应从整体上进行评估。虽然这个计算器提供了一个评估可量化回报的有用工具，但整体评估还应包括定性方面的回报和影响。在整体评估过程中，重要的是要考虑广泛的利益相关者以及对整个社会的影响。",
        commaSeparatedEntry: '逗号分隔的条目',
        commaSeparatedEntries: '逗号分隔的条目',
        extraComma: '有多余的逗号',
        extraCommas: '有多个多余的逗号',
        extraEntry: '条目',
        extraEntries: '条目',
        missing: '缺少',
        missingPlural: '缺少',
        and: '和',
        fieldListIntro: '由于年份数为',
        proceed: '您仍然可以继续计算，但请注意，缺少的条目将为该年设置为0。',
        ignore: '多余的条目将被忽略。',
        warning: '请注意以下事项:',
        chart: {
            economicReturns: "经济回报",
            intangibles: "无形价值",
            capabilityReturns: "能力回报",
            value: "价值（以百万计）",
            year: "年"
        },
        helpPopupTitle: "伦理回报（HROE）框架计算器",
        helpPopupContent: `
        <p>组织因各种原因而被激励实施伦理AI实践。例如，因为他们认为这是正确的做法，或者为了避免诉讼和罚款等成本。您可以使用此计算器来估算您在AI伦理方面的投资回报，并参考题为"AI伦理投资回报：一个整体框架"的论文(<a href="#" onclick="togglePanel();">https://arxiv.org/pdf/2309.13057</a>)以更深入地了解这些收益。该论文提出了一个全面理解AI伦理投资回报的方法。</p>
        <p>伦理回报（HROE）框架不仅考虑直接的经济回报，还包括与声誉相关的无形利益以及与组织能力相关的真实选择。该框架旨在帮助组织证明其在AI伦理方面的投资，通过展示这些投资如何带来成本节约、收入增长、改善利益相关者的看法以及增强未来机会来证明其合理性。</p>
        <p class="note-box"><strong>注意</strong>：AI伦理和治理计划的投资回报应从整体上进行评估。尽管此计算器提供了一个有助于评估可量化回报的工具，但整体评估还应包括定性性质的回报和影响。在整体评估过程中，重要的是要考虑广泛的利益相关者以及对整个社会的影响。</p>
        <br />
        <p>尽管AI技术带来了许多好处，但它们也带来了重大伦理挑战，如偏见、公平性和隐私问题。解决这些问题需要大量投资，组织往往难以在没有明确投资回报证据的情况下证明这些投资的合理性。</p>
        <p>伦理回报（HROE）框架通过整合经济影响（如直接财务回报和成本避免）与无形影响（如声誉改善和利益相关者信任）来填补这一空白。此外，它还包括提供未来灵活性和适应性的真实选择。该方法为AI伦理投资如何推动组织整体成功和可持续性提供了全面视角，使这些关键计划的证明和维持变得更加容易。</p>
        <p>根据这种整体方法，本程序使用论文中提供的公式来计算多年来AI伦理投资的ROI。该程序提示用户输入与每年的经济回报、声誉回报和能力回报相关的输入，以及折扣因素和初始投资成本。</p>
        <p>通过整合这些变量，该程序通过将未来回报折现至现值并汇总经济、声誉和能力投资的总回报来计算HROE。这种多年期方法使组织能够更好地评估其AI伦理投资的长期收益，并更清楚地了解这些投资如何影响其整体绩效和战略灵活性。</p>
    `,
        helpPopupSignature: "<strong>最后更新</strong>：2024年8月30日",
        explanation: {
            years: "<strong>年:</strong> 这表示从现在 (<em>t</em>) 开始到未来某个年数 (<div class='varvalue'>{value}</div>) (<em>t+N</em>) 的每一年。",
            discount: "<strong>折现率 (α):</strong> 这是一个介于 0 和 1 之间的数字，告诉我们与现在的钱相比，我们对未来的钱有多不看重。例如，如果折现率是 <div class='varvalue'>{value}</div>，这意味着我们将明年对钱的看重程度为今年的 <div class='varvalue'>{percentage}%</div>。",
            economic_returns: "<strong>经济回报:</strong> 这是您期望从每年 <em>j</em> 的投资中收回的钱。例如: {details}",
            fine_avoidance: "<strong>避免罚款:</strong> 这是您的公司希望避免的罚款金额 (例如，<span class='varvalue'>{value} 百万</span>)。",
            intangible_value: "<strong>无形资产价值:</strong> 这是预期您的公司会获得的额外无形利益 (例如，<span class='varvalue'>{value}</span>)。",
            capability_returns: "<strong>能力回报:</strong> 这是您通过投资开发的技能或能力带来的收益。每个能力 𝑘 都有自己的回报，𝛾<sub>𝑘</sub> 是分配给该能力的总投资的一部分。",
            initial_investment: "<strong>初始投资:</strong> 这是您公司初始投资的金额: {value}。",
            investment_cost: "<strong>能力的额外投资成本:</strong> 这是额外能力的成本: {value}。",
            explanation_of_results: `
                <h2>结果解释</h2>
                <div class="enlargefont" style="--fontsize:18px;">
                    您的公司计划最初投资 <span class="varvalue">{I_t} 百万</span> 在一个 AI 风险管理平台上，以
                    避免 <span class="varvalue">{fineAvoidanceValue} 百万</span> 的罚款，现值为 <span class="varvalue">{discountedValue} 百万</span>，以 <span class="varvalue">{alpha}%</span> 的资本成本折现。  
                    这导致初始投资后的净回报为 <span class="varvalue">{netReturn} 百万</span>。
                    此外，该平台的无形利益，如积极的媒体报道，估计为 <span class="varvalue">{intangibleValue} 百万</span>，折现值为
                    <span class="varvalue">{discountedIntangibleReturn} 百万</span>。
                    总回报，包括这些无形资产，为 <span class="varvalue">{totalReturn} 百万</span>。
                </div>
                <br/>
                <div class="enlargefont" style="--fontsize:18px;">
                    风险管理平台可以节省约 <span class="varvalue">{capabilityReturns} 百万</span>，但这些额外的能力将额外花费 <span class="varvalue">{investmentCost} 百万</span>。
                </div>
                <br/>
            `
        }
    },
    ja: {
        title: "HROE フレームワーク計算機 V0.8.6",
        hroeformula: "HROEの公式",
        readPaper: "ドキュメントを読む",
        generatePDF: "PDFを生成",
        returnToCalculator: "計算機に戻る",
        helpInformation: "ヘルプ情報",
        eraseForm: "フォームを消去",
        deleteDefault: "デフォルトフォームを削除",
        futureFeature: "<strong>--- 将来の機能 ---</strong><br/>入力ソースを構成する",
        firstExample: "最初の例（論文で説明）",
        previousExample: "前の例",
        nextExample: "次の例",
        lastExample: "最後の例",
        saveDefault: "値をデフォルトとして保存",
        helpToolbar: "このツールバーのヘルプ",
        helpFormToolbar: `
<button onclick="closeToolbarHelp()"
    style="position:absolute; top: 2px; right: 2px; background: none; border: none; font-size: 16px; cursor: pointer;color:black;">
    <img src='icons/close--large.svg'>
</button>
<h2 style="padding-left:20px; background-color:white; border-bottom:1px solid #ccc; padding-bottom:0px;">
    フォームツールバーのヘルプ</h2>
<div style="max-height: 300px; overflow-y: scroll; font-size:18px; padding: 20px; padding-top:0px;background-color:#fefeff;">
    <p>入力フォームの上にあるツールバーには、計算機の入力値を操作するのに役立つボタンがいくつかあります：</p>
    <div class="table">
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/help.svg" alt="ヘルプ">
            </div>
            <div class="details-column">
                <p><strong>このツールバーのヘルプ</strong>：このヘルプ画面を表示します。</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/save.svg" alt="保存">
            </div>
            <div class="details-column">
                <p><strong>値をデフォルトとして保存</strong>：このボタンを押すと、現在の入力フィールドの値がデフォルトフォームとして保存され、計算機が再読み込みされたり、ブラウザが再起動されたりするたびに自動的に読み込まれます。</p>
                <p>この機能は、ブラウザのローカルストレージにフォームの値を保存し、ブラウザを閉じて再度開いた後もデータが保持されることを可能にします。再度ボタンを押すことで、いつでもデフォルトフォームを更新できます。保存時には、ツールバーに「デフォルトフォームが保存されました」というメッセージが表示されます。</p>
                <p>以前にデフォルトフォームが保存されている場合、計算機を再読み込みすると、ツールバーに「デフォルトフォームが読み込まれました」というメッセージが表示されます。</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/erase.svg" alt="消去">
            </div>
            <div class="details-column">
                <p><strong>フォームを消去</strong>：このボタンを押すと、入力フォームが消去され、ツールバーに「--- 空のフォーム ---」というメッセージが表示されます。入力フォームを消去し、その後に空のフォームをデフォルトフォームとして保存すると、ページが読み込まれるたびに計算機は常に空の状態になります。異なるフォームをデフォルトとして保存するまで、フォームの消去はデフォルトフォームをクリアしません。</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img class="icon" src="icons/trash-can.svg" alt="削除">
            </div>
            <div class="details-column">
                <p><strong>デフォルトフォームを削除</strong>：これにより、ブラウザのローカルストレージとデフォルトフォームが削除されます。このボタンを押してウェブページを再読み込みしたり、ブラウザを再度開いたりすると、次のメッセージが表示されます。このメッセージは、計算機を初めて使用する際にも表示されます：</p>
                <div class="nolocalstorage"><img src="icons/nolocalstorage.jpg"></div>
                <p>フォームまたはツールバーを使用し始めると、メッセージは消えます。後でフォームをデフォルトとして保存した場合、このメッセージは表示されなくなります。これは、空のフォームをデフォルトとして保存した場合でも同様です。デフォルトフォームの削除は、フォームを消去しません。</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                &nbsp;
            </div>
            <div class="details-column">
                <p><strong>例とナビゲーションコントロール</strong>：HROE計算機には、HROEの計算式がどのように機能するかをよりよく理解できるように、10の例が事前にロードされています。例のナビゲーションコントロールは次のとおりです：</p>
                <p><img src="icons/navcontrols.jpg"></p>
                <p>例に移動すると、入力フォームが定義済みの値で埋められ、自動的にHROEが計算されます。ナビゲーションは循環するため、最後の例にいる場合、「次の例」をクリックすると、論文で説明されている最初の例に戻ります。同様に、最初の例にいて「前の例」をクリックすると、最後の例に戻ります。</p>
                <p>これらの例は、<strong>hroe-examples.js</strong>ファイルに保存されており、<em>scripts</em>ディレクトリにあります。次のようになります：</p>
                <p><img src="icons/hroe-examples.jpg" width="70%" height="70%"></p>
                <p>このファイルを編集して新しい例を追加したり、既存のものを削除または変更したりできます。変更を有効にするには、ページを再読み込みすることを忘れないでください。</p>
                <p><strong>hroe-examples.js</strong>ファイルを変更する予定がある場合、まずバックアップを作成し、論文からの例を最初のエントリとして保持することを強くお勧めします。</p>
            </div>
        </div>
        <div class="row">
            <div class="icon-column">
                <img src="icons/settings--edit.svg" alt="設定" class="icon svgimagedisabled">
            </div>
            <div class="details-column">
                <p><strong>将来の機能</strong>：この無効化されたボタンは、異なる入力フィールドに入力するための外部ソースを設定および接続できるようにする予定の将来の機能のプレースホルダーです。</p>
            </div>
        </div>
    </div>
    <div class="signature-box">
        <strong>最終更新日</strong>：2024年8月30日
    </div>`,
        yearsLabel: "年数 (N):",
        capabilitiesLabel: "能力オプションの数 (m):",
        discountLabel: "資本コスト (割引率):",
        economicReturnsLabel: "経済的利益 (百万単位、コンマ区切り):",
        fineAvoidanceLabel: "罰金回避の価値 (百万単位):",
        intangibleValueLabel: "無形の側面の価値 (百万単位):",
        capabilityReturnsLabel: "能力のリターン (百万単位、コンマ区切り):",
        gammaLabel: "ガンマ (資金の割合、コンマ区切り):",
        initialInvestmentLabel: "初期投資 (百万単位):",
        investmentCostLabel: "能力の追加投資コスト (百万単位):",
        results: "結果",
        calculate: "HROE を計算する",
        economic: "経済",
        intangible: "評判 / 無形",
        capabilities: "能力",
        hoverText: "",
        explanationPanelDefault: "AIの倫理とガバナンスのイニシアチブへの投資のリターンは、全体的に評価されるべきです。この計算機は定量的なリターンを評価するための有用なツールを提供しますが、全体的な評価には定性的なリターンや影響も含めるべきです。全体的な評価プロセスでは、幅広い利害関係者と社会全体への影響を考慮することが重要です。",
        commaSeparatedEntry: 'カンマ区切りのエントリ',
        commaSeparatedEntries: 'カンマ区切りのエントリ',
        extraComma: '余分なカンマがあります',
        extraCommas: '余分なカンマがあります',
        extraEntry: 'エントリ',
        extraEntries: 'エントリ',
        missing: '不足している',
        missingPlural: '不足しています',
        and: 'と',
        fieldListIntro: '年数が',
        proceed: '計算を続行できますが、不足しているエントリはその年のために0に設定されることに注意してください。',
        ignore: '余分なエントリは無視されます。',
        warning: '次の点にご注意ください:',
        chart: {
            economicReturns: "経済的利益",
            intangibles: "無形の価値",
            capabilityReturns: "能力リターン",
            value: "値（百万単位）",
            year: "年"
        },
        helpPopupTitle: "倫理収益（HROE）フレームワーク計算機",
        helpPopupContent: `
        <p>組織はさまざまな理由で倫理的なAIの実践を実施する動機を持っています。たとえば、それが正しいと信じているから、または訴訟や罰金などのコストを回避するためです。この計算機を使用して、AI倫理投資の潜在的な収益を見積もり、"AI倫理投資の収益：包括的フレームワーク"と題された論文(<a href="#" onclick="togglePanel();">https://arxiv.org/pdf/2309.13057</a>)を参照して、これらの利益についてより深く理解することができます。この論文は、AI倫理への投資収益を理解するための包括的なアプローチを提案しています。</p>
        <p>倫理収益（HROE）フレームワークは、直接的な経済的収益だけでなく、評判に関連する無形の利益や組織能力に関連する実際の選択肢も考慮に入れています。このフレームワークは、AI倫理への投資がどのようにコスト削減、収益創出、利害関係者の認識改善、将来の機会の拡大につながるかを示すことによって、組織がこれらの投資を正当化するのを支援するために設計されています。</p>
        <p class="note-box"><strong>注</strong>：AI倫理およびガバナンスイニシアチブへの投資収益は、全体的に評価されるべきです。この計算機は、定量化可能な収益を評価するための便利なツールを提供しますが、全体的な評価には、定性的な性質の収益と影響も含める必要があります。全体的な評価プロセスでは、広範な利害関係者と社会全体への影響を考慮することが重要です。</p>
        <br />
        <p>AI技術は有益である一方で、偏見、公平性、プライバシーの懸念など、重大な倫理的課題も引き起こします。これらの問題に対処するには、かなりの投資が必要であり、組織は明確な投資収益の証拠がなければ、それを正当化するのが難しいと感じることがよくあります。</p>
        <p>倫理収益（HROE）フレームワークは、直接的な財務収益やコスト回避などの経済的影響と、評判改善や利害関係者の信頼などの無形の影響を統合することによって、このギャップを埋めます。さらに、将来の柔軟性と適応性を提供する実際の選択肢も含まれています。このアプローチは、AI倫理への投資が組織全体の成功と持続可能性にどのように貢献できるかを包括的に示し、これらの重要なイニシアチブを正当化し、維持することを容易にします。</p>
        <p>この包括的なアプローチに沿って、このプログラムは、論文で提供された式を使用して、AI倫理投資のROIを複数年にわたって計算します。このプログラムは、経済的収益、評判の収益、および各年の能力収益に関連する入力、ならびに割引要因と初期投資コストに関してユーザーにプロンプトを表示します。</p>
        <p>これらの変数を組み込むことにより、このプログラムは、将来の収益を現在価値に割り引き、経済的、評判的、能力的な投資からの総収益を合計することによってHROEを計算します。この多年期アプローチは、組織がAI倫理投資の長期的な利益をよりよく評価し、これらの投資が全体的なパフォーマンスと戦略的柔軟性にどのように影響するかをより明確に示すことができるようにします。</p>
    `,
        helpPopupSignature: "<strong>最終更新日</strong>：2024年8月30日",
        explanation: {
            years: "<strong>年数:</strong> これは、現在 (<em>t</em>) から将来のある年数 (<div class='varvalue'>{value}</div>) (<em>t+N</em>) までの各年を表します。",
            discount: "<strong>割引率 (α):</strong> これは、今のお金に比べて将来のお金をどれだけ低く評価するかを示す 0 と 1 の間の数値です。 たとえば、割引率が <div class='varvalue'>{value}</div> の場合、これは来年のお金を今年の <div class='varvalue'>{percentage}%</div> で評価することを意味します。",
            economic_returns: "<strong>経済的利益:</strong> これは、各年 <em>j</em> の投資から回収することを期待するお金です。 例えば: {details}",
            fine_avoidance: "<strong>罰金回避:</strong> これは、貴社が罰金を回避したい金額 (例: <span class='varvalue'>{value} 百万</span>) です。",
            intangible_value: "<strong>無形の側面の価値:</strong> これは、貴社が受け取ると予想される追加の無形の利益 (たとえば、<span class='varvalue'>{value}</span>) です。",
            capability_returns: "<strong>能力のリターン:</strong> これは、投資によって開発した新しいスキルや能力から得られる利益です。 各能力 𝑘 には独自のリターンがあり、𝛾<sub>𝑘</sub> は、その能力に割り当てられる総投資の割合です。",
            initial_investment: "<strong>初期投資:</strong> これは、貴社の初期投資額です: {value}。",
            investment_cost: "<strong>能力の追加投資コスト:</strong> これは追加の能力にかかる費用です: {value}。",
            explanation_of_results: `
                <h2>結果の説明</h2>
                <div class="enlargefont" style="--fontsize:18px;">
                    貴社は、AI リスク管理プラットフォームに最初に <span class="varvalue">{I_t} 百万</span> を投資し、
                    <span class="varvalue">{fineAvoidanceValue} 百万</span> の罰金を回避する予定であり、これは <span class="varvalue">{alpha}%</span> の資本コストで割引かれた場合、現在価値は <span class="varvalue">{discountedValue} 百万</span> です。  
                    これは、初期投資後の純利益が <span class="varvalue">{netReturn} 百万</span> であることを意味します。
                    さらに、このプラットフォームの無形の利点 (たとえば、積極的なメディア報道) は <span class="varvalue">{intangibleValue} 百万</span> と見積もられており、割引された価値は
                    <span class="varvalue">{discountedIntangibleReturn} 百万</span> です。
                    これらの無形資産を含む総リターンは <span class="varvalue">{totalReturn} 百万</span> です。
                </div>
                <br/>
                <div class="enlargefont" style="--fontsize:18px;">
                    リスク管理プラットフォームは約 <span class="varvalue">{capabilityReturns} 百万</span> を節約できますが、これらの追加機能にはさらに <span class="varvalue">{investmentCost} 百万</span> の費用がかかります。
                </div>
                <br/>
            `
        }
    }
};

function applyTranslations(language) {
    document.getElementById('page-title').textContent = translationsData[language]['title'];
    document.getElementById('read-paper').textContent = translationsData[language]['readPaper'];
    document.getElementById('return-calculator').textContent = translationsData[language]['returnToCalculator'];
    document.getElementById('hroeformula').textContent = translationsData[language].hroeformula;
    document.getElementById('economic').textContent = translationsData[language]['economic'];
    document.getElementById('intangible').textContent = translationsData[language]['intangible'];
    document.getElementById('capabilities').textContent = translationsData[language]['capabilities'];
    document.getElementById('explanationPanelDefault').innerHTML = translationsData[language]['explanationPanelDefault'];
    document.getElementById('helpPopupTitle').innerHTML = translationsData[language].helpPopupTitle;
    document.getElementById('helpPopupContent').innerHTML = translationsData[language].helpPopupContent;
    document.getElementById('helpPopupSignature').innerHTML = translationsData[language].helpPopupSignature;
    document.getElementById('generatePDFButton').innerHTML = translationsData[language].generatePDF;
    // Update tooltip translations
    const tooltipElements = document.querySelectorAll('[data-tooltip-key]');
    tooltipElements.forEach(el => {
        const key = el.getAttribute('data-tooltip-key');
        if (translationsData[language] && translationsData[language][key]) {
            el.setAttribute('data-tooltip', translationsData[language][key]);
        }
    });
}


function switchLanguage(lang) {
    if (translationsData[lang]) {
        document.title = translationsData[lang].title;
        document.querySelector('h1').textContent = translationsData[lang].title;
        document.querySelector('.hroebutton').textContent = translationsData[lang].readPaper;
        document.querySelector('label[for="years"]').textContent = translationsData[lang].yearsLabel;
        document.querySelector('label[for="discount"]').textContent = translationsData[lang].discountLabel;
        document.querySelector('label[for="economic_returns"]').textContent = translationsData[lang].economicReturnsLabel;
        document.querySelector('label[for="fine_avoidance"]').textContent = translationsData[lang].fineAvoidanceLabel;
        document.querySelector('label[for="initial_investment"]').textContent = translationsData[lang].initialInvestmentLabel;
        document.querySelector('label[for="intangible_value"]').textContent = translationsData[lang].intangibleValueLabel;
        document.querySelector('label[for="capability_returns"]').textContent = translationsData[lang].capabilityReturnsLabel;
        document.querySelector('label[for="investment_cost"]').textContent = translationsData[lang].investmentCostLabel;
        document.querySelector('div.hroebutton').textContent = translationsData[lang].calculate;
        document.getElementById('explanation-panel').innerHTML = translationsData[lang].hoverText;
        document.getElementById('helpFormToolbar').innerHTML = translationsData[lang].helpFormToolbar;
        // document.getElementById('resultsHeader').textContent = translationsData[lang].results;
        applyTranslations(lang);
        // Recalculate results to update the language
        calculateHROE();
    }
}


document.getElementById('language').addEventListener('change', (event) => {
    const lang = event.target.value;
    switchLanguage(lang);
});

// Initialize with default language
// window.onload = () => {
//     switchLanguage('en');
// };
