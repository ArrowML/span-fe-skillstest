module.exports = {
    css: {
      loaderOptions: {
        scss: {
          prependData: `@import "@/scss/_shared.scss";`,
        }
      }
    }
  };