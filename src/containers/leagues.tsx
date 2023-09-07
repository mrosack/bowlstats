/* @leny/bowlstats
 *
 * /src/containers/leagues.tsx
 */

import type {FC, ReactElement} from "react";

import classnames from "classnames";
import {getDataStore, DataStoreContextProvider} from "core/data-store";
import Leagues from "components/leagues";

const LeaguesContainer: FC = (): ReactElement => {
    return (
        <DataStoreContextProvider value={getDataStore()}>
            <div className={classnames("container", "mx-auto")}>
                <section className={classnames("hero")}>
                    <div className={classnames("hero-body")}>
                        <h3 className={classnames("title", "is-size-3")}>
                            {"Leagues"}
                        </h3>
                        <h4
                            className={classnames(
                                "subtitle",
                                "is-size-5",
                                "has-text-grey",
                            )}>
                            {"Records of my league nights."}
                        </h4>
                        <p>
                        {"Those records are only my scores, and not the whole team's."}
                        </p>
                    </div>
                </section>
                <Leagues />
            </div>
        </DataStoreContextProvider>
    );
};

export default LeaguesContainer;
