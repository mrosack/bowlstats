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
    BarChart,
    Bar,
    Tooltip,
} from "recharts";
import {getPinsCountFromOutcome} from "core/utils";

const NBSP: string = "\u00a0";
const BSP: string = "\u0020";

export interface GameStatsProps {
    game: Game;
}

const GameStats: FC<GameStatsProps> = ({
    game,
}: GameStatsProps): ReactElement => {
    const scoreData = useMemo<Array<Record<string, number>>>(
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
                <ul>
                    <li>
                        <strong>{"Strikes:"}</strong>
                        {NBSP}
                        <span>{game.stats.strikes}</span>
                    </li>
                    <li>
                        <strong>{"Spares:"}</strong>
                        {NBSP}
                        <span>{game.stats.spares}</span>
                    </li>
                    {!!game.stats.splits.total && (
                        <li>
                            <strong>{"Splits:"}</strong>
                            {NBSP}
                            <span>
                                {game.stats.splits.total}
                                {!!game.stats.splits.converted &&
                                    `${BSP}(${game.stats.splits.converted} converted)`}
                            </span>
                        </li>
                    )}
                    {!!game.stats.fouls && (
                        <li>
                            <strong>{"Fouls:"}</strong>
                            {NBSP}
                            <span>{game.stats.fouls}</span>
                        </li>
                    )}
                    <li>
                        <strong>{"Misses:"}</strong>
                        {NBSP}
                        <span>{game.stats.misses}</span>
                    </li>
                    <li>
                        <strong>{"Avg First Ball Pinfall:"}</strong>
                        {NBSP}
                        <span>{game.stats.avgFirstBallPinfall}</span>
                    </li>
                </ul>
            </div>
            <div className={classnames("column", "is-three-fifths")}>
                <ResponsiveContainer height={175}>
                    <LineChart
                        data={scoreData}
                        margin={{
                            top: 10,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}>
                        <CartesianGrid strokeDasharray={"2 2"} />
                        <XAxis dataKey={"name"} padding={{left: 10, right: 10}} />
                        <YAxis
                            interval={0}
                            scale={"linear"}
                            name={"Pins"}
                            yAxisId={"pins"}
                            orientation={"left"}
                            domain={[0, 10]}
                        />
                        <YAxis
                            interval={0}
                            scale={"linear"}
                            name={"Score"}
                            yAxisId={"score"}
                            orientation={"right"}
                            domain={[0, 30]}
                        />
                        <Legend />
                        <Line
                            name={"Pins per frame"}
                            type={"monotone"}
                            yAxisId={"pins"}
                            dataKey={"pins"}
                            stroke={"#209cee"}
                        />
                        <Line
                            name={"Score per frame"}
                            type={"monotone"}
                            yAxisId={"score"}
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
