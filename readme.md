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

### Games

Scores are encoded in [YAML format](https://en.wikipedia.org/wiki/YAML) in file `data/scores.yaml`.

YAML is pretty easy to update, and the format of data is kinda *self-explanatory*:

```yaml
---
date: 2023-03-15
ball: H13
oilPattern: Typical House Shot
games:
  - frames: X, 81, 41, 1/, 8-, S81, 6-, S7-, 72, X9/
  - frames: 9-, 61, 9-, 62, 42, 1-, 8/, 7-, 7/, 5-
    note: Ball slightly light (house ball), good layout
  - frames: 17, 9-, 1-, 32, 7-, -3, 9/, X, 62, -9
  - ball: 14
    frames: 43, -3, 63, -5, X, 9-, 72, 5-, X, 9-
```

The `ball` entry specifies the weight of the ball. Prefix it with an `H` to indicate an _house ball_.

The `frames` entry specifies the frames of a game, separated by a comma (`,`).
Use `X` for a *strike*, `/` for a *spare*, `S` for a *split*, `-` for a *miss* or `F` for a *foul*.

You can add a `note` entry to comment a game.

### Leagues (in _beta_)

You can encode your league nights as part of your scores, like this:

```yaml
---
date: 2023-07-05
ball: 14
oilPattern: Typical House Shot
games:
  - frames: 8-, 9-, 5/, 7-, 71, 9/, 6-, 7-, 8-, 7/X    
  - frames: 9/, 71, 7-, X, 7/, 9/, X, -5, 72, S81    
  - frames: 9/, 9/, 9-, X, 17, 9-, 4/, 9-, 7-, 9-
    note: An optional note about the game
  - frames: 8/, 8/, 81, 1/, S8-, 3/, 9/, 8/, 8-, 7/8    
  - frames: X, 9-, X, 36, 9-, S71, --, 9-, 9/, 41    
  - frames: 8-, 9-, S81, X, 9/, 9-, S62, 9/, 8/, 9/3
  - frames: S7-, S8/, 35, S71, X, 7-, 61, 8-, X, 1/X
leagues:
  - name: Fantasy League 2023-2024
    day: 2
    team: My super team
    vs: The other team
    avg: 160
    handicap: 36
    games: 1, 4, 5
    oilPatterns:
    	- Badger
    	- Taj Mahal
    note: An optional note about the match
```

`leagues.games` are indexes (starting at `1`) of the days' games to use in named league.

* * *

February 2023
