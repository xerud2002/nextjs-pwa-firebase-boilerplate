"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../utils/firebase";
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

// 🔹 importăm componentele split-uite
import StepService from "../components/formSteps/StepService";
import StepProperty from "../components/formSteps/StepProperty";
import StepPickupAddress from "../components/formSteps/StepPickupAddress";
import StepDeliveryProperty from "../components/formSteps/StepDeliveryProperty";
import StepDeliveryAddress from "../components/formSteps/StepDeliveryAddress";
import StepMoveDate from "../components/formSteps/StepMoveDate";
import StepPacking from "../components/formSteps/StepPacking";
import StepDismantling from "../components/formSteps/StepDismantling";
import StepSurvey from "../components/formSteps/StepSurvey";
import StepContact from "../components/formSteps/StepContact";

const steps = [
  "Tip serviciu",            // 0
  "Dimensiunea mutării",     // 1
  "Detalii colectare",       // 2
  "Tip proprietate destinație", // 3
  "Adresa livrare",          // 4
  "Data mutării",            // 5
  "Împachetare",             // 6
  "Demontare",               // 7
  "Survey estimare",         // 8
  "Date de contact"          // 9
];

export default function MoveForm() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  // 🔹 default values
  const defaultFormData = {
    serviceType: "",
    propertyType: "",
    rooms: "",
    houseFloors: "",
    floor: "",
    lift: "",
    packing: "",
    stairsFrom: "",
    stairsTo: "",
    survey: "",
    details: "",
    name: "",
    phone: "",
    email: "",
    dismantling: "",
    propertyTypeTo: "",
    roomsTo: "",
    houseFloorsTo: "",
    floorTo: "",
    liftTo: "",
    moveDate: "",
    moveOption: "",
    pickupCounty: "",
    pickupCity: "",
    pickupStreet: "",
    pickupNumber: "",
    pickupDetails: "",
    pickupPostal: "",
    pickupInstructions: "",
    deliveryCounty: "",
    deliveryCity: "",
    deliveryStreet: "",
    deliveryNumber: "",
    deliveryDetails: "",
    deliveryPostal: "",
    deliveryInstructions: "",
    media: [] as File[],
  };

  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<any>(defaultFormData);

  // 🔹 load/save progress in localStorage
  useEffect(() => {
    const savedStep = localStorage.getItem("moveFormStep");
    const savedData = localStorage.getItem("moveFormData");
    if (savedStep) setStep(Number(savedStep));
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (err) {
        console.error("Failed to parse saved form data", err);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("moveFormStep", step.toString());
  }, [step, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("moveFormData", JSON.stringify(formData));
  }, [formData, hydrated]);

  if (!hydrated) return <div className="text-center py-10">Se încarcă...</div>;

  // 🔹 handle changes
  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  // 🔹 submit
  const handleSubmit = async () => {
    try {
      let mediaUrls: string[] = [];

      if (formData.media && formData.media.length > 0 && formData.survey === "media") {
        mediaUrls = await Promise.all(
          formData.media.map(async (file: File) => {
            const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
            await uploadBytes(storageRef, file);
            return await getDownloadURL(storageRef);
          })
        );
      }

      const docRef = await addDoc(collection(db, "requests"), {
        ...formData,
        media: mediaUrls,
        userId: auth.currentUser?.uid || null,
        createdAt: Timestamp.now(),
        status: "Nouă",
      });

      if (auth.currentUser) {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          name: formData.name,
          phone: formData.phone,
          email: formData.email
        }, { merge: true });
      }

      if (formData.survey === "media_later") {
        const uploadLink = `${window.location.origin}/upload/${docRef.id}`;
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            to_email: formData.email,
            to_name: formData.name || "Client",
            upload_link: uploadLink,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );
      }

      toast.success("✅ Cererea a fost salvată cu succes!");
      setFormData(defaultFormData);
      setStep(0);
      localStorage.removeItem("moveFormData");
      localStorage.removeItem("moveFormStep");
      router.push("/dashboard");
    } catch (error) {
      console.error("Eroare la salvare:", error);
      toast.error("❌ A apărut o eroare la salvarea cererii.");
    }
  };

  // 🔹 choose component based on step
  const renderStep = () => {
    switch (step) {
      case 0: return <StepService formData={formData} handleChange={handleChange} />;
      case 1: return <StepProperty formData={formData} handleChange={handleChange} />;
      case 2: return <StepPickupAddress formData={formData} handleChange={handleChange} />;
      case 3: return <StepDeliveryProperty formData={formData} handleChange={handleChange} />;
      case 4: return <StepDeliveryAddress formData={formData} handleChange={handleChange} />;
      case 5: return <StepMoveDate formData={formData} handleChange={handleChange} />;
      case 6: return <StepPacking formData={formData} handleChange={handleChange} />;
      case 7: return <StepDismantling formData={formData} handleChange={handleChange} />;
      case 8: return <StepSurvey formData={formData} handleChange={handleChange} setFormData={setFormData} />;
      case 9: return <StepContact formData={formData} handleChange={handleChange} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
          {/* Progress bar */}
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Pasul {step + 1} din {steps.length}</p>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full transition-all"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step content */}
          {renderStep()}

          {/* Navigation */}
          <div className="mt-6 flex justify-between">
            {step > 0 && (
              <button
                onClick={prevStep}
                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Înapoi
              </button>
            )}

            {step < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="ml-auto px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Următorul
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Trimite cererea
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
