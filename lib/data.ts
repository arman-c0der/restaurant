export type Dish = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  allergens: string[];
  dietary: string[];
  badge: string;
  image: string;
};

export type Review = {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
};

export const MENU_DATA: Dish[] = [
  {
    id: 1,
    name: "Classic Beef Wellington",
    category: "Mains",
    price: 34.5,
    description:
      "Tender prime beef fillet wrapped in mushroom duxelles, prosciutto ham, and golden puff pastry. Served with truffle mash and red wine jus.",
    allergens: ["Gluten", "Dairy"],
    dietary: [],
    badge: "Chef's Special",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Aged Sirloin Sunday Roast",
    category: "Sunday Roast",
    price: 28.0,
    description:
      "Dry-aged sirloin of beef, crisp Yorkshire pudding, duck-fat roast potatoes, honey-glazed parsnips, and bone marrow gravy.",
    allergens: ["Gluten", "Dairy", "Eggs"],
    dietary: [],
    badge: "Sunday Favourite",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Beer-Battered Haddock & Chips",
    category: "Mains",
    price: 22.5,
    description:
      "Crispy London Ale battered North Sea haddock, triple-cooked chips, crushed minted peas, and homemade tartare sauce.",
    allergens: ["Gluten", "Fish"],
    dietary: [],
    badge: "Classic British",
    image:
      "https://images.unsplash.com/photo-1579208030886-b937da0925dc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Slow-Braised Shepherd's Pie",
    category: "Mains",
    price: 24.0,
    description:
      "Braised Welsh lamb shoulder cooked with rosemary and root vegetables, topped with butter-whipped cheddar potato.",
    allergens: ["Dairy"],
    dietary: ["Gluten-Free"],
    badge: "Comfort Dish",
    image:
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    name: "Pan-Seared Scottish Salmon",
    category: "Mains",
    price: 26.5,
    description:
      "Loch Fyne salmon fillet served over English asparagus, heritage baby potatoes, and lemon caper butter sauce.",
    allergens: ["Fish", "Dairy"],
    dietary: ["Gluten-Free"],
    badge: "Fresh Catch",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    name: "Dorset Crab & Avocado Starter",
    category: "Starters",
    price: 16.0,
    description:
      "Hand-picked Dorset white crab meat, compressed cucumber, avocado mousse, and toasted brioche croutes.",
    allergens: ["Crustaceans", "Gluten", "Dairy"],
    dietary: [],
    badge: "Artisan Starter",
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    name: "Roasted Beetroot & Goat's Cheese",
    category: "Starters",
    price: 13.5,
    description:
      "Salt-baked English beetroots, whipped soft goat's cheese, candied walnuts, and watercress dressing.",
    allergens: ["Dairy", "Tree Nuts"],
    dietary: ["Vegetarian", "Gluten-Free"],
    badge: "Vegetarian",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    name: "Traditional Afternoon Tea Tier",
    category: "Afternoon Tea",
    price: 32.0,
    description:
      "Selection of finger sandwiches, warm buttermilk scones with Cornish clotted cream & strawberry jam, and mini pastries.",
    allergens: ["Gluten", "Dairy", "Eggs"],
    dietary: ["Vegetarian"],
    badge: "Afternoon Special",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 9,
    name: "Warm Sticky Toffee Pudding",
    category: "Desserts",
    price: 10.5,
    description:
      "Rich date sponge cake smothered in warm butterscotch sauce, served with Cornish clotted cream ice cream.",
    allergens: ["Gluten", "Dairy", "Eggs"],
    dietary: ["Vegetarian"],
    badge: "Signature Dessert",
    image:
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 10,
    name: "Fresh Strawberry Eton Mess",
    category: "Desserts",
    price: 9.5,
    description:
      "Crisp meringue pieces layered with fresh English strawberries, vanilla bean Chantilly cream, and wild mint.",
    allergens: ["Dairy", "Eggs"],
    dietary: ["Vegetarian", "Gluten-Free"],
    badge: "Summer Classic",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 11,
    name: "Botanical Elderflower Gin & Tonic",
    category: "Drinks",
    price: 13.5,
    description:
      "Artisanal London Dry Gin with elderflower liqueur, Mediterranean tonic water, fresh cucumber, and mint.",
    allergens: [],
    dietary: ["Vegan", "Gluten-Free"],
    badge: "Signature Cocktail",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800",
  },
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 1,
    name: "Lord A. Sterling",
    role: "Verified OpenTable Diner",
    rating: 5,
    comment:
      "The Beef Wellington here is unmatched. Perfectly pink beef fillet, flaky pastry, and exceptional depth in the red wine reduction.",
    date: "3 days ago",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 2,
    name: "Eleanor Vance",
    role: "Google Local Guide",
    rating: 5,
    comment:
      "Warm ambience, attentive modern British service, and the Sticky Toffee Pudding was truly divine! Will definitely return.",
    date: "1 week ago",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 3,
    name: "Chef Marcus Hayes",
    role: "Food Critic",
    rating: 5,
    comment:
      "A magnificent presentation of seasonal British farm produce. Flawless execution across both fish and roast courses.",
    date: "2 weeks ago",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
  },
];

export const CATEGORIES = [
  "All",
  "Starters",
  "Mains",
  "Sunday Roast",
  "Afternoon Tea",
  "Desserts",
  "Drinks",
];

export const DIETARY_FILTERS = ["All", "Gluten-Free", "Vegetarian", "Vegan"];
