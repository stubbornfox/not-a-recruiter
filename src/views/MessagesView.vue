<template>
  <div class="w-full h-full overflow-y-auto">
    <div class="title-wrapper w-full">
      <h2 class="title">Messages</h2>
    </div>
    <!-- <div id="messages-wrapper">
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
    </div> -->
    <vue-advanced-chat ref="chatWindow" height="calc(100vh - 160px)" :current-user-id="currentUserId" :styles="JSON.stringify(styles)" :rooms="JSON.stringify(rooms)" :rooms-loaded="true" :messages="JSON.stringify(messages)" :messages-loaded="messagesLoaded" show-add-room="true" :show-audio="false" :message-actions="JSON.stringify([
  {
    name: 'replyMessage',
    title: 'Reply'
  },
  {
    name: 'editMessage',
    title: 'Edit Message',
    onlyMe: true
  },
  {
    name: 'deleteMessage',
    title: 'Delete Message',
    onlyMe: true
  },
])" @send-message="sendMessage($event.detail[0])" @fetch-messages="fetchMessagesPerRoom($event.detail[0])" @add-room="addRoom($event.detail[0])" @send-message-reaction="sendMessageReaction($event.detail[0])" @edit-message="editMessage($event.detail[0])" @delete-message="deleteMessage($event.detail[0])">
      <div slot="search-icon">
        <IconSearch />
      </div>
      <div slot="send-icon">
        <button class="btn btn-send">
          <IconSendMessages />
        </button>
      </div>
      <div slot="emoji-picker-icon">
        <IconEmoji />
      </div>
      <div slot="paperclip-icon">
        <IconPaperClip />
      </div>
    </vue-advanced-chat>
    <NewRoom :open="addNewRoom" :participants="chatMates" @create-new-room="createNewRoom" @close-new-room="addNewRoom = false" />
  </div>
</template>
<script setup>
import { useMessageStore } from '../stores/message'
import { useRoomStore } from '../stores/room'
import { storeToRefs } from 'pinia'
import IconPin from '@/components/icons/IconPin.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconVerticalDot from '@/components/icons/IconVerticalDot.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconSendMessages from '@/components/icons/IconSendMessages.vue'
import IconEmoji from '@/components/icons/IconEmoji.vue'
import IconPaperClip from '@/components/icons/IconPaperClip.vue'
import NewRoom from '@/components/NewRoom.vue'
import { RouterLink } from 'vue-router'
import { register } from 'vue-advanced-chat'
import { ref, onMounted } from 'vue'

register()
const messageStore = useMessageStore()
const roomStore = useRoomStore()
const { messages, newMessageId, messagesLoaded } = storeToRefs(messageStore)
const { error, loading, rooms, chatMates, newRoom } = storeToRefs(roomStore)
const { fetchMessages, createMessage, receiveMessage, uploadFile, updateMessage } = messageStore
const { fetchRooms, fetchChatMates, createRoom } = roomStore
let selectedRoomId = null

import { createConsumer } from '@rails/actioncable';

const props = defineProps({
  me: Object,
  default: {}
})
const WS_URL =
  import.meta.env.VITE_WS_URL

let consumer = createConsumer(getWebSocketURL())

function getWebSocketURL() {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user)
    return `${WS_URL}?token=${user['token']}`
  else
    return WS_URL
}

onMounted(() => {
  consumer.subscriptions.create({
    channel: 'Noticed::NotificationChannel',
  }, {
    connected: () => console.log('connected'),
    disconnected() {
      console.log('disconnected')
    },
    rejected() {},
    received: data => {
      if (data.room_id && data.message_id && data.room_id == selectedRoomId) {
        receiveMessage(data.room_id, data.message_id)
      }
    }
  })

})


const currentUserId = props.me.id
fetchRooms()
fetchChatMates()

const chatWindow = ref(null)
const addNewRoom = ref(false)

function addRoom() {
  addNewRoom.value = true
}

function createNewRoom(participant_id) {
  messagesLoaded.value = true
  createRoom(participant_id)
}

function fetchMessagesPerRoom({ room, options = {} }) {
  fetchMessages(room.roomId)
  selectedRoomId = room.roomId
}

async function sendMessageReaction({ reaction, remove, messageId, roomId }) {
  const arrayUser = remove ? [] : [currentUserId]
  const data = {
    reactions: {
      [`${reaction.unicode}`]: arrayUser
    }
  }
  await updateMessage(roomId, messageId, { message: data })
}


async function sendMessage({ content, roomId, files, replyMessage }) {
  const message = {
    user_id: currentUserId,
    content,
    timestamp: new Date()
  }
  if (files) {
    message.files = formattedFiles(files)
  }
  if (replyMessage) {
    message.reply_message = {
      _id: replyMessage._id,
      content: replyMessage.content,
      sender_id: replyMessage.senderId
    }
    // if (replyMessage.files) {
    //   message.replyMessage.files = replyMessage.files
    // }
  }

  await createMessage(roomId, message)
}


async function editMessage({ messageId, newContent, roomId, files }) {
  const newMessage = { edited: new Date() }
  newMessage.content = newContent
  // if (files) {
  //   newMessage.files = this.formattedFiles(files)
  // } else {
  //   newMessage.files = firestoreService.deleteDbField
  // }
  await updateMessage(roomId, messageId, { message: newMessage })
  // if (files) {
  //   for (let index = 0; index < files.length; index++) {
  //     if (files[index] ? .blob) {
  //       await this.uploadFile({ file: files[index], messageId, roomId })
  //     }
  //   }
  // }
}

async function deleteMessage({ message, roomId }) {
  // await firestoreService.updateMessage(roomId, message._id, {
  //   deleted: new Date()
  // })

  await updateMessage(roomId, message._id, {
    message: {
      deleted: new Date()
    }
  })
  // const { files } = message
  // if (files) {
  //   files.forEach(file => {
  //     storageService.deleteFile(this.currentUserId, message._id, file)
  //   })
  // }
}

async function uploadFile1({ file, messageId, roomId }) {
  return new Promise(resolve => {
    let type = file.extension || file.type
    if (type === 'svg' || type === 'pdf') {
      type = file.type
    }
    storageService.listenUploadImageProgress(
      currentUserId,
      messageId,
      file,
      type,
      progress => {
        updateFileProgress(messageId, file.localUrl, progress)
      },
      _error => {
        resolve(false)
      },
      async url => {
        const message = await firestoreService.getMessage(roomId, messageId)
        message.files.forEach(f => {
          if (f.url === file.localUrl) {
            f.url = url
          }
        })
        await firestoreService.updateMessage(roomId, messageId, {
          files: message.files
        })
        resolve(true)
      }
    )
  })
}

function updateFileProgress(messageId, fileUrl, progress) {
  const message = messages.find(message => message._id === messageId)
  if (!message || !message.files) return
  message.files.find(file => file.url === fileUrl).progress = progress
  // messages = [...messages]
}

function formattedFiles(files) {
  const formattedFiles = []
  files.forEach(file => {
    const messageFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      extension: file.extension || file.type,
      url: file.url || file.localUrl
    }
    if (file.audio) {
      messageFile.audio = true
      messageFile.duration = file.duration
    }
    formattedFiles.push(messageFile)
  })
  return formattedFiles
}

const styles = {
  general: {
    color: '#0a0a0a',
    colorSpinner: '#333',
    borderStyle: '1px solid #e1e4e8',
    colorCaret: '#25324B',
  },

  container: {
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none'
  },

  content: {
    background: '#FFFFFF'
  },

  footer: {
    background: '#f8f9fa',
    backgroundReply: 'rgba(0, 0, 0, 0.08)'
  },

  icons: {
    microphone: '#7330DF',
  },

  message: {
    background: '#FFFFFF',
    backgroundMe: '#E8E8E8',
    color: '#0a0a0a',
    colorStarted: '#9ca6af',
    backgroundDeleted: '#dadfe2',
    backgroundSelected: '#c2dcf2',
    colorDeleted: '#757e85',
    colorUsername: '#9ca6af',
    colorTimestamp: '#828c94',
    backgroundDate: '#e5effa',
    colorDate: '#505a62',
    backgroundSystem: '#e5effa',
    colorSystem: '#505a62',
    backgroundMedia: 'rgba(0, 0, 0, 0.15)',
    backgroundReply: 'rgba(0, 0, 0, 0.08)',
    colorReplyUsername: '#0a0a0a',
    colorReply: '#6e6e6e',
    colorTag: '#0d579c',
    backgroundImage: '#ddd',
    colorNewMessages: '#7330DF',
    backgroundScrollCounter: '#7330DF',
    colorScrollCounter: '#fff',
    backgroundReaction: '#eee',
    borderStyleReaction: '1px solid #eee',
    backgroundReactionHover: '#fff',
    borderStyleReactionHover: '1px solid #ddd',
    colorReactionCounter: '#0a0a0a',
    backgroundReactionMe: '#cfecf5',
    borderStyleReactionMe: '1px solid #3b98b8',
    backgroundReactionHoverMe: '#cfecf5',
    borderStyleReactionHoverMe: '1px solid #3b98b8',
    colorReactionCounterMe: '#0b59b3',
    backgroundAudioRecord: '#eb4034',
    backgroundAudioLine: 'rgba(0, 0, 0, 0.15)',
    backgroundAudioProgress: '#455247',
    backgroundAudioProgressSelector: '#455247',
    colorFileExtension: '#757e85'
  },

  sidemenu: {
    background: '#fff',
    backgroundHover: '#f6f6f6',
    backgroundActive: '#F1EAFC',
    colorActive: '#1976d2',
    borderColorSearch: '#e1e5e8'
  },
}
onMounted(() => {
  const style = document.createElement('style')
  style.innerHTML = `
  .vac-textarea { border-radius: 0}


  .vac-message-wrapper .vac-message-card {
    border: 1px solid #D1D1D1;
    padding: 12px 16px;
    box-shadow: none;
    font-family: 'Epilogue';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 160%;
    color: #454545;
    border-radius: 0;
  }

  .vac-reply-message {
    background: white;
  }

  .vac-message-wrapper .vac-message-current {
    border-radius: 8px 0px 8px 8px;
    border: 0px;
  }

  .vac-box-search {
    padding: 0;
    padding-bottom: 28px;
  }

  .vac-rooms-container .vac-room-list{
    padding: 0;
  }

  .vac-col-messages .vac-messages-container {
    padding: 28px 32px;
  }

  .vac-box-search .vac-icon-search {
    left: 16px;
  }

  .vac-box-search .vac-input {
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
    border-radius: 0;
  }

  .vac-box-footer {
    padding: 28px 32px;
    background: white;
  }

  .vac-icon-textarea {
    gap: 16px;
  }

  .vac-svg-button {
    max-height: unset;
  }

  .vac-col-messages .vac-icon-scroll {
    bottom: 120px;
  }

  .vac-rooms-container .vac-room-item {
    border-radius: 0;
    align-items: center;
    display: flex;
    flex: 1 1 100%;
    margin-bottom: 5px;
    padding: 0 14px;
    position: relative;
    min-height: 71px;
    transition: background-color .3s cubic-bezier(.25,.8,.5,1);
    padding: 16px;
    gap: 16px;
    height: 86px;
    background: #FFFFFF;
    box-shadow: inset 0px -1px 0px #D6DDEB;
  }
  .vac-rooms-container .vac-room-selected {
    box-shadow: none;
  }

  .vac-avatar {
    width: 48px;
    height: 48px;
  }

  .vac-rooms-container{
    padding: 28px 32px;
    flex: 0 0 416px;
    box-sizing: border-box;
  }

  .vac-room-container .vac-room-name {
    font-family: 'Epilogue';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;
    /* identical to box height, or 26px */

    display: flex;
    align-items: center;

    /* Neutrals/100 */

    color: #171717
  }

  .vac-info-wrapper .vac-avatar {
    min-height: 56px;
    min-width: 56px;
  }

  .vac-message-actions-wrapper .vac-options-container {
    top: -4px;
    right: -16px;
    border-radius: 0;
  }
  .vac-message-actions-wrapper .vac-blur-container {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 8px;
    bottom: 10px;
    background: #F8F8FD;
    filter: none;
    border-radius: 0;
  }
  `
  chatWindow.value.shadowRoot.appendChild(style)
})
</script>
<style scoped>
.btn-send {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;

  width: 73px;
  height: 40px;
  background: #7330DF;
  border-radius: 8px;

}


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
  /*  max-width: 1167px;*/

}

#messages-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 1px;
  background: #FFFFFF;
  margin: 0 auto;
  /*  max-width: 1167px;*/
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
