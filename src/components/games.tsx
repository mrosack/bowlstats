/* @leny/bowlstats
 *
 * /src/components/games.tsx
 */

/* eslint-disable react/no-array-index-key */ // consistency is guaranteed here.

import type {FC, ReactElement} from "react";
import type {Game} from "types";

import classnames from "classnames";
import {useData} from "core/hooks/use-data";
import GameDetails from "components/game";

const NBSP: string = "\u00a0";

const Games: FC = (): ReactElement => {
    const {games, stats} = useData();

    return (
        <>
            <h3 className={classnames("subtitle")}>
                {"Games"}
                {NBSP}
                <small
                    className={classnames(
                        "is-size-7",
                        "is-va-middle",
                        "has-text-grey",
                    )}>
                    {`(${games.length})`}
                </small>
            </h3>
            {games.map((game: Game, i: number) => (
                <GameDetails
                    key={`${Object.values(game.date).join("-")}-${i}`}
                    game={game}
                    isBest={stats.avg.best === game.score}
                    isWorst={stats.avg.worst === game.score}
                />
            ))}
        </>
    );
};

export default Games;
