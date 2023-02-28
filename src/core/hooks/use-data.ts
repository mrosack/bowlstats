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

        results.total.games = games.length;
        results.total.avg = Math.round(
            games.reduce(
                (acc: number, game: Game): number => acc + game.score,
                0,
            ) / results.total.games,
        );
        results.total.best = games.reduce(
            (acc: number, game: Game): number => Math.max(acc, game.score),
            0,
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
        results.year.best = games
            .filter((game: Game): boolean => game.date.year === year)
            .reduce(
                (acc: number, game: Game): number => Math.max(acc, game.score),
                0,
            );

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
