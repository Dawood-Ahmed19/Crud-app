import * as Yup from "yup";

const SignupSchema: Yup.ObjectSchema<{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}> = Yup.object({
  email: Yup.string().email("Type correct email").required("Email is required"),
  name: Yup.string()
    .min(5, "name must contain 5 characters")
    .required("name is required")
    .test("capitalize", "First letter must be capitalized", (value) => {
      if (value) {
        return value.charAt(0) === value.charAt(0).toUpperCase();
      }
      return true;
    }),
  password: Yup.string()
    .min(6, "Password must contain 6 characters")
    .required("password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default SignupSchema;
