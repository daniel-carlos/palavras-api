export const getRandomElement = <T>(array: T[]): T => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

export const getRandomUniqueElements = <T>(array: T[], n: number): T[] => {
    if (n > array.length) {
        throw new Error('O valor de n é maior que o tamanho do array');
    }

    const shuffledArray = [...array].sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, n);
}