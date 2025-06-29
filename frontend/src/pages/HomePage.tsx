import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const HomePage = () => {
  return (
    <div className="pt-6 bg-white text-yellow-700 dark:bg-black dark:text-yellow-400 min-h-screen transition-colors">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
      </motion.div>

      {/* What We Offer Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-yellow-600 dark:text-yellow-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.2 }}
        >
          What You'll Find at Lions Gate Gym
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Strength & Conditioning",
              desc: "Top-tier equipment, Olympic racks, and free weights for serious lifters.",
              image: "https://images.pexels.com/photos/12708492/pexels-photo-12708492.jpeg",
            },
            {
              title: "Cardio Zone",
              desc: "Modern treadmills, bikes, and rowers to keep your heart pumping.",
              image: "https://images.pexels.com/photos/5327468/pexels-photo-5327468.jpeg",
            },
            {
              title: "Group Classes",
              desc: "HIIT, yoga, and more — led by certified trainers in a supportive environment.",
              image: "https://images.pexels.com/photos/5327556/pexels-photo-5327556.jpeg",
            },
            {
              title: "Personal Training",
              desc: "Work 1-on-1 with elite coaches who tailor every session to your goals.",
              image: "https://images.pexels.com/photos/13106591/pexels-photo-13106591.jpeg",
            },
            {
              title: "Recovery Lounge",
              desc: "Sauna, massage chairs, and mobility tools to help you bounce back stronger.",
              image: "https://images.pexels.com/photos/6550845/pexels-photo-6550845.jpeg",
            },
            {
              title: "24/7 Access",
              desc: "Train on your schedule with round-the-clock access to our facility.",
              image: "https://images.pexels.com/photos/5327476/pexels-photo-5327476.jpeg",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ amount: 0.2 }}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition bg-yellow-100 dark:bg-yellow-950 text-black dark:text-yellow-100"
            >
              <img
                src={`${item.image}?auto=compress&cs=tinysrgb&h=300&w=600`}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gym Gallery Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-yellow-600 dark:text-yellow-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.2 }}
        >
          Inside Lions Gate Gym
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg",
            "https://images.pexels.com/photos/2652236/pexels-photo-2652236.jpeg",
            "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg",
            "https://images.pexels.com/photos/5327449/pexels-photo-5327449.jpeg",
            "https://images.pexels.com/photos/32695893/pexels-photo-32695893.jpeg",
            "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
          ].map((url, i) => (
            <motion.img
              key={i}
              src={`${url}?auto=compress&cs=tinysrgb&h=300&w=600`}
              alt={`Gym ${i + 1}`}
              className="rounded-lg shadow-md object-cover h-64 w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ amount: 0.2 }}
            />
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <motion.section
        className="py-16 px-4 bg-neutral-100 dark:bg-black text-black dark:text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto bg-yellow-400 dark:bg-yellow-600 rounded-xl px-6 py-12 shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Choose Your Membership Plan</h2>
            <p className="mb-10 text-lg">
              Flexible pricing for every fitness journey. No hidden fees. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Monthly",
                price: "$25",
                desc: "Billed every month",
              },
              {
                label: "Quarterly",
                price: "$71.25",
                desc: "Save 5% — billed every 3 months",
              },
              {
                label: "Biannually",
                price: "$135",
                desc: "Save 10% — billed every 6 months",
              },
              {
                label: "Yearly",
                price: "$240",
                desc: "Save 20% — billed annually",
              },
            ].map((plan, i) => (
              <div
                key={i}
                className="bg-white dark:bg-black rounded-lg p-6 shadow-md hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-600 dark:text-yellow-300">
                    {plan.label}
                  </h3>
                  <p className="text-3xl font-extrabold mb-2">{plan.price}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{plan.desc}</p>
                </div>
                <Link to="/contact" className="mt-6">
                  <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600 font-bold">
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
