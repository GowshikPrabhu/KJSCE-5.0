export const useVesselsTableSearch = ({ filterSearchValue, data }) => {
  const filteredData = data.filter((row) => {
    return row.name !== null
      ? row.name.toLowerCase().includes(filterSearchValue.toLowerCase())
      : false || row.mmsi !== null
      ? row.mmsi.toLowerCase().includes(filterSearchValue.toLowerCase())
      : false || row.iso !== null
      ? row.iso.toLowerCase().includes(filterSearchValue.toLowerCase())
      : false || row.callsign !== null
      ? row.callsign.toLowerCase().includes(filterSearchValue.toLowerCase())
      : false || row.area !== null
      ? row.area.toLowerCase().includes(filterSearchValue.toLowerCase())
      : false || row.type !== null
      ? row.type.toLowerCase().includes(filterSearchValue.toLowerCase())
      : false || row.destination !== null
      ? row.destination.toLowerCase().includes(filterSearchValue.toLowerCase())
      : false || row.id !== null
      ? row.id.toLowerCase().includes(filterSearchValue.toLowerCase())
      : false;
  });

  return { filteredData };
};
