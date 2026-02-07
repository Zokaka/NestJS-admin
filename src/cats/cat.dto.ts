export class CreateCatDto {
  name!: string;
  age: number | undefined;
  breed: string | undefined;
}

export class ListAllEntities {
  limit: number | undefined;
}

export class UpdateCatDto {
  name: string | undefined;
}
