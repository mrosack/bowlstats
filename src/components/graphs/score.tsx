/* @leny/bowlstats
 *
 * /src/components/graphs/score.tsx
 */

import type {FC, ReactElement} from "react";
import type {Game} from "types";

import classnames from "classnames";
import {useMemo} from "react";
import BaseGraph from "./base";
import {useData} from "core/hooks/use-data";

export type ScoreGraphProps = {
    games: Array<Game>;
    goal: number | false;
    hideBall?: boolean;
};

const ScoreGraph: FC<ScoreGraphProps> = ({
    games,
    goal,
    hideBall = false,
}: ScoreGraphProps): ReactElement => {
    const {stats:{avg:{best,worst}}}=useData();
    const data = useMemo<Array<Record<string, number | string>>>(
        () =>
            games.map((game: Game, idx: number, arr: Array<Game>) => ({
                name: `${game.date.day}/${String(game.date.month).padStart(
                    2,
                    "0",
                )}`,
                score: game.score,
                ball: +game.ball.slice(1),
                avg:
                    arr.reduce(
                        (acc: number, gm: Game, i: number): number =>
                            acc + (i <= idx ? gm.score : 0),
                        0,
                    ) /
                    (idx + 1),
            })),
        [games],
    );

    return (
        <>
            <h3 className={classnames("subtitle")}>{"Score"}</h3>
            <BaseGraph
                data={data}
                hideBall={hideBall}
                axisLabel={"Score per game"}
                axisId={"score"}
                domain={[Math.max(0, worst), Math.min(300, best)]}
                padding={{top: 30, bottom: 30}}
                referenceLine={goal}
            />
        </>
    );
};

export default ScoreGraph;
