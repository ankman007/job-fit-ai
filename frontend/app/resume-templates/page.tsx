// 'use client';
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { ResumeTemplateAccess } from "@/components/resume-template-access";
import { useState, useRef } from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Free Resume Templates | JobPrepAI",
  description:
    "Download free professional resume templates to help you land your dream job",
};

export default function ResumeTemplatesPage() {

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-b from-teal-600 to-teal-700 text-white py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6 max-w-2xl mx-auto lg:mx-0">
              <Badge variant="secondary" className="mb-2">
                100% Free
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center lg:text-left">
                Professional Resume Templates
              </h1>
              <p className="text-teal-100 text-lg">
                Stand out from the competition with our professionally designed
                resume templates. Easy to use, ATS-friendly, and completely
                free.
              </p>
              <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                <Button
                  size="lg"
                  className="bg-white text-teal-700 hover:bg-teal-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Browse Templates
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative max-w-md mx-auto">
                <div className="absolute top-0 left-0 w-full h-full bg-white/10 rounded-lg transform -rotate-6"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-white/20 rounded-lg transform rotate-3"></div>
                <div className="relative bg-white rounded-lg shadow-lg p-4">
                  <div className="bg-gray-100 h-6 w-32 rounded mb-4"></div>
                  <div className="bg-gray-100 h-10 w-full rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="bg-gray-100 h-4 w-20 rounded"></div>
                    <div className="bg-gray-100 h-4 w-20 rounded"></div>
                  </div>
                  <div className="bg-gray-100 h-4 w-full rounded mb-2"></div>
                  <div className="bg-gray-100 h-4 w-full rounded mb-2"></div>
                  <div className="bg-gray-100 h-4 w-3/4 rounded mb-4"></div>
                  <div className="bg-teal-100 h-6 w-40 rounded mb-4"></div>
                  <div className="bg-gray-100 h-4 w-full rounded mb-2"></div>
                  <div className="bg-gray-100 h-4 w-full rounded mb-2"></div>
                  <div className="bg-gray-100 h-4 w-2/3 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 px-4 bg-white" id="access-templates">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              How to Access and Use Templates
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to get started with our free resume
              templates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Access Templates</h3>
              <p className="text-gray-600">
                Click the button below to open our Google Sheets template
                collection
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make a Copy</h3>
              <p className="text-gray-600">
                Select "File" {">"} "Make a copy" to create your own editable
                version
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Customize & Download
              </h3>
              <p className="text-gray-600">
                Fill in your information, then download as PDF for your job
                applications
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg border text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Access our collection of free, professionally designed resume
              templates on Google Sheets. No sign-up required, just click and
              start customizing!
            </p>
            <ResumeTemplateAccess />
            <p className="mt-4 text-sm text-gray-500">
              By using our templates, you agree to our terms of use. Templates
              are for personal use only.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
