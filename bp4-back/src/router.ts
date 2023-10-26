import { userController } from "./user/controller";

export const routes = [
  {
    path: "/api/users",
    router: userController,
  },
];
