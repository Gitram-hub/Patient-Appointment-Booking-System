import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TimerReset
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: ShieldCheck,
    title: 'Secure JWT access',
    description:
      'Role-based authentication with protected patient, doctor, and admin flows.'
  },
  {
    icon: Stethoscope,
    title: 'Doctor discovery',
    description:
      'Search and filter doctors by specialization, ratings, and availability.'
  },
  {
    icon: Sparkles,
    title: 'AI healthcare assistant',
    description:
      'RAG-powered answers grounded in clinic docs, profiles, and policies.'
  },
  {
    icon: TimerReset,
    title: 'Live scheduling',
    description:
      'Book appointments, manage slots, and prevent double-booking conflicts.'
  }
];

const stats = [
  ['10k+', 'Appointments managed'],
  ['200+', 'Doctors onboarded'],
  ['24/7', 'AI assistant availability'],
  ['99.9%', 'Workflow uptime target']
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      <section>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between rounded-full border border-primary bg-white px-5 py-3 shadow-sm">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Patient Appointment Booking
            </p>

            <div className="flex gap-3 text-sm font-medium">
              <Link
                to="/login"
                className="rounded-full px-4 py-2 hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-primary px-4 py-2 text-white hover-primary"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary-light px-4 py-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                AI-powered healthcare operations
              </span>

              <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
                Modern patient appointment booking with smart triage and
                scheduling.
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                Patients can book appointments in seconds, doctors can manage
                slots and approvals, and the AI assistant can answer
                clinic-specific questions with grounded knowledge.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white hover-primary"
                >
                  Start booking
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white hover-primary"
                >
                  Doctor/Admin Login
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-3xl border bg-white p-4 shadow-sm dark:bg-slate-900"
                  >
                    <div className="text-2xl font-semibold">{value}</div>
                    <div className="mt-1 text-sm text-slate-500">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="rounded-[2rem] border bg-white p-6 shadow-xl dark:bg-slate-900">
                <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-green-300">
                        Today's Schedule
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold">
                        Downtown Clinic
                      </h2>
                    </div>

                    <div className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold">
                      Live
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      ['09:00', 'Dr. Sofia Carter', 'Approved'],
                      ['10:00', 'Dr. Sofia Carter', 'Pending'],
                      ['11:00', 'Dr. Sofia Carter', 'Completed']
                    ].map(([time, doctor, status]) => (
                      <div
                        key={time}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <div>
                          <p className="font-semibold">{time}</p>
                          <p className="text-sm text-slate-300">{doctor}</p>
                        </div>

                        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-300">
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 pb-16 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900"
                >
                  <div className="inline-flex rounded-2xl bg-primary p-3 text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mb-16 rounded-[2rem] border bg-white p-8 shadow-sm dark:bg-slate-900">
            <div className="grid gap-4 lg:grid-cols-3">
              {[
                'JWT Auth',
                'Role Based Access',
                'RAG Knowledge Base',
                'Charts',
                'Calendar',
                'Email Reminders'
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border bg-slate-50 px-4 py-3 dark:bg-slate-950"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}