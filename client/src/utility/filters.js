export const filteredArray = (array, keyword) => {

    return array.filter(el => {
        if (el.name) el.title = el.name;
        if (el.title) el.name = el.title;
        return el.title.toLowerCase().includes(keyword.toLowerCase())
    });
};