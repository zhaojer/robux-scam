// Vue.js file for Landing Page

const { createApp } = Vue

createApp({
  data() {
    return {
      // onscreen varaibles
      robux: 240200,
      chances: 1,
      // data for spining the wheel
      currentIteration: 1,
      data: [
        { "label": "⬡ 3,600 Robux", "value": 1, },
        { "label": "Thank you", "value": 2, },
        { "label": "Thank you", "value": 3, },
        { "label": "Thank you", "value": 4, },
        { "label": "⬡ 7,000 Robux", "value": 5, },
        { "label": "Thank you", "value": 6, },
        { "label": "Thank you", "value": 7, },
        { "label": "Thank you", "value": 8, },
        { "label": "⬡ 10,000 Robux", "value": 9, },
        { "label": "Thank you", "value": 10, },
        { "label": "Thank you", "value": 11, },
        { "label": "Thank you", "value": 12, }
      ],
      spinButton: {},
      vis: {},
      oldrotation: 0,
      oldpick: [],
      // data for lucky users
      currentUser: 0,
      luckyUsers: [
        { "name": "Super Mario", "robux": 7000, "toShow": false },
        { "name": "Toxic Avenger", "robux": 3600, "toShow": false },
        { "name": "No mercy", "robux": 3600, "toShow": false },
        { "name": "Vengeance", "robux": 10000, "toShow": false },
        { "name": "Wolverine", "robux": 3600, "toShow": false },
        { "name": "Maverick", "robux": 7000, "toShow": false },
        { "name": "noobmaster69", "robux": 3600, "toShow": false },
        { "name": "Omega Man", "robux": 3600, "toShow": false },
        { "name": "Zombie Killer", "robux": 3600, "toShow": false },
        { "name": "Butcher", "robux": 3600, "toShow": false },
        { "name": "Billy", "robux": 10000, "toShow": false },
        { "name": "Dreadnaught", "robux": 3600, "toShow": false },
        { "name": "Frostmourne", "robux": 3600, "toShow": false },
        { "name": "Ghostblade", "robux": 3600, "toShow": false },
        { "name": "Godfather", "robux": 7000, "toShow": false },
        { "name": "Batman", "robux": 7000, "toShow": false },
        { "name": "Hello", "robux": 3600, "toShow": false },
        { "name": "Wonderwoman", "robux": 3600, "toShow": false },
        { "name": "Goliath", "robux": 3600, "toShow": false },
        { "name": "beluga", "robux": 3600, "toShow": false },
        { "name": "skittle", "robux": 7000, "toShow": false },
        { "name": "pepper", "robux": 7000, "toShow": false },
        { "name": "teacher", "robux": 3600, "toShow": false },
        { "name": "Pablo", "robux": 10000, "toShow": false },
        { "name": "Lester", "robux": 3600, "toShow": false },
        { "name": "Egg", "robux": 3600, "toShow": false },
        { "name": "Maimerino", "robux": 3600, "toShow": false },
        { "name": "Eugene", "robux": 3600, "toShow": false },
        { "name": "Master Chief", "robux": 10000, "toShow": false },
        { "name": "Big Boss", "robux": 3600, "toShow": false },
        { "name": "Thor", "robux": 3600, "toShow": false },
        { "name": "Ninja", "robux": 7000, "toShow": false },
        { "name": "lol", "robux": 3600, "toShow": false },
        { "name": "Kratos", "robux": 10000, "toShow": false },
        { "name": "Rampage", "robux": 3600, "toShow": false },
        { "name": "Spiderman", "robux": 7000, "toShow": false },
        { "name": "Bulletproof", "robux": 3600, "toShow": false },
        { "name": "Superman", "robux": 3600, "toShow": false },
        { "name": "Clockwerk", "robux": 3600, "toShow": false },
        { "name": "hecker", "robux": 10000, "toShow": false },
      ],
      popoverList: [],
      winModal: {},
      numClicked: 0,
    }
  },
  methods: {
    makeWheel: function () {
      // src: https://codepen.io/sumeshkp18/pen/VGBPYg?editors=1010
      let padding = { top: 0, right: 20, bottom: 0, left: 20 },
        w = 555 - padding.left - padding.right,
        h = 555 - padding.top - padding.bottom,
        r = Math.min(w, h) / 2,
        color = d3.scale.category20();
      // svg tag, all drawings go inside
      let svg = d3.select('#chart')
        .data([this.data])
        .attr("width", w + padding.left + padding.right)
        .attr("height", h + padding.top + padding.bottom)
        .attr('viewBox', [0, 0, w + padding.left + padding.right, h + padding.top + padding.bottom]);
      // define patterns to display Robux image, used later to fill
      let defs = svg.append('svg:defs');
      defs.append("svg:pattern")
        .attr("id", "no-robux-image")
        .attr("width", 624)
        .attr("height", 351)
        .attr("patternUnits", "userSpaceOnUse")
        .append("svg:image")
        .attr("xlink:href", "../static/images/no-robux.jpg")
        .attr("width", 624)
        .attr("height", 351);
      // the wheel
      let container = svg.append("g")
        // .attr("stroke", "gold")
        // .attr("stroke-width", 2)
        .attr("class", "chartholder")
        .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");
      this.vis = container
        .append("g");
      let pie = d3.layout.pie().sort(null).value(function (d) { return 1; });
      // declare an arc generator function
      let arc = d3.svg.arc().outerRadius(r);
      // select paths, use arc generator to draw
      let arcs = this.vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("g")
        .attr("class", "slice");
      // fill background with pattern
      arcs.append("path")
        .attr("fill", function (d, i) {
          if (i === 0 || i === 4 || i === 8) {
            return 'url("#no-robux-image")';
          }
          return color(i);
        })
        .attr("stroke", "gold")
        .attr("stroke-width", 5)
        .attr("d", function (d) { return arc(d); });
      // add the text
      arcs.append("text").attr("transform", function (d) {
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return "rotate(" + ((d.angle * 180 / Math.PI - 90) + 1) + ")translate(" + (d.outerRadius - 10) + ")";
      })
        .attr("text-anchor", "end")
        .text((d, i) => this.data[i].label)
        .attr("font-weight", function (d, i) {
          if (i === 0 || i === 4 || i === 8) {
            return "bolder";
          }
        })
        .attr("font-size", function (d, i) {
          if (i === 0 || i === 4 || i === 8) {
            return "1.2em";
          }
        })
        .attr("stroke", function (d, i) {
          if (i === 0 || i === 4 || i === 8) {
            return "goldenrod";
          }
        })
        .attr("fill", function (d, i) {  // text color
          if (i === 0) {
            return "#ff0066";
          }
          else if (i === 4) {
            return "yellow";
          }
          else if (i === 8) {
            return "#00ff00";
          }
        });
      // make arrow
      svg.append("g")
        .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h / 2) + padding.top) + ")")
        .append("path")
        .attr("d", "M-" + (r * .15) + ",0L0," + (r * .05) + "L0,-" + (r * .05) + "Z")
        .style({ "fill": "black" });
      // draw spin circle
      this.spinButton = container.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 60)
        .style({ "fill": "white", "cursor": "pointer" });
      // append spin text
      container.append("text")
        .attr("x", 0)
        .attr("y", 13)
        .attr("text-anchor", "middle")
        .text("SPIN")
        .style({ "font-weight": "bold", "font-size": "30px", "cursor": "pointer" });
      // declare listener
      this.spinButton.on("click", this.spinWheel);
    },

    spinWheel: function (d) {
      // logic for checking chances remaining
      if (this.chances === 0) {
        // no more chances then show users this popup
        let myModal = new bootstrap.Modal(document.getElementById("more-chances"));
        myModal.show();
        return;
      }
      this.chances -= 1;

      let rotation = 0, picked = 100000;
      this.spinButton.on("click", null);
      //all slices have been seen, all done
      if (this.oldpick.length == this.data.length) {
        this.spinButton.on("click", null);
        return;
      }
      let ps = 360 / this.data.length,
        rng = Math.floor((Math.random() * 1440) + 360);
      // we can rig the wheel by setting this number here
      // rotation is the degree to rotate the wheel by
      // what it lands on after rotation is determined by how many items are display on the wheel
      // since now, there are 12 items, every 30 degree rotation will land on a new item
      // items are displayed in reverse, so [360-15+1, 15] is item 1, [16,  16+30-1] is item 12, ...
      // rotation = (Math.round(rng / ps) * ps);
      console.log(this.currentIteration);
      if (this.currentIteration === 1) {
        rotation = 104;
      }
      else if (this.currentIteration === 2) {
        rotation = 306;
      }
      else {
        rotation = 254;
      }
      rotation += 360; // spin a full circle then stop
      console.log(ps, rng, rotation);
      picked = Math.round(this.data.length - (rotation % 360) / ps);
      picked = picked >= this.data.length ? (picked % this.data.length) : picked;
      // check if currently picked index is already picked
      if (this.oldpick.indexOf(picked) !== -1) {
        d3.select(this).call(this.spinWheel);
        return;
        // else push the currently picked index to oldpick
      } else {
        this.oldpick.push(picked);
      }
      rotation += 90 - Math.round(ps / 2);
      this.vis.transition()
        .duration(4000)
        .attrTween("transform", (to) => {
          let i = d3.interpolate(this.oldrotation % 360, rotation);
          return function (t) {
            return "rotate(" + i(t) + ")";
          };
        })
        .each("end", () => {
          // increment the number of times user has spinned the wheel
          ++this.currentIteration;
          //mark slice as picked
          d3.select(".slice:nth-child(" + (picked + 1) + ") path")
            .attr("fill", "#111");
          // last time: user wins 7000 robux
          if (this.currentIteration === 4) {
            // display win modal
            this.winModal = new bootstrap.Modal(document.getElementById("win-toast"));
            this.winModal.show();
            this.spinButton.on("click", null);
          }
          // 1st time, display pop-up to give them 2 more chances
          else if (this.chances === 0) {
            let myModal = new bootstrap.Modal(document.getElementById("more-chances"));
            myModal.show();
          }

          // start at the oldrotation position when spinning again
          this.oldrotation = rotation;
          // can only spin 3 times
          if (this.currentIteration <= 3) {
            this.spinButton.on("click", this.spinWheel);
          }
        });
    },

    decRobuxOnPage: function () {
      // stop executing this function if there are less than 10000
      if (this.robux <= 10000) {
        return;
      }
      this.robux -= this.luckyUsers[this.currentUser].robux;
    },

    // The maximum is inclusive and the minimum is inclusive
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    showLuckyUsers: function () {
      if (this.currentUser >= this.luckyUsers.length) {
        return;
      }
      this.luckyUsers[this.currentUser].toShow = true;
      setTimeout(() => {
        const el = document.getElementById('lucky-body');
        if (el) {
          el.scrollTop = el.scrollHeight;
          console.log(el.scrollTop, el.scrollHeight);
        }
      }, 0)
      this.decRobuxOnPage();
      this.currentUser += 1;
      setTimeout(this.showLuckyUsers, 30000);
    },

    copy: function () {
      // Get the text field
      let copyText = document.getElementById("myInput");
      // Select the text field
      copyText.select();
      // Copy the text inside the text field
      navigator.clipboard.writeText(copyText.value);
      // Alert the copied text
      alert("Copied the text: " + copyText.value);
    },

    addTwoChances: function () {
      if (this.chances === 0) {
        this.chances += 2;
      }
    },

    rewardClick: function () {
      this.numClicked += 1;
      if (this.numClicked === 1) {
        return;
      }
      this.popoverList[2].hide();
      setTimeout( ()=>this.winModal.hide(), 200);
    },
  },
  mounted() {
    this.makeWheel();
    setTimeout(this.showLuckyUsers, 10000);

    // initialize all tooltips
    let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    this.popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    })
  }
}).mount('#lottery-page')
