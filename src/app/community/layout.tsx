
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VIT Community Forums',
  description: 'Connect with fellow VIT aspirants and students.',
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
