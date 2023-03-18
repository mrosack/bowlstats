/* @leny/bowlstats
 *
 * /src/components/graphs/index.tsx
 */

import type {FC, ReactElement} from "react";
import type {Game} from "types";

import ScoreGraph from "./score";
import StrikesGraph from "./strikes";
import SparesGraph from "./spares";
import AvgFirstBallPinfallGraph from "./avg-first-ball-pinfall";
import {useData} from "core/hooks/use-data";
import classnames from "classnames";
import {useMemo, useState} from "react";
import params from "../../../data/params.json";
import {preventDefault} from "core/utils";

const NBSP: string = "\u00a0";

const Graphs: FC = (): ReactElement => {
    const {games: rawGames, years} = useData();
    const choices = useMemo<Array<string | number>>(
        () => [...years, "Total"].reverse(),
        [years],
    );
    const [scope, setScope] = useState<string | number>("Total");
    const [hideBall, setHideBall] = useState<boolean>(true);
    const [hideGoal, setHideGoal] = useState<boolean>(true);

    const games = useMemo<Array<Game>>(
        () =>
            rawGames.filter((game: Game): boolean =>
                scope === "Total" ? true : game.date.year === scope,
            ),
        [rawGames, scope],
    );

    return (
        <>
            <div className={classnames("tabs", "is-large", "is-centered")}>
                <ul>
                    {choices.map((choice: string | number) => (
                        <li
                            key={choice}
                            className={classnames(
                                choice === scope && "is-active",
                            )}>
                            <a
                                href={"#"}
                                onClick={preventDefault(() => {
                                    setScope(choice);
                                })}>
                                {choice}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={classnames("has-text-right", "mt-5")}>
                <button
                    type={"button"}
                    className={classnames(
                        "button",
                        "is-small",
                        "is-ghost",
                        "is-shadowless",
                    )}
                    onClick={preventDefault(() => {
                        setHideGoal(!hideGoal);
                    })}>
                    {`(${hideGoal ? "show" : "hide"} goals)`}
                </button>
                {NBSP}
                <button
                    type={"button"}
                    className={classnames(
                        "button",
                        "is-small",
                        "is-ghost",
                        "is-shadowless",
                    )}
                    onClick={preventDefault(() => {
                        setHideBall(!hideBall);
                    })}>
                    {`(${hideBall ? "show" : "hide"} ball weight)`}
                </button>
            </div>
            <ScoreGraph
                games={games}
                hideBall={hideBall}
                goal={!hideGoal && params.goals.avgScorePerGame}
            />
            <AvgFirstBallPinfallGraph
                games={games}
                hideBall={hideBall}
                goal={!hideGoal && params.goals.avgFirstBallPinfall}
            />
            <StrikesGraph games={games} hideBall={hideBall} />
            <SparesGraph games={games} hideBall={hideBall} />
        </>
    );
};

export default Graphs;
