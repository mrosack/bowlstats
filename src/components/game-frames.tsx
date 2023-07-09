/* @leny/bowlstats
 *
 * /src/components/game-frames.tsx
 */

/* eslint-disable react/no-array-index-key */ // consistency is guaranteed here.

import type {FC, ReactElement} from "react";
import type {GameFrame} from "types";

import GameFrameOutcome from "components/game-frame-outcome";
import classnames from "classnames";

export interface GameFramesProps {
    frames: Array<GameFrame>;
    score: number;
    scratch?: number;
    handicap?: number;
    compact?: boolean;
    hideHeader?: boolean;
}

const GameFrames: FC<GameFramesProps> = ({
    frames,
    scratch,
    handicap,
    score,
    compact = false,
    hideHeader = false,
}: GameFramesProps): ReactElement => (
    <table
        className={classnames(
            "table",
            "is-bordered",
            "is-fullwidth",
            `mb-${compact ? 0 : 4}`,
        )}>
        {!hideHeader &&
            (compact || (
                <thead>
                    <tr>
                        {Array.from(new Array(10).keys()).map(i => (
                            <th
                                key={i}
                                className={classnames(
                                    "has-text-centered",
                                    "has-text-grey-light",
                                    "py-1",
                                )}
                                width={i === 9 ? "11.25%" : "8.6%"}>
                                <small>{i + 1}</small>
                            </th>
                        ))}
                        <th
                            className={classnames(
                                "has-text-centered",
                                "has-text-grey-light",
                                "py-1",
                            )}
                            width={"11.2%"}>
                            <small>{scratch ? "Result" : ""}</small>
                        </th>
                    </tr>
                </thead>
            ))}
        <tbody>
            <tr>
                {frames.map((frame: GameFrame, index: number) => (
                    <td key={index} className={classnames("p-0", "pb-1")}
                                width={index === 9 ? "11.25%" : "8.6%"}>
                        <div className={classnames("has-text-right", "mb-2")}>
                            <GameFrameOutcome
                                frame={frame}
                                lastFrame={index === 9}
                                compact={compact}
                            />
                        </div>
                        {compact || (
                            <span
                                className={classnames(
                                    "has-text-centered",
                                    "is-block",
                                    "has-text-grey",
                                )}>
                                {frame.cumulative}
                            </span>
                        )}
                    </td>
                ))}
                <td
                    className={classnames(
                        "is-vcentered",
                        "is-size-5",
                        "has-text-centered",
                        "has-text-weight-medium",
                        scratch
                            ? ["pb-1", "pt-0", "pr-0", "pl-2"]
                            : compact && ["py-1", "px-2"],
                    )} width={"11.2%"}>
                    {scratch && (
                        <div className={classnames("has-text-right", "mb-2")}>
                            <GameFrameOutcome
                                frame={{outcome: [scratch, handicap || 0]}}
                                compact
                            />
                        </div>
                    )}
                    <div className={classnames(scratch && "pr-2")}>{score}</div>
                </td>
            </tr>
        </tbody>
    </table>
);

export default GameFrames;
