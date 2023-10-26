/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único del usuario.
 *         names:
 *           type: string
 *           description: Nombres del usuario.
 *         lastnames:
 *           type: string
 *           description: Apellidos del usuario.
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario.
 *         birthdate:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento del usuario en formato ISO 8601.
 *         cuit:
 *           type: string
 *           description: CUIT del usuario en formato xx-xxxxxxxx-x.
 *         cellphone:
 *           type: string
 *           description: Número de teléfono celular del usuario.
 *         address:
 *           type: string
 *           description: Dirección del usuario.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de creación del usuario en formato ISO 8601.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de última actualización del usuario en formato ISO 8601.
 */

import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as userService from "./service";

export const userController = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor
 */
userController.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: No existe un usuario con ese id
 *       500:
 *         description: Error interno del servidor
 */
userController.get("/:id", async (req: Request, res: Response) => {
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

/**
 * @swagger
 * /api/users/search/{query}:
 *   get:
 *     summary: Buscar usuarios por nombre o apellido
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         description: Nombre o apellido a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor
 */
userController.get("/search/:query", async (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    const users = await userService.search(query);
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               names:
 *                 type: string
 *                 description: Nombres del usuario.
 *               lastnames:
 *                 type: string
 *                 description: Apellidos del usuario.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del usuario en formato ISO 8601.
 *               cuit:
 *                 type: string
 *                 description: CUIT del usuario en formato xx-xxxxxxxx-x.
 *               cellphone:
 *                 type: string
 *                 description: Número de teléfono celular del usuario.
 *               address:
 *                 type: string
 *                 description: Dirección del usuario.
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error de validación de datos
 *       500:
 *         description: Error interno del servidor
 */
const validations: any = [
  body("names").isString().notEmpty(),
  body("lastnames").isString().notEmpty(),
  body("email").isEmail().notEmpty(),
  body("birthdate").isISO8601().notEmpty(),
  body("cuit")
    .matches(/^\d{2}-\d{8}-\d{1}$/)
    .notEmpty(),
  body("cellphone").isString().notEmpty(),
  body("address").isString().notEmpty(),
];
userController.post(
  "/",
  ...validations,
  async (req: Request, res: Response) => {
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
  }
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               names:
 *                 type: string
 *                 description: Nombres del usuario.
 *               lastnames:
 *                 type: string
 *                 description: Apellidos del usuario.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del usuario en formato ISO 8601.
 *               cuit:
 *                 type: string
 *                 description: CUIT del usuario en formato xx-xxxxxxxx-x.
 *               cellphone:
 *                 type: string
 *                 description: Número de teléfono celular del usuario.
 *               address:
 *                 type: string
 *                 description: Dirección del usuario.
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: No existe un usuario con ese id
 *       400:
 *         description: Error de validación de datos
 *       500:
 *         description: Error interno del servidor
 */
userController.put(
  "/:id",
  ...validations,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userService.getById(parseInt(id));
      if (!user) {
        return res
          .status(404)
          .json({ error: "No existe un usuario con ese id" });
      }
      const updatedUser = await userService.update(parseInt(id), req.body);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único del usuario.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: No existe un usuario con ese id
 *       500:
 *         description: Error interno del servidor
 */
userController.delete("/:id", async (req: Request, res: Response) => {
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
