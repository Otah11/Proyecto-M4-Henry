/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Put, Query, UseGuards  } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/admin.guard';
import { Roles } from '../roles/role.decorator';
import { Role } from '../roles/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    @ApiBearerAuth()
    @HttpCode(200)
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query('page') page ='1', @Query('limit') limit = '5'): Promise<Omit<User, 'password'>[]> {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        return this.usersService.getUsers(pageNumber, limitNumber);
    }
    

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)

    getUserById(@Param('id',ParseUUIDPipe) id: string) : Promise<Omit<User, 'password'>> {
        return this.usersService.getUserById(id);
        
    }

   

    @Put (':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    updateUser(@Param('id',ParseUUIDPipe) id: string, @Body() user: Partial<User>): Promise<User> {
        return this.usersService.updateUser((id), user);
    }

  
    
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async remove(@Param('id',ParseUUIDPipe) id: string) {
        const user = await this.usersService.deleteUser(id)
        
        return {message: "Usuario eliminado", user: user}
    }
}
