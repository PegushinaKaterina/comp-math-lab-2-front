<template>
  <div
      class="app">
    <div class="header">
      <h2>Решение систем нелинейных уравнений методом Ньютона</h2>
    </div>
    <div class="main">
      <div class="userInput appElement">
        <system-form class="form"
                       @changeSystem="changeSystem"
                       @solve="solve"
                       @error="error"
        />
      </div>
      <div class="plot appElement">
        <plot-system :fnProp="fn" :derivativeProp="derivative" :a="a"/>
      </div>

      <div v-if="errorMessage == ''" class="result appElement">
        <br>
        Найденный вектор неизвестных: <br>
        x = {{x}}
        <br>
        y = {{y}}
        <br><br>
        Число итераций:
        {{numberOfIterations}}
        <br><br>
        Вектор погрешностей:
        <div v-for="(dx, index) in dxdy">
          Итерация {{index}}: {{dx}} <br>
        </div>
        <br><br>
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
import PlotSystem from "@/components/PlotSystem.vue";
import SystemForm from "@/components/SystemForm.vue";

export default {
  components: {
    SystemForm,
    PlotSystem,
    EquationForm,
  },
  name: "App",
  data() {
    return {
      fn: "(x^3 + 2x^2 - 2x - 3)/3",
      derivative: "(3x^2 + 4x - 2)/3",
      a: 0,
      eps: 0.1,
      x: '',
      y: '',
      numberOfIterations : '',
      dxdy: [],
      errorMessage: ''
    };
  },
  methods: {
    changeSystem(system) {
      if (system === 1){
        this.fn = "(x^3 + 2x^2 - 2x - 3)/3";
        this.derivative = "(3x^2 + 4x - 2)/3";
      } else if (system === 2){
        this.fn = "(x^5 - 3x^3 - x)/3";
        this.derivative = "(5x^4 - 9x^2 - 1)/3";
      }
    },
    solve(data) {
      console.log(data)
      this.x = data.x
      this.y = data.y
      this.numberOfIterations = data.numberOfIterations
      this.dxdy = data.maxDxDy,
      this.errorMessage = ''
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
  width: 420px;
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

