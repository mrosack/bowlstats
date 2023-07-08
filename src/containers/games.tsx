/* @leny/bowlstats
 *
 * /src/containers/games.tsx
 */

import type {FC, ReactElement} from "react";
import type {Nullable} from "types";

import {useState} from "react";
import classnames from "classnames";
import Numbers from "components/numbers";
import Filters from "components/filters";
import Games from "components/games";
import Graphs from "components/graphs";
import {getDataStore, DataStoreContextProvider} from "core/data-store";

const GamesContainer: FC = (): ReactElement => {
    const [year, setYear] = useState<Nullable<number>>(null);
    const [month, setMonth] = useState<Nullable<number>>(null);
    const [day, setDay] = useState<Nullable<number>>(null);
    const [withHouseBallGames, setWithHouseBallGames] =
        useState<boolean>(false);
    const [withDryLaneGames, setWithDryLaneGames] = useState<boolean>(false);

    return (
        <DataStoreContextProvider
            value={getDataStore(
                year,
                month,
                day,
                withHouseBallGames,
                withDryLaneGames,
            )}>
            <div className={classnames("container", "mx-auto")}>
                <section className={classnames("section")}>
                    <Filters
                        year={year}
                        month={month}
                        day={day}
                        withHouseBallGames={withHouseBallGames}
                        withDryLaneGames={withDryLaneGames}
                        onYearChange={(y: Nullable<number>): void => {
                            setYear(y);
                        }}
                        onMonthChange={(m: Nullable<number>): void => {
                            setMonth(m);
                        }}
                        onDayChange={(d: Nullable<number>): void => {
                            setDay(d);
                        }}
                        toggleHouseBallGames={(b: boolean): void => {
                            setWithHouseBallGames(b);
                        }}
                        toggleDryLaneGames={(b: boolean): void => {
                            setWithDryLaneGames(b);
                        }}
                    />
                </section>
                <section className={classnames("section")}>
                    <Numbers />
                </section>
                <div className={classnames("section", "columns")}>
                    <div className={classnames("column")}>
                        <Games />
                    </div>
                    <div className={classnames("column")}>
                        <Graphs />
                    </div>
                </div>
            </div>
        </DataStoreContextProvider>
    );
};

export default GamesContainer;
