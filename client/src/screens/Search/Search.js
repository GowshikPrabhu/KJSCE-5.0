import React, { useState, useContext } from "react";
import { Column, Row } from "simple-flexbox";
import { createUseStyles } from "react-jss";
import DataTable from "react-data-table-component";
import { getVesselsListInARegion } from "actions/vesselActions";
import { Context } from "context/Context";
import { useVesselsTableSearch } from "hooks/useTableSearch";
import { Redirect } from "react-router-dom";
import { addToFav } from "actions/userActions";

const useStyles = createUseStyles((theme) => ({
  container: {
    backgroundColor: "#FFFFFF",
    border: `1px solid ${theme.color.lightGrayishBlue2}`,
    borderRadius: 4,
    cursor: "pointer",
    marginRight: 10,
    marginBottom: 10,
  },
  searchInput: {
    width: "100%",
    border: "none",
    outline: "none",
    padding: 10,
    caretColor: "#2980b9",
    color: "#2980b9",
    marginLeft: 10,
  },
  searchButton: {
    backgroundColor: "#2980b9",
    color: "#fff",
    fontSize: 15,
    cursor: "pointer",
    border: "none",
    outline: "none",
  },
  filterContainer: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    border: `1px solid ${theme.color.lightGrayishBlue2}`,
    borderRadius: 4,
    cursor: "pointer",
    marginRight: 10,
    marginBottom: 10,
    fontSize: 15,
    alignSelf: "flex-start",
  },
  filterInput: {
    fontSize: 13,
    marginTop: 6,
    paddingLeft: 5,
    outline: "none",
    border: `1px solid #7f8c8d`,
  },
}));

const Search = () => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [filterSearchValue, setFilterSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [state, dispatch] = useContext(Context);
  const [selectedRows, setSelectedRows] = useState([]);
  const { filteredData } = useVesselsTableSearch({
    filterSearchValue,
    data,
  });

  //   Update the state
  const handleChange = (e) => {
    setSearchValue(e.target.value.trim());
  };

  // Handle Double Click
  const handleDoubleClick = (vessel) => {
    window.open(`/track/${vessel.mmsi}/${vessel.lat}/${vessel.lon}`, "_blank");
  };

  //   Send request to the server and store the result in the state
  const handleSubmit = async () => {
    dispatch({ type: "SET_LOADER", payload: true });
    try {
      // Make request and filter the ships that has type === "Tanker"
      const getVesselsList = await getVesselsListInARegion(searchValue);
      setData(
        getVesselsList.filter((row) => {
          return row.type === "Tanker";
        })
      );
      dispatch({ type: "SET_LOADER", payload: false });
    } catch (err) {}
    dispatch({ type: "SET_LOADER", payload: false });
  };

  const handleSelect = (row) => {
    setSelectedRows(row.selectedRows);
  };

  const addFav = async () => {
    try {
      const query = await addToFav({ ships: selectedRows });
      if (query.success) {
        alert("Added...!");
      }
    } catch (err) {
      alert("Failed");
    }
  };
  return (
    <div>
      <Row flexGrow={1} breakpoints={{ 1024: "column" }}>
        <Column
          wrap
          flexGrow={7}
          flexBasis="735px"
          breakpoints={{
            1024: { width: "calc(100% - 48px)", flexBasis: "auto" },
          }}
        >
          <Row className={classes.container}>
            <input
              type="search"
              placeholder="Enter the region name, (ex : EMED)"
              className={classes.searchInput}
              autoFocus
              onChange={handleChange}
            />
            <button onClick={handleSubmit} className={classes.searchButton}>
              search
            </button>
          </Row>
          <Row className={classes.container}>
            {data.length > 0 ? (
              <Column>
                <DataTable
                  selectableRows
                  onSelectedRowsChange={(row) => handleSelect(row)}
                  onRowDoubleClicked={(vessel) => handleDoubleClick(vessel)}
                  title="Search Results"
                  columns={columns}
                  data={filterSearchValue.trim() === "" ? data : filteredData}
                />
              </Column>
            ) : null}
          </Row>
        </Column>
        <Column flexGrow={7} className={classes.filterContainer}>
          <label>Filter by</label>
          <input
            type="search"
            onChange={(e) => setFilterSearchValue(e.target.value)}
            placeholder="Enter MMSI, ISO or Ship Name"
            className={classes.filterInput}
          />

          <hr />
          {selectedRows.length !== 0 ? (
            <button onClick={addFav}>Add to favourites</button>
          ) : null}
        </Column>
      </Row>
    </div>
  );
};
export default Search;

// Columns for the table
const columns = [
  {
    name: "Vessel Name",
    selector: "name",
    sortable: true,
  },

  {
    name: "MMSI",
    selector: "mmsi",
    sortable: true,
  },
  {
    name: "IMO",
    selector: "imo",
    sortable: true,
  },
  {
    name: "Type",
    selector: "type",
    sortable: true,
  },
  {
    name: "Destination",
    selector: "destination",
    sortable: true,
  },
  {
    name: "Speed",
    selector: "speed",
    sortable: true,
  },
];
