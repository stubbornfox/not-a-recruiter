<template>
  <div class="flex flex-col gap-6 lg:p-6">
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between w-full">
        <p class="text-neutrals-100 text-lg font-semibold">Current Stage</p>
        <button class="p-4 flex gap-2 items-center border border-secondary rounded-lg" @click="showRating=true">
          <i><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8337 7.0835L10.0003 12.9168L4.16699 7.0835" stroke="#7330DF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </i>
          <span class="text-primary font-semibold">Give Rating</span>
        </button>
      </div>
      <div class="stages flex gap-3">
        <div :class="[currentStage('review') ? 'text-white bg-blue': 'text-blue bg-tertiary', 'font-semibold py-3 px-12']">In-Review</div>
        <div :class="[currentStage('shortlisted') ? 'text-white bg-blue': 'text-blue bg-tertiary', 'font-semibold py-3 px-12']">Shortlisted</div>
        <div :class="[currentStage('interview') ? 'text-white bg-blue': 'text-blue bg-tertiary', 'font-semibold py-3 px-12']">Interview</div>
        <div :class="[currentStage('hired/declined') ? 'text-white bg-blue': 'text-blue bg-tertiary', 'font-semibold py-3 px-12']">Hired/Declined</div>
      </div>
      <div class="stage-info">
         <p class="text-neutrals-100 font-semibold">Stage Info</p>
        <button class="mt-6 p-4 flex gap-2 items-center border border-secondary rounded-lg" @click="showRating=true">
          <span class="text-primary font-semibold">Move to next stage</span>
        </button>
      </div>
    </div>
    <hr class="my-6">
    <div>
      <div class="flex items-center justify-between w-full">
        <p class="text-neutrals-100 text-lg font-semibold">Notes</p>
        <button class="py-2 px-4 flex gap-2 items-center" @click="showAddNote=true">
          <i><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_29612_29878)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0003 3.3335C10.4606 3.3335 10.8337 3.70659 10.8337 4.16683V15.8335C10.8337 16.2937 10.4606 16.6668 10.0003 16.6668C9.54009 16.6668 9.16699 16.2937 9.16699 15.8335V4.16683C9.16699 3.70659 9.54009 3.3335 10.0003 3.3335Z" fill="#7330DF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33301 9.99984C3.33301 9.5396 3.7061 9.1665 4.16634 9.1665H15.833C16.2932 9.1665 16.6663 9.5396 16.6663 9.99984C16.6663 10.4601 16.2932 10.8332 15.833 10.8332H4.16634C3.7061 10.8332 3.33301 10.4601 3.33301 9.99984Z" fill="#7330DF" />
              </g>
              <defs>
                <clipPath id="clip0_29612_29878">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </i>
          <span class="text-primary font-semibold">Add Note</span>
        </button>
      </div>
      <div v-if="showAddNote" class="mt-6">
        <TextEditor v-model="note" />
        <button class=" mt-5 border border-primary rounded text-primary font-semibold px-4 py-2" @click="saveNote">Save</button>
      </div>
      <div class="mt-6 flex flex-col gap-6">
        <div v-for="i_note in notes" class="border border-neutrals-20 p-4 text-neutrals-80" v-html="i_note">
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { useCandidateStore } from '../stores/candidate'
import { useRoute } from "vue-router";
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import IconPlus from '@/components/icons/IconPlus.vue'
import TextEditor from '@/components/TextEditor.vue'
const note = ref('')
const route = useRoute()
const candidateStore = useCandidateStore()
const { updateCandidate } = candidateStore
const { slug, stage, candidate_id } = route.params
const showAddNote = ref(false)
const props = defineProps({
  applicant: { type: Object, default: {} }
})

const current_stage = ref(props.applicant.stage || 'review')

const notes = ref(props.applicant.notes || [])

function currentStage(stage) {
  return stage == current_stage.value
}
function saveNote() {
  notes.value.push(note.value)
  showAddNote.value = false
  // updateCandidate(slug, stage, candidate_id, { candidate: { notes: noteHtml } })
}
</script>
