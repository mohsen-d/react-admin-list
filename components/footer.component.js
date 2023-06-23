import React, { useContext } from "react";
import { StaticsContext } from "../context";

export function Footer({ children }) {
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
