<script setup lang="ts">
import { apiUserLogin } from '@/api/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  username: '',
  password: '',
})

const isProcessLogin = ref(false)

const handleLogin = async () => {
  isProcessLogin.value = true
  try {
    const res = await apiUserLogin({
      username: form.value.username,
      password: form.value.password,
    })

    const { token, expired } = res.data
    document.cookie = `hexToken=${token};expires=${new Date(expired)};`
    router.push('/product-management')
  } catch (error) {
    alert('登入失敗')
  } finally {
    isProcessLogin.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-12 login-container ps-0 bg-white">
          <div class="row g-0">
            <div class="login-image-section col-lg-6 d-none d-lg-block">
              <div class="d-flex justify-content-center align-items-center text-secondary">
                <img
                  src="https://images.unsplash.com/photo-1702754253690-a3d9e4e68511?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyMHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  class="img-fluid"
                />
              </div>
            </div>
            <div class="col-lg-6 d-flex flex-column justify-content-center p-5">
              <div class="text-center mb-4">
                <h2 class="h3 font-bold text-gray-800">登入後台</h2>
              </div>
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="emailInput" class="form-label text-gray-600">電子信箱</label>
                  <input
                    v-model="form.username"
                    type="email"
                    class="form-control rounded-lg"
                    id="emailInput"
                    placeholder="請輸入 Email"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label for="passwordInput" class="form-label text-gray-600">密碼</label>
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control rounded-lg"
                    id="passwordInput"
                    placeholder="請輸入密碼"
                    required
                  />
                </div>
                <div class="d-flex flex-column gap-2">
                  <button
                    :disabled="isProcessLogin"
                    type="submit"
                    class="btn btn-dark rounded-lg py-2"
                  >
                    登入
                  </button>
                  <button type="button" class="btn btn-outline-dark rounded-lg py-2">回首頁</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  background-color: #f8f9fa;
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-container {
  max-width: 900px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.login-image-section {
  background-color: #e9ecef;
}
</style>
