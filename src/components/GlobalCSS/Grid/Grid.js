import PropTypes from 'prop-types';

import './Grid.scss';

function Grid({ children }) {
    return children;
}

Grid.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Grid;
