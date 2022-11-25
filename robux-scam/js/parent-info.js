// Vue.js file for Parent Info Page

const { createApp } = Vue

createApp({
  data() {
    return {
      form: {
		emailAddress: "",
		name: ""
	  }
    }
  },
  methods: {
    submitForm: async function () {
		try {
			// hardcoded email api server
			const emailAPI = "http://127.0.0.1:5000";
			const emailAddress = this.form.emailAddress;
			const name = this.form.name;

			await fetch(
				`${emailAPI}/api/v1/save/?email=${emailAddress}&name=${name}`,
				{
					method: "POST",
					credentials: "include"
				}
			);
		} catch (e) {
			// do nothing on error or if server is not set up
			console.log(e);
		}
		location.href = "../pages/lottery.html";
    }
  }
}).mount('#parent-info-page')
