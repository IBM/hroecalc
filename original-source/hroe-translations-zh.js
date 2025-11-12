window.hroeTranslations_zh = {
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
        economicReturnsLabel: "核心经济回报 (以百万为单位, 用逗号分隔):",
        fineAvoidanceLabel: "避免罚款的价值 (以百万为单位, 用逗号分隔):",
        intangibleValueLabel: "无形资产价值 (以百万为单位):",
        capabilityReturnsLabel: "能力回报 (以百万为单位, 用逗号分隔):",
        gammaLabel: "伽玛 (资金份额, 用逗号分隔):",
        initialInvestmentLabel: "初始投资 (以百万为单位):",
        investmentCostLabel: "能力的额外投资成本 (以百万为单位):",
        results: "结果",
        calculate: "计算 HROE",
        economic: "经济回报",
        intangible: "声誉回报",
        capabilities: "能力回报",
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
            intangibles: "声誉回报",
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
            economic_returns: "回报",
            fine_avoidance: "<strong>避免罚款:</strong> 这是您的公司希望避免的每年罚款金额。使用逗号分隔您的值。",
            intangible_value: "<strong>无形资产价值:</strong> 这是预期您的公司会获得的额外无形利益，例如积极的媒体报道。使用逗号分隔您的值。",
            capability_returns: "回报",
            initial_investment: "<strong>初始投资:</strong> 这是您公司初始投资的金额: {value}。",
            investmentCostLabel: "能力的额外投资成本 (以百万为单位):",
            investment_cost: "<strong>能力的额外投资成本:</strong> 这是额外能力每年将花费的金额。使用逗号分隔您的值。",
            explanation_of_results: `
                <h2>结果解释</h2>
                <div class="enlargefont" style="--fontsize:18px;">
                    您的公司计划最初投资 <span class="varvalue">{I_t} 百万</span> 在 AI 伦理和治理方面，以潜在地
                    避免 <span class="varvalue">{fineAvoidanceValue} 百万</span> 的罚款，在 <span class="varvalue">{N}</span> 内，以 <span class="varvalue">{alpha}%</span> 的资本成本折现后，现值为 <span class="varvalue">{discountedValue} 百万</span>。  
                    这导致初始投资后的净回报为 <span class="varvalue">{netReturn} 百万</span>。
                    此外，该平台的无形利益，如积极的媒体报道，估计为 <span class="varvalue">{intangibleValue} 百万</span>，折现值为
                    <span class="varvalue">{discountedIntangibleReturn} 百万</span>。
                    总回报，包括这些无形资产，为 <span class="varvalue">{totalReturn} 百万</span>，结果是 ROI 为 <span class="varvalue">{finalROI}</span>。
                </div>
                <br/>
                <br/>
            `
        },
        // --- NEW KEYS ADDED ---
        roiInAIEthics: "AI 伦理 ROI",
        investments: "投资",
        returns: "回报",
        orgRevenuesLabel: "组织收入 (以百万为单位, 每年, 用逗号分隔):",
        fineAvoidanceValueLabel: "避免罚款价值 (每年 %, 用逗号分隔):",
        calcEconomicReturnsLabel: "经济回报 (以百万为单位，计算为收入 * 避免罚款 %)",
        reputationalReturns: "声誉回报",
        returnsOnCapabilities: "能力回报",
        calculateROI: "计算 ROI"
        // --- END NEW KEYS ---
    };
