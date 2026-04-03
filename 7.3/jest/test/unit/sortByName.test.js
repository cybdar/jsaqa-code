const sorting = require("../../app");

describe("Тестирование функции sortByName", () => {
    
    test("сортировка массива книг по алфавиту", () => {
        const books = ["Война и мир", "Анна Каренина", "Преступление и наказание"];
        const expected = ["Анна Каренина", "Война и мир", "Преступление и наказание"];
        expect(sorting.sortByName(books)).toEqual(expected);
    });
    
    test("пустой массив должен остаться пустым", () => {
        const input = [];
        const expected = [];
        expect(sorting.sortByName(input)).toEqual(expected);
    });
    
    test("массив с одним элементом не меняется", () => {
        const input = ["Евгений Онегин"];
        const expected = ["Евгений Онегин"];
        expect(sorting.sortByName(input)).toEqual(expected);
    });
    
    test("сортировка не зависит от регистра букв", () => {
        const input = ["Zoo", "apple", "Banana"];
        const expected = ["apple", "Banana", "Zoo"];
        expect(sorting.sortByName(input)).toEqual(expected);
    });
    
    test("уже отсортированный массив остается без изменений", () => {
        const input = ["Анна Каренина", "Война и мир", "Преступление и наказание"];
        const expected = ["Анна Каренина", "Война и мир", "Преступление и наказание"];
        expect(sorting.sortByName(input)).toEqual(expected);
    });
    
    // НОВЫЙ ТЕСТ для покрытия строки return 0
    test("массив с одинаковыми строками не меняется", () => {
        const input = ["Книга", "Книга", "Книга"];
        const expected = ["Книга", "Книга", "Книга"];
        expect(sorting.sortByName(input)).toEqual(expected);
    });
});