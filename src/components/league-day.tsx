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

    const $dayTitle = (
        <div className={classnames("columns", "mb-2")}>
            <span className={classnames("column","is-one-fifth")}>
                {"Day"}
                {NBSP}
                {day.dayIndex}
            </span>
            <h5 className={classnames("column","is-flex","is-justify-content-space-between","is-align-items-center")}>
                <strong>{day.team}</strong>
                <span className={classnames("is-size-7","has-text-grey")}>{"vs"}</span>
                <strong>{day.vs}</strong>
            </h5>
        </div>
    );

    if (day.bye) {
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

                <div
                    className={classnames(
                        "is-flex-1",
                        "is-flex",
                        "is-flex-direction-column",
                        "is-justify-content-center",
                    )}>
                    {$dayTitle}
                    <p className={classnames("is-italic", "has-text-centered", "my-5")}>
                        {"bye"}
                    </p>
                    {day.note && (
                        <p className={classnames("mb-3")}>
                            <strong>{"Note:"}</strong>
                            {NBSP}
                            <span className={classnames("is-italic")}>
                                {day.note}
                            </span>
                        </p>
                    )}
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

            <div
                className={classnames(
                    "is-flex-1",
                    "is-flex",
                    "is-flex-direction-column",
                    "is-justify-content-center",
                )}>
                {$dayTitle}
                <ol className={classnames("is-no-list")}>
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
                <ul className={classnames("mb-3")}>
                    <li>
                        <strong
                            className={classnames(
                                "has-text-grey",
                            )}>{`Average:`}</strong>
                        {NBSP}
                        <span>{day.avg}</span>
                    </li>
                    <li>
                        <strong
                            className={classnames(
                                "has-text-grey",
                            )}>{`Handicap:`}</strong>
                        {NBSP}
                        <span>{day.handicap}</span>
                    </li>
                </ul>
                {day.note && (
                    <p className={classnames("mb-3")}>
                        <strong>{"Note:"}</strong>
                        {NBSP}
                        <span className={classnames("is-italic")}>
                            {day.note}
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default LeagueDay;
