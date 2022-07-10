const featuredPosts = ["how-to-answer-badly","copilot", "js-part3"];

module.exports = {
  eleventyComputed: {
    featured: (data) => {
      return featuredPosts.includes(data.page.fileSlug)
        && featuredPosts.indexOf(data.page.fileSlug) + 1
    },
    featuredLength: () => featuredPosts.length,
  },
};
