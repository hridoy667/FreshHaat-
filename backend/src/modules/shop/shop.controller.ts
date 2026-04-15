import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  create(@Body() createShopDto: CreateShopDto, @Req() req:any) {
    const userId=req.user.sub
    console.log(userId)
    return this.shopService.create(userId, createShopDto);
  }

  // GET /shops
  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  // GET /shops/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(id);
  }

  // PATCH /shops/:id (Edit)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(id, updateShopDto);
  }

  // DELETE /shops/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove(id);
  }
}