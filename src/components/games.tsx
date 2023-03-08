/* @leny/bowlstats
 *
 * /src/components/games.tsx
 */

import {FC, ReactElement} from "react";
import type {Game} from "types";

import classnames from "classnames";
import {useData} from "core/hooks/use-data";
import GameDetails from "components/game";
import dayjs from "dayjs";
import {useState} from "react";

const currentYear: number = new Date().getFullYear();
const currentMonth: number = new Date().getMonth();

const Games: FC = (): ReactElement => {
    const {games, stats, years} = useData();

    const [year, setYear] = useState<number>(currentYear);
    const [month, setMonth] = useState<number>(currentMonth);

    return (
        <>
            <div className={classnames("tabs", "is-large")}>
                <ul>
                    {years.map((yr: number) => (
                        <li
                            key={yr}
                            className={classnames(year === yr && "is-active")}>
                            <a
                                href={"javascript:void(0)"}
                                onClick={() => setYear(yr)}>
                                {yr}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={classnames("tabs")}>
                <ul>
                    {Array.from(
                        new Array(
                            year < currentYear ? 12 : currentMonth + 1,
                        ).keys(),
                    ).map(i => (
                        <li
                            key={i}
                            className={classnames(i === month && "is-active")}>
                            <a
                                href={"javascript:void(0)"}
                                onClick={() => setMonth(i)}>
                                {dayjs().set("month", i).format("MMM")}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {games
                .filter(
                    (game: Game): boolean =>
                        game.date.year === year &&
                        game.date.month === month+1,
                )
                .reverse()
                .map(( game: Game, i:number ) => (
                    <GameDetails
                        key={`${Object.values(game.date).join("-")}-${i}`}
                        game={game}
                        isBest={
                            stats.total.best === game.score ||
                            (stats.year.year === year &&
                                stats.year.best === game.score)
                        }
                    />
                ))}
        </>
    );
};

export default Games;
