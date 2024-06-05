export const getRandomZip = () => {
    const randomZip = Math.floor(10000 + Math.random() * 90000);
    return randomZip.toString();
};
