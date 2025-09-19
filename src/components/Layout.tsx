import React from "react";
import Head from "next/head";
import DashboardHeader from "@/components/DashboardHeader";

export default function Layout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="AI-Driven Biohacking for a Healthier You"
        />
      </Head>

      <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-3 bg-white shadow-md">
        <h1 className="text-xl font-bold">{title}</h1>
        <DashboardHeader />
      </header>

      <main className="min-h-screen bg-gray-50 text-gray-800 p-6">
        {children}
      </main>
    </>
  );
}
