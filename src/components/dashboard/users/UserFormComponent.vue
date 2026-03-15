<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { UserInterface } from '@interfaces/UserInterface';
import type { CreateUserDTO } from '@dtos/user/CreateUserDTO';
import type { EditUserDTO } from '@dtos/user/EditUserDTO';

// -------------------------------
// Third Party Imports
// -------------------------------
import { ref, watch } from 'vue';

// -------------------------------
// Reactive Variables
// -------------------------------
const formData = ref<CreateUserDTO>({
  name: '',
  username: '',
  email: '',
  password: '',
  role: 'user',
  computerIds: null,
});

// -------------------------------
// Props
// -------------------------------
interface Props {
  user: UserInterface | null;
}

const props = defineProps<Props>();

// -------------------------------
// Emitters
// -------------------------------
const emit = defineEmits<{
  create: [payload: CreateUserDTO];
  edit: [payload: EditUserDTO];
  cancel: [];
}>();

// -------------------------------
// Functions
// -------------------------------
function resetFormState(): void {
  formData.value = {
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'user',
    computerIds: null,
  };
}

function handleSubmit(): void {
  if (props.user) {
    emit('edit', { ...formData.value });
    return;
  }
  emit('create', { ...formData.value });
}

// -------------------------------
// Watchers
// -------------------------------
watch(
  () => props.user,
  (user) => {
    if (!user) {
      resetFormState();
      return;
    }

    formData.value = {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      computerIds: user.computerIds,
    };
  },
  { immediate: true },
);
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label class="block text-sm text-foreground mb-2">Full Name *</label>
      <input
        v-model="formData.name"
        type="text"
        class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">Username *</label>
      <input
        v-model="formData.username"
        type="text"
        class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">Email *</label>
      <input
        v-model="formData.email"
        type="email"
        class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">Password *</label>
      <input
        v-model="formData.password"
        type="password"
        class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">Role *</label>
      <select
        v-model="formData.role"
        class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        required
      >
        <option value="user">User</option>
        <option value="admin">Administrator</option>
      </select>
    </div>

    <div class="flex gap-3 pt-4">
      <button
        type="submit"
        class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
      >
        {{ user ? 'Update' : 'Create' }}
      </button>
      <button
        type="button"
        class="flex-1 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-all"
        @click="emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
