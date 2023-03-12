/* @leny/bowlstats
 *
 * /src/components/numbers.tsx
 */

import type {FC, ReactElement} from "react";

import classnames from "classnames";
import {useData} from "../core/hooks/use-data";

const BSP: string = "\u0020";

const Numbers: FC = (): ReactElement => {
    const {stats} = useData();

    return (
        <section className={classnames("level","is-align-items-start")}>
            {[
                ["Games", stats.total.games],
                ["Avg Score", stats.total.avg.value, stats.total.avg.best],
                ["Strikes", `${stats.total.strikes.value}%`, `${stats.total.strikes.best}%`],
                ["Spares", `${stats.total.spares.value}%`, `${stats.total.spares.best}%`],
                ["Avg First Ball Pinfall", stats.total.avgFirstBallPinfall.value, stats.total.avgFirstBallPinfall.best],
            ].map(([label, value, best]) => (
                <div
                    key={label}
                    className={classnames("level-item", "has-text-centered")}>
                    <div>
                        <p className={"heading"}>{label}</p>
                        <p className={"title"}>{value}</p>
                        {!!best && (
                            <p className={classnames("is-size-7")}>
                                <small className={"has-text-grey-light"} style={{verticalAlign: 1}}>{"best:"}</small>
                                {BSP}
                                <strong className={"has-text-success"}> {best} </strong>
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Numbers;
