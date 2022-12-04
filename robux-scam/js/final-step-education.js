// Vue.js file for Landing Page

const { createApp } = Vue

createApp({
  data() {
    return {
      popoverList: [],
      toastList: [],

      completePopup: {},

      // track the number of clicks for each popover
      numWarningClick: 0,
      numDownloadClick: 0,
      numSubmitClick: 0
    }
  },

  methods: {
    checkCompletion: function () {
      if (this.numWarningClick >= 2 && this.numDownloadClick >= 2 && this.numSubmitClick >= 2) {
        console.log("done");
        this.completePopup = new bootstrap.Modal(document.getElementById("proceed"));
        this.completePopup.show();
        return;
      }
      let count = 0;
      if (this.numWarningClick >= 2) {
        ++count;
      }
      if (this.numDownloadClick >= 2) {
        ++count;
      }
      if (this.numSubmitClick >= 2) {
        ++count;
      }
      this.toastList[count - 1].show();
    },

    WarningClick: function () {
      this.numWarningClick += 1;
      if (this.numWarningClick % 2 === 0) {
        setTimeout(this.checkCompletion, 500);
      }
    },

    DownloadClick: function () {
      this.numDownloadClick += 1;
      if (this.numDownloadClick % 2 === 0) {
        setTimeout(this.checkCompletion, 500);
      }
    },

    SubmitClick: function () {
      this.numSubmitClick += 1;
      if (this.numSubmitClick % 2 === 0) {
        document.getElementById("return").disabled = false;
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

    $('#tooltip').data('bs.tooltip').options.placement = 'right';
  }
}).mount('#final-step')
