<script setup lang="ts">
import { Modal } from 'bootstrap'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

interface DeleteModalProps {
  title: string
  content: string
}

const { title, content } = defineProps<DeleteModalProps>()

const modalRef = useTemplateRef('modalRef')
let modal: Modal | null = null

let onConfirmDelete: (() => void) | null = null

onMounted(() => {
  if (modalRef.value) {
    modal = new Modal(modalRef.value)
  }
})

onUnmounted(() => {
  if (modal) {
    modal.dispose()
  }
})

const openModal = (onConfirm: () => void) => {
  if (modal) {
    modal.show()
    onConfirmDelete = onConfirm
  }
}

const closeModal = () => {
  if (modal) {
    modal.hide()
  }
}

const handleDelete = () => {
  if (onConfirmDelete) {
    onConfirmDelete()
    closeModal()
  }
}

defineExpose({
  openModal,
  closeModal,
})
</script>

<template>
  <div
    ref="modalRef"
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content rounded-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-center">
          <p id="deleteModalMessage">{{ content }}</p>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button
            type="button"
            class="btn btn-outline-secondary rounded-lg"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            @click="handleDelete"
            type="button"
            class="btn btn-danger rounded-lg"
            id="confirmDeleteBtn"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
