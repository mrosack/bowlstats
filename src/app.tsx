/* @leny/bowlstats
 *
 * /src/app.tsx
 */

import "bulma";
import "bulma-switch";
import "bulma-tooltip";
import "./styles.scss";

import {createRoot} from "react-dom/client";
import Root from "containers/root";

const container: HTMLElement = document.querySelector("#root")!;

createRoot(container).render(<Root />);
