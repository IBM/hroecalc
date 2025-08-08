<script>
import translationsData from "@/scripts/hroe-translations.js";

export default {
  name: 'Translation',
  data() {
    return {
      translationsData,
      selectedLanguage: 'en', // Default language
    }
  },
  methods: {
    switchLanguage(lang) {
      if (!translationsData[lang]) return
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
      this.applyTranslations(lang);
      // Recalculate results to update the language
      // calculateHROE();
    },
    applyTranslations(language) {
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
  },
}

</script>

<template>
<div class="enlargefont" style="--fontsize: 16px; color:black;">
  <div style="position: absolute; top: 7px; right: 33px;">
    <label for="language">Language:</label>
    <select 
      class="enlargefont"
      style="--fontsize: 16px;"
      id="language"
      v-model="selectedLanguage"
      @change="switchLanguage(selectedLanguage)"
    >
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="it">Italian</option>
      <option value="fr">French</option>
      <option value="de">German</option>
      <option value="zh">Chinese</option>
      <option value="ja">Japanese</option>
    </select>
  </div>
</div>
</template>