import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState(0);

  useEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export default useWindowSize;
