/* @leny/bowlstats
 *
 * /src/components/hero.tsx
 */

import type {FC, ReactElement} from "react"

import classnames from "classnames";

const Hero: FC = ():ReactElement=>(
    <header className={classnames("hero")}>
        <div className={classnames("hero-body")}>
        <h1 className={classnames("title")}>
        {"@leny/bowlstats"}
        </h1>
            <h2 className={classnames("subtitle")}>{"A small bowling stats tracker"}</h2>
        </div>
    </header>
);

export default Hero;

