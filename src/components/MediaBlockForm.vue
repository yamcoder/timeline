<template>
  <div class="media-block-form">
    <h2>Add Media Block</h2>
    <MediaBlockFormBase
      :initialBlockData="initialBlockData"
      :submitButtonText="'Add'"
      :onSubmit="addBlock"
      :errorMessage="errorMessage"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useMediaBlocksStore } from '../store/mediaBlocks';
import MediaBlockFormBase from './MediaBlockFormBase.vue';

export default {
  name: 'MediaBlockForm',
  components: {
    MediaBlockFormBase,
  },
  setup() {
    const store = useMediaBlocksStore();
    const errorMessage = ref('');

    let initialBlockData = {
      title: '',
      duration: 0,
      startTime: 0,
      color: '#ffffff',
    };

    const addBlock = (blockData: any) => {
      const newBlock = {
        ...blockData,
        id: Date.now().toString(),
      };

      const newStartTime = newBlock.startTime;
      const newEndTime = newStartTime + newBlock.duration;

      const hasOverlap = store.mediaBlocks.some(b => {
        const blockEndTime = b.startTime + b.duration;
        return (newStartTime < blockEndTime && newEndTime > b.startTime);
      });

      if (hasOverlap) {
        errorMessage.value = 'This media block overlaps with another block. Please adjust the start time or duration.';
        return;
      }

      store.addMediaBlock(newBlock);
      errorMessage.value = '';
    };

    return {
      initialBlockData,
      addBlock,
      errorMessage,
    };
  }
};
</script>

<style scoped>
.media-block-form {
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
