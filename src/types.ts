/* @leny/bowlstats
 *
 * /src/types.ts
 */

export type GameDate = {
    year: number;
    month: number;
    day: number;
};

export type GameFrameBall = number | "-" | "X" | "/" | "F";

export type GameFrame = {
    outcome: [GameFrameBall, GameFrameBall?, GameFrameBall?];
    cumulative: number;
    score: number;
};

export type GameStats = {
    fouls: number;
    misses: number;
    spares: number;
    strikes: number;
};

export type Game = {
    date: GameDate;
    frames: Array<GameFrame>;
    score: number;
    perfect: boolean;
    stats: GameStats;
};

export type Stats = {
    game: number;
    avg: number;
    year?:number;
}

export type GlobalStats = {
    total: Stats;
    year: Stats;
}
