/* @leny/bowlstats
 *
 * /src/components/header.tsx
 */

import type {FC, ReactElement} from "react";

import classnames from "classnames";
import params from "../../data/params.json";
import {Helmet} from "react-helmet";

const Header: FC = (): ReactElement => (
    <>
        <Helmet>
            <meta charSet={"utf-8"} />
            <title>{params.title}</title>
            <meta name={"description"} content={params.subtitle} />
        </Helmet>
        <header
            className={classnames("hero", "is-small", "is-primary", "mb-6")}>
            <div className={classnames("hero-body")}>
                <h1 className={classnames("title")}>{params.title}</h1>
                <h2 className={classnames("subtitle")}>{params.subtitle}</h2>
            </div>
        </header>
    </>
);

export default Header;
