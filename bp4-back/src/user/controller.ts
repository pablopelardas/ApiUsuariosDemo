import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as userService from "./service";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(parseInt(id));
    if (!user) {
      return res.status(404).json({ error: "No existe un usuario con ese id" });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

userRouter.get("/search/:query", async (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    const users = await userService.search(query);
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

const validations: any = [
  body("names").isString().notEmpty(),
  body("lastnames").isString().notEmpty(),
  body("email").isEmail().notEmpty(),
  body("birthdate").isISO8601().notEmpty(),
  body("cuit").isString().notEmpty(),
  body("cellphone").isString().notEmpty(),
  body("address").isString().notEmpty(),
];

userRouter.post("/", ...validations, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    const user = await userService.insert(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

userRouter.put("/:id", ...validations, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(parseInt(id));
    if (!user) {
      return res.status(404).json({ error: "No existe un usuario con ese id" });
    }
    const updatedUser = await userService.update(parseInt(id), req.body);
    return res.status(200).json(updatedUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(parseInt(id));
    if (!user) {
      return res.status(404).json({ error: "No existe un usuario con ese id" });
    }
    await userService.remove(parseInt(id));
    return res.status(204).json();
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
