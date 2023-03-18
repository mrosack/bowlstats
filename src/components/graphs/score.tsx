/* @leny/bowlstats
 *
 * /src/components/graphs/score.tsx
 */

import type {FC, ReactElement} from "react";
import type {Game} from "types";

import {useMemo} from "react";
import {Line, YAxis} from "recharts";
import BaseGraph from "./base";

export type ScoreGraphProps = {
    games: Array<Game>;
    hideBall?: boolean;
};

const ScoreGraph: FC<ScoreGraphProps> = ({
    games,
    hideBall = false,
}: ScoreGraphProps): ReactElement => {
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
        <BaseGraph data={data} hideBall={hideBall}
        axisLabel={"Score per game"}
        axisId={"score"}
        domain={[0, 300]}
        />
    );
};

export default ScoreGraph;
