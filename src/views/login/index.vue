<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import type { FormInstance } from 'ant-design-vue';
import { getLoginCode } from '@/api/login';
import { useRouter } from 'vue-router';
import { setToken } from '@/utils/auth';

interface IFormState {
  username: string;
  password: string;
  code: string;
}

const formRef = ref<FormInstance>();
const formState = reactive<IFormState>({
  username: '',
  password: '',
  code: ''
});

const checkName = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请输入用户名');
  }

  return Promise.resolve();
};
const checkPwd = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请输入密码');
  }

  return Promise.resolve();
};
const checkCode = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请输入验证码');
  }

  return Promise.resolve();
};

const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      validator: checkName,
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      validator: checkPwd,
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      validator: checkCode,
      trigger: 'blur'
    }
  ]
};

const codeInput = ref<HTMLInputElement>();
const imgSrc = ref('');

const onUpdateCode = () => {
  getLoginCode().then((data) => {
    formState.code = '';
    imgSrc.value = window.URL.createObjectURL(data);
    codeInput.value?.focus();
  });
};

const router = useRouter();
const onFinish = (values: IFormState) => {
  // 提交表单，验证成功后执行
  console.log('Success:', values);

  // 登录逻辑
  setToken('admin-template-login');
  router.replace('/');
};

const onFinishFailed = (errorInfo: ValidateErrorEntity<IFormState>) => {
  // 提交表单，验证失败后执行
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <div class="login-container">
    <div class="logo_wrapper">
      <img src="@/assets/common/logo.png" alt="" class="logo" />
    </div>
    <div class="login-area">
      <div class="login-area-main">
        <a-form
          ref="formRef"
          :model="formState"
          name="normal_login"
          class="login-form"
          :rules="rules"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <div class="title-container">
            <h3 class="title">中国南方航空用户统一认证入口</h3>
          </div>
          <a-form-item name="username" has-feedback>
            <a-input v-model:value="formState.username">
              <template #prefix>
                <icon-svg name="user" color="#889aa4" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password" has-feedback>
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <icon-svg name="password" color="#889aa4" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item name="code" has-feedback>
            <div class="form_code">
              <div class="form_code_input">
                <a-input ref="codeInput" v-model:value="formState.code" />
              </div>
              <div class="code-img" @click="onUpdateCode">
                <img :src="imgSrc" alt="" />
              </div>
            </div>
          </a-form-item>

          <div class="form_options">
            <a
              class="text"
              href="https://ids.csair.com/ids/custom/ChangePassword.jsp"
              target="_blank"
              >修改密码</a
            >
            <a
              class="text"
              href="https://ids.csair.com/ids/custom/ForgetPassword.jsp"
              target="_blank"
              >忘记密码</a
            >
          </div>

          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="footer">
      集团门户：
      <a href="http://www.csair.cn" target="_blank">www.csair.cn</a>
      | 南航官网：
      <a href="http://www.csair.com" target="_blank">www.csair.com</a>
      | 南航全国服务热线：95539 | 南航微信：CS95539
    </div>
  </div>
</template>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$logo_pad: calc((100vw - 1107px) / 2);

.login-container {
  overflow: hidden;
  min-height: 100%;
  width: 100%;
  background-color: #fff;

  .logo_wrapper {
    margin: 0 auto;
    padding: 70px $logo_pad 20px $logo_pad;
    width: 100%;
    height: 138px;
    background: #fff;

    .logo {
      width: 225px;
      height: 48px;
    }
  }

  .login-area {
    width: 100%;
    height: 613px;
    background-image: url('../../assets/common/background.jpg');
    background-size: 100% 100%;
    background-repeat: repeat-x;

    .login-area-main {
      position: relative;
      width: 1107px;
      height: 607px;
      margin: 0 auto;
      background: url('../../assets/common/build.jpg');
    }
  }

  .login-form {
    position: absolute;
    top: 100px;
    right: 40px;
    padding: 5px 25px;
    width: 340px;
    background: #fff;

    .title-container {
      position: relative;

      .title {
        margin: 0 auto;
        height: 60px;
        line-height: 60px;
        color: #333;
        font-size: 17px;
        text-indent: 5px;
        font-weight: normal;
      }
    }
  }

  .login-form-button {
    width: 100%;
    height: 40px;
  }

  .ant-input-affix-wrapper {
    padding: 9px 12px;
  }

  .ant-input {
    padding: 9px 12px;
  }
}

.form_code {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .form_code_input {
    flex: 1;
  }

  .code-img {
    cursor: pointer;
    width: 100px;

    img {
      display: block;
      height: 42px;
    }
  }
}

.form_options {
  display: flex;
  justify-content: space-between;
  margin: 10px auto;

  .text {
    color: #2493e5;
    font-size: 16px;
    line-height: 30px;
  }
}

.footer {
  margin-top: 55px;
  font-size: 14px;
  color: #6a646a;
  text-align: center;
}
</style>
