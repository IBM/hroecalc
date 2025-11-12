window.hroeTranslations_it = {
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
                <p>Il messaggio scompare non appena inizi a usare il modulo o la barra degli strumenti. Se in seguito salvi il tuo modulo come predefinito, non vedrai più questo messaggio. Questo è vero anche se salvi un modulo vuoto come predefinito. Eliminar el modulo predefinito non cancella il modulo.</p>
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
        economicReturnsLabel: "Rendimenti economici centrali (in milioni per anno, separati da virgole):",
        fineAvoidanceLabel: "Valore di evitamento delle multe (in milioni per anno, separati da virgole):",
        intangibleValueLabel: "Valore dell'aspetto intangibile in milioni:",
        capabilityReturnsLabel: "Rendimenti delle capacità in milioni (separati da virgole):",
        gammaLabel: "Gamma (frazioni di fondi, separate da virgole):",
        initialInvestmentLabel: "Investimento iniziale in milioni:",
        investmentCostLabel: "Costo di investimento aggiuntivo per capacità in milioni:",
        results: "Risultati",
        calculate: "Calcolare HROE",
        economic: "Rendimenti Economici",
        intangible: "Rendimenti Reputazionali",
        capabilities: "Rendimenti sulle Capacità",
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
            economic_returns: "Rendimenti",
            fine_avoidance: "<strong>Evitar Multas:</strong> Esta es la cantidad que su empresa quiere evitar en multas por año. Utilice comas para separar sus valores.",
            intangible_value: "<strong>Valor del Aspecto Intangible:</strong> Este es el beneficio intangible adicional, como la cobertura mediática positiva, que espera que reciba su empresa. Utilice comas para separar sus valores.",
            capability_returns: "Rendimenti",
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
        investments: "Investimenti",
        returns: "Rendimenti",
        orgRevenuesLabel: "Ingresos Organizacionales (en millones por año, separados por comas):",
        fineAvoidanceValueLabel: "Valor de Evitación de Multas (en % por año, separados por comas):",
        calcEconomicReturnsLabel: "Retorno Económico (en millones calculado como Ingreso * % Evitación de Multas)",
        reputationalReturns: "Retornos Reputacionales",
        returnsOnCapabilities: "Retornos de Capacidades",
        calculateROI: "Calcular ROI"
        // --- END NEW KEYS ---
    };
