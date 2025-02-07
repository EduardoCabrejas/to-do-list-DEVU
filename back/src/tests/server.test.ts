import request from "supertest";
import {app} from "../server";

describe("Pruebas del servidor", () => {
  it("Debe responder con 200 en la ruta raíz", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("API funcionando 🚀");
  });
});