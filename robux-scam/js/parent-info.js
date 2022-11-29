// Vue.js file for Parent Info Page

const { createApp } = Vue

createApp({
  data() {
    return {
      form: {
        emailAddress: "",
        name: ""
      },
      processModal: {},
      successModal: {},
      failureModal: {},
    }
  },
  methods: {
    submitForm: async function () {
        try {
            // hardcoded email api server
            const emailAPI = "http://127.0.0.1:5000";
            const emailAddress = this.form.emailAddress;
            const name = this.form.name;

            // // show processing modal
            this.processModal = new bootstrap.Modal(document.getElementById('loading'));
            this.processModal.show();

            await fetch(
                `${emailAPI}/api/v1/save/?email=${emailAddress}&name=${name}`,
                {
                    method: "POST",
                    credentials: "include"
                }
            );
        } catch (e) {
            // do nothing on error or if server is not set up
            this.failureModal = new bootstrap.Modal(document.getElementById('failure'));
            this.processModal.hide();
            this.failureModal.show();
            console.log(e);
            return;
        }
        // // show processing modal
        this.successModal = new bootstrap.Modal(document.getElementById('success'));
        this.processModal.hide();
        this.successModal.show();
        // location.href = "../pages/lottery.html";
    }
  }
}).mount('#parent-info-page')
