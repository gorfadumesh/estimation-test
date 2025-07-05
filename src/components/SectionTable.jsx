import React from 'react';

const SectionTable = ({
  section,
  sectionIdx,
  ITEMS_PER_PAGE,
  page,
  totalPages,
  pagedItems,
  handleItemChange,
  handlePageChange,
  getItemTotal,
  EyeIcon
}) => {
  return (
    <div className="section-block">
      <hr className="section-divider" />
      <div className="section-header-row">
        <span className="section-toggle">—</span>
        <span className="section-title">{section.section_name}</span>
        <span className="section-total">{section.sectionTotalDisplay}</span>
        <EyeIcon />
      </div>
      <div className="table-scroll-container">
        <table className="estimate-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Item Name</th>
              <th>QTY</th>
              <th>Unit Cost</th>
              <th>Unit</th>
              <th>Total</th>
              <th>Tax</th>
              <th>Cost Code</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pagedItems.map((item, itemIdx) => (
              <tr key={itemIdx} className={itemIdx % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td>{item.item_type_display_name}</td>
                <td>{item.subject}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={e => handleItemChange(sectionIdx, (page - 1) * ITEMS_PER_PAGE + itemIdx, 'quantity', e.target.value)}
                    className="qty-input"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={Number(item.unit_cost) / 100}
                    onChange={e => handleItemChange(sectionIdx, (page - 1) * ITEMS_PER_PAGE + itemIdx, 'unit_cost', Math.round(Number(e.target.value) * 100))}
                    className="unit-cost-input"
                  />
                </td>
                <td>{item.unit}</td>
                <td>{item.itemTotalDisplay}</td>
                <td>{item.apply_global_tax === '1' ? '✔️' : ''}</td>
                <td>{item.cost_code_name || item.cost_code}</td>
                <td><EyeIcon /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(sectionIdx, Math.max(1, page - 1))} disabled={page === 1}>&lt;</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={page === i + 1 ? 'active' : ''}
              onClick={() => handlePageChange(sectionIdx, i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(sectionIdx, Math.min(totalPages, page + 1))} disabled={page === totalPages}>&gt;</button>
        </div>
      )}
    </div>
  );
};

export default SectionTable; 