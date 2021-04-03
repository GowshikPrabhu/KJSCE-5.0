import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import { Context } from "context/Context";

const MyList = () => {
  const [state] = useContext(Context);

  // Handle Double Click
  const handleDoubleClick = (vessel) => {
    window.open(`/track/${vessel.mmsi}/${vessel.lat}/${vessel.lon}`, "_blank");
  };

  return (
    <div>
      <DataTable
        onRowDoubleClicked={(vessel) => handleDoubleClick(vessel)}
        title="My Vessels List"
        columns={columns}
        data={state.user.ships}
      />
    </div>
  );
};
export default MyList;

// Columns for the table
const columns = [
  {
    name: "Vessel Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "ID",
    selector: "id",
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
