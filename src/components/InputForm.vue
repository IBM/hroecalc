<template>
  <div>
    <div class="form-group" style="margin-top: 20px;">
      <label id="yrs" for="years">Number of Years:</label>
      <input v-model='years' type="number" id="years" min="1"
          class="field-to-check" @focus="highlightFormula('years'); updateExplanation('years')"
          @mouseover="highlightFormula('years'); updateExplanation('years')"
          @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
          onchange="moveToNextInput(event)"
      >
    </div>
    <div class="form-group">
      <label id="costcap" for="discount">Cost of Capital (Discount Rate):</label>
      <input v-model="discount" type="number" step="0.01" id="discount" min="0" max="1" class="field-to-check"
          @focus="highlightFormula('discount'); updateExplanation('discount')"
          @input="highlightFormula('discount'); updateExplanation('discount');"
          @mouseover="highlightFormula('discount'); updateExplanation('discount')"
          @mouseout="clearExplanation()" onkeydown="moveToNextInput(event);"
          onchange="moveToNextInput(event)">
    </div>
    
    <fieldset class="field-group">
      <legend id="investments">Investments</legend>
      <div class="form-group">
        <label for="initial_investment">Initial Investment (in millions):</label>
        <input type="number" step="0.1" id="initial_investment" min="0"
            class="field-to-check"
            @focus="highlightFormula('initial_investment'); updateExplanation('initial_investment');"
            oninput="highlightFormula('initial_investment'); updateExplanation('initial_investment');"
            @mouseover="highlightFormula('initial_investment'); updateExplanation('initial_investment')"
            @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
            onchange="moveToNextInput(event)"
            v-model="initialInvestment">
      </div>
      <div class="form-group">
        <label for="investment_cost">Cost for Capabilities (in millions per year, comma-separated):</label>
        <input type="text" id="investment_cost"
            class="field-to-check"
            pattern="^-?[0-9,]*$"
            @focus="highlightFormula('investment_cost'); updateExplanation('investment_cost')"
            @mouseover="highlightFormula('investment_cost'); updateExplanation('investment_cost')"
            @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
            v-model="capabilityCosts"
            :style="fieldValidationStyles.capabilityCosts || {}"
        >
      </div>
    </fieldset>

    <fieldset class="field-group">
      <legend id="returns">Returns</legend>
      
      <!-- Economic Returns Section -->
      <fieldset class="field-group">
        <legend id="economic">Economic Returns</legend>
        <div class="form-group">
          <label for="org_revenues">Organizational Revenue <br/>(in millions per year, comma-separated):</label>
          <input type="text" id="org_revenues"
              pattern="^-?[0-9,]*$"
              @focus="highlightFormula('economic_returns'); updateExplanation('economic_returns');"
              @mouseover="highlightFormula('economic_returns'); updateExplanation('economic_returns')"
              @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
              v-model="orgRevenues"
          >
        </div>
        <div class="form-group">
          <label for="fine_avoidance">Fine Avoidance Value (in % per year, comma-separated):</label>
          <input type="text" id="fine_avoidance"
              pattern="^-?[0-9,]*$"
              @focus="highlightFormula('fine_avoidance'); updateExplanation('fine_avoidance')"
              @mouseover="highlightFormula('fine_avoidance'); updateExplanation('fine_avoidance')"
              @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
              v-model="fineAvoidanceValues"
          >
        </div>
        <div class="form-group">
          <label for="calc_economic_returns">Economic Return <br/>(<em>in millions calculated as Revenue * Fine Avoidance %</em>)</label>
          <input 
            type="text"
            id="calc_economic_returns"
            class="field-to-check"
            readonly
            v-model="economicReturns"
            :style="fieldValidationStyles.economicReturns || {}"
          >
        </div>
      </fieldset>
      
      <!-- Reputational Returns Section -->
      <a id="toggleReputationalIcon"
          @click="$emit('toggle-blur', 'reputationalReturnsFieldset')"><img
              class="toggleFormulaIcon svgimage" src="/icons/power.svg"></a>
      <fieldset id="reputationalReturnsFieldset" class="field-group">
        <legend id="intangible">Reputational Returns</legend>
        <div class="form-group">
          <label for="intangible_value">Intangible Returns (in millions per year, comma-separated):</label>
          <input type="text" id="intangible_value"
              class="field-to-check"
              pattern="^-?[0-9,]*$"
              @focus="highlightFormula('intangible_value'); updateExplanation('intangible_value')"
              @mouseover="highlightFormula('intangible_value'); updateExplanation('intangible_value')"
              onchange="updateExplanation('intangible_value')"
              @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
              v-model="reputationalReturns"
              :style="fieldValidationStyles.reputationalReturns || {}"
          >
        </div>
      </fieldset>
      
      <!-- Capability Returns Section -->
      <a id="toggleCapabilitiesIcon"
          @click="$emit('toggle-blur', 'capabilitiesReturnsFieldset')"><img
              class="toggleFormulaIcon svgimage" src="/icons/power.svg"></a>
      <fieldset id="capabilitiesReturnsFieldset" class="field-group">
        <legend id="capabilities">Returns on Capabilities</legend>
        <div class="form-group">
          <label for="capability_returns">Capability Returns (in millions per year, comma-separated):</label>
          <input type="text" id="capability_returns"
              class="field-to-check"
              pattern="^-?[0-9,]*$"
              @focus="highlightFormula('capability_returns'); updateExplanation('capability_returns')"
              @mouseover="highlightFormula('capability_returns'); updateExplanation('capability_returns')"
              @mouseout="clearExplanation()" onkeydown="moveToNextInput(event)"
              v-model="capabilityReturns"
              :style="fieldValidationStyles.capabilityReturns || {}"
            >
        </div>
      </fieldset>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'InputForm',
  props: {
    years: [Number, String],
    discount: [Number, String],
    initialInvestment: [Number, String],
    capabilityCosts: String,
    orgRevenues: String,
    fineAvoidanceValues: String,
    economicReturns: String,
    reputationalReturns: String,
    capabilityReturns: String,
    fieldValidationStyles: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'update:years',
    'update:discount',
    'update:initialInvestment',
    'update:capabilityCosts',
    'update:orgRevenues',
    'update:fineAvoidanceValues',
    'update:economicReturns',
    'update:reputationalReturns',
    'update:capabilityReturns',
    'toggle-blur'
  ]
}
</script>