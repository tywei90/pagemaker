import React, { PropTypes } from 'react';
import './footer.scss';


let Footer = React.createClass({
    
    render() {
        return (
            <footer>
                <div className="copyright">&copy;光大易创网络科技股份有限公司版权所有 沪ICP备15046107号</div>
            </footer>
        );
    }
})

export default Footer;
