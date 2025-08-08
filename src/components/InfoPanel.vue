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
    }
  },
  data() {
    return {
    }
  },
  methods: {
    panelContent(tag) {
      if (tag === 'default') {
        console.log('Default content loaded');
      } else if (tag === 'orgRevenues') {
        const currentLang = document.getElementById('language').value;
        const translation = translationsData[currentLang].explanation;
        return generateYearlyExplanation('org_revenues', translation.economic_returns);
      } else if (tag === 'warning') {
        return this.errorMessage
      } else {
        console.error(`Unknown tag:`, tag);
        return '';
      }
    },
    showModal() {
      this.$emit('showModal');
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
    The return on investments in AI ethics and governance initiatives should be assessed holistically. While this calculator provides a helpful tool for assessing quantifiable returns, a holistic assessment should also include returns and impacts that are qualitative in nature. It is important to consider a broad set of stakeholders and the impact on society at large during the holistic assessment process.
    <a href="#" @click="showModal">Additional Information</a>.
  </div>
  <div 
    v-if="infoPanelContent === 'orgRevenues'"
    v-html="panelContent(infoPanelContent)"
  ></div>
  <div v-if='infoPanelContent === "warning"'>
    <img 
      src="/icons/warning--multiple.svg" 
      alt="Warning Icon" 
      style="width: 24px; height: 24px; position:relative;top:-3px;
      vertical-align: middle;"
    > 
    <span class="warning-message" v-html=panelContent(infoPanelContent)></span>
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