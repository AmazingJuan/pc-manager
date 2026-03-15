<!-- Author: Juan Pablo Avendaño -->
<script setup lang="ts">
// -------------------------------
// Own Imports
// -------------------------------
import type { CreateUserDTO } from '@dtos/user/CreateUserDTO';
import { createUserSchema } from '@schemas/user/UserSchema';
import type { EditUserDTO } from '@dtos/user/EditUserDTO';
import type { UserInterface } from '@interfaces/UserInterface';

// -------------------------------
// Third Party Imports
// -------------------------------
import { computed } from 'vue';
import { ErrorMessage, Field, Form } from 'vee-validate';

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
const emit = defineEmits<{ create: [payload: CreateUserDTO]; edit: [payload: EditUserDTO]; cancel: [] }>();

// -------------------------------
// Computed Variables
// -------------------------------
const initialValues = computed(() => ({
  name: props.user?.name ?? '',
  username: props.user?.username ?? '',
  email: props.user?.email ?? '',
  password: props.user?.password ?? '',
  role: props.user?.role ?? 'user',
}));

const validationSchema = computed(() => createUserSchema(props.user?.id));

// -------------------------------
// Functions
// -------------------------------
function handleSubmit(values: Record<string, unknown>): void {
  const payload: CreateUserDTO = {
    name: String(values.name ?? '').trim(),
    username: String(values.username ?? '').trim(),
    email: String(values.email ?? '').trim(),
    password: String(values.password ?? ''),
    role: (values.role === 'admin' ? 'admin' : 'user') as CreateUserDTO['role'],
    computerIds: props.user?.computerIds ?? null,
  };

  if (props.user) {
    emit('edit', payload);
    return;
  }

  emit('create', payload);
}
</script>

<template>
  <Form
    :key="user ? `edit-${user.id}` : 'create-user'"
    :initial-values="initialValues"
    :validation-schema="validationSchema"
    class="space-y-4"
    @submit="handleSubmit"
  >
    <div>
      <label class="block text-sm text-foreground mb-2">Full Name *</label>
      <Field v-slot="{ field, errorMessage }" name="name">
        <input
          v-bind="field"
          type="text"
          class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          :class="errorMessage ? 'border-destructive' : 'border-border'"
          placeholder="Enter full name"
        />
      </Field>
      <ErrorMessage name="name" v-slot="{ message }">
        <p class="text-xs text-destructive mt-1">{{ message }}</p>
      </ErrorMessage>
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">Username *</label>
      <Field v-slot="{ field, errorMessage }" name="username">
        <input
          v-bind="field"
          type="text"
          class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          :class="errorMessage ? 'border-destructive' : 'border-border'"
          placeholder="Enter username"
        />
      </Field>
      <ErrorMessage name="username" v-slot="{ message }">
        <p class="text-xs text-destructive mt-1">{{ message }}</p>
      </ErrorMessage>
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">Email *</label>
      <Field v-slot="{ field, errorMessage }" name="email">
        <input
          v-bind="field"
          type="email"
          class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          :class="errorMessage ? 'border-destructive' : 'border-border'"
          placeholder="example@email.com"
        />
      </Field>
      <ErrorMessage name="email" v-slot="{ message }">
        <p class="text-xs text-destructive mt-1">{{ message }}</p>
      </ErrorMessage>
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">Password *</label>
      <Field v-slot="{ field, errorMessage }" name="password">
        <input
          v-bind="field"
          type="password"
          class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          :class="errorMessage ? 'border-destructive' : 'border-border'"
          placeholder="Minimum 8 characters"
        />
      </Field>
      <ErrorMessage name="password" v-slot="{ message }">
        <p class="text-xs text-destructive mt-1">{{ message }}</p>
      </ErrorMessage>
    </div>

    <div>
      <label class="block text-sm text-foreground mb-2">Role *</label>
      <Field v-slot="{ field, errorMessage }" name="role">
        <select
          v-bind="field"
          class="w-full px-4 py-2 bg-input rounded-lg border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          :class="errorMessage ? 'border-destructive' : 'border-border'"
        >
          <option value="user">User</option>
          <option value="admin">Administrator</option>
        </select>
      </Field>
      <ErrorMessage name="role" v-slot="{ message }">
        <p class="text-xs text-destructive mt-1">{{ message }}</p>
      </ErrorMessage>
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
  </Form>
</template>
