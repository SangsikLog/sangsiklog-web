<script setup lang="ts">

import { Form } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { ServiceError } from "@/api/ServiceError";

const valid = ref(false);
const show1 = ref(false);

const email = ref('hello@sangsiklog.store');
const password = ref('hello123');
const passwordRules = ref([
  (v: string) => !!v || '비밀번호를 입력해주세요.'
]);
const emailRules = ref([
  (v: string) => !!v || '이메일을 입력해주세요.',
  (v: string) => /.+@.+\..+/.test(v) || '이메일 형식이 올바르지 않습니다.'
]);

const { login } = useAuthStore();

/* eslint-disable @typescript-eslint/no-explicit-any */
function requestLogin(values: any, { setErrors }: any) {
  login(email.value, password.value)
      .catch((error: ServiceError) => setErrors({ apiError: error.message }));
}
</script>

<template>
  <Form @submit="requestLogin" class="mt-7 loginForm" v-slot="{errors, isSubmitting}">
    <v-text-field
        v-model="email"
        :rules="emailRules"
        label="이메일"
        class="mt-4 mb-8"
        required
        density="comfortable"
        hide-details="auto"
        variant="outlined"
        color="primary"
    ></v-text-field>
    <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="비밀번호"
        required
        density="comfortable"
        variant="outlined"
        color="primary"
        hide-details="auto"
        :append-icon="show1 ? '$eye' : '$eyeOff'"
        :type="show1 ? 'text' : 'password'"
        @click:append="show1 = !show1"
        class="pwdInput"
    ></v-text-field>
    <div class="d-sm-flex align-center mt-2 mb-7 mb-sm-0">
      <div class="ml-auto">
        <a href="javascript:void(0)" class="text-primary text-decoration-none">비밀번호 찾기</a>
      </div>
    </div>
    <v-btn color="secondary" :loading="isSubmitting" block class="mt-2" variant="flat" size="large" :disabled="valid" type="submit">
      로그인</v-btn
    >
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>
  <div class="mt-5 text-right">
    <v-divider />
    <v-btn variant="plain" to="/auth/register" class="mt-2 text-capitalize mr-n2">아직 계정이 없으신가요?</v-btn>
  </div>
</template>

<style lang="scss">
.outlinedInput .v-field {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: none;
}
.orbtn {
  padding: 2px 40px;
  border-color: rgba(0, 0, 0, 0.08);
  margin: 20px 15px;
}
.pwdInput {
  position: relative;
  .v-input__append {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
</style>