type IOptions = {
   page?: number;
   limit?: number;
   sortOrder?: string;
   sortBy: string;
};

type IOptionsResult = IOptions & {
   skip: number;
};

export const generatePaginateAndSortOptions = (
   paginateAndSortOptions: IOptions
): IOptionsResult => {
   const page: number = Number(paginateAndSortOptions.page) || 1;
   const limit: number = Number(paginateAndSortOptions.limit) || 10;
   const skip: number = (Number(page) - 1) * limit;

   const sortBy: string = paginateAndSortOptions.sortBy || 'createdAt';
   const sortOrder: string = paginateAndSortOptions.sortOrder || 'desc';

   return {
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
   };
};
