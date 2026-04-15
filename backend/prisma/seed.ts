/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import { hashPassword } from 'src/modules/auth/helper.util';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const districts = [
  // Dhaka Division
  { id: 1, name: 'Dhaka', latitude: 23.8103, longitude: 90.4125 },
  { id: 2, name: 'Gazipur', latitude: 24.0023, longitude: 90.4264 },
  { id: 3, name: 'Narayanganj', latitude: 23.6238, longitude: 90.5000 },
  { id: 4, name: 'Tangail', latitude: 24.2513, longitude: 89.9167 },
  { id: 5, name: 'Faridpur', latitude: 23.6071, longitude: 89.8429 },
  { id: 6, name: 'Manikganj', latitude: 23.8644, longitude: 90.0047 },
  { id: 7, name: 'Munshiganj', latitude: 23.5422, longitude: 90.5353 },
  { id: 8, name: 'Rajbari', latitude: 23.7574, longitude: 89.6444 },
  { id: 9, name: 'Madaripur', latitude: 23.1641, longitude: 90.1896 },
  { id: 10, name: 'Gopalganj', latitude: 23.0050, longitude: 89.8267 },
  { id: 11, name: 'Shariatpur', latitude: 23.2423, longitude: 90.4348 },
  { id: 12, name: 'Narsingdi', latitude: 23.9230, longitude: 90.7181 },
  { id: 13, name: 'Kishoreganj', latitude: 24.4449, longitude: 90.7766 },

  // Chattogram Division
  { id: 14, name: 'Chattogram', latitude: 22.3569, longitude: 91.7832 },
  { id: 15, name: "Cox's Bazar", latitude: 21.4272, longitude: 92.0058 },
  { id: 16, name: 'Cumilla', latitude: 23.4607, longitude: 91.1809 },
  { id: 17, name: 'Feni', latitude: 23.0159, longitude: 91.3976 },
  { id: 18, name: 'Brahmanbaria', latitude: 23.9571, longitude: 91.1119 },
  { id: 19, name: 'Noakhali', latitude: 22.8696, longitude: 91.0994 },
  { id: 20, name: 'Lakshmipur', latitude: 22.9425, longitude: 90.8417 },
  { id: 21, name: 'Chandpur', latitude: 23.2333, longitude: 90.6500 },
  { id: 22, name: 'Rangamati', latitude: 22.6533, longitude: 92.1750 },
  { id: 23, name: 'Khagrachhari', latitude: 23.1192, longitude: 91.9847 },
  { id: 24, name: 'Bandarban', latitude: 22.1953, longitude: 92.2184 },

  // Rajshahi Division
  { id: 25, name: 'Rajshahi', latitude: 24.3745, longitude: 88.6042 },
  { id: 26, name: 'Bogra', latitude: 24.8481, longitude: 89.3730 },
  { id: 27, name: 'Pabna', latitude: 24.0063, longitude: 89.2493 },
  { id: 28, name: 'Sirajganj', latitude: 24.4534, longitude: 89.7077 },
  { id: 29, name: 'Naogaon', latitude: 24.8054, longitude: 88.9479 },
  { id: 30, name: 'Natore', latitude: 24.4102, longitude: 88.9595 },
  { id: 31, name: 'Chapai Nawabganj', latitude: 24.5965, longitude: 88.2710 },
  { id: 32, name: 'Joypurhat', latitude: 25.0947, longitude: 89.0209 },

  // Khulna Division
  { id: 33, name: 'Khulna', latitude: 22.8456, longitude: 89.5403 },
  { id: 34, name: 'Jessore', latitude: 23.1664, longitude: 89.2137 },
  { id: 35, name: 'Satkhira', latitude: 22.7185, longitude: 89.0705 },
  { id: 36, name: 'Bagerhat', latitude: 22.6516, longitude: 89.7859 },
  { id: 37, name: 'Kushtia', latitude: 23.9013, longitude: 89.1204 },
  { id: 38, name: 'Magura', latitude: 23.4873, longitude: 89.4199 },
  { id: 39, name: 'Meherpur', latitude: 23.7622, longitude: 88.6318 },
  { id: 40, name: 'Narail', latitude: 23.1725, longitude: 89.5126 },
  { id: 41, name: 'Chuadanga', latitude: 23.6401, longitude: 88.8418 },
  { id: 42, name: 'Jhenaidah', latitude: 23.5450, longitude: 89.1726 },

  // Sylhet Division
  { id: 43, name: 'Sylhet', latitude: 24.8949, longitude: 91.8687 },
  { id: 44, name: 'Moulvibazar', latitude: 24.4829, longitude: 91.7705 },
  { id: 45, name: 'Habiganj', latitude: 24.3749, longitude: 91.4124 },
  { id: 46, name: 'Sunamganj', latitude: 25.0658, longitude: 91.3958 },

  // Barisal Division
  { id: 47, name: 'Barisal', latitude: 22.7010, longitude: 90.3535 },
  { id: 48, name: 'Bhola', latitude: 22.6859, longitude: 90.6417 },
  { id: 49, name: 'Patuakhali', latitude: 22.3596, longitude: 90.3297 },
  { id: 50, name: 'Pirojpur', latitude: 22.5841, longitude: 89.9720 },
  { id: 51, name: 'Jhalokati', latitude: 22.6422, longitude: 90.2003 },
  { id: 52, name: 'Barguna', latitude: 22.1504, longitude: 90.1221 },

  // Rangpur Division
  { id: 53, name: 'Rangpur', latitude: 25.7439, longitude: 89.2752 },
  { id: 54, name: 'Dinajpur', latitude: 25.6217, longitude: 88.6354 },
  { id: 55, name: 'Kurigram', latitude: 25.8054, longitude: 89.6361 },
  { id: 56, name: 'Gaibandha', latitude: 25.3287, longitude: 89.5280 },
  { id: 57, name: 'Lalmonirhat', latitude: 25.9126, longitude: 89.4426 },
  { id: 58, name: 'Nilphamari', latitude: 25.9317, longitude: 88.8560 },
  { id: 59, name: 'Panchagarh', latitude: 26.3411, longitude: 88.5541 },
  { id: 60, name: 'Thakurgaon', latitude: 26.0337, longitude: 88.4617 },

  // Mymensingh Division
  { id: 61, name: 'Mymensingh', latitude: 24.7471, longitude: 90.4203 },
  { id: 62, name: 'Jamalpur', latitude: 24.9197, longitude: 89.9454 },
  { id: 63, name: 'Netrokona', latitude: 24.8705, longitude: 90.7273 },
  { id: 64, name: 'Sherpur', latitude: 25.0188, longitude: 90.0175 },
];

const categories = [
  { id: 1, name: 'Vegetables' },
  { id: 2, name: 'Fruits' },
  { id: 3, name: 'Rice & Grains' },
  { id: 4, name: 'Poultry & Eggs' },
  { id: 5, name: 'Fish' },
  { id: 6, name: 'Meat' },
  { id: 7, name: 'Dairy' },
  { id: 8, name: 'Organic' },
  { id: 9, name: 'Spices & Oils' },
];
async function main() {

  console.log('🚀 Syncing Districts...');

  // seed.ts
  for (const d of districts) {
    await prisma.districts.upsert({
      where: { name: d.name },
      update: {
        latitude: d.latitude,
        longitude: d.longitude
      },
      create: {
        id: d.id, // Add this line
        name: d.name,
        latitude: d.latitude,
        longitude: d.longitude,
      },
    });
  }

  console.log('✅ 64 Districts Seeded.');

  console.log('🌱 Seeding FreshHaat Categories...');
  for (const cat of categories) {
    await prisma.productCategories.upsert({
      where: { id: cat.id },
      update: { name: cat.name },
      create: { id: cat.id, name: cat.name },
    });
  }
  console.log('✅ Categories successfully seeded.');

  // ✅ Moved outside try block and actually called
  console.log('👑 Seeding Admin...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@freshhaat.com' },
    update: { password: hashedPassword, type: 'ADMIN', isVerified: true },
    create: {
      email: 'admin@freshhaat.com',
      password: hashedPassword,
      first_name: 'Super',
      last_name: 'Admin',
      userName: 'admin',
      type: 'ADMIN',
      isVerified: true,
      status: 1,
    },
  });
  console.log('✅ Admin seeded successfully.');
}
main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });