/* @leny/bowlstats
 *
 * /src/containers/root.tsx
 */

import type {FC, ReactElement} from "react"

import classnames from "classnames";
import Hero from "components/hero";

const Root: FC = ():ReactElement=>(
    <div className={classnames("container")}>
        <Hero />
        <div className={classnames("columns")}>
            <div className={classnames("column")}></div>
            <div className={classnames("column")}></div>
        </div>
    </div>
);

export default Root;

