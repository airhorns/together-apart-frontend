import React from "react";
import { useField, FormikValues } from "formik";
import { FormControl, FormControlProps } from "baseui/form-control";
import { Input as InputControl, InputProps } from "baseui/input";

export const Input = <Values extends FormikValues>(
  props: { label: FormControlProps["label"]; caption?: FormControlProps["caption"]; attribute: keyof Values & string } & InputProps
) => {
  const [field, meta] = useField(props.attribute);
  const error = (meta.touched && meta.error) || undefined;

  return (
    <FormControl label={props.label} caption={props.caption} error={error}>
      <InputControl name={props.attribute} error={!!error} {...field} {...props} />
    </FormControl>
  );
};
