import {
  ErrorMessage,
  FastField,
  Field,
  FieldArray,
  Form,
  Formik,
  useFormik,
} from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import FavoritsField from "./FavoritsField";
import Formikcontrol from "./formikElements/FormikControl";
import Personalerror from "./Personalerror";
import Personalfield from "./PersonalField";

const initialValues = {
  name: "",
  email: "",
  password: "",
  bio: "",
  address: {
    city: "",
    postalcode: "",
  },
  phone: ["", ""],
  favorits: [""],
  education: 1,
  gender: 1,
  skill: [],
};

const onSubmit = (values, submitProps) => {
  setTimeout(() => {
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  }, 5000);
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "لطفا نام کاربری را وارد کنید";
  }
  if (!values.email) {
    errors.email = "لطفا ایمیل را وارد کنید";
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
  ) {
    errors.email = "ایمیل وارد شده معتبر نمی باشد";
  }
  if (!values.password) {
    errors.password = "لطفا رمز عبور را وارد کنید";
  }
  return errors;
};

const validationSchema = Yup.object({
  name: Yup.string().required("لطفا نام کاربری را وارد کنید"),
  email: Yup.string()
    .required("لطفا ایمیل را وارد کنید")
    .email("ایمیل وارد شده معتبر نمی باشد"),
  password: Yup.string()
    .required("لطفا رمز عبور را وارد کنید")
    .min(6, "رمز عبور باید حداقل 6 کاراکتر داشته باشد"),
  address: Yup.object({
    city: Yup.string().required("لطفا آدرس وارد کنید"),
    postalcode: Yup.string().required("لطفا کدپستی وارد کنید"),
  }),
  phone: Yup.array().of(Yup.string().required("لطفا این قسمت را پر کنید")),
  favorits: Yup.array().of(Yup.string().required("لطفا این قسمت را پر کنید")),
  education: Yup.string().required("لطفا انتخاب کنید"),
});

const validateBio = (value) => {
  let error;
  if (!value) {
    error = "ورود این فیلد اجباری است";
  } else if (!/^[\u0600-\u06FF\s0-9a-zA-Z]+$/.test(value)) {
    error = "لطفا فقط از حروف فارسی،انگلیسی و اعداد استفاده نمایید";
  }
  return error;
};

const educations = [
  { id: 0, value: " انتخاب کنید..." },
  { id: 1, value: "بیسواد" },
  { id: 2, value: "ابتدایی" },
  { id: 3, value: "دیپلم" },
  { id: 4, value: "لیسانس" },
  { id: 5, value: "فوق لیسانس" },
  { id: 6, value: "دکتری" },
];

const gender = [
  { id: 1, value: "مرد" },
  { id: 2, value: "زن" },
];

const skills = [
  { id: 1, value: "HTML" },
  { id: 2, value: "CSS" },
  { id: 3, value: "JS" },
  { id: 4, value: "REACT" },
];

const Registerform = () => {
  const [savedData, setSavedData] = useState(null);
  const [myValues, setMyValues] = useState(null);

  const handleSaveData = (formik) => {
    localStorage.setItem("savedData", JSON.stringify(formik.values));
  };

  const handleGetSaveData = () => {
    setMyValues(savedData);
  };

  useEffect(() => {
    const localSavedData = JSON.parse(localStorage.getItem("savedData"));
    setSavedData(localSavedData);
  }, []);

  return (
    <Formik
      initialValues={myValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // validateOnMount
      enableReinitialize
    >
      {(formik) => {
        return (
          <div className="auth_container container-fluid d-flex justify-content-center align-items-center w-100 h-100-vh p-0">
            <div className="row w-100 justify-content-center align-items-center">
              <div className="auth_box col-11 col-md-8 col-lg-6 col-xl-4 py-4 px-3">
                <Form className="row">
                  <h1 className="text-center">
                    <i className="fas fa-user-plus text-primary"></i>
                  </h1>
                  <Formikcontrol
                    control="input"
                    type="text"
                    label="نام"
                    name="name"
                  />

                  <Formikcontrol
                    control="input"
                    type="email"
                    label="ایمیل"
                    name="email"
                  />

                  <Formikcontrol
                    control="input"
                    type="password"
                    label="رمز عبور"
                    name="password"
                  />

                  <Formikcontrol
                    control="textarea"
                    label="بیوگرافی"
                    name="bio"
                  />

                  <Formikcontrol
                    control="select"
                    label="تحصیلات"
                    name="education"
                    options={educations}
                  />

                  <Formikcontrol
                    control="radio"
                    label="جنسیت"
                    name="gender"
                    options={gender}
                  />

                  <Formikcontrol
                    control="checkbox"
                    label="تخصص"
                    name="skill"
                    options={skills}
                  />

                  <div className="mb-3 col-6">
                    <label htmlFor="city" className="form-label">
                      آدرس
                    </label>
                    <FastField
                      type="text"
                      className="form-control"
                      id="city"
                      name="address.city"
                    />
                    <ErrorMessage
                      name="address.city"
                      component={Personalerror}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label htmlFor="postalcode" className="form-label">
                      کد پستی
                    </label>
                    <FastField
                      type="text"
                      className="form-control"
                      id="postalcode"
                      name="address.postalcode"
                    />
                    <ErrorMessage
                      name="address.postalcode"
                      component={Personalerror}
                    />
                  </div>

                  <div className="mb-3 col-6">
                    <label htmlFor="mobilephone" className="form-label">
                      شماره موبایل
                    </label>
                    <FastField
                      type="text"
                      className="form-control"
                      id="mobilephone"
                      name="phone[0]"
                    />
                    <ErrorMessage name="phone[0]" component={Personalerror} />
                  </div>

                  <div className="mb-3 col-6">
                    <label htmlFor="telephone" className="form-label">
                      شماره ثابت
                    </label>
                    <FastField
                      type="text"
                      className="form-control"
                      id="telephone"
                      name="phone[1]"
                    />
                    <ErrorMessage name="phone[1]" component={Personalerror} />
                  </div>

                  <div className="mb-3">
                    <FieldArray
                      type="text"
                      className="form-control"
                      id="favorits"
                      name="favorits"
                    >
                      {(props) => <FavoritsField {...props} />}
                    </FieldArray>
                  </div>

                  <div className="text-center w-100">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={
                        !(formik.dirty && formik.isValid) || formik.isSubmitting
                      }
                    >
                      {formik.isSubmitting ? (
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "ثبت نام"
                      )}
                    </button>

                    {formik.dirty && formik.isValid ? (
                      <button
                        type="button"
                        className="btn btn-warning mx-3"
                        onClick={() => {
                          handleSaveData(formik);
                        }}
                      >
                        ذخیره در این سیستم
                      </button>
                    ) : null}

                    {savedData ? (
                      <button
                        type="button"
                        className="btn btn-success mx-3"
                        onClick={() => {
                          handleGetSaveData();
                        }}
                      >
                        دریافت آخرین اطلاعات در این سیستم
                      </button>
                    ) : null}

                    {formik.dirty ? (
                      <button type="reset" className="btn btn-danger mt-2 mx-3">
                        پاکسازی
                      </button>
                    ) : null}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Registerform;
