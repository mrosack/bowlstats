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
                ["Games (total)", stats.total.games],
                ["Avg (total)", stats.total.avg],
                [`Games (${stats.year.year})`, stats.year.games],
                [`Avg (${stats.year.year})`, stats.year.avg],
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
