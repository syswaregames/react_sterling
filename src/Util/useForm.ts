import { useMemo, useState } from "react";
import produce from "immer";

import * as Yup from "yup";
import { Draft } from "@reduxjs/toolkit";
/**
 * Ainda não sei se vou usar isso.
 * @param props 
 * @returns 
 */
export default function useForm<T extends { [key: string]: any }>(props: {
  values: T;
  validationSchema?: Yup.ObjectSchema<any>;
}) {
  const [state, setState] = useState(props.values);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>(
    props.values
  );
  function validate(data: T) {
    const errors: { [key: string]: string[] } = {};
    props.validationSchema
      ?.validate(data, { abortEarly: false })
      .then((x) => {})
      .catch((err) => {
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((e) => {
            if (e.path) {
              if (!errors[e.path]) errors[e.path] = [];
              errors[e.path].push(e.message);
            }
            console.log(e.message, e.path);
          });
        }
      });
    setErrors(errors);
  }
  const obj = useMemo(() => {
    return {
      values: state,
      errors,
      changeValue(changerFunction: (draft: Draft<T>) => void) {
        const newVal = produce(state, (draft) => {
          changerFunction(draft);
        });
        setState(newVal);
        validate(newVal);
      },
      setFieldValue(key: keyof T, value: any) {
        const newVal = produce(state, (draft) => {
          (draft as any)[key] = value;
        });
        setState(newVal);
        validate(newVal);
      },
      getFieldProps() {
        return {
          //  value
        };
      },
    };
  }, [state, errors]);

  return obj;
}
