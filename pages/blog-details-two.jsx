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
            <div className="col-xl-12">
              {/*=== Blog Details Wrapper ===*/}
              <div className="blog-details-wrapper pr-lg-50">
                <div className="blog-post mb-60 wow fadeInUp">
                  <div className="post-thumbnail">
                    <img
                      src="assets/images/blog/blogZiro.png"
                      alt="Blog Image"
                    />
                  </div>
                  <div className="main-post">
                    <div className="entry-content">
                      <h3 className="title">
                      Taj Mahal, Agra, Uttar Pradesh


                      </h3>
                      <p>
                      The Taj Mahal, an architectural masterpiece and an enduring symbol of love, sits majestically on the banks of the Yamuna River. Commissioned by Emperor Shah Jahan in the 17th century in memory of his beloved wife Mumtaz Mahal, this ivory-white marble mausoleum is a marvel of Mughal architecture. The intricacy of its carvings, the symmetry of its gardens, and the ethereal beauty that changes hues with the sun's movement make it a UNESCO World Heritage Site and a wonder of the world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Detail-2  */}
              <div className="blog-details-wrapper pr-lg-50">
                <div className="blog-post mb-60 wow fadeInUp">
                  <div className="post-thumbnail">
                    <img
                      src="assets/images/blog/blogGokarna.png"
                      alt="Blog Image"
                    />
                  </div>
                  <div className="main-post">
                    <div className="entry-content">
                      <h3 className="title">
                      Jaipur City Palace, Rajasthan

                      </h3>
                      <p>
                      Nestled in the heart of the Pink City, Jaipur's City Palace is a splendid fusion of Rajput, Mughal, and European architectural styles. The palace complex comprises courtyards, gardens, and buildings, including the Chandra Mahal and Mubarak Mahal. Visitors can explore the museums showcasing royal artifacts, textiles, and art pieces that offer a glimpse into Jaipur's opulent past.

                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Detail-3  */}
              <div className="blog-details-wrapper pr-lg-50">
                <div className="blog-post mb-60 wow fadeInUp">
                  <div className="post-thumbnail">
                    <img
                      src="assets/images/blog/blogSpiti.png"
                      alt="Blog Image"
                    />
                  </div>
                  <div className="main-post">
                    <div className="entry-content">
                      <h3 className="title">
                      Khajuraho Group of Monuments, Madhya Pradesh
                      </h3>
                      <p>
                      The Khajuraho temples, constructed between 950 and 1050 CE, stand as a testament to the intricacy and artistic finesse of ancient Indian architecture. These temples boast stunning sculptures and intricate carvings that depict various aspects of human life, love, and spirituality. The exquisite craftsmanship and the depiction of diverse cultural facets make it a significant UNESCO World Heritage Site.


                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Detail-4  */}
              <div className="blog-details-wrapper pr-lg-50">
                <div className="blog-post mb-60 wow fadeInUp">
                  <div className="post-thumbnail">
                    <img
                      src="assets/images/blog/blogHampi.png"
                      alt="Blog Image"
                    />
                  </div>
                  <div className="main-post">
                    <div className="entry-content">
                      <h3 className="title">
                      Red Fort, Delhi


                      </h3>
                      <p>
                      Standing as an iconic symbol of India's struggle for independence, the Red Fort in Delhi served as the principal residence of Mughal emperors for over two centuries. Its imposing red sandstone walls house palaces, audience halls, and museums, each echoing the grandeur of the Mughal era. The fort's significance is celebrated annually during India's Independence Day with a flag-hoisting ceremony.

                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Detail-5  */}
              <div className="blog-details-wrapper pr-lg-50">
                <div className="blog-post mb-60 wow fadeInUp">
                  <div className="post-thumbnail">
                    <img
                      src="assets/images/blog/blogMegh.png"
                      alt="Blog Image"
                    />
                  </div>
                  <div className="main-post">
                    <div className="entry-content">
                      <h3 className="title">
                      Ajanta and Ellora Caves, Maharashtra

                      </h3>
                      <p>
                      Nestled in the rocky landscape of Maharashtra, the Ajanta and Ellora Caves are a treasure trove of ancient rock-cut caves representing Buddhism, Jainism, and Hinduism. The Ajanta Caves, with their mesmerizing paintings and sculptures dating back to the 2nd century BCE, depict stories from Jataka tales and the life of Buddha. The Ellora Caves, spanning different faiths and constructed between the 6th and 11th centuries, showcase intricate carvings and monolithic structures dedicated to various deities.



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
