const Images = [
    { image: require("../assets/banners/food-banner1.jpg") },
    { image: require("../assets/banners/food-banner2.jpg") },
    { image: require("../assets/banners/food-banner3.jpg") },
    { image: require("../assets/banners/food-banner4.jpg") },
    { image: require("../assets/banners/food-banner5.png") },
];

export const markers = [
    {
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      title: "Hakone Udon",
      description: "This is the best Udon in SF",
      image: Images[0].image,
      rating: 5,
      reviews: 99,
    },
    {
      coordinate: {
        latitude: 37.785784,
        longitude: -122.425640,
      },
      title: "Japanese Sushi&Rolls",
      description: "Explore the Japanese cuisine",
      image: Images[1].image,
      rating: 5,
      reviews: 102,
    },
    {
      coordinate: {
        latitude: 37.795246,
        longitude: -122.411477,
      },
      title: "SUSHI",
      description: "TRY THE CALIFORNIA ROLL",
      image: Images[2].image,
      rating: 3,
      reviews: 220,
    },
    {
      coordinate: {
        latitude: 37.777167,
        longitude: -122.432789,
      },
      title: "SUSHI SUNSET",
      description: "BEST JAPANESS SUSHI IN TOWN",
      image: Images[3].image,
      rating: 4,
      reviews: 48,
    },
    {
      coordinate: {
        latitude: 37.783213,
        longitude: -122.420535,
      },
      title: "RAMEN",
      description: "This is the best remen in SF",
      image: Images[4].image,
      rating: 4,
      reviews: 178,
    },
];


  export const mapStandardStyle = [
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
  ];