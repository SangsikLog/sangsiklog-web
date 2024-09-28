<script setup lang="ts">
import { ref } from 'vue';
import { router } from "@/router";
import { useAuthStore } from "@/stores/auth";
import { ServiceError } from "@/api/ServiceError";
import { useUserStore } from "@/stores/user";

const show1 = ref(false);
const password = ref('');
const email = ref('');
const Regform = ref();
const nickname = ref('');

const emailVerified = ref(false);
const isVerifyMailSend = ref(false);
const emailVerificationToken = ref('');
const showVerificationFields = ref(false);

const nickNameRules = ref([
  (v: string) => !!v || '닉네임을 입력해주세요.'
]);
const passwordRules = ref([
  (v: string) => !!v || '비밀번호를 입력해주세요.'
]);
const emailRules = ref([
  (v: string) => !!v || '이메일을 입력해주세요.',
  (v: string) => /.+@.+\..+/.test(v) || '이메일 형식이 올바르지 않습니다.']
);

const { sendVerificationMail, verifyEmailToken } = useAuthStore();
const { signUp } = useUserStore();

async function requestSignUp() {
  const validateResult = await Regform.value.validate()
  if (validateResult.valid) {
    signUp(nickname.value, email.value, password.value)
        .then(() => {
          alert('회원가입이 완료되었습니다!');
          router.push('/auth/login');
        })
        .catch((error) => {
          alert(error.message);
        })
  }
}

async function requestSendVerificationMail() {
  const validateResult = await Regform.value.validate()
  if (validateResult.valid) {
    showVerificationFields.value = true;
    isVerifyMailSend.value = true;

    sendVerificationMail(email.value)
        .then((response) => {
          if (response === "ok") {
            alert('인증번호가 발송되었습니다.');
          }
        })
        .catch((error: ServiceError) => {
          alert(error.message);
        })
  }
}

async function requestVerifyEmailToken() {
  verifyEmailToken(email.value, emailVerificationToken.value)
      .then((response) => {
        if (response === "ok") {
            alert('인증이 완료되었습니다.');
            emailVerified.value = true;
            showVerificationFields.value = false;
        }
      })
      .catch((error: ServiceError) => {
        alert(error.message);
      });
}
</script>

<template>
  <v-form ref="Regform" lazy-validation action="/" class="mt-7 loginForm">
    <v-text-field
        v-model="nickname"
        :rules="nickNameRules"
        label="닉네임"
        class="mt-4 mb-4"
        required
        density="comfortable"
        hide-details="auto"
        variant="outlined"
        color="primary"
    ></v-text-field>
    <v-text-field
        v-model="email"
        :rules="emailRules"
        label="이메일"
        :disabled="emailVerified"
        class="mt-4 mb-4"
        required
        density="comfortable"
        hide-details="auto"
        variant="outlined"
        color="primary"
    ></v-text-field>
    <v-btn v-if="!emailVerified && !isVerifyMailSend" color="secondary" block class="mt-2" variant="flat" size="large" @click="requestSendVerificationMail">이메일 인증</v-btn>
    <div v-if="showVerificationFields" class="mt-4">
      <v-text-field
          v-model="emailVerificationToken"
          label="인증번호"
          required
          density="comfortable"
          hide-details="auto"
          variant="outlined"
          color="primary"
      ></v-text-field>
      <v-btn color="secondary" block class="mt-2" variant="flat" size="large" @click="requestVerifyEmailToken">인증번호 확인</v-btn>
    </div>

    <v-text-field
        v-if="emailVerified"
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
    <v-btn v-if="emailVerified" color="secondary" block class="mt-2" variant="flat" size="large" @click="requestSignUp()">회원가입</v-btn>
  </v-form>
  <div class="mt-5 text-right">
    <v-divider />
    <v-btn variant="plain" to="/auth/login" class="mt-2 text-capitalize mr-n2">이미 계정이 있으신가요?</v-btn>
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
</style>