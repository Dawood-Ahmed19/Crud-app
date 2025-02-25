import * as Yup from "yup";

const loginSchema: Yup.ObjectSchema<{ email: string; password: string }> =
  Yup.object({
    email: Yup.string().email("invalid Email").required("Email is Required"),
    password: Yup.string()
      .min(6, "password must contain atleast 6 characters")
      .required("Password is required"),
  });

export default loginSchema;
