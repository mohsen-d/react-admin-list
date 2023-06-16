export function useMultiRef() {
  const list = new Set();
  let current = [];

  const fn = (elm) => {
    if (elm && !list.has(elm)) {
      list.add(elm);
      current.push(elm);
    }
  };

  fn.current = current;
  return fn;
}
