<template>
  <div class="card-top-right">

    <div class="memory-menu-container">
      <a class="erase-form-text svgimage" @click="$emit('erase-form')"><img src="/icons/erase.svg"
          data-tooltip-key="eraseForm" data-tooltip="Erase Form"
          data-tooltip-type="regular"></a>&nbsp;
      <a class="erase-form-text svgimage" @click="$emit('delete-local-storage')"><img
          src="/icons/trash-can.svg" data-tooltip-key="deleteDefault"
          data-tooltip="Delete Default Form"
          data-tooltip-type="regular"></a>&nbsp;&nbsp;&nbsp;
      <a class="svgimagedisabled"><img src="/icons/settings--edit.svg"
          data-tooltip-key="futureFeature"
          data-tooltip="<strong>--- FUTURE FEATURE ---</strong><br/>Configure Input Sources"
          data-tooltip-type="warning"></a>

      <div class="populate-container">

        <a class="populate-icon svgimage" @click="$emit('populate-example', 'first')"><img
            src="/icons/page--first.svg" data-tooltip-key="firstExample"
            data-tooltip="First Example (discussed in the paper)"
            data-tooltip-type="regular"></a>&nbsp;&nbsp;&nbsp;
        <a class="populate-icon svgimage" @click="$emit('populate-example', 'left')"><img
            src="/icons/triangle--left--outline.svg" data-tooltip-key="previousExample"
            data-tooltip="Previous Example"
            data-tooltip-type="regular"></a>&nbsp;&nbsp;&nbsp;

        <div id="exampleMessage">&nbsp;</div>
        <a class="populate-icon svgimage" @click="$emit('populate-example', 'right')"><img
            src="/icons/triangle--right--outline.svg" data-tooltip-key="nextExample"
            data-tooltip="Next Example"
            data-tooltip-type="regular"></a>&nbsp;&nbsp;&nbsp;
        <a class="populate-icon svgimage" @click="$emit('populate-example', 'last')"><img
            src="/icons/page--last.svg" data-tooltip-key="lastExample"
            data-tooltip="Last Example" data-tooltip-type="regular"></a>
      </div>

      <a class="save-memory-text svgimage" @click="$emit('save-to-memory')"><img src="/icons/save.svg"
          data-tooltip-key="saveDefault" data-tooltip="Save Values as Default"
          data-tooltip-type="regular"></a>
      <a class="save-memory-text svgimage" @click="$emit('show-toolbar-help')"><img
          src="/icons/help.svg" data-tooltip-key="helpToolbar"
          data-tooltip="Help With This Toolbar" data-tooltip-type="regular"></a>

    </div>

    <div
      class="startupMessageOverlay"
      id="startupMessageOverlay"
      v-if="showStartupMessage"
    >
      <div class="startupMessageExcl1 blinkingText">&#10071;</div>
      <div class="startupMessageText">
        <div class="startupMessageLine1">To get started, fill out the form below or click
            the</div>
        <div class="startupMessageLine2">controls above to navigate through examples.</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CalculatorToolbar',
  props: {
    showStartupMessage: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'erase-form',
    'delete-local-storage', 
    'populate-example',
    'save-to-memory',
    'show-toolbar-help'
  ]
}
</script>