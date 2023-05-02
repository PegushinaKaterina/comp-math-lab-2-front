<template>
  <form @submit.prevent>
    <div class="inputs">
      <fieldset>
        <h3>Система №1:</h3> <br>
        x³ + 2x² - 2x - 3 - 3y = 0<br>
        -x³ + x² - ln(x²) + 3sin(x) - 3y = 0 <br>
        <br>
        <h3>Система №2:</h3> <br>
        x⁵ - 3x³ - x - y = 0<br>
        -x³ + x² - ln(x²) + 3sin(x) - y = 0 <br>
      </fieldset>
      <fieldset>
        <legend>Система уравнений</legend>
        <my-select v-model="system" :options="systemOptions" @change="changeSystem"/>
      </fieldset>
      <fieldset>
        <legend>Начальное приближение x</legend>
        <my-input v-model="x" type="number"/>
      </fieldset>
      <fieldset>
        <legend>Начальное приближение y</legend>
        <my-input v-model="y" type="number"/>
      </fieldset>
      <fieldset>
        <legend>Погрешность вычисления</legend>
        <my-input v-model="eps" type="number"/>
      </fieldset>
    </div>
    <div class="commandButton">
      <my-button type="button" @click="reset">Сбросить</my-button>
      <my-button type="button" @click="solve">Отправить</my-button>
    </div>
  </form>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MySelect from "@/components/UI/MySelect.vue";
import axios from "axios";

export default {
  components: { MySelect, MyInput, MyButton },
  data() {
    return {
      system: 1,
      x: 0,
      y: 0,
      eps: 0.1,
      systemOptions: [
        // { value: ["x^3 + 2x^2 - 2x - 3", "3x^2 + 4x - 2"], name: 'x³ + 2x² - 2x - 3' },
        // { value: ["x^5 - 3x^3 - x + 2", "5x^4 - 9x^2 - 1"], name: "x⁵ - 3x³ - x + 2" },
        // { value: ["-x^3 + x^2 - ln(x^2) + 3sin(x)", "-3x^2 + 2x - 2/x +3cos(x)"], name: "-x³ + x² - ln(x²) + 3sin(x)" },
        { value: 1, name: "Система №1" },
        { value: 2, name: "Система №2"},

      ],
    };
  },
  methods: {
    solve() {
      if (this.eps > 0) {
        if (this.x === 0) {
          this.$emit("error", "Выберите начальное приближение х не равное 0, т.к. ln(0) не существует.");
        } else {
          axios
              .post(
                  "http://localhost:8081/api/system",
                  {
                    system: this.system,
                    x: this.x,
                    y: this.y,
                    eps: this.eps,
                  },
              ).then((res) => {
            this.$emit("solve", res.data);
          }).catch((error) => {
            this.$emit("error", error.response.data);
          });
        }

      } else {
        this.$emit("error", "Погрешность вычисления должна быть больше 0");
      }

    },
    reset() {
      this.system = 1
      this.x = 0
      this.y = 0
      this.eps = 0.1
    },
    changeSystem() {
      this.$emit("changeSystem", this.system);
    },
  },
};
</script>

<style scoped>
fieldset {
  margin-top: 15px;
  border: 1.5px solid black;
  padding: 10px;
}

.commandButton {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
