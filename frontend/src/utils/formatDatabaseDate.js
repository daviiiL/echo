//convert sequelize timestamps to user-friendly texts
export const formatDatabaseDate = (dateString) => {
  const articleUpdateDate = new Date(dateString);
  const today = new Date();
  const hrDiff = Math.round((today - articleUpdateDate) / 36e5);
  if (hrDiff < 1) return `Updated Just Now`;
  else if (hrDiff <= 24) return `Updated ${hrDiff} hours ago`;
  else if (hrDiff <= 48) return `Updated Yesterday`;
  else return `Updated ${Math.round(hrDiff / 24)} days ago`;
};

export const formatDataBaseActiveDate = (dateString) => {
  const last_active = new Date(dateString);
  const today = new Date();
  const hrDiff = Math.round((today - last_active) / 36e5);
  if (hrDiff < 1) return `active just now`;
  else if (hrDiff <= 24) return `last seen ${hrDiff} hours ago`;
  else if (hrDiff <= 48) return `last seen`;
  else return `last seen ${Math.round(hrDiff / 24)} days ago`;
};
