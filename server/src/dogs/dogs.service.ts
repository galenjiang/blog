import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DogsService {
  constructor(@InjectRepository(Dog) private dogRepository: Repository<Dog>) {}
  create(createDogDto: CreateDogDto) {
    return this.dogRepository.insert(createDogDto)
  }

  findAll() {
    return this.dogRepository.find()
  }

  findOne(id: number) {
    return this.dogRepository.findOneBy({ id })
  }

  update(id: number, updateDogDto: UpdateDogDto) {
    return this.dogRepository.update(id, updateDogDto)
  }

  remove(id: number) {
    return this.dogRepository.delete(id)
  }
}
