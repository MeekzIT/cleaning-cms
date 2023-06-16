import AboutUs from "../../components/aboutUs/AboutUs";
import Banners from "../../components/banners/Banners";
import Category from "../../components/category/Category";
import ContactUs from "../../components/contactUs/ContactUs";
import Info from "../../components/info/Info";
import Login from "../../components/login/Login";
import Orders from "../../components/orders/Orders";
import Users from "../../components/users/Users";
import {
  ABOUTUS_PAGE,
  BANNERS_PAGE,
  CATEGORY_PAGE,
  CONTACTS_PAGE,
  INFO_PAGE,
  LOGIN_PAGE,
  ORDERS_PAGE,
  PORTFOLIO_IMAGE,
  USERS_PAGE,
  WORKERS_PAGE,
} from "./urls";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import Image from "../../components/Images/Image";
import Workers from "../../components/workers/Workers";
import EngineeringIcon from "@mui/icons-material/Engineering";
import GroupIcon from '@mui/icons-material/Group';

export const isAuthPages = [
  {
    id: 12345,
    path: USERS_PAGE,
    name: "Users",
    Component: Users,
    icon: <GroupIcon />,
  },
  {
    id: 8,
    path: CATEGORY_PAGE,
    name: "Category",
    Component: Category,
    icon: <CategoryIcon />,
  },
  {
    id: 9,
    path: ORDERS_PAGE,
    name: "Orders",
    Component: Orders,
    icon: <ProductionQuantityLimitsIcon />,
  },
  {
    id: 9996,
    path: WORKERS_PAGE,
    name: "Workers",
    Component: Workers,
    icon: <EngineeringIcon />,
  },
  {
    id: 13123,
    path: PORTFOLIO_IMAGE,
    name: "Images",
    Component: Image,
    icon: <InsertPhotoIcon />,
  },
  {
    id: 3,
    path: ABOUTUS_PAGE,
    name: "About Us",
    Component: AboutUs,
    icon: <InfoIcon />,
  },
  {
    id: 6,
    path: BANNERS_PAGE,
    name: "Banner",
    Component: Banners,
    icon: <InsertPhotoIcon />,
  },
  // {
  //   id: 11,
  //   path: FOOTER_PAGE,
  //   name: "Footers",
  //   Component: Footer,
  //   icon: <BuildIcon />,
  // },
  {
    id: 4,
    path: CONTACTS_PAGE,
    name: "Contact Us",
    Component: ContactUs,
    icon: <InfoIcon />,
  },
  { id: 7, path: INFO_PAGE, name: "Info", Component: Info, icon: <InfoIcon /> },
];

export const isntAuthPages = [
  {
    id: 1,
    path: LOGIN_PAGE,
    name: "Login",
    Component: Login,
    icon: <LockOpenIcon />,
  },
];
