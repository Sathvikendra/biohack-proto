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

      <header className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-xl font-bold">{title}</h1>
        <DashboardHeader />
      </header>

      <main className="min-h-screen bg-gray-50 text-gray-800">
        {children}
      </main>
    </>
  );
}
