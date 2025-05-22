import { Database, Server, Cloud, Cpu } from "lucide-react"

const cardData = [
  {
    Icon: Database,
    title: "Data Engineering",
    description: "Building robust data pipelines and storage solutions",
  },
  {
    Icon: Server,
    title: "Infrastructure",
    description: "Designing scalable and resilient system architectures",
  },
  {
    Icon: Cloud,
    title: "Cloud Solutions",
    description: "Optimizing cloud resources for performance and cost",
  },
  {
    Icon: Cpu,
    title: "Automation",
    description: "Creating efficient workflows and process automation",
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-950/60 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0e7270] to-[#468872]">
            About</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-300 mb-6">
              With over a decade of experience in the tech industry, Insyte Solutions provides expert consulting and
              development services for businesses looking to modernize their technical infrastructure and data
              operations.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              Specializing in infrastructure optimization, data science solutions, automation workflows, and platform
              engineering, I help companies transform their technical capabilities to meet modern demands.
            </p>
            <p className="text-lg text-gray-300">
              My approach combines technical expertise with strategic thinking to deliver solutions that not only solve
              immediate problems but position your business for future growth.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {cardData.map((card, index) => (
              <div 
                key={index}
                className={`bg-gray-900 p-6 rounded-lg border border-[#324b4a]/90`}
              >
                <card.Icon className="h-10 w-10 text-[#329d8b] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-400">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
