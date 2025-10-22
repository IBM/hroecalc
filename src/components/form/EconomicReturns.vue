<template>
  <fieldset class="field-group">
    <legend id="economic">Economic Returns</legend>
    <div class="form-group">
      <label for="org_revenues">Organizational Revenue <br/>(in millions per year,
          comma-separated):</label>
      <input type="text" id="org_revenues"
          pattern="^-?[0-9,]*$"
          @focus="handleFocus('economic_returns')"
          @mouseover="handleMouseover('economic_returns')"
          @mouseout="handleMouseout" 
          @keydown="handleKeydown"
          :value="orgRevenues"
          @input="handleOrgRevenuesInput"
      >
    </div>
    <div class="form-group">
      <label for="fine_avoidance">Fine Avoidance Value (in % per year,
          comma-separated):</label>
      <input type="text" id="fine_avoidance"
          pattern="^-?[0-9,]*$"
          @focus="handleFocus('fine_avoidance')"
          @mouseover="handleMouseover('fine_avoidance')"
          @mouseout="handleMouseout" 
          @keydown="handleKeydown"
          :value="fineAvoidanceValues"
          @input="handleFineAvoidanceInput"
      >
    </div>
    <div class="form-group">
      <label for="calc_economic_returns">Economic Return <br/>(<em>in millions calculated as Revenue * Fine Avoidance %</em>)</label>
      <input 
        type="text"
        id="calc_economic_returns"
        class="field-to-check"
        readonly
        :value="calculatedEconomicReturns || economicReturns"
        :style="fieldValidationStyles.economicReturns || {}"
      >
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'EconomicReturns',
  props: {
    orgRevenues: {
      type: String,
      default: ''
    },
    fineAvoidanceValues: {
      type: String,
      default: ''
    },
    economicReturns: {
      type: String,
      default: ''
    },
    fieldValidationStyles: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      calculatedEconomicReturns: ""
    }
  },
  mounted() {
    console.log('EconomicReturns component mounted with props:', {
      orgRevenues: this.orgRevenues,
      fineAvoidanceValues: this.fineAvoidanceValues,
      economicReturns: this.economicReturns
    });
    // Calculate initial economic returns
    this.calculateEconomicReturns();
  },
  watch: {
    orgRevenues: {
      handler() {
        console.log('orgRevenues changed to:', this.orgRevenues);
        this.calculateEconomicReturns();
      }
    },
    fineAvoidanceValues: {
      handler() {
        console.log('fineAvoidanceValues changed to:', this.fineAvoidanceValues);
        this.calculateEconomicReturns();
      }
    }
  },
  emits: [
    'update:orgRevenues',
    'update:fineAvoidanceValues',
    'update:economicReturns',
    'focus-field',
    'update-explanation',
    'clear-explanation',
    'move-to-next-input'
  ],
  methods: {
    handleOrgRevenuesInput(event) {
      this.$emit('update:orgRevenues', event.target.value);
    },
    handleFineAvoidanceInput(event) {
      this.$emit('update:fineAvoidanceValues', event.target.value);
    },
    calculateEconomicReturns() {
      console.log('EconomicReturns calculateEconomicReturns called with:', {
        orgRevenues: this.orgRevenues,
        fineAvoidanceValues: this.fineAvoidanceValues
      });
      
      if (!this.orgRevenues || !this.fineAvoidanceValues || 
          this.orgRevenues.trim() === '' || this.fineAvoidanceValues.trim() === '') {
        console.log('Clearing economic returns - no data');
        this.calculatedEconomicReturns = "";
        this.$emit('update:economicReturns', "");
        return;
      }
      
      // Split and parse values from revenue and fine avoidance fields
      const revenues = this.orgRevenues.split(',').map(value => parseFloat(value.replace(/,/g, '').trim()));
      const fineAvoidances = this.fineAvoidanceValues.split(',').map(value => parseFloat(value.trim()));

      console.log('Parsed values:', { revenues, fineAvoidances });

      // Determine the maximum number of entries to process
      const maxLength = Math.max(revenues.length, fineAvoidances.length);
      const economicReturns = [];

      // Loop through each index up to the maximum length
      for (let i = 0; i < maxLength; i++) {
        const revenue = revenues[i];
        const fineAvoidance = fineAvoidances[i];

        // Only calculate if both values are valid numbers; otherwise, push "0.00" or an empty string if missing
        if (!isNaN(revenue) && !isNaN(fineAvoidance) && revenue !== undefined && fineAvoidance !== undefined) {
          const calculatedReturn = revenue * (fineAvoidance / 100);
          economicReturns.push(calculatedReturn.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }));
        } else {
          economicReturns.push("0.00"); // Default to "0.00" if there's no corresponding entry in one of the fields
        }
      }

      const result = economicReturns.join(',');
      console.log('EconomicReturns calculateEconomicReturns result:', result);
      
      // Update both the local calculated value and emit to parent
      this.calculatedEconomicReturns = result;
      this.$emit('update:economicReturns', result);
    },
    handleFocus(field) {
      this.$emit('focus-field', field);
      this.$emit('update-explanation', field);
    },
    handleMouseover(field) {
      this.$emit('focus-field', field);
      this.$emit('update-explanation', field);
    },
    handleMouseout() {
      this.$emit('clear-explanation');
    },
    handleKeydown(event) {
      this.$emit('move-to-next-input', event);
    }
  }
}
</script>