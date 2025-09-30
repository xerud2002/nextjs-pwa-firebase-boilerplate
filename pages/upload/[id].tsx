"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../utils/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export default function UploadPage() {
  const router = useRouter();
  const { id } = router.query;
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!files || !id) return;
    setLoading(true);

    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const storageRef = ref(storage, `uploads/${id}/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }

    await updateDoc(doc(db, "requests", id as string), {
      media: arrayUnion(...urls),
    });

    alert("✅ Fișierele au fost încărcate cu succes!");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Încarcă poze sau videoclipuri</h1>
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => setFiles(e.target.files)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!files || loading}
        className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? "Se încarcă..." : "Trimite fișierele"}
      </button>
    </div>
  );
}
