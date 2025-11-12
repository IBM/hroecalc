<script>
export default {
  name: 'FloatingExplanationPanel',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    mouseX: {
      type: Number,
      default: 0
    },
    mouseY: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      panelWidth: 350,
      panelHeight: 0,
      offset: 0
    }
  },
  computed: {
    panelStyle() {
      if (!this.visible || !this.content) return { display: 'none' };
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      
      // Convert page coordinates to viewport coordinates for positioning
      let left = this.mouseX + this.offset;
      let top = this.mouseY + this.offset;
      
      // Get viewport boundaries considering scroll
      const viewportLeft = scrollX;
      const viewportRight = scrollX + viewportWidth;
      const viewportTop = scrollY;
      const viewportBottom = scrollY + viewportHeight;
      
      // Prevent going off screen horizontally
      if (left + this.panelWidth > viewportRight - 10) {
        left = this.mouseX - this.panelWidth - this.offset;
      }
      if (left < viewportLeft + 10) {
        left = viewportLeft + 10;
      }
      
      // Prevent going off screen vertically
      if (this.panelHeight > 0 && top + this.panelHeight > viewportBottom - 10) {
        top = this.mouseY - this.panelHeight - this.offset;
      }
      if (top < viewportTop + 10) {
        top = viewportTop + 10;
      }
      
      return {
        position: 'absolute',
        left: `${Math.round(left)}px`,
        top: `${Math.round(top)}px`,
        zIndex: 1000,
        pointerEvents: 'none'
      };
    }
  },
  mounted() {
    this.updatePanelDimensions();
  },
  updated() {
    this.updatePanelDimensions();
  },
  methods: {
    updatePanelDimensions() {
      this.$nextTick(() => {
        if (this.$refs.panel) {
          this.panelHeight = this.$refs.panel.offsetHeight;
        }
      });
    },
    
    // Debugging method - can be removed later
    debugPosition() {
      console.log('Mouse position:', this.mouseX, this.mouseY);
      console.log('Viewport size:', window.innerWidth, window.innerHeight);
      console.log('Panel dimensions:', this.panelWidth, this.panelHeight);
    }
  }
}
</script>

<template>
  <div 
    v-if="visible && content"
    ref="panel"
    class="floating-explanation-panel"
    :style="panelStyle"
    v-html="content"
  ></div>
</template>

<style scoped>
.floating-explanation-panel {
  width: 350px;
  max-width: 350px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  pointer-events: none; /* Allow mouse events to pass through */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.floating-explanation-panel :deep(h3) {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: #2c3e50;
}

.floating-explanation-panel :deep(p) {
  margin: 8px 0;
}

.floating-explanation-panel :deep(.varvalue) {
  font-weight: bold;
  color: #e74c3c;
  background-color: #f8f9fa;
  padding: 1px 4px;
  border-radius: 3px;
}

.floating-explanation-panel :deep(strong) {
  color: #2c3e50;
}

.floating-explanation-panel :deep(em) {
  font-style: italic;
  color: #666;
}

/* Animation */
.floating-explanation-panel {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>