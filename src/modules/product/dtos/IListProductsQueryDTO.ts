export interface IListProductsQueryDTO {
  page?: number;
  limit?: number;
  name?: string;
  sortBy?: string;
  order?: "ASC" | "DESC";
}
