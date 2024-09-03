import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Head from "next/head";

export default function About() {
  return (
    <MaxWidthWrapper>
      <div>
        <Head>
          <title>About Us</title>
          <meta name="description" content="Learn more about us" />
        </Head>
        <main className="flex flex-col items-center justify-center min-h-screen py-10">
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6 sm:p-10 lg:p-16">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                About Us
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Welcome to our company! We are dedicated to delivering the best
                service possible. Our team is composed of experienced
                professionals who are passionate about what they do.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our mission is to provide top-quality products and services to
                our customers. We strive to exceed expectations and continually
                improve our offerings.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Thank you for taking the time to learn more about us. We look
                forward to serving you!
              </p>
            </div>
          </div>
        </main>
      </div>
    </MaxWidthWrapper>
  );
}
