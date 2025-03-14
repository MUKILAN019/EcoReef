import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Card from "../components/card";
import Media from "../utilis/media";
const SplashPage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { rootMargin: "0px", threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-animation");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const destinations = [
    {
      title: "Great Barrier Reef",
      location: "Australia",
      image:
        "https://cdn.britannica.com/64/155864-050-34FBD7A2/view-Great-Barrier-Reef-Australia-coast.jpg",
      description:
        "The world's largest coral reef system, home to thousands of species.",
    },
    {
      title: "Belize Barrier Reef",
      location: "Caribbean Sea",
      image:
        "https://cdn.britannica.com/82/153382-050-97C15C82/Blue-Hole-Natural-Monument-Belize.jpg",
      description:
        "A UNESCO World Heritage site with over 100 coral species and 500 fish species.",
    },
    {
      title: "Raja Ampat",
      location: "Indonesia",
      image:
        "https://i.pinimg.com/564x/f9/98/9a/f9989a9a5b763f1f901788cf2382037c.jpg",
      description: "One of the most biodiverse marine habitats on Earth.",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <Header />
     
      <section id="discover" className="py-24 px-6 relative overflow-hidden bg-[#1d232a]">
      
        <div className="relative w-full h-screen overflow-hidden rounded-lg">
            {/* Video Background */}
            <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover brightness-75"
            >
            <source src={Media.coralMedia} type="video/mp4" />
            </video>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white backdrop-blur-md"></div>

            {/* Floating Animated Blobs (for extra effect) */}
            <div className="absolute left-[10%] top-[15%] w-[300px] h-[300px] bg-coral-500 rounded-full opacity-20 animate-blob"></div>
            <div className="absolute right-[15%] bottom-[10%] w-[350px] h-[350px] bg-ocean-500 rounded-full opacity-25 animate-blob"></div>

            {/* Content Overlay */}
            <div className="relative z-10 flex items-center justify-center h-full">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-100 text-center drop-shadow-lg animate-fade-in-up">
                Explore the Beauty of Coral Reefs
            </h1>
            </div>
        </div>
        


        <div className="container mx-auto relative z-20 p-16">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-animation opacity-0 translate-y-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-500">
              Explore the world beneath the waves
            </h2>
            <p className="text-gray-300">
              Immerse yourself in the beauty and diversity of coral reef
              ecosystems from around the globe.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((item, index) => (
              <div
                key={index}
                className="scroll-animation opacity-0 translate-y-10"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="h-full overflow-hidden p-0">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="bg-white/20 backdrop-blur-md rounded-full py-1 px-3 text-xs mb-2 inline-block">
                        {item.location}
                      </span>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 mb-4">{item.description}</p>
                    <a
                      href="/login"
                      className="text-blue-500 hover:text-blue-600 font-medium inline-flex items-center"
                    >
                      Explore more
                    </a>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative bg-[#1d232a]">
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 scroll-animation opacity-0 translate-y-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Preserving and protecting coral ecosystems
              </h2>
              <p className="text-gray-400 mb-6">
                We're dedicated to raising awareness about the importance of
                coral reefs and the threats they face. Through innovative
                technology and community engagement, we aim to inspire a new
                generation of ocean conservationists.
              </p>
            </div>
            <div className="order-1 lg:order-2 scroll-animation opacity-0 translate-y-10">
                <Card className="relative z-10 overflow-hidden rounded-3xl shadow-xl bg-white/80 backdrop-blur-md">
                    {/* Image Wrapper */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden group">
                    <img
                        src="https://img.freepik.com/free-photo/coral-bleaching-threat-sealife_23-2151002055.jpg"
                        alt="Coral conservation"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                    {/* Floating Text Effect */}
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">Protecting Coral Reefs</h3>
                        <p className="text-sm text-gray-200">A step towards ocean conservation</p>
                    </div>
                    </div>
                </Card>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-animation opacity-0 translate-y-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to dive deeper?
            </h2>
            <div className="flex items-center justify-center gap-8"> 
                <img src="https://img.freepik.com/free-vector/www-concept-illustration_114360-2143.jpg" alt="" className="w-1/2" />
                <div className="grid grid-cols-1 gap-8">
                    <p className="text-lg text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">
                    Join our community of <span className="text-blue-600 font-semibold">ocean enthusiasts</span> and 
                    <span className="text-green-600 font-semibold"> conservationists</span>.  
                    Sign up for updates, events, and educational resources.  
                    <span className="text-blue-500 font-semibold italic"> Just sign up and be part of the change!</span>
                    </p>
                    <button className="btn btn-active btn-primary">Get Started</button>
                </div>
                
            </div>
            

          </div>

          
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SplashPage;
