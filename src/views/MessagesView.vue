<template>
  <div class="w-full h-full overflow-y-auto">
    <div class="title-wrapper w-full">
      <h2 class="title">Messages</h2>
    </div>
    <div id="messages-wrapper">
      <div id="messages">
        <div id="search-input-wrapper" class="relative">
          <input type="text" name="search-messages" id="search-input" placeholder="Search messages" class="text-neutrals-100">
        </div>
        <div class="messages-list">
          <div v-for="message in messages" :key="message.id" class="messages-item" :class="{unread: message.unread}">
            <div class="messages-avatar">
              <img :src="message.sender_avatar" />
            </div>
            <div class="messages-content">
              <div class="messages-title">
                <div class="messages-sender">
                  {{message.sender}}
                </div>
                <div class="messages-time">{{message.time}}</div>
              </div>
              <div class="messages-text">{{message.text}}</div>
            </div>
          </div>
        </div>
      </div>
      <div id="chats">
        <div class="chat-header">
          <div class="chat-header-candidate">
            <div class="chat-header-avatar">
              <img :src="chatMate.profile_picture" />
            </div>
            <div class="chat-header-name-wrapper">
              <div class="chat-header-name">{{chatMate.name}}</div>
              <div class="chat-header-title">{{chatMate.title}}</div>
            </div>
          </div>
          <div class="chat-action">
            <IconPin />
            <IconStar />
            <IconVerticalDot />
            <RouterLink :to="{name: 'Home'}" class="chat-action-view-profile">
              View profile
            </RouterLink>
          </div>
        </div>
        <div class="chat-person"></div>
        <div class="today"></div>
        <div class="chat-content">
          <div class="chat-item">
          </div>
          <div class="replay-messages"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMessageStore } from '../stores/message'
import { storeToRefs } from 'pinia'
import IconPin from '@/components/icons/IconPin.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconVerticalDot from '@/components/icons/IconVerticalDot.vue'
import { RouterLink } from 'vue-router'

const messageStore = useMessageStore()
const { messages, error, loading, chatMate } = storeToRefs(messageStore)
const { fetchMessages } = messageStore
fetchMessages()
</script>
<style scoped>
.title-wrapper {
  box-shadow: inset 0px -1px 0px #D6DDEB;
  background: #FFFFFF;
  height: 77px;
}

.title {
  height: 100%;
  padding: 24px 32px;
  font-family: 'Clash Display Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: #171717;
  margin: 0 auto;
  max-width: 1167px;

}

#messages-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 1px;
  background: #FFFFFF;
  margin: 0 auto;
  max-width: 1167px;
  height: 100%;
}

#messages {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  gap: 28px;
  width: 416px;
  background: #FFFFFF;
  box-shadow: 1px 0px 0px #D3D6DB;
  height: 100%;
}

#search-input {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px 12px 48px;
  gap: 16px;
  width: 352px;
  height: 50px;
  background: #FFFFFF;
  border-color: #D1D1D1;
}

#search-input:active,
#search-input:focus {
  --tw-ring-color: #7330DF;
  border: 0;
}

#search-input::placeholder {
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #A2A2A2;
}

#search-input-wrapper::before {
  content: ' ';
  background: url('@/assets/images/search.svg');
  width: 24px;
  height: 24px;
  display: block;
  position: absolute;
  left: 16px;
  top: 12px;
  z-index: 1;
}

.messages-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 352px;
}

.messages-item.unread {
  background: #F1EAFC;
  box-shadow: none;
}

.messages-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  width: 352px;
  height: 86px;
  background: #FFFFFF;
  box-shadow: inset 0px -1px 0px #D6DDEB;
}

.messages-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.messages-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 256px;
  height: 54px;

}

.messages-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 60px;

  width: 256px;
  height: 26px;
}

.messages-sender {
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 160%;
  /* identical to box height, or 26px */

  display: flex;
  align-items: center;

  /* Neutrals/100 */

  color: #171717;
}

.messages-item.unread .messages-sender::after {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--qrh-primary);
  border-radius: 100%;
  margin-left: 8px;
}

.messages-time {
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  display: flex;
  align-items: center;
  text-align: right;
  color: #747474;
}

.messages-text {
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  display: flex;
  align-items: center;
  color: #454545;
}

#chats {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 100%;
}

.chat-action {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 24px;
  height: 50px;
}

.chat-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 32px 32px 24px;
  height: 112px;
  background: #FFFFFF;
  box-shadow: inset 0px -1px 0px #D6DDEB;
  width: 100%;
}

.chat-header-candidate {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 16px;
  height: 56px;
}

.chat-header-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
}

.chat-header-name-wrapper {}

.chat-header-name {
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 120%;
  display: flex;
  align-items: center;
  color: #171717;
}

.chat-header-title {
  /* Body/Normal - Regular */

  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  /* or 26px */

  display: flex;
  align-items: center;

  /* Neutrals/80 */

  color: #454545;
}

.chat-action-view-profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 0px;
  gap: 10px;
  height: 50px;
  border-radius: 8px;
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  /* identical to box height, or 26px */

  text-align: center;

  /* Brands/Primary */

  color: #7330DF;

}
</style>
