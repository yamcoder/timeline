<template>
  <div class="media-block-list">
    <draggable
      v-model="mediaBlocks"
      @end="onEnd"
      item-key="id"
      :animation="200"
      ghost-class="ghost"
    >
      <template #item="{ element: block }">
        <div :style="{ backgroundColor: block.color }" class="media-block">
          <div>
            <strong>{{ block.title }}</strong>
            <span>({{ formatTime(block.startTime) }} - {{ formatTime(block.startTime + block.duration) }})</span>
          </div>
          <div>
            <button @click="deleteBlock(block.id)">Delete</button>
            <button @click="editBlock(block.id)">Edit</button>
          </div>
        </div>
      </template>
    </draggable>
    <EditMediaBlock
      v-if="editingBlockId"
      :blockId="editingBlockId"
      @editCompleted="editingBlockId = ''"
    />
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useMediaBlocksStore } from '../store/mediaBlocks';
import EditMediaBlock from './EditMediaBlock.vue';
import draggable from 'vuedraggable';

export default {
  name: 'MediaBlockList',
  components: {
    draggable,
    EditMediaBlock
  },
  setup() {
    const store = useMediaBlocksStore();
    const mediaBlocks = ref([...store.mediaBlocks]);
    const editingBlockId = ref('');

    const deleteBlock = (id: string) => {
      store.deleteMediaBlock(id);
    };

    const editBlock = (id: string) => {
      editingBlockId.value = id;
    };

    const moveBlock = (id: string) => {
      const newStartTime = parseInt(prompt('Enter new start time (unix timestamp):')!, 10);
      if (!isNaN(newStartTime)) {
        store.moveMediaBlock(id, newStartTime);
      }
    };

    const formatTime = (timestamp: number) => {
      const date = new Date(timestamp * 1000);
      return date.toISOString().substr(11, 8);
    };

    const onEnd = () => {
      store.updateMediaBlocksOrder(mediaBlocks.value);
    };

    watch(() => store.mediaBlocks, (newBlocks) => {
      mediaBlocks.value = [...newBlocks];
    }, { deep: true });

    return {
      mediaBlocks,
      deleteBlock,
      editBlock,
      editingBlockId,
      moveBlock,
      formatTime,
      onEnd
    };
  }
};
</script>

<style scoped>
.media-block-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.media-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: move;
}

.media-block:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.media-block div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.media-block button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.media-block button:hover {
  background-color: #ddd;
}

.ghost {
  opacity: 0.5;
}
</style>