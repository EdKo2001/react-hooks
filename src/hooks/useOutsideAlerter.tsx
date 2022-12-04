import { FC, useRef, useEffect, RefObject, ReactNode } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideAlerter = (
  ref: RefObject<HTMLDivElement>,
  onBlur: () => void
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLDivElement)
      ) {
        onBlur();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
};

/**
 * Component that alerts if you click outside of it
 */
interface OutsideAlerterProps {
  onBlur: () => void;
  children: ReactNode;
  className?: string;
}

const OutsideAlerter: FC<OutsideAlerterProps> = ({
  onBlur,
  children,
  className,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, onBlur);

  return (
    <div className={className ? className : ""} ref={wrapperRef}>
      {children}
    </div>
  );
};

export default OutsideAlerter;
