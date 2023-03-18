/* @leny/bowlstats
 *
 * /src/components/graphs/strikes.tsx
 */

import type {FC, ReactElement} from "react";
import type {Game} from "types";

import {useMemo} from "react";
import BaseGraph from "./base";
import classnames from "classnames";

export type StrikesGraphProps = {
    games: Array<Game>;
    hideBall?: boolean;
};

const StrikesGraph: FC<StrikesGraphProps> = ({
    games,
    hideBall = false,
}: StrikesGraphProps): ReactElement => {
    const data = useMemo<Array<Record<string, number | string>>>(
        () =>
            games.map((game: Game, idx: number, arr: Array<Game>) => ({
                name: `${game.date.day}/${String(game.date.month).padStart(
                    2,
                    "0",
                )}`,
                strikes: game.stats.strikes,
                ball: +game.ball.slice(1),
                avg:
                    arr.reduce(
                        (acc: number, gm: Game, i: number): number =>
                            acc + (i <= idx ? gm.stats.strikes : 0),
                        0,
                    ) /
                    (idx + 1),
            })),
        [games],
    );

    return (
        <>
            <h3 className={classnames("subtitle", "mt-5")}>{"Strikes"}</h3>
            <BaseGraph
                data={data}
                hideBall={hideBall}
                axisLabel={"Strikes per game"}
                axisId={"strikes"}
                domain={[0, 12]}
                padding={{top: 30, bottom: 30}}
            />
        </>
    );
};

export default StrikesGraph;
