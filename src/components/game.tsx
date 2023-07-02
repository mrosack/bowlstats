/* @leny/bowlstats
 *
 * /src/components/game.tsx
 */

import type {FC, ReactElement} from "react";
import {Game} from "types";
import type {Dayjs} from "dayjs";

import {useCallback, useState} from "react";
import classnames from "classnames";
import GameFrames from "components/game-frames";
import GameStats from "components/game-stats";
import GameDate from "components/game-date";
import {useMemo} from "react";
import dayjs from "dayjs";

const NBSP: string = "\u00a0";

const getBallColor = (ball: string): string => {
    switch (ball.slice(ball.startsWith("H") ? 1 : 0)) {
        case "6":
            return "#f8362f";
        case "7":
            return "#c6c20d";
        case "8":
            return "#c81108";
        case "9":
            return "#46435a";
        case "10":
            return "#9b2527";
        case "11":
            return "#1b417d";
        case "12":
            return "#1b6626";
        case "13":
            return "#1f3c7c";
        case "14":
            return "#0aa025";
        case "15":
            return "#262b4b";
        case "16":
            return "#983d28";
        default:
            return "black";
    }
};

export interface GameProps {
    game: Game;
    isBest: boolean;
    isWorst: boolean;
    showYear?: boolean;
}

const Game: FC<GameProps> = ({
    game,
    isBest,
    isWorst,
    showYear = false,
}: GameProps): ReactElement => {
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const date = useMemo<Dayjs>(
        () =>
            dayjs(new Date(game.date.year, game.date.month - 1, game.date.day)),
        [game],
    );

    const toggleDetails = useCallback(() => {
        setShowDetails(!showDetails);
    }, [showDetails]);

    const $date = <GameDate date={date} showYear={showYear} />;

    if (!showDetails) {
        return (
            <div
                className={classnames(
                    "notification",
                    "is-light",
                    isBest && "is-primary",
                    isWorst && "is-danger",
                    "is-flex",
                    "is-justify-content-space-between",
                    "is-align-content-center",
                    "px-5",
                    "is-unselectable",
                    "is-clickable",
                )}
                onClick={toggleDetails}>
                {$date}

                <GameFrames score={game.score} frames={game.frames} compact />
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
                    title={`Played with ${game.ball.slice(
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

export default Game;
