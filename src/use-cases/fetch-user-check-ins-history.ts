import { CheckInsRepository } from "../repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryUseCaseyRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHistoryUseCaseyResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCasey {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseyRequest): Promise<FetchUserCheckInsHistoryUseCaseyResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return {
      checkIns,
    };
  }
}
