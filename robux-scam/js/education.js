// Vue.js file for First Education Page

const { createApp } = Vue

createApp({
  data() {
    return {
      show: new Array(12).fill(false),
      showIndex: 0,
      id: 0,
    }
  },

  methods: {
  },

  mounted() {
    this.show[this.showIndex++] = true;
    this.id = setInterval(() => {
        // console.log(this.id);
        if (this.showIndex > 11) {
            clearInterval(this.id);
            return;
        }
        this.show[this.showIndex++] = true
    }, 5000);
  }
}).mount('#education-page')
