// import React from 'react'
import Navbar from "../components/Navbar";
import HomeCards from "../components/HomeCards";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const cardsData = [
    {
      imageSrc: "./pest-detec.png",
      title: "පලිබෝධකයන් හදුනාගැනීම",
      description:
        "අපගේ පළිබෝධ හඳුනාගැනීමේ පද්ධතිය භාවිතයෙන් බෝග පළිබෝධ හඳුනා ගන්න. උන් මර්දනය කිරීම සඳහා අපගේ හොඳම පළිබෝධනාශක ද අපි නිර්දේශ කරමු.",
      buttonText: "පලිබෝධකයන් සොයන්න",
      next: "/pestDetect",
    },
    {
      imageSrc: "./plant_disease.png",
      title: "වගාවට සිදුවූ රෝග හඳුනා ගැනීම",
      description:
        "මෙම පද්ධතිය මගින් බෝග වර්ග සඳහා වැළඳී ඇති රෝග, ඌනතා හදුනාගෙන ඒ සඳහා සුදුසු රසායනික ද්‍රව්‍ය අපි නිර්දේශ කරමු.",
      buttonText: "රෝගය සොයන්න",
      next: "/diseaseDetect",
    },
    {
      imageSrc: "./farmer_manage.png",
      title: "භෝග නිර්දේශක සේවාව",
      description:
        "ගොවිපළ සම්බන්ධ අදාල තොරතුරු ඇතුලත් කර වගා කිරීමට සුදුසු බෝග පිළිබද උපදෙස් ලබාගන්න.",
      buttonText: "නිර්දේශ සේවාව",
      next: "/cropRecommend",
    },
    {
      imageSrc: "./ferti_reco.png",
      title: "පොහොර නිර්දේශක සේවාව",
      description:
        "ඔබගේ වගාව සඳහා හොඳම පොහොර නිර්දේශ ලබා ගැනීමට, විශේෂිත පොහොර වර්ගයන් සහ යෙදීමේ උපදෙස් සපයයි. වගාව, භූමි ප්‍රදේශය, සහ පොහොර ප්‍රමාණය අනුව නිවැරදි පොහොර ක්‍රමවේදයන් පිළිබඳව තොරතුරු ලබා දේ.",
      buttonText: "නිර්දේශ සේවාව",
      next: "/fertilizer",
    },
    {
      imageSrc: "./selling.png",
      title: "විකුණුම් දත්ත ඇතුලුම්පත",
      description:
        "ඔබ කරන විකුණුම්, පාරිභෝගිකයගේ විස්තර සහ විකුණු භෝග පිළිබඳ විස්තර ඇතුලත් කරන්න.",
      buttonText: "විකුණුම් දත්ත ඇතුලුම්පත",
      next: "/sales",
    },
    {
      imageSrc: "./sales.png",
      title: "සියලුම විකුණුම්",
      description:
        "ඔබ විසින් සිදුකරන ලද සියලුම විකුණුම්, සහ විකුණුම් පිළිබඳ වාර්තාව බාගත කිරීමට මෙතනින් පිවිසෙන්න",
      buttonText: "විකිණුම් විස්තර බලන්න",
      next: "/allSale",
    },
    {
      imageSrc: "./tools.png",
      title: "කෘෂිකාර්මික අයිතම සේවාව",
      description:
        "වගාබිම පිළිබද තොරතුරු සපයා ඊළඟට වගා කිරීමට සුදුසු භෝග පිළිබඳ උපදෙස් ලබාගන්න",
      buttonText: "පිවිසෙන්න",
      next: "/inventories",
    },
    {
      imageSrc: "./equipment.png",
      title: "කෘෂිකාර්මික අයිතම තොරතුරු",
      description:
        "වගාබිම පිළිබද තොරතුරු සපයා ඊළඟට වගා කිරීමට සුදුසු භෝග පිළිබඳ උපදෙස් ලබාගන්න",
      buttonText: "පිවිසෙන්න",
      next: "/adminInventories",
    },
    {
      imageSrc: "./graph.png",
      title: "ප්‍රදේශ අනුව වගා ව්‍යාප්තිය",
      description:
        "පළාත් අනුව ඒ ඒ ප්‍රදේශයන්හි වගා කර ඇති බෝග වර්ග සහ ඒවායේ ප්‍රමාණයන් පිළිබඳ විස්තර සඳහා පිවිසෙන්න.",
      buttonText: "පිවිසෙන්න",
      next: "/cultivatedLandAreaChart",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="px-4 mx-auto pt-30">
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
      <Footer />
    </>
  );
};

export default Home;
