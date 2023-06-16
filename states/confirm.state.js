import { useState } from "react";

export function useConfirm() {
  const [show, setShow] = useState(false);
  const [handler, setHandler] = useState(() => () => {});

  function cancel() {
    clear();
  }

  function clear() {
    setShow(false);
    setHandler(() => () => {});
  }

  return {
    show,
    setShow,
    cancel,
    clear,
    handler,
    setHandler,
  };
}
