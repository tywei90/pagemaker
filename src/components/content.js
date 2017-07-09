import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';

import './content.scss';

import unit from '../action/unit';

import UnitMeta from './units/meta/index'
import UnitOgp from './units/ogp/index'
import UnitTitle from './units/title/index'
import UnitImage from './units/image/index'
import UnitButton from './units/button/index'
import UnitTextBody from './units/textbody/index'
import Preview from './preview.js'

const renderUnits = units => {
    return units.map((item, index) => {
        switch (item.get('type')) {
            case 'META' :
                return <li key={index}><UnitMeta id={index} data={item} /></li>
            case 'OGP' :
                return <li key={index}><UnitOgp id={index} data={item} /></li>
            case 'TITLE' :
                return <li key={index}><UnitTitle id={index} data={item} /></li>
            case 'IMAGE' :
                return <li key={index}><UnitImage id={index} data={item} /></li>
            case 'BUTTON' :
                return <li key={index}><UnitButton id={index} data={item} /></li>
            case 'TEXTBODY' :
                return <li key={index}><UnitTextBody id={index} data={item} /></li>
        }
    });
};

@pureRender
class Content extends React.Component {
    static propTypes = {
        unit: ImmutablePropTypes.list,
    };

    render() {
        const { unit } = this.props;
        return (
            <section className="m-content f-fl">
                <div>
                    内容配置区(
                    <span className="J_insert">导入</span>|
                    <span className="J_output">导出</span>|
                    <span className="J_clear">清空</span>)
                </div>
                <ul>
                    {renderUnits(unit)}
                </ul>
            </section>
        );
    }
}

export default connect(
    state => ({
        unit: state.get('unit'),
    })
)(Content);
