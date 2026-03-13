// Author: Juan Manuel Zapata
// -------------------------------
// Own Imports
// -------------------------------
import type { ComputerInterface } from '@interfaces/ComputerInterface';
import type { ComponentInterface } from '@interfaces/ComponentInterface';
import { useUsersStore } from '@stores/UsersStore';

const STORAGE_KEYS = {
  pcs: 'pc-manager-pcs',
  components: 'pc-manager-components',
};

const defaultPcs: ComputerInterface[] = [
  { id: 1, name: 'PC-01', status: 'active' },
  { id: 2, name: 'PC-02', status: 'inactive' },
  { id: 3, name: 'PC-03', status: 'maintenance' },
];

const defaultComponents: ComponentInterface[] = [
  { id: 1, name: 'RAM 8GB', status: 'available' },
  { id: 2, name: 'SSD 256GB', status: 'in-use' },
  { id: 3, name: 'GPU', status: 'maintenance' },
  { id: 4, name: 'HDD 1TB', status: 'damaged' },
];

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function getPCs(): ComputerInterface[] {
  if (typeof window === 'undefined') return defaultPcs;

  const stored = window.localStorage.getItem(STORAGE_KEYS.pcs);
  const pcs = safeParse<ComputerInterface[]>(stored, defaultPcs);
  if (!stored) {
    window.localStorage.setItem(STORAGE_KEYS.pcs, JSON.stringify(pcs));
  }
  return pcs;
}

export function getComponents(): ComponentInterface[] {
  if (typeof window === 'undefined') return defaultComponents;

  const stored = window.localStorage.getItem(STORAGE_KEYS.components);
  const components = safeParse<ComponentInterface[]>(stored, defaultComponents);
  if (!stored) {
    window.localStorage.setItem(STORAGE_KEYS.components, JSON.stringify(components));
  }
  return components;
}

export function getUsers() {
  const usersStore = useUsersStore();
  return usersStore.users;
}

export function savePCs(pcs: ComputerInterface[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEYS.pcs, JSON.stringify(pcs));
}

export function addPC(pc: Omit<ComputerInterface, 'id'>): ComputerInterface {
  const pcs = getPCs();
  const nextId = pcs.length ? Math.max(...pcs.map((p) => p.id)) + 1 : 1;
  const newPc: ComputerInterface = { id: nextId, ...pc };
  savePCs([...pcs, newPc]);
  return newPc;
}

export function updatePC(id: number, values: Partial<Omit<ComputerInterface, 'id'>>): ComputerInterface | null {
  const pcs = getPCs();
  const index = pcs.findIndex((pc) => pc.id === id);
  if (index === -1) return null;
  const updated: ComputerInterface = { ...pcs[index], ...values } as ComputerInterface;
  pcs[index] = updated;
  savePCs(pcs);
  return updated;
}

export function deletePC(id: number): void {
  const pcs = getPCs();
  savePCs(pcs.filter((pc) => pc.id !== id));
}

export function saveComponents(components: ComponentInterface[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEYS.components, JSON.stringify(components));
}

export function addComponent(component: Omit<ComponentInterface, 'id'>): ComponentInterface {
  const components = getComponents();
  const nextId = components.length ? Math.max(...components.map((c) => c.id)) + 1 : 1;
  const newComponent: ComponentInterface = { id: nextId, ...component };
  saveComponents([...components, newComponent]);
  return newComponent;
}

export function updateComponent(id: number, values: Partial<Omit<ComponentInterface, 'id'>>): ComponentInterface | null {
  const components = getComponents();
  const index = components.findIndex((c) => c.id === id);
  if (index === -1) return null;
  const updated: ComponentInterface = { ...components[index], ...values } as ComponentInterface;
  components[index] = updated;
  saveComponents(components);
  return updated;
}

export function deleteComponent(id: number): void {
  const components = getComponents();
  saveComponents(components.filter((c) => c.id !== id));
}
