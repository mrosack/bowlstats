/* @leny/bowlstats
 *
 * /src/containers/root.tsx
 */

import type {FC, ReactElement} from "react"

import classnames from "classnames";
import Hero from "components/hero";
import Numbers from "components/numbers";
import Games from "components/games";

const Root: FC = ():ReactElement=>(
    <div className={classnames("container")}>
        <Hero />
        <Numbers />
        <div className={classnames("columns")}>
            <div className={classnames("column")}>
                <Games />
            </div>
            <div className={classnames("column")}></div>
        </div>
    </div>
);

export default Root;

