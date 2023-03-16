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

export type AvgFirstBallPinfallGraphProps = {
    games: Array<Game>;
};

const AvgFirstBallPinfallGraph: FC<AvgFirstBallPinfallGraphProps> = ({
    games,
}: AvgFirstBallPinfallGraphProps): ReactElement => {
    const data = useMemo<Array<Record<string, number|string>>>(
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

    console.log("data:", data);

    return (
        <ResponsiveContainer width={"100%"} height={350}>
            <ComposedChart
                width={500}
                height={500}
                data={data}
                margin={{
                    top: 10,
                    right: 5,
                    left: 0,
                    bottom: 5,
                }}>
                <CartesianGrid strokeDasharray={"2 2"} />
                <XAxis dataKey={"name"} padding={{left: 20, right: 20}} />
                <YAxis
                    yAxisId={"afbp"}
                    domain={[0, 10]}
                    orientation={"left"}
                    padding={{top:30, bottom: 30}}
                />
                <YAxis
                    yAxisId={"ball"}
                    domain={[6, 16]}
                    orientation={"right"}
                    tickCount={6}
                />
                <Legend />
                <Bar
                    name={"Ball Weight"}
                    dataKey={"ball"}
                    yAxisId={"ball"}
                    barSize={20}
                    fill={"#33993366"}>
                    <LabelList dataKey={"ball"} position={"insideBottom"} />
                </Bar>
                <Line
                    name={"Average"}
                    type={"monotone"}
                    dataKey={"avg"}
                    yAxisId={"afbp"}
                    stroke={"#ff3860"}
                    dot={false}
                />
                <Line
                    name={"Avg First Ball Pinfall"}
                    type={"monotone"}
                    dataKey={"afbp"}
                    yAxisId={"afbp"}
                    stroke={"#209cee"}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default AvgFirstBallPinfallGraph;
