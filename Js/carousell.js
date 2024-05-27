const testimonialsContainer = document.querySelector('.testimonials-container');
const testimonial = document.querySelector('.testimonial');
const userImage = document.querySelector('.user-image');
const username = document.querySelector('.username');
const role = document.querySelector('.role');
const testimonials = [
  {
    name: 'Laura Sanchez',
    position: 'Restaurant Manager',
    photo: '/Images/mujer1.jpg',
    text:
      'Incredible! This software has completely transformed the way we handle bookings at our restaurant. Its user-friendly interface and intuitive features have saved us time and allowed us to provide a more efficient service to our customers. Thanks to this software, we have seen a significant increase in our bookings and sales. Highly recommended!',
  },
  {
    name: 'Edwar Louis',
    position: 'Executive Chef',
    photo: '/Images/hombre4.jpg',
    text:
      "Since implementing this software in our restaurant, we've experienced a significant improvement in booking management. Its simple interface and powerful tools have allowed us to optimize our operations and focus more on providing an exceptional experience to our customers. I can't imagine what our business would be like without this software!",
  },
  {
    name: 'Michael Thompson',
    position: 'Restaurant Consultant',
    photo: '/Images/hombre3.jpg',
    text:
      "I've recommended this software to several restaurant owners, and the feedback has been overwhelmingly positive. Its intuitive interface and robust features make it a valuable asset for any restaurant looking to streamline their booking process and increase efficiency. A must-have tool for restaurant management!",
  },
  {
    name: 'Sophia Lee',
    position: 'Restaurant Marketing Director',
    photo: '/Images/mujer2.jpg',
    text:
      "From a marketing perspective, this software has been a game-changer for our restaurant. Its ability to integrate seamlessly with our marketing efforts has allowed us to attract more customers and drive sales. I highly recommend it to any restaurant looking to boost their marketing effectiveness!",
  },
  {
    name: 'Olivia White',
    position: 'Restaurant Owner',
    photo: '/Images/mujer3.jpg',
    text:
      "As a restaurant owner, I can't imagine running my business without this software. It has simplified the booking process, improved our customer service, and ultimately helped us increase our revenue. It's an essential tool for any restaurant looking to thrive in today's competitive market!",
  },
]


let idx = 1;

function updateTestimonials(){
  const {name, position, photo, text} = testimonials[idx];
  
  testimonial.innerHTML = text;
  userImage.src = photo;
  username.innerHTML = name;
  role.innerHTML = position;
  
  idx++;
  
  if(idx > testimonials.length - 1){
    idx = 0;
  }
}

setInterval(updateTestimonials, 10000);