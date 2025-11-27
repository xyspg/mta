import { COLORS } from "@/lib/constants";

interface LineBulletProps {
  line: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const LineBullet = ({
  line,
  size = "md",
  className = "",
}: LineBulletProps) => {
  let bgColor = COLORS.grey;
  let textColor = "white";
  const isYellow = ["N", "Q", "R", "W"].includes(line);

  if (isYellow) {
    bgColor = COLORS.yellow;
    textColor = "black";
  } else if (["B", "D", "F", "M"].includes(line)) bgColor = COLORS.orange;
  else if (["E", "F", "M"].includes(line)) bgColor = COLORS.blue;
  else if (["G"].includes(line)) bgColor = COLORS.green;

  // Specific overrides
  if (line === "E") bgColor = COLORS.blue;
  if (line === "F" || line === "M") bgColor = COLORS.orange;

  const sizeClasses = {
    sm: "w-7 h-7 text-sm",
    md: "w-9 h-9 text-lg",
    lg: "w-12 h-12 text-2xl",
    xl: "w-24 h-24 text-6xl",
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold shadow-sm ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {line}
    </div>
  );
};
