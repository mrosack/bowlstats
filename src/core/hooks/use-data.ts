/* @lenybowlstats
 *
 * /src/core/hooks/use-data.js
 */

import type {Game, Stats, GlobalStats} from "types";

import games from "core/data.json";
import {useMemo} from "react";

export type DataHookResults = {
    games: Array<Game>;
    stats: GlobalStats;
    years: Array<number>;
};

export const useData = () => {
    const stats = useMemo<GlobalStats>(() => {
        const results: Record<string, Stats> = {total: {}, year: {}};

        const avgReducer = (acc: number, game: Game): number =>
            acc + game.score;
        const bestReducer = (acc: number, game: Game): number =>
            Math.max(acc, game.score);
        const strikesReducer = (acc: number, game: Game): number =>
            acc + game.stats.strikes;
        const sparesReducer = (acc: number, game: Game): number =>
            acc + game.stats.spares;
        const avgFBPReducer = (acc: number, game: Game): number =>
            acc + game.stats.avgFirstBallPinfall;

        results.total.games = games.length;
        results.total.avg = {
            value: Math.round(
                games.reduce(avgReducer, 0) / results.total.games,
            ),
            best: games.reduce(bestReducer, 0),
        };
        results.total.strikes = {
            value: +(
                (games.reduce(strikesReducer, 0) / (results.total.games * 12)) *
                100
            ).toFixed(2),
            best: (
                (Math.max(
                    ...games.map((game: Game): number => game.stats.strikes),
                ) /
                    12) *
                100
            ).toFixed(2),
        };
        results.total.spares = {
            value: +(
                (games.reduce(sparesReducer, 0) / (results.total.games * 10)) *
                100
            ).toFixed(2),
            best: (
                (Math.max(
                    ...games.map((game: Game): number => game.stats.spares),
                ) /
                    10) *
                100
            ).toFixed(2),
        };
        results.total.avgFirstBallPinfall = {value: +(
            games.reduce(avgFBPReducer, 0) / results.total.games
        ).toFixed(2),
            best: (
                (Math.max(...games.map((game:Game):number=>game.stats.avgFirstBallPinfall)))
            ).toFixed(2)
        };

        const year: number = new Date().getFullYear();
        const yearFilter = (game: Game): boolean => game.date.year === year;

        results.year.year = year;
        results.year.games = games.filter(yearFilter).length;
        results.year.avg = Math.round(
            games.filter(yearFilter).reduce(avgReducer, 0) / results.year.games,
        );
        results.year.best = games.filter(yearFilter).reduce(bestReducer, 0);
        results.year.strikes = +(
            (games.filter(yearFilter).reduce(strikesReducer, 0) /
                (results.year.games * 12)) *
            100
        ).toFixed(2);
        results.year.spares = +(
            (games.filter(yearFilter).reduce(sparesReducer, 0) /
                (results.year.games * 10)) *
            100
        ).toFixed(2);
        results.year.avgFirstBallPinfall = +(
            games.filter(yearFilter).reduce(avgFBPReducer, 0) /
            results.year.games
        ).toFixed(2);

        return results;
    }, []);

    const years: Array<number> = useMemo(
        () =>
            games.reduce((acc: Array<number>, game: Game) => {
                const set: Set<number> = new Set<number>(acc);

                set.add(game.date.year as number);

                return Array.from(set);
            }, []),
        [],
    );

    return {
        games,
        stats,
        years,
    };
};
