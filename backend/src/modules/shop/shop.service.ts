import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import * as fs from 'fs';
import * as path from 'path';
import { processAndSaveImage } from 'src/common/utils/file-upload.util';
import { generateAvatarUrl } from 'src/common/utils/fileUrl.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService,
    private readonly configService: ConfigService
  ) { }

  async create(
    userId: string,
    dto: CreateShopDto,
    files?: { logo?: Express.Multer.File[], photos?: Express.Multer.File[] }
  ) {

    const baseUrl = this.configService.get<string>('app.url') || '';
    // 1. Verify District
    const district = await this.prisma.districts.findUnique({
      where: { name: dto.districtName }
    });

    if (!district) {
      throw new BadRequestException(
        `District '${dto.districtName}' does not exist.`
      );
    }

    // 2. Handle Logo
    let logoUrl: string | null = null;
    if (files?.logo?.[0]) {
      logoUrl = await processAndSaveImage(files.logo[0], 'shops');
    }

    // 3. Handle Photos
    let photoUrls: string[] = [];
    if (files?.photos?.length) {
      photoUrls = await Promise.all(
        files.photos.map(file => processAndSaveImage(file, 'shops'))
      );
    }

    // 4. Merge logo into images (BEST PRACTICE)
    if (logoUrl) {
      photoUrls.unshift(logoUrl); // first image = logo
    }

    try {
      const shop = await this.prisma.shop.create({
        data: {
          name: dto.name,
          description: dto.description,

          imageUrl: photoUrls,
          latitude: dto.latitude ?? null,
          longitude: dto.longitude ?? null,

          district: {
            connect: { name: dto.districtName }
          },

          user: {
            connect: { id: userId }
          },

          ...(dto.categoryIds && {
            categories: {
              connect: dto.categoryIds.map(id => ({ id: Number(id) }))
            }
          }),
        },
        include: {
          district: true,
          categories: true,
          user: {
            select: { first_name: true, email: true }
          }
        }
      });

      return {
        success:true,
        data:{
          ...shop,
        imageUrl: shop.imageUrl.map(path => `${baseUrl}${path}`),
        }
      };

    } catch (error) {
      throw new BadRequestException(
        `Failed to create shop: ${error.message || 'Unknown error'}`
      );
    }
  }

  // Helper method to view all shops
  async findAll() {
    return this.prisma.shop.findMany({
      include: {
        district: true,
        _count: {
          select: { products: true }
        }
      }
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
    return await this.prisma.shop.update({
      where: { id },
      data: {
        // 1. Spread only the simple fields (name, description, etc.)
        name: dto.name,
        description: dto.description,
        latitude: dto.latitude ? parseFloat(dto.latitude.toString()) : undefined,
        longitude: dto.longitude ? parseFloat(dto.longitude.toString()) : undefined,

        // 2. Handle the relationship field separately
        // This tells Prisma exactly how to handle the districtName
        ...(dto.districtName && {
          district: {
            connect: { name: dto.districtName }
          }
        })
      },
    });
  }

  // 5. Delete Shop
  async remove(id: string) {
    return this.prisma.shop.delete({
      where: { id },
    });
  }
}