<template>
  <div id="topnav">
    <div id="topnav-wrapper" class="pt-2 pb-4 px-4 lg:py-4 lg:px-8">
      <button type="button" class="lg:hidden" @click="$emit('openSideBar')">
        <span class="sr-only">Open sidebar</span>
        <IconMobileTopNav class="h-6 w-6" aria-hidden="true" />
      </button>
      <div id="company-list" v-if="company">
        <div class="company-logo">
          <img v-if="company.logo" :src="company.logo" />
          <span v-else class="company-initial">
            {{company.name[0]}}
          </span>
        </div>
        <div class="company-title">
          <div class="company-text">Company</div>
          <div class="company-name">
            <span>{{company.name}}</span>
            <RouterLink :to="{name: 'Organizations'}">
              <IconChervonDown />
            </RouterLink>
          </div>
        </div>
      </div>
      <div id="action">
        <RouterLink :to="{name: 'Notification'}" type="button">
          <IconNotification :hasUnread="hasUnread" />
        </RouterLink>
        <RouterLink type="button" to="/jobs/new" class="btn btn-primary hidden lg:flex">
          <IconPlus />
          <span>Post a job</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import IconNotification from '@/components/icons/IconNotification.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconChervonDown from '@/components/icons/IconChervonDown.vue'
import IconMobileTopNav from '@/components/icons/IconMobileTopNav.vue'

defineProps({
  user: { type: Object, default: { email: '', name: '', profile_picture: '' } },
  hasUnread: { type: Boolean, default: false },
  company: { type: Object, default: { name: '', logo: '' } },
})
</script>
<style scoped>
#topnav {
  background: #FFFFFF;
  box-shadow: inset 0px -1px 0px #D6DDEB;
  width: 100%;
}

#topnav-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
}

#action {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 32px;
  height: 50px;

}

#action .btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  gap: 10px;
  height: 50px;
  background: #7330DF;
  border-radius: 8px;
}

#action .btn span {
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #FFFFFF;
  white-space: nowrap;
}

#company-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;
  height: 50px;
}

.company-logo {
  width: 48px;
  height: 48px;
}

.company-text {
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #454545;
}

.company-name {
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 120%;
  color: #171717;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  height: 24px;
}

.company-initial {
  font-family: "Clash Display Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 120%;
  color: white;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--qrh-primary);
  border-radius: 4px;
}
</style>
