import {
  CocaCola,
  Sprite,
  Focus,
  Immunity,
  Apple,
  Mango,
  BlackMilkTea,
  MatchaMilkTea,
  CoffeeShot,
  GoldenOolong,
  JasmineGreen
} from "../../assets/images";

const BeverageTypes: string[] = ["Carbonated Drinks", "Energy Drinks", "Juices", "Milk", "Coffee", "Tea"];

interface Beverage {
  title: string,
  description: string,
  imgSrc: string,
  imgAlt?: string,
  price: number,
  quantityAvailable: number
};

interface BeverageType {
  beverages: Beverage[],
};

const CarbonatedDrinks: BeverageType = {
  beverages: [
    {
      title: "CocaCola",
      description: "Such a good drink, u know, try it.",
      imgSrc: CocaCola,
      imgAlt: "",
      price: 1.35,
      quantityAvailable: 21
    },
    {
      title: "Sprite",
      description: "Meh, kind of replacement when coke is unavailable.",
      imgSrc: Sprite,
      imgAlt: "",
      price: 1.05,
      quantityAvailable: 17
    }
  ]
};

const EnergyDrinks: BeverageType = {
  beverages: [
    {
      title: "Energy + Focus",
      description: "Matcha and L-theanine partner with ginseng for an empowering, focused blend.",
      imgSrc: Focus,
      imgAlt: "",
      price: 35.99,
      quantityAvailable: 3
    },
    {
      title: "Energy + Immunity",
      description: "Maintain your defense with a powerful blend of the superfruit acerola, matcha and vitamin C.",
      imgSrc: Immunity,
      imgAlt: "",
      price: 35.99,
      quantityAvailable: 5
    }
  ]
};

const Juices: BeverageType = {
  beverages: [
    {
      title: "Apple Juice",
      description: "Noice, so much noice.",
      imgSrc: Apple,
      imgAlt: "",
      price: 12.5,
      quantityAvailable: 3
    },
    {
      title: "Mango Juice",
      description: "Oh man, that tastes so good, mind blown.",
      imgSrc: Mango,
      imgAlt: "",
      price: 100000,
      quantityAvailable: 1000
    }
  ]
};

const Milk: BeverageType = {
  beverages: [
    {
      title: "Black Milk Tea",
      description: "The perfect café experience in a bottle! We put our tea expertise to work by balancing the robust flavor black tea with a sweet creamy taste. Enjoy it any time of the day without the fuss of being a barista or brewing your own tea. ",
      imgSrc: BlackMilkTea,
      imgAlt: "",
      price: 23.50,
      quantityAvailable: 3
    },
    {
      title: "Matcha Milk Tea",
      description: "A true Japanese favorite! We put our tea expertise to work by balancing the flavors of matcha and green tea with a sweet creamy taste. Enjoy it any time of the day without the fuss of being a barista or brewing your own tea.",
      imgSrc: MatchaMilkTea,
      imgAlt: "",
      price: 35.99,
      quantityAvailable: 5
    }
  ]
};

const Coffee: BeverageType = {
  beverages: [
    {
      title: "Coffee Shot",
      description: "The Jay Street Coffee Shot is inspired by the cobblestone streets of our Brooklyn home office. This bold-tasting coffee shot will get you up and going anytime you need a natural energy boost. Unsweetened with 150mg of caffeine per bottle.",
      imgSrc: CoffeeShot,
      imgAlt: "",
      price: 35,
      quantityAvailable: 4
    }
  ]
};

const Tea: BeverageType = {
  beverages: [
    {
      title: "Golden Oolong",
      description: "ITO EN's Golden Oolong Tea is one of Japan's best selling Oolong Teas. The tea leaves used for this Golden Oolong are flowery, fragrant \"Golden Cinnamon\" and hearty and ripe \"Iron Goddess\". Oolong tea is semi oxidized, making it unique from green and black teas.",
      imgSrc: GoldenOolong,
      imgAlt: "",
      price: 23.50,
      quantityAvailable: 6
    },
    {
      title: "Jasmine Green",
      description: "We use jasmine flowers that have been picked when the blossoms are at the peak of their fragrance.",
      imgSrc: JasmineGreen,
      imgAlt: "",
      price: 23.50,
      quantityAvailable: 2
    }
  ]
};

const getBeveragesOfType = (type: string): Beverage[] => {
  switch (type) {
    case "Carbonated Drinks":
      return CarbonatedDrinks.beverages;
    case "Energy Drinks":
      return EnergyDrinks.beverages;
    case "Juices":
      return Juices.beverages;
    case "Milk":
      return Milk.beverages;
    case "Coffee":
      return Coffee.beverages;
    case "Tea":
      return Tea.beverages;
    default:
      return [];
  }
};

export {
  BeverageTypes,
  CarbonatedDrinks,
  EnergyDrinks,
  Juices,
  Milk,
  Coffee,
  Tea,
  getBeveragesOfType
}