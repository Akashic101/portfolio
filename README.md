# Portfolio

This is the repo of my personal portfolio powered by 11ty. You can access it under https://davidmoll.net

## How It Works

1. The website is written in Nunjuck
2. Styling gets applied using Tailwind CSS
3. 11ty converts all files into HTML upon launch of the project into a folder called `_site`
4. The website is managed by nginx and accessible via Cloudflare Tunnels

## Patch Notes

**Version 1.0.0**

- Initial release 🎉

## Roadmap

- Add resume

## Installation

- Clone this repo with `git clone https://github.com/akashic101/portfolio`
- Navigate into this repo with `cd portfolio`
- Install all dependencies with `npm install`
- Test the website
  - Build the styles using `npm run styles`
  - Build and serve the website using `npm run start`
  - Navigate to http://localhost:8080 to see the website
- Build for production using `npm run prod`
