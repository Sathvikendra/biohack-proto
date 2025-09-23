import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout title="Biohack Prototype" showHeader={false}>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-24 px-6 text-center bg-gradient-to-b from-teal-50 to-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-teal-700 leading-tight">
          AI-Driven Biohacking for a Healthier You
        </h1>
        <p className="max-w-2xl mb-10 text-gray-600 text-lg">
          Personalized plans, virtual therapies, and nutraceutical guidance—powered by Generative AI.
        </p>
        <Link
          href="/auth/login"
          className="relative inline-block px-8 py-3 font-medium text-white rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all duration-300"
        >
          Get Started
          <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-white opacity-0 hover:opacity-10 transition duration-300"></span>
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-700">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "AI Health Coach", text: "Chat to get instant lifestyle guidance." },
            { title: "Virtual Biohack Center", text: "Discover therapies like Infrared Sauna & PEMF." },
            { title: "Nutraceutical Recommender", text: "Personalized supplement suggestions." }
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-teal-600">{card.title}</h3>
              <p className="text-gray-700">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-col items-center justify-center py-20 px-6 bg-teal-50 rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-teal-700 text-center">
          Ready to Begin Your Biohacking Journey?
        </h2>
        <p className="max-w-xl mb-8 text-gray-600 text-center">
          Sign up now and get personalized insights, virtual therapies, and AI guidance tailored for you.
        </p>
        <Link
          href="/auth/login"
          className="px-8 py-3 font-medium text-white rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all duration-300"
        >
          Get Started
        </Link>
      </section>
    </Layout>
  );
}
