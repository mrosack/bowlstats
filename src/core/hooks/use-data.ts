/* @leny/bowlstats
 *
 * /src/core/hooks/use-data.js
 */

import type {Game, Stats, GlobalStats} from "types";

import games from "core/data.json";
import {useMemo} from "react";

export type DataHookResults = {
    stats: GlobalStats;
    games: Array<Game>;
};

export const useData = () => {
    const stats = useMemo<GlobalStats>(() => {
        const results: Record<string, Stats> = {total: {}, year: {}};

        results.total.games = games.length;
        results.total.avg = Math.round(
            games.reduce(
                (acc: number, game: Game): number => acc + game.score,
                0,
            ) / results.total.games,
        );

        const year: number = new Date().getFullYear();

        results.year.year = year;
        results.year.games = games.filter(
            (game: Game): boolean => game.date.year === year,
        ).length;
        results.year.avg = Math.round(
            games
                .filter((game: Game): boolean => game.date.year === year)
                .reduce(
                    (acc: number, game: Game): number => acc + game.score,
                    0,
                ) / results.year.games,
        );

        return results;
    }, []);

    return {
        games,
        stats,
    };
};
