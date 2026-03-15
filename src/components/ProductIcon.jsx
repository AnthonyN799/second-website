import React from 'react';
import { Droplets, Wind, Flame, Sparkles, Leaf } from 'lucide-react';

const iconMap = { Droplets, Wind, Flame, Sparkles, Leaf };

export default function ProductIcon({ name, className = "w-6 h-6", ...props }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} {...props} />;
}
