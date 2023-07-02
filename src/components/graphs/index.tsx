/* @leny/bowlstats
 *
 * /src/components/graphs/index.tsx
 */

import type {FC, ReactElement} from "react";

import ScoreGraph from "./score";
import StrikesGraph from "./strikes";
import SparesGraph from "./spares";
import AvgFirstBallPinfallGraph from "./avg-first-ball-pinfall";
import {useData} from "core/hooks/use-data";
import classnames from "classnames";
import {useState} from "react";
import params from "../../../data/params.json";
import {preventDefault} from "core/utils";

const NBSP: string = "\u00a0";

const Graphs: FC = (): ReactElement => {
    const {games} = useData();

    return (
        <>
            <ScoreGraph
                games={games}
                hideBall
                goal={params.goals.avgScorePerGame}
            />
            <AvgFirstBallPinfallGraph
                games={games}
                hideBall
                goal={params.goals.avgFirstBallPinfall}
            />
            <StrikesGraph games={games} hideBall />
            <SparesGraph games={games} hideBall />
        </>
    );
};

export default Graphs;
