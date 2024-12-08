/* @leny/bowlstats
 *
 * /src/components/header.tsx
 */

import type {FC, ReactElement} from "react";

import classnames from "classnames";
import params from "../../data/params.json";
import {Helmet} from "react-helmet";

export interface HeaderProps {
    mode: "games" | "leagues";
    onChangeMode(mode: "games" | "leagues"): void;
}

const Header: FC<HeaderProps> = ({
    mode,
    onChangeMode,
}: HeaderProps): ReactElement => (
    <>
        <Helmet>
            <meta charSet={"utf-8"} />
            <title>{params.title}</title>
            <meta name={"description"} content={params.subtitle} />
        </Helmet>
        <header className={classnames("hero", "is-small", "is-primary")}>
            <div
                className={classnames(
                    "hero-body",
                    "is-flex",
                    "is-justify-content-space-between",
                    "is-align-items-end",
                )}>
                <div className={classnames("is-flex-1")}>
                    <h1 className={classnames("title")}>{params.title}</h1>
                    <h2 className={classnames("subtitle")}>
                        {params.subtitle}
                    </h2>
                </div>
                {/* <div
                    className={classnames(
                        "is-flex-1",
                        "is-flex",
                        "is-justify-content-center",
                    )}>
                    <div className={classnames("field", "has-addons")}>
                        <div className={classnames("control")}>
                            <button
                                type={"button"}
                                className={classnames(
                                    "button",
                                    "is-light",
                                    "is-small",
                                    mode !== "games" && "is-outlined",
                                    mode === "games" && "is-active",
                                )}
                                onClick={(): void => {
                                    onChangeMode("games");
                                }}>
                                {"Games"}
                            </button>
                        </div>
                        <div className={classnames("control")}>
                            <button
                                type={"button"}
                                className={classnames(
                                    "button",
                                    "is-light",
                                    "is-small",
                                    mode !== "leagues" && "is-outlined",
                                    mode === "leagues" && "is-active",
                                )}
                                onClick={(): void => {
                                    onChangeMode("leagues");
                                }}>
                                {"Leagues"}
                            </button>
                        </div>
                    </div>
                </div> */}
                <div className={classnames("is-flex-1")} />
            </div>
        </header>
    </>
);

export default Header;
