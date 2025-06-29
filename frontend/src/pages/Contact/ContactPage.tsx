import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <section className="min-h-screen py-16 px-4 bg-white dark:bg-black transition-colors">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* 📬 Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7 bg-yellow-50 dark:bg-yellow-950 rounded-xl shadow-lg p-8 space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">
              Contact Us
            </h1>
            <p className="text-yellow-800 dark:text-yellow-200 mt-2 text-sm">
              We'd love to hear from you — whether it's feedback, support, or just a quick hello!
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-yellow-800 dark:text-yellow-200">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-yellow-800 dark:text-yellow-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="subject" className="text-yellow-800 dark:text-yellow-200">
                Subject
              </Label>
              <Input
                id="subject"
                type="text"
                placeholder="Subject of your message"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-yellow-800 dark:text-yellow-200">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="How can we help you?"
                rows={5}
                required
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-500 text-black hover:bg-yellow-600 font-bold"
            >
              Send Message
            </Button>
          </form>
        </motion.div>

        {/* 📍 Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-5 bg-yellow-100 dark:bg-yellow-900 rounded-xl shadow-lg p-8 flex flex-col justify-center space-y-6 text-yellow-800 dark:text-yellow-200"
        >
          <h2 className="text-2xl font-semibold text-center">Reach Us Directly</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <span>+252 63 3882020, 63 4487713</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span>support@gymtracker.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span>Hargeisa, Somaliland</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
