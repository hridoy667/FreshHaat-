import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  // 1. Create Shop
  async create(userId: string, dto: CreateShopDto) {
    return this.prisma.shop.create({
      data: {
        ...dto,
        userId, // The owner of the shop
      },
      include: {
        district: true, // Returns the full district lat/long
      },
    });
  }

  // 2. View All Shops
  async findAll() {
    return this.prisma.shop.findMany({
      include: {
        district: {
          select: { name: true, latitude: true, longitude: true }
        },
        _count: {
          select: { products: true }
        }
      },
    });
  }

  // 3. View Single Shop (Detail)
  async findOne(id: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
      include: {
        district: true,
        user: { select: { first_name: true, last_name: true, email: true } },
        products: true
      },
    });

    if (!shop) throw new NotFoundException(`Shop with ID ${id} not found`);
    return shop;
  }

  // 4. Update/Edit Shop
  async update(id: string, dto: UpdateShopDto) {
    try {
      return await this.prisma.shop.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new NotFoundException('Could not update shop. Check if ID is valid.');
    }
  }

  // 5. Delete Shop
  async remove(id: string) {
    return this.prisma.shop.delete({
      where: { id },
    });
  }
}