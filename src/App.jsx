import { useState, useRef } from "react"
import { submitToMockApi } from "./api/mockApi"

const MAX_RETRIES = 3

export default function App() {
  const [email, setEmail] = useState("")
  const [amount, setAmount] = useState("")
  const [status, setStatus] = useState("idle")
  const [records, setRecords] = useState([])
  const inFlightKey = useRef(null)
  const submittedKeys = useRef(new Set())

  const generateKey = (email, amount) => `${email}_${amount}`

  const submitWithRetry = async (payload, key) => {
    let attempt = 0

    const trySubmit = async () => {
      try {
        const res = await submitToMockApi(payload)
        if (res.status === 200) {
          if (!submittedKeys.current.has(key)) {
            submittedKeys.current.add(key)
            setRecords(prev => [...prev, payload])
          }
          setStatus("success")
          inFlightKey.current = null
        }
      } catch (err) {
        if (attempt < MAX_RETRIES) {
          attempt++
          setStatus(`retrying (${attempt})`)
          setTimeout(trySubmit, 1500)
        } else {
          setStatus("failed")
          inFlightKey.current = null
        }
      }
    }

    trySubmit()
  }

  const handleSubmit = e => {
    e.preventDefault()

    const key = generateKey(email, amount)

    if (inFlightKey.current === key || submittedKeys.current.has(key)) {
      return
    }

    const payload = { email, amount }

    inFlightKey.current = key
    setStatus("pending")

    submitWithRetry(payload, key)
  }

  return (
    <div className="container">
      <h2>Eventually Consistent Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          required
          onChange={e => setAmount(e.target.value)}
        />

        <button disabled={status === "pending"}>
          Submit
        </button>
      </form>

      <div className="status">Status: {status}</div>

      <h3>Submitted Records</h3>
      <ul>
        {records.map((r, i) => (
          <li key={i}>
            {r.email} — {r.amount}
          </li>
        ))}
      </ul>
    </div>
  )
}
