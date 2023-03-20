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
    compact?: boolean;
}

const GameFrames: FC<GameFramesProps> = ({
    frames,
    score,
    compact,
}: GameFramesProps): ReactElement => (
    <table
        className={classnames(
            "table",
            "is-bordered",
            "is-fullwidth",
            `mb-${compact ? 0 : 4}`,
        )}>
        {compact || (
            <thead>
                <tr>
                    {Array.from(new Array(10).keys()).map(i => (
                        <th
                            key={i}
                            className={classnames(
                                "has-text-centered",
                                "has-text-grey-light",
                                "py-1",
                            )}>
                            <small>{i + 1}</small>
                        </th>
                    ))}
                    <td>{""}</td>
                </tr>
            </thead>
        )}
        <tbody>
            <tr>
                {frames.map((frame: GameFrame, index: number) => (
                    <td key={index} className={classnames("p-0", "pb-1")}>
                        <div className={classnames("has-text-right", "mb-2")}>
                            <GameFrameOutcome
                                frame={frame}
                                lastFrame={index === 9}
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
                        compact && "py-1",
                        compact && "px-2",
                    )}>
                    {score}
                </td>
            </tr>
        </tbody>
    </table>
);

export default GameFrames;
