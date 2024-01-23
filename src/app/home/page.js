import Header from "@/components/Layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section>
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Money Divider for Trips</h1>
                <p className="py-6">
                Business, Personal, Family, Events, and more
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer></footer>
    </>
  );
}
