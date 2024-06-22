import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";

describe("Create gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Generic Gym",
        description: "A generic gym for workouts",
        phone: "7999999999",
        latitude: -10.9092876,
        longitude: -37.0326582,
      });

    expect(response.statusCode).toEqual(201);
  });
});
