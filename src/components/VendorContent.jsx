// *** demo content ***
// import React, { useMemo, useState } from "react";
// import {
//     Calendar as CalendarIcon,
//     DollarSign,
//     Star,
//     Phone,
//     Mail,
//     Eye,
//     Clock4,
//     UserRound,
//     ChevronLeft,
//     ChevronRight,
//     Target,
//     TrendingUp,
// } from "lucide-react";

// const Section = ({ title, right, children }) => (
//     <section className="bg-white/60 backdrop-blur rounded-2xl p-4 shadow-sm border border-black/[0.03]">
//         <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
//                 {title}
//             </h2>
//             {right}
//         </div>
//         <div className="mt-4">{children}</div>
//     </section>
// );

// const Badge = ({ children, tone = "orange" }) => (
//     <span
//         className={
//             {
//                 orange:
//                     "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium",
//                 green:
//                     "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium",
//                 yellow:
//                     "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium",
//                 gray:
//                     "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium",
//             }[tone]
//         }
//     >
//         {children}
//     </span>
// );

// const Tabs = ["Overview", "Leads", "Calendar", "Jobs", "Earnings", "Reviews"];

// const TopNav = ({ tab, setTab }) => (
//     <nav className="bg-white text-xl rounded-2xl p-2 shadow-sm border border-black/[0.04]">
//         <ul className="flex flex-wrap items-center justify-between gap-2 md:gap-3">
//             {Tabs.map((t) => (
//                 <li key={t} className="grow">
//                     <button
//                         onClick={() => setTab(t)}
//                         className={`w-full px-6 py-2 rounded-full font-medium transition text-center ${tab === t
//                             ? "bg-[#E69B83] text-white shadow-sm"
//                             : "text-gray-600 hover:bg-gray-100"
//                             }`}
//                     >
//                         {t}
//                     </button>
//                 </li>
//             ))}
//         </ul>
//     </nav>
// );

// const Overview = () => (
//     <div className="space-y-0.5">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Section title="Monthly Performance">
//                 <div className="space-y-4">
//                     {(() => {
//                         const data = [
//                             { m: "Apr 2024", v: 61_000 },
//                             { m: "May 2024", v: 55_000 },
//                             { m: "Jun 2024", v: 67_000 },
//                         ];
//                         const maxVal = Math.max(...data.map(d => d.v));

//                         return data.map(({ m, v }) => (
//                             <div key={m} className="flex items-center ">
//                                 <div className="w-24 text-gray-600">{m}</div>
//                                 <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
//                                     <div
//                                         className="h-3 bg-[#e39a79] rounded-full"
//                                         style={{ width: `${(v / maxVal) * 100}%` }}
//                                     />
//                                 </div>
//                                 <div className="w-24 text-right font-semibold text-gray-800">
//                                     ₹{v.toLocaleString()}
//                                 </div>
//                             </div>
//                         ));
//                     })()}
//                 </div>
//             </Section>
//             <Section title="Service Breakdown">
//                 <div className="space-y-5">
//                     {(() => {
//                         const services = [
//                             { name: "Wedding Photography", jobs: 12 },
//                             { name: "Corporate Events", jobs: 8 },
//                             { name: "Birthday Parties", jobs: 15 },
//                         ];
//                         const maxJobs = Math.max(...services.map(s => s.jobs));

//                         return services.map((s) => (
//                             <div key={s.name}>
//                                 <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
//                                     <span>{s.name}</span>
//                                     <span className="font-semibold text-gray-900">{s.jobs} jobs</span>
//                                 </div>
//                                 <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
//                                     <div
//                                         className="h-3 bg-[#e39a79] rounded-full"
//                                         style={{ width: `${(s.jobs / maxJobs) * 100}%` }}
//                                     />
//                                 </div>
//                             </div>
//                         ));
//                     })()}
//                 </div>
//             </Section>
//         </div>

//         {/* Recent Activity */}
//         <Section title="Recent Activity">
//             <div className="space-y-0.5">
//                 {[
//                     {
//                         date: "12/15/2024",
//                         text:
//                             "₹200,000 • Advance: 50000 (Paid); 1st Milestone: 100000 (Due 2024-11-01); Final: 50000 (Due 2024-12-10)",
//                         status: "Confirmed",
//                     },
//                     {
//                         date: "10/20/2024",
//                         text: "₹25,000 • Advance: 5000 (Due 2024-09-25)",
//                         status: "Pending",
//                     },
//                 ].map((a, i) => (
//                     <div
//                         key={i}
//                         className="flex items-start justify-between gap-4 bg-white rounded-xl border border-black/[0.04] p-4"
//                     >
//                         <div className="flex items-center gap-3 text-gray-700">
//                             <CalendarIcon className="w-5 h-5 text-[#e39a79]" />
//                             <div>
//                                 <p className="font-bold text-lg">Event on {a.date}</p>
//                                 <p className="text-sm text-gray-600">{a.text}</p>
//                             </div>
//                         </div>
//                         <Badge tone={a.status === "Confirmed" ? "green" : "yellow"}>
//                             {a.status}
//                         </Badge>
//                     </div>
//                 ))}
//             </div>
//         </Section>
//     </div>
// );

// const LeadsPage = () => (
//     <div className="space-y-6">
//         <div className="flex items-center justify-between">
//             <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
//                 Lead Management
//             </h1>
//             <Badge tone="yellow">1 New Lead(s)</Badge>
//         </div>

//         <div className="rounded-2xl bg-white p-4 md:p-6 shadow-sm border border-black/[0.04]">
//             <div className="rounded-2xl border border-black/[0.05] p-4 md:p-6 bg-white/60">
//                 <div className="flex items-start justify-between gap-4">
//                     <div className="flex items-center gap-4">
//                         <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center">
//                             <UserRound className="w-7 h-7 text-[#e39a79]" />
//                         </div>
//                         <div>
//                             <h3 className="text-xl font-bold text-gray-900">
//                                 New Event Inquiry
//                             </h3>
//                             <p className="text-gray-600">Event Date: 10/20/2024</p>
//                         </div>
//                     </div>

//                     <Badge tone="yellow">Pending</Badge>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                     <div className="flex items-center gap-2 text-gray-700">
//                         <CalendarIcon className="w-5 h-5" /> 10/20/2024
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-700">
//                         <DollarSign className="w-5 h-5" /> Budget: ₹25,000
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-700">
//                         <Clock4 className="w-5 h-5" /> -311 days away
//                     </div>
//                 </div>

//                 <p className="mt-4 text-gray-700">
//                     Advance: 5000 <span className="text-gray-500">(Due 2024-09-25)</span>
//                 </p>

//                 <div className="flex flex-wrap gap-3 mt-6">
//                     <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e39a79] text-white">
//                         <Phone className="w-4 h-4" /> Call Customer
//                     </button>
//                     <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 text-[#e39a79]">
//                         <Mail className="w-4 h-4" /> Send Quote
//                     </button>
//                     <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 text-[#e39a79]">
//                         <Eye className="w-4 h-4" /> View Details
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// const MonthCalendar = () => {
//     const [monthOffset, setOffset] = useState(0);
//     const base = new Date(2025, 7, 1); // Aug 2025
//     const viewDate = useMemo(() => new Date(base.getFullYear(), base.getMonth() + monthOffset, 1), [monthOffset]);
//     const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
//     const days = Array.from({ length: daysInMonth }, (_, i) =>
//         new Date(viewDate.getFullYear(), viewDate.getMonth(), i + 1)
//     );

//     const monthName = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
//     const isSameMonth = (d) => d.getMonth() === viewDate.getMonth();

//     return (
//         <div className="rounded-2xl border border-black/[0.04] bg-white p-4 md:p-6 
//                 max-w-md mx-auto scale-90">
//             <div className="flex items-center justify-between">
//                 <button className="p-1 rounded hover:bg-gray-100" onClick={() => setOffset((v) => v - 1)}>
//                     <ChevronLeft className="w-5 h-5" />
//                 </button>
//                 <div className="font-semibold">{monthName}</div>
//                 <button className="p-1 rounded hover:bg-gray-100" onClick={() => setOffset((v) => v + 1)}>
//                     <ChevronRight className="w-5 h-5" />
//                 </button>
//             </div>

//             <div className="grid grid-cols-7 text-center text-xs text-gray-500 mt-4">
//                 {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
//                     <div key={d} className="py-2">
//                         {d}
//                     </div>
//                 ))}
//             </div>

//             <div className="grid grid-cols-7 gap-2 text-sm">
//                 {days.map((d, i) => {
//                     const highlight = isSameMonth(d) && d.getDate() === 28;
//                     return (
//                         <div
//                             key={i}
//                             className={`aspect-square rounded-xl flex items-center justify-center border ${isSameMonth(d)
//                                 ? "bg-white text-gray-800 border-gray-200"
//                                 : "bg-gray-50 text-gray-400 border-transparent"
//                                 } ${highlight ? "bg-orange-50 ring-1 ring-[#f3b89e]" : ""}`}
//                         >
//                             {d.getDate()}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// const CalendarPage = () => (
//     <div className="space-y-6">
//         <div className="flex items-center justify-between">
//             <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
//                 Calendar Management
//             </h1>
//             <button className="inline-flex items-center gap-2 p-2 rounded-xl bg-[#E69B83] text-white">
//                 <CalendarIcon className="w-4 h-4" /> Sync Google Calendar
//             </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2">
//                 <Section title="Availability Calendar">
//                     <MonthCalendar />
//                 </Section>
//             </div>

//             <div className="space-y-6">
//                 <Section title="Today's Schedule">
//                     <div className="space-y-3">
//                         <div className="flex items-start gap-3 bg-orange-50 rounded-xl p-4">
//                             <span className="mt-1 w-2 h-2 rounded-full bg-orange-500" />
//                             <div>
//                                 <div className="font-medium text-gray-800">Wedding Consultation</div>
//                                 <div className="text-gray-500 text-sm">2:00 PM - 3:00 PM</div>
//                             </div>
//                         </div>
//                         <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
//                             <span className="mt-1 w-2 h-2 rounded-full bg-teal-600" />
//                             <div>
//                                 <div className="font-medium text-gray-800">Site Visit</div>
//                                 <div className="text-gray-500 text-sm">4:30 PM - 5:30 PM</div>
//                             </div>
//                         </div>
//                     </div>
//                 </Section>

//                 <Section title="Quick Actions">
//                     <div className="space-y-3">
//                         {["Block Dates", "Set Availability", "Schedule Meeting"].map((x) => (
//                             <button
//                                 key={x}
//                                 className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-orange-200 text-[#e39a79] hover:bg-orange-50"
//                             >
//                                 <CalendarIcon className="w-4 h-4" /> {x}
//                             </button>
//                         ))}
//                     </div>
//                 </Section>
//             </div>
//         </div>
//     </div>
// );

// const JobsPage = () => (
//     <div className="space-y-6">
//         <div className="flex items-center justify-between">
//             <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
//                 Upcoming Jobs
//             </h1>
//             <Badge tone="orange">0 Active Jobs</Badge>
//         </div>

//         <div className="rounded-2xl h-64 bg-white/60 border border-black/[0.04] shadow-sm flex items-center justify-center text-gray-500">
//             No jobs scheduled yet.
//         </div>
//     </div>
// );

// const PaymentRow = ({ date, id, amt, status }) => (
//     <tr className="border-b last:border-b-0">
//         <td className="px-4 py-3 text-gray-800">{date}</td>
//         <td className="px-4 py-3 text-[#6b7280]">#{id}</td>
//         <td className="px-4 py-3 font-semibold text-gray-900">₹{amt.toLocaleString()}</td>
//         <td className="px-4 py-3">
//             <Badge tone={status === "Paid" ? "green" : status === "Unpaid" ? "gray" : "yellow"}>{status}</Badge>
//         </td>
//         <td className="px-4 py-3 text-right">
//             <button className="p-2 rounded-xl bg-orange-50 text-[#e39a79]">
//                 <Eye className="w-4 h-4" />
//             </button>
//         </td>
//     </tr>
// );

// const EarningsPage = () => (
//     <div className="space-y-6">
//         <div className="flex items-center justify-between">
//             <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
//                 Earnings & Analytics
//             </h1>
//             <Badge tone="green">₹535,000 Total</Badge>
//         </div>

//         {/* Top summary cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <Section title="This Month" right={<DollarSign className="w-6 h-6 text-[#e39a79]" />}>
//                 <div className="text-3xl font-extrabold">₹67,000</div>
//                 <div className="text-sm text-gray-500 mt-1">+12% from last month</div>
//             </Section>
//             <Section title="Avg per Job" right={<TrendingUp className="w-6 h-6 text-teal-600" />}>
//                 <div className="text-3xl font-extrabold">₹89,167</div>
//                 <div className="text-sm text-gray-500 mt-1">Based on 6 jobs</div>
//             </Section>
//             <Section title="Monthly Goal" right={<Target className="w-6 h-6 text-[#e39a79]" />}>
//                 <div className="text-3xl font-extrabold">89%</div>
//                 <div className="text-sm text-gray-500 mt-1">₹67k of ₹75k target</div>
//             </Section>
//         </div>

//         {/* Charts-like lists */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Section title="Monthly Earnings">
//                 <div className="space-y-4">
//                     {["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024"].map((m, i) => (
//                         <div key={m} className="flex items-center gap-4">
//                             <div className="w-28 text-gray-600">{m}</div>
//                             <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
//                                 <div className="h-3 bg-[#e39a79] rounded-full" style={{ width: `${40 + i * 8}%` }} />
//                             </div>
//                             <div className="w-24 text-right font-semibold text-gray-800">₹{(45_000 + i * 3_000).toLocaleString()}</div>
//                         </div>
//                     ))}
//                 </div>
//             </Section>

//             <Section title="Service Performance">
//                 <div className="space-y-5">
//                     {[
//                         { label: "Wedding Photography", amt: 180_000, pct: 0.88, sub: "₹15,000 avg" },
//                         { label: "Corporate Events", amt: 120_000, pct: 0.65, sub: "₹15,000 avg" },
//                         { label: "Birthday Parties", amt: 90_000, pct: 0.52, sub: "₹6,000 avg" },
//                     ].map((row) => (
//                         <div key={row.label}>
//                             <div className="flex items-center justify-between text-sm text-gray-700">
//                                 <span>{row.label}</span>
//                                 <span className="font-bold text-gray-900">₹{row.amt.toLocaleString()}</span>
//                             </div>
//                             <div className="h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
//                                 <div className="h-3 bg-[#e39a79] rounded-full" style={{ width: `${row.pct * 100}%` }} />
//                             </div>
//                             <div className="text-xs text-gray-500 mt-1">{row.sub}</div>
//                         </div>
//                     ))}
//                 </div>
//             </Section>
//         </div>

//         {/* Payment History */}
//         <Section title="Payment History">
//             <div className="overflow-x-auto">
//                 <table className="min-w-full text-left">
//                     <thead>
//                         <tr className="text-gray-500 text-sm">
//                             <th className="px-4 py-2 font-medium">Date</th>
//                             <th className="px-4 py-2 font-medium">Booking ID</th>
//                             <th className="px-4 py-2 font-medium">Amount</th>
//                             <th className="px-4 py-2 font-medium">Status</th>
//                             <th className="px-4 py-2 font-medium text-right">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="text-sm">
//                         <PaymentRow date="12/15/2024" id="482bbc1f" amt={200000} status="Partially Paid" />
//                         <PaymentRow date="10/20/2024" id="bd2b49a9" amt={25000} status="Unpaid" />
//                         <PaymentRow date="11/5/2024" id="87aaba6c" amt={150000} status="Paid" />
//                         <PaymentRow date="10/1/2024" id="cf3661dd" amt={50000} status="Partially Refunded" />
//                         <PaymentRow date="10/28/2024" id="495d08a7" amt={35000} status="Paid" />
//                     </tbody>
//                 </table>
//             </div>
//         </Section>
//     </div>
// );

// const RatingRow = ({ stars, count, wide = 70 }) => (
//     <div className="flex items-center gap-3 text-sm">
//         <div className="w-6 text-gray-700 font-medium">{stars}★</div>
//         <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
//             <div className="h-3 bg-yellow-400 rounded-full" style={{ width: `${wide}%` }} />
//         </div>
//         <div className="w-6 text-gray-700 text-right">{count}</div>
//     </div>
// );

// const ReviewsPage = () => (
//     <div className="space-y-6">
//         <div className="flex items-center justify-between">
//             <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
//                 Customer Reviews
//             </h1>
//             <div className="flex items-center gap-2 text-yellow-500 font-semibold">
//                 <Star className="w-5 h-5 fill-yellow-400" /> 4.4 <span className="text-gray-500 font-normal">(5 reviews)</span>
//             </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Section title="Rating Breakdown">
//                 <div className="space-y-3">
//                     <RatingRow stars={5} count={3} wide={80} />
//                     <RatingRow stars={4} count={1} wide={38} />
//                     <RatingRow stars={3} count={1} wide={30} />
//                     <RatingRow stars={2} count={0} wide={5} />
//                     <RatingRow stars={1} count={0} wide={5} />
//                 </div>
//             </Section>

//             <Section title="Review Highlights">
//                 <div className="space-y-4 text-gray-700">
//                     <div className="flex items-start gap-3">
//                         <Badge tone="orange">Excellent Service</Badge>
//                         <span className="text-sm text-gray-500">Mentioned in 85% of reviews</span>
//                     </div>
//                     <div className="flex items-start gap-3">
//                         <Badge tone="orange">Quick Response</Badge>
//                         <span className="text-sm text-gray-500">Mentioned in 78% of reviews</span>
//                     </div>
//                     <div className="flex items-start gap-3">
//                         <Badge tone="orange">Professional</Badge>
//                         <span className="text-sm text-gray-500">Mentioned in 92% of reviews</span>
//                     </div>
//                 </div>
//             </Section>
//         </div>

//         <Section title="Recent Reviews">
//             <div className="space-y-6">
//                 {[1, 2].map((i) => (
//                     <div key={i} className="bg-white rounded-xl border border-black/[0.04] p-4">
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
//                                     <UserRound className="w-5 h-5 text-[#e39a79]" />
//                                 </div>
//                                 <div>
//                                     <div className="font-semibold">Customer #{String(i).padStart(4, "0")}</div>
//                                     <div className="text-xs text-gray-500">{i === 1 ? "7/15/2024" : "7/20/2024"}</div>
//                                 </div>
//                             </div>
//                             <div className="flex gap-1 text-yellow-400">
//                                 {Array.from({ length: i === 1 ? 5 : 4 }).map((_, k) => (
//                                     <Star key={k} className="w-4 h-4 fill-yellow-400" />
//                                 ))}
//                             </div>
//                         </div>
//                         <p className="mt-3 text-gray-700">
//                             "Shaadi ka decor ekdum zabardast tha! Sabko bahut pasand aaya. Highly recommended."
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </Section>
//     </div>
// );

// export default function VendorContent() {
//     const [tab, setTab] = useState("Overview");

//     return (
//         <div className="min-h-screen bg-[#f7f8fc] p-4">
//             <div className="mx-auto space-y-6 p-2">
//                 <TopNav tab={tab} setTab={setTab} />

//                 {/* Page content */}
//                 {tab === "Overview" && <Overview />}
//                 {tab === "Leads" && <LeadsPage />}
//                 {tab === "Calendar" && <CalendarPage />}
//                 {tab === "Jobs" && <JobsPage />}
//                 {tab === "Earnings" && <EarningsPage />}
//                 {tab === "Reviews" && <ReviewsPage />}
//             </div>
//         </div>
//     );
// }




import React, { useMemo, useState } from "react";
import {
    Calendar as CalendarIcon,
    DollarSign,
    Star,
    Phone,
    Mail,
    Eye,
    Clock4,
    UserRound,
    ChevronLeft,
    ChevronRight,
    Target,
    TrendingUp,
} from "lucide-react";

// Section Component
const Section = ({ title, right, children }) => (
    <section className="bg-white/60 backdrop-blur rounded-2xl p-4 shadow-sm border border-black/[0.03]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">{title}</h2>
            {right}
        </div>
        <div className="mt-4">{children}</div>
    </section>
);

// Badge Component
const Badge = ({ children, tone = "orange" }) => (
    <span
        className={
            {
                orange:
                    "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium",
                green:
                    "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium",
                yellow:
                    "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium",
                gray:
                    "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium",
            }[tone]
        }
    >
        {children}
    </span>
);

// Top navigation tabs
const Tabs = ["Overview", "Leads", "Calendar", "Rewards", "Earnings", "Reviews"];

const TopNav = ({ tab, setTab }) => (
    <nav className="bg-white text-base sm:text-lg rounded-2xl p-2 sm:p-3 shadow-sm border border-black/[0.04] overflow-x-auto">
        <ul className="flex justify-between gap-2 sm:gap-3 w-full">
            {Tabs.map((t) => (
                <li key={t}>
                    <button
                        onClick={() => setTab(t)}
                        className={`px-4 sm:px-6 py-2 rounded-full font-medium transition text-center whitespace-nowrap ${tab === t
                                ? "bg-[#E69B83] text-white shadow-sm"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {t}
                    </button>
                </li>
            ))}
        </ul>
    </nav>
);

// Pages
const Overview = () => (
    <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Section title="Monthly Performance">
                <div className="text-gray-500">No data yet.</div>
            </Section>
            <Section title="Service Breakdown">
                <div className="text-gray-500">No services yet.</div>
            </Section>
        </div>

        <Section title="Recent Activity">
            <div className="text-gray-500">No activity yet.</div>
        </Section>
    </div>
);

const LeadsPage = () => (
    <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Lead Management
            </h1>
            <Badge tone="yellow">0 New Lead(s)</Badge>
        </div>

        <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-black/[0.04] text-gray-500">
            No leads yet.
        </div>
    </div>
);

const MonthCalendar = () => {
    const [monthOffset, setOffset] = useState(0);
    const base = new Date(2025, 7, 1); // Aug 2025
    const viewDate = useMemo(() => new Date(base.getFullYear(), base.getMonth() + monthOffset, 1), [monthOffset]);
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) =>
        new Date(viewDate.getFullYear(), viewDate.getMonth(), i + 1)
    );

    const monthName = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const isSameMonth = (d) => d.getMonth() === viewDate.getMonth();

    return (
        <div className="rounded-2xl border border-black/[0.04] bg-white p-4 sm:p-6 w-full overflow-x-auto">
            <div className="flex items-center justify-between">
                <button className="p-1 rounded hover:bg-gray-100" onClick={() => setOffset((v) => v - 1)}>
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="font-semibold">{monthName}</div>
                <button className="p-1 rounded hover:bg-gray-100" onClick={() => setOffset((v) => v + 1)}>
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-7 text-center text-xs text-gray-500 mt-4">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div key={d} className="py-2">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-sm">
                {days.map((d, i) => (
                    <div
                        key={i}
                        className={`aspect-square rounded-xl flex items-center justify-center border ${isSameMonth(d)
                                ? "bg-white text-gray-800 border-gray-200"
                                : "bg-gray-50 text-gray-400 border-transparent"
                            }`}
                    >
                        {d.getDate()}
                    </div>
                ))}
            </div>
        </div>
    );
};

const CalendarPage = () => (
    <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Calendar Management
            </h1>
            <button className="inline-flex items-center gap-2 p-2 rounded-xl bg-[#E69B83] text-white mt-2 sm:mt-0">
                <CalendarIcon className="w-4 h-4" /> Sync Google Calendar
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
                <Section title="Availability Calendar">
                    <MonthCalendar />
                </Section>
            </div>

            <div className="space-y-4 sm:space-y-6">
                <Section title="Today's Schedule">
                    <div className="text-gray-500">No schedule for today.</div>
                </Section>

                <Section title="Quick Actions">
                    <div className="space-y-2 sm:space-y-3">
                        {["Block Dates", "Set Availability", "Schedule Meeting"].map((x) => (
                            <button
                                key={x}
                                className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-orange-200 text-[#e39a79] hover:bg-orange-50"
                            >
                                <CalendarIcon className="w-4 h-4" /> {x}
                            </button>
                        ))}
                    </div>
                </Section>
            </div>
        </div>
    </div>
);

const RewardsPage = () => (
    <div className="space-y-4 sm:space-y-6">
        <div className="rounded-2xl h-64 bg-white/60 border border-black/[0.04] shadow-sm flex items-center justify-center text-gray-500">
            No rewards yet.
        </div>
    </div>
);

const EarningsPage = () => (
    <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Earnings & Analytics
            </h1>
            <Badge tone="green">₹0 Total</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Section title="This Month" right={<DollarSign className="w-6 h-6 text-[#e39a79]" />}>
                <div className="text-2xl sm:text-3xl font-extrabold">₹0</div>
                <div className="text-sm text-gray-500 mt-1">+0% from last month</div>
            </Section>
            <Section title="Avg per Job" right={<TrendingUp className="w-6 h-6 text-teal-600" />}>
                <div className="text-2xl sm:text-3xl font-extrabold">₹0</div>
                <div className="text-sm text-gray-500 mt-1">Based on 0 jobs</div>
            </Section>
            <Section title="Monthly Goal" right={<Target className="w-6 h-6 text-[#e39a79]" />}>
                <div className="text-2xl sm:text-3xl font-extrabold">0%</div>
                <div className="text-sm text-gray-500 mt-1">₹0 of ₹0 target</div>
            </Section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4">
            <Section title="Monthly Earnings">
                <div className="text-gray-500">No earnings yet.</div>
            </Section>

            <Section title="Service Performance">
                <div className="text-gray-500">No service performance yet.</div>
            </Section>
        </div>

        <Section title="Payment History">
            <div className="text-gray-500">No payments yet.</div>
        </Section>
    </div>
);

const ReviewsPage = () => (
    <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Customer Reviews
            </h1>
            <div className="flex items-center gap-2 text-yellow-500 font-semibold mt-2 sm:mt-0">
                <Star className="w-5 h-5 fill-yellow-400" /> 0.0 <span className="text-gray-500 font-normal">(0 reviews)</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Section title="Rating Breakdown">
                <div className="text-gray-500">No ratings yet.</div>
            </Section>

            <Section title="Review Highlights">
                <div className="text-gray-500">No highlights yet.</div>
            </Section>
        </div>

        <Section title="Recent Reviews">
            <div className="text-gray-500">No reviews yet.</div>
        </Section>
    </div>
);

export default function VendorContent() {
    const [tab, setTab] = useState("Overview");

    return (
        <div className="min-h-screen bg-[#f7f8fc] p-2 sm:p-4 md:p-6 lg:p-8">
            <div className="mx-auto  space-y-4 sm:space-y-6 md:space-y-8">
                <TopNav tab={tab} setTab={setTab} />

                {tab === "Overview" && <Overview />}
                {tab === "Leads" && <LeadsPage />}
                {tab === "Calendar" && <CalendarPage />}
                {tab === "Rewards" && <RewardsPage />}
                {tab === "Earnings" && <EarningsPage />}
                {tab === "Reviews" && <ReviewsPage />}
            </div>
        </div>
    );
}
