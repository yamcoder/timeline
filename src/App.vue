<template>
  <MediaBlockList />
  <MediaBlockForm />
</template>

<script>
import MediaBlockList from './components/MediaBlockList.vue';
import MediaBlockForm from './components/MediaBlockForm.vue';

export default {
  name: 'App',
  components: {
    MediaBlockList,
    MediaBlockForm
  }
};
</script>

<style>
</style>
