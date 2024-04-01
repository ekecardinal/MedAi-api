import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPassword } from './dto/reset-password.dto';
import { WalletLoginDto } from './dto/wallet-login.dto';
import { WalletLoginUpdateDto } from './dto/update-wallet-login.dto';

@Controller('auth/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createAuthDto: CreateAuthDto): Promise<{
    token: string;
    user: object;
    message: string;
  }> {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  async loing(
    @Body() loginDto: LoginDto,
  ): Promise<{ token: string; user: object; message: string }> {
    return await this.authService.login(loginDto);
  }

  @Post('wallet-login')
  async walletLogin(@Body() walletLogin: WalletLoginDto) {
    return await this.authService.walletLogin(walletLogin);
  }

  @UseGuards(AuthenticationGuard)
  @Put('wallet-update')
  async walletUpdate(@Body() wallet: WalletLoginUpdateDto, @Req() { token }) {
    return await this.authService.updateWallet(wallet, token.id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('')
  async findAll() {
    return await this.authService.findAll();
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return await this.authService.update(id, updateAuthDto);
  }

  @Put('reset/:id')
  async resetPassword(
    @Param('id') id: string,
    @Body() updateAuthDto: ResetPassword,
  ) {
    return await this.authService.resetPassword(id, updateAuthDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.authService.remove(id);
  }
}
