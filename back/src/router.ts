import { logsController } from "./logs/controller";
import { userController } from "./user/controller";

export const routes = [
  {
    path: "/api/users",
    router: userController,
  },
  {
    path: "/api/logs",
    router: logsController,
  },
];
