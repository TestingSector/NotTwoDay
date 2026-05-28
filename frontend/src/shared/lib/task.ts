import { users }
  from "../mocks/users";

export const getTaskCreator = (
  creatorId: string,
) => {
  return users.find(
    (user) =>
      user.id === creatorId,
  );
};

export const getTaskExecutor = (
  executorId?: string,
) => {
  if (!executorId) {
    return undefined;
  }

  return users.find(
    (user) =>
      user.id === executorId,
  );
};