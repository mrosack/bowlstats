/* @leny/bowlstats
 *
 * /src/components/hero.tsx
 */

import type {FC, ReactElement} from "react";

import classnames from "classnames";
import params from "../../data/params.json";

const Hero: FC = (): ReactElement => (
    <header className={classnames("hero", "is-small", "is-primary", "mb-6")}>
        <div className={classnames("hero-body")}>
            <h1 className={classnames("title")}>{params.title}</h1>
            <h2 className={classnames("subtitle")}>
                {params.subtitle}
            </h2>
        </div>
    </header>
);

export default Hero;
