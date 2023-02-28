/* @leny/bowlstats
 *
 * /src/core/utils.ts
 */

import type {GameFrameBall} from "types";

export const getPinsCountFromOutcome = (
    outcome: [GameFrameBall, GameFrameBall?, GameFrameBall?],
    isLastFrame: boolean = false,
): number => {
    if (!isLastFrame) {
        if (outcome.includes("X") || outcome.includes("/")) {
            return 10;
        }
        return outcome.reduce(
            (acc: number, ball: GameFrameBall) =>
                acc + (typeof ball === "number" ? ball : 0),
            0,
        );
    }

    let pinsCount: number = 0;

    const [one, two, three] = outcome;

    if (one === "X") {
        pinsCount += 10;
    } else if (typeof one === "number" && two !== "/" && three !== "/") {
        pinsCount += one;
    }

    if (two === "/" || two === "X") {
        pinsCount += 10;
    } else if (typeof two === "number" && three !== "/") {
        pinsCount += two;
    }

    if (three === "/" || three === "X") {
        pinsCount += 10;
    } else if (typeof three === "number") {
        pinsCount += three;
    }

    return pinsCount;
};
