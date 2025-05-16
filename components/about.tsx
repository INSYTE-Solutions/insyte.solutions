import { Database, Server, Cloud, Cpu } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            About Mark Solutions
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-300 mb-6">
              With over a decade of experience in the tech industry, Mark Solutions provides expert consulting and
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
            <div className="bg-gray-900 p-6 rounded-lg border border-blue-900/30">
              <Database className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Data Engineering</h3>
              <p className="text-gray-400">Building robust data pipelines and storage solutions</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-blue-900/30">
              <Server className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Infrastructure</h3>
              <p className="text-gray-400">Designing scalable and resilient system architectures</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-blue-900/30">
              <Cloud className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cloud Solutions</h3>
              <p className="text-gray-400">Optimizing cloud resources for performance and cost</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-blue-900/30">
              <Cpu className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Automation</h3>
              <p className="text-gray-400">Creating efficient workflows and process automation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
