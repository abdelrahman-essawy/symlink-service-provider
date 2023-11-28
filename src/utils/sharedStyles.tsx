import {
 SxProps, Theme,
  } from '@mui/material';

export const sharedStyles = (stylesFor: string): Object => {
    const styles: SxProps<Theme> = {
      textTransform: 'none',
      bgcolor: '#f7f7f7',
      color: '#7B7B7B',
      borderColor: '#E5E5E5',
      '&:hover': {
        bgcolor: '#E5E5E5',
      },
      border: .7,
      borderRadius: 1,
      fontSize: 14,
      px: 2,
      py: .5,
    }
    if (stylesFor === 'approveButton') return {
      ...styles,
      bgcolor: '#5A5A5A',
      color: '#FFFFFF',
      px: 4,
      '&:hover': {
        bgcolor: '#272727',
        color: '#FFFFFF',
      }
    }
    if (stylesFor === 'actions') return {
      ...styles,

    }

    return styles;
  }