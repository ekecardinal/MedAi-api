import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './schemas/patient.schema';
import { Model } from 'mongoose';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}

  async create(
    createPatientDto: CreatePatientDto,
  ): Promise<{ message: string }> {
    const patient = await this.patientModel.create(createPatientDto);
    return { message: 'Patient added successfully' };
  }

  async findAll(): Promise<Patient[] | null> {
    const patient = await this.patientModel.find();
    return patient;
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientModel.findById(id);
    if (!patient) {
      throw new BadRequestException('Invalid Patient');
    }

    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientModel.findById(id);
    if (!patient) {
      throw new BadRequestException('Invalid Patient');
    }
    const updated = await this.patientModel.findByIdAndUpdate(
      { _id: id },
      updatePatientDto,
    );
    return { message: 'Patient updated successfully' };
  }

  async remove(id: string) {
    const patient = await this.patientModel.findById(id);
    if (!patient) {
      throw new BadRequestException('Invalid Patient');
    }
    const updated = await this.patientModel.findByIdAndDelete(id);
    return { message: 'Deleted successfully' };
  }
}
