// Vue.js file for Landing Page

const { createApp } = Vue

createApp({
  data() {
    return {
      // onscreen varaibles
      robux: 1000000,
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
    }
  },
  methods: {
    makeWheel: function () {
      // src: https://codepen.io/sumeshkp18/pen/VGBPYg?editors=1010
      let padding = { top: 0, right: 20, bottom: 0, left: 20 },
        w = 500 - padding.left - padding.right,
        h = 500 - padding.top - padding.bottom,
        r = Math.min(w, h) / 2,
        color = d3.scale.category20();
      // svg tag, all drawings go inside
      console.log(this.data);
      let svg = d3.select('#chart')
        .append("svg")
        .data([this.data])
        .attr("width", w + padding.left + padding.right)
        .attr("height", h + padding.top + padding.bottom);
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
        .attr("stroke", function (d, i) {
          if (i === 0 || i === 4 || i === 8) {
            return "gold";
          }
        })
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
            return "1.3em";
          }
        })
        .attr("fill", function (d, i) {  // text color
          if (i === 0) {
            return "#ff0066";
          }
          if (i === 4) {
            return "yellow";
          }
          if (i === 8) {
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
      ++this.currentIteration;
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
          //mark slice as picked
          d3.select(".slice:nth-child(" + (picked + 1) + ") path")
            .attr("fill", "#111");
          //TODO: display pop-up here
          let myModal = new bootstrap.Modal(document.getElementById("more-chances"));
          myModal.show();

          // start at the oldrotation position when spinning again
          this.oldrotation = rotation;
          // can only spin 3 times
          if (this.currentIteration <= 3) {
            this.spinButton.on("click", this.spinWheel);
          }
        });
    },
    copy: function() {
        // Get the text field
        let copyText = document.getElementById("myInput");
        // Select the text field
        copyText.select();
        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
        // Alert the copied text
        alert("Copied the text: " + copyText.value);
    }
  },
  mounted() {
    this.makeWheel();
  }
}).mount('#lottery-page')
