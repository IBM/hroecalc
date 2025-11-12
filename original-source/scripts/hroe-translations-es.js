window.hroeTranslations_es = {
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
        economicReturnsLabel: "Retornos económicos centrales (en millones por año, separados por comas):",
        fineAvoidanceLabel: "Valor de evitación de multas (en millones por año, separados por comas):",
        intangibleValueLabel: "Valor del aspecto intangible en millones:",
        capabilityReturnsLabel: "Retornos de capacidad en millones (separados por comas):",
        gammaLabel: "Gamma (fracciones de fondos, separadas por comas):",
        initialInvestmentLabel: "Inversión inicial en millones:",
        investmentCostLabel: "Costo de inversión adicional para capacidades en millones:",
        results: "Resultados",
        calculate: "Calcular HROE",
        economic: "Retornos Económicos",
        intangible: "Retornos Reputacionales",
        capabilities: "Retornos por Capacidades",
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
            economic_returns: "Retornos",
            fine_avoidance: "<strong>Evitar Multas:</strong> Esta es la cantidad que su empresa quiere evitar en multas por año. Utilice comas para separar sus valores.",
            intangible_value: "<strong>Valor del Aspecto Intangible:</strong> Este es el beneficio intangible adicional, como la cobertura mediática positiva, que espera que reciba su empresa. Utilice comas para separar sus valores.",
            capability_returns: "Retornos",
            initial_investment: "<strong>Inversión Inicial:</strong> Esta es la cantidad de inversión inicial de su empresa: {value}.",
            investment_cost: "<strong>Costo de Inversión para Capacidades:</strong> Esta es la cantidad que costarían las capacidades adicionales por año. Utilice comas para separar sus valores.",
            explanation_of_results: `
                <h2>Explicación de los Resultados</h2>
                <div class="enlargefont" style="--fontsize:18px;">
                    Su empresa planea inicialmente invertir <span class="varvalue">{I_t} millones</span> en ética y gobernanza de IA para potencialmente
                    evitar <span class="varvalue">{fineAvoidanceValue} millones</span> en multas durante <span class="varvalue">{N}</span>, que tiene un valor presente de <span class="varvalue">{discountedValue} millones</span> cuando se descuenta a una tasa de capital del <span class="varvalue">{alpha}%</span>.  
                    Esto resulta en un retorno neto de <span class="varvalue">{netReturn} millones</span> después de la inversión inicial.
                    Además, los beneficios intangibles de la plataforma, como la cobertura mediática positiva, están valorados en <span class="varvalue">{intangibleValue} millones</span>, con un valor descontado de
                    <span class="varvalue">{discountedIntangibleReturn} millones</span>.
                    El retorno total, incluidos estos intangibles, es de <span class="varvalue">{totalReturn} millones</span>, lo que resulta en un ROI de <span class="varvalue">{finalROI}</span>.
                </div>
                <br/>
                <br/>
            `
        },
        // --- NEW KEYS ADDED ---
        roiInAIEthics: "ROI en Ética de IA",
        investments: "Inversiones",
        returns: "Retornos",
        orgRevenuesLabel: "Ingresos Organizacionales (en millones por año, separados por comas):",
        fineAvoidanceValueLabel: "Valor de Evitación de Multas (en % por año, separados por comas):",
        calcEconomicReturnsLabel: "Retorno Económico (en millones calculado como Ingreso * % Evitación de Multas)",
        reputationalReturns: "Retornos Reputacionales",
        returnsOnCapabilities: "Retornos de Capacidades",
        calculateROI: "Calcular ROI"
        // --- END NEW KEYS ---
    };
