/* @leny/bowlstats
 *
 * /src/components/game.tsx
 */

import type {FC, ReactElement} from "react";
import type {Game, GameFrame} from "types";

import {useMemo} from "react";
import classnames from "classnames";
import {useData} from "../core/hooks/use-data";

const ballStyles:Record<string, string|number>={
    marginTop:-1,
    marginRight:-1,
    marginLeft: "auto",
}

export interface GameProps {
    game: Game;
}

const Game: FC<GameProps> = ({game}: GameProps): ReactElement => {
    return (
        <div className={classnames("box")}>
            <h4 className={classnames("is-block", "is-size-6", "mb-2")}>
                {new Date(
                    game.date.year,
                    game.date.month - 1,
                    game.date.day,
                ).toLocaleDateString()}
            </h4>
            <table
                className={classnames("table", "is-bordered", "is-fullwidth")}>
                <thead>
                    <tr>
                        {Array.from(new Array(10).keys()).map(i => (
                            <th
                                key={i}
                                className={classnames("has-text-centered","has-text-grey-light","py-1")}>
                                <small>{i + 1}</small>
                            </th>
                        ))}
                        <td>{""}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {game.frames.map((frame: GameFrame, index: number) => (
                            <td key={index} className={classnames("p-0","pb-1")}>
                            <div className={classnames("has-text-right","mb-2")}><table style={ballStyles} className={classnames("table","is-bordered")}>
                            <tr>
                            {frame.outcome.map((outcome:string,index:number)=>(
                                <td key={index} className={classnames(
                                    "is-family-monospace",
                                    "is-size-7",
                                    "p-1",
                                    outcome==="X"&&"has-text-success",
                                    outcome==="/"&&"has-text-info",
                                    outcome==="F"&&"has-text-danger",
                                    outcome==="-"&&"has-text-danger",
                                )}>{outcome}</td>
                            ))}
                            </tr>
                            </table></div>
                                <span
                                    className={classnames(
                                        "has-text-centered",
                                        "is-block",
                                        "has-text-grey",
                                    )}>
                                    {frame.cumulative}
                                </span>
                            </td>
                        ))}
                        <td
                            className={classnames(
                                "is-vcentered",
                                "is-size-5",
                                "has-text-centered",
                                "has-text-weight-medium",
                            )}>
                            {game.score}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Game;
