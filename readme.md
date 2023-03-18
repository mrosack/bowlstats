# @leny/bowlstats

> 🎳 A small bowling stats tracker

* * *

## About

A *pet-project* with **parcel** & **react** to track my _bowling_ scores & stats.

## I like it! I want one too!

It's pretty easy, even if you're not a _skilled web developper_!
Just **fork** the repository (search for the **fork** button around the top right of this page), and modify the two following files:

- `data/params.json` to change the **title** & **subtitle** of the page (and add goals if you want to)
- `data/scores.yaml` to encode _your_ scores (won't really be yours with _my scores_) - refer to the **Usage** section for more information about the scores format

Then, everything should be okay.
Go to the **settings/pages** section of the repository if you want to *fine tune* the configuration of the page.

## Local install

If you want to customize the code, simply clone the repo, install the dependencies with `npm install`, then run the code with `npm run work`.

The rest is up to you: it's a simple _[react](https://react.dev/) one page app_, using [parcel](https://parceljs.org/) as builder, [bulma](https://bulma.io/) for the styles & [recharts](https://recharts.org/) for the graphs.

## Usage (update scores)

Scores are encoded in [YAML format](https://en.wikipedia.org/wiki/YAML) in file `data/scores.yaml`.

YAML is pretty easy to update, and the format of data is kinda *self-explanatory*:

```yaml
---
date: 2023-03-15
games:
  - ball: H13
    frames: X, 81, 41, 1/, 8-, S81, 6-, S7-, 72, X9/
  - ball: H13
    frames: 9-, 61, 9-, 62, 42, 1-, 8/, 7-, 7/, 5-
    note: Ball slightly light (house ball), good layout
  - ball: H13
    frames: 17, 9-, 1-, 32, 7-, -3, 9/, X, 62, -9
  - ball: H13
    frames: 43, -3, 63, -5, X, 9-, 72, 5-, X, 9-
```

The `ball` entry specifies the weight of the ball. Prefix it with an `H` to indicate an _house ball_.

The `frames` entry specifies the frames of a game, separated by a comma (`,`).
Use `X` for a *strike*, `/` for a *spare*, `S` for a *split*, `-` for a *miss* or `F` for a *foul*.

You can add a `note` entry to comment a game.

* * *

February 2023
