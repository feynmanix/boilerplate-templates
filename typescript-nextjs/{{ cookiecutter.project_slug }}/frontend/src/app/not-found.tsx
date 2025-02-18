import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-4 container mx-auto max-w-4xl">
      <div className="bg-white/5 backdrop-blur-sm rounded-md p-8 text-center space-y-4">
        <h1 className="text-2xl font-semibold">404 - Page Not Found</h1>
        <p className="text-gray-300">Sorry, I couldn&apos;t find the page you&apos;re looking for.</p>
        <Link
          href="/"
          className="inline-block mt-4 px-4 py-2 rounded-md bg-white/10 
                     hover:bg-white/15 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
