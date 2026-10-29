# Phoenix Garden Guide

A planting calendar and growing guide for vegetables and fruit in the Phoenix, Arizona metro area (the low desert of Maricopa County).

It runs in any web browser on a computer or phone. Nothing to install and no internet connection needed.

## How to open it

1. Download the project: on GitHub, click the green **Code** button, then **Download ZIP**, and unzip it.
2. Double-click **`index.html`**. It opens in your web browser.

That's it. Bookmark the page to come back to it.

## What's inside

- **Planting calendar**: shows what you can plant right now and lays out a full-year chart for every crop. Click any column to see what to plant in that half of the month, and filter by vegetables, fruit, herbs or season.
- **Plant guides**: a page for each plant with planting dates, spacing, watering, sun, growth, typical yield and Phoenix-specific tips.
- **Gallery**: photos of every plant, viewable full screen.
- **About**: how Phoenix's two growing seasons work, watering basics, sources and photo credits.

## Where the information comes from

- Vegetable and melon planting dates come from the University of Arizona Cooperative Extension's [Vegetable Planting Calendar for Maricopa County (AZ1005)](https://extension.arizona.edu/sites/extension.arizona.edu/files/pubs/az1005-2018.pdf).
- Fruit planting dates come from other University of Arizona Extension guides (strawberries, citrus, figs, grapes, low-chill fruit trees). Each plant page lists its sources.
- Spacing, watering, yield and tips are general home-garden guidance and will vary with variety, soil and weather.
- Photos are from [Wikimedia Commons](https://commons.wikimedia.org/) under free licenses. Credits are on the About page and in [`images/plants/CREDITS.md`](images/plants/CREDITS.md).

## For contributors

The app is plain HTML, CSS and JavaScript with no build step or dependencies.

| Path | What it holds |
| --- | --- |
| `index.html` | Page shell |
| `css/styles.css` | All styling (light and dark mode) |
| `js/app.js` | The app: calendar, plant list, plant pages, gallery, about |
| `js/data/plants.js` | One entry per plant: planting windows, growing facts, tips |
| `js/data/sources.js` | Reference publications cited by plants |
| `js/data/photos.js` | Photo file and credit for each plant |
| `images/plants/` | Plant photos |
| `scripts/validate-data.js` | Checks the data files for mistakes |

To check the data after editing it (requires [Node.js](https://nodejs.org/)):

```sh
node scripts/validate-data.js
```

The same check runs automatically on every pull request.
