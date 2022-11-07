import Joi from 'joi';

export const findContentByIdSchema = Joi.object({
  params: Joi.object({
    id: Joi.number().required(),
  }),
});
