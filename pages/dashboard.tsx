"use client"
import { useEffect, useState } from "react"
import { db, onAuthChange } from "../utils/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { User } from "firebase/auth"

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [requests, setRequests] = useState<any[]>([])

  useEffect(() => {
    const unsub = onAuthChange(setUser)
    return () => unsub()
  }, [])

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return
      const q = query(collection(db, "requests"), where("userId", "==", user.uid))
      const snap = await getDocs(q)
      setRequests(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }
    fetchRequests()
  }, [user])

  if (!user) return <p className="p-10">Te rugăm să te autentifici pentru a vedea cererile.</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cererile tale</h1>
      {requests.length === 0 ? (
        <p>Nu ai nicio cerere trimisă încă.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map(req => (
            <li key={req.id} className="p-4 border rounded-lg shadow">
              <p><strong>Serviciu:</strong> {req.serviceType}</p>
              <p><strong>Mutare:</strong> {req.pickupCity} → {req.deliveryCity}</p>
              <p><strong>Data:</strong> {req.moveDate || req.moveOption}</p>
              <p><strong>Status:</strong> {req.status || "Nouă"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
