import { userRouter } from "./user/controller";

export const routes = [
  {
    path: "/api/users",
    router: userRouter,
  },
];
