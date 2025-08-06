<script>
export default {
  name: 'GetAccess',
  data() {
    return {
      accessCode: '',
      errorMessage: ''
    };
  },
  methods: {
    async submitAccessCode() {
      if (this.accessCode.trim() === '') {
        this.errorMessage = 'Access code cannot be empty.';
      } else {
        // API call to validate the access code
        const res = await fetch('https://us-central1-ethical-ai-roi-calculator.cloudfunctions.net/validateAccess', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ accessKey: this.accessCode })
        })
        // Handle response
        console.log('res', res)
        if (!res.ok) {
          this.errorMessage = 'Invalid access code. Please try again.';
          return;
        } else {
          this.$emit('accessCodeValid',true)
        }
      }
    }
  }
};
</script>

<template>
  <div class="get-access">
    <h1>ROI in AI Ethics Framework Calculator</h1>
    <form @submit.prevent="submitAccessCode">
      <div class="form-group">
        <label for="accessCode">Enter Access Code:</label>
        <input
          type="text"
          id="accessCode"
          v-model="accessCode"
          placeholder="Enter your access code"
        />
      </div>
      <button type="submit">Submit</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
.get-access {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>