import { ResponsiveCalendar } from '@nivo/calendar';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

// Generate some mock data for attendance
const generateAttendanceData = () => {
  const data = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  // Generate data for the last 3 months
  for (let month = currentMonth - 2; month <= currentMonth; month++) {
    const adjustedMonth = month < 0 ? month + 12 : month;
    const year = month < 0 ? currentYear - 1 : currentYear;
    const daysInMonth = new Date(year, adjustedMonth + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      // Skip weekends (0 = Sunday, 6 = Saturday)
      const date = new Date(year, adjustedMonth, day);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;
      
      // Add attendance data
      // Higher probability of attendance on weekdays
      const attended = Math.random() > 0.15;
      
      if (attended) {
        data.push({
          day: `${year}-${String(adjustedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          value: 1
        });
      }
    }
  }
  
  return data;
};

export const AttendanceChart = () => {
  const attendanceData = generateAttendanceData();
  const from = attendanceData.length > 0 ? attendanceData.reduce((min, item) => 
    item.day < min ? item.day : min, attendanceData[0].day) : '';
  const to = attendanceData.length > 0 ? attendanceData.reduce((max, item) => 
    item.day > max ? item.day : max, attendanceData[0].day) : '';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Clock className="mr-2 h-5 w-5 text-primary" />
            Attendance Heatmap
          </CardTitle>
          <CardDescription>Your class attendance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-52">
            <ResponsiveCalendar
              data={attendanceData}
              from={from}
              to={to}
              emptyColor="#eeeeee"
              colors={['#b3d0ff', '#7fb6ff', '#4d94ff', '#0066ff']}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              yearSpacing={40}
              monthBorderColor="#ffffff"
              monthBorderWidth={2}
              dayBorderWidth={2}
              dayBorderColor="#ffffff"
              legends={[]}
              tooltip={({ day, value, color }) => (
                <div
                  style={{
                    padding: '10px',
                    background: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <strong>{day}</strong>
                  <br />
                  <span>
                    {value === 1 ? 'Attended' : 'Absent'}
                  </span>
                </div>
              )}
            />
          </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            Your attendance rate: <span className="font-medium text-primary">92%</span> in the last 3 months
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 