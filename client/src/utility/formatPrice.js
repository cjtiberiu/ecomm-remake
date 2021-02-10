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

export const limitTitle = (title, limit = 15) => {
	const newTitle = [];
	if (title.length > limit) {
		title.split(' ').reduce((acc, current) => {
			if (acc + current.length <= limit) {
				newTitle.push(current);
			}
			return acc + current.length;
		}, 0);

		return `${newTitle.join(' ')} ...`
	}
	return title;
	
}

