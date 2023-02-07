<template>
  <div class="tag-input">
    <input v-model="newTag" type="text" @keydown.enter="addTag(newTag)" @keydown.prevent.tab="addTag(newTag)" class="border border-secondary rounded-md text-primary focus:border-primary focus:ring-0" placeholder="Add skills" />

    <div class="flex items-center gap-4 w-full flex-wrap mt-4">
      <div v-for="(tag, index) in tags" :key="tag" class="tag">
        {{tag}}
        <a class="delete" @click="removeTag(index)">
          <IconXTag />
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import IconXTag from '@/components/icons/IconXTag.vue'

const props = defineProps({ modelValue: { type: Array, default: () => [] } })
const emit = defineEmits(['update:modelValue'])

const tags = ref(props.modelValue);
const newTag = ref('')

function removeTag(index) {
  tags.value.splice(index, 1);
};

function addTag(tag) {
  tags.value.push(tag)
  newTag.value = "";
};

const onTagsChange = () => {
  emit("update:modelValue", tags.value)
};

watch(tags, () => nextTick(onTagsChange));
onMounted(onTagsChange);
</script>
<style scoped>
.tag {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 4px 4px 12px;
  gap: 8px;
  height: 34px;
  background: #E8E8E8;
  flex: none;
  order: 0;
  flex-grow: 0;
  white-space: nowrap;
  transition: 0.1s ease background;
  font-family: 'Epilogue';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  display: flex;
  align-items: center;
  color: #7330DF;
}

.delete {
  color: white;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>
