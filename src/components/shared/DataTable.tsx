import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { visuallyHidden } from "@mui/utils";
import {
  alpha,
  TableSortLabel,
  Theme,
  Box,
  Card,
  Grid,
  Pagination,
  PaginationItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  tableCellClasses,
  styled,
  SxProps,
  Skeleton,
} from "@mui/material";
import { Scrollbar } from "@/components/scrollbar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LeftIcon from "@/assets/icons/left";
import RightIcon from "@/assets/icons/right";
import MenuButton from "./ButtonMenu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Noitems from "@/components/shared/no-items";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { SearchBar } from "@/sections/shared/search-bar";
const PaginationBox = styled(Box)(() => ({
  borderRadius: "9px",
  border: "1px solid rgba(196,196,196, 1)",
  backgroundClor: "rgba(255,255,255, 1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const DataTable = (props: any) => {
  const {
    isLoading = false,
    items = [],
    menu = [],
    headers = [],
    totalPages = 1,
    totalItems = undefined,
    pageSize = 10,
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange = () => {},
    onSelectAll,
    onSelectOne,
    onRowClick,
    name,
    page = 1,
    handleSuspend = () => {},
    rowsPerPage,
    selected,
    withSearch=false,
    handleSendSortBy = (sorting:any) => {},
    handleSearch = (sorting:string) => {},
  } = props;
  const [sorting, setSorting]: any = useState({});
  const getItem = (item: any, header: any): any => {
    const name = "onRender" + header.value;
    if (props[name]) {
      return props[name](item);
    } else {
      if (header.text === "Created at") {
        return format(Date.parse(item.created_at), "dd/MM/yyyy");
      } else if (header.text === "Phone") {
        return <Box sx={{ direction: "rtl" }}>{item?.phone}</Box>;
      } else if (header.text === "Action") {
        return Actions(item.id, item?.isSuspended);
      } else {
        return t(item[header?.value]);
      }
    }
  };
  const noNeedSorting = (headerText: string): Boolean => {
    if (name == "Employees") {
      if (
        headerText == "Role" ||
        headerText == "Action" ||
        headerText == "Department" ||
        headerText == "Create Date"
      ) {
        return false;
      }
      return true;
    } else if (name == "Transactions") {
      if (
        headerText == "Type" ||
        headerText == "Actions" ||
        headerText == "Creation Date & Time" ||
        headerText == "Holder Name" ||
        headerText == "Card No."
      ) {
        return false;
      }
      return true;
    } else if (["Companies", "CardProgram"].includes(name)) {
      return false;
    }
    if (
      headerText == "Edit" ||
      headerText == "Employee Name" ||
      headerText == "Status" ||
      headerText == "Actions" ||
      headerText == "Action"
    ) {
      return false;
    }
    return true;
  };
  const handleSorting = (header: any) => {
    const newVal: any = { ...sorting };
    if (newVal[header.value] === "asc") {
      newVal[header.value] = "desc";
    } else if (newVal[header.value] === "desc") {
      delete newVal[header.value];
    } else {
      newVal[header.value] = "asc";
    }
    setSorting(newVal);
  };

  useEffect(() => {
    //change Items Order from Api
    if (handleSendSortBy) {
      handleSendSortBy(sorting);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);
  const { t } = useTranslation();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#F1F3FE",
      color: "rgb(103, 85, 193)",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const sharedStyles = (stylesFor: string): Object => {
    const styles: SxProps<Theme> = {
      textTransform: "none",
      bgcolor: "#f7f7f7",
      color: "#7B7B7B",
      borderColor: "#E5E5E5",
      "&:hover": {
        bgcolor: "#E5E5E5",
      },
      border: 0.7,
      borderRadius: 1,
      fontSize: 14,
      px: 2,
      py: 0.5,
    };
    if (stylesFor === "approveButton") {
      return {
        ...styles,
        bgcolor: "#5A5A5A",
        color: "#FFFFFF",
        px: 3,
        float: "right",
        "&:hover": {
          bgcolor: "#272727",
          color: "#FFFFFF",
        },
      };
    }
    if (stylesFor === "actions") {
      return {
        ...styles,
      };
    }

    return styles;
  };
  const Actions = (id: string, isSuspended?: boolean) => {
    return (
      <MenuButton
        actions={menu}
        id={id}
        isSuspended={isSuspended}
        sx={sharedStyles("actions")}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
        }}
      >
        <MoreHorizIcon />
      </MenuButton>
    );
  };

  if (!isLoading && (totalItems == undefined || (totalItems == 0))) {
    return (
      <Noitems
        title={`No ${name} yet`}
        icon={<FolderCopyIcon sx={{ color: "gray", fontSize: "4.2em" }} />}
      />
    );
  }

  return (
    <>
     {withSearch? <SearchBar onSearchChange={handleSearch} />:null}
      <Card sx={{ borderRadius: "15px" }}>
        <Scrollbar>
          <Box sx={{ minWidth: 800, minHeight: 150 }}>
            <Table sx={{ whiteSpace: "nowrap", p: 3 }}>
              <TableHead>
                <TableRow>
                  {headers?.map((header: any) => {
                    return (
                      <StyledTableCell key={header} sx={{ textAlign: "start", p: 3 }}>
                        {
                          // here you can Add the column header that don't need to sorting
                          noNeedSorting(header.text) ? (
                            <TableSortLabel
                              active={sorting.hasOwnProperty(header.value)}
                              direction={sorting[header.value]}
                              onClick={(event) => handleSorting(header)}
                              sx={{
                                textTransform: "none",
                                textAlign: "center !important",
                                lineHeight: "1.5rem",
                              }}
                            >
                              {header.text}
                              <Box component="span" sx={visuallyHidden}>
                                {sorting[header.value] === "desc"
                                  ? "sorted descending"
                                  : "sorted ascending"}
                              </Box>
                            </TableSortLabel>
                          ) : (
                            <Typography
                              sx={{
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: "0.78rem",
                                lineHeight: "1.5rem",
                                textAlign: "start",
                              }}
                            >
                              {header.text}
                            </Typography>
                          )
                        }
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading ? (
                  items?.map((item: any, index: number) => (
                    <TableRow
                      hover
                      key={index}
                      sx={{
                        // borderRadius: handleBorderRadius(index),
                        cursor: onRowClick ? "pointer" : "auto",
                      }}
                      onClick={(e) => (onRowClick ? onRowClick(e, item) : null)}
                    >
                      {headers?.map((header: any) => {
                        return (
                          <TableCell key={header}>
                            <Stack alignItems="center" direction="row" spacing={1}>
                              {getItem(item, header)}
                            </Stack>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                ) : (
                  <>
                    {Array.from({ length: 3 }).map((_: any, index: number) => (
                      <TableRow key={index}>
                        {headers?.map((header: any) => {
                          return (
                            <TableCell key={header}>
                              <Stack alignItems="center" direction="row" spacing={1}>
                                <Skeleton width={100} key={header} />
                              </Stack>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
      </Card>
      <Grid
        container
        mt={3}
        sx={{ direction: "rtl", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid item xs={6}>
          <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "4px" }}>
            <Typography variant="subtitle2" color="initial">
              {t("Row per page:")}{" "}
            </Typography>
            <FormControl sx={{ width: "60px" }}>
              <Select value={rowsPerPage} onChange={onRowsPerPageChange} size="small">
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* <Grid item xs={4}>
          <Typography color={"#84818A"} fontSize={12} fontWeight={700}>
            {t("ShowingFrom", { items: items.length, totalItems: totalItems })} {t(name)}
          </Typography>
        </Grid> */}

        <Grid item xs={6} justifyContent={"end"} display="flex">
          <Pagination
            count={totalPages}
            page={page}
            variant="outlined"
            size="large"
            shape="rounded"
            onChange={onPageChange}
            renderItem={(item) => (
              <PaginationItem
                sx={{ border: 0, direction: "ltr" }}
                components={{
                  previous: () => (
                    <PaginationBox>
                      <LeftIcon />
                    </PaginationBox>
                  ),
                  next: () => (
                    <PaginationBox>
                      <RightIcon />
                    </PaginationBox>
                  ),
                }}
                {...item}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

DataTable.propTypes = {
  count: PropTypes.number,
  name: PropTypes.string,
  isLoading: PropTypes.bool,
  withSearch: PropTypes.bool,
  totalPages: PropTypes.number,
  totalItems: PropTypes.any,
  items: PropTypes.array,
  headers: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  handleSuspend: PropTypes.func,
  handleSendSortBy: PropTypes.func,
  handleSearch: PropTypes.func,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
