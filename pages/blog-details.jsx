import GallerySection from "@/src/components/GallerySection";
import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";
import Link from "next/link";
const BlogDetails = () => {
  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={"Blog Details"} />
      {/*====== Start Blog Details Section ======*/}
      <section className="blog-details-section pt-100 pb-100">
        <div className="container">
          <div className="row">
          <h2 className="title">
          Exploring India's Best-Kept Secrets: Unveiling Hidden Gems
                        
                      </h2> <h8> <br/>.</h8>
            <div className="col-xl-6">
              {/*=== Blog Details Wrapper ===*/}
              <div className="blog-details-wrapper pr-lg-50">
                <div className="blog-post mb-60 wow fadeInUp">
                  <div className="post-thumbnail">
                  <h3 className="title">
                      Ziro Valley, Arunachal Pradesh
                        
                      </h3><h8>. <br/></h8>
                    <img
                      src="assets/images/blog/blogZiro.png"
                      alt="Blog Image"
                    />
                  </div>
                  <div className="main-post">
                    <div className="entry-content">
                      
                      <p><br/>
                      Tucked away in the northeastern state of Arunachal Pradesh, Ziro Valley is a haven for nature lovers and adventure seekers. Surrounded by misty mountains and lush paddy fields, this UNESCO World Heritage Site is known for its vibrant local culture, music festivals, and scenic hiking trails.

                    Explore the Apatani tribal culture, known for its unique farming practices and traditional houses. The Ziro Music Festival, held annually, attracts music enthusiasts from across the globe to immerse themselves in the local folk music scene.

To reach Ziro Valley, one can fly to Tezpur or Guwahati and then take a scenic road trip amidst breathtaking landscapes.

                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Detail-2  */}
              <div className="blog-details-wrapper pr-lg-50">
                <div className="blog-post mb-60 wow fadeInUp">
                  <div className="post-thumbnail">
                  <h3 className="title">
                      Gokarna, Karnataka 
                      </h3><h8>. <br/></h8>
                    <img
                      src="assets/images/blog/blogGokarna.png"
                      alt="Blog Image"
                    />
                  </div>
                  <div className="main-post">
                    <div className="entry-content">
                      
                      <p> <br/>
                      Move over Goa, Gokarna is the new beach paradise on India's west coast. This serene coastal town offers pristine beaches, like Om Beach and Half Moon Beach, perfect for those seeking tranquility away from the hustle and bustle. Embrace the laid-back vibe, explore ancient temples, and indulge in delicious seafood by the shore.

                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Detail-3  */}
              <div className="blog-details-wrapper pr-lg-50">
                <div className="blog-post mb-60 wow fadeInUp">
                  <div className="post-thumbnail">
                  <h3 className="title">
                      Spiti Valley, Himachal Pradesh 
                      </h3><h8>. <br/></h8>
                    <img
                      src="assets/images/blog/blogSpiti.png"
                      alt="Blog Image"
                    />
                  </div>
                  <div className="main-post">
                    <div className="entry-content">
                      
                      <p><br/>
                      For the adventurous souls craving rugged landscapes and untouched beauty, Spiti Valley in Himachal Pradesh is a must-visit. Nestled amidst the Himalayas, this high-altitude desert boasts monasteries, clear rivers, and breathtaking vistas. Travelers can trek, camp, and immerse themselves in the local Tibetan culture.

Key attractions include the centuries-old Ki Monastery perched atop a hill, the picturesque Chandratal Lake, and the ancient Tabo Monastery, known for its exquisite frescoes.

Access to Spiti Valley usually involves a road trip from Manali or Shimla, offering awe-inspiring views along the way.

                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-6">
              {/* Detail-4  */}
              <div className="blog-details-wrapper pr-lg-50">
                <div className="blog-post mb-60 wow fadeInUp">
                  <div className="post-thumbnail">
                  <h3 className="title">
                      Hampi, Karnataka 
                      </h3><h8>. <br/></h8>
                    <img
                      src="assets/images/blog/blogHampi.png"
                      alt="Blog Image"
                    />
                  </div>
                  <div className="main-post">
                    <div className="entry-content">
                      
                      <p> <br/>
                      Step into the ancient ruins of Hampi, a UNESCO World Heritage Site that transports you back in time. Marvel at the spectacular architecture of temples, bazaars, and monuments scattered across a surreal landscape of boulders. Hampi is a photographer's paradise and a historian's delight.

Explore the Virupaksha Temple, the Vittala Temple with its iconic stone chariot, and the Royal Enclosure, which was once the seat of power. Hampi's vibrant history and magnificent ruins make it a captivating destination.

                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Detail-5  */}
              <div className="blog-details-wrapper pr-lg-50">
                <div className="blog-post mb-60 wow fadeInUp">
                  <div className="post-thumbnail">
                  <h3 className="title">
                      Mawlynnong, Meghalaya 
                      </h3><h8>. <br/></h8>
                    <img
                      src="assets/images/blog/blogMegh.png"
                      alt="Blog Image"
                    />
                  </div>
                  <div className="main-post">
                    <div className="entry-content">
                      
                      <p><br/>
                      Known as the cleanest village in Asia, Mawlynnong in Meghalaya offers a glimpse into sustainable living amidst lush greenery. Discover living root bridges, explore the nearby forests, and interact with the friendly Khasi tribe, known for their hospitality and eco-friendly lifestyle.

The living root bridges, crafted by intertwining the aerial roots of rubber trees, are a testament to the harmony between nature and human ingenuity. Additionally, hike to the nearby Balancing Rock for panoramic views of Bangladesh.

Mawlynnong is accessible from Shillong, the capital of Meghalaya, through a picturesque drive.

                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default BlogDetails;
