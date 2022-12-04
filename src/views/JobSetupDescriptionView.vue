<template>
  <div class="w-full h-full p-5 flex flex-col">
    <div v-if="editor && job">
      <button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        bold
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        italic
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        strike
      </button>
      <button @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        code
      </button>
      <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
        paragraph
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        h1
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        h2
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        h3
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        h4
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        h6
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        bullet list
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
        ordered list
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
        code block
      </button>
      <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
        blockquote
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
        undo
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        redo
      </button>
    </div>
    <editor-content :editor="editor" class="text-color-text flex-grow" />
    <div class="border-t border-color h-20 flex items-center">
      <button class="text-white h-8 inline-flex bg-pink-600 hover:bg-pink-500 rounded items-center px-2" @click="saveDescrtiption">
        <span>Save changes</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { useJobStore } from '../stores/job'
import { useRoute } from "vue-router";
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const route = useRoute()
const jobStore = useJobStore()
const { slug } = route.params
const { job, error, loading } = storeToRefs(jobStore)
const { fetchJob, updateJob } = jobStore

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit,
  ],
})



onMounted(() => {
    fetchJob(slug).then(()=> {editor.value.commands.setContent(job.value.description)} )

})

function saveDescrtiption() {
  const descriptionHtml = editor.value.getHTML()
  updateJob(slug, { job: { description: descriptionHtml } })
}
</script>
<style lang="scss">
button {
  border: 1px solid var(--color-border);
  padding: 2px 5px;
  color: var(--color-text);
  border-radius: 0.3rem;
  padding: 0.1rem 0.4rem;
  margin: 0.1rem;

  &:hover {
    background-color: var(--color-background-soft);
    color: var(--color-heading);
  }
}

.is-active {
  color: var(--color-heading);
  font-weight: bold;
  background-color: var(--color-background-mute);
}

.ProseMirror {
  height: 100%;
  outline: none;
  margin-top: 1rem;

  >*+* {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
    list-style: disc;
  }

  ol {
    list-style-type: decimal;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}
</style>
