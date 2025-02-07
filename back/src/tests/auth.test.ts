import request from "supertest";
import {app} from "../server"; // Asegúrate de importar tu app correctamente
import { User } from "../entities/User";

describe("Auth API", () => {
  beforeAll(async () => {
    await User.deleteMany({}); // Limpia la base de datos antes de las pruebas
  });

  it("Debe registrar un nuevo usuario", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123"
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Usuario registrado exitosamente");
    expect(res.body.user).toHaveProperty("email", "test@example.com");
  });

  it("Debe iniciar sesión y recibir un token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123"
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});