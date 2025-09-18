import Layout from "@/components/Layout";
import Link from "next/link";
import { useAuth } from '../context/AuthContext';


export default function Home() {
  return (
    <Layout title="Biohack Prototype">
      <section className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          AI-Driven Biohacking for a Healthier You
        </h1>
        <p className="max-w-xl mb-8 text-gray-600">
          Personalized plans, virtual therapies, and nutraceutical guidance—powered by Generative AI.
        </p>
        <Link href="/auth/signup" className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700">
          Get Started
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 py-12">
        {[
          { title: "AI Health Coach", text: "Chat to get instant lifestyle guidance." },
          { title: "Virtual Biohack Center", text: "Discover therapies like Infrared Sauna & PEMF." },
          { title: "Nutraceutical Recommender", text: "Personalized supplement suggestions." }
        ].map((card) => (
          <div key={card.title} className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.text}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}
