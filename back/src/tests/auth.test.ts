import request from "supertest";
import {app} from "../server";
import { User } from "../entities/User";

describe("Auth API", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  it("Have to register a new User", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123"
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Usuario registrado exitosamente");
    expect(res.body.user).toHaveProperty("email", "test@example.com");
  });

  it("Have to login and get a Token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123"
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});