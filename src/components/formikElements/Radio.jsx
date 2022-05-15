import { ErrorMessage, FastField } from "formik";
import React, { Fragment } from "react";
import Personalerror from "../Personalerror";

const Radio = (props) => {
  const { name, options, label } = props;
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <FastField as="select" className="form-control" id={name} name={name}>
        {({ field }) => {
          return options.map((o) => (
            <Fragment key={o.id}>
              <input
                className=" forme-check-input me-4"
                type="radio"
                id={`radio${o.id}`}
                {...field}
                value={o.id}
                checked={field.value == o.id}
              />
              <label htmlFor={`radio${o.id}`} className="mx-1 ms-4">
                {o.value}
              </label>
            </Fragment>
          ));
        }}
      </FastField>
      <ErrorMessage name={name} component={Personalerror} />
    </div>
  );
};

export default Radio;
