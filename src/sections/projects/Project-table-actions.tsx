import React from "react";
import { sharedStyles } from "@/utils/sharedStyles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TActionMenuButton } from "@/components/shared/MenuItems";
import MenuButton from "@/components/shared/ButtonMenu";

type props = {
  card: any;
};
export const CardTableActions = (props: props) => {
  const {
    card,
  } = props;
  const menu: TActionMenuButton[] = [];

  menu?.push({
    label: "Edit",
    // icon: <CashIconSVG stroke="#5D5D5D" />,
    onClick: (e: any) => {
      e.stopPropagation();
      // handleCashInOut(card);
    },
    sx: sharedStyles("actions"),
  });

  return (
    <MenuButton
      actions={menu}
      sx={sharedStyles("actions")}
      onClick={(e: any) => {
        e.stopPropagation();
      }}
    >
      <MoreHorizIcon />
    </MenuButton>
  );
};
