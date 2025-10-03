import MoveForm from "../components/MoveForm";
import { doc, getDoc } from "firebase/firestore"

export default function FormPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <MoveForm />
    </div>
  );
}
