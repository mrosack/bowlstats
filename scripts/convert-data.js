/* @leny/bowlstats
 *
 * /scripts/convert-data.js
 */

const bowling = require("bowling");
const {readFile, writeFile} = require("fs/promises");

(async () => {
    const scores = await readFile(`${__dirname}/../data/scores.json`, "utf8");
    const results = {};

    Object.entries(JSON.parse(scores)).forEach(([date, games]) => {
        const [year, month, day] = date.split("-").map(s => +s);
        if (!results[year]) {
            results[year] = {};
        }
        if (!results[year][month]) {
            results[year][month] = {};
        }
        if (!results[year][month][day]) {
            results[year][month][day] = [];
        }

        results[year][month][day] = games.map(game =>
            bowling(game).map(frame => ({
                ...frame,
                outcome: frame.outcome.split(""),
            })),
        );
    });

    await writeFile(
        `${__dirname}/../src/core/data.json`,
        JSON.stringify(results, null, 2),
        "utf8",
    );
})();
