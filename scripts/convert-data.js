/* @leny/bowlstats
 *
 * /scripts/convert-data.js
 */

const bowling = require("bowling");
const {readFile, writeFile} = require("fs/promises");
const {parseAllDocuments} = require("yaml");

const firstBallValue = outcome => {
    if (typeof outcome === "number") {
        return outcome;
    }
    if (outcome === "X") {
        return 10;
    }
    return 0;
};

(async () => {
    const scores = await readFile(`${__dirname}/../data/scores.yaml`, "utf8");
    const results = [];

    parseAllDocuments(scores).forEach(doc => {
        const {date, games} = doc.toJS();
        const [year, month, day] = date.split("-").map(s => +s);

        results.push(
            ...games.map(({ball, frames, note}) => {
                const splits = [];
                const parsed = {
                    date: {
                        year,
                        month,
                        day,
                    },
                    ball,
                    frames: bowling(
                        frames
                            .split(",")
                            .map(frame => frame.trim())
                            .map((frame, index) => {
                                if (frame.startsWith("S")) {
                                    splits.push(index);
                                    return frame.substring(1);
                                }
                                return frame;
                            }),
                    ).map((frame, index) => {
                        const outcome = frame.outcome
                            .split("")
                            .map(s =>
                                ["F", "X", "/", "-"].includes(s) ? s : +s,
                            );

                        let split = false, pins=outcome.reduce((acc,oc)=>{
                            if(typeof oc === "number") {
                                return acc+oc;
                            }
                            if(oc === "X") {
                                return acc+10;
                            }
                            if(oc === "/") {
                                return acc+10-acc;
                            }
                            return acc;
                        },0);

                        if (splits.includes(index)) {
                            split = outcome[1] === "/" ? "converted" : "yes";
                        }

                        return {
                            ...frame,
                            outcome,
                            pins,
                            split,
                        };
                    }),
                };

                if (note) {
                    parsed.note = note;
                }

                parsed.score = parsed.frames[9].cumulative;
                parsed.pins = parsed.frames.reduce(
                    (acc, frame) => acc + frame.pins,0,
                );
                parsed.perfect = parsed.score === 300;

                parsed.stats = {
                    avgFirstBallPinfall: +(
                        parsed.frames.reduce(
                            (acc, frame) =>
                                acc + firstBallValue(frame.outcome[0]),
                            0,
                        ) / 10
                    ).toFixed(2),
                    splits: {
                        total: splits.length,
                        converted: parsed.frames.reduce(
                            (acc, frame) =>
                                acc + (frame.split === "converted" ? 1 : 0),
                            0,
                        ),
                    },
                    strikes: parsed.frames.reduce(
                        (acc, frame) =>
                            acc +
                            frame.outcome.reduce(
                                (ac, ball) => ac + (ball === "X" ? 1 : 0),
                                0,
                            ),
                        0,
                    ),
                    spares: parsed.frames.reduce(
                        (acc, frame) =>
                            acc +
                            frame.outcome.reduce(
                                (ac, ball) => ac + (ball === "/" ? 1 : 0),
                                0,
                            ),
                        0,
                    ),
                    misses: parsed.frames.reduce(
                        (acc, frame) =>
                            acc +
                            frame.outcome.reduce(
                                (ac, ball) => ac + (ball === "-" ? 1 : 0),
                                0,
                            ),
                        0,
                    ),
                    fouls: parsed.frames.reduce(
                        (acc, frame) =>
                            acc +
                            frame.outcome.reduce(
                                (ac, ball) => ac + (ball === "F" ? 1 : 0),
                                0,
                            ),
                        0,
                    ),
                };

                return parsed;
            }),
        );
    });

    await writeFile(
        `${__dirname}/../src/core/data.json`,
        JSON.stringify(results, null, 2),
        "utf8",
    );
})();
