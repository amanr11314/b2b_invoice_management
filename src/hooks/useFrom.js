import { useState } from "react";
export const useForm = (initialValues) => {
  const [values, setValues, resetForm] = useState(initialValues);
  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
    () => {
      setValues(initialValues);
    },
  ];
};
