import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

describe("Fetch Nearby Gyms Use Case", () => {
  let gymsRepository: InMemoryGymsRepository;
  let sut: FetchNearbyGymsUseCase;

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -10.9092876,
      longitude: -37.0326582,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -12.9634288,
      longitude: -38.4771441,
    });

    const { gyms } = await sut.execute({
      userLatitude: -10.9092876,
      userLongitude: -37.0326582,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
