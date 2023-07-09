/* @leny/bowlstats
 *
 * /src/components/leagues.tsx
 */

/* eslint-disable react/no-array-index-key */ // consistency is guaranteed here.

import type {FC, ReactElement} from "react";
import type {League} from "types";

import {useState, useMemo} from "react";
import classnames from "classnames";
import {useData} from "core/hooks/use-data";
import GameDetails from "components/game";
import {preventDefault} from "core/utils";
import LeagueDay from "./league-day";

const NBSP: string = "\u00a0";

const Leagues: FC = (): ReactElement => {
    const {leagues} = useData();
    const [selectedLeague, setSelectedLeague] = useState<League>(leagues[0]);

    if (!leagues.length) {
        return (
            <section className={classnames("section", "py-6")}>
                <p
                    className={classnames(
                        "has-text-centered",
                        "has-text-grey",
                        "my-6",
                        "py-6",
                    )}>
                    {"No leagues yet."}
                </p>
            </section>
        );
    }

    return (
        <section className={classnames("section", "columns", "pt-1")}>
            <div className={classnames("column", "is-one-fifth")}>
                <ul className={classnames("pt-6")}>
                    {leagues.map((league: League) => (
                        <li key={league.name} className={classnames("mb-2")}>
                            <a
                                className={classnames(
                                    "button",
                                    "is-fullwidth",
                                    selectedLeague.name === league.name &&
                                        "is-primary",
                                )}
                                onClick={preventDefault((): void => {
                                    setSelectedLeague(league);
                                })}>
                                {league.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={classnames("column", "is-three-fifths")}>
                <h4 className={classnames("is-size-4", "mb-4")}>{selectedLeague.name}</h4>
                <div>
                    {selectedLeague.days.map((day,index) => (
                        <LeagueDay key={`league-${selectedLeague.name}-day-${day}-idx-${index}`} day={day} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leagues;
