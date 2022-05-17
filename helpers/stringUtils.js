export const generateString = async () => {
    return await (Math.random() + 1).toString(36).substring(2);
}

export const generateBigString = async (border) => {
    let bigString = await generateString();
    while(bigString.length <= border){
        bigString += await generateString();
    }
    return bigString;
}