import { Users, Code, Zap, Globe } from "lucide-react"

const features = [
  {
    icon: <Users size={40} />,
    title: "Match with Developers",
    description: "Find developers with similar interests and skills to collaborate on projects.",
  },
  {
    icon: <Globe size={40} />,
    title: "Global Developer Network",
    description: "Connect with developers from around the world and expand your professional network.",
  },
  {
    icon: <Zap size={40} />,
    title: "Fast Pairing",
    description: "Pair with developers who share your skills and interests in a matter of minutes.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Why Choose devTinder?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center ">
              <div className="text-blue-600 mb-4 flex justify-center items-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

