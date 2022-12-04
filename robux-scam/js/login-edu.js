// Vue.js file for Landing Page

const { createApp } = Vue

var submitClick = false;

createApp({
  data() {
    return {
      tutorialModal: {},
      completedTutorial: false,
      numTutorialClick: 0,
      // timeStarted: 0,

      popoverList: [],
      toastList: [],
      completePopup: {},

      // track the number of clicks for each popover
      numLogoClick: 0,
      numFormClick: 0,
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
      // this.timeStarted = Math.floor(Date.now() / 1000);

      setTimeout(() => {
        this.completedTutorial = true;
      }, 50000)
    },

    updateTutorialProgress: function() {
      this.numTutorialClick += 1;
      console.log();
      if (this.numTutorialClick >= 4) {
        this.completedTutorial = true;
      }
    },

    finished: function () {
      // e.preventDefault();
      submitClick = true;
      // location.href = "../pages/landing-edu.html"
    },

    checkCompletion: function () {
      if (this.numLogoClick >= 2 && this.numFormClick >= 2) {
        this.completePopup = new bootstrap.Modal(document.getElementById("proceed"));
        this.completePopup.show();
        return;
      }
      else {
        this.toastList[0].show();
      }
    },

    logoClick: function () {
      this.numLogoClick += 1;
      if (this.numLogoClick % 2 === 0) {
        setTimeout(this.checkCompletion, 500);
      }
    },

    formClick: function () {
      this.numFormClick += 1;
      if (this.numFormClick % 2 === 0) {
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

    setTimeout(this.openTutorial, 250)
  }
}).mount('#login-page')
