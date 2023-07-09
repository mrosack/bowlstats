/* @leny/bowlstats
 *
 * /src/components/league-day.tsx
 */

import type {FC, ReactElement} from "react";
import {Game, LeagueDay as LeagueDayStructure} from "types";
import type {Dayjs} from "dayjs";

import {useCallback, useState} from "react";
import classnames from "classnames";
import GameFrames from "components/game-frames";
import GameStats from "components/game-stats";
import GameDate from "components/game-date";
import {useMemo} from "react";
import dayjs from "dayjs";

const NBSP: string = "\u00a0";

export interface LeagueDayProps {
    day: LeagueDayStructure;
}

const LeagueDay: FC<LeagueDayProps> = ({day}: LeagueDayProps): ReactElement => {
    const date = useMemo<Dayjs>(
        () => dayjs(new Date(day.date.year, day.date.month - 1, day.date.day)),
        [day],
    );

    const $date = <GameDate date={date} showYear />;

    if (day.bye) {
        return (
            <div
                className={classnames(
                    "notification",
                    "is-light",
                    "is-flex",
                    "is-justify-content-space-between",
                    "is-align-items-center",
                    "px-5",
                    "is-unselectable",
                )}>
                {$date}

                <div
                    className={classnames(
                        "is-flex-1",
                        "is-flex",
                        "is-justify-content-center",
                        "is-align-items-center",
                    )}>
                    <p className={classnames("has-text-weight-bold")}>
                        {"bye"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={classnames(
                "notification",
                "is-light",
                "is-flex",
                "is-justify-content-space-between",
                "is-align-content-start",
                "px-5",
                "is-unselectable",
            )}>
            {$date}

            <ol className={classnames("is-flex-1", "is-no-list")}>
                {day.games.map((game: Game, idx) => (
                    <li key={game.id} className={classnames("mb-2")}>
                        <GameFrames
                            scratch={game.scratch}
                            handicap={game.handicap}
                            score={game.score}
                            frames={game.frames}
                            hideHeader={idx > 0}
                        />
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default LeagueDay;
