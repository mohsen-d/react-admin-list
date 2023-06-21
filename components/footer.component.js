import React, { useContext } from "react";
import { StaticsContext } from "../context";

import { Pagination } from "./pagination.component";

export function Footer({ children }) {
  console.log("rendered Footer");

  const { loadingtdColSpan } = useContext(StaticsContext);
  return (
    <tfoot>
      <tr>
        <td className="border-0" colSpan={loadingtdColSpan}>
          {children}
        </td>
      </tr>
    </tfoot>
  );
}
