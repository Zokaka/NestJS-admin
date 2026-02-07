export declare class CreateCatDto {
    name: string;
    age: number | undefined;
    breed: string | undefined;
}
export declare class ListAllEntities {
    limit: number | undefined;
}
export declare class UpdateCatDto {
    id: number;
    name?: string;
    age?: number;
    breed?: string;
}
