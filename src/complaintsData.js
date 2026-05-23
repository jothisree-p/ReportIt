export const defaultComplaints = [
  {
    id: "CMP-2024-001",
    title: "Bike Theft at Market Area",
    category: "Theft",
    citizen: "Rahul Sharma",
    priority: "High",
    status: "In Progress",
    date: "2024-03-15",
  },
  {
    id: "CMP-2024-004",
    title: "Road Accident Near Highway Junction",
    category: "Road Accident",
    citizen: "Sneha Reddy",
    priority: "Critical",
    status: "Resolved",
    date: "2024-03-19",
  },
  {
    id: "CMP-2024-007",
    title: "Vandalism at Community Center",
    category: "Property Damage",
    citizen: "Priya Singh",
    priority: "Medium",
    status: "Pending",
    date: "2024-03-21",
  },
];

export const getComplaints = () => {
  const storedComplaints = readJson("complaints");

  if (!storedComplaints || storedComplaints.length === 0) {
    localStorage.setItem("complaints", JSON.stringify(defaultComplaints));
    return defaultComplaints;
  }

  return storedComplaints;
};

export const saveComplaint = (complaint) => {
  const complaints = getComplaints();
  const newComplaint = {
    id: `CMP-${new Date().getFullYear()}-${String(complaints.length + 1).padStart(3, "0")}`,
    status: "Pending",
    priority: "Medium",
    date: new Date().toISOString().slice(0, 10),
    citizen: "Jothisree",
    ...complaint,
  };

  const updatedComplaints = [newComplaint, ...complaints];
  localStorage.setItem("complaints", JSON.stringify(updatedComplaints));
  localStorage.setItem("officerCases", JSON.stringify(updatedComplaints));

  return newComplaint;
};

export const updateComplaint = (id, updates) => {
  const updatedComplaints = getComplaints().map((complaint) =>
    complaint.id === id
      ? { ...complaint, ...updates }
      : complaint
  );

  localStorage.setItem("complaints", JSON.stringify(updatedComplaints));
  localStorage.setItem("officerCases", JSON.stringify(updatedComplaints));

  return updatedComplaints;
};

export const getComplaintStats = (complaints = getComplaints()) => {
  const total = complaints.length;
  const pending = countByStatus(complaints, "Pending");
  const inProgress = countByStatus(complaints, "In Progress");
  const resolved = countByStatus(complaints, "Resolved");
  const rejected = countByStatus(complaints, "Rejected");
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  return {
    total,
    pending,
    inProgress,
    resolved,
    rejected,
    resolutionRate,
  };
};

const countByStatus = (complaints, status) =>
  complaints.filter((complaint) => complaint.status === status).length;

const readJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};
