import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Dr. K. Srinivas",
    role: "Alumni (Telugu Dept)",
    quote: "The Gurukula system at Matrusri Oriental College didn't just teach me literature; it shaped my character. The values instilled here have been the foundation of my academic career.",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 2,
    name: "P. Lakshmi",
    role: "Current Student (B.Sc CS)",
    quote: "Blending modern computer science education with a deeply spiritual and disciplined environment is a rare find. The faculty is incredibly supportive and the campus is peaceful.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "V. Ramana",
    role: "Alumni (Sanskrit Dept)",
    quote: "The profound knowledge of Sanskrit and Vedas I acquired here has opened international doors for me. The college truly lives up to its heritage of academic excellence.",
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: 4,
    name: "S. Devi",
    role: "Parent",
    quote: "Sending our daughter to MOC was the best decision. Not only does she receive free education and accommodation, but the safe, nurturing environment is exceptional.",
    avatar: "https://i.pravatar.cc/150?img=9"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-brand-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-primary text-sm font-semibold mb-4 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
            Testimonials
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            What Our Community Says
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16 px-4"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col relative mt-8">
                  {/* Floating Avatar */}
                  <div className="absolute -top-8 left-8">
                    <div className="w-16 h-16 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <Quote className="w-10 h-10 text-brand-light absolute top-6 right-8 opacity-50" />
                  
                  <div className="mt-6 flex-grow">
                    <div className="flex text-brand-secondary mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-brand-secondary font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
