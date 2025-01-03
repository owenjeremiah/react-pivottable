import React, {useState} from "react";
import Draggable from "react-draggable";

/* eslint-disable react/prop-types */
export function DraggableAttribute({
  attrValues,
  menuLimit,
  name,
  sorter,
  zIndex,

  // Filters
  addValuesToFilter,
  moveFilterBoxToTop,
  removeValuesFromFilter,
  setValuesInFilter,
  valueFilter = {},
}) {
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  function toggleValue(value) {
    if (value in valueFilter) {
      removeValuesFromFilter(name, [value]);
    } else {
      addValuesToFilter(name, [value]);
    }
  }

  function matchesFilter(x) {
    return x.toLowerCase().trim().includes(filterText.toLowerCase().trim());
  }

  function selectOnly(e, value) {
    e.stopPropagation();
    setValuesInFilter(
      name,
      Object.keys(attrValues).filter((y) => y !== value)
    );
  }

  function getFilterBox() {
    const showMenu = Object.keys(attrValues).length < menuLimit;

    const values = Object.keys(attrValues);
    const shown = values.filter(matchesFilter).sort(sorter);

    return (
      <Draggable handle=".pvtDragHandle">
        <div
          className="pvtFilterBox"
          style={{
            display: "block",
            cursor: "initial",
            zIndex,
          }}
          onClick={() => moveFilterBoxToTop(name)}
        >
          <a onClick={() => setOpen(false)} className="pvtCloseX">
            ×
          </a>
          <span className="pvtDragHandle">☰</span>
          <h4>{name}</h4>

          {showMenu || <p>(too many values to show)</p>}

          {showMenu && (
            <p>
              <input
                type="text"
                placeholder="Filter values"
                className="pvtSearch"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <br />
              <a
                role="button"
                className="pvtButton"
                onClick={() =>
                  removeValuesFromFilter(
                    name,
                    Object.keys(attrValues).filter(matchesFilter)
                  )
                }
              >
                Select {values.length === shown.length ? "All" : shown.length}
              </a>
              &nbsp;
              <a
                role="button"
                className="pvtButton"
                onClick={() =>
                  addValuesToFilter(
                    name,
                    Object.keys(attrValues).filter(matchesFilter)
                  )
                }
              >
                Deselect {values.length === shown.length ? "All" : shown.length}
              </a>
            </p>
          )}

          {showMenu && (
            <div className="pvtCheckContainer">
              {shown.map((x) => (
                <p
                  key={x}
                  onClick={() => toggleValue(x)}
                  className={x in valueFilter ? "" : "selected"}
                >
                  <a className="pvtOnly" onClick={(e) => selectOnly(e, x)}>
                    only
                  </a>
                  <a className="pvtOnlySpacer">&nbsp;</a>

                  {x === "" ? <em>null</em> : x}
                </p>
              ))}
            </div>
          )}
        </div>
      </Draggable>
    );
  }

  function toggleFilterBox() {
    setOpen(!open);
    moveFilterBoxToTop(name);
  }

  const filtered =
    Object.keys(valueFilter).length !== 0 ? "pvtFilteredAttribute" : "";

  return (
    <li data-id={name}>
      <span className={"pvtAttr " + filtered}>
        {name}
        <span className="pvtTriangle" onClick={toggleFilterBox}>
          &nbsp;▾
        </span>
      </span>

      {open ? getFilterBox() : null}
    </li>
  );
}

export default DraggableAttribute;
