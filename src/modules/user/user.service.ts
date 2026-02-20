import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { createUserDto } from "./create-user.dto";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class UserService {
  /* 通过下面可以实现连接数据库的增删改查 */
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  create(createUserDto: createUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.nickname = createUserDto.nickname;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    user.avatar = createUserDto.avatar;
    user.active = 1;

    return this.usersRepository.save(user);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username })
  }
}