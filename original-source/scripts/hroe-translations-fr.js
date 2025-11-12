window.hroeTranslations_fr = {
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
        economicReturnsLabel: "Rendements économiques centraux (en millions par année, séparés par des virgules):",
        fineAvoidanceLabel: "Valeur de l'évitement des amendes (en millions par année, séparés par des virgules):",
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
        explanationPanelDefault: "Le retour sur investissement dans les initiatives d'éthique et de gouvernance de l'IA doit être évalué de manière holistique. Bien que cette calculatrice fournisse un outil utile pour évaluer les retours quantifiables, une évaluation holistique doit également inclure des retours et impacts de nature qualitative. Il est important de considérer un large éventail de parties prenantes et l'impact sur la société dans son ensemble lors du processus d'évaluation holistique.",
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
        <p>Le cadre HROE comble cette lacune en intégrant les impacts économiques, tels que les retours financiers directs et l'évitement des coûts, avec les impacts intangibles, comme l'amélioration de la réputation et la confiance des parties prenantes. En outre, il inclut des options réelles qui offrent une flexibilité et une adaptabilité futures. Cet approche offre une vision complète de la manière dont les investissements en éthique de l'IA peuvent contribuer au succès et à la durabilité globale d'une organisation, facilitant ainsi la justification et le maintien de ces initiatives critiques.</p>
        <p>Conformément à cette approche holistique, ce programme utilise les formules fournies dans le document pour calculer le ROI des investissements en éthique de l'IA sur plusieurs années. Ce programme demande aux utilisateurs de fournir des données relatives aux retours économiques, aux retours réputationnels et aux retours sur les capacités pour chaque année, ainsi que le facteur de réduction et les coûts d'investissement initiaux.</p>
        <p>En incorporant ces variables, le programme calcule l'HROE en actualisant les retours futurs à leur valeur présente et en additionnant les retours totaux des investissements économiques, réputationnels et en capacités. Cette approche sur plusieurs années permet aux organisations de mieux évaluer les avantages à long terme de leurs investissements en éthique de l'IA, en fournissant un cadre plus clair de la manière dont ces investissements influencent leurs performances globales et leur flexibilité stratégique.</p>
    `,
        helpPopupSignature: "<strong>Dernière mise à jour</strong>: 30 août 2024",
        explanation: {
            years: "<strong>Années:</strong> Cela représente chaque année à partir de maintenant (<em>t</em>) jusqu'à un certain nombre d'années (<div class='varvalue'>{value}</div>) dans le futur (<em>t+N</em>).",
            discount: "<strong>Taux d'Actualisation (α):</strong> C'est un nombre entre 0 et 1 qui nous indique à quel point nous valorisons moins l'argent à l'avenir par rapport à l'argent maintenant. Par exemple, si le taux d'actualisation est <div class='varvalue'>{value}</div>, cela signifie que nous valorisons l'argent l'année prochaine à <div class='varvalue'>{percentage}%</div> de ce que nous le valorisons cette année.",
            economic_returns: "<strong>Rendements Économiques:</strong> C'est l'argent que vous vous attendez à récupérer de votre investissement chaque année <em>j</em>. Utilisez des virgules pour séparer vos valeurs.",
            fine_avoidance: "<strong>Évitement des Amendes:</strong> C'est le montant que votre entreprise souhaite éviter en amendes par an. Utilisez des virgules pour séparer vos valeurs.",
            intangible_value: "<strong>Valeur de l'Aspet Intangible:</strong> C'est le bénéfice intangible supplémentaire, tel que la couverture médiatique positive, que vous attendez de votre entreprise. Utilisez des virgules pour séparer vos valeurs.",
            capability_returns: "<strong>Rendements des Capacités:</strong> C'est le bénéfice que vous tirez des nouvelles compétences ou capacités que vous développez grâce à votre investissement. Chaque capacité 𝑘 ha il suo rendimento, e 𝛾<sub>𝑘</sub> è la frazione dell'investimento totale assegnata a quella capacità.",
            initial_investment: "<strong>Investissement Initial:</strong> C'est le montant de l'investissement initial de votre entreprise: {value}.",
            investment_cost: "<strong>Coût d'investissement supplémentaire pour les capacités:</strong> C'est le montant que coûteraient les capacités supplémentaires par an. Utilisez des virgules pour séparer vos valeurs.",
            explanation_of_results: `
                <h2>Explication des Résultats</h2>
                <div class="enlargefont" style="--fontsize:18px;">
                    Votre entreprise prévoit d'investir initialement <span class="varvalue">{I_t} millions</span> dans l'éthique et la gouvernance de l'IA pour potentiellement
                    éviter <span class="varvalue">{fineAvoidanceValue} millions</span> en amendes sur <span class="varvalue">{N}</span>, qui a une valeur actuelle de <span class="varvalue">{discountedValue} millions</span> lorsqu'elle est actualisée à un coût du capital de <span class="varvalue">{alpha}%</span>.  
                    Cela se traduit par un rendement net de <span class="varvalue">{netReturn} millions</span> après l'investissement initial.
                    De plus, les avantages intangibles de la plateforme, tels qu'une couverture médiatique positive, sont évalués <span class="varvalue">{intangibleValue} millions</span>, avec une valeur actualisée de
                    <span class="varvalue">{discountedIntangibleReturn} millions</span>.
                    Le rendement total, y compris ces intangibles, est de <span class="varvalue">{totalReturn} millions</span>, ce qui se traduit par un ROI de <span class="varvalue">{finalROI}</span>.
                </div>
                <br/>
                <br/>
            `
        },
        // --- NEW KEYS ADDED ---
        roiInAIEthics: "ROI en Éthique de l'IA",
        investments: "Investissements",
        returns: "Rendements",
        orgRevenuesLabel: "Revenus Organisationnels (en millions par an, séparés par des virgules):",
        fineAvoidanceValueLabel: "Valeur d'Évitement des Amendes (en % par an, séparés par des virgules):",
        calcEconomicReturnsLabel: "Rendement Économique (en millions calculé comme Revenu * % Évitement Amende)",
        reputationalReturns: "Rendements Réputationnels",
        returnsOnCapabilities: "Rendements des Capacités",
        calculateROI: "Calculer ROI"
        // --- END NEW KEYS ---
    };
