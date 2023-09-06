import LogoBlack from "../src/assets/img/header/logo-black.png";
import LogoWhite from "../src/assets/img/header/logo-white.png";
import CartImg from "../src/assets/img/cart/cart.svg";
import AccountBlack from "../src/assets/img/header/account_black.svg";
import AccountWhite from "../src/assets/img/header/account_white.svg";
import HeroImg from "../src/assets/img/hero/family.svg";
import CarouselImg1 from "../src/assets/img/carousel/nature.jpg";
import CarouselImg2 from "../src/assets/img/carousel/map.jpg";
import CarouselImg3 from "../src/assets/img/carousel/fisher.jpg";
import DotSelected from "../src/assets/img/carousel/selected-dot.svg";
import DotNotSelected from "../src/assets/img/carousel/not-selected-dot.svg";
import Guest from "../src/assets/img/tickets/guest.svg";
import Fisher from "../src/assets/img/tickets/fisher.svg";
import Camper from "../src/assets/img/tickets/camper.svg";
import Check from "../src/assets/img/tickets/check.svg";
import LoginImg from "../src/assets/img/auth/hand.svg";
import SignupImg from "../src/assets/img/auth/city.svg";
import CartBlack from "../src/assets/img/header/cart_black.svg";
import CartWhite from "../src/assets/img/header/cart_white.svg";
import Sailor from "../src/assets/img/boatRental/sailor.svg";
import Restaurant from "../src/assets/img/restaurant/restaurant.svg";
import FbLogo from "../src/assets/img/footer/fb.svg";
import YtLogo from "../src/assets/img/footer/yt.svg";
import InstaLogo from "../src/assets/img/footer/insta.svg";

export const header = {
  logo_white: LogoWhite,
  logo_black: LogoBlack,
  cart_white: CartWhite,
  cart_black: CartBlack,
};

export const footer = {
  fbImg: FbLogo,
  instaImg: InstaLogo,
  ytImg: YtLogo,
};

export const nav = [
  { name: "Bilete", href: "/" },
  { name: "Bărci", href: "/" },
  { name: "Restaurant", href: "/" },
];

export const navAccount = {
  btnSignUp: { name: "Register", href: "/signUp" },
  btnLogin: { name: "Login", href: "/login" },
  btnLogout: { name: "Logout", href: "/" },
  btnAccount: { name: "Contul Meu", href: "/account" },
  account_black: AccountBlack,
  account_white: AccountWhite,
};

export const hero = {
  title: "Creează amintiri frumoase alături de familie",
  subtitle: "Pescuit, camping, plimbare cu barca și mâncare de calitate",
  image: HeroImg,
};

export const carousel = [
  {
    src: CarouselImg1,
    alt: "Slide 1",
    description: "Bucură-te de soare relaxat în natură",
  },
  {
    src: CarouselImg2,
    alt: "Slide 2",
    description:
      "Ne găsești în Lipova, în locul fostei balastiere acum transformată",
  },
  {
    src: CarouselImg3,
    alt: "Slide 3",
    description: "Cel mai bun loc de pescuit din vestul României",
  },
];

export const dots = [
  { src: DotSelected, alt: "dotSelected" },
  { src: DotNotSelected, alt: "dotSelected" },
];

export const auth = {
  loginImg: LoginImg,
  signupImg: SignupImg,
};

export const ticketOptions = {
  check: Check,
};

export const cartData = {
  img: {
    src: CartImg,
    alt: "CartImg",
  },
};

export const cartInitialState = { tickets: [], boats: [], count: 0 };

export const tickets = [
  {
    title: "Vizitator",
    type: "GUEST",
    description: "Acces în perimetrul Egreta",
    smallDescription:
      "- poți să ai parte de plimbări cu barca, mâncare gustoasă și o atmosferă liniștită",
    src: Guest,
    alt: "guestImg",
    bg: "bg-gradient-to-b from-teal-100 to-blue-300",
    basePrice: 10,
  },
  {
    title: "Pescar",
    type: "FISHER",
    description: `Acces în perimetrul Egreta. Pescuitul permis`,
    smallDescription: "- test 1",
    src: Fisher,
    alt: "fisherImg",
    bg: "bg-gradient-to-tr from-teal-300 to-amber-100",
    basePrice: 20,
  },
  {
    title: "Camping",
    type: "CAMPER",
    description:
      "Acces în perimetrul Egreta. Pescuitul permis. Acces la zona de camping amenajată",
    smallDescription: "- test 2",
    src: Camper,
    alt: "camperImg",
    bg: "bg-gradient-to-br from-orange-200 to-indigo-300",
    basePrice: 30,
  },
];

export const checkDatesMessages = {
  addToCartBeforeCheckDates: "Te rog verifică zilele selectate",
  datesAreGood: "Zilele selectate au fost confirmate",
  datesAreNotGood: "Ziua plecării trebuie să fie după ziua sosirii",
  addedToCart: "Vă mulțumim, produsul a fost adăugat în coș",
};

export const boatRental = {
  img: {
    src: Sailor,
    alt: "sailor",
  },
  bg: "bg-gradient-to-br from-cyan-300 to-green-100",
};

export const restaurant = {
  img: {
    src: Restaurant,
    alt: "restaurant",
  },
};

export const orderPopUp = {
  orderConfirmedMsg: "Vă mulțumim, comanda a fost plasată",
  pleaseAuth: "Vă rugăm să vă autentificați înainte de a plasa o comandă",
};

export const popUpMessages = {
  orderConfirmedMsg: "Vă mulțumim, comanda a fost plasată",
  pleaseAuth: "Vă rugăm să vă autentificați înainte de a plasa o comandă",
  addedToCart: "Vă mulțumim, produsul a fost adăugat în coș",
};
