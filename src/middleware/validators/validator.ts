import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err: any) {
      return res.status(500).send({
        type: err.name,
        message: err.message,
      });
    }
  };

export default validate;
