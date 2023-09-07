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
    const leaguesHash = {};
    const results = {
        games: [],
        leagues: [],
    };

    parseAllDocuments(scores).forEach(doc => {
        const {
            date,
            games: rawGames,
            leagues: rawLeagues = [],
            ball: baseBall,
            oilPattern: baseOilPattern,
            note: baseNote,
        } = doc.toJS();
        const [year, month, day] = date.split("-").map(s => +s);

        const games = rawGames.map(
            (
                {
                    ball = baseBall,
                    oilPattern = baseOilPattern,
                    frames,
                    note = baseNote,
                },
                idx,
            ) => {
                const splits = [];
                const parsed = {
                    id: `${date}:${idx + 1}`,
                    date: {
                        year,
                        month,
                        day,
                    },
                    ball: String(ball),
                    oilPattern: oilPattern || false,
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

                        let split = false,
                            pins = outcome.reduce((acc, oc) => {
                                if (typeof oc === "number") {
                                    return acc + oc;
                                }
                                if (oc === "X") {
                                    return acc + 10;
                                }
                                if (oc === "/") {
                                    return acc + 10 - acc;
                                }
                                return acc;
                            }, 0),
                            spare = outcome.reduce((v, oc, i, arr) => {
                                if (oc === "/" && i > 0) {
                                    return arr[i - 1] === 9
                                        ? "single"
                                        : "multiple";
                                }
                                return v;
                            }, false);

                        if (splits.includes(index)) {
                            split = outcome[1] === "/" ? "converted" : "yes";
                        }

                        return {
                            ...frame,
                            outcome,
                            pins,
                            split,
                            spare,
                            open: pins < 10,
                        };
                    }),
                };

                if (note) {
                    parsed.note = note;
                }

                parsed.score = parsed.frames[9].cumulative;
                parsed.pins = parsed.frames.reduce(
                    (acc, frame) => acc + frame.pins,
                    0,
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
                    spares: {
                        total: parsed.frames.reduce(
                            (acc, frame) => acc + (frame.spare ? 1 : 0),
                            0,
                        ),
                        single: parsed.frames.reduce(
                            (acc, frame) =>
                                acc + (frame.spare === "single" ? 1 : 0),
                            0,
                        ),
                        multiple: parsed.frames.reduce(
                            (acc, frame) =>
                                acc + (frame.spare === "multiple" ? 1 : 0),
                            0,
                        ),
                    },
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
            },
        );

        results.games.push(...games);

        rawLeagues.forEach(
            ({
                name,
                day: leagueDay,
                bye = false,
                team,
                vs,
                avg,
                handicap,
                games: gamesIndexes,
                note,
            }) => {
                const league = leaguesHash[name] || {
                    name,
                    days: [],
                };

                league.days.push({
                    dayIndex: leagueDay,
                    date: {
                        year,
                        month,
                        day,
                    },
                    bye,
                    team,
                    vs,
                    avg,
                    handicap,
                    note,
                    games: bye
                        ? []
                        : gamesIndexes.split(",").map(idx => {
                              const game = games[+idx - 1];
                              return {
                                  ...game,
                                  handicap,
                                  scratch: game.score,
                                  score: game.score + handicap,
                              };
                          }),
                });

                leaguesHash[name] = league;
            },
        );
    });

    results.leagues = Object.values(leaguesHash).reverse();

    await writeFile(
        `${__dirname}/../src/core/data.json`,
        JSON.stringify(results, null, 2),
        "utf8",
    );
})();
