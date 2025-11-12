<script>
import hroeLinks from "@/scripts/hroe-links.js";
import translationsData from "@/scripts/hroe-translations.js";

export default {
  name: "HelpModal",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentLanguage: {
      type: String,
      default: 'en'
    }
  },
  data() {
    return {
      hroeLinks
    };
  },
  computed: {
    helpPopupTitle() {
      return translationsData[this.currentLanguage].helpPopupTitle;
    },
    helpPopupContent() {
      return translationsData[this.currentLanguage].helpPopupContent;
    },
    helpPopupSignature() {
      return translationsData[this.currentLanguage].helpPopupSignature;
    }
  },
  methods: {
    closeHelp() {
      this.$emit('close');
    }
  }
}
</script>

<template>
  <div id="helpPopup" v-show="visible">
      <button id="closeHelp" @click="closeHelp()">
          <img src='/icons/close--large.svg'>
      </button>
      <h2 id="helpPopupTitle" v-html="helpPopupTitle"></h2>
      <div id="helpPopupContent"
          style="max-height: 600px; overflow-y: scroll; font-size:18px; padding: 20px; padding-top:0px;background-color:#fefeff;">
          
          <!-- About the Calculator Section -->
          <h3 style="color: #333; margin-top: 0;">About This Calculator</h3>
          <div v-html="helpPopupContent"></div>
          
          <hr style="margin: 30px 0; border: 1px solid #ddd;">
          
          <!-- Copyright and Disclaimer Section -->
          <div style="margin-bottom: 20px;">
              <img src="/icons/ibm-logo.png" style="display:inline;height:30px; width:70px">
              <h3 style="display: inline; margin-left: 10px;">Copyright &copy; IBM Corporation, 2024</h3>
          </div>
          <p>
            This HROE Framework Calculator ("Calculator") is an implementation of the research
            undertaken jointly by IBM and the University of Notre Dame through the Notre Dame-IBM
            Technology Ethics Lab. Read the research paper (<a href="https://arxiv.org/pdf/2309.13057" target="_blank" rel="noopener noreferrer">https://arxiv.org/pdf/2309.13057</a>).</p>
          <p>
            The use of the Calculator is based on return-on-investment (ROI) concepts and formulas that
            reflect factors in AI ethics principles, regulatory requirements, and industry standards at
            the time of publication. Such factors may evolve and change over time. Users should review
            that the implementation of the Calculator remains current for factors related to their use
            case.</p>
          <p>
            Users are solely responsible for the content they input and for use of the results generated
            by the Calculator. Results will vary depending on user input, and reflect
            stakeholder-specific perspectives for potential return relative to the ethical investments
            analyzed. Neither IBM nor the University of Notre Dame make any warranty that such results
            will be achieved.</p>

          <h3 style="color: #333; margin-top: 20px; margin-bottom: 15px;">Additional Reference Materials:</h3>
          <ul style="list-style-type: none; padding-left: 0;">
            <li 
              v-for="(link, index) in hroeLinks"
              :key="index"
              style="margin-bottom: 10px;"
            >
              <strong v-if="link.source">{{ link.source }}:</strong>
              <br>
              <a 
                :href="link.link" 
                target="_blank" 
                rel="noopener noreferrer"
                style="color: #0066cc; text-decoration: none; font-size: 16px;"
                @mouseover="$event.target.style.textDecoration = 'underline'"
                @mouseout="$event.target.style.textDecoration = 'none'"
              >
                {{ link.title }}
              </a>
            </li>
          </ul>
      </div>
      <div id="helpPopupSignature" class="signature-box" v-html="helpPopupSignature">
      </div>
  </div>
</template>

<style scoped>
#helpPopup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    max-width: 900px;
    max-height: 80vh;
    background-color: white;
    border: 3px solid black;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    overflow: hidden;
}

#closeHelp {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1001;
}

#closeHelp img {
    width: 24px;
    height: 24px;
}

#helpPopupTitle {
    background-color: #f0f0f0;
    margin: 0;
    padding: 15px 20px;
    border-bottom: 1px solid #ccc;
    font-size: 20px;
    color: #333;
}

#helpPopupContent {
    padding: 20px;
    background-color: #fefeff;
}

.note-box {
    background-color: #f9f9f9;
    border-left: 4px solid #0066cc;
    padding: 15px;
    margin: 20px 0;
    font-style: italic;
}

.signature-box {
    background-color: #f0f0f0;
    padding: 10px 20px;
    border-top: 1px solid #ccc;
    text-align: center;
    font-size: 14px;
    color: #666;
}
</style>