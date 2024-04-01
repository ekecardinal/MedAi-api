import { IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly modality: string;

  @IsNotEmpty()
  readonly bodyPart: string;

  @IsNotEmpty()
  readonly studyDate: string;

  @IsNotEmpty()
  readonly recieveDate: string;
}
