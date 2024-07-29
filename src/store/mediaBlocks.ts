import { defineStore } from 'pinia';

export interface MediaBlock {
  id: string;
  title: string;
  duration: number;
  startTime: number;
  color: string;
}

export const useMediaBlocksStore = defineStore('mediaBlocks', {
  state: () => ({
    mediaBlocks: [] as MediaBlock[],
  }),
  actions: {
    addMediaBlock(block: MediaBlock) {
      this.mediaBlocks.push(block);
    },
    updateMediaBlock(updatedBlock: MediaBlock) {
      const index = this.mediaBlocks.findIndex(block => block.id === updatedBlock.id);
      if (index !== -1) {
        this.mediaBlocks[index] = updatedBlock;
      }
    },
    deleteMediaBlock(id: string) {
      this.mediaBlocks = this.mediaBlocks.filter(block => block.id !== id);
    },
    moveMediaBlock(id: string, newStartTime: number) {
      const blockToMove = this.mediaBlocks.find(block => block.id === id);
      if (!blockToMove) {
        return;
      }

      const newEndTime = newStartTime + blockToMove.duration;

      for (const block of this.mediaBlocks) {
        if (block.id !== id) {
          const blockEndTime = block.startTime + block.duration;

          if (
            (newStartTime < blockEndTime && newEndTime > block.startTime) ||
            (block.startTime < newEndTime && blockEndTime > newStartTime)
          ) {
            console.warn("This media block overlaps with another block. Please adjust the start time or duration.");
            return;
          }
        }
      }

      blockToMove.startTime = newStartTime;
      this.updateMediaBlock(blockToMove);
    },
    updateMediaBlocksOrder(newOrder: MediaBlock[]) {
      this.mediaBlocks = [...newOrder];
    }
  }
});