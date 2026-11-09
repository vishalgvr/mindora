import React from 'react';
import {
  Bot,
  BarChart3,
  Code2,
  Smartphone,
  Database,
  TrendingUp,
  Palette,
  ShieldCheck,
  Palmtree,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Briefcase,
  Utensils,
  Rocket,
  Building2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

interface ServiceIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, size = 24, className = '' }) => {
  switch (name) {
    case 'Bot':
      return <Bot size={size} className={className} />;
    case 'BarChart3':
      return <BarChart3 size={size} className={className} />;
    case 'Code2':
      return <Code2 size={size} className={className} />;
    case 'Smartphone':
      return <Smartphone size={size} className={className} />;
    case 'Database':
      return <Database size={size} className={className} />;
    case 'TrendingUp':
      return <TrendingUp size={size} className={className} />;
    case 'Palette':
      return <Palette size={size} className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck size={size} className={className} />;
    case 'Palmtree':
      return <Palmtree size={size} className={className} />;
    case 'HeartPulse':
      return <HeartPulse size={size} className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag size={size} className={className} />;
    case 'GraduationCap':
      return <GraduationCap size={size} className={className} />;
    case 'Briefcase':
      return <Briefcase size={size} className={className} />;
    case 'Utensils':
      return <Utensils size={size} className={className} />;
    case 'Rocket':
      return <Rocket size={size} className={className} />;
    case 'Building2':
      return <Building2 size={size} className={className} />;
    case 'Cpu':
      return <Cpu size={size} className={className} />;
    case 'Layers':
      return <Layers size={size} className={className} />;
    case 'Zap':
      return <Zap size={size} className={className} />;
    default:
      return <Sparkles size={size} className={className} />;
  }
};
