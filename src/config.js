import { uuidv4 } from "./utils";

export const SITE_NAME = "The Brand";
export const SITE_LOGO = "peace";

export const SEARCH_QUERY_CHARS = 3;
export const DEBOUNCED_DELAY = 350; // MS

export const NAV_MENU_ITEMS = [
  {
    key: uuidv4(),
    link: "/",
    label: "Home",
    subItems: [],
  },
  {
    key: uuidv4(),
    link: "/categories",
    label: "Categories",
    subItems: [
      {
        key: uuidv4(),
        link: "/categories/men",
        label: "Men",
        subItems: [],
      },
      {
        key: uuidv4(),
        link: "/categories/women",
        label: "women",
        subItems: [],
      },
      {
        key: uuidv4(),
        link: "/categories/kids",
        label: "Kids",
        subItems: [],
      },
    ],
  },
  {
    key: uuidv4(),
    link: "/onSale",
    label: "On Sale",

    icon: "fire",
    iconColor: "red",

    subItems: [],
  },
  {
    key: uuidv4(),
    link: "/myAccount",
    label: "My Account",

    icon: "user-circle",
    iconColor: "grey",

    isMyAccount: true,

    subItems: [
      {
        key: uuidv4(),
        label: "My Account",
        link: "/user",
      },
      {
        key: uuidv4(),
        label: "My Addresses",
        link: "/user/addresses",
      },
      {
        key: uuidv4(),
        label: "My Orders",
        link: "/user/orders",
      },
      {
        key: uuidv4(),
        label: "Shopping Cart",
        link: "/checkout/cart",
      },
    ],
  },
  {
    key: uuidv4(),
    link: "/cart",
    label: "Cart",

    icon: "shopping-cart",
    iconColor: "green",

    subItems: [],
  },
];

export const SOCIAL_MEDIA_PROFILES = [
  {
    key: uuidv4(),
    title: "Facebook",
    link: "https://www.facebook.com",
    icon: { prefix: "fab", iconName: "facebook-square" },
  },
  {
    key: uuidv4(),
    title: "Twitter",
    link: "https://twitter.com",
    icon: { prefix: "fab", iconName: "twitter-square" },
  },
  {
    key: uuidv4(),
    title: "Instagram",
    link: "https://www.instagram.com",
    icon: { prefix: "fab", iconName: "instagram-square" },
  },
  {
    key: uuidv4(),
    title: "Pinterest",
    link: "https://www.pinterest.com",
    icon: { prefix: "fab", iconName: "pinterest-square" },
  },
];

export const PAYMENT_OPTIONS = [
  {
    key: uuidv4(),
    title: "AmEx",
    icon: { prefix: "fab", iconName: "cc-amex" },
  },
  {
    key: uuidv4(),
    title: "Diners Club",
    icon: { prefix: "fab", iconName: "cc-diners-club" },
  },
  {
    key: uuidv4(),
    title: "Discover",
    icon: { prefix: "fab", iconName: "cc-discover" },
  },
  {
    key: uuidv4(),
    title: "JCB",
    icon: { prefix: "fab", iconName: "cc-jcb" },
  },
  {
    key: uuidv4(),
    title: "Mastercard",
    icon: { prefix: "fab", iconName: "cc-mastercard" },
  },
  {
    key: uuidv4(),
    title: "PayPal",
    icon: { prefix: "fab", iconName: "cc-paypal" },
  },
  {
    key: uuidv4(),
    title: "Visa",
    icon: { prefix: "fab", iconName: "cc-visa" },
  },
];

export const PARTNERS = [
  {
    key: uuidv4(),
    icon: { prefix: "fab", iconName: "adobe" },
  },
  {
    key: uuidv4(),
    icon: { prefix: "fab", iconName: "airbnb" },
  },
  {
    key: uuidv4(),
    icon: { prefix: "fab", iconName: "angular" },
  },
  {
    key: uuidv4(),
    icon: { prefix: "fab", iconName: "angrycreative" },
  },
  {
    key: uuidv4(),
    icon: { prefix: "fab", iconName: "aviato" },
  },
  {
    key: uuidv4(),
    icon: { prefix: "fab", iconName: "autoprefixer" },
  },
  {
    key: uuidv4(),
    icon: { prefix: "fab", iconName: "dhl" },
  },
  {
    key: uuidv4(),
    icon: { prefix: "fab", iconName: "ember" },
  },
  {
    key: uuidv4(),
    icon: { prefix: "fab", iconName: "fedex" },
  },
  {
    key: uuidv4(),
    icon: { prefix: "fab", iconName: "git" },
  },
  {
    key: uuidv4(),
    icon: { prefix: "fab", iconName: "html5" },
  },
  {
    key: uuidv4(),
    icon: { prefix: "fab", iconName: "js-square" },
  },
];

export const FOOTER = {
  ADDRESS: {
    address: ["12, 34, XYZ"],
    phone: "+91 9123456789",
    email: "support@thebrand.com",
  },
  INFORMATION: [
    {
      key: uuidv4(),
      label: "About Us",
      link: "/aboutUs",
    },
    {
      key: uuidv4(),
      label: "Contact Us",
      link: "/contactUs",
    },
    {
      key: uuidv4(),
      label: "Service Policy",
      link: "/servicePolicies",
    },
  ],
  MY_ACCOUNT: [
    {
      key: uuidv4(),
      label: "My Account",
      link: "#",
    },
    {
      key: uuidv4(),
      label: "Shopping Cart",
      link: "#",
    },
    {
      key: uuidv4(),
      label: "My Addresses",
      link: "#",
    },
  ],
};

export const DEFAULT_BREADCRUMBS = [
  { label: "Home", link: "/", key: uuidv4() },
];
export const BREADCRUMBS = {
  aboutUs: [
    { label: "Home", link: "/", key: uuidv4() },
    { label: "About Us", link: "/aboutUs", key: uuidv4() },
  ],
  contactUs: [
    { label: "Home", link: "/", key: uuidv4() },
    { label: "Contact Us", link: "/contactUs", key: uuidv4() },
  ],
  servicePolicies: [
    { label: "Home", link: "/", key: uuidv4() },
    {
      label: "Services and Policies",
      link: "/servicePolicies",
      key: uuidv4(),
    },
  ],
  cart: [
    { label: "Home", link: "/", key: uuidv4() },
    { label: "Shopping Cart", link: "/cart", key: uuidv4() },
  ],
  delivery: [
    { label: "Home", link: "/", key: uuidv4() },
    { label: "Delivery Page", link: "/delivery", key: uuidv4() },
  ],
  payment: [
    { label: "Home", link: "/", key: uuidv4() },
    { label: "Payment Page", link: "/payment", key: uuidv4() },
  ],
  confirmation: [
    { label: "Home", link: "/", key: uuidv4() },
    { label: "Order Confirmation Page", link: "/confirmation", key: uuidv4() },
  ],
};

export const ITEM_FAV_COLOR_DEFAULT = "#000";
export const ITEM_FAV_COLOR_ADDED = "#e91e63";

export const SORT_ORDERS = [
  { label: "Name A-Z", prop: "name", order: "asc", key: uuidv4() },
  { label: "Name Z-A", prop: "name", order: "desc", key: uuidv4() },
  { label: "Price Low-High", prop: "salePrice", order: "asc", key: uuidv4() },
  { label: "Price High-Low", prop: "salePrice", order: "desc", key: uuidv4() },
];

export const CC_EXPIRY_YEARS = 10;
