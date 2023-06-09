import React, { useContext } from "react";
import { ListContext } from "../context";

import { Pagination } from "./pagination.component";

export function Footer({ pagination }) {
  const context = useContext(ListContext);
  return (
    <tfoot>
      <tr>
        <td className="border-0" colSpan={context.loadingtdColSpan}>
          <Pagination {...pagination} />
        </td>
      </tr>
    </tfoot>
  );
}
