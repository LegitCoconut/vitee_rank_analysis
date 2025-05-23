import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Cpu, Atom, Wrench, Laptop, FlaskConical, Building2, Palette, ShieldCheck, BarChart, Gamepad2, Briefcase, Building, Landmark } from 'lucide-react'; // Added Landmark

// Mock data for courses grouped by broad category - Enhance with more details if needed
const courseCategories = [
  {
    category: 'Engineering & Technology',
    icon: Cpu,
    courses: [
      { name: 'Computer Science and Engineering (CSE)', campuses: ['Vellore', 'Chennai', 'AP', 'Bhopal'] },
      { name: 'CSE (Specialization in AI & Machine Learning)', campuses: ['Vellore', 'Chennai', 'AP', 'Bhopal'] },
      { name: 'CSE (Specialization in Data Science)', campuses: ['Vellore', 'Chennai', 'AP'] },
      { name: 'CSE (Specialization in Cyber Security & Digital Forensics)', campuses: ['Vellore', 'Bhopal'] },
      { name: 'CSE (Specialization in Internet of Things)', campuses: ['Vellore', 'Chennai'] },
      { name: 'CSE (Specialization in Gaming Technology)', campuses: ['Bhopal'] },
      { name: 'Information Technology (IT)', campuses: ['Vellore'] },
      { name: 'Software Engineering', campuses: ['AP'] },
      { name: 'Electronics and Communication Engineering (ECE)', campuses: ['Vellore', 'Chennai', 'AP', 'Bhopal'] },
      { name: 'ECE (Specialization in VLSI)', campuses: ['Vellore', 'AP'] }, // Combined VLSI
      { name: 'Electrical and Electronics Engineering (EEE)', campuses: ['Vellore', 'Chennai'] },
      { name: 'Mechanical Engineering', campuses: ['Vellore', 'Chennai', 'AP', 'Bhopal'] },
      { name: 'Mechanical (Specialization in Robotics and Automation)', campuses: ['Bhopal'] }, // Combined Robotics
      { name: 'Civil Engineering', campuses: ['Vellore', 'Chennai'] },
      { name: 'Chemical Engineering', campuses: ['Vellore'] },
      { name: 'Biotechnology', campuses: ['Vellore'] },
      { name: 'Bioengineering', campuses: ['Bhopal'] },
      { name: 'Aerospace Engineering', campuses: ['Bhopal'] },
      // Add other engineering branches if applicable
    ],
  },
   {
    category: 'Computer Applications',
    icon: Laptop,
    courses: [
       { name: 'Bachelor of Computer Applications (BCA)', campuses: ['Vellore', 'Bhopal'] }, // Check actuals
       { name: 'Master of Computer Applications (MCA)', campuses: ['Vellore', 'Chennai'] }, // Check actuals
       { name: 'Integrated MCA', campuses: ['Vellore'] }, // Check actuals
    ]
   },
   {
    category: 'Sciences',
    icon: Atom, // Or FlaskConical
    courses: [
      { name: 'B.Sc. Physics', campuses: ['Vellore', 'AP'] },
      { name: 'B.Sc. Chemistry', campuses: ['Vellore', 'AP'] },
      { name: 'B.Sc. Mathematics', campuses: ['Vellore', 'AP'] },
       { name: 'M.Sc. Physics', campuses: ['Vellore'] }, // Check actuals
       { name: 'M.Sc. Chemistry', campuses: ['Vellore'] }, // Check actuals
       { name: 'M.Sc. Data Science', campuses: ['Vellore', 'Chennai'] }, // Check actuals
    ]
   },
   {
    category: 'Architecture & Design',
    icon: Building2, // Or Palette
    courses: [
      { name: 'Bachelor of Architecture (B.Arch)', campuses: ['Vellore'] },
      { name: 'Bachelor of Design (B.Des.) - Industrial Design', campuses: ['Vellore'] },
    ]
   },
    {
    category: 'Law',
    icon: ShieldCheck,
    courses: [
      { name: 'B.A. LL.B (Hons.)', campuses: ['Chennai'] },
      { name: 'B.B.A. LL.B (Hons.)', campuses: ['Chennai'] },
    ]
   },
    {
    category: 'Business & Management',
    icon: Briefcase, // Changed icon
    courses: [
      { name: 'BBA (Bachelor of Business Administration)', campuses: ['Vellore', 'AP', 'Bhopal'] },
      { name: 'B.Com (Finance/Banking)', campuses: ['Vellore', 'Chennai'] }, // Check actuals
      { name: 'MBA (Master of Business Administration)', campuses: ['Vellore', 'Chennai'] }, // Check actuals
    ]
   },
    {
    category: 'Hospitality', // Example addition
    icon: Landmark, // Changed icon to Landmark as Building is used elsewhere
    courses: [
        { name: 'B.Sc. Catering and Hotel Management', campuses: ['Vellore'] }, // Check actuals
    ]
   },
   // Add more categories as needed (e.g., Agriculture, Health Sciences)
];

export function CourseList() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-primary">Comprehensive Course List</h2>
      <Card className="shadow-lg transition-shadow hover:shadow-xl bg-card/80 backdrop-blur-sm border border-border/50"> {/* Adjusted card style */}
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
             <BookOpen className="mr-2 h-6 w-6"/>
            Explore Programs Across VIT Campuses
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 md:px-4"> {/* Reduced padding slightly */}
          <Accordion type="single" collapsible className="w-full max-h-[60vh] overflow-y-auto"> {/* Limit height and add scroll */}
            {courseCategories.map((category, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-b border-border/50 last:border-b-0">
                 {/* Reduced vertical padding py-3 */}
                <AccordionTrigger className="text-base font-medium hover:no-underline py-3 text-foreground data-[state=open]:text-primary">
                  <div className="flex items-center space-x-2">
                    <category.icon className="h-4 w-4 text-primary" />
                    <span>{category.category}</span>
                  </div>
                </AccordionTrigger>
                 {/* Adjusted padding pt-1 pb-3 */}
                <AccordionContent className="pt-1 pb-3 pl-6 pr-2 text-xs">
                   {/* Reduced spacing space-y-2 and font size text-xs */}
                  <ul className="space-y-2 list-disc list-inside text-foreground/90">
                    {category.courses.map((course, courseIndex) => (
                      <li key={courseIndex}>
                        <span className="font-medium">{course.name}</span>
                        {/* Adjusted margin ml-1 and kept font size small */}
                        <span className="text-xs text-muted-foreground ml-1 block sm:inline">
                           - Campuses: {course.campuses.join(', ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}

    