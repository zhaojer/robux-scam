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


var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})