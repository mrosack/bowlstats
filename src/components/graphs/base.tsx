/* @leny/bowlstats
 *
 * /src/components/graphs/base.tsx
 */

import type {FC, ReactElement} from "react";

import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Bar,
    LabelList,
    ReferenceLine,
} from "recharts";

export type BaseGraphProps = {
    data: Array<Record<string, number | string>>;
    axisId: string;
    axisLabel: string;
    domain: [number, number];
    padding?: Record<string, number>;
    referenceLine?: number | false;
    hideBall?: boolean;
};

const BaseGraph: FC<BaseGraphProps> = ({
    data,
    axisId,
    axisLabel,
    domain,
    padding,
    referenceLine,
    hideBall = false,
}: BaseGraphProps): ReactElement => (
    <ResponsiveContainer width={"100%"} height={350}>
        <ComposedChart
            width={500}
            height={500}
            data={data}
            margin={{
                top: 10,
                right: 5,
                left: 0,
                bottom: 5,
            }}>
            <CartesianGrid strokeDasharray={"2 2"} />
            <Legend />
            <XAxis dataKey={"name"} padding={{left: 20, right: 20}} />
            <YAxis
                yAxisId={axisId}
                domain={domain}
                orientation={"left"}
                padding={padding}
            />
            {referenceLine && (
                <ReferenceLine
                    yAxisId={axisId}
                    y={referenceLine}
                    stroke={"#257942"}
                />
            )}
            {!hideBall && (
                <>
                    <YAxis
                        yAxisId={"ball"}
                        domain={[6, 16]}
                        orientation={"right"}
                        tickCount={6}
                    />
                    <Bar
                        name={"Ball Weight"}
                        dataKey={"ball"}
                        yAxisId={"ball"}
                        barSize={20}
                        fill={"#33993366"}>
                        <LabelList dataKey={"ball"} position={"insideBottom"} />
                    </Bar>
                </>
            )}
            <Line
                name={"Average"}
                type={"monotone"}
                dataKey={"avg"}
                yAxisId={axisId}
                stroke={"#ff3860"}
                dot={false}
            />
            <Line
                name={axisLabel}
                type={"monotone"}
                dataKey={axisId}
                yAxisId={axisId}
                stroke={"#209cee"}
            />
        </ComposedChart>
    </ResponsiveContainer>
);

export default BaseGraph;
