// Vue.js file for Parent Info Page

const { createApp } = Vue

createApp({
  data() {
    return {
      completePopup: {},
      // popover list to access the popovers
      popoverList: [],
      toastList: [],
      // number of times clicked per popover
      // this is to determine whether the user has clicked on all of the interactable elements on the page
      numClickedForm: 0,
      numClickedSubmit: 0,
    }
  },
  methods: {
    checkCompletion: function () {
      if (this.numClickedForm >= 2 && this.numClickedSubmit >= 2) {
        console.log("done");
        this.completePopup = new bootstrap.Modal(document.getElementById("proceed"));
        this.completePopup.show();
      }
      else {
        this.toastList[0].show();
      }
    },

    clickForm: function () {
      this.numClickedForm += 1;
      if (this.numClickedForm % 2 === 0) {
        setTimeout(this.checkCompletion, 500);
      }
    },

    submitForm: function () {
      this.numClickedSubmit += 1;
      if (this.numClickedSubmit % 2 === 0) {
        setTimeout(this.checkCompletion, 500);
      }
    },
  },
  mounted() {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    this.popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    });

    const toastElList = [].slice.call(document.querySelectorAll('.toast'))
    this.toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl)
    })

  }
}).mount('#parent-info-page')
