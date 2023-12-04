import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  alpha,
  Avatar,
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
} from "@mui/material";
import { Scrollbar } from "@/components/scrollbar";
import React from "react";
import Link from "next/link";
import LeftIcon from "@/assets/icons/left";
import RightIcon from "@/assets/icons/right";
import MenuButton from "./ButtonMenu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
    items = [],
    menu = [],
    headers = [],
    count,
    totalPages = 1,
    totalItems = 1,
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
  } = props;
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
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <MoreHorizIcon />
      </MenuButton>
    );
  };
  return (
    <>
      <Card sx={{ borderRadius: "15px" }}>
        <Scrollbar>
          <Box sx={{ minWidth: 800, minHeight: 150 }}>
            <Table sx={{ whiteSpace: "nowrap", p: 3 }}>
              <TableHead>
                <TableRow>
                  {headers?.map((header: any) => {
                    return (
                      <StyledTableCell key={header} sx={{ textAlign: "start", p: 3 }}>
                        {t(header?.text)}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((item: any, index: number) => (
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
                ))}
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
  totalPages: PropTypes.number,
  totalItems: PropTypes.number,
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
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
