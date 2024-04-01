import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { Consultation } from './schemas/consultation.schema';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  async create(
    @Body() createConsultationDto: CreateConsultationDto,
  ): Promise<{ message: string }> {
    return await this.consultationService.create(createConsultationDto);
  }

  @Get()
  async findAll(): Promise<Consultation[] | null> {
    return await this.consultationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Consultation> {
    return await this.consultationService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ): Promise<{ message: string }> {
    return await this.consultationService.update(id, updateConsultationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.consultationService.remove(id);
  }
}
