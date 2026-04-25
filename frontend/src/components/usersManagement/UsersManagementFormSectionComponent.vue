<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { CreateUserDTO } from '@dtos/user/CreateUserDTO';
import type { EditUserDTO } from '@dtos/user/EditUserDTO';
import type { UserInterface } from '@interfaces/UserInterface';

// -------------------------------
// Third-Party Imports
// -------------------------------
import { computed, ref, watch } from 'vue';

// -------------------------------
// Props
// -------------------------------
interface Props {
  user: UserInterface | null;
  errorMessages?: string[];
}

const props = defineProps<Props>();

// -------------------------------
// Emitters
// -------------------------------
const emit = defineEmits<{ create: [payload: CreateUserDTO]; edit: [payload: EditUserDTO]; cancel: [] }>();

// -------------------------------
// Reactive Variables
// -------------------------------
const name = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const role = ref<'admin' | 'user'>('user');
const isEditMode = computed(() => Boolean(props.user));

// -------------------------------
// Functions
// -------------------------------
function syncFormValues(user: UserInterface | null): void {
  name.value = user?.name ?? '';
  username.value = user?.username ?? '';
  email.value = user?.email ?? '';
  password.value = '';
  role.value = user?.role === 'admin' ? 'admin' : 'user';
}

function handleSubmit(): void {
  if (isEditMode.value) {
    const payload: EditUserDTO = {};
    const normalizedName = name.value.trim();
    const normalizedUsername = username.value.trim();
    const normalizedEmail = email.value.trim();

    if (normalizedName) payload.name = normalizedName;
    if (normalizedUsername) payload.username = normalizedUsername;
    if (normalizedEmail) payload.email = normalizedEmail;
    if (password.value.trim()) payload.password = password.value;
    if (role.value) payload.role = role.value;

    emit('edit', payload);
    return;
  }

  emit('create', { name: name.value.trim(), username: username.value.trim(), email: email.value.trim(), password: password.value, role: role.value });
}

watch(() => props.user, syncFormValues, { immediate: true });
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label class="block text-sm text-foreground mb-2">Full Name</label>
      <input
        v-model="name"
        type="text"
        class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Enter full name"
        :required="!isEditMode"
      />
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">Username</label>
      <input
        v-model="username"
        type="text"
        class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Enter username"
        :required="!isEditMode"
      />
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">Email</label>
      <input
        v-model="email"
        type="email"
        class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="example@email.com"
        :required="!isEditMode"
      />
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">
        Password
        <span v-if="!isEditMode">*</span>
      </label>
      <input
        v-model="password"
        type="password"
        class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        :placeholder="isEditMode ? 'Leave empty to keep current password' : 'Minimum 8 characters'"
        :required="!isEditMode"
      />
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">Role</label>
      <select
        v-model="role"
        class="w-full px-4 py-2 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        :required="!isEditMode"
      >
        <option value="user">User</option>
        <option value="admin">Administrator</option>
      </select>
    </div>

    <div v-if="errorMessages?.length" class="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      <ul class="list-disc pl-5">
        <li v-for="message in errorMessages" :key="message">{{ message }}</li>
      </ul>
    </div>

    <div class="flex gap-3 pt-4">
      <button type="submit" class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
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
