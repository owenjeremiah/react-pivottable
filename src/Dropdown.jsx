import React from "react";

/* eslint-disable react/prop-types */
// eslint can't see inherited propTypes!

export const Dropdown = React.memo(function Dropdown({
  current,
  open,
  setValue,
  toggle,
  values,
  zIndex,
}) {
  return (
    <div className="pvtDropdown" style={{zIndex}}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        className={
          "pvtDropdownValue pvtDropdownCurrent " +
          (open ? "pvtDropdownCurrentOpen" : "")
        }
        role="button"
      >
        <div className="pvtDropdownIcon">{open ? "×" : "▾"}</div>
        {current || <span>&nbsp;</span>}
      </div>

      {open && (
        <div className="pvtDropdownMenu">
          {values.map((r) => (
            <div
              key={r}
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                if (current === r) {
                  toggle();
                } else {
                  setValue(r);
                }
              }}
              className={
                "pvtDropdownValue " +
                (r === current ? "pvtDropdownActiveValue" : "")
              }
            >
              {r}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default Dropdown;
