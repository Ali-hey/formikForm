import { ErrorMessage, FastField } from "formik";
import React from "react";
import Personalerror from "../Personalerror";

const Select = (props) => {
  const { name, options, label } = props;
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <FastField as="select" className="form-control" id={name} name={name}>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.value}
          </option>
        ))}
      </FastField>
      <ErrorMessage name={name} component={Personalerror} />
    </div>
  );
};

export default Select;
