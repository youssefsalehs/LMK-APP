import { useEffect, type RefObject } from "react";

export default function useCloseMenu(
  open: boolean,
  onClose: () => void,
  refs: RefObject<HTMLElement | null>[],
) {
  useEffect(() => {
    if (!open) return;

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (refs.every((r) => !r.current?.contains(target))) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
}
