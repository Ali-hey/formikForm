import React from "react";
import Checkbox from "./Checkbox";
import Input from "./Input";
import Radio from "./Radio";
import Select from "./Select";
import Textarea from "./Textarea";

const Formikcontrol = (props) => {
  switch (props.control) {
    case "input":
      return <Input {...props} />;

    case "textarea":
      return <Textarea {...props} />;

    case "select":
      return <Select {...props} />;

    case "radio":
      return <Radio {...props} />;

      case "checkbox":
      return <Checkbox {...props} />;

    default:
      break;
  }
};

export default Formikcontrol;
