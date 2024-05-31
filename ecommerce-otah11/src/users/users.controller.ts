/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Put, Query, UseGuards  } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/admin.guard';
import { Roles } from 'src/roles/role.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    @HttpCode(200)
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query('page') page ='1', @Query('limit') limit = '5'): Promise<Omit<User, 'password'>[]> {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        return this.usersService.getUsers(pageNumber, limitNumber);
    }
    

    @Get(':id')
    @UseGuards(AuthGuard)

    getUserById(@Param('id',ParseUUIDPipe) id: string) : Promise<Omit<User, 'password'>> {
        return this.usersService.getUserById(id);
        
    }

   

    @Put (':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id',ParseUUIDPipe) id: string, @Body() user: Partial<User>): Promise<User> {
        return this.usersService.updateUser((id), user);
    }

  
    
    @Delete(':id')
    @UseGuards(AuthGuard)
    async remove(@Param('id',ParseUUIDPipe) id: string) {
        const user = await this.usersService.deleteUser(id)
        
        return {message: "Usuario eliminado", user: user}
    }
}
