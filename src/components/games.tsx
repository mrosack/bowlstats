/* @leny/bowlstats
 *
 * /src/components/games.tsx
 */

/* eslint-disable react/no-array-index-key */ // consistency is guaranteed here.

import type {FC, ReactElement} from "react";
import type {Game} from "types";

import {useState} from "react";
import classnames from "classnames";
import {useData} from "core/hooks/use-data";
import GameDetails from "components/game";
import {preventDefault} from "core/utils";

const NBSP: string = "\u00a0";

const Games: FC = (): ReactElement => {
    const {games, filters, stats} = useData();
    const [reverseOrder, setReverseOrder] = useState<boolean>(true);

    return (
        <>
            <h3
                className={classnames(
                    "subtitle",
                    "is-flex",
                    "is-flex-direction-row",
                    "is-justify-content-space-between",
                    "is-align-items-center",
                )}>
                <span>
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
                </span>
                <a
                    className={classnames("is-size-7", "is-va-middle")}
                    href={"#"}
                    onClick={preventDefault(() => {
                        setReverseOrder(!reverseOrder);
                    })}>
                    {"(⇅ reverse order)"}
                </a>
            </h3>
            {(reverseOrder ? Array.from(games).reverse() : games).map(
                (game: Game, i: number) => (
                    <GameDetails
                        key={`${Object.values(game.date).join("-")}-${i}`}
                        game={game}
                        isBest={stats.avg.best === game.score}
                        isWorst={stats.avg.worst === game.score}
                        showYear={filters.year === null}
                    />
                ),
            )}
        </>
    );
};

export default Games;
