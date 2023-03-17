/* @leny/bowlstats
 *
 * /src/components/graphs/index.tsx
 */

import type {FC, ReactElement} from "react";
import type {Game, Nullable} from "types";

import ScoreGraph from "./score";
import StrikesGraph from "./strikes";
import SparesGraph from "./spares";
import AvgFirstBallPinfallGraph from "./avg-first-ball-pinfall";
import {useData} from "core/hooks/use-data";
import classnames from "classnames";
import {useMemo, useState} from "react";

const Graphs: FC = (): ReactElement => {
    const {games: rawGames, years} = useData();
    const choices = useMemo<Array<string | number>>(
        () => ["Total", ...years],
        [years],
    );
    const [scope, setScope] = useState<string | number>("Total");

    const games = useMemo<Array<Game>>(
        () =>
            rawGames
                .filter((game: Game): boolean =>
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
                                href={"javascript:void(0)"}
                                onClick={() => setScope(choice)}>
                                {choice}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <h3 className={classnames("subtitle")}>{"Score"}</h3>
            <ScoreGraph games={games} />
            <h3 className={classnames("subtitle", "mt-5")}>{"Strikes"}</h3>
            <StrikesGraph games={games} />
            <h3 className={classnames("subtitle", "mt-5")}>{"Spares"}</h3>
            <SparesGraph games={games} />
            <h3 className={classnames("subtitle", "mt-5")}>{"Average First Ball Pinfall"}</h3>
            <AvgFirstBallPinfallGraph games={games} />
        </>
    );
};

export default Graphs;
