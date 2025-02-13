import request from "supertest";
import { app } from "../server";

describe("User API", () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123"
    });

    token = res.body.token; // Save the token for use in the next tests
  });

  it("Should get user details", async () => {
    const res = await request(app)
      .get("/api/user/me")
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe("test@example.com");
  });

  it("Should update user data", async () => {
    const res = await request(app)
      .put("/api/user/me")
      .set("Cookie", `token=${token}`)
      .send({ name: "Updated User" });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Updated User");
  });

  it("Should delete user", async () => {
    const res = await request(app)
      .delete("/api/user/me")
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
  });
});