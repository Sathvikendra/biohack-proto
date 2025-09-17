import React from "react";
import Head from "next/head";
import DashboardHeader from "@/components/DashboardHeader";

export default function Layout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="AI-Driven Biohacking for a Healthier You" />
        <DashboardHeader />
      </Head>
      <main className="min-h-screen bg-gray-50 text-gray-800">
        {children}
      </main>
    </>
  );
}
