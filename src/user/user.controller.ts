import { Controller, Get, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';

@Controller('api/v1/user')
@ApiTags("User Management")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @Roles(['admin'])
    async findAll(): Promise<ResponseDto<User[]>> {
        const users = await this.userService.findAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Users retrieved successfully',
            data: users,
        };
    }

    @Get(':id')
    @Roles(['admin', 'user'])
    async findOne(@Param('id') id: string): Promise<ResponseDto<User>> {
        const user = await this.userService.findOne(+id);
        return {
            statusCode: HttpStatus.OK,
            message: 'User retrieved successfully',
            data: user,
        };
    }

    @Patch(':id')
    @Roles(['admin', 'user'])
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<ResponseDto<User>> {
        const updatedUser = await this.userService.update(+id, updateUserDto);
        return {
            statusCode: HttpStatus.OK,
            message: 'User updated successfully',
            data: updatedUser,
        };
    }

    @Delete(':id')
    @Roles(['admin', 'user'])
    async remove(@Param('id') id: string): Promise<ResponseDto<null>> {
        await this.userService.remove(+id);
        return {
            statusCode: HttpStatus.OK,
            message: `User with ID ${id} removed successfully`,
            data: null,
        };
    }
}
