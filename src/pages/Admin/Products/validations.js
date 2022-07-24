import * as yup from "yup";

const newProductSchema = yup.object().shape({
  title: yup.string().min(3).required(),
  description: yup.string().min(5).required(),
  price: yup.string().required(),
  photos:yup.array(),
});

export default newProductSchema;