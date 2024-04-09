import express from 'express';
import type { Request, Response } from "express";
import {getLogs as logs, clearLogs as clear, buildReqMetadata, logApp, logError} from './service'

export const logsController = express.Router();
const APP_LOGS = 'app';
const ERROR_LOGS = 'error';

/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       properties:
 *         date:
 *           type: date
 *           description: Fecha de registro del log en formato ISO 8601.
 *         message:
 *           type: string
 *           description: Mensaje del log.
 *         extras:
 *           type: record
 *           description: Información adicional del log.
 */


const getLogs = (name: string, options: {since?: string, until?: string, lastMinutes?: string}) => {
    let data = logs(name);
    data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
    })
    if (options.since) data = data.filter(log => new Date(log.date) >= new Date(options.since!));
    if (options.until) data = data.filter(log => new Date(log.date) <= new Date(options.until!));
    if (options.lastMinutes) {
        const now = new Date();
        const lastMinutes = new Date(now.getTime() - parseInt(options.lastMinutes)*60000);
        data = data.filter(log => new Date(log.date) >= lastMinutes);
    }
    return data;
}
/**
 * @swagger
 * /api/logs/app:
 *   get:
 *     tags: [Logs]
 *     summary: Obtener logs de aplicacion
 *     responses:
 *       200:
 *         description: Lista de logs de aplicacion
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 *       500:
 *         description: Error interno del servidor
 */
logsController.get(`/${APP_LOGS}`, async (req: Request, res: Response) => {
    try {
        const data = getLogs(APP_LOGS, req.query);
        res.json(data);
    } catch (e) {
        logError("Error obteniendo los logs de aplicacion", buildReqMetadata(req));
    }
});
/**
 * @swagger
 * /api/logs/error:
 *   get:
 *     tags: [Logs]
 *     summary: Obtener logs de error
 *     responses:
 *       200:
 *         description: Lista de logs de error
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 *       500:
 *         description: Error interno del servidor
 */
logsController.get(`/${ERROR_LOGS}`, async (req: Request, res: Response) => {
    try {
        const data = getLogs(ERROR_LOGS, req.query);
        res.json(data);
    } catch (e) {
        logError("Error obteniendo los logs de error", buildReqMetadata(req));
    }
});
/**
 * @swagger
 * /api/logs:
 *   delete:
 *     tags: [Logs]
 *     summary: Eliminar logs de un tipo
 *     parameters:
 *       - in: search
 *         name: name
 *         required: true
 *         description: Nombre del log a eliminar (app o error)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Log eliminados
 *       400:
 *        description: Parametros incorrectos
 *       500:
 *         description: Error interno del servidor
 */
logsController.delete('/', async (req: Request, res: Response) => {
    const {name} = req.query;
    if (!name) {
        res.status(400).json({message: 'Falta el parametro name'});
        return;
    }
    if (name !== APP_LOGS && name !== ERROR_LOGS) {
        res.status(400).json({message: 'El parametro no corresponde a un log valido'});
        return;
    }
    try {
        clear(name);
        logApp(`Logs de ${name} eliminados`, buildReqMetadata(req))
        res.json({message: 'Logs eliminados'});
    } catch (e) {
        logError("Error eliminando los logs", buildReqMetadata(req));
    }
});
