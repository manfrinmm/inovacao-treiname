import request from "supertest";

import app from "../../src/app";

describe("teste", () => {
  it("should be able to connect to server", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
  });
});
