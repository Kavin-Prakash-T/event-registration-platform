import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  CalendarDays,
  LogIn,
  UserPlus,
  ShieldCheck,
  CalendarCheck,
  Users,
  CreditCard,
  KeyRound,
  Bot,
  CheckCircle2,
  LayoutDashboard,
  ClipboardList,
  Menu,
  X,
  ArrowRight,
  TrendingUp,
  Clock,
  UserCheck,
  ScanLine,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";


const LandingNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
              <CalendarDays size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-black">
              EventPass
            </span>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100"
            >
              <LogIn size={15} />
              Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-1.5 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              <UserPlus size={15} />
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="sm:hidden rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 pt-3 sm:hidden">
          <div className="flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-black hover:bg-gray-100"
            >
              <LogIn size={15} />
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              <UserPlus size={15} />
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const MockDashboardCard = () => {
  const stats = [
    { label: "Total Events", value: "24", icon: CalendarCheck, delta: "+3 this month" },
    { label: "Pending Payments", value: "8", icon: CreditCard, delta: "Needs review" },
    { label: "Confirmed Participants", value: "142", icon: UserCheck, delta: "+18 this week" },
    { label: "Entry Verified", value: "96", icon: ScanLine, delta: "67% verified" },
  ];

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Card Header */}
      <div className="border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black text-white">
            <LayoutDashboard size={14} />
          </div>
          <span className="text-sm font-semibold text-black">Organizer Dashboard</span>
          <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
            Live Preview
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-px bg-gray-100">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2 bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">{stat.label}</span>
              <stat.icon size={14} className="text-gray-400" />
            </div>
            <span className="text-2xl font-bold text-black">{stat.value}</span>
            <span className="text-xs text-gray-400">{stat.delta}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-black"></div>
          <span className="text-xs text-gray-500">Real-time event tracking enabled</span>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-400 hover:shadow-md">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-black transition-colors group-hover:bg-black group-hover:text-white group-hover:border-black">
      <Icon size={20} />
    </div>
    <h3 className="mb-2 text-base font-semibold text-black">{title}</h3>
    <p className="text-sm leading-relaxed text-gray-500">{description}</p>
  </div>
);

const StepCard = ({ step, title, description, isLast }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-black bg-black text-sm font-bold text-white">
        {step}
      </div>
      {!isLast && <div className="mt-2 h-full w-px bg-gray-200"></div>}
    </div>
    <div className="pb-8">
      <h3 className="mb-1 text-base font-semibold text-black">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-500">{description}</p>
    </div>
  </div>
);

const RoleCard = ({ icon: Icon, role, features, cta, ctaHref }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
        <Icon size={22} />
      </div>
      <h3 className="text-xl font-bold text-black">{role}</h3>
    </div>
    <ul className="mb-8 space-y-3">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-black" />
          {f}
        </li>
      ))}
    </ul>
    <Link
      to={ctaHref}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
    >
      {cta}
      <ArrowRight size={15} />
    </Link>
  </div>
);

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "ORGANIZER") navigate("/organizer/dashboard", { replace: true });
      else if (user.role === "PARTICIPANT") navigate("/participant/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Authentication",
      description:
        "Email-based OTP verification and JWT-secured sessions keep your account safe at every step.",
    },
    {
      icon: CalendarCheck,
      title: "Event Management",
      description:
        "Organizers can create, edit, and manage events with full control over capacity, dates, and visibility.",
    },
    {
      icon: Users,
      title: "Participant Registration",
      description:
        "Seamless one-click event registration for participants with instant confirmation and status tracking.",
    },
    {
      icon: CreditCard,
      title: "Manual Payment Verification",
      description:
        "Organizers review and verify payment submissions manually, ensuring accuracy before confirming registrations.",
    },
    {
      icon: KeyRound,
      title: "OTP-Based Entry Validation",
      description:
        "Unique OTP codes generated per participant for real-time entry verification at the venue.",
    },
    {
      icon: Bot,
      title: "AI Help Chatbot",
      description:
        "An intelligent assistant answers queries about registration, payments, and entry workflows instantly.",
    },
  ];

  const steps = [
    {
      title: "Organizer Creates an Event",
      description:
        "Set up events with title, description, date, venue, capacity, and ticket pricing. Publish when ready.",
    },
    {
      title: "Participant Registers",
      description:
        "Browse available events and register with a single click. Receive a confirmation on your dashboard.",
    },
    {
      title: "Payment Submitted & Verified",
      description:
        "Participants submit payment proof. Organizers review and mark payments as verified to confirm registration.",
    },
    {
      title: "Entry OTP Verified at Venue",
      description:
        "A unique OTP is generated for each confirmed participant. Organizers scan/enter it at the event entry gate.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <LandingNavbar />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
            {/* Left: Copy */}
            <div className="flex-1 text-center lg:text-left">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                <TrendingUp size={12} />
                Trusted by event organizers
              </span>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl lg:text-5xl">
                Simplify Event Registration,{" "}
                <span className="underline decoration-gray-300 underline-offset-4">
                  Payments,
                </span>{" "}
                and Entry Verification
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-500 lg:mx-0 mx-auto">
                A secure event management platform for organizers and participants with OTP
                verification, manual payment tracking, dashboards, and AI-powered support.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  <UserPlus size={16} />
                  Get Started - It's Free
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-100"
                >
                  <LogIn size={16} />
                  Login to Dashboard
                </Link>
              </div>

              {/* Social proof strip */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
                {["No credit card required", "Instant setup", "Secure by default"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <CheckCircle2 size={12} className="text-black" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Mock Dashboard */}
            <div className="w-full max-w-md lg:max-w-sm xl:max-w-md">
              <MockDashboardCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-500">
              A complete toolkit for managing events end-to-end from creation to verified entry.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
            {/* Heading */}
            <div className="flex-1 lg:max-w-xs">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                How It Works
              </h2>
              <p className="text-base leading-relaxed text-gray-500">
                Four straightforward steps take an event from creation all the way to verified
                entry - with full transparency at every stage.
              </p>
              <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-xs font-medium text-gray-500">Average setup time</span>
                </div>
                <span className="text-2xl font-bold text-black">Under 5 min</span>
                <p className="mt-1 text-xs text-gray-400">From signup to first event published</p>
              </div>
            </div>

            {/* Steps */}
            <div className="flex-1">
              {steps.map((s, i) => (
                <StepCard
                  key={s.title}
                  step={i + 1}
                  title={s.title}
                  description={s.description}
                  isLast={i === steps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Roles ────────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Built for Two Roles
            </h2>
            <p className="mx-auto max-w-xl text-base text-gray-500">
              Whether you're running events or attending them, EventPass has a dedicated experience
              tailored just for you.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:max-w-4xl lg:mx-auto">
            <RoleCard
              icon={LayoutDashboard}
              role="Organizer"
              features={[
                "Create and manage events",
                "Verify participant payments",
                "Send & validate entry OTP",
                "Track all registrations",
              ]}
              cta="Start Organizing"
              ctaHref="/signup"
            />
            <RoleCard
              icon={ClipboardList}
              role="Participant"
              features={[
                "Browse available events",
                "Register for events instantly",
                "Submit payment details",
                "Get entry verified using OTP",
              ]}
              cta="Join as Participant"
              ctaHref="/signup"
            />
          </div>
        </div>
      </section>

      {/* ── Chatbot Highlight ─────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-gray-50 p-8 sm:p-12">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
                <Bot size={30} className="text-black" />
              </div>
              <div>
                <h2 className="mb-2 text-2xl font-bold text-black">AI-Powered Help Chatbot</h2>
                <p className="text-base leading-relaxed text-gray-500">
                  Our built-in assistant is available 24/7 to help organizers and participants
                  navigate registration flows, payment steps, and entry validation - so nothing
                  gets in the way of a great event.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Registration Help", desc: "Step-by-step guidance on how to sign up for events" },
                { label: "Payment Queries", desc: "Understand the manual payment submission process" },
                { label: "Entry & OTP Support", desc: "Get instant answers about venue entry verification" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <p className="mb-1 text-sm font-semibold text-black">{item.label}</p>
                  <p className="text-xs leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────────── */}
      <section className="bg-black py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to Run Your Next Event?
          </h2>
          <p className="mb-8 text-base text-gray-400">
            Join organizers and participants already using EventPass to simplify event management.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/signup"
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-100"
            >
              <UserPlus size={16} />
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-black px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-900"
            >
              <LogIn size={16} />
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            © 2026 Kavin Prakash. Crafting innovative web solutions with modern technologies.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
