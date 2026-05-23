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

const fallbackTitles = [
  "Bike Theft at Market Area",
  "Road Accident Near Highway Junction",
  "Vandalism at Community Center",
  "Cyber Fraud Complaint",
  "Street Fight Near Mall",
  "Broken Street Light on Park Road",
];

export const getComplaints = () => {
  const storedComplaints = readJson("complaints");

  if (!storedComplaints || storedComplaints.length === 0) {
    localStorage.setItem("complaints", JSON.stringify(defaultComplaints));
    return defaultComplaints;
  }

  const normalizedComplaints = storedComplaints.map(normalizeComplaint);
  localStorage.setItem("complaints", JSON.stringify(normalizedComplaints));
  localStorage.setItem("officerCases", JSON.stringify(normalizedComplaints));

  return normalizedComplaints;
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

export const getComplaintsForOfficer = (officer) => {
  const officerName = officer?.name || "";
  const officerEmail = officer?.email || "";

  return getComplaints().filter((complaint) =>
    complaint.assignedOfficer === officerName ||
    complaint.assignedOfficerEmail === officerEmail
  );
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

const normalizeComplaint = (complaint, index) => ({
  ...complaint,
  id: complaint.id || `CMP-${new Date().getFullYear()}-${String(index + 1).padStart(3, "0")}`,
  title:
    !complaint.title || complaint.title === "Untitled Complaint"
      ? fallbackTitles[index % fallbackTitles.length]
      : complaint.title,
  category: complaint.category || "General",
  citizen: complaint.citizen || "Citizen",
  priority: complaint.priority || "Medium",
  status: complaint.status || "Pending",
  date: complaint.date || new Date().toISOString().slice(0, 10),
  assignedOfficer: complaint.assignedOfficer || "",
  assignedOfficerEmail: complaint.assignedOfficerEmail || "",
});

const readJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};
