"use client";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
export default function Hero() {
  return (
    <>
      <section className="hero-section">
        <div className="container max-auto">
          <div className="hero min-h-screen ">
            <div className="hero-content w-full sm:flex block">
              <div className="w-full">
                <h1 className="text-5xl font-bold flex flex-wrap gap-2">
                  Money Divider for
                  <TypeAnimation
                    className="text-blue-500"
                    sequence={[
                      "Trips",
                      1000,
                      "Business",
                      1000,
                      "Events",
                      1000,
                      "More.......",
                      1000,
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    style={{ display: "inline-block" }}
                  />
                </h1>
                <p className="py-6">
                  Step into a richer world by managing your finances with Money
                  Divider!
                </p>
                <Link href="/register" className="btn btn-primary">Get Started</Link>
              </div>

              <div className="text-center sm:w-8/12">
                <img
                  className="w-[450px] h-[300px]"
                  src="https://img.freepik.com/free-vector/hand-drawn-cartoon-money-illustrations_23-2150909257.jpg"
                  alt="Money Divider"
                  width={450}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
