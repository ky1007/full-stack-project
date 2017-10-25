export const isEmpty = obj => {
  for(let key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

export const toDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return new Date(year, month - 1, day);
};

export const parseElapsedTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.5);
  const years = Math.floor(365.25);

  if (minutes < 60) {
    return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
  } else if (hours < 24) {
    return hours === 1 ? `${hours} hour` : `${hours} hours`;
  } else if (days < 7) {
    return days === 1 ? `${days} day` : `${days} days`;
  } else if (weeks < 5) {
    return weeks === 1 ? `${weeks} week` : `${weeks} weeks`;
  } else if (months < 12) {
    return months === 1 ? `${months} month` : `${months} months`;
  }
  return years === 1 ? `${years} year` : `${years} years`;
};
