<template>
  <div class="login">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit" @click="login"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>


<script setup lang="ts">
import { reactive } from "vue";
import { $http } from "../../main";
import { useRouter } from "vue-router";
import store from "@/store";

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
});
const router = useRouter();
const login = (): void => {
  $http
    .post("/admin/login", {
      username: formState.username,
      password: formState.password,
    })
    .then(async (res) => {
      if (res.code === 200) {
        const token = res.data.tokenHead + res.data.token;
        localStorage.setItem("token", token);
        await store.dispatch("fetchMenu");
        router.push("/home");
      }
    });
};
</script>


<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

