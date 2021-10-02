<!--
https://vuejs.org/v2/guide/transitions.html

enter: Starting state for enter.
  Added before element is inserted, removed one frame after element is inserted.

enter-active: Active state for enter.
  Applied during the entire entering phase.
  Added before element is inserted, removed when transition/animation finishes.
  This class can be used to define the duration, delay and easing curve for the entering transition.

v-enter-to: Ending state for enter.
  Added one frame after element is inserted (at the same time v-enter is removed)
  removed when transition/animation finishes.

leave: Starting state for leave.
  Added immediately when a leaving transition is triggered, removed after one frame.

leave-active: Active state for leave.
  Applied during the entire leaving phase.
  Added immediately when leave transition is triggered, removed when the transition/animation finishes.
  This class can be used to define the duration, delay and easing curve for the leaving transition.

leave-to: Ending state for leave.
  Added one frame after a leaving transition is triggered (at the same time v-leave is removed),
  removed when the transition/animation finishes.
-->

<template>
  <transition
    :enter-active-class="animationStyle.enterActiveClass"
    :enter-class="animationStyle.enterClass"
    :enter-to-class="animationStyle.enterToClass"
    :leave-active-class="animationStyle.leaveActiveClass"
    :leave-class="animationStyle.leaveClass"
    :leave-to-class="animationStyle.leaveToClass"
  >
    <slot />
  </transition>
</template>
<script>
export default {
  props: {
    id: { type: Number, default: 0, required: false },
  },
  computed: {
    animationStyle() {
      return this.$store.state.animationStyles[this.id]
    },
  },
}
</script>
