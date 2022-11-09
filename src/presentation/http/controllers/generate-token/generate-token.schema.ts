import Joi from 'joi';
import { UserLevelPermission } from '@/domain/entities/user';

export const generateTokenSchema = Joi.object({
  body: Joi.object({
    id: Joi.number().required(),
    levelPermission: Joi.string()
      .valid(UserLevelPermission.ADMIN, UserLevelPermission.NORMAL)
      .required(),
  }),
});
