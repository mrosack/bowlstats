/* @leny/bowlstats
 *
 * /scripts/convert-data.js
 */

const bowling = require("bowling");
const {readFile, writeFile} = require("fs/promises");

(async () => {
    const scores = await readFile(`${__dirname}/../data/scores.json`, "utf8");
    const results = [];

    Object.entries(JSON.parse(scores)).forEach(([date, games]) => {
        const [year, month, day] = date.split("-").map(s => +s);

        results.push(
            ...games.map(([ball, game]) => {
                const parsed = {
                    date: {
                        year,
                        month,
                        day,
                    },
                    ball,
                    frames: bowling(game).map(frame => ({
                        ...frame,
                        outcome: frame.outcome
                            .split("")
                            .map(s =>
                                ["F", "X", "/", "-"].includes(s) ? s : +s,
                            ),
                    })),
                };

                parsed.score = parsed.frames[9].cumulative;
                parsed.perfect = !!parsed.score === 300;

                parsed.stats = {
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
