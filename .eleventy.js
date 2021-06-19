const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = config => {
    config.addPlugin(syntaxHighlight);

    config.addPassthroughCopy('./src/images/');

    config.addPassthroughCopy('./src/css/');
    config.addWatchTarget("./src/css/");

    // add collections
    config.addCollection('posts', collection => {
        return [...collection
        .getFilteredByGlob('./src/posts/*.md')].reverse()
    });
    config.addCollection('tagList', collection => {
        const tagsSet = new Set();
        collection.getAll().forEach(item => {
          if (!item.data.tags) return
          item.data.tags
            .filter(tag => !['posts', 'all'].includes(tag))
            .forEach(tag => tagsSet.add(tag))
        });
        return Array.from(tagsSet)
    });

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',

        dir: {
            input: 'src',
            output: 'dist'
        }
    };
}