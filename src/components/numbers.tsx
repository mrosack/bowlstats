/* @leny/bowlstats
 *
 * /src/components/numbers.tsx
 */

import type {FC, ReactElement} from "react";

import classnames from "classnames";
import {useData} from "../core/hooks/use-data";

const Numbers: FC = (): ReactElement => {
    const {stats} = useData();

    return (
        <section className={classnames("level")}>
            {[
                ["Games", stats.total.games],
                ["Best", stats.total.best],
                ["Avg Score", stats.total.avg],
                ["Strikes", `${stats.total.strikes}%`],
                ["Spares", `${stats.total.spares}%`],
                ["Avg First Ball Pinfall", stats.total.avgFirstBallPinfall],
            ].map(([label, value]) => (
                <div
                    key={label}
                    className={classnames("level-item", "has-text-centered")}>
                    <div>
                        <p className={"heading"}>{label}</p>
                        <p className={"title"}>{value}</p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Numbers;
