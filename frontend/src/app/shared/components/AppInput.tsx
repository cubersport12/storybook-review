import { FormControl, InputAdornment, SxProps, TextField } from '@mui/material';
import * as React from 'react';
import { Controller, ControllerProps } from 'react-hook-form';

export const AppInput = ({
  label,
  type,
  icon,
  controller,
  placeholder,
  disabled,
  multiline,
  rows,
  sxProps,
  onChange,
  value
}: {
  label: string;
  type?: React.InputHTMLAttributes<unknown>['type'];
  icon?: string;
  placeholder?: string;
  multiline?: boolean;
  disabled?: boolean;
  rows?: number;
  controller?: Omit<ControllerProps, 'render'>;
  sxProps?: SxProps;
  // eslint-disable-next-line no-shadow
  onChange?: (value: any) => void;
  value?: any;
}) => {
  const textField = (field: any) => (
    <TextField
      rows={rows}
      multiline={multiline}
      disabled={disabled}
      placeholder={placeholder}
      {...field}
      type={type}
      value={field.value ?? value}
      onChange={e => {
        if (field.onChange) {
          field.onChange(e);
        }
        if (onChange) {
          onChange(e.target.value);
        }
      }}
      label={label}
      InputProps={
        icon
          ? {
              startAdornment: (
                <InputAdornment position="start">
                  <i className={icon}></i>
                </InputAdornment>
              )
            }
          : undefined
      }
    />
  );
  return (
    <FormControl sx={sxProps}>
      {controller ? <Controller {...(controller ?? { name: '' })} render={({ field }) => textField(field)} /> : textField({})}
    </FormControl>
  );
};
