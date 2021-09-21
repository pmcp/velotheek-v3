<template>
  <div>
    <div
      class="rounded-lg border-gray-300 shadow relative h-full w-full overflow-hidden"
      :class="layoutClasses"
    >
      <slot v-if="isOpen" name="opened"></slot>
      <slot v-else name="closed"></slot>
    </div>
    <div v-if="toggle" class="w-100 flex items-center flex-col">
      <button class="rounded-lg shadow px-6 py-2 bg-white shadow relative" :class="buttonClasses" @click="toggleCard">
        {{ text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  props: {
    // TODO: make objects with defaults
    toggle: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      default: false,
    },
    position: String,
    openText: String,
    closeText: String,
    openClass: String,
    closeClass: String,
    padding: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    layoutClasses() {
      let openClasses = 'h-100'
      let closeClasses = 'h-0'
      let classes = this.isOpen ? openClasses : closeClasses
      if (this.padding) classes = classes + ' ' + 'px-4 py-5 sm:p-6 '
      return classes
    },
    buttonClasses() {
      let classes = ''
      if (this.position === 'top') {
        classes = 'top-5'
      }

      if (this.position === 'bottom') {
        classes = 'bottom-5'
      }

      return classes
    },
    cardClasses() {},
    text() {
      return this.isOpen ? this.openText : this.closeText
    },
  },
  methods: {
    toggleCard() {
      this.isOpen = !this.isOpen
    },
  },
  mounted() {
    this.isOpen = this.open
  },
}
</script>

<style scoped></style>
