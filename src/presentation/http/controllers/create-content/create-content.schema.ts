import Joi from 'joi';

export const createContentSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().min(5).required(),
    type: Joi.string().required(),
  }),
});
