/* @leny/bowlstats
 *
 * /src/containers/root.tsx
 */

import type {FC, ReactElement} from "react";

import {useState} from "react";
import classnames from "classnames";
import Header from "components/header";
import Numbers from "components/numbers";
import Games from "components/games";
import Graphs from "components/graphs";
import Footer from "components/footer";
import {getDataStore, DataStoreContextProvider} from "core/data-store";

const Root: FC = (): ReactElement => {
    const [withHouseBallGames, setWithHouseBallGames] =
        useState<boolean>(false);
    const [withDryLaneGames, setWithDryLangGames] = useState<boolean>(false);

    return (
        <DataStoreContextProvider value={getDataStore(withHouseBallGames, withDryLaneGames)}>
            <div className={classnames("container", "is-fluid", "px-0")}>
                <Header
                    withHouseBallGames={withHouseBallGames}
                    toggleHouseBallGames={() =>
                        setWithHouseBallGames(!withHouseBallGames)
                    }
                    withDryLaneGames={withDryLaneGames}
                    toggleDryLaneGames={() =>
                        setWithDryLangGames(!withDryLaneGames)
                    }
                />
                <div className={classnames("container", "mx-auto")}>
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
                <Footer />
            </div>
        </DataStoreContextProvider>
    );
};

export default Root;
