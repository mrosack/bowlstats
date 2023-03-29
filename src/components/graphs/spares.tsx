/* @leny/bowlstats
 *
 * /src/components/graphs/spares.tsx
 */

import type {FC, ReactElement} from "react";
import type {Game} from "types";

import {useMemo} from "react";
import BaseGraph from "./base";
import classnames from "classnames";

export type SparesGraphProps = {
    games: Array<Game>;
    hideBall?: boolean;
};

const SparesGraph: FC<SparesGraphProps> = ({
    games,
    hideBall = false,
}: SparesGraphProps): ReactElement => {
    const data = useMemo<Array<Record<string, number | string>>>(
        () =>
            games.map((game: Game, idx: number, arr: Array<Game>) => ({
                name: `${game.date.day}/${String(game.date.month).padStart(
                    2,
                    "0",
                )}`,
                spares: game.stats.spares.total,
                ball: +(game.ball.startsWith("H")
                    ? game.ball.slice(1)
                    : game.ball),
                avg:
                    arr.reduce(
                        (acc: number, gm: Game, i: number): number =>
                            acc + (i <= idx ? gm.stats.spares.total : 0),
                        0,
                    ) /
                    (idx + 1),
            })),
        [games],
    );

    return (
        <>
            <h3 className={classnames("subtitle", "mt-5")}>{"Spares"}</h3>
            <BaseGraph
                data={data}
                hideBall={hideBall}
                axisLabel={"Spares per game"}
                axisId={"spares"}
                domain={[0, 10]}
                padding={{top: 30, bottom: 30}}
            />
        </>
    );
};

export default SparesGraph;
