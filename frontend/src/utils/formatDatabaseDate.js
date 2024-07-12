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
