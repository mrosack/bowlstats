/* @leny/bowlstats
 *
 * /src/components/graphs.tsx
 */

import type {FC, ReactElement} from "react";
import type {Game} from "types";

import {useData} from "core/hooks/use-data";
import classnames from "classnames";
import {useMemo, useState} from "react";
import {
    LineChart,
    Line,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from "recharts";

const Graphs: FC = (): ReactElement => {
    const {games, stats, years} = useData();
    const choices = useMemo<Array<string | number>>(
        () => ["Total", ...years],
        [years],
    );
    const [scope, setScope] = useState<string | number>("Total");

    const avg = useMemo<number>(
        () =>
            scope === "Total"
                ? stats.total.avg
                : games
                      .filter((game: Game): boolean => game.date.year === scope)
                      .reduce(
                          (acc: number, game: Game): number => acc + game.score,
                          0,
                      ) /
                  games.filter(
                      (game: Game): boolean => game.date.year === scope,
                  ).length,
        [games, scope, stats],
    );

    const data = useMemo<Array<Record<string, number>>>(
        () =>
            games
                .filter((game: Game): boolean =>
                    scope === "Total" ? true : game.date.year === scope,
                )
                .map((game: Game) => ({
                    name: `${game.date.day}/${String(game.date.month).padStart(
                        2,
                        "0",
                    )}`,
                    score: game.score,
                })),
        [games, scope],
    );

    return (
        <>
            <div className={classnames("tabs", "is-centered")}>
                <ul>
                    {choices.map((choice: string | number) => (
                        <li
                            key={choice}
                            className={classnames(
                                choice === scope && "is-active",
                            )}>
                            <a
                                href={"javascript:void(0)"}
                                onClick={() => setScope(choice)}>
                                {choice}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <ResponsiveContainer width={"100%"} height={350}>
                <LineChart
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
                    <XAxis dataKey={"name"} />
                    <YAxis domain={[0, 300]} />
                    <Legend />
                    <ReferenceLine y={avg} stroke={"#ff3860"} />
                    <Line
                        name={"Score per game"}
                        type={"monotone"}
                        dataKey={"score"}
                        stroke={"#209cee"}
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default Graphs;
