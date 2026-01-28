import { FilterQuery, Model, Query } from "mongoose";

type QueryParams = Record<string, any>;

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  private params: QueryParams;
  private filters: FilterQuery<T> = {};

  constructor(query: Query<T[], T>, params: QueryParams = {}) {
    this.modelQuery = query;
    this.params = params;
  }

  /* ============== SEARCH ============== */

  search(fields: string[]) {
    const term = this.params.searchTerm;

    if (term && fields.length) {
      this.filters.$or = fields.map((f) => ({
        [f]: { $regex: term, $options: "i" },
      })) as any;
    }

    return this;
  }

  /* ============== FILTER ============== */

  filter() {
    // IMPORTANT: Exclude ALL params that are NOT direct MongoDB field matches
    // These include: pagination, sorting, search, context/scope params
    const excluded = [
      // Pagination & Search
      "searchTerm",
      "sort",
      "page",
      "limit",
      "fields",
      // Context/Scope params (handled by service or ContextScopePlugin)
      "organization",
      "organizationId",
      "organization_id",
      "businessUnit",
      "businessUnitId",
      "businessUnit_id",
      "outlet",
      "outletId",
      "outlet_id",
      // Common utility params
      "all",
      "populate",
      "select",
    ];

    const obj = { ...this.params };

    excluded.forEach((k) => delete obj[k]);

    let str = JSON.stringify(obj);

    str = str.replace(/"(gt|gte|lt|lte|in|ne)":/g, '"$$$1":');

    const parsed = JSON.parse(str);

    this.filters = {
      ...this.filters,
      ...parsed,
    };

    return this;
  }

  /* ============== SORT ============== */

  sort(defaultSort = "-createdAt") {
    const sort = this.params.sort?.split(",").join(" ") || defaultSort;

    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  /* ============== PAGINATION ============== */

  paginate(defaultLimit = 10) {
    const page = Number(this.params.page) || 1;
    const limit = Number(this.params.limit) || defaultLimit;

    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  /* ============== FIELDS ============== */

  fields(defaultSelect = "-__v") {
    const fields = this.params.fields?.split(",").join(" ") || defaultSelect;

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }

  /* ============== BUILD ============== */

  build() {
    // Use .where() to merge filters onto the existing query
    // DO NOT use .find() here - it triggers Mongoose hooks again!
    if (Object.keys(this.filters).length) {
      this.modelQuery = this.modelQuery.where(this.filters);
    }

    return this.modelQuery;
  }

  /* ============== COUNT ============== */

  async count(model: Model<T>) {
    const finalFilter = {
      ...(this.modelQuery.getFilter() as any),
      ...this.filters,
    };

    const total = await model.countDocuments(finalFilter);

    const page = Number(this.params.page) || 1;
    const limit = Number(this.params.limit) || 10;

    return {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    };
  }

  async countTotal() {
    const finalFilter = {
      ...(this.modelQuery.getFilter() as any),
      ...this.filters,
    };

    const total = await (this.modelQuery as any).model.countDocuments(
      finalFilter,
    );

    const page = Number(this.params.page) || 1;
    const limit = Number(this.params.limit) || 10;

    return {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    };
  }
}
