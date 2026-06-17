export const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");

  let normalized = digits;

  if (normalized.startsWith("8")) {
    normalized = `7${normalized.slice(1)}`;
  }

  if (!normalized.startsWith("7")) {
    normalized = `7${normalized}`;
  }

  const phone = normalized.slice(0, 11);

  const p1 = phone.slice(1, 4);
  const p2 = phone.slice(4, 7);
  const p3 = phone.slice(7, 9);
  const p4 = phone.slice(9, 11);

  let result = "+7";

  if (p1) result += ` (${p1}`;
  if (p1.length === 3) result += ")";
  if (p2) result += ` ${p2}`;
  if (p3) result += `-${p3}`;
  if (p4) result += `-${p4}`;

  return result;
};

export const getPhoneDigits = (value: string) => value.replace(/\D/g, "");
