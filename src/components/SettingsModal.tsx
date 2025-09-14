
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrefs: {branch: string, semester: string} | null;
  onSave: (branch: string, semester: string) => void;
}

const SettingsModal = ({ isOpen, onClose, currentPrefs, onSave }: SettingsModalProps) => {
  const [selectedBranch, setSelectedBranch] = useState(currentPrefs?.branch || "");
  const [selectedSemester, setSelectedSemester] = useState(currentPrefs?.semester || "");

  const branches = [
    { value: "CSE", label: "Computer Science Engineering (CSE)" },
    { value: "ADS", label: "Artificial Intelligence and Data Science Engineering (ADS)" },
    { value: "EC", label: "Electronics Engineering (EC)" },
    { value: "ME", label: "Mechanical Engineering (ME)" },
    { value: "CE", label: "Civil Engineering (CE)" },
    { value: "EE", label: "Electrical Engineering (EE)" }
    
  ];

  const semesters = [
    // { value: "S1", label: "Semester 1 (S1)" },
    // { value: "S2", label: "Semester 2 (S2)" },
    { value: "S3", label: "Semester 3 (S3)" }
    // ,
    // { value: "S4", label: "Semester 4 (S4)" },
    // { value: "S5", label: "Semester 5 (S5)" },
    // { value: "S6", label: "Semester 6 (S6)" },
    // { value: "S7", label: "Semester 7 (S7)" },
    // { value: "S8", label: "Semester 8 (S8)" }
  ];

  const handleSave = () => {
    if (selectedBranch && selectedSemester) {
      onSave(selectedBranch, selectedSemester);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold">Update Preferences</DialogTitle>
          <p className="text-gray-600 mt-2">
            Change your branch and semester to customize your experience.
          </p>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch
            </label>
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.value} value={branch.value}>
                    {branch.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester
            </label>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((semester) => (
                  <SelectItem key={semester.value} value={semester.value}>
                    {semester.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!selectedBranch || !selectedSemester}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
