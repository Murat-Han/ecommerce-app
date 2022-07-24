import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email adresi girin!..")
    .required("Zorunlu alan"),
  password: yup
    .string()
    .min(5, "Parolanız en az 5 karakter olmalıdır")
    .required("Zorunlu alan"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Girilen parolalar uyuşmuyor!...")
    .required("Zorunlu alan"),
    terms:yup.bool().oneOf([true],"You should accept terms and conditions"),
});

export default validations;
