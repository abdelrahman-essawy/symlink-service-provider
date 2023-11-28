import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import React from "react";
import { MenuButton } from "@/components/button-menu";
import { useTranslation } from "react-i18next";

import PropTypes from "prop-types";

export const SearchBar = (props: any) => {
    const { filter, onSearchChange, placeholder, items, showFilter } = props;
    const { t } = useTranslation();

    return (
        <Card sx={{ p: 1,borderRadius:"5px",alignItems: 'center', justifyContent: 'space-between' ,display: 'flex', flexDirection: 'row', flexWrap: 'warp'}}>
            <OutlinedInput
                defaultValue=""
                onChange={onSearchChange}
                fullWidth
                placeholder={placeholder || "Search"}
                startAdornment={
                    <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                            <MagnifyingGlassIcon />
                        </SvgIcon>
                    </InputAdornment>
                }
                sx={{ maxWidth: 500 }}
            />
              
      {
        showFilter && (
          <MenuButton
          items={[
            {
              label: t("All"),
              onClick: () => {
                console.log("All");
              },
            },
            ...["كلية الهندسة", "كلية الهندسة", "كلية الطب"]?.map((category: string) => ({
              label: category,
              onClick: () => {
                console.log(category);
              },
            })),
          ]}
          title={t("College Name")}
        />
        )
      }
      
        </Card>
    );
};

SearchBar.propTypes = {
    filter: PropTypes.string,
    onSearchChange: PropTypes.func,
    placeholder: PropTypes.string,
    items: PropTypes.array,
    showFilter: PropTypes.bool,

};
