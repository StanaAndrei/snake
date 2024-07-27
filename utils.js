
export const syncSleep = (waitTime) => {
    let startDate = new Date(), currDate = null;
    do {
        currDate = new Date();
    } while (currDate - startDate < waitTime);
};
