import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";

describe("Check-in Use Case", () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let sut: CheckInUseCase;

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2001, 1, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2001, 1, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    vi.setSystemTime(new Date(2001, 1, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
