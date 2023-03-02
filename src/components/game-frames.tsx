/* @leny/bowlstats
 *
 * /src/components/game-frames.tsx
 */

import {FC, ReactElement} from "react";
import type {GameFrame} from "types";

import classnames from "classnames";

const NBSP: string = "\u00a0";

const ballStyles: Record<string, string | number> = {
    marginTop: -1,
    marginRight: -1,
    marginLeft: "auto",
};

export interface GameFramesProps {
    frames: Array<GameFrame>;
    score: number;
    compact: boolean;
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
                            <table
                                style={ballStyles}
                                className={classnames("table", "is-bordered")}>
                                <tr>
                                    {(frame.outcome.length === 1 &&
                                    frame.outcome[0] === "X"
                                        ? [NBSP, "X"]
                                        : frame.outcome
                                    ).map(
                                        (
                                            outcome: string,
                                            index: number,
                                        ) => (
                                            <td
                                                key={index}
                                                className={classnames(
                                                    "is-family-monospace",
                                                    "is-size-7",
                                                    "p-1",
                                                    outcome === "X" &&
                                                        "has-text-success",
                                                    outcome === "/" &&
                                                        "has-text-info",
                                                    outcome === "F" &&
                                                        "has-text-danger",
                                                    outcome === "-" &&
                                                        "has-text-danger",
                                                    frame.split &&
                                                        index === 0 &&
                                                        "has-background-warning",
                                                )}>
                                                {outcome}
                                            </td>
                                        ),
                                    )}
                                </tr>
                            </table>
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
