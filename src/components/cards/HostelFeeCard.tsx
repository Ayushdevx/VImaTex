import React from "react";
import { ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HostelFeeCardProps = {
  showInternational?: boolean;
};

export const HostelFeeCard: React.FC<HostelFeeCardProps> = ({
  showInternational = true,
}) => {
  return (
    <div className="space-y-6">
      {/* Fee information banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Chennai Campus</h3>
        <p className="text-sm text-blue-700 mb-1">
          Hostel & Mess Fee Details for the First Year Students of Chennai Campus (2024-25)
        </p>
        <p className="text-xs text-blue-600 italic mb-4">(For Fall & Winter Semester Only)</p>
        
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          <ExternalLink className="h-4 w-4 mr-1.5" />
          View complete fee structure on VTOP
        </a>
      </div>

      {/* Fee table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Hostel Fee Structure</CardTitle>
          <CardDescription>2024-25 Academic Year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border px-3 py-2 text-left">Particulars</th>
                  <th className="border px-3 py-2 text-center">2 Bed AC</th>
                  <th className="border px-3 py-2 text-center">3 Bed Non-AC</th>
                  <th className="border px-3 py-2 text-center">3 Bed AC</th>
                  <th className="border px-3 py-2 text-center">4 Bed AC</th>
                  <th className="border px-3 py-2 text-center">6 Bed AC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2 font-medium">Hostel Fees</td>
                  <td className="border px-3 py-2 text-center">₹1,24,200</td>
                  <td className="border px-3 py-2 text-center">₹1,07,400</td>
                  <td className="border px-3 py-2 text-center">₹1,15,200</td>
                  <td className="border px-3 py-2 text-center">₹94,200</td>
                  <td className="border px-3 py-2 text-center">₹79,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-3 py-2 font-medium">Admission Fee (Non-Refundable)</td>
                  <td className="border px-3 py-2 text-center">₹15,000</td>
                  <td className="border px-3 py-2 text-center">₹15,000</td>
                  <td className="border px-3 py-2 text-center">₹15,000</td>
                  <td className="border px-3 py-2 text-center">₹15,000</td>
                  <td className="border px-3 py-2 text-center">₹15,000</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2 font-medium">Caution Deposit (Refundable)</td>
                  <td className="border px-3 py-2 text-center">₹15,000</td>
                  <td className="border px-3 py-2 text-center">₹15,000</td>
                  <td className="border px-3 py-2 text-center">₹15,000</td>
                  <td className="border px-3 py-2 text-center">₹15,000</td>
                  <td className="border px-3 py-2 text-center">₹15,000</td>
                </tr>
                <tr className="bg-gray-50 font-semibold">
                  <td className="border px-3 py-2">Total amount in INR (Excluding Mess Charges)</td>
                  <td className="border px-3 py-2 text-center">₹1,54,200</td>
                  <td className="border px-3 py-2 text-center">₹1,37,400</td>
                  <td className="border px-3 py-2 text-center">₹1,45,200</td>
                  <td className="border px-3 py-2 text-center">₹1,24,200</td>
                  <td className="border px-3 py-2 text-center">₹1,09,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3">MESS CHARGES</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border px-3 py-2 text-left">Mess Type</th>
                  <th className="border px-3 py-2 text-center">Amount in (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2 font-medium">Veg Mess</td>
                  <td className="border px-3 py-2 text-center">₹78,800</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-3 py-2 font-medium">Non Veg Mess</td>
                  <td className="border px-3 py-2 text-center">₹87,900</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2 font-medium">Special Mess</td>
                  <td className="border px-3 py-2 text-center">₹97,700</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-3 py-2 font-medium">Food Park</td>
                  <td className="border px-3 py-2 text-center">₹1,01,200</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500 mt-3 italic">*Mess payment will be treated as FIXED CHARGES as per policy for all the students.</p>
          <p className="font-medium text-sm mt-3">Mode of Payment:</p>
          <p className="text-xs text-gray-600">*All payments are to be made Online with students VTOP Login</p>
        </CardContent>
      </Card>

      {showInternational && (
        <Card>
          <CardHeader>
            <CardTitle>International Students Fee Structure (NRI)</CardTitle>
            <CardDescription>2024-25 Academic Year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border px-3 py-2 text-left">Particulars</th>
                    <th className="border px-3 py-2 text-center">2 Bed AC</th>
                    <th className="border px-3 py-2 text-center">3 Bed AC</th>
                    <th className="border px-3 py-2 text-center">4 Bed AC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-2 font-medium">Hostel Fees (in USD)</td>
                    <td className="border px-3 py-2 text-center">$2275</td>
                    <td className="border px-3 py-2 text-center">$1875</td>
                    <td className="border px-3 py-2 text-center">$1545</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border px-3 py-2 font-medium">Admission Fee (Non-Refundable)</td>
                    <td className="border px-3 py-2 text-center">$200</td>
                    <td className="border px-3 py-2 text-center">$200</td>
                    <td className="border px-3 py-2 text-center">$200</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2 font-medium">Caution Deposit (Refundable)</td>
                    <td className="border px-3 py-2 text-center">$400</td>
                    <td className="border px-3 py-2 text-center">$400</td>
                    <td className="border px-3 py-2 text-center">$400</td>
                  </tr>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="border px-3 py-2">Total amount in USD (Excluding Mess Charges)</td>
                    <td className="border px-3 py-2 text-center">$2875</td>
                    <td className="border px-3 py-2 text-center">$2475</td>
                    <td className="border px-3 py-2 text-center">$2145</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3">MESS CHARGES (NRI)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border px-3 py-2 text-left">Mess Type</th>
                    <th className="border px-3 py-2 text-center">Amount in (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-2 font-medium">Veg Mess</td>
                    <td className="border px-3 py-2 text-center">$1350</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border px-3 py-2 font-medium">Non Veg Mess</td>
                    <td className="border px-3 py-2 text-center">$1420</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2 font-medium">Special Mess</td>
                    <td className="border px-3 py-2 text-center">$1500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HostelFeeCard; 