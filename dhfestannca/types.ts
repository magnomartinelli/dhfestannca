import { LucideIcon } from 'lucide-react';

export interface ActionButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'accent' | 'highlight';
}

export interface DecorationProps {
  className?: string;
}