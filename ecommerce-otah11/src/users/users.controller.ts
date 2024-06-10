/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Put, Query, UseGuards  } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/admin.guard';
import { Roles } from '../roles/role.decorator';
import { Role } from '../roles/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiBearerAuth()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get all users', description: 'Recibe por query la pagina y el limite de items por pagina y retorna un array de users' })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5): Promise<Omit<User, 'password'>[]> {
        return await this.usersService.getUsers(page, limit);
    }
    
    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getUserById(@Param('id',ParseUUIDPipe) id: string) : Promise<Omit<User, 'password'>> {
        return await this.usersService.getUserById(id);   
    }

    @Put (':id')
    @ApiBearerAuth()
    @ApiBody({type: Object})
    @UseGuards(AuthGuard)
    async updateUser(@Param('id',ParseUUIDPipe) id: string, @Body() user: Partial<User>): Promise<User> {
        return await this.usersService.updateUser((id), user);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async deleteUser(@Param('id',ParseUUIDPipe) id: string) {
        return  await this.usersService.deleteUser(id)
    }
}
