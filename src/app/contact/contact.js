export default function Contact() {
  return (
    <>
      <section className="contact-section">
        <div className="container mx-auto p-4 mt-5">
          <div className="text-center text-5xl font-bold mb-16 text-blue-500">
            Contact
          </div>
          <div className="flex justify-center">
            <from className="w-full md:w-8/12">
              <div>
                <label className="from-control w-full">
                  <div className="lable">
                    <span className="lable-text font-blod">Name</span>
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              <div>
                <label className="from-control w-full">
                  <div className="lable">
                    <span className="lable-text font-blod">Subject</span>
                  </div>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Enter your subject"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              <div>
                <label className="from-control w-full">
                  <div className="lable">
                    <span className="lable-text font-blod">Email</span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              <div>
                <label className="from-control w-full">
                  <div className="lable">
                    <span className="lable-text font-blod">message</span>
                  </div>
                  <input
                    type="message"
                    name="message"
                    id="message"
                    placeholder="Enter your message"
                    className="textarea textaarea-bordered w-full"
                  />
                </label>
              </div>
              <div>
                <button className="btn btn-primary w-full mt-5">Submit</button>
              </div>
            </from>
          </div>
        </div>
      </section>
    </>
  );
}
