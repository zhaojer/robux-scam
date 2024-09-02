// Vue.js file for Landing Page

const { createApp } = Vue

createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  methods: {
    openAgeRestrictionModal: function () {
      let ageRestriction = new bootstrap.Modal(document.getElementById("age-restriction"));
      ageRestriction.show();
    },
  }
}).mount('#landing-page')
