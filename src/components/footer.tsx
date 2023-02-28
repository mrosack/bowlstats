/* @leny/bowlstats
 *
 * /src/components/footer.tsx
 */

import type {FC, ReactElement} from "react";

import classnames from "classnames";

const BSP: string = "\u0020";

const Footer: FC = (): ReactElement => (
    <footer className={classnames("footer")}>
        <div className={classnames("content", "has-text-centered")}>
            <p>
                <a href={"https://github.com/leny/bowlstats"} target={"_new"}>
                    <strong>{"@leny/bowlstats"}</strong>
                </a>
                {BSP}
                {"by"}
                {BSP}
                <a href={"https://leny.me"} target={"_new"}>
                    {"leny"}
                </a>
            </p>
            <p>
                <small>
                    {"Started in"}
                    {BSP}
                    <em>{"january 2023"}</em>
                </small>
            </p>
        </div>
    </footer>
);

export default Footer;
