/* @leny/bowlstats
 *
 * /src/components/game-stats.tsx
 */

import {FC, ReactElement, useCallback, useMemo, useState} from "react";
import type {Game, GameFrame} from "types";

import classnames from "classnames";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {getPinsCountFromOutcome} from "core/utils";

const NBSP: string = "\u00a0";

export interface GameStatsProps {
    game: Game;
}

const GameStats: FC<GameStatsProps> = ({
    game,
}: GameStatsProps): ReactElement => {
    const data = useMemo<Array<Record<string, number>>>(
        () =>
            game.frames.map(({score, outcome}: GameFrame, i: number) => ({
                name: i + 1,
                score,
                pins: getPinsCountFromOutcome(outcome, i === 9),
            })),
        [game],
    );

    return (
        <div className={classnames("columns", "is-fluid")}>
            <div className={classnames("column")}>
                <ul className={classnames("has-text-black", "is-size-6")}>
                    <li>
                        <span
                            className={classnames(
                                game.stats.strikes || "has-text-danger",
                            )}>
                            {game.stats.strikes || "no"}
                        </span>
                        {NBSP}
                        {"strikes"}
                    </li>
                    <li>
                        <span
                            className={classnames(
                                game.stats.spares || "has-text-danger",
                            )}>
                            {game.stats.spares || "no"}
                        </span>
                        {NBSP}
                        {"spares"}
                    </li>
                    <li>
                        <span
                            className={classnames(
                                game.stats.misses && "has-text-danger",
                            )}>
                            {game.stats.misses || "no"}
                        </span>
                        {NBSP}
                        {"misses"}
                    </li>
                    {!!game.stats.fouls && (
                        <li>
                            <span
                                className={classnames(
                                    game.stats.fouls || "has-text-danger",
                                )}>
                                {game.stats.fouls || "no"}
                            </span>
                            {NBSP}
                            {"fouls"}
                        </li>
                    )}
                </ul>
            </div>
            <div className={classnames("column", "is-three-quarters")}>
                <ResponsiveContainer width={"100%"} height={150}>
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
                        <YAxis interval={0} />
                        <Legend />
                        <Line
                            name={"Pins per frame"}
                            type={"monotone"}
                            dataKey={"pins"}
                            stroke={"#209cee"}
                        />
                        <Line
                            name={"Score per frame"}
                            type={"monotone"}
                            dataKey={"score"}
                            stroke={"#23d160"}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default GameStats;
