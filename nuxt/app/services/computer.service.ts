// Author: Juan Pablo Avendaño

// -------------------------------
// Third-Party Imports
import type { AsyncData } from '#app';
import type { FetchError } from 'ofetch';
import type { MaybeRefOrGetter } from 'vue';
import { toValue } from 'vue';

// -------------------------------
// Own Imports
import type { ComputerInterface } from '#shared/interfaces/computer.interface';
import type { ComputerOverviewDto } from '#shared/dtos/computer/computer-overview.dto';

export class ComputerService {
  static async findAll(): Promise<AsyncData<ComputerOverviewDto[] | undefined, FetchError | undefined>> {
    return await useFetch<ComputerOverviewDto[]>('/api/computers');
  }

  static async findById(id: MaybeRefOrGetter<number>): Promise<AsyncData<ComputerInterface | undefined, FetchError | undefined>> {
    const result = await useFetch<ComputerInterface>(() => `/api/computers/${toValue(id)}`);

    if (result.error.value?.statusCode === 404) {
      throw createError({ statusCode: 404, statusMessage: 'Computer not found' });
    }

    return result;
  }
}
