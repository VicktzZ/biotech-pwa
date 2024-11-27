import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  description?: string;
  children: React.ReactNode | string;
  className?: string;
  footerContent?: React.ReactNode | string;
  onClick?: () => void
}

export function InfoCard({ title, description, children, className, footerContent, onClick }: InfoCardProps) {
  return (
    <Card onClick={onClick} className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        {footerContent}
      </CardFooter>
    </Card>
  );
}
