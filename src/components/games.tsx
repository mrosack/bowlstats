/* @leny/bowlstats
 *
 * /src/components/games.tsx
 */

import type {FC, ReactElement} from "react";
import type {Game} from "types";

import classnames from "classnames";
import {useData} from "core/hooks/use-data";
import GameDetails from "components/game";

const Games: FC = (): ReactElement => {
    const {games, stats, years} = useData();

    return (
        <>
            {years.map((year: number) => (
                <div key={year}>
                    <h3 className={classnames("is-size-3", "mb-5")}>{year}</h3>
                    {games
                        .filter(
                            (game: Game): boolean => game.date.year === year,
                        )
                        .reverse()
                        .map(game => (
                            <GameDetails
                                key={Object.values(game.date).join("-")}
                                game={game}
                                isBest={
                                    stats.total.best === game.score ||
                                    (stats.year.year === year &&
                                        stats.year.best === game.score)
                                }
                            />
                        ))}
                </div>
            ))}
        </>
    );
};

export default Games;
