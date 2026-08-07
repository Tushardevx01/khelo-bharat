export const APP_NAME = "Khelo Bharat";
export const APP_TAGLINE = "One Platform. Every Athlete. Every Opportunity.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://khelobharat.com";

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  SCHOOL_ADMIN: "SCHOOL_ADMIN",
  ATHLETE: "ATHLETE",
  COACH: "COACH",
  SPONSOR: "SPONSOR",
} as const;

export const SPORT_CATEGORIES = [
  { value: "CRICKET", label: "Cricket", icon: "🏏" },
  { value: "FOOTBALL", label: "Football", icon: "⚽" },
  { value: "BASKETBALL", label: "Basketball", icon: "🏀" },
  { value: "TENNIS", label: "Tennis", icon: "🎾" },
  { value: "BADMINTON", label: "Badminton", icon: "🏸" },
  { value: "ATHLETICS", label: "Athletics", icon: "🏃" },
  { value: "SWIMMING", label: "Swimming", icon: "🏊" },
  { value: "VOLLEYBALL", label: "Volleyball", icon: "🏐" },
  { value: "HOCKEY", label: "Hockey", icon: "🏑" },
  { value: "KABADDI", label: "Kabaddi", icon: "🤼" },
  { value: "CHESS", label: "Chess", icon: "♟️" },
  { value: "TABLE_TENNIS", label: "Table Tennis", icon: "🏓" },
  { value: "WRESTLING", label: "Wrestling", icon: "🤼‍♂️" },
  { value: "BOXING", label: "Boxing", icon: "🥊" },
  { value: "WEIGHTLIFTING", label: "Weightlifting", icon: "🏋️" },
  { value: "SHOOTING", label: "Shooting", icon: "🎯" },
  { value: "ARCHERY", label: "Archery", icon: "🏹" },
  { value: "OTHER", label: "Other", icon: "🏅" },
] as const;

export const TOURNAMENT_STATUSES = [
  { value: "DRAFT", label: "Draft", color: "gray" },
  { value: "UPCOMING", label: "Upcoming", color: "blue" },
  { value: "REGISTRATION_OPEN", label: "Registration Open", color: "green" },
  { value: "REGISTRATION_CLOSED", label: "Registration Closed", color: "yellow" },
  { value: "ONGOING", label: "Ongoing", color: "orange" },
  { value: "COMPLETED", label: "Completed", color: "purple" },
  { value: "CANCELLED", label: "Cancelled", color: "red" },
] as const;

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Chandigarh",
  "Puducherry", "Andaman and Nicobar Islands", "Dadra and Nagar Haveli",
  "Lakshadweep",
] as const;

export const NAVIGATION = {
  main: [
    { label: "Home", href: "/" },
    { label: "Tournaments", href: "/tournaments" },
    { label: "Sports", href: "/sports" },
    { label: "Athletes", href: "/athletes" },
    { label: "Schools", href: "/schools" },
  ],
  auth: [
    { label: "Login", href: "/login" },
    { label: "Sign Up", href: "/sign-up" },
  ],
  dashboard: [
    { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { label: "Tournaments", href: "/tournaments", icon: "Trophy" },
    { label: "Analytics", href: "/analytics", icon: "BarChart3" },
    { label: "Certificates", href: "/certificates", icon: "Award" },
    { label: "Messages", href: "/messages", icon: "MessageSquare" },
    { label: "Notifications", href: "/notifications", icon: "Bell" },
    { label: "Gallery", href: "/gallery", icon: "Image" },
    { label: "Settings", href: "/settings", icon: "Settings" },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: "LayoutDashboard" },
    { label: "Users", href: "/dashboard/admin/users", icon: "Users" },
    { label: "Tournaments", href: "/dashboard/admin/tournaments", icon: "Trophy" },
    { label: "Schools", href: "/dashboard/admin/schools", icon: "School" },
    { label: "Sponsors", href: "/dashboard/admin/sponsors", icon: "Handshake" },
    { label: "Reports", href: "/dashboard/admin/reports", icon: "FileText" },
    { label: "Audit Logs", href: "/dashboard/admin/audit-logs", icon: "ScrollText" },
    { label: "Settings", href: "/dashboard/admin/settings", icon: "Settings" },
  ],
} as const;

export const STATS = {
  athletes: "50,000+",
  schools: "1,200+",
  tournaments: "500+",
  states: "28+",
} as const;
