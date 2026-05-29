import { ShieldCheck, Zap, CreditCard, Award } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Quality Assurance",
    description: "Every vehicle undergoes a rigorous 250-point inspection by our elite automotive technicians."
  },
  {
    icon: Award,
    title: "Certified Heritage",
    description: "We only curate vehicles with a pristine service history and documented ownership records."
  },
  {
    icon: CreditCard,
    title: "Exclusive Financing",
    description: "Bespoke financial solutions tailored to your lifestyle with competitive interest rates."
  },
  {
    icon: Zap,
    title: "Instant Valuations",
    description: "Get a premium valuation for your luxury vehicle within minutes using our AI-driven pricing engine."
  }
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">The LuxeDrive Edge</h2>
            <h3 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-8">
              Why Discerning Drivers <br /> Choose Our Platform
            </h3>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              We don't just sell cars; we deliver a legacy of automotive excellence. Our platform is built on the pillars of trust, transparency, and uncompromising quality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="text-lg font-bold text-primary">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000" 
                alt="Luxury Car Interior" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl shadow-2xl max-w-xs hidden md:block animate-float">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold">99%</div>
                <p className="text-sm font-bold text-primary">Customer Satisfaction Rate</p>
              </div>
              <p className="text-xs text-muted-foreground">Joined by over 50,000+ premium car enthusiasts across the globe.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
