import { WriteStream } from "fs";
import { Log } from "./interfaces";

const fs = require("fs");
const dir = "logs";

class LoggerService {
  name: string
  stream: WriteStream
  constructor(name: string) {
    this.name = name;
    if (!fs.existsSync(`${dir}`)) {
        fs.mkdirSync(`${dir}`);
    }
    this.stream = fs.createWriteStream(`${dir}/${this.name}.log`, {
        flags: "a",
      });
  }

  log(message: string, extra: Record<any,any>) {
    const date = new Date().toISOString();
    const log = `${date}%%%${message}%%%${extra ? JSON.stringify(extra) : ""}`;
    this.stream.write(`${log}\n`);
  }

  close() {
    this.stream.end();
  }

  clearLog() {
    fs.writeFile(`${dir}/${this.name}.log`, "", (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

function getLogs(name: string) : Array<Log>{
  const logs = fs.readFileSync(`${dir}/${name}.log`, "utf8");
  const logsArray = logs.split("\n");
  logsArray.pop();
  const logsFormatted = logsArray.map((log: string) => {
    const [date, message, extras] = log.split("%%%");

    return { date, message, extras: JSON.parse(extras) };
  });
  return logsFormatted;
}

function buildReqMetadata(req: any, args = {}) {
    console.log(req)
  let metadata = {
    endpoint: req.originalUrl,
    method: req.method,
    origin: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    ...args,
  };
  return metadata;
}

const sendLog = (name: string, message: string, extra: Record<any,any>) => {
    const logger = new LoggerService(name);
    logger.log(message, extra);
    logger.close();
}

const logApp = (message: string, extra: Record<any,any>) => sendLog("app", message, extra);

const logError = (message: string, extra: Record<any,any>) => sendLog("error", message, extra);

const clearLogs = (name: string) => {
  const logger = new LoggerService(name);
  logger.clearLog();
  logger.close();
};

export { LoggerService, getLogs, buildReqMetadata, logApp, logError, clearLogs };
