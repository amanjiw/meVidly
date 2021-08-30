
class Paginate {

    showResultOfCurrentPage(movies, currentPage, allCount) {

        const start = (currentPage - 1) * allCount;
        const end = start + allCount;
        const result = movies.slice(start, end);
        return result;
    }
}

export default new Paginate();