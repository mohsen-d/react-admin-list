export default {
  watchWindowWidth: function (callback) {
    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        callback(cr.width);
      }
    });

    ro.observe(document.body);
  },

  currentWindowWidth: document.body.clientWidth,

  getHeaders: function (userHeaders, data) {
    if (userHeaders.length > 0)
      return userHeaders.map((h) => (typeof h === "string" ? { title: h } : h));

    if (data.length > 0)
      return Object.keys(data[0]).map((k) => {
        title: k;
      });

    return [{ title: "No headers defined" }];
  },

  setUrlParam: function (params) {
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
  },
};
