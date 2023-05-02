<template>
  <form @submit.prevent>
    <div class="inputs">
      <fieldset>
        <legend>Уравнение</legend>
        <my-select v-model="equation" :options="equationOptions" @change="changeEquation"/>
      </fieldset>
      <fieldset>
        <legend>Левая граница интервала</legend>
        <my-input v-model="left" type="number" @change="changeLeft"/>
      </fieldset>
      <fieldset>
        <legend>Правая граница интервала</legend>
        <my-input v-model="right" type="number"  @change="changeRight"/>
      </fieldset>
      <fieldset>
        <legend>Погрешность вычисления</legend>
        <my-input v-model="eps" type="number" />
      </fieldset>
      <fieldset>
        <legend>Метод вычисления</legend>
        <my-select v-model="method" :options="methodOptions" />
      </fieldset>
      <fieldset>
        <legend>Файл</legend>
        <my-input type="file" @change="changeFile"/>
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
      // equation: ["x^3 + 2x^2 - 2x - 3","3x^2 + 4x - 2"],
      equation: 1,
      left: -5,
      right: 5,
      x: 0,
      eps: 0.1,
      method: 1,
      file: null,
      equationOptions: [
        // { value: ["x^3 + 2x^2 - 2x - 3", "3x^2 + 4x - 2"], name: 'x³ + 2x² - 2x - 3' },
        // { value: ["x^5 - 3x^3 - x + 2", "5x^4 - 9x^2 - 1"], name: "x⁵ - 3x³ - x + 2" },
        // { value: ["-x^3 + x^2 - ln(x^2) + 3sin(x)", "-3x^2 + 2x - 2/x +3cos(x)"], name: "-x³ + x² - ln(x²) + 3sin(x)" },
        { value: 1, name: 'x³ + 2x² - 2x - 3' },
        { value: 2, name: "x⁵ - 3x³ - x + 2" },
        { value: 3, name: "-x³ + x² - ln(x²) + 3sin(x)" },

      ],
      methodOptions: [
        { value: 1, name: "Метод половинного деления" },
        { value: 3, name: "Метод Ньютона" },
        { value: 5, name: "Метод простой итерации" },
      ],
    };
  },
  methods: {
    solve() {
      if (this.eps > 0) {
        if (this.equation === 3 && this.left * this.right < 0){
          this.$emit("error", "Выберите интервал, не включающий в себя 0, т.к. ln(0) не существует.");
        } else {
          axios
            .post(
                "http://localhost:8081/api/equation",
                {
                  equation: this.equation,
                  left: this.left,
                  right: this.right,
                  eps: this.eps,
                  method: this.method,
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
      this.equation = 1
      this.left = -5
      this.right = 5
      this.eps = 0.1
      this.method = 1
      this.file = false
      this.$emit("reset", this.equation, this.left, this.right);
    },
    changeEquation() {
      this.$emit("changeEquation", this.equation);
    },
    changeLeft() {
      this.$emit("changeLeft", this.left);
    },
    changeRight() {
      this.$emit("changeRight", this.right);
    },
    updateValues(left, right, eps) {
      this.left = left;
      this.right = right;
      this.eps = eps;
      this.changeLeft();
      this.changeRight()
    },
    changeFile(event) {
      if (event.target.files[0].type === "text/plain") {
        let reader = new FileReader();
        reader.readAsText(event.target.files[0], 'windows-1251')
        let results;
        reader.onload = () => {
          results = reader.result.split("\r\n");
          if (results.length !== 3) {
            this.file = false
            this.$emit("error", "Неверное количество строк в файле(ожидается 3 строки).");
          } else {
            if(!isNaN(parseFloat(results[0])) &&
                !isNaN(parseFloat(results[1])) &&
                !isNaN(parseFloat(results[2]))) {

              this.updateValues(parseFloat(results[0]), parseFloat(results[1]), parseFloat(results[2]))
            } else {
              this.$emit("error", "В файле ожидаются числа");
            }
          }
        };

        console.log(this.left)

        reader.onerror = function() {
          this.file = false
          this.$emit("error", "Произошла ошибка чтения из файла");
        };
      } else {
        this.file = false
        this.$emit("error", "Произошла ошибка чтения из файла");
      }

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
