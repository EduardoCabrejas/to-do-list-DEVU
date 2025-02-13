import request from "supertest";
import { app } from "../server";

describe("Task API", () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123"
    });

    token = res.body.token; // Save the token for use in the next tests
  });

  it("Should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Cookie", `token=${token}`)
      .send({
        title: "Test Task",
        status: "Pending",
        priority: "High"
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });

  it("Should get all tasks", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("Should get a task by ID", async () => {
    const taskRes = await request(app)
      .post("/api/tasks")
      .set("Cookie", `token=${token}`)
      .send({
        title: "Test Task",
        status: "Pending",
        priority: "High"
      });

    const taskId = taskRes.body._id;

    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(taskId);
  });

  it("Should update a task", async () => {
    const taskRes = await request(app)
      .post("/api/tasks")
      .set("Cookie", `token=${token}`)
      .send({
        title: "Test Task",
        status: "Pending",
        priority: "High"
      });

    const taskId = taskRes.body._id;

    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Cookie", `token=${token}`)
      .send({
        title: "Updated Task",
        status: "Completed",
        priority: "Low"
      });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated Task");
  });

  it("Should delete a task", async () => {
    const taskRes = await request(app)
      .post("/api/tasks")
      .set("Cookie", `token=${token}`)
      .send({
        title: "Test Task",
        status: "Pending",
        priority: "High"
      });

    const taskId = taskRes.body._id;

    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task deleted successfully");
  });
});