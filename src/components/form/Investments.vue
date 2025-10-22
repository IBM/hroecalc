<template>
  <fieldset class="field-group">
      <legend id="investments">Investments</legend>
      <div class="form-group">
          <label for="initial_investment">Initial Investment (in millions):</label>
          <input 
              type="number" 
              step="0.1" 
              id="initial_investment" 
              min="0"
              class="field-to-check"
              :value="initialInvestment"
              @input="updateInitialInvestment"
              @focus="handleFocus('initial_investment')"
              @mouseover="handleMouseover('initial_investment')"
              @mouseout="handleMouseout"
              @keydown="handleKeydown"
              @change="handleChange"
          >
      </div>
      <div class="form-group">
          <label for="investment_cost">Cost for Capabilities (in millions per
              year,
              comma-separated):</label>
          <input 
              type="text" 
              id="investment_cost"
              class="field-to-check"
              pattern="^-?[0-9,]*$"
              :value="capabilityCosts"
              @input="updateCapabilityCosts"
              @focus="handleFocus('investment_cost')"
              @mouseover="handleMouseover('investment_cost')"
              @mouseout="handleMouseout"
              @keydown="handleKeydown"
              :style="fieldValidationStyles.capabilityCosts || {}"
          >
      </div>
  </fieldset>
</template>

<script>
export default {
  name: 'Investments',
  props: {
    initialInvestment: {
      type: [String, Number],
      default: ''
    },
    capabilityCosts: {
      type: String,
      default: ''
    },
    fieldValidationStyles: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'update:initialInvestment',
    'update:capabilityCosts',
    'focus-field',
    'update-explanation', 
    'clear-explanation',
    'move-to-next-input'
  ],
  methods: {
    updateInitialInvestment(event) {
      this.$emit('update:initialInvestment', event.target.value);
    },
    updateCapabilityCosts(event) {
      this.$emit('update:capabilityCosts', event.target.value);
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
    },
    handleChange(event) {
      this.$emit('move-to-next-input', event);
    }
  }
}
</script>

<style scoped>
/* Component-specific styles can be added here if needed */
</style>