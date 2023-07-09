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
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const date = useMemo<Dayjs>(
        () => dayjs(new Date(day.date.year, day.date.month - 1, day.date.day)),
        [day],
    );

    const toggleDetails = useCallback(() => {
        setShowDetails(!showDetails);
    }, [showDetails]);

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
                    "is-clickable",
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

    if (!showDetails) {
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
                    "is-clickable",
                )}
                onClick={toggleDetails}>
                {$date}

                <div className={classnames("is-flex-1")}>
                    {day.games.map((game: Game) => (
                        <GameFrames
                            key={game.id}
                            scratch={game.scratch}
                            handicap={game.handicap}
                            score={game.score}
                            frames={game.frames}
                            compact
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div
            className={classnames(
                "notification",
                "is-light",
                isBest && "is-primary",
                isWorst && "is-danger",
                "px-5",
            )}>
            <div
                className={classnames(
                    "is-flex",
                    "mb-3",
                    "is-justify-content-space-between",
                    "is-align-content-center",
                )}>
                {$date}
                <div
                    className={classnames(
                        "is-flex",
                        "is-relative",
                        "is-justify-content-center",
                        "is-align-items-center",
                        "has-text-weight-bold",
                        "is-family-secondary",
                        "is-size-5",
                        "has-text-white",
                    )}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: "100%",
                        backgroundColor: getBallColor(game.ball),
                    }}
                    data-tooltip={`Played with ${game.ball.slice(
                        game.ball.startsWith("H") ? 1 : 0,
                    )}lbs ball ${
                        game.ball.startsWith("H") ? "(house ball)" : ""
                    }`}>
                    <span className={classnames("is-block")}>
                        {game.ball.slice(game.ball.startsWith("H") ? 1 : 0)}
                    </span>
                    {game.ball.startsWith("H") && (
                        <span
                            className={classnames("has-text-light")}
                            style={{
                                position: "absolute",
                                bottom: -1,
                                left: "50%",
                                transform: "translateX(-50%)",
                                fontSize: 9,
                            }}>
                            {"H"}
                        </span>
                    )}
                </div>
                <button
                    type={"button"}
                    className={classnames("delete")}
                    onClick={toggleDetails}>
                    {"(hide details)"}
                </button>
            </div>
            <GameFrames score={game.score} frames={game.frames} />
            <p className={classnames(game.note ? "mb-1" : "mb-3")}>
                <strong>{"Lane Oil Pattern:"}</strong>
                {NBSP}
                <span className={classnames("is-italic")}>
                    {game.oilPattern || "none/dry"}
                </span>
            </p>
            {game.note && (
                <p className={classnames("mb-3")}>
                    <strong>{"Note:"}</strong>
                    {NBSP}
                    <span className={classnames("is-italic")}>{game.note}</span>
                </p>
            )}
            <GameStats game={game} />
        </div>
    );
};

export default LeagueDay;
