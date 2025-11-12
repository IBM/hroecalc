<script>
import HroeCalculator from './HroeCalculator.vue';
import GetAccess from './GetAccess.vue';
export default {
  name: "Home",
  components: {
    HroeCalculator,
    GetAccess,
  },
  data() {
    return {
      allowAccess: false,
    }
  },
}
</script>

<template>
  <div class="home">
    <GetAccess v-if="!allowAccess" @accessCodeValid="allowAccess = true" />
    <HroeCalculator v-else />
  </div>
</template>

<style scoped>
</style>