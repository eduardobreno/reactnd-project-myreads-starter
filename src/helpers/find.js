export const findBookById = (id,books) => {
    return books.find(item => (item.id === id ? item : false));
}