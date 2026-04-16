import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiConsumes } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';


@UseGuards(JwtAuthGuard)
@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'photos', maxCount: 5 },
    ], {
      storage: memoryStorage(),
      limits: { fileSize: 8 * 1024 * 1024 }, // 8MB limit
    })
  )
  async create(
    @Body() dto: CreateShopDto,
    @Req() req,
    @UploadedFiles() files: { logo?: Express.Multer.File[], photos?: Express.Multer.File[] },
  ) {
    const userId = req.user.userId;
    return this.shopService.create(userId, dto, files);
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