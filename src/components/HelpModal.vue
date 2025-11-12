<script>
import hroeLinks from "@/scripts/hroe-links.js";

export default {
  name: "HelpModal",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hroeLinks
    };
  },
  methods: {
    closeHelp() {
      this.$emit('close');
    },
    togglePanel() {
      this.$emit('toggle-panel');
    }
  }
}
</script>

<template>
  <div id="helpPopup" v-show="visible">
      <button id="closeHelp" @click="closeHelp()">
          <img src='/icons/close--large.svg'>
      </button>
      <h2 id="helpPopupTitle">Holistic Return on AI Ethics Framework Calculator</h2>
      <div id="helpPopupContent"
          style="max-height: 600px; overflow-y: scroll; font-size:18px; padding: 20px; padding-top:0px;background-color:#fefeff;">
          
          <!-- About the Calculator Section -->
          <h3 style="color: #333; margin-top: 0;">About This Calculator</h3>
          <p>Organizations are motivated to implement ethical AI practices for various reasons. For
              example, because they believe it is the right thing to do or to avoid costs such as lawsuits
              and fines. You can use this calculator to estimate your potential returns on AI ethics
              investments, and refer to the paper titled, "The Return on Investment in AI Ethics: A
              Holistic Framework" (<a href="#"
                  @click="togglePanel();">https://arxiv.org/pdf/2309.13057</a>) for a deeper
              understanding of the benefits. The paper proposes a comprehensive approach to understanding
              the returns on investments in AI ethics.</p>
          <p>The Holistic Return on AI Ethics framework considers not only direct economic returns but
              also intangible benefits related to reputation and real options connected to organizational
              capabilities. This framework is designed to help organizations justify their investments in
              AI ethics by demonstrating how these investments can lead to cost savings, revenue
              generation, improved stakeholder perceptions, and enhanced future opportunities.</p>
          <p class="note-box"><strong>Note</strong>: The return on investments in AI ethics and governance
              initiatives should be assessed holistically. While this calculator provides a helpful tool
              for assessing quantifiable returns, a holistic assessment should also include returns and
              impacts that are qualitative in nature. It is important to consider a broad set of
              stakeholders and the impact on society at large during the holistic assessment process.</p>
          
          <p>AI technologies, while beneficial, pose significant ethical challenges such as bias,
              fairness, and privacy concerns. Addressing these issues requires substantial investments,
              which organizations often find difficult to justify without clear evidence of return on
              investment.</p>
          <p>The ROI in AI Ethics framework addresses this gap by integrating economic impacts, such as
              direct
              financial returns and cost avoidance, with intangible impacts, like improved reputation and
              stakeholder trust. Additionally, it includes real options that offer future flexibility and
              adaptability. This approach provides a comprehensive view of how AI ethics investments can
              contribute to an organization's overall success and sustainability, making it easier to
              justify and sustain these critical initiatives.</p>
          <p>In line with this holistic approach, this program uses the formulas provided in the paper to
              calculate the ROI of AI ethics investments over multiple years. This program prompts users
              for inputs related to economic returns, reputational returns, and capability returns for
              each year, as well as the discount factor and initial investment costs.</p>
          <p>By incorporating these variables, the program computes the ROI by discounting future returns
              to their present value and summing up the total returns from economic, reputational, and
              capability investments. This multi-year approach allows organizations to better evaluate the
              long-term benefits of their AI ethics investments, providing a clearer picture of how these
              investments impact their overall performance and strategic flexibility.</p>
          
          <hr style="margin: 30px 0; border: 1px solid #ddd;">
          
          <!-- Copyright and Disclaimer Section -->
          <div style="margin-bottom: 20px;">
              <img src="/icons/ibm-logo.png" style="display:inline;height:30px; width:70px">
              <h3 style="display: inline; margin-left: 10px;">Copyright &copy; IBM Corporation, 2024</h3>
          </div>
          <p>
            This HROE Framework Calculator ("Calculator") is an implementation of the research
            undertaken jointly by IBM and the University of Notre Dame through the Notre Dame-IBM
            Technology Ethics Lab. Read the research paper (<a href="#"
                @click="togglePanel();">https://arxiv.org/pdf/2309.13057)</a>.</p>
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

          <h4 style="color: #333; margin-top: 20px; margin-bottom: 15px;">Additional Reference Materials:</h4>
          <ul style="list-style-type: none; padding-left: 0;">
            <li 
              v-for="(link, index) in hroeLinks"
              :key="index"
              style="margin-bottom: 10px;"
            >
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
      <div id="helpPopupSignature" class="signature-box">
          <strong>Last updated</strong>: August 30, 2024
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