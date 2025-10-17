<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const joinId = ref('');

const createSession = async () => {
  try {
    const res = await axios.post('/api/session');
    const id = res.data.id;
    router.push(`/session/${id}`);
  } catch (err) {
    console.error('Failed to create session', err);
  }
};

const joinSession = () => {
  const id = joinId.value.trim();
  if (!id) return;
  router.push(`/session/${id}`);
};
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-black">
    <h1 class="text-3xl font-bold mb-6">Planning Poker</h1>

    <div class="mb-8">
      <button 
        @click="createSession" 
        class="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create New Session
      </button>
    </div>

    <div class="flex flex-col items-center gap-2">
      <input 
        v-model="joinId" 
        type="text" 
        placeholder="Enter session ID" 
        class="px-4 py-2 border rounded w-48 text-center"
      />
      <button 
        @click="joinSession" 
        class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Join Session
      </button>
    </div>
  </div>
</template>
