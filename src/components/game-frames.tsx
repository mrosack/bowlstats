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
                {frames.map((frame: GameFrame, index: number) => {
                    let frameOutcome: Array<string> = frame.outcome;

                    if (index === 9) {
                        if (frameOutcome.length === 2) {
                            frameOutcome.push(NBSP);
                        }
                    } else if (
                        frameOutcome.length === 1 &&
                        frameOutcome[0] === "X"
                    ) {
                        frameOutcome = [NBSP, "X"];
                    }

                    return (
                        <td key={index} className={classnames("p-0", "pb-1")}>
                            <div
                                className={classnames(
                                    "has-text-right",
                                    "mb-2",
                                )}>
                                <table
                                    style={ballStyles}
                                    className={classnames(
                                        "table",
                                        "is-bordered",
                                    )}>
                                    <tr>
                                        {frameOutcome.map(
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
                    );
                })}
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
