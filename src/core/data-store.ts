/* @leny/bowlstats
 *
 * /src/core/data-store.ts
 */

// NOTE: this is a "static" store, as the data will not change during the app lifecycle.

import type {Game, Stats} from "types";

import {createContext} from "react";
import rawGames from "core/data.json";

const allGames = rawGames as Array<Game>;

const avgReducer = (acc: number, game: Game): number => acc + game.score;
const pinsReducer = (acc: number, game: Game): number => acc + game.pins;
const absDeviationReducer =
    (avg: number) =>
    (acc: number, game: Game): number =>
        acc + Math.abs(game.score - avg);
const stdDeviationReducer = (avg: number) => (acc: number, game: Game) =>
    acc + Math.abs(game.score - avg) ** 2;
const bestReducer = (acc: number, game: Game): number =>
    Math.max(acc, game.score);
const worstReducer = (acc: number, game: Game): number =>
    Math.min(acc, game.score);
const strikesReducer = (acc: number, game: Game): number =>
    acc + game.stats.strikes;
const sparesReducer = (acc: number, game: Game): number =>
    acc + game.stats.spares.total;
const avgFBPReducer = (acc: number, game: Game): number =>
    acc + game.stats.avgFirstBallPinfall;

export type DataStore = {
    games: Array<Game>;
    stats: Stats;
    years: Array<number>;
};

export const getDataStore = (
    withHouseBallGames: boolean = true,
    withDryLaneGames: boolean = true,
): DataStore => {
    const games = allGames.filter(
        (game: Game): boolean =>
            (withHouseBallGames ? true : !game.ball.startsWith("H")) &&
            (withDryLaneGames ? true : !!game.oilPattern),
    );

    const years: Array<number> = games.reduce(
        (acc: Array<number>, game: Game) => {
            const set: Set<number> = new Set<number>(acc);

            set.add(game.date.year);

            return Array.from(set);
        },
        [],
    );

    const avg: number = Math.round(games.reduce(avgReducer, 0) / games.length);

    return {
        games,
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
        years,
    };
};

export const DataStoreContext = createContext<DataStore>(getDataStore(true));

export const DataStoreContextProvider = DataStoreContext.Provider;
