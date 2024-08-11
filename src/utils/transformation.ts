// This files contain all pre-calculation transformation we need for app
export const normalizePhoneNumber = (contact: string): string => {
  // Remove any non-digit characters
  const cleaned = contact.replace(/\D/g, '');

  // Check if it starts with '98' or '0' and normalize
  if (cleaned.startsWith('98')) {
    return `+${cleaned}`; // Return with +98 format
  } else if (cleaned.startsWith('0')) {
    return `+98${cleaned.slice(1)}`; // Convert 0 to +98
  } else if (cleaned.startsWith('9')) {
    return `+98${cleaned}`; // Add +98 if it starts with 9
  }

  return cleaned;
};