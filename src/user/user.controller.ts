import { Controller, Get, Body, Patch, Param, Delete, HttpStatus, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/v1/users')
@ApiTags("User Management")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
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
    async findOne(@Req() req: any, @Param('id') id: string): Promise<ResponseDto<User>> {
        const userValid = await this.userService.validateUser(req.user.role, +req.user.id, +id)
        if (!userValid) throw new ForbiddenException('You are not allowed to retrieve this user data');

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
        @Req() req: any,
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<ResponseDto<User>> {
        const userValid = await this.userService.validateUser(req.user.role, +req.user.id, +id)
        if (!userValid) throw new ForbiddenException('You are not allowed to update this user');

        const updatedUser = await this.userService.update(+id, updateUserDto);
        return {
            statusCode: HttpStatus.OK,
            message: 'User updated successfully',
            data: updatedUser,
        };
    }

    @Delete(':id')
    @Roles(['admin', 'user'])
    async remove(@Req() req: any, @Param('id') id: string): Promise<ResponseDto<null>> {
        const userValid = await this.userService.validateUser(req.user.role, +req.user.id, +id)
        if (!userValid) throw new ForbiddenException('You are not allowed to delete this user');

        await this.userService.remove(+id);
        return {
            statusCode: HttpStatus.OK,
            message: `User with ID ${id} removed successfully`,
            data: null,
        };
    }
}
