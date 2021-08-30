import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class Pagination extends Component {
  countingPages() {
    const { itemsCount, pageSize } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pagesCount + 1);
    return pages;
  }

  render() {
    const { currentPage, onPageChange } = this.props;
    const pages = this.countingPages();
    if (pages <= 1) return null;
    else return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={`${
                page === currentPage ? "page-item active" : "page-item"
              } `}
            >
              <a
                onClick={() => onPageChange(page)}
                className="page-link"
                href="#"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
