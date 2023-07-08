/* @leny/bowlstats
 *
 * /src/core/data-store.ts
 */

// NOTE: this is a "static" store, as the data will not change during the app lifecycle.

import type {Game, League, Stats, Nullable} from "types";

import {createContext} from "react";
import rawGames from "core/data.json";

const allGames = rawGames.games as Array<Game>;

const avgReducer = (acc: number, game: Game): number => acc + game.score;
const pinsReducer = (acc: number, game: Game): number => acc + game.pins;
const absDeviationReducer =
    (avg: number) =>
    (acc: number, game: Game): number =>
        acc + Math.abs(game.score - avg);
const stdDeviationReducer =
    (avg: number): ((acc: number, game: Game) => number) =>
    (acc: number, game: Game): number =>
        acc + Math.abs(game.score - avg) ** 2;
const bestReducer = (acc: number, game: Game): number =>
    Math.max(acc, game.score);
const worstReducer = (acc: number, game: Game): number =>
    Math.min(acc, game.score);
const strikesReducer = (acc: number, game: Game): number =>
    acc + game.stats.strikes;
const sparesReducer = (acc: number, game: Game): number =>
    acc + game.stats.spares;
const avgFBPReducer = (acc: number, game: Game): number =>
    acc + game.stats.avgFirstBallPinfall;

export type DataStore = {
    games: Array<Game>;
    leagues: Array<League>;
    filters: {
        year: Nullable<number>;
        month: Nullable<number>;
        day: Nullable<number>;
        lists: {
            years: Array<number>;
            months: Array<number>;
            days: Array<number>;
        };
        withHouseBallGames: boolean;
        withDryLaneGames: boolean;
    };
    stats: Stats;
};

export const getDataStore = (
    year: Nullable<number> = null,
    month: Nullable<number> = null,
    day: Nullable<number> = null,
    withHouseBallGames: boolean = true,
    withDryLaneGames: boolean = true,
): DataStore => {
    const filteredGames: Array<Game> = allGames
        .filter((game: Game): boolean =>
            withHouseBallGames ? true : !game.ball.startsWith("H"),
        )
        .filter((game: Game): boolean =>
            withDryLaneGames ? true : !!game.oilPattern,
        );

    const games = filteredGames.filter((game: Game): boolean =>
        year === null
            ? true
            : game.date.year === year &&
              (month === null
                  ? true
                  : game.date.month === month &&
                    (day === null ? true : game.date.day === day)),
    );

    const avg: number = Math.round(games.reduce(avgReducer, 0) / games.length);

    return {
        games,
        leagues: rawGames.leagues as Array<League>,
        filters: {
            year,
            month,
            day,
            lists: {
                years: filteredGames.reduce(
                    (acc: Array<number>, game: Game) => {
                        const set: Set<number> = new Set<number>(acc);

                        set.add(game.date.year);

                        return Array.from(set);
                    },
                    [],
                ),
                months: Array.from(new Array(12).keys()).filter(
                    (mnth: number): boolean =>
                        !!filteredGames.find(
                            (game: Game): boolean =>
                                game.date.year === year &&
                                game.date.month === mnth + 1,
                        ),
                ),
                days: filteredGames
                    .filter(
                        (game: Game): boolean =>
                            game.date.year === year &&
                            game.date.month === month,
                    )
                    .reduce(
                        (acc: Array<number>, game: Game) =>
                            Array.from(new Set(acc).add(game.date.day)),
                        [],
                    ),
            },
            withHouseBallGames,
            withDryLaneGames,
        },
        stats: {
            games: games.length,
            pins: games.reduce(pinsReducer, 0),
            avg: {
                value: avg,
                best: games.reduce(bestReducer, 0),
                worst: games.reduce(worstReducer, 300),
                stdDeviation: +Math.sqrt(
                    games.reduce(stdDeviationReducer(avg), 0) / games.length,
                ).toFixed(2),
                absDeviation: +(
                    games.reduce(absDeviationReducer(avg), 0) / avg
                ).toFixed(2),
            },
            strikes: {
                value: +(
                    (games.reduce(strikesReducer, 0) / (games.length * 12)) *
                    100
                ).toFixed(2),
                best: +(
                    (Math.max(
                        ...games.map(
                            (game: Game): number => game.stats.strikes,
                        ),
                    ) /
                        12) *
                    100
                ).toFixed(2),
            },
            spares: {
                value: +(
                    (games.reduce(sparesReducer, 0) / (games.length * 10)) *
                    100
                ).toFixed(2),
                best: +(
                    (Math.max(
                        ...games.map(
                            (game: Game): number => game.stats.spares.total,
                        ),
                    ) /
                        10) *
                    100
                ).toFixed(2),
            },
            avgFirstBallPinfall: {
                value: +(games.reduce(avgFBPReducer, 0) / games.length).toFixed(
                    2,
                ),
                best: +Math.max(
                    ...games.map(
                        (game: Game): number => game.stats.avgFirstBallPinfall,
                    ),
                ).toFixed(2),
            },
        },
    };
};

export const DataStoreContext = createContext<DataStore>(getDataStore(true));

export const DataStoreContextProvider = DataStoreContext.Provider;
