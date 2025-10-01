// scripts/seedDummyRequests.ts
import { db, auth } from "../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// 🔹 Seturi de opțiuni din formular
const services = ["Mutare completă", "Transport câteva obiecte", "Aruncare lucruri"];
const propertyTypes = ["Casă", "Apartament", "Office", "Storage"];
const rooms = ["1 cameră", "2 camere", "3 camere", "4 camere", "5+ camere"];
const floors = ["Parter", "Etaj 1", "Etaj 2", "Etaj 3", "Etaj 4", "Etaj 5+"];
const lifts = ["Da", "Nu"];
const packings = ["Da, complet", "Parțial", "Nu, ne ocupăm noi"];
const dismantlings = ["none", "all"];
const surveys = ["video", "in_person", "estimate"];
const counties = ["Alba", "Arad", "Argeș", "Brașov", "Cluj", "Timiș", "Iași", "Constanța", "Bihor"];

// 🔹 Helper random
const randomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

async function seedDummyRequests() {
  const user = auth.currentUser;
  if (!user) {
    console.error("❌ Trebuie să fii logat ca să rulezi seed-ul!");
    return;
  }

  for (let i = 0; i < 4; i++) {
    const docRef = await addDoc(collection(db, "requests"), {
      serviceType: randomItem(services),
      propertyType: randomItem(propertyTypes),
      rooms: randomItem(rooms),
      houseFloors: `${Math.floor(Math.random() * 3)} etaje`,
      floor: randomItem(floors),
      lift: randomItem(lifts),
      packing: randomItem(packings),
      dismantling: randomItem(dismantlings),
      survey: randomItem(surveys),

      pickupCounty: randomItem(counties),
      pickupCity: "Oraș " + (i + 1),
      pickupStreet: "Strada Test",
      pickupNumber: `${Math.floor(Math.random() * 100)}`,
      pickupPostal: "50" + Math.floor(Math.random() * 1000),

      deliveryCounty: randomItem(counties),
      deliveryCity: "Destinație " + (i + 1),
      deliveryStreet: "Bd. Principal",
      deliveryNumber: `${Math.floor(Math.random() * 100)}`,
      deliveryPostal: "40" + Math.floor(Math.random() * 1000),

      moveDate: `2025-10-${10 + i}`,
      createdAt: Timestamp.now(),
      status: "Nouă",
      userId: user.uid,
    });

    console.log(`✅ Request creat cu ID: ${docRef.id}`);
  }
}

seedDummyRequests().then(() => {
  console.log("🎉 Gata! Ai seed-uit date random în Firestore.");
});
