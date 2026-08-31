<script setup lang="ts">
const { openContact, menuOpen, contactOpen } = useUi()

const hidden = computed(() => menuOpen.value || contactOpen.value)
</script>

<template>
  <Teleport to="body">
    <div
      class="flores-talep-rail"
      :class="{ 'is-hidden': hidden }"
      aria-hidden="false"
    >
      <button
        type="button"
        class="flores-talep-fab"
        aria-label="Talep oluştur"
        @click="openContact()"
      >
        Talep Oluştur
      </button>
    </div>
  </Teleport>
</template>

<style>
.flores-talep-rail {
  display: none;
  position: fixed;
  inset: 0 0 0 auto;
  z-index: 99999;
  width: auto;
  height: 100dvh;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
}
.flores-talep-rail.is-hidden {
  opacity: 0;
  visibility: hidden;
}
.flores-talep-fab {
  pointer-events: auto;
  margin: 0;
  padding: 20px 14px;
  border: 0;
  border-radius: 16px 0 0 16px;
  background: #00c2ff;
  color: #fff;
  font-family: inherit;
  font-size: 16px;
  font-weight: 650;
  letter-spacing: 0.08em;
  line-height: 1.1;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: none;
  box-shadow:
    -8px 10px 28px rgb(0 80 120 / 0.45),
    inset 0 0 0 1px rgb(255 255 255 / 0.28);
  cursor: pointer;
}
@media (max-width: 640px) {
  .flores-talep-rail {
    display: flex;
  }
}
</style>
