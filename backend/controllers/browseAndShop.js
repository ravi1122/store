const utils = require("../utils");
const reqUtils = require("../requestUtils");

exports.inventory = (req, res) => {
  return utils.readStore((err, store) => {
    if (err) {
      return reqUtils.send500(res);
    }

    const { query } = req;
    let products = store.products;

    if (query.search) {
      const _query = query.search.toLowerCase();

      products = products.filter((product) => {
        const { name, tags, categories } = product;
        const _tags = tags.join(" ");
        const _categories = categories.join(" ");
        const _queryStr = `${name} ${_tags} ${_categories}`.toLowerCase();

        return _queryStr.indexOf(_query) > -1;
      });
    }

    return reqUtils.send200(res, null, products);
  });
};

exports.productDetails = (req, res) => {
  const { sku } = req.params;

  if (sku) {
    return utils.readStore((err, store) => {
      if (err) {
        return reqUtils.send500(res);
      }

      const product = store.products.find((item) => item.sku === sku);

      return reqUtils.send200(res, null, product);
    });
  } else {
    return reqUtils.send500(res);
  }
};
