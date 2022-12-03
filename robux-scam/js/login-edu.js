// Vue.js file for Landing Page

const { createApp } = Vue

var submitClick = false;

createApp({
  data() {
    return {
      message: 'hello vue',
      tutorialModal: {},

      popoverList: [],
      toastList: [],

      completePopup: {},

      // track the number of clicks for each popover
      numLogoClick: 0,
      numTitleClick: 0,
      numButtonClick: 0
    }
  },
  methods: {
    preventLeaving: function () {
      // this gets invoked ONLY if user has modified the page somehow, e.g. clicked on the page
      // this is probably some browser thing
      window.addEventListener('beforeunload', function (e) {
        // no need to trigger this function for navigating to the next page
        if (submitClick) {
          console.log("here")
          return undefined;
        }
        e.preventDefault(); //per the standard
        e.returnValue = ''; //required for Chrome
      });
    },

    openTutorial: function() {
      this.tutorialModal = new bootstrap.Modal(document.getElementById("tutorial-modal"));
      this.tutorialModal.show();
    },

    login: function () {
      submitClick = true;
      location.href = "../pages/landing-edu.html"
    },

    checkCompletion: function () {
      if (this.numLogoClick >= 2 && this.numTitleClick >= 2 && this.numButtonClick >= 2) {
        console.log("done");
        this.completePopup = new bootstrap.Modal(document.getElementById("proceed"));
        this.completePopup.show();
        return;
      }
      let count = 0;
      if (this.numLogoClick >= 2) {
        ++count;
      }
      if (this.numTitleClick >= 2) {
        ++count;
      }
      if (this.numButtonClick >= 2) {
        ++count;
      }
      this.toastList[count - 1].show();
    },

    logoClick: function () {
      this.numLogoClick += 1;
      if (this.numLogoClick % 2 === 0) {
        setTimeout(this.checkCompletion, 500);
      }
    },

    titleClick: function () {
      this.numTitleClick += 1;
      if (this.numTitleClick % 2 === 0) {
        setTimeout(this.checkCompletion, 500);
      }
    },

    buttonClick: function () {
      this.numButtonClick += 1;
      if (this.numButtonClick % 2 === 0) {
        setTimeout(this.checkCompletion, 500);
      }
    },
  },

  mounted() {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    this.popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    })

    const toastElList = [].slice.call(document.querySelectorAll('.toast'))
    this.toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl)
    })

    this.preventLeaving();

    setTimeout(this.openTutorial, 1000)
  }
}).mount('#login-page')
