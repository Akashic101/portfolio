module.exports = function (eleventyConfig) {
        eleventyConfig.addPassthroughCopy("src/output.css");

        eleventyConfig.addShortcode("yearsSince", () => {
            const currentDate = new Date(); // Get the current date
            const targetDate = new Date("2021-11-15"); // November 15, 2021
            
            // Calculate the difference in milliseconds
            const diffTime = currentDate - targetDate;
            
            // Convert the difference to years
            const yearsDifference = diffTime / (1000 * 60 * 60 * 24 * 365.25); // Taking leap years into account
            return Math.floor(yearsDifference); // Return the number of full years
        });
        
        eleventyConfig.addFilter("formatToLocateDate", function(value) {
            if (value instanceof Date) {
                return value.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
            }
            return value;
        });
        
    return {
        dir: {
            input: 'src',
            output: '_site',
        },
    };
};