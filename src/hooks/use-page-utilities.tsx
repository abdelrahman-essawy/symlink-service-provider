import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

export const usePageUtilities = () => {
  const [search, setSearch] = useState();
  const debouncedSearch = useDebounce(search, 500);
  const [controller, setController] = useState({
    page: 1,
    rowsPerPage: 10,
    filter: " ",
    SearchString: "",
    OrderBy: null,
  });

  const handlePageChange = (event: any, newPage: number) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleRowsPerPageChange = (event: any) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 1,
    });
  };

  const handleSearch = (event: any) => {
    const txt = event.target.value.toString();
    setSearch(txt);
  };

  const handleSorting = (sortingObj: any) => {
    setController({
      ...controller,
      OrderBy: sortingObj,
    });
  };
  useEffect(() => {
    setController({
      ...controller,
      page: 1,
      filter: debouncedSearch || "",
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);
  return {
    handlePageChange,
    handleSorting,
    handleRowsPerPageChange,
    handleSearch,
    controller,
    setController,
    debouncedSearch,
  };
};
