import request from "supertest";

import app from "../../src/app";

describe("User", () => {
  it("should be able to create a new user", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
  });
});
