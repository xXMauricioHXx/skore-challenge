import Joi from 'joi';

export const deleteSchema = Joi.object({
  params: Joi.object({
    id: Joi.number().positive().required(),
  }),
});
