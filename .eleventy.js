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