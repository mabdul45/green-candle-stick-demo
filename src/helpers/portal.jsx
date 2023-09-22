import { createPortal } from 'react-dom';

const Portal = ({ children, target = "body" }) => {
    return createPortal(
        children
        , document.querySelector(target))
}

export default Portal
