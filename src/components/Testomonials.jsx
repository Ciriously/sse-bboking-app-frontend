import React from 'react';

const testimonialData = [
  {
    name: 'John Doe',
    position: 'Frequent Traveler',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    testimonial: 'Rail Yatra is my go-to app for booking train tickets. It makes traveling so much easier and hassle-free!',
  },
  {
    name: 'Emma Smith',
    position: 'Business Executive',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    testimonial: 'I use Rail Yatra for all my business trips. The app is intuitive and helps me manage my travel plans effortlessly.',
  },
  {
    name: 'Michael Johnson',
    position: 'Family Traveler',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    testimonial: 'Traveling with my family has never been easier thanks to Rail Yatra. We love how simple it is to book tickets and check schedules.',
  },
  {
    name: 'Sophia Williams',
    position: 'Student Traveler',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    testimonial: 'As a student, Rail Yatra helps me save money on travel. The discounts and ease of booking are a big plus for me!',
  },
  {
    name: 'David Brown',
    position: 'Senior Traveler',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    testimonial: 'I enjoy using Rail Yatra to explore different places. It\'s reliable and user-friendly, making my journeys stress-free.',
  },
  {
    name: 'Emily Clark',
    position: 'Solo Traveler',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    testimonial: 'Rail Yatra is perfect for solo travelers like me. It gives me peace of mind knowing that I can easily manage my trips.',
  },
  {
    name: 'William Harris',
    position: 'Business Traveler',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    testimonial: 'Rail Yatra simplifies my business travels with its efficient booking system and reliable service. Highly recommended!',
  },
  {
    name: 'Olivia Martinez',
    position: 'Adventure Seeker',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    testimonial: 'Using Rail Yatra for my adventures is always a pleasure. It helps me plan my trips and discover new destinations easily.',
  },
];

const TestimoniesSection = () => {
  return (
    <section id="testimonies" className="py-20 font-poppins bg-white">
      <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
        <div className="mb-12 space-y-5 md:mb-16 md:text-center">
          <div className="inline-block px-3 py-1 text-sm font-semibold text-indigo-900 rounded-lg md:text-center bg-gray-300 hover:cursor-pointer hover:bg-gray-400">
            Words from Others
          </div>
          <h1 className="mb-5 text-3xl font-semibold text-gray-800 md:text-center md:text-5xl">
            It's not just us.
          </h1>
          <p className="text-xl text-gray-700 md:text-center md:text-2xl">
            Here's what others have to say about us.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonialData.map((testimonial, index) => (
            <div key={index} className="text-sm leading-6">
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-200/5">
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      className="w-12 h-12 bg-center bg-cover border rounded-full"
                      alt={testimonial.name}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 text-md">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="leading-normal text-gray-700 text-md">
                    {testimonial.testimonial}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimoniesSection;
