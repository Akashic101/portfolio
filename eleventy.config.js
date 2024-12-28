module.exports = function (eleventyConfig) {
        eleventyConfig.addPassthroughCopy("src/output.css");
      
    return {
        dir: {
            input: 'src',
            output: '_site',
        },
    };
};