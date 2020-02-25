import _ from 'lodash'

export const sortArray = (array, sortType) => {
    let result = _.orderBy(array, [sortType && sortType ],['desc']);
    return result;
}