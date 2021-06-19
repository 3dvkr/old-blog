module.exports = config => {

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