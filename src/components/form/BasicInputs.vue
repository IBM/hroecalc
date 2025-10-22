<template>
  <div>
    <div class="form-group" style="margin-top: 20px;">
        <label id="yrs" for="years">Number of Years:</label>
        <input 
            :value="years" 
            @input="updateYears"
            type="number" 
            id="years" 
            min="1"
            class="field-to-check" 
            @focus="handleFocus('years')"
            @mouseover="handleMouseover('years')"
            @mouseout="handleMouseout" 
            @keydown="handleKeydown"
            @change="handleChange"
        >
    </div>
    <div class="form-group">
        <label id="costcap" for="discount">Cost of Capital (Discount Rate):</label>
        <input 
            :value="discount" 
            @input="updateDiscount"
            type="number" 
            step="0.01" 
            id="discount" 
            min="0" 
            max="1" 
            class="field-to-check"
            @focus="handleFocus('discount')"
            @mouseover="handleMouseover('discount')"
            @mouseout="handleMouseout" 
            @keydown="handleKeydown"
            @change="handleChange"
        >
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicInputs',
  props: {
    years: {
      type: [String, Number],
      default: null
    },
    discount: {
      type: [String, Number],
      default: ''
    }
  },
  emits: [
    'update:years',
    'update:discount',
    'focus-field',
    'update-explanation', 
    'clear-explanation',
    'move-to-next-input'
  ],
  methods: {
    updateYears(event) {
      this.$emit('update:years', event.target.value);
    },
    updateDiscount(event) {
      this.$emit('update:discount', event.target.value);
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