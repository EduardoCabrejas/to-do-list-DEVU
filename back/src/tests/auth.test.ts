import request from "supertest";
import { app } from "../server";
import { User } from "../entities/User";

describe("Auth API", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  it("Should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123"
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User registered sucessfully");
    expect(res.body.user).toHaveProperty("email", "test@example.com");
  });

  it("Should login and get a token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123"
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("Should not login with incorrect credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wrong@example.com",
      password: "wrongpassword"
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Incorrect credentials");
  });

  it("Should reject access with an expired token", async () => {
    const expiredToken = "expired_token_example";

    const res = await request(app)
      .get("/api/protected-route")
      .set("Authorization", `Bearer ${expiredToken}`);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Token expired or invalid");
  });

  it("Should not register a user with an existing email", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Existing User",
      email: "test@example.com",
      password: "password123"
    });

    const res = await request(app).post("/api/auth/register").send({
      name: "Another User",
      email: "test@example.com",
      password: "newpassword456"
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Email already registered");
  });

  it("Should not register a user with invalid email format", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "invalid-email",
      password: "password123"
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Email is not valid");
  });

  it("Should not register a user with a short password", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "short"
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Password have to be at least 8 characters long");
  });
});