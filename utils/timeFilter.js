const timeFilter = (timeArray, ...fromToArg) => {
  let filtered = [...timeArray];
  const filter = (date, TYPE) => {
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
      const dataInSec = dateObj.getTime();
      const datesFiltered = filtered.filter((item) => {
        const itemTime = new Date(item.date);
        switch (TYPE) {
          case 0:
            if (itemTime.getTime() >= dataInSec) {
              return item;
            }
            break;
          case 1:
            if (itemTime.getTime() <= dataInSec) {
              return item;
            }
            break;
          default:
            break;
        }
      });
      filtered = [...datesFiltered];
      return true;
    } else {
      return false;
    }
  };
  const result = fromToArg.every((arg, i) => {
    if (arg) {
      return filter(arg, i);
    }
    return true;
  });
  if (result) {
    return filtered;
  } else {
    return 'not walid date format';
  }

  // if (!!from) {
  //   if (!filter(from)) {
  //     return 'not walid date format';
  //   }

  //   // const fromDate = new Date(from);
  //   // if (!isNaN(fromDate.getTime())) {
  //   //   const fromInSec = fromDate.getTime();
  //   //   const fromFiltered = filtered.filter((item) => {
  //   //     const itemTime = new Date(item);
  //   //     if (itemTime.getTime() >= fromInSec) {
  //   //       return item;
  //   //     }
  //   //   });
  //   //   filtered = [...fromFiltered];
  //   // } else {
  //   //   return 'from not walid';
  //   // }
  // }
  // if (!!to) {
  //   const toDate = new Date(to);
  //   if (!isNaN(toDate.getTime())) {
  //     const toInSec = toDate.getTime();
  //     const toFiltered = filtered.filter((item) => {
  //       const itemTime = new Date(item);
  //       if (itemTime.getTime() <= toInSec) {
  //         return item;
  //       }
  //     });
  //     filtered = [...toFiltered];
  //   } else {
  //     return 'to not walid';
  //   }
  // }

  // return filtered;
};

module.exports = timeFilter;
