import React from "react";
import Head from "next/head";
import DashboardHeader from "@/components/DashboardHeader";

export default function Layout({
  title,
  children,
  showHeader = true,
}: {
  title: string;
  children: React.ReactNode;
  showHeader?: boolean;
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

      {showHeader && <DashboardHeader />}

      <main className="min-h-screen bg-gray-50 text-gray-800 p-6">
        {children}
      </main>
    </>
  );
}
