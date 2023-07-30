import * as yup from 'yup';

export const offerValidationSchema = yup.object().shape({
  price: yup.number().integer().required(),
  user_id: yup.string().nullable(),
  freight_broker_id: yup.string().nullable(),
});
