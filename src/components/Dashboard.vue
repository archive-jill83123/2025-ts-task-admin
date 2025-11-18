<script setup lang="ts">
import { apiCheckLoginStatus } from '@/api/user'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isSuccess = ref(false)

const checkLoginStatus = async () => {
  try {
    await apiCheckLoginStatus()
  } catch (error) {
    alert('請重新登入')
    router.push('/login')
  } finally {
    isSuccess.value = true
  }
}

onMounted(() => {
  checkLoginStatus()
})
</script>

<template>
  <div class="d-flex">
    <Sidebar />

    <div class="main-content d-flex flex-column">
      <Header />
      <RouterView v-if="isSuccess" />
      <div
        v-else
        class="d-flex justify-content-center align-items-center"
        style="height: calc(100vh - 98px)"
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px;
}
</style>
