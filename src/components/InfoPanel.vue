<script>
import { generateYearlyExplanation } from '@/scripts/hroe.js'
import translationsData from '@/scripts/hroe-translations.js';

export default {
  name: 'InfoPanel',
  props: {
    infoPanelContent: {
      type: String,
      default: 'default'
    },
    errorMessage: {
      type: String,
      default: ''
    },
    currentLanguage: {
      type: String,
      default: 'en'
    }
  },
  watch: {
    currentLanguage(newLang, oldLang) {
      console.log('currentLang', newLang);  
    }
  },
  data() {
    return {
      translationsData
    }
  },
  computed: {
    panelContent() {
      const tag = this.infoPanelContent;
      if (tag === 'default') {
        return translationsData[this.currentLanguage].explanationPanelDefault;
      } else if (tag === 'orgRevenues') {
        const translation = translationsData[this.currentLanguage].explanation;
        return generateYearlyExplanation('org_revenues', translation.economic_returns);
      } else if (tag === 'warning') {
        return this.errorMessage
      } else {
        console.error(`Unknown tag:`, tag);
        return '';
      }
    },
  },
  methods: {
    showModal() {
      this.$emit('showHelpPopup');
    }
  },
}

</script>

<template>
<div 
  :class='["info-panel", infoPanelContent]'
  id="explanationPanelDefault"
>
  <div v-if="infoPanelContent === 'default'">
    <img 
      src="/icons/notification.svg"
      alt="Information Icon" 
      style="width: 24px; height: 24px; position:relative;top:-2px;
      vertical-align: middle;"
    />
    <span v-html="panelContent"></span>
    <a href="#" @click="showModal">Additional Information</a>.
  </div>
  <div 
    v-if="infoPanelContent === 'orgRevenues'"
    v-html="panelContent"
  ></div>
  <div v-if='infoPanelContent === "warning"'>
    <img 
      src="/icons/warning--multiple.svg" 
      alt="Warning Icon" 
      style="width: 24px; height: 24px; position:relative;top:-3px;
      vertical-align: middle;"
    > 
    <div class="warning-message" v-html='panelContent'></div>
    <a href="#" @click="showModal">Additional Information</a>
  </div>
</div>  
</template>

<style scoped>
.info-panel {
  border: 1px solid #ddd;
  border-bottom: 1px solid white;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 12px;
  background-color: rgb(250, 250, 239);
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: #333;
  font-family: Arial, sans-serif;
  min-height: 70px;
  max-height: 70px;
  overflow: scroll;
  vertical-align: bottom;
}

.warning {
  background-color: #FDF9D7;
  /* background-color: #FAF3B0; */
  border-top: 1px solid #ddd;
  border-bottom: 3px solid #ffe57c;
  color: #333;
  height: 100%;
}
</style>