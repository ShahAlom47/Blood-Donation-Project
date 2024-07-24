import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const AnimatedLayout = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedLayout;
AnimatedLayout.propTypes = {
    children: PropTypes.node
  };