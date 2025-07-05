import React, { useEffect, useState } from 'react';
import SectionTable from './SectionTable';

const ITEMS_PER_PAGE = 10;

function Estimate({ EyeIcon }) {
  const [data, setData] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageBySection, setPageBySection] = useState({});

  useEffect(() => {
    fetch('/Data.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setSections(json.data.sections || []);
        setLoading(false);
      });
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const handleItemChange = (sectionIdx, itemIdx, field, value) => {
    const updatedSections = sections.map((section, sIdx) => {
      if (sIdx !== sectionIdx) return section;
      const updatedItems = section.items.map((item, iIdx) => {
        if (iIdx !== itemIdx) return item;
        return {
          ...item,
          [field]: value,
        };
      });
      return { ...section, items: updatedItems };
    });
    setSections(updatedSections);
  };

  const getItemTotal = (item) => {
    const qty = Number(item.quantity) || 0;
    const unitCost = (Number(item.unit_cost) || 0) / 100;
    return qty * unitCost;
  };

  const getSectionTotal = (section) => {
    return (section.items || []).reduce((sum, item) => sum + getItemTotal(item), 0);
  };

  const getGrandTotal = () => {
    return sections.reduce((sum, section) => sum + getSectionTotal(section), 0);
  };

  const handlePageChange = (sectionIdx, newPage) => {
    setPageBySection(prev => ({ ...prev, [sectionIdx]: newPage }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="estimate-container">
      <div className="grand-total-row">
        <span className="grand-total-label">Grand Total:</span>
        <span className="grand-total-value">{formatCurrency(getGrandTotal())}</span>
        <EyeIcon />
      </div>
      {sections.map((section, sectionIdx) => {
        const items = section.items || [];
        const page = pageBySection[sectionIdx] || 1;
        const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
        const pagedItems = items.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE).map(item => ({
          ...item,
          itemTotalDisplay: formatCurrency(getItemTotal(item)),
        }));
        const sectionTotal = getSectionTotal(section);
        return (
          <SectionTable
            key={sectionIdx}
            section={{ ...section, sectionTotalDisplay: formatCurrency(sectionTotal) }}
            sectionIdx={sectionIdx}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            page={page}
            totalPages={totalPages}
            pagedItems={pagedItems}
            handleItemChange={handleItemChange}
            handlePageChange={handlePageChange}
            getItemTotal={getItemTotal}
            EyeIcon={EyeIcon}
          />
        );
      })}
    </div>
  );
}

export default Estimate; 