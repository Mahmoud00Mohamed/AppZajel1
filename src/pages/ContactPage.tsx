import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ProductImage } from "../features/images";

const ContactPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        {isArabic ? "اتصل بنا" : "Contact Us"}
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-6">
              {isArabic ? "معلومات التواصل" : "Contact Information"}
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="text-primary w-5 h-5 mt-1" />
                <div className="ml-4 rtl:mr-4 rtl:ml-0">
                  <h3 className="font-medium">
                    {isArabic ? "العنوان" : "Address"}
                  </h3>
                  <p className="text-gray-600">
                    {isArabic ? "الرياض، السعودية" : "Riyadh, Saudi Arabia"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-primary w-5 h-5 mt-1" />
                <div className="ml-4 rtl:mr-4 rtl:ml-0">
                  <h3 className="font-medium">
                    {isArabic ? "الهاتف" : "Phone"}
                  </h3>
                  <p className="text-gray-600">+966 50 123 4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="text-primary w-5 h-5 mt-1" />
                <div className="ml-4 rtl:mr-4 rtl:ml-0">
                  <h3 className="font-medium">
                    {isArabic ? "البريد الإلكتروني" : "Email"}
                  </h3>
                  <p className="text-gray-600">info@zajilalsaadah.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="text-primary w-5 h-5 mt-1" />
                <div className="ml-4 rtl:mr-4 rtl:ml-0">
                  <h3 className="font-medium">
                    {isArabic ? "ساعات العمل" : "Working Hours"}
                  </h3>
                  <p className="text-gray-600">
                    {isArabic
                      ? "كل يوم: 9 صباحاً - 10 مساءً"
                      : "Every day: 9 AM - 10 PM"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-6">
              {isArabic ? "موقعنا" : "Our Location"}
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <ProductImage
                src="https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt={isArabic ? "موقع المتجر" : "Store Location"}
                className="w-full h-full object-cover"
                width={600}
                height={338}
                aspectRatio="landscape"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={80}
                priority={true}
                showZoom={false}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              {isArabic ? "تابعنا" : "Follow Us"}
            </h2>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-6">
              {isArabic ? "أرسل لنا رسالة" : "Send Us a Message"}
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {isArabic ? "الاسم" : "Name"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {isArabic ? "البريد الإلكتروني" : "Email"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {isArabic ? "الموضوع" : "Subject"}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {isArabic ? "الرسالة" : "Message"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
              >
                {isArabic ? "إرسال" : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
