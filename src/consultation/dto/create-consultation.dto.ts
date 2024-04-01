import { IsNotEmpty } from 'class-validator';

export class CreateConsultationDto {
  @IsNotEmpty()
  readonly technique: string;

  @IsNotEmpty()
  readonly comparison: string;

  @IsNotEmpty()
  readonly findings: string;

  @IsNotEmpty()
  readonly impression: string;

  @IsNotEmpty()
  readonly userId: string;
}
