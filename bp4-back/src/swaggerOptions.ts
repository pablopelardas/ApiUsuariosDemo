export default {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de usuarios",
      version: "1.0.0",
      description: "Una API de usuarios",
      contact: {
        name: "Pablo Pelardas",
        email: "pablo.pelardas@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./src/**/*.ts"],
};
