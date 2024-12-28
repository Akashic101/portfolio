const htmlNano = require('htmlnano');

module.exports = function (eleventyConfig) {
        eleventyConfig.addPassthroughCopy("src/output.css");

        eleventyConfig.addFilter("sortSkill", function (collection){
            return collection.sort((a, b) => b.data.experience - a.data.experience);
          })

        eleventyConfig.addShortcode("currentYear", () => {
           return new Date().getUTCFullYear()
        });

        eleventyConfig.addShortcode("yearsSince", () => {
            const currentDate = new Date();
            const targetDate = new Date("2021-11-15");
            const diffTime = currentDate - targetDate;

            const yearsDifference = diffTime / (1000 * 60 * 60 * 24 * 365.25);
            return Math.floor(yearsDifference);
        });
        
        eleventyConfig.addFilter("formatToLocateDate", function(value) {
            if (value instanceof Date) {
                return value.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
            }
            return value;
        });

        eleventyConfig.addTransform('htmlnano', async (content, outputPath) => {
            if (outputPath.endsWith('.html')) {
                const { html } = await htmlNano.process(content, {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                });
                return html;
            }
            return content;
        });
        
    return {
        dir: {
            input: 'src',
            output: '_site',
        },
    };
};