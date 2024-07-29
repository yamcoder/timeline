<template>
  <div class="edit-media-block">
    <h2>Edit Media Block</h2>
    <MediaBlockFormBase
      :initialBlockData="initialBlockData"
      :submitButtonText="'Save'"
      :onSubmit="saveBlock"
      :onCancel="cancelEdit"
      :errorMessage="errorMessage"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useMediaBlocksStore } from '../store/mediaBlocks';
import MediaBlockFormBase from './MediaBlockFormBase.vue';

export default {
  name: 'EditMediaBlock',
  components: {
    MediaBlockFormBase,
  },
  props: ['blockId'],
  setup(props, { emit }) {
    const store = useMediaBlocksStore();
    const errorMessage = ref('');
    const block = store.mediaBlocks.find(b => b.id === props.blockId);
    const initialBlockData = { ...block };

    const saveBlock = (blockData: any) => {
      const updatedBlock = {
        ...blockData,
        id: props.blockId,
      };

      const newStartTime = updatedBlock.startTime;
      const newEndTime = newStartTime + updatedBlock.duration;

      const hasOverlap = store.mediaBlocks.some(b => {
        if (b.id !== props.blockId) {
          const blockEndTime = b.startTime + b.duration;
          return (newStartTime < blockEndTime && newEndTime > b.startTime);
        }
        return false;
      });

      if (hasOverlap) {
        errorMessage.value = 'This media block overlaps with another block. Please adjust the start time or duration.';
        return;
      }

      store.updateMediaBlock(updatedBlock);
      errorMessage.value = '';
      emit('editCompleted');
    };

    const cancelEdit = () => {
      emit('editCompleted');
    };

    return {
      cancelEdit,
      initialBlockData,
      saveBlock,
      errorMessage,
    };
  }
};
</script>

<style scoped>
.edit-media-block {
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
