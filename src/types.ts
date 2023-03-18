/* @leny/bowlstats
 *
 * /src/types.ts
 */

export type Nullable<T> = T | null;

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
    split: false | "yes" | "converted";
};

export type GameSplitStats = {total: number; converted: number};

export type GameStats = {
    fouls: number;
    misses: number;
    spares: number;
    strikes: number;
    splits: GameSplitStats;
    avgFirstBallPinfall: number;
};

export type Game = {
    date: GameDate;
    frames: Array<GameFrame>;
    ball: string;
    note?: string;
    score: number;
    perfect: boolean;
    stats: GameStats;
};

export type Stat = {
    value: number;
    best: number;
};

export type Stats = {
    games: number;
    avg: Stat;
    strikes: Stat;
    spares: Stat;
    avgFirstBallPinfall: Stat;
    year?: number;
    best?: number;
};

export type GlobalStats = {
    total: Stats;
    year: Stats;
};
