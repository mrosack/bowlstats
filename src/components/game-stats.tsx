/* @leny/bowlstats
 *
 * /src/components/game-stats.tsx
 */

import type {FC, ReactElement} from "react";
import type {Game, GameFrame} from "types";

import {useMemo} from "react";
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
    const scoreData = useMemo<Array<Record<string, number>>>(
        () =>
            game.frames.map(({score, outcome}: GameFrame, i: number) => ({
                name: i + 1,
                score,
                pins: getPinsCountFromOutcome(outcome, i === 9),
            })),
        [game],
    );

    const stats = useMemo<Record<string, string | number>>(() => {
        const results: Record<string, string | number> = {
            Pins: game.pins,
            Strikes: game.stats.strikes,
            Spares: {
                total: game.stats.spares.total,
                "single pin": game.stats.spares.single,
                "multiple pins": game.stats.spares.multiple,
            },
        };

        if (game.stats.splits.total) {
            results.Splits = `${game.stats.splits.total} ${
                game.stats.splits.converted
                    ? `(${game.stats.splits.converted} converted)`
                    : ""
            }`;
        }

        if (game.stats.fouls) {
            results.Fouls = game.stats.fouls;
        }

        results.Misses = game.stats.misses;
        results["Avg First Ball Pinfall"] = game.stats.avgFirstBallPinfall;

        return results;
    }, [game]);

    return (
        <div className={classnames("columns", "is-fluid")}>
            <div className={classnames("column")}>
                <ul>
                    {Object.entries(stats).map(([key, value]) => (
                        <li key={key}>
                            <strong>{`${key}:`}</strong>
                            {NBSP}
                            {["number","string"].includes( typeof value ) ? (
                                <span>{value}</span>
                            ) : (
                            [
                                <span>{value.total}</span>
                            ,<ul className={classnames("ml-3", "is-size-7")}>
                                {Object.entries(value).filter(([k])=>k!=="total").map(([k, v]) => (
                                    <li key={k}>
                                    <strong className={classnames("has-text-grey")}>{`${k}:`}</strong>
                                    {NBSP}
                                    <span>{v}</span>
                                    </li>
                                ))}
                                </ul>
                            ]                            )}
                        </li>
                    ))}
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
                        <XAxis
                            dataKey={"name"}
                            padding={{left: 10, right: 10}}
                        />
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
