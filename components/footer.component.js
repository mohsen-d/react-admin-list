import React, { useContext } from "react";
import ListContext from "../context/list.context";
import Pagination from "./pagination.component";

export default function Footer({ pagination }) {
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
