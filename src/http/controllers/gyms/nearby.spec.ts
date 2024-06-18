import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";

describe("Search nearby gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Generic Gym 1",
        description: "A generic gym for workouts",
        phone: "7999999998",
        latitude: -10.9092876,
        longitude: -37.0326582,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Generic Gym 2",
        description: "Another generic gym for workouts",
        phone: "7999999999",
        latitude: -12.9634288,
        longitude: -38.4771441,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -10.9092876,
        longitude: -37.0326582,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Generic Gym 1",
      }),
    ]);
  });
});
