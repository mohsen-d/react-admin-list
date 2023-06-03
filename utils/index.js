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
};
