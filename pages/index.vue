<template>
  <div>
    <form action="">
      <div class="input">
        name
        <input type="text" v-model="name">
      </div>
      <div class="input">
        phone
        <input
            type="text"
            :class="{error: $v.phone.$error}"
            v-model="$v.phone.$model"
            v-mask="phoneMask"
        >
        <div>
          $v.phone.error: {{$v.phone.$error}}
        </div>
        <div>
          $v.phone.$dirty: {{$v.phone.$dirty}}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      name: '',
      phone: ''
    }
  },
  validations() {
    const phoneValidator = (value) => {
      const phoneRegex = /^(8|\+7) \(?\d{3}\) \d{3}-\d{2}-\d{2}$/;
      return phoneRegex.test(value);
    };
    return {
      phone: {
        required,
        minLength: minLength(11),
        phoneValidator
      }
    }
  },
  methods: {
    phoneMask(value) {
      let firstSymbol = [];
      if (value.charAt(0) === '8') {
        firstSymbol = [/\d/];
      } else if (value.charAt(0) === '7') {
        firstSymbol = ['+', /\d/];
      } else {
        firstSymbol = ['+', '7'];
      }
      const numbers = value.replace(/[^0-9]/g, '');
      const firstPart = [
        ' ',
        '(',
        /\d/,
        /\d/,
        /\d/,
      ];
      const secondPart = [
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
      ];
      const thirdPart = [
        '-',
        /\d/,
        /\d/,
      ];
      const lastPart = [
        '-',
        /\d/,
        /\d/
      ];
      const result  = [...firstSymbol];
      if (numbers.length > 1) result.push(...firstPart);
      if (numbers.length > 4) result.push(...secondPart);
      if (numbers.length > 7) result.push(...thirdPart);
      if (numbers.length > 9) result.push(...lastPart);
      return result;
    }
  }
}
</script>

<style>
.error {
  border-color: red;
}
.input {
  margin-top: 20px;
}
</style>