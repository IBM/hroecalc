<template>
  <div>
    <a id="toggleCapabilitiesIcon"
        @click="toggleBlur('capabilitiesReturnsFieldset')"><img
            class="toggleFormulaIcon svgimage" src="/icons/power.svg"></a>

    <fieldset id="capabilitiesReturnsFieldset" class="field-group">
        <legend id="capabilities">Returns on Capabilities</legend>

        <div class="form-group">
            <label for="capability_returns">
              Capability Returns:
              <br/>
              <span class="label-secondary">in millions per year, comma-separated</span>
            </label>
            <input 
                type="text" 
                id="capability_returns"
                class="field-to-check"
                pattern="^-?[0-9,]*$"
                :value="capabilityReturns"
                @input="updateCapabilityReturns"
                @focus="handleFocus('capability_returns')"
                @mouseover="handleMouseover('capability_returns')"
                @mouseout="handleMouseout"
                @keydown="handleKeydown"
                :style="fieldValidationStyles.capabilityReturns || {}"
            >
        </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'CapabilityReturns',
  props: {
    capabilityReturns: {
      type: String,
      default: ''
    },
    fieldValidationStyles: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'update:capabilityReturns',
    'focus-field',
    'update-explanation', 
    'clear-explanation',
    'move-to-next-input',
    'toggle-blur'
  ],
  methods: {
    updateCapabilityReturns(event) {
      this.$emit('update:capabilityReturns', event.target.value);
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
    toggleBlur(fieldsetId) {
      this.$emit('toggle-blur', fieldsetId);
    }
  }
}
</script>

<style scoped>
/* Component-specific styles can be added here if needed */
</style>