/* @leny/bowlstats
 *
 * /src/components/graphs/avg-first-ball-pinfall.tsx
 */

import type {FC, ReactElement} from "react";
import type {Game} from "types";

import {useMemo} from "react";
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Bar,
    LabelList,
} from "recharts";
import BaseGraph from "./base";

export type AvgFirstBallPinfallGraphProps = {
    games: Array<Game>;
    hideBall?: boolean;
};

const AvgFirstBallPinfallGraph: FC<AvgFirstBallPinfallGraphProps> = ({
    games,
    hideBall = false,
}: AvgFirstBallPinfallGraphProps): ReactElement => {
    const data = useMemo<Array<Record<string, number | string>>>(
        () =>
            games.map((game: Game, idx: number, arr: Array<Game>) => ({
                name: `${game.date.day}/${String(game.date.month).padStart(
                    2,
                    "0",
                )}`,
                afbp: game.stats.avgFirstBallPinfall,
                ball: +game.ball.slice(1),
                avg:
                    arr.reduce(
                        (acc: number, gm: Game, i: number): number =>
                            acc + (i <= idx ? gm.stats.avgFirstBallPinfall : 0),
                        0,
                    ) /
                    (idx + 1),
            })),
        [games],
    );

    return (
        <BaseGraph data={data} hideBall={hideBall}
        axisLabel={"Avg First Ball Pinfall"}
        axisId={"afbp"}
        domain={[0, 10]}
        padding={{top: 30, bottom: 30}}
        />
    );
};

export default AvgFirstBallPinfallGraph;
