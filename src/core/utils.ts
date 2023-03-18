/* @leny/bowlstats
 *
 * /src/core/utils.ts
 */

/* eslint-disable @typescript-eslint/no-unused-expressions */

import type {GameFrameBall} from "types";

export const getPinsCountFromOutcome = (
    outcome: [GameFrameBall, GameFrameBall?, GameFrameBall?],
    isLastFrame: boolean = false,
): number => {
    if (!isLastFrame) {
        if (outcome.includes("X") || outcome.includes("/")) {
            return 10;
        }
        return (outcome as Array<GameFrameBall>).reduce(
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

interface GenericEvent {
    preventDefault(): void;
    stopPropagation(): void;
}

export const preventDefault =
    (
        handler: (e: GenericEvent) => any,
        stopPropagation: boolean = false,
    ): ((e: GenericEvent) => void) =>
    (e: GenericEvent): void => {
        e.preventDefault();
        stopPropagation && e.stopPropagation();
        handler(e);
    };
