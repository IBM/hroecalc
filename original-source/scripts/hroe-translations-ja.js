window.hroeTranslations_ja = {
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
        economicReturnsLabel: "コア経済的利益 (百万単位、コンマ区切り):",
        fineAvoidanceLabel: "罰金回避の価値 (百万単位、コンマ区切り):",
        intangibleValueLabel: "無形の側面の価値 (百万単位):",
        capabilityReturnsLabel: "能力のリターン (百万単位、コンマ区切り):",
        gammaLabel: "ガンマ (資金の割合、コンマ区切り):",
        initialInvestmentLabel: "初期投資 (百万単位):",
        investmentCostLabel: "能力の追加投資コスト (百万単位):",
        results: "結果",
        calculate: "HROE を計算する",
        economic: "経済的リターン",
        intangible: "評判によるリターン",
        capabilities: "能力向上によるリターン",
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
            intangibles: "評判の利益",
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
        <p>AI技術は有益である一方で、偏見、公平性、プライバシーの懸念など、重大な倫理的課題も引き起こします。これらの問題に対処するには、かなりの投資が必要であり、組織は明確な投资回报の証拠がなければ、それを正当化するのが難しいと感じることがよくあります。</p>
        <p>倫理収益（HROE）フレームワークは、直接的な財務収益やコスト回避などの経済的影響と、評判改善や利害関係者の信頼などの無形の影響を統合することによって、このギャップを埋めます。此外，它还包括提供未来灵活性和适应性的实际选择。このアプローチは、AI倫理への投資が組織全体の成功と持続可能性にどのように貢献できるかを包括的に示し、これらの重要なイニシアチブを正当化し、維持することを容易にします。</p>
        <p>この包括的なアプローチに沿って、このプログラムは、論文で提供された式を使用して、AI倫理投資のROIを複数年にわたって計算します。このプログラムは、経済的収益、評判の収益、および各年の能力収益に関連する入力、ならびに割引要因と初期投資コストに関してユーザーにプロンプトを表示します。</p>
        <p>これらの変数を組み込むことにより、このプログラムは、将来の収益を現在価値に割り引き、経済的、評判的、能力的な投資からの総収益を合計することによってHROEを計算します。この多年期方法により、組織はAI倫理投資の長期的な利益をよりよく評価し、これらの投資が全体的なパフォーマンスと戦略的柔軟性にどのように影響するかをより明確に示すことができるようになります。</p>
    `,
        helpPopupSignature: "<strong>最終更新日</strong>：2024年8月30日",
        explanation: {
            years: "<strong>年数:</strong> これは、現在 (<em>t</em>) から将来のある年数 (<div class='varvalue'>{value}</div>) (<em>t+N</em>) までの各年を表します。",
            discount: "<strong>割引率 (α):</strong> これは、今のお金に比べて将来のお金をどれだけ低く評価するかを示す 0 と 1 の間の数値です。 たとえば、割引率が <div class='varvalue'>{value}</div> の場合、これは来年のお金を今年の <div class='varvalue'>{percentage}%</div> で評価することを意味します。",
            economic_returns: "リターン",
            fine_avoidance: "<strong>罰金回避:</strong> これは、貴社が毎年回避したい罰金の金額です。カンマを使用して値を区切ります。",
            intangible_value: "<strong>無形資産価値:</strong> これは、貴社が受け取ると予想される追加の無形利益、例えば積極的なメディア報道です。カンマを使用して値を区切ります。",
            capability_returns: "リターン",
            initial_investment: "<strong>初期投資:</strong> これは、貴社の初期投資額です: {value}。",
            investmentCostLabel: "能力の追加投資コスト (百万単位):",
            investment_cost: "<strong>能力の追加投資コスト:</strong> これは追加の能力が毎年かかる費用です。カンマを使用して値を区切ります。",
            explanation_of_results: `
                <h2>結果の説明</h2>
                <div class="enlargefont" style="--fontsize:18px;">
                    貴社は、AI 倫理とガバナンスに初期投資として <span class="varvalue">{I_t} 百万</span> を投資し、潜在的に
                    <span class="varvalue">{fineAvoidanceValue} 百万</span> の罰金を <span class="varvalue">{N}</span> 年間で回避する予定であり、これは <span class="varvalue">{alpha}%</span> の資本コストで割引かれた場合、現在価値は <span class="varvalue">{discountedValue} 百万</span> です。  
                    これにより、初期投資後の純利益は <span class="varvalue">{netReturn} 百万</span> になります。
                    さらに、このプラットフォームの無形の利点 (たとえば、積極的なメディア報道) は <span class="varvalue">{intangibleValue} 百万</span> と評価されており、割引かれた価値は
                    <span class="varvalue">{discountedIntangibleReturn} 百万</span> です。
                    これらの無形資産を含む総リターンは <span class="varvalue">{totalReturn} 百万</span> であり、ROI は <span class="varvalue">{finalROI}</span> となります。
                </div>
                <br/>
                <br/>
            `
        },
        // --- NEW KEYS ADDED ---
        roiInAIEthics: "AI倫理のROI",
        investments: "投資",
        returns: "リターン",
        orgRevenuesLabel: "組織収益 (百万単位、年ごと、カンマ区切り):",
        fineAvoidanceValueLabel: "罰金回避価値 (年ごと %、カンマ区切り):",
        calcEconomicReturnsLabel: "経済的リターン (百万単位、収益 * 罰金回避 %として計算)",
        reputationalReturns: "評判の利益",
        returnsOnCapabilities: "能力のリターン",
        calculateROI: "ROIを計算"
        // --- END NEW KEYS ---
    };
