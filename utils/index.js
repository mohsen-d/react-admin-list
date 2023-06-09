export default {
  currentWindowSize: function (callback) {
    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        callback(cr.width);
      }
    });

    ro.observe(document.body);
  },

  getHeaders: function (userHeaders, data) {
    if (userHeaders.length > 0)
      return userHeaders.map((h) => (typeof h === "string" ? h : h.title));

    if (data.length > 0) return Object.keys(data[0]);

    return ["No headers defined"];
  },
};
