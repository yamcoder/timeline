<template>
  <form @submit.prevent="onSubmit(blockData)">
    <div>
      <label for="title">Title</label>
      <input type="text" v-model="blockData.title" required />
    </div>
    <div>
      <label for="duration">Duration (seconds)</label>
      <input type="number" v-model.number="blockData.duration" required :min="MIN_DURATION_SECONDS" :max="MAX_DURATION_SECONDS"/>
    </div>
    <div>
      <label for="startTime">Start Time (unix timestamp)</label>
      <input type="number" v-model.number="blockData.startTime" required />
    </div>
    <div>
      <label for="color">Color</label>
      <input type="color" v-model="blockData.color" required />
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <button type="submit">{{ submitButtonText }}</button>
    <button type="button" @click="handleCancel" v-if="onCancel">Cancel</button>
  </form>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'MediaBlockFormBase',
  props: {
    initialBlockData: {
      type: Object,
      required: true,
    },
    submitButtonText: {
      type: String,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
      required: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const MIN_DURATION_SECONDS = 1;
    const MAX_DURATION_SECONDS = 7200;
    const blockData = ref({ ...props.initialBlockData });

    const handleCancel = (event: Event) => {
      if (props.onCancel) {
        props.onCancel(event);
      }
    };

    return {
      blockData,
      handleCancel,
      MIN_DURATION_SECONDS,
      MAX_DURATION_SECONDS
    };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

form div {
  display: flex;
  flex-direction: column;
}

form label {
  margin-bottom: 5px;
  color: #555;
}

form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form input[type="color"] {
  padding: 0;
  height: 40px;
}

form button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>
