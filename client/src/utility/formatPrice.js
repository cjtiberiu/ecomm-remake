export const formatPrice = number => {
    let numSplit, int, dec;

    number = Math.abs(number);
    number = number.toFixed(2);

    numSplit = number.split('.');

    int = numSplit[0];

    if (int.length > 3) {

        int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }

    dec = numSplit[1];

    return int;
};