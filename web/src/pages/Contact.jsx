import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: "📞",
      title: "Call Us",
      details: "+91 98765 43210",
      subtitle: "Mon-Sat, 9AM-9PM",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "💬",
      title: "WhatsApp",
      details: "+91 98765 43210",
      subtitle: "24/7 Support",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: "support@smartcart.com",
      subtitle: "Response within 2 hours",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "📍",
      title: "Visit Us",
      details: "SmartCart HQ, Mumbai",
      subtitle: "Open 10AM-7PM",
      color: "from-orange-500 to-red-500"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get in <span className="text-yellow-300">Touch</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We're here to help! Reach out to our support team 24/7 for any questions, 
            feedback, or assistance with your shopping experience.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactInfo.map((info, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                {info.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-gray-700 font-semibold text-lg mb-1">{info.details}</p>
              <p className="text-gray-500 text-sm">{info.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <div className="flex items-center mb-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mr-4">
                <span className="text-xl">✉️</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
                <p className="text-gray-600">We typically respond within 30 minutes</p>
              </div>
            </div>

            {submitStatus === "success" && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Message Sent Successfully!</h3>
                    <p className="text-gray-600">Our team will get back to you shortly.</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="returns">Returns & Refunds</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 resize-none"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="ml-3">📨</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-gray-500 text-sm text-center mt-6">
              By submitting this form, you agree to our Privacy Policy
            </p>
          </div>

          {/* FAQ & Info */}
          <div>
            {/* FAQ */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {[
                  {
                    q: "How long does delivery take?",
                    a: "We deliver within 2-5 business days across India. Express delivery (24 hours) is available in metro cities."
                  },
                  {
                    q: "What is your return policy?",
                    a: "We offer 30-day returns for most products. Items must be in original condition with all tags attached."
                  },
                  {
                    q: "Do you ship internationally?",
                    a: "Currently, we only ship within India. International shipping will be available soon."
                  },
                  {
                    q: "How can I track my order?",
                    a: "You'll receive a tracking link via SMS and email once your order is shipped."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Chat */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-100">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white mr-4">
                  💬
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Live Chat Support</h3>
                  <p className="text-gray-600">Available 24/7 for instant help</p>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-shadow flex items-center justify-center">
                Start Live Chat
                <span className="ml-3">💬</span>
              </button>
              
              <div className="flex items-center justify-center mt-6 text-gray-600">
                <div className="flex items-center mr-6">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Online Now</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">⏰</span>
                  <span>Avg. response: 2 mins</span>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h3>
              <div className="space-y-4">
                {[
                  { day: "Monday - Friday", time: "9:00 AM - 9:00 PM" },
                  { day: "Saturday", time: "10:00 AM - 8:00 PM" },
                  { day: "Sunday", time: "10:00 AM - 6:00 PM" },
                  { day: "24/7 Support", time: "Email & Live Chat" }
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <span className="text-gray-700 font-medium">{schedule.day}</span>
                    <span className="text-gray-900 font-semibold">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map/Address Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Headquarters</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg">
              <div className="h-64 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <span className="text-5xl">📍</span>
                  <p className="text-gray-600 mt-4">Interactive Map Here</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">SmartCart Headquarters</h4>
                  <p className="text-gray-600">
                    Tower A, 15th Floor<br />
                    Bandra Kurla Complex<br />
                    Mumbai, Maharashtra 400051<br />
                    India
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Regional Offices</h4>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      <span className="font-semibold">Delhi:</span> Connaught Place
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Bangalore:</span> Koramangala
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Chennai:</span> T. Nagar
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Emergency Contact</h4>
                  <p className="text-gray-600">
                    For urgent order issues:<br />
                    <span className="font-bold text-lg text-blue-600">+91 98765 43210</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;