/* @leny/bowlstats
 *
 * /src/components/numbers.tsx
 */

import type {FC, ReactElement} from "react";

import classnames from "classnames";
import {useData} from "../core/hooks/use-data";
import params from "../../data/params.json";

const BSP: string = "\u0020";

const Numbers: FC = (): ReactElement => {
    const {stats} = useData();

    return (
        <section className={classnames("level", "is-align-items-start")}>
            {[
                ["Games", stats.games],
                [
                    "Avg Score",
                    stats.avg.value,
                    stats.avg.best,
                    stats.avg.absDeviation,
                    params.goals.avgScorePerGame,
                ],
                [
                    "Avg First Ball Pinfall",
                    stats.avgFirstBallPinfall.value,
                    stats.avgFirstBallPinfall.best,
                    null,
                    params.goals.avgFirstBallPinfall,
                ],
                [
                    "Strikes",
                    `${stats.strikes.value}%`,
                    `${stats.strikes.best!}%`,
                ],
                ["Spares", `${stats.spares.value}%`, `${stats.spares.best!}%`],
                ["Pins", stats.pins],
            ].map(([label, value, best, absDeviation, goal]) => (
                <div
                    key={label}
                    className={classnames("level-item", "has-text-centered")}>
                    <div>
                        <p className={"heading"}>{label}</p>
                        <p className={"title"}>{value}</p>
                        {!!(goal && value) && (
                            <p className={classnames("is-size-6")}>
                                <small
                                    className={"has-text-grey-light"}
                                    style={{verticalAlign: 1}}>
                                    {"goal:"}
                                </small>
                                {BSP}
                                <strong
                                    className={
                                        value >= goal
                                            ? "has-text-success"
                                            : "has-text-danger"
                                    }>
                                    {goal}
                                </strong>
                            </p>
                        )}
                        {!!absDeviation && (
                            <p className={classnames("is-size-7")}>
                                <small
                                    className={"has-text-grey-light"}
                                    style={{verticalAlign: 1}}>
                                    {"abs. deviation:"}
                                </small>
                                {BSP}
                                <strong className={"has-text-info"}>
                                    {" "}
                                    {absDeviation}{" "}
                                </strong>
                            </p>
                        )}{!!best && (
                            <p className={classnames("is-size-7")}>
                                <small
                                    className={"has-text-grey-light"}
                                    style={{verticalAlign: 1}}>
                                    {"best:"}
                                </small>
                                {BSP}
                                <strong className={"has-text-success"}>
                                    {" "}
                                    {best}{" "}
                                </strong>
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Numbers;
