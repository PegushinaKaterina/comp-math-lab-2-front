<template>
  <div
    class="app">
    <div class="header">
      <h2>Решение нелинейных уравнений</h2>
    </div>
    <div class="main">
      <div class="userInput appElement">
        <equation-form class="form"
                       @changeEquation="changeEquation"
                       @changeLeft="changeLeft"
                       @changeRight="changeRight"
                       @solve="solve"
                       @reset="reset"
                       @error="error"
        />
      </div>
      <div class="plot appElement">
        <plot :fnProp="fn" :derivativeProp="derivative" :leftProp="left" :rightProp="right"/>
      </div>

      <div v-if="errorMessage == ''" class="result appElement">
        <br>
        Найденный корень уравнения:
        {{x}}
        <br><br>
        Значение функции в корне:
        {{y}}
        <br><br>
        Число итераций:
        {{numberOfIterations}}
      </div>
      <div v-else class="result appElement">
        <br>
        {{errorMessage}}
      </div>
    </div>
  </div>
</template>

<script>
import EquationForm from "@/components/EquationForm.vue";
import Plot from "@/components/Plot.vue";

export default {
  components: {
    Plot,
    EquationForm,
  },
  name: "App",
  data() {
    return {
      fn: "x^3 + 2x^2 - 2x - 3",
      derivative: "3x^2 + 4x - 2",
      left: -5,
      right: 5,
      eps: 0.1,
      x: '',
      y: '',
      numberOfIterations : '',
      errorMessage: '',
    };
  },
  methods: {
    changeEquation(equation) {
      if (equation === 1){
        this.fn = "x^3 + 2x^2 - 2x - 3";
        this.derivative = "3x^2 + 4x - 2";
      } else if (equation === 2){
        this.fn = "x^5 - 3x^3 - x + 2";
        this.derivative = "5x^4 - 9x^2 - 1";
      } else if (equation === 3){
        this.fn = "-x^3 + x^2 - log(x^2) + 3sin(x)";
        this.derivative = "-3x^2 + 2x - 2/x +3cos(x)";
      }
    },
    changeLeft(left) {
      this.left = left
    },
    changeRight(right) {
      this.right = right
    },
    solve(data) {
      console.log(data)
      this.x = data.x
      this.y = data.y
      this.numberOfIterations = data.numberOfIterations
      this.errorMessage = ''
    },
    reset(equation, left, right) {
      this.changeEquation(equation)
      this.changeLeft(left)
      this.changeRight(right)
    },
    error(errorMessage) {
      this.errorMessage = errorMessage;
    },
  },
};
</script>


<style scoped>
*:global(*) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-radius: 7px;
  background-color: #d7d4c9;
  font-family: "Courier New";
  font-weight: bolder;
  color: black;
}

.app {
  width: 100%;
  padding: var(--padding-size);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  --text-size: 15px;
  --text-size-header: 40px;
  --padding-size: 5px;
  --button-size: 110px;
  --button-padding-size: 5px;
  --element-form-text-size: 15px;
}
.main {
  font-size: var(--text-size);
  display: flex;
  justify-content: space-evenly;
  margin:20px;
  padding: 20px;
  flex-direction: row;
}

.header {
  width: 100%;
  text-align: center;
  font-size: var(--text-size-header);
  margin: 50px 0px 20px 0px;
}
.result{
  width: 300px;
  display: flex;
  flex-direction: row;
}

.appElement{

  height: 650px;
  margin: 20px;
  padding: 20px;
  border: 1.5px solid black;
  display: flex;
  flex-direction: column;
}
.userInput {
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  --button-size: 130px;
  --button-padding-size: 10px;
  --element-form-text-size: 15px;
}
.plot {
  width: 550px;
  margin: auto;
}
</style>

