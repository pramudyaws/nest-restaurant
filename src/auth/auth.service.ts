import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
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

    async login(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({ where: { email } })

        // Check whether password is correct or incorrect
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Update lastLoginAt
        user.lastLoginAt = new Date();
        await this.userRepository.save(user);

        // Generate JWT tokens
        const accessToken = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });

        const userData = { ...user, password: undefined }
        
        return { user: userData, accessToken }
    }
}