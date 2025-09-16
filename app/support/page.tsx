import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-4">Support/FAQ</h1>
        <p>This is a placeholder for the Support/FAQ page.</p>
      </main>
      <Footer />
    </div>
  );
}
