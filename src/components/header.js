import React, { PropTypes } from 'react';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';


import './header.scss';

@pureRender
class Header extends React.Component {
    static propTypes = {
        name: PropTypes.string
    };
    static defaultProps = {
        name: "游客"
    };
    render() {
        return (
            <header className="f-cb">
                <div className="icon iconfont icon-fire f-fl"></div>
                <div className="links f-fl">
                    <a className="active" href="/genpages">pagemaker</a>
                    <a href="/genpages">直邮工具</a>
                    <a href="/genpages">动效页</a>
                </div>
                <div className="user f-fr">
                    <span>您好，{this.props.name}</span>
                </div>
            </header>
        );
    }
}

export default Header;
