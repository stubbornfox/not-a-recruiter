<script setup>
import { useRouter, useRoute } from 'vue-router'
import { getGoogleUser, getGoogleOauthToken } from "@/services/google-auth"
import { useAuthStore } from '@/stores/auth';

const route = useRoute()
const { code } = route.query
const { id_token, access_token } = await getGoogleOauthToken({ code });
const { name, verified_email, email, picture } = await getGoogleUser({id_token, access_token})
const { loginWithGoogle } = useAuthStore()

if (verified_email) {
  loginWithGoogle({ name, email, picture, id_token })
} else {
  toast.error('Google account not verified')
}
</script>
<template>
</template>
