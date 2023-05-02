<template>
  <div ref="plotRef"></div>
</template>

<script>
import functionPlot from "function-plot";
import {right} from "core-js/internals/array-reduce";

export default {
  data() {
    return {
      fn: "(-x*x*x + x*x - log(x*x) + 3sin(x))/3",
      derivative: "(-3x^2 + 2x - 2/x +3cos(x))/3"
    }
  },
  props: {
    fnProp: {
      type: String,
      default: "(x^3 + 2x^2 - 2x - 3)/3"
    },
    derivativeProp: {
      type: String,
      default: "(3*x^2 + 4x - 2)/3"
    },
    aProp: {
      type: Number,
      default: 0
    },
  },
  mounted() {
    this.updatePlot(this.fnProp, this.derivativeProp, this.fn, this.derivative, this.aProp)
  },
  watch: {
    fnProp: function (){
      this.updatePlot(this.fnProp, this.derivativeProp, this.fn, this.derivative, this.aProp)
    },
    aProp: function (){
      this.updatePlot(this.fnProp, this.derivativeProp, this.fn, this.derivative, this.aProp)
    },
  },
  methods: {
    updatePlot(fn1, derivative1, fn2, derivative2, a) {
      console.log(this.$refs.plotRef)
      functionPlot({
        target: this.$refs.plotRef,
        width: 500,
        height: 600,
        grid: true,
        xAxis: { domain: [a - 4, a + 4] },
        data: [
          {
            fn: fn1,
            derivative: {
              fn: derivative1,
              updateOnMouseMove: true
            }
          },
          {
            fn: fn2,
            derivative: {
              fn: derivative2,
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