import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymUseCase } from "./search-gym";

describe("Search Gym Use Case", () => {
  let gymsRepository: InMemoryGymsRepository;
  let sut: SearchGymUseCase;

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it("should be able to search for a gym", async () => {
    await gymsRepository.create({
      title: "gym-01",
      description: null,
      phone: null,
      latitude: -10.9092876,
      longitude: -37.0326582,
    });

    await gymsRepository.create({
      title: "gym-02",
      description: null,
      phone: null,
      latitude: -10.9092876,
      longitude: -37.0326582,
    });

    const { gyms } = await sut.execute({
      query: "gym-01",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "gym-01" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gym-${i}`,
        description: null,
        phone: null,
        latitude: -10.9092876,
        longitude: -37.0326582,
      });
    }

    const { gyms } = await sut.execute({
      query: "gym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "gym-21" }),
      expect.objectContaining({ title: "gym-22" }),
    ]);
  });
});
