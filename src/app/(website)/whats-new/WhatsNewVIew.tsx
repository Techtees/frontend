'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Preventive Healthcare: A Comprehensive Guide',
    excerpt:
      'Learn how preventive care can help you maintain good health and reduce healthcare costs in the long run.',
    author: 'Dr. Sarah Johnson',
    date: 'May 2, 2025',
    readTime: '5 min read',
    image: '/blog.png',
    featured: true
  },
  {
    id: 2,
    title: 'The Latest Advancements in Diabetes Treatment',
    excerpt:
      'Explore the newest technologies and treatments helping patients manage diabetes more effectively.',
    author: 'Dr. Michael Chen',
    date: 'April 28, 2025',
    readTime: '8 min read',
    image: '/blog.png',
    featured: false
  },
  {
    id: 3,
    title: 'Nutrition Tips for Heart Health',
    excerpt:
      'Discover the foods and dietary patterns that promote cardiovascular health and prevent heart disease.',
    author: 'Emma Williams, RD',
    date: 'April 25, 2025',
    readTime: '6 min read',
    image: '/blog.png',
    featured: false
  },
  {
    id: 4,
    title: 'Understanding Your Lab Test Results',
    excerpt:
      'A guide to interpreting common laboratory tests and what the numbers mean for your health.',
    author: 'Dr. Robert Fox',
    date: 'April 20, 2025',
    readTime: '7 min read',
    image: '/blog.png',
    featured: false
  },
  {
    id: 5,
    title: 'Mental Health in the Workplace: Creating Supportive Environments',
    excerpt:
      'How employers and employees can foster a mentally healthy workplace that benefits everyone.',
    author: 'Dr. Lisa Patel',
    date: 'April 18, 2025',
    readTime: '9 min read',
    image: '/blog.png',
    featured: false
  },
  {
    id: 6,
    title: 'Pediatric Vaccines: What Parents Need to Know',
    excerpt:
      'A comprehensive guide to childhood immunizations and their importance for public health.',
    author: 'Dr. James Wilson',
    date: 'April 15, 2025',
    readTime: '10 min read',
    image: '/blog.png',
    featured: false
  }
];

const BlogListingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-gray-900 mb-6 text-center text-4xl font-bold">NBIOTEK Health Blog</h1>
          <p className="text-gray-600 mx-auto mb-8 max-w-3xl text-center text-xl">
            Stay informed with the latest insights, tips, and news in healthcare and medical
            research.
          </p>
          <div className="relative mx-auto max-w-2xl">
            <input
              type="text"
              placeholder="Search articles..."
              className="border-gray-300 focus:ring-blue-500 w-full rounded-full border px-6 py-4 pr-12 focus:outline-none focus:ring-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 transform"
              size={20}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* {featuredPost && (
          <div className="mb-16">
            <h2 className="text-gray-900 mb-6 text-2xl font-bold">Featured Article</h2>
            <div className="overflow-hidden rounded-xl bg-white shadow-lg">
              <div className="md:flex">
                <div className="relative h-64 md:h-auto md:w-1/2">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:w-1/2">
                  <div className="mb-4 flex items-center">
                    <span className="text-gray-500 flex items-center text-sm">
                      <Calendar size={14} className="mr-1" />
                      {featuredPost.date}
                    </span>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                  </div>
                  <h3 className="text-gray-900 mb-4 text-2xl font-bold">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-300 mr-3 h-10 w-10 rounded-full"></div>
                      <span className="text-gray-900 font-medium">{featuredPost.author}</span>
                    </div>
                    <Link
                      href={`/whats-new/${featuredPost.id}`}
                      className="bg-blue-600 hover:bg-blue-700 flex items-center rounded-md px-4 py-2 text-white transition"
                    >
                      Read More
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
        <div className="mx-auto max-w-3xl py-20 text-center">
          <div className="mb-8">
            <div className="to-purple-100 mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100">
              <Calendar className="text-blue-600 h-10 w-10" />
            </div>
            <h2 className="text-gray-900 mb-4 text-4xl font-bold">Blog Coming Soon</h2>
            <p className="text-gray-600 mb-8 text-xl">
              We&apos;re preparing insightful articles about healthcare innovation, medical
              research, and wellness tips. Stay tuned for expert insights from NBIOTEK LABS.
            </p>
            <div className="mb-8 flex justify-center gap-2">
              <div className="bg-blue-500 h-3 w-3 animate-pulse rounded-full"></div>
              <div className="bg-purple-500 h-3 w-3 animate-pulse rounded-full delay-75"></div>
              <div className="bg-pink-500 h-3 w-3 animate-pulse rounded-full delay-150"></div>
            </div>
            <Link
              href="/"
              className="to-purple-600 hover:from-blue-700 hover:to-purple-700 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-400 px-6 py-3 font-semibold text-white shadow-lg transition-all"
            >
              Back to Home
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
        {/* <div>
          <h2 className="text-gray-900 mb-6 text-2xl font-bold">Latest Articles</h2>
          <div className="space-y-8">
            {regularPosts.map((post) => (
              <div
                key={post.id}
                className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg"
              >
                <div className="md:flex">
                  <div className="relative h-48 md:h-auto md:w-1/3">
                    <Image src={post.image} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="mb-3 flex items-center">
                      <span className="text-gray-500 flex items-center text-sm">
                        <Calendar size={14} className="mr-1" />
                        {post.date}
                      </span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-gray-500 text-sm">{post.readTime}</span>
                    </div>
                    <h3 className="text-gray-900 mb-3 text-xl font-bold">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-gray-300 mr-2 h-8 w-8 rounded-full"></div>
                        <span className="text-gray-900 font-medium">{post.author}</span>
                      </div>
                      <Link
                        href={`/whats-new/${post.id}`}
                        className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
                      >
                        Read Article
                        <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BlogListingPage;
