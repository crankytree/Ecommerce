const category = require("../models/category");
const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");

const create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Create Product Failed", err: err.message });
  }
};

const listAll = async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate("category")
      .populate("subs")
      .sort([["createdAt", "desc"]])
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to get products", err: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const delted = await Product.findOneAndDelete({ slug: req.params.slug }).exec();

    return res.json(delted);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Delete Product Failed", err: err.message });
  }
};

const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate("subs").exec();

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Can't get Product", err: err.message });
  }
};

const update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updatedProduct = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
    }).exec();

    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Can't update  Product", err: err.message });
  }
};

// const list = async (req, res) => {
//   try {
//     // sort = createdAt/updatedAt
//     // order = ascending/descending
//     // limit = 3
//     const { sort, order, limit } = req.body;

//     const products = await Product.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//       res.json(products);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: "Can't get  Products", err: err.message });
//   }
// };

// WITH PAGINATION
const list = async (req, res) => {
  try {
    // sort = createdAt/updatedAt
    // order = ascending/descending
    // limit = 3
    const { sort, order, page, limit } = req.body;

    const currPage = page || 1;
    const perPage = limit || 3;

    const products = await Product.find({})
      .skip((currPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Can't get  Products", err: err.message });
  }
};

const productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Can't get Products", err: err.message });
  }
};

const productStart = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;

    let existingRatingObject = product.ratings.find(
      (ele) => ele.postedBy.toString() === user._id.toString()
    );
    if (!existingRatingObject) {
      let ratingAdded = await Product.findOneAndUpdate(
        product._id,
        {
          $push: { ratings: { star, postedBy: user._id } },
        },
        { new: true }
      ).exec();
      res.json(ratingAdded);
    } else {
      let ratingUpdate = await Product.updateOne(
        { ratings: { $elemMatch: existingRatingObject } },
        { $set: { "ratings.$.star": star } },
        { new: true }
      ).exec();

      res.json(ratingUpdate);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Cant update rating", err: err.message });
  }
};

const listRelated = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).exec();

    const related = await Product.find({ _id: { $ne: product._id }, category: product.category })
      .limit(3)
      .populate("category")
      .populate("subs")
      .populate("ratings.postedBy")
      .exec();

    res.json(related);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Cant get related products", err: err.message });
  }
};

const handleQuery = async (query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();

  return products;
};

const handlePrice = async (price) => {
  const products = await Product.find({ price: { $gte: price[0], $lte: price[1] } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();

  return products;
};

const handleCategory = async (category) => {
  const products = await Product.find({ category })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();

  return products;
};

const handleStars = async (stars) => {
  const agg = await Product.aggregate([
    {
      $project: {
        document: "$$ROOT",

        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ]);
  // console.log(agg);

  const products = await Product.find({ _id: agg })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();

  return products;
};

const handleSub = async (sub) => {
  const products = await Product.find({ subs: sub })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();

  return products;
};
const handleShipping = async (shipping) => {
  const products = await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();

  return products;
};
const handleColor = async (color) => {
  const products = await Product.find({ color })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();

  return products;
};
const handleBrand = async (brand) => {
  const products = await Product.find({ brand })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();

  return products;
};

const searchFilters = async (req, res) => {
  try {
    const { query, price, category, stars, sub, brand, color, shipping } = req.body;

    if (query) {
      return res.json(await handleQuery(query));
    }
    if (price !== undefined) {
      return res.json(await handlePrice(price));
    }

    if (category != undefined) {
      return res.json(await handleCategory(category));
    }

    if (stars != undefined) {
      return res.json(await handleStars(stars));
    }

    if (sub != undefined) {
      return res.json(await handleSub(sub));
    }

    if (shipping != undefined) {
      return res.json(await handleShipping(shipping));
    }
    if (brand != undefined) {
      return res.json(await handleBrand(brand));
    }
    if (color != undefined) {
      return res.json(await handleColor(color));
    }

    throw new Error("Search Failed");
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Search Failed", err: err.message });
  }
};

module.exports = {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  productStart,
  listRelated,
  searchFilters,
};
