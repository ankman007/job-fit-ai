'use client';
import { Button } from "@/components/ui/button";
import { HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Home() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isLoggedIn =
    typeof accessToken === "string" && accessToken.trim() !== "";
  const linkHref = isLoggedIn ? "/generate" : "/auth/login";

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Free Section */}
      <section id="pricing" className="py-8 bg-teal-50">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <CheckCircle className="h-5 w-5 text-teal-600" />
            <span className="font-medium">100% Free</span>
            <span className="text-gray-600">No credit card required</span>
          </div>
        </div>
      </section>

      <div id="features">
        <Features />
      </div>

      <section id="generate" className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to ace your next interview?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Create your personalized interview cheatsheet in minutes with our
            AI-powered platform.
          </p>
          <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
              <Link href={linkHref}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
          </Button>
        </div>
      </section>

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <Footer />
    </main>
  );
}
