<script setup lang="ts">
import { apiUserLogout } from '@/api/user'
import { sidebarData } from '@/constants'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const currentPage = ref('')
const route = useRoute()

const router = useRouter()

const setCurrentPage = () => {
  sidebarData.forEach((item) => {
    if (item.path === route.path) {
      currentPage.value = item.name
    }
  })
}

onMounted(() => {
  setCurrentPage()
})

watch(
  () => route.path,
  () => {
    setCurrentPage()
  },
)

const isProcessLogout = ref(false)

const handleLogout = async () => {
  isProcessLogout.value = true
  try {
    await apiUserLogout()
  } catch (error) {
  } finally {
    isProcessLogout.value = true
    router.push('/login')
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-white shadow-sm rounded-lg mb-4">
    <div class="container-fluid">
      <ol class="breadcrumb m-0">
        <li class="breadcrumb-item">後台管理</li>
        <li v-if="currentPage !== ''" class="breadcrumb-item active">{{ currentPage }}</li>
      </ol>
      <div class="d-flex align-items-center">
        <button
          @click="handleLogout"
          :disabled="isProcessLogout"
          class="btn btn-outline-dark rounded-lg me-2"
        >
          登出
        </button>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
