
export default function About() {
    return (
      <>
        <section className="about-section">
          <div className="container mx-auto p-4">
            <div className="text-center text-5xl font-bold mb-16 text-blue-500">
              About As
            </div>
            <div className="md:flex">
              <div className="text-center md:w-4/12">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/31/11/58/money-1015277_640.jpg"
                  alt="About"
                  width="100%"
                  height="auto"
                />
              </div>
              <div className="md:w-8/12">
                <div className="mb-5">
                  <div className="text-xl font-bold md-2">
                    Description of the app
                  </div>
                  <p>
                    Within the app you can have multiple virtual accounts where
                    you can add funds on the go. The accounts will need to have
                    their percentage distribution from 1 - 100%. By adding any
                    funds that comes into your hand the app will distribute it in
                    every account by its default distribution percentage (Note:
                    that you can change the default distribution by its easily
                    edit percentage distribution feature). When you have an
                    expense you can choose from which account to take out.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  