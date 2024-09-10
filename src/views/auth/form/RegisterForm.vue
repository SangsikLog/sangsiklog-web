<script setup lang="ts">
import { ref } from 'vue';
import {userApi} from "@/api/UserApi";
import {router} from "@/router";

const show1 = ref(false);
const password = ref('');
const email = ref('');
const Regform = ref();
const nickname = ref('');

// 이메일 인증 관련 상태
const emailVerified = ref(false); // 이메일 인증이 완료되었는지 여부
const sendEmailVerifyMail = ref(false); // 이메일 인증 메일을 보냈는지 여부
const emailVerificationCode = ref(''); // 입력한 인증번호
const showVerificationFields = ref(false); // 인증번호 입력 필드와 버튼을 보여줄지 여부

// 유효성 검사
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

async function signUp() {
  const validateResult = await Regform.value.validate()
  if (validateResult.valid) {
    userApi.signUp(nickname.value, email.value, password.value)
        .then(data => {
          alert('회원가입이 완료되었습니다!');
          router.push('/auth/login');
        })
        .catch(error => {
          alert(error.details.message);
        })
  }
}

// 이메일 인증 버튼 클릭 시
async function requestEmailVerification() {
  const validateResult = await Regform.value.validate()

  if (validateResult.valid) {
    showVerificationFields.value = true;
    sendEmailVerifyMail.value = true;
  }
}

// 인증번호 확인 버튼 클릭 시
function verifyEmailCode() {
  // 인증번호가 맞는지 확인 (여기서는 임시로 '123456'을 맞는 인증번호로 처리)
  if (emailVerificationCode.value === '123456') {
    alert('인증이 완료되었습니다.');
    emailVerified.value = true; // 인증 성공 처리
    showVerificationFields.value = false; // 인증번호 입력 필드 숨김
  } else {
    alert('인증번호가 틀렸습니다.');
  }
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
    <v-btn v-if="!emailVerified && !sendEmailVerifyMail" color="secondary" block class="mt-2" variant="flat" size="large" @click="requestEmailVerification">이메일 인증</v-btn>
    <div v-if="showVerificationFields" class="mt-4">
      <v-text-field
          v-model="emailVerificationCode"
          label="인증번호"
          required
          density="comfortable"
          hide-details="auto"
          variant="outlined"
          color="primary"
      ></v-text-field>
      <v-btn color="secondary" block class="mt-2" variant="flat" size="large" @click="verifyEmailCode">인증번호 확인</v-btn>
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
    <v-btn v-if="emailVerified" color="secondary" block class="mt-2" variant="flat" size="large" @click="signUp()">회원가입</v-btn>
  </v-form>
  <div class="mt-5 text-right">
    <v-divider />
    <v-btn variant="plain" to="/login" class="mt-2 text-capitalize mr-n2">이미 계정이 있으신가요?</v-btn>
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