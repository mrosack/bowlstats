/* @leny/bowlstats
 *
 * /src/components/games.tsx
 */

import {FC, ReactElement, useMemo} from "react";
import type {Game} from "types";

import classnames from "classnames";
import {useData} from "core/hooks/use-data";
import GameDetails from "components/game";
import dayjs from "dayjs";
import {useState} from "react";

const currentYear: number = new Date().getFullYear();
const currentMonth: number = new Date().getMonth();

const Games: FC = (): ReactElement => {
    const {games: rawGames, stats, years} = useData();

    const [year, setYear] = useState<number>(currentYear);
    const [month, setMonth] = useState<number>(currentMonth);
    const [day, setDay] = useState<number>(0);

    const months = useMemo<Array<number>>(()=>Array.from(
        new Array(year<currentYear?12:currentMonth+1).keys()
    ),[year, currentYear, currentMonth]);

    const days = useMemo<Array<number>>(()=>
        rawGames
            .filter((game:Game):boolean=>game.date.year===year&&game.date.month===month+1)
            .reduce((acc:Array<number>, game:Game)=>Array.from(new Set(acc).add(game.date.day)), [0])
    , [rawGames, year, month])

    const games = useMemo<Array<Game>>(()=>rawGames.filter(
        (game:Game):boolean=>game.date.year===year&&game.date.month===month+1&&(day?game.date.day===day:true)
    ).reverse(), [rawGames,year, month, day]);

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
                    {months.map(i => (
                        <li
                            key={i}
                            className={classnames(i === month && "is-active")}>
                            <a
                                href={"javascript:void(0)"}
                                onClick={() => { setMonth(i); setDay(0) }}>
                                {dayjs().set("month", i).format("MMM")}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={classnames("tabs", "is-small")}>
                <ul>
                    {days.map(i => (
                        <li
                            key={i}
                            className={classnames(i === day && "is-active")}>
                            <a
                                href={"javascript:void(0)"}
                                onClick={() => setDay(i)}>
                                {i===0?"All":`${i}`.padStart(2,"0")}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {games.map((game: Game, i: number) => (
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
