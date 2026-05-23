const DEFAULT_OFFICER = {
  initials: "IR",
  name: "Rithana",
  position: "Inspector",
  email: "rithana@reportit.com",
};

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
  const officers = readJson("officers") || [];
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

const readJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};
