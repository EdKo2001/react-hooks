import { useEffect, useCallback, DependencyList } from "react";

import useFirstRender from "./useFirstRender";

const useDebounce = (
  effect: () => void,
  dependencies: DependencyList,
  delay = 800
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, dependencies);
  // firstRender() usage
  const firstRender = useFirstRender();

  useEffect(() => {
    // firstRender() result
    if (!firstRender) {
      const timeout = setTimeout(callback, delay);
      return () => clearTimeout(timeout);
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, delay]);
};

export default useDebounce;
