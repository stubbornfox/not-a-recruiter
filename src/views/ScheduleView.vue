<template>
  <div class="lg:mx-auto lg:max-w-7xl w-full p-4 lg:p-8 pb-0 min-h-full">
    <div class="flex justify-between items-center w-full  border-b border-neutrals-20 pb-3">
      <div class="flex items-center gap-4">
        <h4 class="text-neutrals-100">My Schedule</h4>
        <button class="text-neutrals-100 font-bold text-primary  py-3 px-6 rounded-lg border border-neutrals-20">Today</button>
      </div>
      <div>
        <span class="text-neutrals-100 font-bold">NOVEMBER 2023</span>
      </div>
      <div>
        <nav class="-mb-px flex justify-between lg:justify-start lg:gap-10" aria-label="Tabs">
          <a v-for="tab in tabs" :key="tab.name" @click="current_tab = tab.key" :class="[tab.key == current_tab ? 'border-purple text-neutrals-100' : 'border-transparent text-neutrals-60 hover:text-neutrals-80 hover:border-neutrals-40', 'py-4 px-1 border-b-4 font-semibold']" :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</a>
        </nav>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row min-h-full">
      <div class="basis-1/4 border-r border-neutrals-20 py-6">
        <div class="lg:pr-6 border-b border-neutrals-20">
          <button class="flex items-center gap-2 border border-secondary w-full py-3 justify-center rounded-lg mb-4">
            <i><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99935 0.333496C7.45959 0.333496 7.83268 0.706592 7.83268 1.16683V12.8335C7.83268 13.2937 7.45959 13.6668 6.99935 13.6668C6.53911 13.6668 6.16602 13.2937 6.16602 12.8335V1.16683C6.16602 0.706592 6.53911 0.333496 6.99935 0.333496Z" fill="#7330DF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.333984 6.99984C0.333984 6.5396 0.70708 6.1665 1.16732 6.1665H12.834C13.2942 6.1665 13.6673 6.5396 13.6673 6.99984C13.6673 7.46007 13.2942 7.83317 12.834 7.83317H1.16732C0.70708 7.83317 0.333984 7.46007 0.333984 6.99984Z" fill="#7330DF" />
              </svg>
            </i>
            <div class="pt-1 font-semibold text-primary leading-none">Create Event</div>
          </button>
          <v-calendar class="w-full small-calendar" />
        </div>
        <div class="py-6 lg:pr-6">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-neutrals-100">Categories</p>
            <button class="flex items-center gap-2 py-3">
              <i><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99935 0.333496C7.45959 0.333496 7.83268 0.706592 7.83268 1.16683V12.8335C7.83268 13.2937 7.45959 13.6668 6.99935 13.6668C6.53911 13.6668 6.16602 13.2937 6.16602 12.8335V1.16683C6.16602 0.706592 6.53911 0.333496 6.99935 0.333496Z" fill="#7330DF" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.333984 6.99984C0.333984 6.5396 0.70708 6.1665 1.16732 6.1665H12.834C13.2942 6.1665 13.6673 6.5396 13.6673 6.99984C13.6673 7.46007 13.2942 7.83317 12.834 7.83317H1.16732C0.70708 7.83317 0.333984 7.46007 0.333984 6.99984Z" fill="#7330DF" />
                </svg>
              </i>
              <div class="pt-1 font-semibold text-primary leading-none">Add category</div>
            </button>
          </div>
          <ul class="mt-4">
            <li v-for="event in eventCategories" class="mb-4">
              <FormKit type="checkbox" :label="event.text" />
            </li>
          </ul>
        </div>
      </div>
      <div class="basis-3/4 lg:pl-6">
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const tabs = [
  { name: 'Day', key: 'day' },
  { name: 'Week', key: 'week' },
  { name: 'Month', key: 'month' },
]

const eventCategories = [
  { key: 'interview', text: 'Interview Schedule', color: 'primary' },
  { key: 'internal_meeting', text: 'Internal Meeting', color: 'green' },
  { key: 'team_schedule', text: 'Team Schedule', color: 'blue' },
  { key: 'my_task', text: 'My Task', color: 'yellow' },
  { key: 'reminders', text: 'Reminders', color: 'red' },
]
const month = new Date().getMonth();
const year = new Date().getFullYear();
const masks = {
  weekdays: 'WWW',
}
const attributes = [{
    key: 1,
    customData: {
      title: 'Lunch with mom.',
      class: 'bg-red-600 text-white',
    },
    dates: new Date(year, month, 15),
  },
  {
    key: 2,
    customData: {
      title: 'Take Noah to basketball practice',
      class: 'bg-blue-500 text-white',
    },
    dates: new Date(year, month, 16),
  },
  {
    key: 3,
    customData: {
      title: "Noah's basketball game.",
      class: 'bg-blue-500 text-white',
    },
    dates: new Date(year, month, 15),
  },
  {
    key: 4,
    customData: {
      title: 'Take car to the shop',
      class: 'bg-indigo-500 text-white',
    },
    dates: new Date(year, month, 5, 4, 5, 6, 30),
  },
  {
    key: 4,
    customData: {
      title: 'Meeting with new client.',
      class: 'bg-teal-500 text-white',
    },
    dates: new Date(year, month, 7),
  },
  // {
  //   key: 5,
  //   customData: {
  //     title: "Mia's gymnastics practice.",
  //     class: 'bg-pink-500 text-white',
  //   },
  //   dates: new Date(year, month, 11),
  // },
  // {
  //   key: 6,
  //   customData: {
  //     title: 'Cookout with friends.',
  //     class: 'bg-orange-500 text-white',
  //   },
  //   dates: { months: 5, ordinalWeekdays: { 2: 1 } },
  // },
  // {
  //   key: 7,
  //   customData: {
  //     title: "Mia's gymnastics recital.",
  //     class: 'bg-pink-500 text-white',
  //   },
  //   dates: new Date(year, month, 22),
  // },
  // {
  //   key: 8,
  //   customData: {
  //     title: 'Visit great grandma.',
  //     class: 'bg-red-600 text-white',
  //   },
  //   dates: new Date(year, month, 25),
  // },
]
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
}

.small-calendar.vc-container {
  border: 0;
}

.custom-calendar.vc-container {
  --day-border: 1px solid #E4E5E7;
  --day-border-highlight: 1px solid #E4E5E7;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #fff;
  --weekday-border: 1px solid #D1D1D1;
  border-radius: 0;
  width: 100%;

  .vc-header {
    background-color: #fff;
    padding: 10px 0;
  }

  .vc-weeks {
    padding: 0;
  }

  .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
    text-transform: uppercase;
    color: #7C8493;
  }

  .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;

    .weekday-1,
    .weekday-7 {
      background-color: #eff8ff;
    }

    &:not(.on-bottom) {
      border-bottom: var(--day-border);

      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }

    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }

  &.vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
