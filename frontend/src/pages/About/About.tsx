import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const AboutUsPage = () => {
  return (
    <section className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>About Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-base">
            <p>
              Welcome to GymTracker — a platform built to streamline member management and amplify performance at every level of your fitness journey.
            </p>
            <p>
              Our mission is to empower gym owners, trainers, and athletes with the tools to track progress, stay organized, and grow stronger — together.
            </p>
            <p>
              Whether you're running a fitness facility or training individually, GymTracker brings clarity, accountability, and results to your workflow.
            </p>
            <p className="italic">Built by developers who believe software should lift people up — literally.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutUsPage;
