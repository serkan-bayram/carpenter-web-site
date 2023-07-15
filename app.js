const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { HostAddress } = require("mongodb");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

main().catch((err) => console.log(err));

async function main() {
  const connection = await mongoose.connect(
    "mongodb://127.0.0.1:27017/mobilya"
  );
  if (connection.connection.readyState === 1) {
    console.log("Connected to database.");
  }

  // schema for landing page
  const mobilyaSchema = new mongoose.Schema({
    catchPhrases: [String],
    aboutUs: String,
    contacts: {
      phoneNumber: String,
      whatsappNumber: String,
      email: String,
      instagram: String,
    },
    locations: [String],
  });

  // schema for landing page cards
  const cardSchema = new mongoose.Schema({
    cardImage: String,
    cardHeading: String,
    cardInfo: String,
  });

  const Card = new mongoose.model("Card", cardSchema);

  const card = {
    cardImage: "assets/card-3.webp",
    cardHeading: "Banyo mobilyası",
    cardInfo: "Estetik ve düzenin bir araya geldiği özel banyo çözümleri.",
  };

  const cardInstance = new Card(card);
  // await cardInstance.save();

  const Mobilya = mongoose.model("Mobilya", mobilyaSchema);

  const mobilya = {
    catchPhrases: [
      "20 yıllık tecrübe",
      "Vizyonunuzu gerçekleştirin",
      "Kalitenin adresi",
      "Tamir ve tadilat işleri",
      "7/24 destek",
    ],
    aboutUs:
      "Yıllardır marangozluk sektöründe birikmiş deneyimimizle, müşterilerimize özel ve kişiselleştirilmiş hizmetler sunmaktayız. Misyonumuz, ahşap malzemeleri hayata geçirirken zarafeti, dayanıklılığı ve işlevselliği bir araya getirmektir. Müşteri memnuniyeti bizim için en üst önceliktir ve her projede en yüksek kaliteyi sağlamak için titizlikle çalışırız.",
    contacts: {
      phoneNumber: "0537 879 24 64",
      whatsappNumber: "0537 879 24 64",
      email: "mehmet@gmail.com",
      instagram: "mehmet",
    },
    locations: ["Pendik", "Kartal", "Maltepe", "Kadıköy", "Kurtköy"],
  };

  const mobilyaInstance = new Mobilya(mobilya);
  // await mobilyaInstance.save();

  // fetching data from database
  const fetchedData = await Mobilya.find({ _id: "64af1b934e6b3bcc6ceadd44" });

  const contacts = fetchedData[0].contacts;
  app.get("/", async (req, res) => {
    const catchPhrases = fetchedData[0].catchPhrases;
    const aboutUs = fetchedData[0].aboutUs;
    const locations = fetchedData[0].locations;
    const fetchedCards = await Card.find({}).limit(3);

    res.render("index", {
      catchPhrases: catchPhrases,
      aboutUs: aboutUs,
      contacts: contacts,
      locations: locations,
      fetchedCards: fetchedCards,
    });
  });

  const needSchema = new mongoose.Schema({
    clientName: String,
    clientPhoneNumber: String,
    clientNeed: String,
    date: String,
  });

  app.post("/", async (req, res) => {
    const name = req.body.yourName;
    const phoneNumber = req.body.phoneNumber;
    const need = req.body.yourNeed;
    const date = new Date();

    // we need validation before we add it to database
    // schema for client's needs

    const Need = new mongoose.model("Need", needSchema);

    const needInstance = new Need({
      clientName: name,
      clientPhoneNumber: phoneNumber,
      clientNeed: need,
      date: date,
    });

    await needInstance.save();

    res.redirect("/");
  });

  const gallerySchema = new mongoose.Schema({
    photoImage: String,
    photoDirection: String,
    photoCategory: String,
    date: String,
  });

  app.get("/gallery", async (req, res) => {
    // when we add photo to database
    const date = new Date();

    const Photo = new mongoose.model("Photo", gallerySchema);

    // photoDirection -> horizontal or vertical
    const photoInstance = new Photo({
      photoImage: "pexels-pixabay-279648.jpg",
      photoDirection: "horizontal",
      photoCategory: "kitchen",
      date: date,
    });

    // await photoInstance.save();

    const horizontalPhotos = await Photo.find({
      photoDirection: "horizontal",
    });
    const verticalPhotos = await Photo.find({
      photoDirection: "vertical",
    });

    const length = Math.min(horizontalPhotos.length, verticalPhotos.length);

    res.render("gallery", {
      contacts: contacts,
      horizontalPhotos: horizontalPhotos,
      verticalPhotos: verticalPhotos,
      length: length,
    });
  });

  app.listen(3000, () => {
    console.log("Server has started on port 3000");
  });
}
