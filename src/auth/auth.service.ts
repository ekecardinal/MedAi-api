import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './schemas/user.schema';
import { ResetPassword } from './dto/reset-password.dto';
import { WalletLoginDto } from './dto/wallet-login.dto';
import { WalletUser } from './schemas/wallet-user.schema';
import { WalletLoginUpdateDto } from './dto/update-wallet-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(WalletUser.name)
    private walletModel: Model<WalletUser>,
    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    const userExist = await this.userModel.findOne({
      email: email!,
    });
    if (userExist) {
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      data: { ...createAuthDto, password: hashedPassword },
    });

    const token = this.jwtService.sign({ id: user.id });
    // let token = 'ghajkwiueygtdfbnxjsak';
    return {
      token,
      user: {
        email: user.email,
        name: user.name,
        id: user.id,
      },
      message: 'Registered Successfully',
    };
  }

  // Staff Login
  async login(
    loginDto: LoginDto,
  ): Promise<{ token: string; user: object; message: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({
      email: email,
    });
    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = this.jwtService.sign({ id: user.id });

    return {
      token,
      user: {
        email: user.email,
        name: user.name,
        id: user.id,
      },
      message: 'Login Successfully',
    };
  }

  async walletLogin(walletLogin: WalletLoginDto) {
    const { address } = walletLogin;
    const wallet = await this.walletModel.findOne({ address: address });
    if (wallet) {
      const token = this.jwtService.sign({ id: wallet.id });
      return {
        token,
        user: { name: wallet.name },
        message: 'Login successful',
      };
    } else {
      const user = await this.walletModel.create(walletLogin);
      const token = this.jwtService.sign({ id: user.id });
      return { token, user: { name: user.name }, message: 'Login successful' };
    }
  }

  async updateWallet(wallet: WalletLoginUpdateDto, id: string) {
    return await this.walletModel.findByIdAndUpdate(
      { id: id },
      { name: wallet.name },
    );
  }

  async findAll() {
    return await this.userModel.find();
  }

  // Update Staff
  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<User> {
    const user = await this.userModel.findById({
      id: id,
    });

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    return await this.userModel.findByIdAndUpdate({
      id: id,
      data: updateAuthDto,
    });
  }

  //Reset Password
  async resetPassword(id: string, updateAuthDto: ResetPassword) {
    const password = updateAuthDto.password;
    const user = await this.userModel.findOne({
      id: id,
    });

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userModel.findByIdAndUpdate({
      id: id,

      password: hashedPassword,
    });
  }

  //Delete User
  async remove(id: string) {
    const user = await this.userModel.findOne({
      id: id,
    });

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    await this.userModel.findOneAndDelete({
      id: id,
    });
    return { message: 'User deleted successfully' };
  }
}
