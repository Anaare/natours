// I'm gonna have to fetch data for the cards from API

import Card from "../components/overview-components/Card";

const cards = [
  {
    src: "",
    alt: "f",
    heading: "fff",
    subheading: "fffff",
    description: "loremipsum",
    location: "bali",
    date: "asd",
    stops: 3,
    people: 5,
    price: 200,
    rating: 2.6,
    ratingsTotal: 10,
  },
  {
    src: "",
    alt: "f",
    heading: "fff",
    subheading: "fffff",
    description: "loremipsum",
    location: "bali",
    date: "asd",
    stops: 3,
    people: 5,
    price: 200,
    rating: 2.6,
    ratingsTotal: 10,
  },
  {
    src: "",
    alt: "f",
    heading: "fff",
    subheading: "fffff",
    description: "loremipsum",
    location: "bali",
    date: "asd",
    stops: 3,
    people: 5,
    price: 200,
    rating: 2.6,
    ratingsTotal: 10,
  },
];

// And ofc I'm gonna have to implement routing
const Overview = () => {
  return (
    <main className="main">
      <div className="card-container">
        {cards.map((card) => (
          <Card
            src={card.src}
            alt={card.alt}
            heading="fff"
            subheading="fffff"
            description="loremipsum"
            location="bali"
            date="asd"
            stops={3}
            people={5}
            price={200}
            rating={2.6}
            ratingsTotal={10}
          />
        ))}
      </div>
    </main>
  );
};

export default Overview;
