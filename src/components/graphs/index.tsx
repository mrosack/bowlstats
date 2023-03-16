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

const GraphStatType = {
    SCORE: "Score",
    STRIKES: "Strikes",
    SPARES: "Spares",
    AVG_FIRST_BALL_PINFALL: "Avg First Ball Pinfall",
};

const Graphs: FC = (): ReactElement => {
    const {games: rawGames, years} = useData();
    const choices = useMemo<Array<string | number>>(
        () => ["Total", ...years],
        [years],
    );
    const [scope, setScope] = useState<string | number>("Total");
    const [type, setType] = useState<string>(GraphStatType.SCORE);

    const games = useMemo<Array<Game>>(
        () =>
            rawGames
                .filter((game: Game): boolean =>
                    scope === "Total" ? true : game.date.year === scope,
                ),
        [rawGames, scope],
    );

    const $graph=useMemo<Nullable<ReactElement>>( ()=>{
        switch(type) {
            case GraphStatType.SCORE:
                return ( <ScoreGraph games={games} />);
            case GraphStatType.STRIKES:
                return ( <StrikesGraph games={games} /> )
            case GraphStatType.SPARES:
                return ( <SparesGraph games={games} /> )
            case GraphStatType.AVG_FIRST_BALL_PINFALL:
                return ( <AvgFirstBallPinfallGraph games={games} /> )
            // no default
        }
    },[games, type] )

    return (
        <>
            <div className={classnames("tabs", "is-centered")}>
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
            <div className={classnames("tabs", "is-centered", "is-small")}>
                <ul>
                    {Object.values(GraphStatType).map(
                        (graphStatType: string) => (
                            <li
                                key={graphStatType}
                                className={classnames(
                                    type === graphStatType && "is-active",
                                )}>
                                <a
                                    href={"javascript:void(0)"}
                                    onClick={() => setType(graphStatType)}>
                                    {graphStatType}
                                </a>
                            </li>
                        ),
                    )}
                </ul>
            </div>
            {$graph}
        </>
    );
};

export default Graphs;
