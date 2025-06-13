import fontAwesomePlugin from "@11ty/font-awesome";

export default async function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("bundle.css");
    eleventyConfig.addPassthroughCopy("bundle.js");
    eleventyConfig.addPassthroughCopy("assets/");

    eleventyConfig.addPlugin(fontAwesomePlugin);
};
