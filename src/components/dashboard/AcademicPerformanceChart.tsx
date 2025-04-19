import { ResponsiveLine } from '@nivo/line';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for grades
const gradeData = [
  {
    id: 'CGPA',
    color: 'hsl(210, 70%, 50%)',
    data: [
      { x: 'Sem 1', y: 8.1 },
      { x: 'Sem 2', y: 8.3 },
      { x: 'Sem 3', y: 8.2 },
      { x: 'Sem 4', y: 8.6 },
      { x: 'Sem 5', y: 8.5 },
      { x: 'Sem 6', y: 8.7 }
    ]
  }
];

// Mock data for subject-wise performance (current semester)
const subjectData = [
  {
    id: 'Mathematics',
    color: 'hsl(210, 70%, 50%)',
    data: [
      { x: 'Quiz 1', y: 85 },
      { x: 'Mid-Term', y: 78 },
      { x: 'Quiz 2', y: 92 },
      { x: 'Final', y: 88 }
    ]
  },
  {
    id: 'Computer Science',
    color: 'hsl(40, 70%, 50%)',
    data: [
      { x: 'Quiz 1', y: 90 },
      { x: 'Mid-Term', y: 85 },
      { x: 'Quiz 2', y: 88 },
      { x: 'Final', y: 92 }
    ]
  },
  {
    id: 'Physics',
    color: 'hsl(120, 70%, 50%)',
    data: [
      { x: 'Quiz 1', y: 75 },
      { x: 'Mid-Term', y: 82 },
      { x: 'Quiz 2', y: 80 },
      { x: 'Final', y: 85 }
    ]
  }
];

export const AcademicPerformanceChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Academic Performance
          </CardTitle>
          <CardDescription>Track your performance across semesters</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cgpa" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="cgpa">CGPA Trend</TabsTrigger>
              <TabsTrigger value="subjects">Subject-wise</TabsTrigger>
            </TabsList>
            <TabsContent value="cgpa">
              <div className="h-60">
                <ResponsiveLine
                  data={gradeData}
                  margin={{ top: 10, right: 30, bottom: 50, left: 40 }}
                  xScale={{ type: 'point' }}
                  yScale={{
                    type: 'linear',
                    min: 7,
                    max: 10,
                    stacked: false,
                    reverse: false
                  }}
                  curve="monotoneX"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Semester',
                    legendOffset: 36,
                    legendPosition: 'middle'
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'CGPA',
                    legendOffset: -35,
                    legendPosition: 'middle'
                  }}
                  colors={{ scheme: 'category10' }}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[]}
                  enableGridX={false}
                  enableSlices="x"
                />
              </div>
              <div className="mt-2 text-center text-sm text-muted-foreground">
                <span className="text-green-600 font-medium">+0.2</span> improvement in CGPA from last semester
              </div>
            </TabsContent>
            <TabsContent value="subjects">
              <div className="h-60">
                <ResponsiveLine
                  data={subjectData}
                  margin={{ top: 10, right: 110, bottom: 50, left: 40 }}
                  xScale={{ type: 'point' }}
                  yScale={{
                    type: 'linear',
                    min: 60,
                    max: 100,
                    stacked: false,
                    reverse: false
                  }}
                  curve="cardinal"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Assessment',
                    legendOffset: 36,
                    legendPosition: 'middle'
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Score',
                    legendOffset: -35,
                    legendPosition: 'middle'
                  }}
                  colors={{ scheme: 'category10' }}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[
                    {
                      anchor: 'right',
                      direction: 'column',
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: 'left-to-right',
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      symbolBorderColor: 'rgba(0, 0, 0, .5)'
                    }
                  ]}
                  enableGridX={false}
                  enableSlices="x"
                />
              </div>
              <div className="mt-2 text-center text-sm text-muted-foreground">
                Computer Science is your best performing subject this semester
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 