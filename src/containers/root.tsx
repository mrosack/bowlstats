/* @leny/bowlstats
 *
 * /src/containers/root.tsx
 */

import type {FC, ReactElement} from "react";

import {useState} from "react";
import classnames from "classnames";
import Header from "components/header";
import Games from "containers/games";
import Footer from "components/footer";
import {preventDefault} from "core/utils";

type Mode = "games" | "leagues";

const RootContainer: FC = (): ReactElement => {
    const [mode, setMode] = useState<Mode>("games");

    const $content = mode === "games" ? <Games /> : <div>{"Leagues"}</div>;

    return (
        <div className={classnames("container", "is-fluid", "px-0")}>
            <Header />
            {/* }
            <div className={classnames("tabs", "is-centered", "is-small", "is-toggle", "mt-neg-6")}>
                <ul>
                    <li className={classnames(mode === "games" && "is-active")}>
                        <a onClick={preventDefault(()=>setMode("games"))}>
                            <span>{"Games"}</span>
                        </a>
                    </li>
                    <li
                        className={classnames(
                            mode === "leagues" && "is-active",
                        )}>
                        <a onClick={preventDefault(()=>setMode("leagues"))}>
                            <span>{"Leagues"}</span>
                        </a>
                    </li>
                </ul>
            </div>
            { */}
            {$content}
            <Footer />
        </div>
    );
};

export default RootContainer;
