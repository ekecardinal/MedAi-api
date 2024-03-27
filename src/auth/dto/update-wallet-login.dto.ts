import { IsNotEmpty } from 'class-validator';

export class WalletLoginUpdateDto {
  @IsNotEmpty()
  readonly name: string;
}
