import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    async findAll() {
        const users = await this.userRepository.find();
        return users.map((user) => ({ ...user, password: undefined }));
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
        return { ...user, password: undefined };
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);

        const { email } = updateUserDto;
        if (email) {
            const emailExist = await this.userRepository.exists({
                where: { email, id: Not(id) },
            });
            if (emailExist) {
                throw new ConflictException('The user email already exists');
            }
        }

        Object.assign(user, updateUserDto);
        const updatedUser = await this.userRepository.save(user);
        return { ...updatedUser, password: undefined };
    }

    async remove(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
        await this.userRepository.remove(user);
    }

    async validateUser(
        requesterRole: string,
        requesterId: number,
        userId: number,
    ) {
        return requesterRole === 'user' && requesterId === userId;
    }
}
