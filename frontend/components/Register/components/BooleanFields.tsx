import { TextField } from '@mui/material';
import React from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface BooleanFields {
  title: string,
  subtitle: string,
  values: boolean,
  setValues: (value: boolean) => void,
  type?: string
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values:any) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix={"$"}
      />
    );
  },
);

const SizeFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function SizeFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values:any) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        suffix={"m²"}
      />
    );
  },
);

const BooleanFields: React.FC<BooleanFields> = ({title, subtitle, values, setValues, type}) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value);
  };

  return ( 
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">
          {title}
        </div>
        <div className="font-light text-gray-600">
          {subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4" >
        <TextField
          label="Type Here"
          value={values}
          onChange={handleChange}
          name="numberformat"
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: type==="Price"? NumericFormatCustom as any : SizeFormatCustom as any,
          }}
          variant="standard"
        />
      </div>
    </div>
  )
}


export default BooleanFields;