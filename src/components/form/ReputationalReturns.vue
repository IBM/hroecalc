<template>
  <div>
    <a id="toggleReputationalIcon"
        @click="toggleBlur('reputationalReturnsFieldset')"><img
            class="toggleFormulaIcon svgimage" src="/icons/power.svg"></a>
    <fieldset id="reputationalReturnsFieldset" class="field-group">
        <legend id="intangible">Reputational Returns</legend>

        <div class="form-group">
            <label for="intangible_value">
              Intangible Returns:
              <br/>
              <span class="label-secondary">in millions per year, comma-separated</span>
            </label>
            <input 
                type="text" 
                id="intangible_value"
                class="field-to-check"
                pattern="^-?[0-9,]*$"
                :value="reputationalReturns"
                @input="updateReputationalReturns"
                @focus="handleFocus('intangible_value')"
                @mouseover="handleMouseover('intangible_value')"
                @change="handleChange('intangible_value')"
                @mouseout="handleMouseout"
                @keydown="handleKeydown"
                :style="fieldValidationStyles.reputationalReturns || {}"
            >
        </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'ReputationalReturns',
  props: {
    reputationalReturns: {
      type: String,
      default: ''
    },
    fieldValidationStyles: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'update:reputationalReturns',
    'focus-field',
    'update-explanation', 
    'clear-explanation',
    'move-to-next-input',
    'toggle-blur'
  ],
  methods: {
    updateReputationalReturns(event) {
      this.$emit('update:reputationalReturns', event.target.value);
    },
    handleFocus(field) {
      this.$emit('focus-field', field);
      this.$emit('update-explanation', field);
    },
    handleMouseover(field) {
      this.$emit('focus-field', field);
      this.$emit('update-explanation', field);
    },
    handleChange(field) {
      this.$emit('update-explanation', field);
    },
    handleMouseout() {
      this.$emit('clear-explanation');
    },
    handleKeydown(event) {
      this.$emit('move-to-next-input', event);
    },
    toggleBlur(fieldsetId) {
      this.$emit('toggle-blur', fieldsetId);
    }
  }
}
</script>

<style scoped>
/* Component-specific styles can be added here if needed */
</style>