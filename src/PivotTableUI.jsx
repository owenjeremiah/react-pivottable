import React, {useEffect, useState} from "react";
// import Draggable from "react-draggable";
import {ReactSortable} from "react-sortablejs";
// import PropTypes from "prop-types";
// import update from "immutability-helper";

import {DraggableAttribute} from "./DraggableAttribute";
import {Dropdown} from "./Dropdown";
import {PivotData, sortAs, getSort, aggregators} from "./Utilities";
import PivotTable from "./PivotTable";
import TableRenderers from "./TableRenderers";

/* eslint-disable react/prop-types */
// eslint can't see inherited propTypes!

// export const PivotTableUI = React.memo(function PivotTableUI({
export function PivotTableUI({
  // Self props
  onChange,
  hiddenAttributes = [],
  hiddenFromAggregators = [],
  hiddenFromDragDrop = [],
  unusedOrientationCutoff = 85,
  menuLimit = 500,

  // PivotTable props
  // rendererName,
  // renderers,

  // PivotData props
  data,
  ...pivotState
}) {
  const [attrValues, setAttrValues] = useState({});
  const [localData, setLocalData] = useState([]);
  const [materializedInput, setMaterializedInput] = useState([]);
  const [maxZIndex, setMaxZIndex] = useState(1000);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [unusedOrder, setUnusedOrder] = useState([]);
  const [zIndices, setZIndices] = useState({});

  // Default props
  pivotState = {
    // Default PivotData props
    aggregators,
    cols: [],
    rows: [],
    vals: [],
    aggregatorName: "Count",
    sorters: {},
    valueFilter: {},
    rowOrder: "key_a_to_z",
    colOrder: "key_a_to_z",
    derivedAttributes: {},

    // Default PivotTable props
    rendererName: "Table",
    renderers: TableRenderers,

    ...pivotState,
  };

  useEffect(() => {
    materializeInput(data);
  }, [data]);

  function materializeInput(nextData) {
    if (localData === nextData) {
      return;
    }

    let attrValues = {};
    let materializedInput = [];
    let recordsProcessed = 0;

    PivotData.forEachRecord(
      nextData,
      pivotState.derivedAttributes,
      function (record) {
        materializedInput.push(record);
        for (const attr of Object.keys(record)) {
          if (!(attr in attrValues)) {
            attrValues[attr] = {};
            if (recordsProcessed > 0) {
              attrValues[attr].null = recordsProcessed;
            }
          }
        }
        for (const attr in attrValues) {
          const value = attr in record ? record[attr] : "null";
          if (!(value in attrValues[attr])) {
            attrValues[attr][value] = 0;
          }
          attrValues[attr][value]++;
        }
        recordsProcessed++;
      }
    );

    console.log("attrValues", attrValues);
    console.log("materializedInput", materializedInput);

    // Update states
    setLocalData(nextData);
    setAttrValues(attrValues);
    setMaterializedInput(materializedInput);
  }

  // function sendPropUpdate(command) {
  //   onChange(update(this.props, command));
  // }

  function propUpdater(key) {
    // return (value) => this.sendPropUpdate({[key]: {$set: value}});
    return (value) => onChange({...pivotState, [key]: value});
  }

  function setValuesInFilter(attribute, values) {
    let {valueFilter} = pivotState;
    valueFilter[attribute] = values.reduce((r, v) => {
      r[v] = true;
      return r;
    }, {});
    onChange({...pivotState, valueFilter});
    // this.sendPropUpdate({
    //   valueFilter: {
    //     [attribute]: {
    //       $set: values.reduce((r, v) => {
    //         r[v] = true;
    //         return r;
    //       }, {}),
    //     },
    //   },
    // });
  }

  function addValuesToFilter(attribute, values) {
    let {valueFilter} = pivotState;
    if (attribute in pivotState.valueFilter) {
      valueFilter[attribute] = values.reduce((r, v) => {
        r[v] = true;
        return r;
      }, valueFilter[attribute]);
      onChange({...pivotState, valueFilter});
      // this.sendPropUpdate({
      //   valueFilter: {
      //     [attribute]: values.reduce((r, v) => {
      //       r[v] = {$set: true};
      //       return r;
      //     }, {}),
      //   },
      // });
    } else {
      setValuesInFilter(attribute, values);
    }
  }

  function removeValuesFromFilter(attribute, values) {
    let {valueFilter} = pivotState;
    for (let v of values) {
      delete valueFilter[attribute][v];
    }
    onChange({...pivotState, valueFilter});
    // this.sendPropUpdate({
    //   valueFilter: {[attribute]: {$unset: values}},
    // });
  }

  function moveFilterBoxToTop(attribute) {
    let zIndex = maxZIndex + 1;
    setMaxZIndex(zIndex);
    setZIndices({[attribute]: zIndex});
    // this.setState(
    //   update(this.state, {
    //     maxZIndex: {$set: this.state.maxZIndex + 1},
    //     zIndices: {[attribute]: {$set: this.state.maxZIndex + 1}},
    //   })
    // );
  }

  function isOpen(dropdown) {
    // return this.state.openDropdown === dropdown;
    return openDropdown === dropdown;
  }

  function makeDnDCell(items, list, setList, classes) {
    return (
      <ReactSortable
        list={list}
        setList={setList}
        // Sortable
        group="shared"
        ghostClass="pvtPlaceholder"
        filter=".pvtFilterBox"
        preventOnFilter={false}
        tag="td"
        className={classes}
      >
        {items?.map((x) => (
          <DraggableAttribute
            name={x}
            key={x}
            attrValues={attrValues[x]}
            valueFilter={pivotState?.valueFilter[x] || {}}
            sorter={getSort(pivotState?.sorters, x)}
            menuLimit={menuLimit}
            setValuesInFilter={setValuesInFilter}
            addValuesToFilter={addValuesToFilter}
            moveFilterBoxToTop={moveFilterBoxToTop}
            removeValuesFromFilter={removeValuesFromFilter}
            zIndex={zIndices[x] || maxZIndex}
          />
        ))}
      </ReactSortable>
    );
  }

  const numValsAllowed =
    pivotState.aggregators[pivotState.aggregatorName]([])().numInputs || 0;

  const aggregatorCellOutlet = pivotState.aggregators[
    pivotState.aggregatorName
  ]([])().outlet;

  let {rendererName, renderers} = pivotState;
  if (!(rendererName in renderers)) rendererName = Object.keys(renderers)[0];

  const RendererCell = () => (
    <td className="pvtRenderers">
      <Dropdown
        current={rendererName}
        values={Object.keys(renderers)}
        open={isOpen("renderer")}
        zIndex={isOpen("renderer") ? maxZIndex + 1 : 1}
        toggle={() => setOpenDropdown(isOpen("renderer") ? false : "renderer")}
        setValue={propUpdater("rendererName")}
      />
    </td>
  );

  const sortIcons = {
    key_a_to_z: {
      rowSymbol: "↕",
      colSymbol: "↔",
      next: "value_a_to_z",
    },
    value_a_to_z: {
      rowSymbol: "↓",
      colSymbol: "→",
      next: "value_z_to_a",
    },
    value_z_to_a: {rowSymbol: "↑", colSymbol: "←", next: "key_a_to_z"},
  };

  const AggregatorCell = () => (
    <td className="pvtVals">
      <Dropdown
        current={pivotState.aggregatorName}
        values={Object.keys(pivotState.aggregators)}
        open={isOpen("aggregators")}
        zIndex={isOpen("aggregators") ? maxZIndex + 1 : 1}
        toggle={() =>
          setOpenDropdown(isOpen("aggregators") ? false : "aggregators")
        }
        setValue={propUpdater("aggregatorName")}
      />
      <a
        role="button"
        className="pvtRowOrder"
        onClick={() =>
          propUpdater("rowOrder")(sortIcons[pivotState.rowOrder].next)
        }
      >
        {sortIcons[pivotState.rowOrder].rowSymbol}
      </a>
      <a
        role="button"
        className="pvtColOrder"
        onClick={() =>
          propUpdater("colOrder")(sortIcons[pivotState.colOrder].next)
        }
      >
        {sortIcons[pivotState.colOrder].colSymbol}
      </a>
      {numValsAllowed > 0 && <br />}
      {new Array(numValsAllowed).fill().map((n, i) => [
        <Dropdown
          key={i}
          current={pivotState.vals[i]}
          values={Object.keys(attrValues).filter(
            (e) =>
              !hiddenAttributes.includes(e) &&
              !hiddenFromAggregators.includes(e)
          )}
          open={isOpen(`val${i}`)}
          zIndex={isOpen(`val${i}`) ? maxZIndex + 1 : 1}
          toggle={() => setOpenDropdown(isOpen(`val${i}`) ? false : `val${i}`)}
          setValue={(value) => {
            let vals = pivotState.vals;
            vals.splice(i, 1, value);
            onChange({...pivotState, vals});
          }}
        />,
        i + 1 !== numValsAllowed ? <br key={`br${i}`} /> : null,
      ])}
      {aggregatorCellOutlet && aggregatorCellOutlet(data)}
    </td>
  );

  const unusedAttrs = Object.keys(attrValues)
    .filter(
      (e) =>
        !pivotState.rows.includes(e) &&
        !pivotState.cols.includes(e) &&
        !hiddenAttributes.includes(e) &&
        !hiddenFromDragDrop.includes(e)
    )
    .sort(sortAs(unusedOrder));
  const unusedLength = unusedAttrs.reduce((r, e) => r + e.length, 0);
  const horizUnused = unusedLength < unusedOrientationCutoff;
  const UnusedAttrsCell = () =>
    makeDnDCell(
      unusedAttrs,
      unusedOrder,
      setUnusedOrder,
      `pvtAxisContainer pvtUnused ${horizUnused ? "pvtHorizList" : "pvtVertList"}`
    );

  const colAttrs = pivotState.cols.filter(
    (e) => !hiddenAttributes.includes(e) && !hiddenFromDragDrop.includes(e)
  );
  const ColAttrsCell = () =>
    makeDnDCell(
      colAttrs,
      pivotState.cols,
      propUpdater("cols"),
      "pvtAxisContainer pvtHorizList pvtCols"
    );

  const rowAttrs = pivotState.rows.filter(
    (e) => !hiddenAttributes.includes(e) && !hiddenFromDragDrop.includes(e)
  );
  const RowAttrsCell = () =>
    makeDnDCell(
      rowAttrs,
      pivotState.rows,
      propUpdater("rows"),
      "pvtAxisContainer pvtVertList pvtRows"
    );

  const OutputCell = () => (
    <td className="pvtOutput">
      <PivotTable
        data={materializedInput}
        derivedAttributes={pivotState.derivedAttributes}
        {...pivotState}
        // {...update(this.props, {
        //   data: {$set: this.state.materializedInput},
        // })}
      />
    </td>
  );

  return horizUnused ? (
    <table className="pvtUi">
      <tbody onClick={() => setOpenDropdown(false)}>
        <tr>
          <RendererCell />
          <UnusedAttrsCell />
        </tr>
        <tr>
          <AggregatorCell />
          <ColAttrsCell />
        </tr>
        <tr>
          <RowAttrsCell />
          <OutputCell />
        </tr>
      </tbody>
    </table>
  ) : (
    <table className="pvtUi">
      <tbody onClick={() => setOpenDropdown(false)}>
        <tr>
          <RendererCell />
          <AggregatorCell />
          <ColAttrsCell />
        </tr>
        <tr>
          <UnusedAttrsCell />
          <RowAttrsCell />
          <OutputCell />
        </tr>
      </tbody>
    </table>
  );
}
// });

export default PivotTableUI;
