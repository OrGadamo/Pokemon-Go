//contact js
//load contact page to index
function loadContactPage() {
  document.getElementById("changer_main").className =
    "d-flex justify-content-center align-items-center";
  document.getElementById("changer_main").innerHTML = `
    <div class="container-fluid my-5" id="contact_div">
    <div class="row rounded shadow-5-strong">
      <div
        class="col-12 col-xxl-6 px-0 d-flex justify-content-center justify-content-xxl-end"
      >
        <div
          id="contact_formcon"
          class="bg-light h-100 p-5 d-flex flex-column justify-content-around"
        >
          <div>
            <h1 class="display-1">Contact-Us</h1>
            <h4>We will be happy to hear everthing you have to say</h4>
          </div>
          <form
            id="contact_form"
            action="https://formsubmit.co/your@email.com"
            method="POST"
          >
            <div class="form-outline mb-4">
              <input
                type="text"
                id="user_name"
                name="name"
                class="form-control"
              />
              <label class="form-label" for="user_name">Full Name</label>
            </div>
            <div class="form-outline mb-4">
              <input
                type="email"
                name="email"
                id="user_email"
                class="form-control"
              />
              <label class="form-label" for="user_email"
                >Email address</label
              >
            </div>
            <div class="form-outline mb-4">
              <textarea
                class="form-control"
                id="user_message"
                rows="4"
              ></textarea>
              <label class="form-label" name="message" for="user_message"
                >Message</label
              >
            </div>
            <button type="submit" class="btn btn-primary btn-block mb-4">
              Send
            </button>
          </form>
        </div>
      </div>
      <div
        class="col-12 d-flex justify-content-center d-xxl-block col-xxl-6 px-0"
      >
        <img id="img_contact" src="images/contact.jpeg" alt="" />
      </div>
    </div>
  </div>
    `;
}
