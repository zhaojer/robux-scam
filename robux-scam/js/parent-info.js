// Vue.js file for Parent Info Page

const { createApp } = Vue

createApp({
  data() {
    return {
      form: {
		emailAddress: ""
	  }
    }
  },
  methods: {
    submitForm: async function () {
		try {
			// hardcoded email api server
			const emailAPI = "http://127.0.0.1:5000";
			let emailAddress = this.form.emailAddress;
			await fetch(`${emailAPI}/api/v1/save/?email=${emailAddress}`, {method: "POST", credentials: "include"});
		} catch (e) {
			// do nothing on error or if server is not set up
			console.log(e);
		}
		location.href = "../pages/lottery.html";
    }
  }
}).mount('#parent-info-page')
