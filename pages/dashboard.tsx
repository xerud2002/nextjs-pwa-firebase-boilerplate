"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { auth, db, onAuthChange, logout } from "../utils/firebase"
import { collection, query, where, getDocs, setDoc, doc, getDoc } from "firebase/firestore"
import { User } from "firebase/auth"

export default function Dashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [tab, setTab] = useState("orders")
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const statusColors: Record<string, string> = { 
        "Nouă": "bg-blue-100 text-blue-800",
        "În lucru": "bg-yellow-100 text-yellow-800",
        "Finalizată": "bg-green-100 text-green-800",
    };
    const [profile, setProfile] = useState<any>(null)

    useEffect(() => {
    if (!user) return
    const fetchProfile = async () => {
        const snap = await getDoc(doc(db, "users", user.uid))
        if (snap.exists()) setProfile(snap.data())
    }
    fetchProfile()
    }, [user])


  useEffect(() => {
    const unsub = onAuthChange((u) => {
      if (!u) {
        router.push("/auth") // dacă nu e logat, trimitem spre login
      } else {
        setUser(u)
      }
    })
    return () => unsub()
    }, [router])

  useEffect(() => {
  const fetchOrders = async () => {
    if (!user) return
    setLoading(true)
    const q = query(collection(db, "requests"), where("userId", "==", user.uid))
    const snap = await getDocs(q)
    const ordersData = snap.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null
      }
    })

    ordersData.sort((a, b) => (b.createdAt?.getTime?.() || 0) - (a.createdAt?.getTime?.() || 0))

    setOrders(ordersData)
    setLoading(false)
  }
  fetchOrders()
}, [user])



  if (!user) return null

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bun venit, {user.displayName || user.email}</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">

        <button 
          onClick={() => setTab("orders")} 
          className={tab==="orders" ? "border-b-2 border-green-600 pb-2 font-semibold" : "pb-2"}
        >
          Comenzile mele
        </button>
        <button 
          onClick={() => setTab("profile")} 
          className={tab==="profile" ? "border-b-2 border-green-600 pb-2 font-semibold" : "pb-2"}
        >
          Profil
        </button>
        <button 
          onClick={() => setTab("messages")} 
          className={tab==="messages" ? "border-b-2 border-green-600 pb-2 font-semibold" : "pb-2"}
        >
          Mesaje
        </button>
      </div>

      {/* Content */}
      {tab === "orders" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Comenzile tale</h2>
          {loading ? (
            <p>Se încarcă comenzile...</p>
          ) : orders.length === 0 ? (
            <p>Nu ai trimis nicio cerere încă.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map(order => (
                <li key={order.id} className="p-4 border rounded-lg shadow bg-white">
                  <p><strong>Serviciu:</strong> {order.serviceType}</p>
                  <p><strong>Colectare:</strong> {order.pickupCity}, {order.pickupCounty}</p>
                  <p><strong>Livrare:</strong> {order.deliveryCity}, {order.deliveryCounty}</p>
                  <p><strong>Data:</strong> {order.moveDate || order.moveOption}</p>
                  <p className="flex items-center gap-2">
                    <strong>Status:</strong>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status || "Nouă"]}`}>
                        {order.status || "Nouă"}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === "profile" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Detalii profil</h2>
            <p><strong>Email:</strong> {profile?.email || user.email}</p>
            <p><strong>Nume:</strong> {profile?.name || user.displayName || "-"}</p>
            <p><strong>Telefon:</strong> {profile?.phone || "-"}</p>
        </div>
      )}

      {tab === "messages" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Mesaje de la companii</h2>
          <p className="text-gray-600">📩 Aici vor apărea mesajele companiilor de mutări care răspund la cererile tale.</p>
          <p className="text-sm text-gray-500 mt-2">Sugestie: poți face un mini-chat pe fiecare comandă sau un inbox simplu.</p>
        </div>
      )}
    </div>
  )
}
