import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(12)
  const [number, setNumber] = useState(true)
  const [charAllowed, setCharAllowed] = useState(true)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (number) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*_+{}[]<>?"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, number, charAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, charAllowed, passwordGenerator])

  const copyToClipboard = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }  

  const getStrength = () => {
    if (length > 12 && number && charAllowed) return { text: "Strong 🔥☠️", color: "text-green-400" }
    if (length > 8 && (number || charAllowed)) return { text: "Medium ⚡🚀", color: "text-yellow-400" }
    return { text: "Weak 😭🤡", color: "text-red-400" }
  }

  const strength = getStrength()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md shadow-2xl rounded-2xl px-6 py-8 bg-gray-900 text-orange-400 border border-gray-700">
        
        <h1 className="text-white text-3xl font-extrabold text-center mb-8">🔐 Password Generator</h1>

        {/* Password Display */}
        <div className="flex shadow rounded-lg overflow-hidden mb-6 bg-white">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-3 text-lg text-gray-900 font-semibold"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-5 font-semibold"
          >
            Copy

          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-y-5 text-sm">
          {/* Length slider */}
          <div className="flex items-center justify-between">
            <label className="text-white font-medium">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={25}
              value={length}
              className="cursor-pointer w-2/3 accent-orange-500"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          {/* Number checkbox */}
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={number}
              id="numberInput"
              onChange={() => setNumber((prev) => !prev)}
              className="accent-orange-500"
            />
            <label htmlFor="numberInput" className="text-white">Include Numbers</label>
          </div>

          {/* Character checkbox */}
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
              className="accent-orange-500"
            />
            <label htmlFor="characterInput" className="text-white">Include Special Characters</label>
          </div>
        </div>

        {/* Strength indicator */}
        <div className="mt-6 text-center font-semibold text-lg">
          Password Strength: <span className={strength.color}>{strength.text}</span>
        </div>

        {/* Generate Button */}
        <button
          onClick={passwordGenerator}
          className="mt-8 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-600 hover:to-orange-600 text-white py-3 rounded-xl font-bold transition-all duration-200"
        >
          Generate New Password
        </button>
      </div>
    </div>
  )
}

export default App
