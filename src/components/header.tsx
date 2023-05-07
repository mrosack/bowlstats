/* @leny/bowlstats
 *
 * /src/components/header.tsx
 */

import type {FC, ReactElement} from "react";

import classnames from "classnames";
import params from "../../data/params.json";
import {Helmet} from "react-helmet";

export type HeaderProps = {
    withHouseBallGames: boolean;
    toggleHouseBallGames(): void;
    withDryLaneGames: boolean;
    toggleDryLaneGames(): void;
};

const Header: FC<HeaderProps> = ({
    withHouseBallGames,
    toggleHouseBallGames,
    withDryLaneGames,
    toggleDryLaneGames,
}: HeaderProps): ReactElement => (
    <>
        <Helmet>
            <meta charSet={"utf-8"} />
            <title>{params.title}</title>
            <meta name={"description"} content={params.subtitle} />
        </Helmet>
        <header
            className={classnames("hero", "is-small", "is-primary", "mb-6")}>
            <div
                className={classnames(
                    "hero-body",
                    "is-flex",
                    "is-justify-content-space-between",
                    "is-align-items-center",
                )}>
                <div>
                    <h1 className={classnames("title")}>{params.title}</h1>
                    <h2 className={classnames("subtitle")}>
                        {params.subtitle}
                    </h2>
                </div>
                <div>
                    <button
                        type={"button"}
                        className={classnames(
                            "button",
                            "is-small",
                            "is-primary",
                        )}
                        onClick={() => toggleHouseBallGames()}>
                        {`${
                            withHouseBallGames ? "Exclude" : "Include"
                        } house ball games`}
                    </button>
                    <button
                        type={"button"}
                        className={classnames(
                            "button",
                            "is-small",
                            "is-primary",
                        )}
                        onClick={() => toggleDryLaneGames()}>
                        {`${
                            withDryLaneGames ? "Exclude" : "Include"
                        } dry lane games`}
                    </button>
                </div>
            </div>
        </header>
    </>
);

export default Header;
