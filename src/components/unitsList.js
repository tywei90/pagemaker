import React, { PropTypes } from 'react';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';

import './unitsList.scss';

import unitAction from '../action/unit';

@pureRender
class UnitsList extends React.Component {
    static propTypes = {

    };
    handleClick(name){
        unitAction.addUnit(name)
    }
    render() {
        return (
            <section className="m-units-list f-fl">
                <ul>
                    <li onClick={this.handleClick.bind(this, 'TITLE')}>标题</li>
                    <li onClick={this.handleClick.bind(this, 'IMAGE')}>图片</li>
                    <li onClick={this.handleClick.bind(this, 'BUTTON')}>按钮</li>
                    <li onClick={this.handleClick.bind(this, 'TEXTBODY')}>正文</li>
                </ul>
            </section>
        );
    }
}

export default UnitsList;
