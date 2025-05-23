import { CalendarDays, Briefcase, FileText } from "lucide-react";

interface ResultsHeaderProps {
  jobTitle: string;
  company: string;
  resumeName?: string;
  generatedDate?: string;
}

function formatDateStringToMonthDayYear(dateString: any): string {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Error formatting date";
  }
}

export function ResultsHeader({
  jobTitle,
  company,
  resumeName,
  generatedDate,
}: ResultsHeaderProps) {
  const formattedDate = formatDateStringToMonthDayYear(generatedDate);
  return (
    <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{jobTitle}</h1>
            <div className="flex items-center mt-2">
              <Briefcase className="h-4 w-4 mr-2" />
              <span>{company}</span>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center text-teal-100">
              <FileText className="h-4 w-4 mr-2" />
              <span className="text-sm">{resumeName}</span>
            </div>
            <div className="flex items-center text-teal-100">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span className="text-sm">Generated on {formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
