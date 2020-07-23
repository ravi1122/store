import _sampleSize from "lodash/sampleSize";
import _chunk from "lodash/chunk";

// https://stackoverflow.com/questions/105034/how-to-create-guid-uuid#answer-2117523
export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
};

export const getRandomArrElem = (arr) => (count) => {
  return _sampleSize(arr, count);
};

export const getProductDescription = (len = 10) => {
  const lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium recusandae nulla non expedita omnis eaque reiciendis dolorem cupiditate blanditiis consequuntur? Quos aspernatur vitae in repudiandae nam, accusamus alias officiis autem.`;

  return _sampleSize(lorem.split(" "), len).join(" ");
};

// productNames - MEN_PRODUCT_NAMES/WOMEN_PRODUCT_NAMES
// productTags - MEN_PRODUCT_TAGS : WOMEN_PRODUCT_TAGS
// productCategories - PRODUCT_CATEGORIES
// sizes - SIZES
// colors - COLORS
export const genProductInfo = (opts, isMen = false) => {
  const { productNames, productTags, productCategories, sizes, colors } = opts;

  const sku = String(Math.random() * 7678960138)
    .replace(/\./, "")
    .slice(0, 10);
  const name = _sampleSize(productNames, isMen ? 2 : 1).join(" ");

  const price1 =
    Number(
      String(Math.random() * 2222)
        .replace(/\./, "")
        .slice(0, 6)
    ) / 100;
  const price2 =
    Number(
      String(Math.random() * 2222)
        .replace(/\./, "")
        .slice(0, 6)
    ) / 100;

  return {
    sku,
    name: name,
    salePrice: price1 < price2 ? price1 : price2,
    price: price1 > price2 ? price1 : price2,
    colors: getRandomArrElem(colors)(4),
    sizes: getRandomArrElem(sizes)(3),
    landingPageUrl: `/products/${sku}/${name
      .split(" ")
      .join("-")
      .toLowerCase()}`,
    image: `/assets/images/products/${sku}.jpg`,
    tags: _sampleSize(productTags, isMen ? 2 : 4),
    categories: _sampleSize(productCategories, 2),
    description: getProductDescription(),
  };
};

// https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp
export function formatCurrency(num = 0) {
  return num.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}

export function getSorted(data = [], prop, order = "asc") {
  return data.sort((a, b) => {
    const valA = typeof a[prop] === "string" ? a[prop].toUpperCase() : a[prop];
    const valB = typeof b[prop] === "string" ? b[prop].toUpperCase() : b[prop];

    if (order === "desc") {
      if (valA > valB) return -1;

      if (valA < valB) return 1;

      return 0;
    }

    if (valA < valB) return -1;

    if (valA > valB) return 1;

    return 0;
  });
}

// https://en.wikipedia.org/wiki/Luhn_algorithm
export function isValidCardNumber(num = "") {
  const digits = String(num)
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);

  const len = digits.length;
  const parity = len % 2;
  let sum = digits[len - 1];

  for (let i = len - 2; i > -1; i--) {
    let d = digits[i];

    if (i % 2 === parity) {
      d *= 2;

      if (d > 9) d -= 9;
    }

    sum += d;
  }

  return sum % 10 === 0;
}

// e.g. i/p 4111111111111111
//      o/p 4111 1111 1111 1111
export function maskCardNumber(num) {
  // let masked = '';
  // for (let i = 0; i < num.length; i++) {
  //   if ((i + 1 !== num.length && (i + 1) % 4) === 0) {
  //     masked += num[i] + " ";
  //   } else {
  //     masked += num[i];
  //   }
  // }
  // return masked;

  // lodash
  return _chunk(num, 4)
    .map((a) => a.join(""))
    .join(" ");
}
