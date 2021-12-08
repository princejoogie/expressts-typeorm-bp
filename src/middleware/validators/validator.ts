import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export interface IValidator {
  body?: AnySchema;
  query?: AnySchema;
  params?: AnySchema;
}

const validate =
  (schema: IValidator) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) req.body = await schema.body.validate(req.body);
      if (schema.query) req.query = await schema.query.validate(req.query);
      if (schema.params) req.params = await schema.params.validate(req.params);
      return next();
    } catch (err: any) {
      return res.status(500).send({
        type: err.name,
        message: err.message,
      });
    }
  };

export default validate;
