// Author: Juan Pablo Avendaño

// -------------------------------
// Third-Party Imports
import { watchEffect } from 'vue';

// -------------------------------
// Own Imports
import { APP_TITLE_COMPLEMENT_KEY } from '~/constants/app-title-complement-key.constant';

export function useTitleComplement(value: string) {
  const titleComplement = useState<string>(APP_TITLE_COMPLEMENT_KEY, () => '');

  watchEffect(() => {
    titleComplement.value = value;
  });
}
