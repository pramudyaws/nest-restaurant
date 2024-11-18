import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async register(createUserDto: CreateUserDto) {
        const emailExist = await this.userRepository.exists({ where: { email: createUserDto.email } })
        if (emailExist) {
            throw new ConflictException('The user email already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({ ...createUserDto, password: hashedPassword })
        await this.userRepository.save(user)
        return { ...user, password: undefined };
    }
}