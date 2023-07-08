/* @leny/bowlstats
 *
 * /src/types.ts
 */

export type Nullable<T> = T | null;

export type GenericObject<T = any> = Record<string | number | symbol, T>;

export type GameDate = {
    year: number;
    month: number;
    day: number;
};

export type LeagueDate = GameDate;

export type GameFrameBall = number | "-" | "X" | "/" | "F";

export type GameFrame = {
    cumulative: number;
    open: boolean;
    outcome: [GameFrameBall, GameFrameBall?, GameFrameBall?];
    score: number;
    spare: false | "single" | "multiple";
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
    id: string;
    date: GameDate;
    frames: Array<GameFrame>;
    ball: string;
    note?: string;
    score: number;
    pins: number;
    perfect: boolean;
    stats: GameStats;
    oilPattern?: string;
};

export type Stat = {
    value: number;
    best?: number;
};

export type ScoreAvg = {
    value: number;
    best: number;
    worst: number;
    stdDeviation: number;
    absDeviation: number;
};

export type Stats = {
    games: number;
    pins: number;
    avg: ScoreAvg;
    strikes: Stat;
    spares: Stat;
    avgFirstBallPinfall: Stat;
};

export type LeagueDay = {
    date: LeagueDate;
    bye: boolean;
    handicap: number;
    games: Array<Game>;
};

export type League = {
    name: string;
    days: Array<LeagueDay>;
};
