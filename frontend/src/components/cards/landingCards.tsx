import { LucideIcon } from "lucide-react";

// 1. Define the "Blueprint" for what a Feature looks like
export interface Feature {
  id: number | string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 1 | 2 | 3 | 4; // Optional: control grid width
}

export default function FeatureGrid({ features, columns = 4 }: FeatureGridProps) {
  // Mapping column numbers to Tailwind classes
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid gap-8 ${gridCols[columns]}`}>
      {features.map((feature) => (
        <div 
          key={feature.id} 
          className="group p-5 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300"
        >
          {/* Icon Container */}
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <feature.icon className="text-green-700 w-6 h-6" />
          </div>

          {/* Text Content */}
          <h3 className="text-xl font-bold text-zinc-950 mb-3 font-heading">
            {feature.title}
          </h3>
          <p className="text-zinc-600 leading-relaxed font-sans text-sm md:text-base">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}