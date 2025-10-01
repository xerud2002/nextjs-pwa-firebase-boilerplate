"use client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { db, auth, onAuthChange } from "../../utils/firebase"
import { doc, getDoc, collection, query, orderBy, getDocs, addDoc, Timestamp } from "firebase/firestore"

export default function OrderDetails() {
  const router = useRouter()
  const { id } = router.query
  const [order, setOrder] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const unsub = onAuthChange((u) => {
      if (!u) router.push("/auth")
    })
    return () => unsub()
  }, [router])

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return
      const snap = await getDoc(doc(db, "requests", id as string))
      if (snap.exists()) setOrder({ id: snap.id, ...snap.data() })
    }
    const fetchMessages = async () => {
      if (!id) return
      const q = query(collection(db, "requests", id as string, "messages"), orderBy("createdAt", "asc"))
      const snap = await getDocs(q)
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    }
    fetchOrder()
    fetchMessages()
  }, [id])

  const sendMessage = async () => {
    if (!id || !newMessage.trim()) return
    await addDoc(collection(db, "requests", id as string, "messages"), {
      sender: "client",
      text: newMessage,
      createdAt: Timestamp.now()
    })
    setNewMessage("")
    // refresh local messages
    const q = query(collection(db, "requests", id as string, "messages"), orderBy("createdAt", "asc"))
    const snap = await getDocs(q)
    setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }

  if (!order) return <p className="p-10">Se încarcă detaliile comenzii...</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Comanda #{order.id}</h1>
      <div className="p-4 border rounded-lg bg-white shadow mb-6">
        <p><strong>Serviciu:</strong> {order.serviceType}</p>
        <p><strong>Colectare:</strong> {order.pickupCity}, {order.pickupCounty}</p>
        <p><strong>Livrare:</strong> {order.deliveryCity}, {order.deliveryCounty}</p>
        <p><strong>Data:</strong> {order.moveDate || order.moveOption}</p>
        <p><strong>Status:</strong> {order.status || "Nouă"}</p>
      </div>

      {/* Mesaje */}
      <h2 className="text-xl font-bold mb-4">Mesaje</h2>
      <div className="space-y-3 mb-4">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`p-3 rounded-lg ${msg.sender === "client" ? "bg-green-100 text-right" : "bg-gray-100"}`}
          >
            <p>{msg.text}</p>
            <span className="text-xs text-gray-500">{msg.createdAt?.toDate().toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Scrie un mesaj..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button 
          onClick={sendMessage} 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Trimite
        </button>
      </div>
    </div>
  )
}
