/* @leny/bowlstats
 *
 * /src/containers/root.tsx
 */

import type {FC, ReactElement} from "react";

import {useState} from "react";
import classnames from "classnames";
import Header from "components/header";
import Games from "containers/games";
import Leagues from "containers/leagues";
import Footer from "components/footer";

type Mode = "games" | "leagues";

const RootContainer: FC = (): ReactElement => {
    const [mode, setMode] = useState<Mode>("games");

    const $content = mode === "games" ? <Games /> : <Leagues />;

    return (
        <div className={classnames("container", "is-fluid", "px-0")}>
            <Header
                mode={mode}
                onChangeMode={(v:Mode): void => {
                    setMode(v);
                }}
            />
            {$content}
            <Footer />
        </div>
    );
};

export default RootContainer;
