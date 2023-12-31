class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search(searchFields = ["name"]) {
        const keyword = this.queryStr.keyword
            ? {
                  $or: searchFields.map((field) => ({
                      [field]: {
                          $regex: this.queryStr.keyword,
                          $options: "i",
                      },
                  })),
              }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit", "sort", "findUser"];

        removeFields.forEach((key) => delete queryCopy[key]);

        // Filter For Price and Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

    sort() {
        let sortVal = {};

        switch (this.queryStr.sort) {
            case "latest":
                sortVal = { createdAt: -1 };
                break;
            case "oldest":
                sortVal = { createdAt: 1 };
                break;
            case "highestPrice":
                sortVal = { price: -1 };
                break;
            case "lowestPrice":
                sortVal = { price: 1 };
                break;
            default:
                break;
        }

        this.query = this.query.sort(sortVal);
        return this;
    }

    findUser() {
        const user = this.queryStr.findUser
            ? {
                  $or: [
                      {
                          name: {
                              $regex: this.queryStr.findUser,
                              $options: "i",
                          },
                      },
                      {
                          email: {
                              $regex: this.queryStr.findUser,
                              $options: "i",
                          },
                      },
                  ],
              }
            : {};

        this.query = this.query.find({ ...user });
        return this;
    }
}

module.exports = ApiFeatures;
