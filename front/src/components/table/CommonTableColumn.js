import React from 'react';

const CommonTableColumn = ({ children, className = '' }) => {
  return (
    <td className={`common-table-column ${className}`}>
      {children}
    </td>
  );
}

export default CommonTableColumn;