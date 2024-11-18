import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.authService.register(createUserDto)
        return {
            statusCode: HttpStatus.CREATED,
            message: 'User created successfully',
            data: user,
        };
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const loginResponse = await this.authService.login(loginUserDto)
        return {
            statusCode: HttpStatus.OK,
            message: 'Login success',
            data: loginResponse,
        };
    }
}