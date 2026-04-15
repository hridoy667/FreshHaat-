import { IsLatitude, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateShopDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    districtName: string; 

    @IsOptional()
    latitude?: number;

    @IsOptional()
    longitude?: number;
}


// id          String                                @id @default(uuid())
// name        String
// description String
// imageUrl    String[]
// categories productCategories[]
// products    products[]
// userId      String
// user        User                                  @relation(fields: [userId], references: [id])
// district    districts?                            @relation(fields: [districtId], references: [id])
// districtId  Int?
// reviews     review[]
// latitude    Float?
// longitude   Float?
// location    Unsupported("geometry(Point, 4326)")?
// farmers     Farmer[]
// createdAt   DateTime                              @default(now())
// updatedAt   DateTime                              @updatedAt