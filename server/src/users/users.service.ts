import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FindUserDto } from './dto/find-user.dto';


// const users = [{
//   userId: 1,
//   username: 'john',
//   password: 'changeme',
// },
// {
//   userId: 2,
//   username: 'maria',
//   password: 'guess',
// }]

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.insert(createUserDto)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(findUserDto: FindUserDto) {
    return this.userRepository.findOneBy(findUserDto)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }
}
