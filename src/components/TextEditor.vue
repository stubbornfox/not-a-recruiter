<template>
  <div class="w-full h-full flex flex-col">
    <div v-if="editor" class="border border-neutrals-20">
      <editor-content :editor="editor" class="flex-grow text-neutrals-80 p-4 min-h-40"/>
      <div class="border-t border-neutrals-20 py-3 px-4">
        <button @click.prevent="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" >
          <IconTextEditorBold/>
        </button>
        <button @click.prevent="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
          <IconTextEditorItalic/>
        </button>
        <button @click.prevent="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
          <IconTextEditorListOrder/>
        </button>
        <button @click.prevent="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
          <IconTextEditorList/>
        </button>
        <button @click.prevent="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
          <IconTextEditorUpload/>
        </button>
      </div>
    </div>
    <div class="flex items-center justify-between mt-1">
      <div class="text-neutrals-40">Maximum 500 characters</div>
      <div class="text-neutrals-80">0/500</div>
    </div>
  </div>
</template>
<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { ref, onMounted } from 'vue'
import IconTextEditorBold from '@/components/icons/IconTextEditorBold.vue'
import IconTextEditorItalic from '@/components/icons/IconTextEditorItalic.vue'
import IconTextEditorListOrder from '@/components/icons/IconTextEditorListOrder.vue'
import IconTextEditorList from '@/components/icons/IconTextEditorList.vue'
import IconTextEditorUpload from '@/components/icons/IconTextEditorUpload.vue'

const content = ref(props.context?.value || props.modelValue)
const editor = new Editor({
  content: content.value,
  extensions: [
    StarterKit,
  ],
})

const props = defineProps({
  modelValue: { type: Text, default: () => "" },
  context: Object
})
const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  editor.on('update', ({ editor }) => {
    props.context?.node?.input(editor.getHTML())
    emit("update:modelValue", editor.getHTML())
  })
})

</script>
<style lang="scss">

button {
  padding: 0.1rem;
  margin: 0.1rem;

  &:hover {
    background-color: var(--qrh-tertiary);
  }
}

.is-active {
  color: var(--color-heading);
  font-weight: bold;
  background-color: var(--qrh-netrals-20);
}

.ProseMirror {
  height: 100%;
  outline: none;
  min-height: 152px;

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
