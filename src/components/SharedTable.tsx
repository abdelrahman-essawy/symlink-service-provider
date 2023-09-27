// import { Order, OrdersApiResponse } from "@/@types/zod/OrdersTable";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import { queryClient } from "@/pages/_app";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Chip, IconButton, MenuItem, Tooltip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  MaterialReactTable,
  MaterialReactTableProps,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
} from "material-react-table";
import { useEffect, useState } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Link from "next/link";

const SharedTable = <T extends Record<string, any>>({
  endpoint,
  renderColumns,
  columnVisibility,
  actions,
  fakeData,
  showActions,
  muiTableBodyRowProps,
  renderRowActions,
  enableRowSelection,
  enableMultiRowSelection,
}: {
  endpoint: string;
  renderColumns?: MRT_ColumnDef<T>["accessorKey"][];
  columnVisibility?: Partial<Record<NonNullable<MRT_ColumnDef<T>["accessorKey"]>, boolean>>[];
  actions?: Partial<MRT_ColumnDef<T>>[];
  fakeData: any;
  showActions?: boolean;
  muiTableBodyRowProps?: MaterialReactTableProps<T>["muiTableBodyRowProps"];
  renderRowActions?: MaterialReactTableProps<T>["renderRowActions"];
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
}) => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isError, isFetching, isLoading, refetch } = useQuery(
    [
      "orders-table-data",
      columnFilters,
      globalFilter,
      pagination.pageIndex,
      pagination.pageSize,
      // sorting,
    ],
    async () => {
      // "https://zone.zbony.com/api/v1" +
      const fetchURL = new URL(endpoint);
      fetchURL.searchParams.set("page", `${pagination.pageIndex + 1}`);
      fetchURL.searchParams.set("size", `${pagination.pageSize}`);
      fetchURL.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      fetchURL.searchParams.set("globalFilter", globalFilter ?? "");
      // fetchURL.searchParams.set("sorting", JSON.stringify(sorting ?? []));
      // branchId && fetchURL.searchParams.set("branch_id", branchId);

      // return (await axios.get(fetchURL.toString())).data as any;
      return fakeData;
    },
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    return () => queryClient.removeQueries(["orders-table-data"]);
  }, []);

  const keys = Object.keys(data?.data[0] ?? {});

  // @ts-ignore
  const columns: MRT_ColumnDef<T>[] = [
    ...keys
      .map((key, index) => {
        const sharedColumn = sharedTableColumns?.find((column) => column.accessorKey === key);
        // @ts-ignore
        const valueIsArray = Array.isArray(data?.data[0][key]);

        if (valueIsArray) return;

        if (sharedColumn) {
          return sharedColumn;
        } else if (keys.includes(key)) {
          const translatedHeader = dictionary(fromKeyToHeader(key) as TranslatedWord);

          return {
            accessorKey: key,
            enableEditing: false,
            size: 50,
            header: translatedHeader,
            enableClickToCopy: true,
          };
        }

        return null;
      })
      .filter(Boolean),
    // ...(if (columns[0].id !== "actions") ? actions ?? [] : []),
    // only show actions, if there is other columns
    ...(data?.data ? actions ?? [] : []),
  ];

  return (
    <>
      <MaterialReactTable
        enableRowSelection={enableRowSelection}
        enableMultiRowSelection={enableMultiRowSelection}
        enableRowActions={showActions}
        positionActionsColumn="last"
        renderRowActions={renderRowActions}
        renderRowActionMenuItems={({ row, table }) => [
          <MenuItem key="edit">{dictionary("Edit")}</MenuItem>,
          <MenuItem key="delete">{dictionary("Delete")}</MenuItem>,
        ]}
        // onEditingRowSave={handleSaveRowEdits}
        // onEditingRowCancel={handleCancelRowEdits}
        localization={{
          actions: dictionary("Actions"),
          // rowsPerPage: dictionary("Rows per page"),
        }}
        muiTablePaperProps={{
          sx: {
            boxShadow: "none",
            border: 0,
          },
        }}
        muiTableProps={{
          sx: {
            "& .MuiTableCell-head": {
              color: "primary.main",
              fontWeight: "bold",
              bgcolor: "#f0f2fe",
              padding: 2.5,
              "&:first-child": {
                borderRadius: 1.5,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
              "&:last-child": {
                borderRadius: 1.5,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              },
            },
          },
        }}
        muiTableHeadRowProps={{
          sx: {
            "& .MuiTableCell-root": {
              color: "primary.main",
              fontWeight: "bold",
              bgcolor: "#f0f2fe",
              padding: 2,
            },
          },
        }}
        getRowId={(originalRow) => originalRow.id}
        columns={columns}
        //@ts-ignore
        data={data?.data ?? []}
        manualPagination
        enableColumnFilterModes
        positionToolbarAlertBanner="bottom"
        muiToolbarAlertBannerProps={
          isError
            ? {
              color: "error",
              children: "Error loading data",
            }
            : undefined
        }
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        enableSorting={false}
        enableColumnActions={false}
        rowCount={data?.meta.total ?? 0}
        state={{
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isFetching || isLoading,
          sorting,
          globalFilter,
          columnFilters,
        }}
        initialState={{
          // columnVisibility: { id: false, user_id: false, driver_id: false },
          // columnVisibility:
          //   hiddenColumns.map((columns) => ({
          //     [columns]: false,
          //   })) ?? {},
          //
          //@ts-ignore
          columnVisibility: columnVisibility ?? {},

          pagination: {
            pageIndex: 0,
            pageSize: 10,
          },
        }}
        renderTopToolbarCustomActions={() => (
          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Tooltip arrow title="Refresh Data">
                <IconButton onClick={() => refetch()}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        )}
        actions={actions}
        muiTableBodyRowProps={muiTableBodyRowProps} // TODO: refactor this
      />
    </>
  );
};

export default SharedTable;

const sharedTableColumns: MRT_ColumnDef<any>[] = [
  // {
  //   accessorKey: "is_reviewed",
  //   header: dictionary("Is Reviewed"),
  //   Cell: ({ row }) => (
  //     <Stack sx={{ display: "flex", alignItems: "center" }}>
  //       <SvgIcon>
  //         {!!row.getValue("is_reviewed") ? (
  //           <Preview color="success" />
  //         ) : (
  //           <Preview color="error" />
  //         )}
  //       </SvgIcon>
  //     </Stack>
  //   ),
  //   enableEditing: false,
  //   size: 50,
  //   muiTableHeadCellProps: {
  //     align: "center",
  //   },
  // },
  // {
  //   accessorKey: "payment_method",
  //   header: t(dictionary("Payment Method")),
  //   Cell: ({ row }) => (
  //     <Stack sx={{ display: "flex", alignItems: "center" }}>
  //       <SvgIcon>
  //         {row.getValue("payment_method") === "CASH" ? (
  //           <AttachMoney color="success" />
  //         ) : (
  //           <CreditCard color="success" />
  //         )}
  //       </SvgIcon>
  //       <Typography variant="body2">
  //         {row.getValue("payment_method")}
  //       </Typography>
  //     </Stack>
  //   ),
  //   enableEditing: false,
  //   size: 50,
  //   muiTableHeadCellProps: {
  //     align: "center",
  //   },
  // },
  {
    accessorKey: "created_at",
    header: dictionary("Created at"),
    Cell: ({ row }) => (
      <Typography variant="body2">
        {new Date(row.getValue("created_at")).toLocaleDateString()}
      </Typography>
    ),
    enableEditing: false,
    size: 50,
  },
  {
    accessorKey: "date",
    header: dictionary("Date"),
    Cell: ({ row }) => (
      <Typography variant="body2">{new Date(row.getValue("date")).toLocaleDateString()}</Typography>
    ),
    enableEditing: false,
    size: 50,
  },
  {
    accessorKey: "updated_at",
    header: dictionary("Updated at"),
    Cell: ({ row }) => (
      <Typography variant="body2">
        {new Date(row.getValue("updated_at")).toLocaleDateString()}
      </Typography>
    ),
    enableEditing: false,
    size: 50,
  },
  {
    accessorKey: "receipt",
    header: dictionary("Receipt"),
    Cell: ({ row }) => <ReceiptIcon sx={{ color: "#6366F1" }} />,
    enableEditing: false,
    size: 50,
  },
  // {
  //   id: "logo",
  //   accessorKey: "logo",
  //   header: t(dictionary("Logo")),
  //   enableEditing: false,
  //   Cell: ({ row }) => (
  //     <Image
  //       src={row.original.logo}
  //       alt={row.original.name_en}
  //       width={50}
  //       height={50}
  //     />
  //   ),
  //   size: 50,
  // },
  {
    id: "amount",
    accessorKey: "amount",
    header: dictionary("Amount"),
    Cell: ({ row }) => amountTagHandler(row.original.amount as number),
  },
  {
    id: "progress",
    accessorKey: "progress",
    header: dictionary("Progress"),
    Cell: ({ row }) => (
      progressTagHandler(row.original.progress as "waiting for selection" | "completed")
    ),
  },
  {
    id: "service_provider_name",
    accessorKey: "service_provider_name",
    header: dictionary("Service provider name"),
    Cell: ({ row }) => (
      <Typography
        variant="body2">
        <Link href={`/service-providers/${row.original.service_provider_id}`}>
          {row.original.service_provider_name}
        </Link>
      </Typography>
    ),
  }
];

export function progressTagHandler(progress: "waiting for selection" | "completed") {
  switch (progress) {
    case "waiting for selection":
      return (
        <Chip
          label={(progress)} // translate if possible
          sx={{
            bgcolor: "#FBE9BA",
            color: "#C18C00",
            fontWeight: "bold",
          }} />
      );
    case "completed":
      return (
        <Chip
          label={(progress)} // translate if possible
          sx={{
            bgcolor: "#e6f4ea",
            color: "#1e7e34",
            fontWeight: "bold",
          }} />
      );
    default:
      return (
        <Chip
          label={(progress)} // translate if possible
          sx={{
            bgcolor: "#e6f4ea",
            color: "#1e7e34",
            fontWeight: "bold",
          }} />
      );
  }
}


function fromKeyToHeader(input: string): string {
  const words = input.split("_");
  if (words.length === 0) {
    return "";
  }

  const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const restOfWords = words.slice(1);

  return [firstWord, ...restOfWords].join(" ");
}

export const amountTagHandler = (amount: number) => {
  // if amount if positive then show green tag if not then show red tag
  return (
    <Chip
      label={amount}
      sx={{
        fontWeight: "bold",
      }}
      color={amount > 0 ? "success" : amount < 0 ? "error" : "default"}
    />
  );
};