window.hroeTranslations_de = {
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
        economicReturnsLabel: "Wirtschaftliche Zentralrenditen in Millionen (kommagetrennt):",
        fineAvoidanceLabel: "Vermeidungswert der Strafen in Millionen (kommagetrennt):",
        intangibleValueLabel: "Wert des immateriellen Aspekts in Millionen:",
        capabilityReturnsLabel: "Fähigkeitsrenditen in Millionen (kommagetrennt):",
        gammaLabel: "Gamma (Anteile der Mittel, kommagetrennt):",
        initialInvestmentLabel: "Anfangsinvestition in Millionen:",
        investmentCostLabel: "Zusätzliche Investitionskosten für Fähigkeiten in Millionen:",
        results: "Ergebnisse",
        calculate: "HROE berechnen",
        economic: "Ökonomische Renditen",
        intangible: "Reputationsrenditen",
        capabilities: "Renditen aus Fähigkeiten",
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
            economic_returns: "Renditen",
            fine_avoidance: "<strong>Vermeidungswert der Strafen:</strong> Dies ist der Betrag, den Ihr Unternehmen vermeiden möchte, an Strafen pro Jahr zu zahlen. Verwenden Sie Kommas, um Ihre Werte zu trennen.",
            intangible_value: "<strong>Wert des immateriellen Aspekts:</strong> Dies ist der zusätzliche immaterielle Nutzen, wie z. B. eine positive Medienberichterstattung, den Sie von Ihrem Unternehmen erwarten. Verwenden Sie Kommas, um Ihre Werte zu trennen.",
            capability_returns: "Renditen",
            initial_investment: "<strong>Anfangsinvestition:</strong> Dies ist der Betrag der Anfangsinvestition Ihres Unternehmens: {value}.",
            investmentCostLabel: "Zusätzliche Investitionskosten für Fähigkeiten in Millionen:",
            investment_cost: "<strong>Zusätzliche Investitionskosten für Fähigkeiten:</strong> Dies ist der Betrag, den die zusätzlichen Fähigkeiten pro Jahr kosten würden. Verwenden Sie Kommas, um Ihre Werte zu trennen.",
            explanation_of_results: `
                <h2>Erklärung der Ergebnisse</h2>
                <div class="enlargefont" style="--fontsize:18px;">
                    Ihr Unternehmen plant, anfänglich <span class="varvalue">{I_t} Millionen</span> in KI-Ethik und -Governance zu investieren, um potenziell
                    <span class="varvalue">{fineAvoidanceValue} Millionen</span> an Strafen über <span class="varvalue">{N}</span> zu vermeiden, die einen Barwert von <span class="varvalue">{discountedValue} Millionen</span> hat, wenn sie zu einem Kapitalkostensatz von <span class="varvalue">{alpha}%</span> abgezinst wird.  
                    Dies führt nach der Anfangsinvestition zu einer Nettorendite von <span class="varvalue">{netReturn} Millionen</span>.
                    Darüber hinaus werden die immateriellen Vorteile der Plattform, wie z. B. eine positive Medienberichterstattung, auf <span class="varvalue">{intangibleValue} million</span> geschätzt, mit einem abgezinsten Wert von
                    <span class="varvalue">{discountedIntangibleReturn} million</span>.
                    Die Gesamtrendite, einschließlich dieser immateriellen Vermögenswerte, beträgt <span class="varvalue">{totalReturn} million</span>, was zu einem ROI von <span class="varvalue">{finalROI}</span> führt.
                </div>
                <br/>
                <br/>
            `
        },
        // --- NEW KEYS ADDED ---
        roiInAIEthics: "ROI in KI-Ethik",
        investments: "Investitionen",
        returns: "Renditen",
        orgRevenuesLabel: "Organisatorische Einnahmen (in Millionen pro Jahr, kommagetrennt):",
        fineAvoidanceValueLabel: "Vermeidungswert der Strafen (in % pro Jahr, kommagetrennt):",
        calcEconomicReturnsLabel: "Wirtschaftliche Rendite (in Millionen berechnet als Einnahmen * % Strafvermeidung)",
        reputationalReturns: "Reputationsgewinne",
        returnsOnCapabilities: "Renditen auf Fähigkeiten",
        calculateROI: "ROI Berechnen"
        // --- END NEW KEYS ---
    };
