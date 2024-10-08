// import React from 'react'
import Navbar from "../components/Navbar";
import HomeCards from "../components/HomeCards";

const Home = () => {
  const cardsData = [
    {
      imageSrc: "./pest-detec.png",
      title: "පලිබෝධකයන් හදුනාගැනීම",
      description:
        "අපගේ පළිබෝධ හඳුනාගැනීමේ පද්ධතිය භාවිතයෙන් බෝග පළිබෝධ හඳුනා ගන්න. උන් මර්දනය කිරීම සඳහා අපගේ හොඳම පළිබෝධනාශක ද අපි නිර්දේශ කරමු",
      buttonText: "පලිබෝධකයන් සොයන්න",
      next: "/pestDetect",
    },
    {
      imageSrc: "./plant_disease.png",
      title: "වගාවට සිදුවූ රෝග හඳුනා ගැනීම",
      description:
        "Our advanced crop disease technology will help you find the diseases in crops and suggest the best treatment.",
      buttonText: "රෝගය සොයන්න",
      next: "/diseaseDetect",
    },
    {
      imageSrc: "./farmer_manage.png",
      title: "ගොවිපළ පිළිබඳ තොරතුරු යෙදීම",
      description:
        "ගොවිපළ සම්බන්ධ අදාල තොරතුරු ඇතුලත් කර වගාවන් පිළිබඳ උපදෙස් ලබාගන්න.",
      buttonText: "තොරතුරු සැපයීම",
      next: "/farmManagement",
    },
    {
      imageSrc: "./ferti_reco.png",
      title: "භෝග නිර්දේශක සේවාව",
      description:
        "වගාබිම පිළිබද තොරතුරු සපයා ඊළඟට වගා කිරීමට සුදුසු භෝග පිළිබඳ උපදෙස් ලබාගන්න",
      buttonText: "නිර්දේශ සේවාව",
      next: "/cropRecommend",
    },
  ];
  return (
    <div className="px-4 mx-auto pt-30">
      <Navbar />
      <div className="grid grid-cols-1 gap-8 mx-auto mt-8 md:mt-36 md:grid-cols-2 sm:px-4">
        {cardsData.map((card, index) => (
          <HomeCards
            key={index}
            imageSrc={card.imageSrc}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
            next={card.next}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
