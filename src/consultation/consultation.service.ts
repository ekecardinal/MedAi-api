import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Consultation } from './schemas/consultation.schema';
import { Model } from 'mongoose';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectModel(Consultation.name)
    private consultationModel: Model<Consultation>,
  ) {}

  async create(
    createConsultationDto: CreateConsultationDto,
  ): Promise<{ message: string }> {
    const consultation = await this.consultationModel.create(
      createConsultationDto,
    );
    return { message: 'Consultation submitted successfully' };
  }

  async findAll(): Promise<Consultation[] | null> {
    const consultation = await this.consultationModel
      .find()
      .populate('userId', 'name');

    return consultation;
  }

  async findOne(id: string): Promise<Consultation> {
    const consultation = await this.consultationModel.findById(id);
    if (!consultation) {
      throw new BadRequestException('Invalid Consultation');
    }
    return consultation;
  }

  async update(
    id: string,
    updateConsultationDto: UpdateConsultationDto,
  ): Promise<{ message: string }> {
    const consultation = await this.consultationModel.findById(id);
    if (!consultation) {
      throw new BadRequestException('Invalid Consultation');
    }
    const updated = await this.consultationModel.findByIdAndUpdate(
      { id: id },
      updateConsultationDto,
    );
    return { message: 'Consultation updated successfully' };
  }

  async remove(id: string): Promise<{ message: string }> {
    const consultation = await this.consultationModel.findById(id);
    if (!consultation) {
      throw new BadRequestException('Invalid Consultation');
    }
    const deleted = await this.consultationModel.findByIdAndDelete(id);
    return { message: 'Consultation deleted' };
  }
}
