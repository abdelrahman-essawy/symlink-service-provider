/**
 * This is a table with sorting - select - pagination features.
 *
 * @param {boolean} props.select - weather to have select columns or not.
 * @param {Array} props.headers - List of headers {text, value, align}.
 * @param {String} props.name - name of pagination element.
 * @param {Number} props.totalItems - total items of fetched data.
 * @param {Number} props.totalPages - total pages of fetched data.
 * @param {Function} props.onRender{header.value} - Render any renderable function result instead of regular header.
 * @returns {JSX.Element} A table with headers and items as described.
 */
import { SxProps, Theme } from '@mui/material';
import MenuButtons from './ButtonMenu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from 'react';
import { sharedStyles } from '@/utils/sharedStyles';
import SvgIcon from '@mui/material/SvgIcon';

export type TActionMenuButton = {
  label: string;
  icon?: JSX.Element;
  onClick: (e?:any,id?: string) => void;
  sx: SxProps<Theme>;
  anothersx?: SxProps<Theme>;
  disabled?: boolean;
  massage?: string|null;
};

const ActionsButtons = ({ actions }: { actions: TActionMenuButton[] }) => {
  return (
    <MenuButtons actions={actions}  sx={{
      ...sharedStyles('menuButton'),
      width: 20
    }}
    >
      <SvgIcon component={MoreHorizIcon}/>
    </MenuButtons>

  );
};
export default ActionsButtons;