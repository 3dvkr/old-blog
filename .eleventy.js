module.exports = config => {
    config.addPassthroughCopy('./src/css/');
    config.addWatchTarget("./src/css/");

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