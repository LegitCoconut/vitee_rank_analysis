import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // Import Button
import { Building, BookOpen, ExternalLink } from 'lucide-react'; // Using Building as a generic campus icon, BookOpen for courses, ExternalLink for website
import Image from 'next/image';

// Data for campuses including key courses and website URLs
// Instructions for User:
// 1. Create a folder named 'assets' inside the 'public' directory at the root of your project.
// 2. Place your actual campus images inside the 'public/assets' folder (e.g., vellore.jpg, chennai.jpg, ap.jpg, bhopal.jpg).
// 3. The 'imageUrl' paths below now point to this location. Ensure your image filenames match these paths.
const campuses = [
  {
    name: 'VIT Vellore',
    location: 'Vellore, Tamil Nadu',
    description: 'The main campus, established in 1984. Known for its vast campus and diverse engineering programs.',
    imageUrl: '/assets/vellore.jpg', // Updated path
    courses: ['CSE', 'IT', 'ECE', 'Mechanical', 'Biotechnology', 'B.Arch', 'B.Des'],
    websiteUrl: 'https://vit.ac.in/',
    redditcomm: 'https://www.reddit.com/r/Vit/',
  },
  {
    name: 'VIT Chennai',
    location: 'Chennai, Tamil Nadu',
    description: 'Established in 2010, located near Chennai city. Offers a range of engineering and law programs.',
    imageUrl: '/assets/chennai.jpg', // Updated path
    courses: ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Fashion Tech', 'Law (B.A/B.B.A LL.B)'],
    websiteUrl: 'https://chennai.vit.ac.in/',
    redditcomm: 'https://www.reddit.com/r/vitchennai/',
  },
  {
    name: 'VIT-AP University',
    location: 'Amaravati, Andhra Pradesh',
    description: 'Focuses on multidisciplinary learning and research. Offers unique programs alongside core engineering.',
    imageUrl: '/assets/ap.jpg', // Updated path
    courses: ['CSE', 'ECE', 'Mechanical', 'Software Engg.', 'Business (BBA)', 'Sciences'],
    websiteUrl: 'https://vitap.ac.in/',
    redditcomm: 'https://www.reddit.com/r/vitap/',
  },
  {
    name: 'VIT Bhopal University',
    location: 'Bhopal, Madhya Pradesh',
    description: 'Known for its CALTech approach and specialized programs like Gaming and Aerospace.',
    imageUrl: '/assets/bhopal.jpeg', // Updated path
    courses: ['CSE', 'ECE', 'Mechanical', 'Aerospace', 'Bioengineering', 'Gaming Tech.'],
    websiteUrl: 'https://vitbhopal.ac.in/',
    redditcomm: 'https://www.reddit.com/r/vitbhopal/',
  },
];

export function CampusInfo() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-primary">VIT Campuses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {campuses.map((campus) => (
          <Card key={campus.name} className="flex flex-col shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
             <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
               <Image
                 src={campus.imageUrl}
                 alt={`${campus.name} campus`}
                 layout="fill"
                 objectFit="cover"
                 // Removed data-ai-hint as actual images are expected
               />
              </div>
            <CardHeader className="flex flex-row items-start space-x-4 pb-2 pt-4">
               <div className="bg-primary/10 p-2 rounded-full">
                 {/* Use the imported Building icon directly */}
                 <Building className="h-6 w-6 text-primary" />
               </div>
               <div>
                 <CardTitle className="text-xl font-semibold text-primary">{campus.name}</CardTitle>
                 <CardDescription className="text-sm text-muted-foreground">{campus.location}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-grow pt-2 pb-4 px-4 space-y-3 flex flex-col justify-between">
                <div>
                    <p className="text-sm text-foreground mb-3">{campus.description}</p>
                    <div>
                        <h4 className="text-sm font-semibold text-primary mb-2 flex items-center">
                        <BookOpen className="h-4 w-4 mr-1.5" />
                        Key Courses Offered:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                            {campus.courses.map((course) => (
                            <Badge key={course} variant="secondary" className="text-xs">
                                {course}
                            </Badge>
                            ))}
                        </div>
                    </div>
                </div>
                <Link href={campus.websiteUrl} target="_blank" rel="noopener noreferrer" className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
                <Link href={campus.redditcomm} target="_blank" rel="noopener noreferrer" className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Visit Reddit Comm
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
