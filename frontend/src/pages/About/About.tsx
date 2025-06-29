import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

const AboutUsPage = () => {
  return (
    <section className="min-h-screen bg-white text-yellow-700 dark:bg-black dark:text-yellow-400 py-16 px-6 transition-colors">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Intro Section */}
        <div className="text-center space-y-4">
          <Badge className="bg-yellow-400 text-black text-sm px-3 py-1 rounded-full">
            About Lions Gate Gym
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Where Strength Meets Community
          </h1>
          <p className="text-lg text-yellow-600 dark:text-yellow-300 max-w-2xl mx-auto">
            Lions Gate Gym is more than a fitness center — it's a lifestyle hub for athletes, beginners, and everyone in between. We offer everything you need to train, recover, and thrive.
          </p>
        </div>

        <Separator className="bg-yellow-300 dark:bg-yellow-600" />

        {/* What We Offer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "24/7 Access",
              desc: "Train on your schedule with round-the-clock access to our state-of-the-art facility.",
              icon: "🕒",
            },
            {
              title: "Strength & Conditioning",
              desc: "From powerlifting platforms to Olympic racks, we’re built for serious strength.",
              icon: "🏋️‍♂️",
            },
            {
              title: "Cardio Zone",
              desc: "Top-tier treadmills, bikes, and rowers to keep your heart pumping and goals in sight.",
              icon: "❤️‍🔥",
            },
            {
              title: "Group Classes",
              desc: "HIIT, yoga, spin, and more — led by certified trainers who bring the energy.",
              icon: "👯‍♀️",
            },
            {
              title: "Personal Training",
              desc: "Work 1-on-1 with elite coaches who tailor every session to your goals.",
              icon: "🎯",
            },
            {
              title: "Recovery Lounge",
              desc: "Sauna, massage chairs, and mobility tools to help you bounce back stronger.",
              icon: "🛀",
            },
          ].map((item, i) => (
            <Card
              key={i}
              className="bg-yellow-100 text-black dark:bg-yellow-950 dark:text-yellow-100 border-none shadow-md hover:shadow-xl transition"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <span className="text-2xl">{item.icon}</span> {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-800 dark:text-yellow-200">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Mission Statement */}
        <Card className="bg-yellow-300 dark:bg-yellow-800 text-black dark:text-yellow-100 border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center">
              Our Mission
            </CardTitle>
            <CardDescription className="text-center text-yellow-900 dark:text-yellow-200 text-lg">
              Built for every body. Driven by community.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto">
            <p>
              At <span className="font-semibold">Lions Gate Gym</span>, our mission is to create a space where everyone —
              from first-timers to pro athletes — feels empowered to push their limits and grow stronger every day.
            </p>
            <p>
              We believe <span className="font-semibold italic">fitness is a journey</span>, not a destination. That’s why we’ve built a facility
              that supports every step — from your first rep to your next PR.
            </p>
            <p className="text-xl font-bold italic text-yellow-900 dark:text-yellow-200">
              Join the pride. Train like a lion. 🦁
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutUsPage;
