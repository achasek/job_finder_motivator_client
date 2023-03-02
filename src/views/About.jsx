import React from 'react';
import { TodoList, ProfileSideBar, Calendar } from "../components";

const About = () => {
  return (
    <div className='about__page'>
        <h1 className='about__title'>About Us!</h1>
    <div className='about__container'>
        <h3 className='about__text'>Welcome to Thriver! I'm so excited that you've found your way to our site.
Thriver is a platform that's all about empowering you to reach your goals and achieve your dreams. Whether you're searching for a new job, trying to level up in your current career, or simply looking for a little motivation to keep you going, Thriver has everything you need to succeed.
On our site, you'll find a wealth of resources designed to help you thrive, including expert advice on job searching, resume writing, and interview tips. We also offer a variety of tools and resources to help you stay on track, including goal-setting guides, productivity hacks, and much more.
But what truly sets Thriver apart is our community. When you join Thriver, you'll have the opportunity to connect with like-minded individuals who are also striving to reach their full potential. Our platform makes it easy to network, ask for advice, and share your experiences with others who understand what you're going through.
So whether you're looking to jump-start your job search, stay motivated to achieve your goals, or simply connect with others who share your passion for success, Thriver is the perfect place for you. I can't wait to see all that you'll accomplish with the help of our community and resources.</h3>
    </div>
    <ProfileSideBar />
    </div>
  )
}

export default About