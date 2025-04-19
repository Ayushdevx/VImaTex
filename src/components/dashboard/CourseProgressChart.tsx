import { ResponsivePie } from '@nivo/pie';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

// Mock data for course progress
const courseProgressData = [
  { id: 'Completed', label: 'Completed', value: 65, color: 'hsl(152, 70%, 50%)' },
  { id: 'In Progress', label: 'In Progress', value: 25, color: 'hsl(210, 70%, 50%)' },
  { id: 'Upcoming', label: 'Upcoming', value: 10, color: 'hsl(0, 0%, 85%)' }
];

export const CourseProgressChart = () => {
  // Calculate total credits and completed credits
  const totalCredits = 180;
  const completedCredits = totalCredits * (courseProgressData[0].value / 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-primary" />
            Course Progress
          </CardTitle>
          <CardDescription>Track your degree completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="h-52 w-52">
              <ResponsivePie
                data={courseProgressData}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                innerRadius={0.6}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                enableArcLinkLabels={false}
                colors={{ datum: 'data.color' }}
                defs={[
                  {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                  }
                ]}
                fill={[
                  { match: { id: 'In Progress' }, id: 'dots' }
                ]}
                legends={[]}
              />
            </div>
            <div className="mt-4 sm:mt-0 space-y-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold">{Math.round(courseProgressData[0].value)}%</div>
                <div className="text-sm text-muted-foreground">Degree Progress</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Credits Completed:</span>
                  <span className="font-medium">{completedCredits} / {totalCredits}</span>
                </div>
                
                <div className="space-y-1">
                  {courseProgressData.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs flex-1">{item.label}</span>
                      <span className="text-xs font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Estimated graduation: May 2025
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 