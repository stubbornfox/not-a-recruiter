<script setup>
  const jobStages = [
            {text: 'Inbox', code: 'inbox', icon: 'fa-folder'},
            {text: 'Screen', code: 'screen', icon: 'fa-folder'},
            {text: 'Interview', code: 'interview', icon: 'fa-folder'},
            {text: 'Decide', code: 'decide', icon: 'fa-folder'},
            {text: 'Hired', code: 'hired', icon: 'fa-folder'},
            {text: 'Offer', code: 'offer', icon: 'fa-folder'},
            {text: 'Archived', code: 'archived', icon: 'fa-folder'},
          ]
  defineProps({
    job: {
      type: Object,
      default(rawProps) {
        return { inbox: 0, screen: 0, interview: 0, decide: 0, offer: 0, archived: 0, hired: '0' }
      }
    },
})
</script>

<template>
  <div id="jobsidebar">
    <a v-for="item in jobStages" :key="item.code">
       <div>
        <fa :icon="['far', item.icon]" />
        <span class="ml-2">{{item.text}}</span>
      </div>
      <span>{{job[item.code]}}</span>
    </a>

    <div class="mt-3">
      <a>
        <div>
          <fa :icon="['fas', 'fa-gear']" />
          <span class="ml-2">Job setup</span>
        </div>
      </a>
      <a>
        <div>
          <fa :icon="['fas', 'fa-share-nodes']" />
          <span class="ml-2">Distribution</span>
        </div>
      </a>
    </div>

  </div>
</template>

<style scoped>
  #jobsidebar {
    color: rgb(82, 82, 82);
    border-right: 1px solid rgb(229, 229, 229);
    overflow-y: auto;
  }

  #jobsidebar a {
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    margin-left: 0.375rem;
    margin-right: 0.375rem;
    padding-left: 0.625rem;
    padding-right: 10px;
    margin-bottom: 2px;
    flex-shrink: 0;
  }
  #jobsidebar a span {
    margin-right: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
   }
</style>
