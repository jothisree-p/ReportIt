const DEFAULT_OFFICER = {
  initials: "IR",
  name: "Rithana",
  position: "Inspector",
  email: "rithana@reportit.com",
};

const DEFAULT_OFFICERS = [
  {
    id:1,
    initials:"RP",
    name:"Ravi Prakash",
    email:"ravi.prakash@reportit.com",
    password:"ravi123",
    badge:"RP-4521",
    position:"Inspector",
    zone:"Zone A",
    active:"12 / 45",
    status:"Active",
  },
  {
    id:2,
    initials:"AV",
    name:"Ananya Verma",
    email:"ananya.verma@reportit.com",
    password:"ananya123",
    badge:"AV-3218",
    position:"Sub Inspector",
    zone:"Zone B",
    active:"8 / 32",
    status:"Active",
  },
  {
    id:3,
    initials:"KD",
    name:"Karan Desai",
    email:"karan.desai@reportit.com",
    password:"karan123",
    badge:"KD-1567",
    position:"Head Constable",
    zone:"Zone C",
    active:"5 / 28",
    status:"Active",
  },
  {
    id:4,
    initials:"NK",
    name:"Nisha Khan",
    email:"nisha.khan@reportit.com",
    password:"nisha123",
    badge:"NK-7843",
    position:"Assistant Commissioner",
    zone:"Zone D",
    active:"0 / 15",
    status:"Inactive",
  },
];

const KNOWN_POSITIONS = [
  "Deputy Superintendent",
  "Assistant Commissioner",
  "Sub Inspector",
  "Head Constable",
  "Inspector",
  "Officer",
  "Constable",
];

export const getOfficerInitials = (officer = getCurrentOfficer()) => {
  if (officer?.initials) return officer.initials;

  const name = getOfficerDisplayName(officer);

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "OF";
};

export const getOfficerDisplayName = (officer = {}) => {
  const rawName = (officer.name || DEFAULT_OFFICER.name).trim();
  const position = getOfficerPosition(officer);

  if (rawName.toLowerCase().startsWith(position.toLowerCase())) {
    return rawName.slice(position.length).trim() || rawName;
  }

  return rawName;
};

export const getOfficerPosition = (officer = {}) => {
  const explicitPosition = (officer.position || officer.rank || "").trim();
  if (explicitPosition) return explicitPosition;

  const rawName = (officer.name || "").trim();
  const matchedPosition = KNOWN_POSITIONS.find((position) =>
    rawName.toLowerCase().startsWith(position.toLowerCase())
  );

  return matchedPosition || DEFAULT_OFFICER.position;
};

export const getOfficerWelcomeText = (officer = getCurrentOfficer()) =>
  `Welcome back, ${getOfficerPosition(officer)} ${getOfficerDisplayName(officer)} !`;

export const getCurrentOfficer = () => {
  const storedOfficer = readJson("currentOfficer");
  if (storedOfficer) return storedOfficer;

  const profileOfficer = readJson("officerProfile");
  if (profileOfficer) return profileOfficer;

  return DEFAULT_OFFICER;
};

export const setCurrentOfficerByEmail = (email) => {
  const officers = getStoredOfficers();
  const normalizedEmail = email.trim().toLowerCase();

  const matchedOfficer = officers.find(
    (officer) => officer.email?.trim().toLowerCase() === normalizedEmail
  );

  if (!matchedOfficer) return null;

  localStorage.setItem("currentOfficer", JSON.stringify(matchedOfficer));
  localStorage.setItem("officerProfile", JSON.stringify({
    ...matchedOfficer,
    name: getOfficerDisplayName(matchedOfficer),
    rank: getOfficerPosition(matchedOfficer),
  }));

  return matchedOfficer;
};

const getStoredOfficers = () => {
  const storedOfficers = readJson("officers") || [];

  const needsSeed =
    storedOfficers.length === 0 ||
    storedOfficers.some((officer) => !officer.email?.endsWith("@reportit.com"));

  if (needsSeed) {
    localStorage.setItem("officers", JSON.stringify(DEFAULT_OFFICERS));
    return DEFAULT_OFFICERS;
  }

  return storedOfficers;
};

const readJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};
