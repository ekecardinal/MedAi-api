import { IsNotEmpty, IsOptional } from 'class-validator';

export class WalletLoginDto {
  @IsNotEmpty()
  readonly address: string;

  @IsOptional()
  readonly name: string;
}
