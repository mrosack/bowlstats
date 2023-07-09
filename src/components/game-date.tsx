/* @leny/bowlstats
 *
 * /src/components/game-date.tsx
 */

import type {FC, ReactElement} from "react";
import {Game} from "types";
import type {Dayjs} from "dayjs";

import {useCallback, useState} from "react";
import classnames from "classnames";
import GameFrames from "components/game-frames";
import GameStats from "components/game-stats";
import {useMemo} from "react";
import dayjs from "dayjs";

const NBSP: string = "\u00a0";

export interface GameDateProps {
    date: Dayjs;
    showYear?: boolean;
}

const GameDate: FC<GameDateProps> = ({
    date,
    showYear = false,
}: GameDateProps): ReactElement => (
    <div className={classnames("mr-2", "has-background-white")}>
        <span
            className={classnames(
                "is-block",
                "has-background-danger",
                "has-text-white",
                "is-size-7",
                "px-2",
                "has-text-centered",
                "has-text-weight-semibold",
                "is-uppercase",
            )}>
            {date.format("MMM")}
        </span>
        <span
            className={classnames(
                "is-block",
                "has-text-centered",
                "has-text-black",
                "has-text-weight-bold",
            )}
            style={{
                border: "1px solid #dbdbdb",
                borderTop: 0,
                borderBottom: "1px solid #dbdbdb",
            }}>
            {date.date()}
        </span>
        {showYear && (
            <span
                className={classnames(
                    "is-block",
                    "has-text-black",
                    "is-size-8",
                    "px-2",
                    "has-text-weight-semibold",
                    "is-uppercase",
                )}
                style={{
                    border: "1px solid #dbdbdb",
                    borderTop: 0,
                    borderBottom: "1px solid #dbdbdb",
                }}>
                {date.format("YYYY")}
            </span>
        )}
    </div>
);
export default GameDate;
