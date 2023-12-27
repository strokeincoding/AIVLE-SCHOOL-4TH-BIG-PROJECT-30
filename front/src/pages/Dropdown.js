import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
  {
    value: '파이썬',
    label: 'PYTHON',
  },
  {
    value: '자바',
    label: 'JAVA',
  },
  {
    value: 'C',
    label: 'C',
  },
  {
    value: '스프링',
    label: 'SPRING',
  },
];

export default function SelectTextFields() {
  return (
      <div>
        <TextField
          id="outlined-select-currency"
          select
          defaultValue="PYTHON"
          fullWidth
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
  );
}