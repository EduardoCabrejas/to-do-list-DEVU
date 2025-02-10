import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Tareas",
      version: "1.0.0",
      description: "Documentación de la API de Tareas",
    },
    servers: [{ url: "http://localhost:5000" }],
    tags: [
      { name: "Users", description: "API to manage Users", order: 1 },
      { name: "Auth", description: "API to manage Auth Functions", order: 2 },
      { name: "Tasks", description: "API to manage Tasks", order: 3 },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }], // 🔹 Aplica autenticación globalmente
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: "method",
    },
  }));
};