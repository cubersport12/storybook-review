import { ReactNode, useState } from 'react';
import { Controller, ControllerProps } from 'react-hook-form';
import { FormControl, InputAdornment, InputLabel, Select, SxProps } from '@mui/material';
import { uniqueId } from 'lodash';
import * as React from 'react';

type PropsType = {
  controller?: Omit<ControllerProps, 'render'>;
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  children?: ReactNode[];
  icon?: string;
  sx?: SxProps;
  disabled?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  multiple?: boolean;
};

const SimpleSelect = (props: PropsType & { field?: any }): any => {
  const labelId = uniqueId('labelId');
  const id = uniqueId('id');
  // if (props.value !== value) setValue(props.value);
  return (
    <FormControl sx={props.sx!} variant={props.variant!}>
      <InputLabel id={labelId}>{props.label}</InputLabel>
      <Select
        multiple={props.multiple!}
        startAdornment={
          props.icon ? (
            <InputAdornment position="start">
              <i className={props.icon}></i>
            </InputAdornment>
          ) : null
        }
        {...(props.field ?? {})}
        value={props.field?.value ?? props.value ?? ''}
        labelId={labelId}
        id={id}
        sx={{ color: 'white' }}
        label={props.label}
        disabled={props.disabled!}
        renderValue={(selected: any) => {
          const values = props.children
            ?.map((y: any) => ({
              label: y.props?.children,
              value: y.props?.value
            }))
            .filter(x => Boolean(x));
          if (Array.isArray(selected)) {
            return selected
              .map(x => {
                const f = values?.find(y => y.value === x);
                return f?.label ?? x;
              })
              .join(',');
          }

          return values?.find(y => y.value === selected)?.label ?? selected;
        }}
        onChange={e => {
          if (props.field) {
            props.field.onChange(e);
          } else {
            // setValue(e.target.value);
          }

          if (props.onChange) {
            props.onChange(e.target.value);
          }
        }}
      >
        {props.children}
      </Select>
    </FormControl>
  );
};

export const AppSelect = (props: PropsType) =>
  props.controller ? (
    <Controller {...(props.controller ?? { name: '' })} render={({ field }) => <SimpleSelect field={field} {...props} />} />
  ) : (
    <SimpleSelect {...props} />
  );
