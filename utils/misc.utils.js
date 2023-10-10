export const currentWindowWidth = document.body.clientWidth;

export function watchWindowWidth(callback) {
  window.addEventListener(
    "resize",
    function () {
      callback(document.body.clientWidth);
    },
    true
  );
}

export function setUrlParam(params) {
  if (history.pushState) {
    const currentParams = new URLSearchParams(window.location.search);
    params.forEach((p) => {
      p.value
        ? currentParams.set(p.name, p.value)
        : currentParams.delete(p.name);
    });

    let newUrl = window.location.origin + window.location.pathname;

    if (currentParams.size > 0) newUrl += "?" + currentParams.toString();

    window.history.pushState({ path: newUrl }, "", newUrl);
  }
}

export function makeStickyOnScroll(ref) {
  let classes = "position-sticky";
  let elmClasses;
  let lastScrollY = window.scrollY;

  function justify(elm, offset) {
    if (!elm.classList.contains("position-sticky")) {
      elm.classList.add(...elmClasses.split(" "));
    }
    elm.style.top = offset + "px";
  }

  function clear(elm) {
    if (elm.classList.contains("position-sticky")) {
      elm.classList.remove(...elmClasses.split(" "));
    }
  }

  function getRect(elm) {
    return (
      elm?.getBoundingClientRect() ?? {
        top: 0,
        height: 0,
      }
    );
  }

  function getOffset(elm, prevElm) {
    const prevElmRect = getRect(prevElm);
    const parentElmRect = getRect(elm.closest(".table-responsive"));

    let offset = prevElmRect.height + prevElmRect.top;

    isScrollingDown
      ? (offset -= parentElmRect.top)
      : (offset += parentElmRect.top);

    return offset;
  }

  function isScrollingDown() {
    return window.scrollY - lastScrollY >= 0;
  }

  window.addEventListener("scroll", (e) => {
    ref.current.forEach((elm, i, elms) => {
      elmClasses = `${classes} ${
        elm.attributes["data-sticky-classes"]?.value ?? ""
      }`.trim();

      const { top } = getRect(elms[0]);
      const offset = i === 0 ? 0 : getOffset(elm, elms[0]);

      top <= 0 ? justify(elm, offset) : clear(elm);
    });
  });
}
