<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
const email = ref('')

import {ref} from 'vue'
import {useRoute} from 'vue-router'
const route = useRoute()

import {googleLogout} from 'vue3-google-login'
import {decodeCredential} from 'vue3-google-login'
import App from '../App.vue'

function handleSignOut() {
  //your logout logics
  googleLogout()
  email.value = 'User not logged in'
  router.push('/register')
}

const callback = response => {
  const userData = decodeCredential(response.credential)
  email.value = userData.email
  console.log('Handle the userData', email)
  router.push('/register')
}
</script>

<template>
  <div className="h-screen bg-gray-100 p-10 grid grid-cols-1">
    <div className="place-self-center">
      <form
        className="grid grid-cols-1 gap-4 p-9 rounded-xl shadow-xl bg-[#f9fafb] max-w-sm mx-auto"
      >
        <GoogleLogin :callback="callback" />
      </form>
    </div>
  </div>
</template>
