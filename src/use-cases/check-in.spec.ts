import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { MaxDistanceError } from "./errors/max-distance-error";
import { CheckInUseCase } from "./check-in";
import { Decimal } from "@prisma/client/runtime/library";

describe("Check-in Use Case", () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let gymsRepository: InMemoryGymsRepository;
  let sut: CheckInUseCase;

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "Academia 1",
      description: "",
      phone: "",
      latitude: -10.9092876,
      longitude: -37.0326582,
    });

    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -10.9092876,
      userLongitude: -37.0326582,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2001, 1, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -10.9092876,
      userLongitude: -37.0326582,
    });

    expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -10.9092876,
        userLongitude: -37.0326582,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2001, 1, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -10.9092876,
      userLongitude: -37.0326582,
    });

    vi.setSystemTime(new Date(2001, 1, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -10.9092876,
      userLongitude: -37.0326582,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    await gymsRepository.create({
      id: "gym-02",
      title: "Academia 1",
      description: "",
      phone: "",
      latitude: new Decimal(-10.9434685),
      longitude: new Decimal(-37.0601584),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -10.9092876,
        userLongitude: -37.0326582,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
