/* @leny/bowlstats
 *
 * /src/core/hooks/use-data.js
 */

import games from "core/data.json";
import { useMemo } from "react";

export const useData = () => {
    const stats = useMemo(() => {
        const results = {total: {}, year: {}};

        results.total.games = games.length;
        results.total.avg = Math.round(
            games.reduce((acc, game) => acc + game.score, 0) /
                results.total.games,
        );

        const year = new Date().getFullYear();

        results.year.year=year;
        results.year.games = games.filter(
            game => game.date.year === year,
        ).length;
        results.year.avg = Math.round(
            games
                .filter(game => (game.date.year = year))
                .reduce((acc, game) => acc + game.score, 0) /
                results.year.games,
        );

        return results;
    }, []);

    return {
        games,
        stats,
    };
};
