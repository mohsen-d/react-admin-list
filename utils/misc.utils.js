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
    var currentParams = new URLSearchParams(window.location.search);
    params.forEach((p) => {
      currentParams.set(p.name, p.value);
    });

    var newUrl =
      window.location.origin +
      window.location.pathname +
      "?" +
      currentParams.toString();
    window.history.pushState({ path: newUrl }, "", newUrl);
  }
}

export function makeStickyOnScroll(ref) {
  let classes = "position-sticky";
  let elmClasses;

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

  window.addEventListener("scroll", (e) => {
    ref.current.forEach((elm, i, elms) => {
      const prevElmRect = elms[i - 1]?.getBoundingClientRect() ?? {
        top: 0,
        height: 0,
      };

      const offset = prevElmRect.height + prevElmRect.top;

      elmClasses = `${classes} ${
        elm.attributes["data-sticky-classes"]?.value ?? ""
      }`.trim();

      const { top } = elm.getBoundingClientRect();

      if (top <= window.scrollY) {
        top !== offset && justify(elm, offset);
      } else {
        clear(elm);
      }
    });
  });
}
