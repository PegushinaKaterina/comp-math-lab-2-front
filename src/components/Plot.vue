<template>
  <div ref="plotRef"></div>
</template>

<script>
import functionPlot from "function-plot";
import {right} from "core-js/internals/array-reduce";

export default {
  props: {
    fnProp: {
      type: String,
      default: "x^3 + 2x^2 - 2x - 3"
    },
    derivativeProp: {
      type: String,
      default: "3*x^2 + 4x - 2"
    },
    leftProp: {
      type: Number,
      default: -5
    },
    rightProp: {
      type: Number,
      default: 5
    }

  },
  mounted() {
    this.updatePlot(this.fnProp, this.derivativeProp, this.leftProp, this.rightProp)
  },
  watch: {
    fnProp: function (){
      this.updatePlot(this.fnProp, this.derivativeProp, this.leftProp, this.rightProp)
    },
    leftProp: function (){
      this.updatePlot(this.fnProp, this.derivativeProp, this.leftProp, this.rightProp)
    },
    rightProp: function (){
      this.updatePlot(this.fnProp, this.derivativeProp, this.leftProp, this.rightProp)
    }

  },
  methods: {
    updatePlot(fn, derivative, left, right) {
      console.log(this.$refs.plotRef)
      functionPlot({
        target: this.$refs.plotRef,
        width: 500,
        height: 600,
        grid: true,
        xAxis: { domain: [left, right] },
        data: [
          {
            fn: fn,
            derivative: {
              fn: derivative,
              updateOnMouseMove: true
            }
          }
        ]
      });
    }
  }
}

</script>

<style scoped>

</style>