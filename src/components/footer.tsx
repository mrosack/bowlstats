/* @leny/bowlstats
 *
 * /src/components/footer.tsx
 */

import type {FC, ReactElement} from "react";

import classnames from "classnames";

const BSP: string = "\u0020";

const Footer: FC = (): ReactElement => (
    <footer className={classnames("footer", "mt-6", "pb-6")}>
        <div className={classnames("content", "has-text-centered")}>
            <p>
                <a href={"https://github.com/leny/bowlstats"} target={"_new"}>
                    <strong>{"bowlstats"}</strong>
                </a>
                {BSP}
                {"by"}
                {BSP}
                <a href={"https://leny.me"} target={"_new"}>
                    {"leny"}
                </a>
            </p>
        </div>
    </footer>
);

export default Footer;
