/* @leny/bowlstats
 *
 * /src/components/games.tsx
 */

import type {FC, ReactElement} from "react";
import type {Game} from "types";

import {useMemo} from "react";
import classnames from "classnames";
import {useData} from "core/hooks/use-data";
import GameDetails from "components/game";

const Games: FC = (): ReactElement => {
    const {games} = useData();

    const years: Array<number> = useMemo(
        () =>
            games.reduce((acc:Array<number>, game: Game) => {
                const set: Set<number> = new Set<number>(acc);

                set.add(game.date.year as number);

                return Array.from(set);
            }, []),
        [games],
    );

    return (
        <>
            {years.map((year: number) => (
                <div key={year}>
                    <h3 className={classnames("is-size-3")}>{year}</h3>
                    {games.filter((game:Game):boolean=>game.date.year===year).reverse().map((game)=>(
                        <GameDetails key={Object.values(game.date).join("-")} game={game} />
                    ))}
                </div>
            ))}
        </>
    );
};

export default Games;
