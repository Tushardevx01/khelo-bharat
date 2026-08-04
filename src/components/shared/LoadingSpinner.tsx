export default function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };
  return <div className={`${sizeClasses[size]} border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin`} />;
}
