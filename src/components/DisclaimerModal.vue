<script>
import hroeLinks from "@/scripts/hroe-links.js";
export default {
  name: "DisclaimerModal",
  data() {
    return {
      hroeLinks,
      selectedLink: ''
    };
  },
  methods: {
    closeDisclaimer() {
      this.$emit('close');
    },
    openLink() {
      if (this.selectedLink) {
        window.open(this.selectedLink, '_blank');
      }
    },
  },
}
</script>

<template>
  <div id="disclaimerModal" class="modal">
    <div class="modal-content">
      <a class="close" id="closeDisclaimer" @click="closeDisclaimer()">
          <img src='/icons/close--large.svg'>
      </a>
      <!-- <span class="close" @click="closeDisclaimer()">&times;</span> -->
      <div><img src="/icons/ibm-logo.png" style="display:inline;height:30px; width:70px">
          <h3>Copyright &copy; IBM Corporation, 2024</h3>
      </div>
      <p>
        This HROE Framework Calculator (“Calculator”) is an implementation of the research
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

      <p>
        Additional reference materials:
        <select 
          id="referenceLinks"
          @change="openLink"
          v-model="selectedLink"
        >
          <option value="">Select...</option>
          <option
            v-for="(link, index) in hroeLinks"
            :key="index"
            :value="link.link">
            {{ link.title }}
          </option>
        </select>
      </p>

    </div>
</div>
</template>

<style scoped>

#disclaimerModal {
    z-index: 1000; /* High enough to display above other elements */
}

.modal {
    position: fixed; 
    z-index: 1000; 
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Modal background */
}

.modal-content {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 3px solid black;
    width: 60%;
    /* border-radius: 10px; */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Shadow for the popup */
}
</style>