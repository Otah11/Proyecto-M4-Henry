/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards  } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.interface';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard)
    getUsers(@Query('page') page ='1', @Query('limit') limit = '5'): Promise<Omit<User, 'password'>[]> {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        return this.usersService.getUsers(pageNumber, limitNumber);
    }
    
    @Get(':id')
    @UseGuards(AuthGuard)

    getUserById(@Param('id') id: string) : Promise<Omit<User, 'password'>> {
        return this.usersService.getUserById(Number(id));
        
    }

    @Post ()
    @UseGuards(AuthGuard)

    createUser(@Body() user: Omit<User, 'id'>): Promise<number> {
        return this.usersService.createUser(user);
    }

    @Put (':id')
    @UseGuards(AuthGuard)

    updateUser(@Param('id') id: string, @Body() user: Partial<User>): Promise<number> {
        return this.usersService.updateUser(Number(id), user);
    }

    @Delete (':id')
    @UseGuards(AuthGuard)

    deleteUser(@Param('id') id: string): Promise<number> {
        return this.usersService.deleteUser(Number(id));
    }
}


// @Get ('profile')
// getUserProfile() {
//     return "Este Endpoint muestra un perfil de usuario";
// }
// @Get('profile/images')
// getUserProfileImages() {
//     return "Este Endpoint muestra las imagenes de perfil de usuario";
// }

// @HttpCode(418)
// @Get ('coffee')
// getCoffee() {
//     return "Este Endpoint no le sale el cafe porque es una tetera (es una prueba que seguramente se quitara, pero quiero tenerlo hecho)";
// }

// @Get('message')
// getMessage(@Res()response: Response) {
//     response.status(200).send('Este es un mensaje de prueba');
// } //asi accedo al response de express

// @Get('request')
// getRequest(@Res()request: Request) {
//     console.log(request);
//     return "Este Endpoint logea un request";
// }