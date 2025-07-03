import { Leaf } from "lucide-react"

export default function CustomersLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-innecos-green to-innecos-green/90 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-innecos-yellow to-innecos-yellow/80 rounded-xl flex items-center justify-center animate-fadeIn opacity-0">
          <Leaf className="w-7 h-7 text-innecos-green" />
        </div>
        <div className="text-white text-xl animate-fadeIn opacity-0 [animation-delay:300ms]">Loading Customers...</div>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:100ms]" />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:200ms]" />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
