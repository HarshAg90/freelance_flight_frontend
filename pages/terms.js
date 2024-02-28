import GallerySection from "@/src/components/GallerySection";
import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";
import { partnerSliderOne, testimonialSliderOne } from "@/src/sliderProps";
import Link from "next/link";
import Slider from "react-slick";
const Privacy = () => {
  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={"T&C & Privacy Policy"} />
      <div id="privacy">
        <div id="terms">
          <h1>Terms and Conditions</h1>
          {/* <div className="line" /> */}
          <h2>Who We Are</h2>

          <p>
            Welcome to Fair Flyings! We provide online travel search services,
            helping travelers find the best flight, hotel, and car hire deals
            worldwide. Fair Flyings is dedicated to making travel planning easy
            and efficient through our websites, apps, and other platforms.
          </p>

          <p>
            Please note that Fair Flyings is not a travel agency. We do not set
            or control prices for any travel options you find and book through
            our services. All travel products, such as flights and
            accommodations, are offered by independent travel providers, and
            their terms and conditions apply.
          </p>

          <p>
            Our services and platforms are operated by Fair Flyings Limited, a
            company registered in England & Wales under company number [insert
            company number]. We are part of the Fair Flyings Group Companies,
            committed to providing travelers with exceptional service. You can
            find our company details, including our address and registered
            office, on our Company Details page.
          </p>

          <h2>Acceptance of Terms</h2>

          <p>
            By accessing or using our services or platforms, you agree to be
            bound by these terms and conditions, along with our privacy policy,
            cookie policy, and community guidelines. These terms outline your
            rights and responsibilities when using our services. If you do not
            agree to these terms, please refrain from using our services or
            platforms.
          </p>

          <p>
            Please note that certain services we offer, such as our 'Fair
            Flyings for Business' products, may have additional terms and
            conditions. You will be notified accordingly, and those terms will
            apply alongside or in place of these terms.
          </p>

          <p>
            We reserve the right to amend these terms at any time. If we make
            any changes, we will notify you, and your continued use of our
            services or platforms after the changes will constitute your
            acceptance of the revised terms. If you do not agree to the changes,
            please discontinue using our services or platforms.
          </p>

          <h2>Using Our Services</h2>

          <p>
            When using Fair Flyings' services, you must comply with all
            applicable laws and use them for legitimate purposes only. We grant
            you a non-transferable, non-exclusive license to access and use our
            services and platforms for personal, non-commercial purposes. By
            agreeing to these terms, you agree not to:
          </p>
          <ul>
            <li>
              Use our services or platforms for any improper or unlawful
              purpose.
            </li>
            <li>
              Post, share, or transmit any material that is defamatory,
              offensive, or violates the rights of others.
            </li>
            <li>
              Use our services or platforms for commercial purposes without
              authorization.
            </li>
            <li>
              Interfere with the functioning of our services or platforms.
            </li>
            <li>
              Introduce any malicious code or disrupt our systems' operation.
            </li>
            <li>
              Remove or alter any notices or trademarks on our services or
              platforms.
            </li>
          </ul>

          <p>
            Please note that unauthorized use of our services or platforms may
            result in legal action.
          </p>

          <h2>Sharing Information with Us</h2>

          <p>
            At Fair Flyings, we take your privacy seriously and comply with
            applicable data protection laws. When you provide personal data to
            us through our services or platforms, it may be used in accordance
            with our privacy policy. You are responsible for ensuring that the
            information you provide is accurate and up to date. By using our
            services or platforms, you consent to the use of your personal data
            as described in our privacy policy.
          </p>

          <p>
            If you choose to share content with us or other users, such as
            reviews or photos, you agree that:
          </p>
          <ul>
            <li>You are solely responsible for the content you upload.</li>
            <li>
              You grant Fair Flyings a license to use and display your content.
            </li>
            <li>
              Fair Flyings is not obligated to store or retain your content.
            </li>
            <li>Any feedback you provide to us becomes our property.</li>
          </ul>

          <h2>Fair Flyings' Property</h2>

          <p>
            Unless otherwise stated, all intellectual property rights in our
            services and platforms belong to Fair Flyings. You acknowledge that
            your use of our services or platforms does not grant you any
            ownership rights. You agree not to reproduce, modify, or distribute
            our services or platforms without authorization.
          </p>

          <h2>Third-Party Property</h2>

          <p>
            We respect the intellectual property rights of others. If you
            believe that any content on our services or platforms infringes your
            copyright, please contact us promptly.
          </p>

          <h2>Price Accuracy and Warranty Disclaimer</h2>

          <p>
            While we strive to provide accurate pricing information, we cannot
            guarantee the reliability or accuracy of the content displayed on
            our services or platforms. Fair Flyings provides services on an "as
            is" basis and disclaims all warranties, conditions, and guarantees
            to the extent permitted by law. We are not liable for any loss or
            damage resulting from your use of our services or platforms.
          </p>

          <h2>Price Forecasting</h2>

          <p>
            Fair Flyings may provide flight forecasting information through our
            price alert service. Please note that our forecasts are based on
            past pricing trends and may not always be accurate. We do not
            guarantee the accuracy of our forecasts and accept no liability for
            any inaccuracies.
          </p>

          <h2>Making Travel Bookings via Fair Flyings</h2>

          <p>
            Fair Flyings facilitates bookings with third-party travel providers
            but is not responsible for any arrangements made through our
            services or platforms. You are responsible for complying with the
            terms and conditions of the travel providers. Fair Flyings is not
            liable for any issues arising from your bookings.
          </p>

          <h2>Limitation of Liability</h2>

          <p>
            Fair Flyings' liability is limited to the extent permitted by law.
            We are not liable for any inaccuracies or omissions in the content
            on our services or platforms, nor for any special, indirect, or
            consequential damages resulting from your use of our services or
            platforms.
          </p>

          <h2>Your Liability to Fair Flyings</h2>

          <p>
            You are responsible for any actions that violate these terms and
            conditions. You agree to indemnify Fair Flyings for any costs,
            damages, or losses incurred as a result of your use of our services
            or platforms.
          </p>

          <h2>Termination</h2>

          <p>
            Fair Flyings may terminate your access to our services or platforms
            at any time for any reason. We may also suspend your access
            temporarily, as needed. You agree that Fair Flyings is not liable
            for any consequences resulting from such termination or suspension.
          </p>

          <h2>General Provisions</h2>

          <p>
            These terms constitute the entire agreement between you and Fair
            Flyings regarding your use of our services or platforms. They
            supersede any previous agreements or arrangements.
          </p>

          <p>
            These terms are governed by the laws of England and Wales. Any
            disputes arising from these terms shall be subject to the
            jurisdiction of the courts of England and Wales.
          </p>

          <h2>Contact Us</h2>

          <p>
            If you have any questions or suggestions regarding Fair Flyings'
            services or platforms, please contact our helpdesk. You can also
            reach us by mail at:
          </p>
          <div className="">
            <p>Fair Flyings</p>

            <p>United Kingdom</p>
          </div>
        </div>
        <div id="policy">
          <h1>Privacy Policy</h1>
          <h2>Last Updated: February 2020</h2>
          At Fair Flyings, we are committed to protecting your privacy. This
          Privacy Policy outlines how we collect, use, and safeguard your
          personal information when you use our services or platforms.
          <h2>Information We Collect</h2>
          We collect personal information such as your name, email address, and
          payment details when you use our services. We may also collect
          information about your device and usage patterns to improve our
          services.
          <h2>How We Use Your Information</h2>
          We use your information to provide and improve our services, process
          transactions, and communicate with you. We may also use your
          information for marketing purposes with your consent.
          <h2>Information Sharing</h2>
          We may share your information with third-party service providers to
          facilitate our services. We do not sell your personal information to
          third parties for their marketing purposes.
          <h2>Data Security</h2>
          We employ security measures to protect your personal information from
          unauthorized access, disclosure, or alteration. However, no method of
          transmission over the internet or electronic storage is 100% secure.
          <h2>Your Rights</h2>
          You have the right to access, update, or delete your personal
          information. You can also opt-out of receiving marketing
          communications from us.
          <h2>Children's Privacy</h2>
          Our services are not intended for children under 16 years of age. We
          do not knowingly collect personal information from children.
          <h2>Changes to This Policy</h2>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on our website.
          <h2>Contact Us</h2>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at <span>support@fairflyings.com</span>.
        </div>
      </div>
    </Layout>
  );
};
export default Privacy;
