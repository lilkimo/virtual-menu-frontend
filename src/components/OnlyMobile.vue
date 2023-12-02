<script setup>
import {useSlots} from 'vue'

const props = defineProps({
  ignore: {
    type: Boolean,
    default: false,
  },
})
const slots = useSlots()

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
let hasTouchScreen = false
if ('maxTouchPoints' in navigator) {
  hasTouchScreen = navigator.maxTouchPoints > 0
} else if ('msMaxTouchPoints' in navigator) {
  hasTouchScreen = navigator.msMaxTouchPoints > 0
} else {
  const mQ = matchMedia?.('(pointer:coarse)')
  if (mQ?.media === '(pointer:coarse)') {
    hasTouchScreen = !!mQ.matches
  } else if ('orientation' in window) {
    hasTouchScreen = true // deprecated, but good fallback
  } else {
    // Only as a last resort, fall back to user agent sniffing
    const UA = navigator.userAgent
    hasTouchScreen =
      /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
  }
}
</script>

<template>
  <slot v-if="hasTouchScreen || props.ignore" />
  <template v-else>
    <slot
      v-if="slots.fallback"
      name="fallback"
    />
    <div
      v-else
      class="flex h-full items-center justify-center text-center"
    >
      Esta página sólo está disponible para celulares :(
    </div>
  </template>
</template>

<style scoped></style>
