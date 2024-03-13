import React from "react";
import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";

export default function contact_us() {
  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner
        url={"assets/images/bg/page-bg.jpg"}
        pageTitle={"Contact Us"}
      />
      <div id="contact_us">
        <h1>Contact Us</h1>
        <p>
          Welcome to our contact page! We're thrilled that you're interested in
          reaching out to us. Whether you have questions, feedback, or just want
          to say hello, we'd love to hear from you. Below you'll find multiple
          ways to get in touch with our team.
        </p>
        <br />
        <h2>Contact Information</h2>
        <p>Address:</p>
        <p>3RD FLOOR, ORCHID CENTRE, SECTOR 53, DEF QE, DLF QE</p>
        <p>GURGAON- 122002, HARYANA</p>
        <p>India</p>

        <br />
        <p>Phone:</p>
        <p>+91 9654 5411 48</p>
        <br />
        <p>Email:</p>
        <p>Fairflying7@gmail.com</p>
        <br />
        <h2>Contact Form</h2>
        <p>
          Have a specific inquiry or request? Feel free to send us a message
          using the contact form below. We strive to respond to all inquiries
          within 24-48 hours.
        </p>

        <input type="text" name="" placeholder="email" id="" />
        <input type="text" name="" id="" placeholder="subject" />
        <textarea type="text" name="" id="" placeholder="body" />
        <button>Submit</button>
        <h2>Social Media</h2>
        <p>
          Connect with us on social media for the latest updates, news, and
          behind-the-scenes content.
        </p>

        <a>Facebook</a>
        <a>Twitter</a>
        <a>Instagram</a>
        <a>LinkedIn</a>
        <h2>Visit Us</h2>
        <p>
          If you're in the area, we'd love for you to drop by and say hello! Our
          doors are always open during business hours.
        </p>
        <br />

        <p>Hours of Operation:</p>
        <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
        <p>Saturday: 10:00 AM - 2:00 PM</p>
        <p>Sunday: Closed</p>
      </div>
    </Layout>
  );
}
