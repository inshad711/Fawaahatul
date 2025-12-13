interface MenuItem {
  name: string;
  url: string | null;
  megamenu?: any[];
  dropdown?: any[];
}

export const menuItem: MenuItem[] = [
  {
    name: "Designer Perfume",
    url: "/designer-perfume",
    megamenu: [
      {
        name: "A - C",
        list: [
          {
            name: "Abercrombie & Fitch",
            url: "/abercrombie-fitch",
          },
          {
            name: "Antonio Banderas",
            url: "/antonio-banderas",
          },
          {
            name: "Aramis",
            url: "/aramis",
          },
          {
            name: "Ariana Grande",
            url: "/ariana-grande",
          },
          {
            name: "Azzaro",
            url: "/azzaro",
          },
          {
            name: "Banana Republic",
            url: "/banana-republic",
          },
          {
            name: "Bentley",
            url: "/bentley",
          },
          {
            name: "Billie Eilish",
            url: "/billie-eilish",
          },
          {
            name: "Boucheron",
            url: "/boucheron",
          },
          {
            name: "Bottega Veneta",
            url: "/bottega-veneta",
          },
          {
            name: "Britney Spears",
            url: "/britney-spears",
          },
          {
            name: "Burberry",
            url: "/burberry",
          },
          {
            name: "Bvlgari",
            url: "/bvlgari",
          },
          {
            name: "Calvin Klein",
            url: "/calvin-klein",
          },
          {
            name: "Carolina Herrera",
            url: "/carolina-herrera",
          },
          {
            name: "Cartier",
            url: "/cartier",
          },
          {
            name: "Chanel",
            url: "/chanel",
          },
          {
            name: "Chloe",
            url: "/chloe",
          },
          {
            name: "Chopard",
            url: "/chopard",
          },
          {
            name: "Christian Dior",
            url: "/christian-dior",
          },
          {
            name: "Clinique",
            url: "/clinique",
          },
          {
            name: "Coach",
            url: "/coach",
          },
          {
            name: "Dumont",
            url: "/dumont",
          },
        ],
      },
      {
        name: "D - H",
        list: [
          { name: "David Beckham", url: "/david-beckham" },
          { name: "Davidoff", url: "/davidoff" },
          { name: "Diesel", url: "/diesel" },
          { name: "Dkny", url: "/dkny" },
          { name: "Dolce & Gabbana", url: "/dolce-gabbana" },
          { name: "Dunhill", url: "/dunhill" },
          { name: "Elie Saab", url: "/elie-saab" },
          { name: "Elizabeth Arden", url: "/elizabeth-arden" },
          { name: "Escada", url: "/escada" },
          { name: "Estee Lauder", url: "/estee-lauder" },
          { name: "Etienne Aigner", url: "/etienne-aigner" },
          { name: "Eze", url: "/eze" },
          { name: "Fcuk", url: "/fcuk" },
          { name: "Ferrari", url: "/ferrari" },
          { name: "Franck Olivier", url: "/franck-olivier" },
          { name: "Geoffrey Beene", url: "/geoffrey-beene" },
          { name: "Giorgio Armani", url: "/giorgio-armani" },
          { name: "Givenchy", url: "/givenchy" },
          { name: "Gucci", url: "/gucci" },
          { name: "Guerlain", url: "/guerlain" },
          { name: "Guess", url: "/guess" },
          { name: "Guy Laroche", url: "/guy-laroche" },
          { name: "Hermes", url: "/hermes" },
          { name: "Hugo Boss", url: "/hugo-boss" },
        ],
      },
      {
        name: "I - N",
        list: [
          { name: "Issey Miyake", url: "/issey-miyake" },
          { name: "Jaguar", url: "/jaguar" },
          { name: "Jean Paul Gaultier", url: "/jean-paul-gaultier" },
          { name: "Jimmy Choo", url: "/jimmy-choo" },
          { name: "John Varvatos", url: "/john-varvatos" },
          { name: "Joop", url: "/joop" },
          { name: "Juicy Couture", url: "/juicy-couture" },
          { name: "Kenneth Cole", url: "/kenneth-cole" },
          { name: "Kenzo", url: "/kenzo" },
          { name: "Lacoste", url: "/lacoste" },
          { name: "Lalique", url: "/lalique" },
          { name: "Lancome", url: "/lancome" },
          { name: "Lanvin", url: "/lanvin" },
          { name: "Mancera", url: "/mancera" },
          { name: "Mercedes-Benz", url: "/mercedes-benz" },
          { name: "Mont Blanc", url: "/mont-blanc" },
          { name: "Montale", url: "/montale" },
          { name: "Narciso Rodriguez", url: "/narciso-rodriguez" },
          { name: "Nautica", url: "/nautica" },
          { name: "Nina Ricci", url: "/nina-ricci" },
        ],
      },
      {
        name: "O - Z",
        list: [
          { name: "Paco Rabanne", url: "/paco-rabanne" },
          { name: "Police", url: "/police" },
          { name: "Prada", url: "/prada" },
          { name: "Ralph Lauren", url: "/ralph-lauren" },
          { name: "Reyane Tradition", url: "/reyane-tradition" },
          { name: "Roberto Cavalli", url: "/roberto-cavalli" },
          { name: "Rochas Moustache", url: "/rochas-moustache" },
          { name: "Salvatore Ferragamo", url: "/salvatore-ferragamo" },
          { name: "Shakira", url: "/shakira" },
          { name: "St Dupont", url: "/st-dupont" },
          { name: "Thierry Mugler", url: "/thierry-mugler" },
          { name: "Tom Ford", url: "/tom-ford" },
          { name: "Tommy Hilfiger", url: "/tommy-hilfiger" },
          { name: "Trussardi", url: "/trussardi" },
          {
            name: "United Colors of Benetton",
            url: "/united-colors-of-benetton",
          },
          { name: "Valentino", url: "/valentino" },
          { name: "Versace", url: "/versace" },
          { name: "Victoria's Secret", url: "/victorias-secret" },
          { name: "Viktor & Rolf", url: "/viktor-rolf" },
          { name: "Yves Saint Laurent", url: "/yves-saint-laurent" },
          { name: "Zadig & Voltaire", url: "/zadig-voltaire" },
        ],
      },
    ],
  },
  {
    name: "Niche Perfumes",
    url: "/niche-perfume",
    megamenu: [
      {
        name: "A - C",
        list: [
          {
            name: "Abercrombie & Fitch",
            url: "/abercrombie-fitch",
          },
          {
            name: "Antonio Banderas",
            url: "/antonio-banderas",
          },
          {
            name: "Aramis",
            url: "/aramis",
          },
          {
            name: "Ariana Grande",
            url: "/ariana-grande",
          },
          {
            name: "Azzaro",
            url: "/azzaro",
          },
          {
            name: "Banana Republic",
            url: "/banana-republic",
          },
          {
            name: "Bentley",
            url: "/bentley",
          },
          {
            name: "Billie Eilish",
            url: "/billie-eilish",
          },
          {
            name: "Boucheron",
            url: "/boucheron",
          },
          {
            name: "Bottega Veneta",
            url: "/bottega-veneta",
          },
          {
            name: "Britney Spears",
            url: "/britney-spears",
          },
          {
            name: "Burberry",
            url: "/burberry",
          },
          {
            name: "Bvlgari",
            url: "/bvlgari",
          },
          {
            name: "Calvin Klein",
            url: "/calvin-klein",
          },
          {
            name: "Carolina Herrera",
            url: "/carolina-herrera",
          },
          {
            name: "Cartier",
            url: "/cartier",
          },
          {
            name: "Chanel",
            url: "/chanel",
          },
          {
            name: "Chloe",
            url: "/chloe",
          },
          {
            name: "Chopard",
            url: "/chopard",
          },
          {
            name: "Christian Dior",
            url: "/christian-dior",
          },
          {
            name: "Clinique",
            url: "/clinique",
          },
          {
            name: "Coach",
            url: "/coach",
          },
          {
            name: "Dumont",
            url: "/dumont",
          },
        ],
      },
      {
        name: "D - H",
        list: [
          { name: "David Beckham", url: "/david-beckham" },
          { name: "Davidoff", url: "/davidoff" },
          { name: "Diesel", url: "/diesel" },
          { name: "Dkny", url: "/dkny" },
          { name: "Dolce & Gabbana", url: "/dolce-gabbana" },
          { name: "Dunhill", url: "/dunhill" },
          { name: "Elie Saab", url: "/elie-saab" },
          { name: "Elizabeth Arden", url: "/elizabeth-arden" },
          { name: "Escada", url: "/escada" },
          { name: "Estee Lauder", url: "/estee-lauder" },
          { name: "Etienne Aigner", url: "/etienne-aigner" },
          { name: "Eze", url: "/eze" },
          { name: "Fcuk", url: "/fcuk" },
          { name: "Ferrari", url: "/ferrari" },
          { name: "Franck Olivier", url: "/franck-olivier" },
          { name: "Geoffrey Beene", url: "/geoffrey-beene" },
          { name: "Giorgio Armani", url: "/giorgio-armani" },
          { name: "Givenchy", url: "/givenchy" },
          { name: "Gucci", url: "/gucci" },
          { name: "Guerlain", url: "/guerlain" },
          { name: "Guess", url: "/guess" },
          { name: "Guy Laroche", url: "/guy-laroche" },
          { name: "Hermes", url: "/hermes" },
          { name: "Hugo Boss", url: "/hugo-boss" },
        ],
      },
      {
        name: "I - N",
        list: [
          { name: "Issey Miyake", url: "/issey-miyake" },
          { name: "Jaguar", url: "/jaguar" },
          { name: "Jean Paul Gaultier", url: "/jean-paul-gaultier" },
          { name: "Jimmy Choo", url: "/jimmy-choo" },
          { name: "John Varvatos", url: "/john-varvatos" },
          { name: "Joop", url: "/joop" },
          { name: "Juicy Couture", url: "/juicy-couture" },
          { name: "Kenneth Cole", url: "/kenneth-cole" },
          { name: "Kenzo", url: "/kenzo" },
          { name: "Lacoste", url: "/lacoste" },
          { name: "Lalique", url: "/lalique" },
          { name: "Lancome", url: "/lancome" },
          { name: "Lanvin", url: "/lanvin" },
          { name: "Mancera", url: "/mancera" },
          { name: "Mercedes-Benz", url: "/mercedes-benz" },
          { name: "Mont Blanc", url: "/mont-blanc" },
          { name: "Montale", url: "/montale" },
          { name: "Narciso Rodriguez", url: "/narciso-rodriguez" },
          { name: "Nautica", url: "/nautica" },
          { name: "Nina Ricci", url: "/nina-ricci" },
        ],
      },
      {
        name: "O - Z",
        list: [
          { name: "Paco Rabanne", url: "/paco-rabanne" },
          { name: "Police", url: "/police" },
          { name: "Prada", url: "/prada" },
          { name: "Ralph Lauren", url: "/ralph-lauren" },
          { name: "Reyane Tradition", url: "/reyane-tradition" },
          { name: "Roberto Cavalli", url: "/roberto-cavalli" },
          { name: "Rochas Moustache", url: "/rochas-moustache" },
          { name: "Salvatore Ferragamo", url: "/salvatore-ferragamo" },
          { name: "Shakira", url: "/shakira" },
          { name: "St Dupont", url: "/st-dupont" },
          { name: "Thierry Mugler", url: "/thierry-mugler" },
          { name: "Tom Ford", url: "/tom-ford" },
          { name: "Tommy Hilfiger", url: "/tommy-hilfiger" },
          { name: "Trussardi", url: "/trussardi" },
          {
            name: "United Colors of Benetton",
            url: "/united-colors-of-benetton",
          },
          { name: "Valentino", url: "/valentino" },
          { name: "Versace", url: "/versace" },
          { name: "Victoria's Secret", url: "/victorias-secret" },
          { name: "Viktor & Rolf", url: "/viktor-rolf" },
          { name: "Yves Saint Laurent", url: "/yves-saint-laurent" },
          { name: "Zadig & Voltaire", url: "/zadig-voltaire" },
        ],
      },
    ],
  },
  {
    name: "Middle Eastern",
    url: "/middle-eastern",
    megamenu: [
      {
        name: "Middle Eastern Perfume",
        list: [
          { name: "Middle Eastern Perfume", url: "/middle-eastern-perfume" },
          { name: "Top Selling in Perfumes", url: "/top-selling-perfumes" },
          { name: "Abdul Samad Al Qurashi", url: "/abdul-samad-al-qurashi" },
          { name: "Ahmed Al Maghribi", url: "/ahmed-al-maghribi" },
          { name: "Ajmal", url: "/ajmal" },
          { name: "Al Haramain", url: "/al-haramain" },
          { name: "Al Rehab", url: "/al-rehab" },
          { name: "Arabian Oud", url: "/arabian-oud" },
          { name: "Anfar", url: "/anfar" },
          { name: "Afnan", url: "/afnan" },
          { name: "Armaf", url: "/armaf" },
          { name: "Ajyad", url: "/ajyad" },
          { name: "Adyan", url: "/adyan" },
          { name: "Ard Al Oud", url: "/ard-al-oud" },
          { name: "Birra", url: "/birra" },
          { name: "Estiara", url: "/estiara" },
          { name: "Flavia Marble", url: "/flavia-marble" },
          { name: "Hamidi", url: "/hamidi" },
          { name: "Ibraheem Al Qurashi", url: "/ibraheem-al-qurashi" },
          { name: "IKOS", url: "/ikos" },
          { name: "Khalis", url: "/khalis" },
          { name: "Lattafa", url: "/lattafa" },
          { name: "Le Chameau", url: "/le-chameau" },
          { name: "Maison Alhambra", url: "/maison-alhambra" },
          { name: "Maison Fragrance World", url: "/maison-fragrance-world" },
          { name: "Naseem Perfume", url: "/naseem-perfume" },
          { name: "Rasasi", url: "/rasasi" },
          { name: "Rue Broca", url: "/rue-broca" },
          { name: "Swiss Arabian", url: "/swiss-arabian" },
        ],
      },
      {
        name: "Attar Oil",
        list: [
          { name: "Top Selling in Attar", url: "/top-selling-attar" },
          { name: "Afnan Attar", url: "/afnan-attar" },
          { name: "Ahmed Al Maghribi Attar", url: "/ahmed-al-maghribi-attar" },
          { name: "Ajmal Attar", url: "/ajmal-attar" },
          { name: "Al Aswad", url: "/al-aswad" },
          { name: "Al Saud", url: "/al-saud" },
          { name: "Al Haramain", url: "/al-haramain-attar" },
          { name: "Anfar", url: "/anfar-attar" },
          { name: "Armaf", url: "/armaf-attar" },
          { name: "Asreh Perfumes", url: "/asreh-perfumes" },
          { name: "Birra Attar", url: "/birra-attar" },
          { name: "FridayCharm", url: "/fridaycharm" },
          { name: "Khalis", url: "/khalis-attar" },
          { name: "Naseem Attar", url: "/naseem-attar" },
          { name: "Premium Attar", url: "/premium-attar" },
          { name: "Rasasi", url: "/rasasi-attar" },
          { name: "Swiss Arabian", url: "/swiss-arabian-attar" },
          { name: "Empty Attar Bottle", url: "/empty-attar-bottle" },
          { name: "Faisal Abdul Rehman", url: "/faisal-abdul-rehman" },
        ],
      },
    ],
  },
  {
    name: "Deodorant",
    url: "/deodorant",
    dropdown: [
      {
        name: "Top Selling in Deodorant",
        url: "/top-selling-in-deodorant",
      },
      {
        name: "Top Branded Deodorants",
        url: "/top-branded-deodorants",
      },
      {
        name: "Top Branded Deodorants Stick",
        url: "/top-branded-deodorants-stick",
      },
      {
        name: "Cosmo",
        url: "/cosmo",
      },
      {
        name: "Swiss Arabian",
        url: "/swiss-arabian",
      },
      {
        name: "Rasasi",
        url: "/rasasi",
      },
    ],
  },
  {
    name: "Home Fragrance",
    url: "/home-fragrance",
    dropdown: [
      {
        name: "Top Selling in Home Fragrance",
        url: "/top-selling-in-home-fragrance",
      },
      {
        name: "Bakhoor Burner",
        url: "/bakhoor-burner",
      },
      {
        name: "Fragrance Paste",
        url: "/fragrance-paste",
      },
      {
        name: "Fragrance Sticks",
        url: "/fragrance-sticks",
      },
      {
        name: "Aroma Diffuser",
        url: "/aroma-diffuser",
      },
      {
        name: "Aroma Candle",
        url: "/aroma-candle",
      },
    ],
  },
  {
    name: "Bath & Body Care",
    url: "/bath-and-body-care",
    dropdown: [
      {
        name: "All Bath & Body Care",
        url: "/all-bath-and-body-care",
      },
      {
        name: "Body Mist",
        url: "/body-mist",
      },
      {
        name: "Body Lotion",
        url: "/body-lotion",
      },
      {
        name: "Mist Lotion Combo",
        url: "/mist-lotion-combo",
      },
      {
        name: "Shower Gel",
        url: "/shower-gel",
      },
      {
        name: "Shaving Foam",
        url: "/shaving-foam",
      },
      {
        name: "After Shave Lotion",
        url: "/after-shave-lotion",
      },
    ],
  },
  {
    name: "Miniature",
    url: "/miniature",
    dropdown: [
      {
        name: "Designer Perfume Vials",
        url: "/designer-perfume-vials",
      },
      {
        name: "Niche Perfume Vials",
        url: "/niche-perfume-vials",
      },
      {
        name: "Designer Perfume Miniatures",
        url: "/designer-perfume-miniatures",
      },
      {
        name: "Niche Perfume Miniatures",
        url: "/niche-perfume-miniatures",
      },
      {
        name: "Mini Travel Set",
        url: "/mini-travel-set",
      },
    ],
  },
];
