/* @leny/bowlstats
 *
 * /src/components/game-frame-outcome.tsx
 */

/* eslint-disable react/no-array-index-key */ // consistency is guaranteed here.

import {FC, ReactElement, useMemo} from "react";
import type {GameFrame} from "types";

import classnames from "classnames";

const NBSP: string = "\u00a0";

const ballStyles: Record<string, string | number> = {
    marginTop: -1,
    marginRight: -1,
    marginLeft: "auto",
};

export interface GameFrameOutcomeProps {
    frame: GameFrame;
    lastFrame: boolean;
    compact?: boolean;
}

const GameFrameOutcome: FC<GameFrameOutcomeProps> = ({
    frame,
    lastFrame,
    compact=false,
}: GameFrameOutcomeProps): ReactElement => {
    // convert the outcome tuple to an array of strings
    const frameOutcome = useMemo<Array<string>>(() => {
        let outcome = frame.outcome as Array<string>;

        if (lastFrame) {
            if (outcome.length === 2) {
                outcome.push(NBSP);
            }
        } else if (outcome.length === 1 && outcome[0] === "X") {
            outcome = [NBSP, "X"];
        }

        return outcome;
    }, [frame]);

    return (
        <table
            style={ballStyles}
            className={classnames("table", "is-bordered")}>
            <tbody>
                <tr>
                    {frameOutcome.map((outcome: string, index: number) => (
                        <td
                            key={index}
                            className={classnames(
                                "is-family-monospace",
                                "is-size-7",
                                "py-1",
                                "px-1",
                                outcome === "X" && "has-text-success",
                                outcome === "/" && "has-text-info",
                                outcome === "F" && "has-text-danger",
                                outcome === "-" && "has-text-danger",
                                frame.split &&
                                    index === 0 &&
                                    "is-split-frame",
                            )}>
                            {outcome}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};

export default GameFrameOutcome;
