import Joi from 'joi';

export const updateContentSchema = Joi.object({
  params: {
    id: Joi.string().required(),
  },
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    type: Joi.string(),
  }),
});
