/* @leny/bowlstats
 *
 * /src/components/filters.tsx
 */

import type {FC, ReactElement} from "react";
import type {Game, Nullable} from "types";

import ScoreGraph from "./score";
import StrikesGraph from "./strikes";
import SparesGraph from "./spares";
import AvgFirstBallPinfallGraph from "./avg-first-ball-pinfall";
import {useData} from "core/hooks/use-data";
import classnames from "classnames";
import {useMemo, useState} from "react";
import params from "../../../data/params.json";
import {preventDefault} from "core/utils";
import dayjs from "dayjs";
import {allYears} from "core/data-store";

type All = "All";

const currentYear: number = new Date().getFullYear();
const currentMonth: number = new Date().getMonth();

const NBSP: string = "\u00a0";

export type FiltersProps = {
    year: Nullable<number>;
    month: Nullable<number>;
    day: Nullable<number>;
    withHouseBallGames: boolean;
    withDryLaneGames: boolean;
    // ---
    onYearChange: (year: Nullable<number>) => void;
    onMonthChange: (month: Nullable<number>) => void;
    onDayChange: (day: Nullable<number>) => void;
    toggleHouseBallGames: (state: boolean) => void;
    toggleDryLaneGames: (state: boolean) => void;
};

const Filters: FC<FiltersProps> = ({
    year,
    month,
    day,
    withHouseBallGames,
    withDryLaneGames,
    onYearChange,
    onMonthChange,
    onDayChange,
    toggleHouseBallGames,
    toggleDryLaneGames,
}): ReactElement => {
    const {filters} = useData();

    const years = useMemo<Array<number | All>>(
        () => ["All", ...filters.lists.years.reverse()],
        [filters],
    );
    const months = useMemo<Array<number | All>>(() => {
        if (year === null) {
            return [];
        }

        return [
            "All",
            ...filters.lists.months,
        ];
    }, [year, filters]);

    const days = useMemo<Array<number | All>>(() => {
        if (year === null) {
            return [];
        }

        return [
            "All",
            ...filters.lists.days
        ];
    }, [year, filters]);

    console.log("months:", months)

    return (
        <div className={classnames("columns")}>
            <div className={classnames("column", "is-four-fifths")}>
                <div className={classnames("tabs", "is-large")}>
                    <ul>
                        {years.map((yr: number | string) => (
                            <li
                                key={yr}
                                className={classnames(
                                    ((year === null && yr === "All") ||
                                        year === yr) &&
                                        "is-active",
                                )}>
                                <a
                                    href={"#"}
                                    onClick={preventDefault(() => {
                                        onYearChange(
                                            yr === "All"
                                                ? null
                                                : (yr as number),
                                        );
                                        onMonthChange(null);
                                        onDayChange(null);
                                    })}>
                                    {yr}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                {year !== null && (
                    <div className={classnames("tabs")}>
                        <ul>
                            {months.map(i => (
                                <li
                                    key={i}
                                    className={classnames(
                                        ((i === "All" && month === null) ||
                                            ( i as number + 1 ) === month) &&
                                            "is-active",
                                    )}>
                                    <a
                                        className={classnames("px-3")}
                                        href={"#"}
                                        onClick={preventDefault(() => {
                                            onMonthChange(
                                                i === "All" ? null : i + 1,
                                            );
                                            onDayChange(null);
                                        })}>
                                        {i === "All"
                                            ? "All"
                                            : dayjs()
                                                  .set("month", i)
                                                  .format("MMM")}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {year !== null && month !== null && (
                    <div className={classnames("tabs", "is-small")}>
                        <ul>
                            {days.map(i => (
                                <li
                                    key={i}
                                    className={classnames(
                                        ((i === "All" && day === null) ||
                                            i === day) &&
                                            "is-active",
                                    )}>
                                    <a
                                        className={classnames("px-1")}
                                        href={"#"}
                                        onClick={preventDefault(() => {
                                            onDayChange(i === "All" ? null : i);
                                        })}>
                                        {i === "All"
                                            ? "All"
                                            : `${i}`.padStart(2, "0")}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <form>
                <div className={classnames("pt-4")}>
                    <div className={classnames("field", "mb-0", "is-flex", "is-flex-direction-row", "is-justify-content-flex-start", "is-align-items-center")}>
                        <input
                            type={"checkbox"}
                            id={"withHouseBallGames"}
                            name={"withHouseBallGames"}
                            className={classnames("switch", "is-small", "is-rounded")}
                            checked={withHouseBallGames}
                            onChange={() =>
                                toggleHouseBallGames(!withHouseBallGames)
                            }
                        />
                        {NBSP}
                        <label htmlFor={"withHouseBallGames"}>
                            {"Include House Ball Games"}
                        </label>
                    </div>
                    <div className={classnames("field", "mb-0", "is-flex", "is-flex-direction-row", "is-justify-content-flex-start", "is-align-items-center")}>
                        <input
                            type={"checkbox"}
                            id={"withDryLaneGames"}
                            name={"withDryLaneGames"}
                            className={classnames("switch", "is-small", "is-rounded")}
                            checked={withDryLaneGames}
                            onChange={() =>
                                toggleDryLaneGames(!withDryLaneGames)
                            }
                        />
                        {NBSP}
                        <label htmlFor={"withDryLaneGames"}>
                        {"Include Dry Lanes Games"}
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Filters;
