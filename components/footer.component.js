import React, { useContext } from "react";
import { StaticsContext } from "../context";

import { Pagination } from "./pagination.component";

export function Footer({ pagination }) {
  const { loadingtdColSpan } = useContext(StaticsContext);
  return (
    <tfoot>
      <tr>
        <td className="border-0" colSpan={loadingtdColSpan}>
          <Pagination {...pagination} />
        </td>
      </tr>
    </tfoot>
  );
}
