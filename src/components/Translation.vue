<script>
import translationsData from "@/scripts/hroe-translations.js";

export default {
  name: 'Translation',
  props: {
    currentLanguage: {
      type: String,
      default: 'en'
    }
  },
  watch: {
    currentLanguage(newLang) {
      this.selectedLanguage = newLang;
      this.applyTranslations(newLang);
    }
  },
  data() {
    return {
      translationsData,
      selectedLanguage: this.currentLanguage,
    }
  },
  mounted() {
    this.selectedLanguage = this.currentLanguage;
  },
  methods: {
    switchLanguage(lang) {
      if (!translationsData[lang]) return;
      this.$emit('language-changed', lang);
    },
    applyTranslations(language) {
      // Only update DOM elements that are NOT controlled by Vue components
      // Update document title
      document.title = translationsData[language]['title'];
      
      // Update form labels that are still in the main template
      const yearLabel = document.querySelector('label[for="years"]');
      if (yearLabel) yearLabel.textContent = translationsData[language].yearsLabel;
      
      const discountLabel = document.querySelector('label[for="discount"]');
      if (discountLabel) discountLabel.textContent = translationsData[language].discountLabel;
      
      const economicLabel = document.querySelector('label[for="economic_returns"]');
      if (economicLabel) economicLabel.textContent = translationsData[language].economicReturnsLabel;
      
      const fineLabel = document.querySelector('label[for="fine_avoidance"]');
      if (fineLabel) fineLabel.textContent = translationsData[language].fineAvoidanceLabel;
      
      const initialLabel = document.querySelector('label[for="initial_investment"]');
      if (initialLabel) initialLabel.textContent = translationsData[language].initialInvestmentLabel;
      
      const intangibleLabel = document.querySelector('label[for="intangible_value"]');
      if (intangibleLabel) intangibleLabel.textContent = translationsData[language].intangibleValueLabel;
      
      const capabilityLabel = document.querySelector('label[for="capability_returns"]');
      if (capabilityLabel) capabilityLabel.textContent = translationsData[language].capabilityReturnsLabel;
      
      const investmentLabel = document.querySelector('label[for="investment_cost"]');
      if (investmentLabel) investmentLabel.textContent = translationsData[language].investmentCostLabel;
      
      // Update other elements that exist in the main template
      const pageTitle = document.getElementById('page-title');
      if (pageTitle) pageTitle.textContent = translationsData[language]['title'];
      
      const readPaper = document.getElementById('read-paper');
      if (readPaper) readPaper.textContent = translationsData[language]['readPaper'];
      
      const returnCalc = document.getElementById('return-calculator');
      if (returnCalc) returnCalc.textContent = translationsData[language]['returnToCalculator'];
      
      const hroeFormula = document.getElementById('hroeformula');
      if (hroeFormula) hroeFormula.textContent = translationsData[language].hroeformula;
      
      const economic = document.getElementById('economic');
      if (economic) economic.textContent = translationsData[language]['economic'];
      
      const intangible = document.getElementById('intangible');
      if (intangible) intangible.textContent = translationsData[language]['intangible'];
      
      const capabilities = document.getElementById('capabilities');
      if (capabilities) capabilities.textContent = translationsData[language]['capabilities'];
      
      const generatePDF = document.getElementById('generatePDFButton');
      if (generatePDF) generatePDF.innerHTML = translationsData[language].generatePDF;
      
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