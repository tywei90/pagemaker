import React, { PropTypes } from 'react';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';
import { Modal } from 'antd';

import './index.scss';

import unitAction from '../../../action/unit';
import UnitPanel from '../panel/index';

@pureRender
class UnitTextBody extends React.Component {
    static propTypes = {
        data: ImmutablePropTypes.map,
        id: PropTypes.number
    };
    constructor(props){
        super(props);
    }
    render() {
        const { data, id } = this.props;
        return (
            <UnitPanel id={id} type={data.get('type').toLowerCase()} unitName={data.get('name')}>
                <ul>
                    {/* 正文内容 */}
                    <li className="f-cb title-part">
                        <label className="f-fl">正文内容</label>
                        <ul className="f-fr">
                          <li>
                          <textarea
                              className="f-fl"
                              type="text"
                              placeholder="正文内容"
                              value={data.get('text')}
                              ref="text"
                              onChange={()=>unitAction.editUnit(id, 'text', this.refs.text.value)}
                          ></textarea>
                          <a className="example-btn f-fl">示例</a>
                          </li>
                        </ul>
                    </li>
                    {/*正文颜色 这里是一个取色器的component */}
                    <li className="f-cb">
                        <label className="f-fl">正文颜色</label>
                        <a
                            className="text-color"
                            type="text"
                            placeholder={data.get('textColor')}
                            value={data.get('textColor')}
                            ref="textColor"
                            onChange={()=>unitAction.editUnit(id, 'textcolor', this.refs.text.value)}
                            // style={textColorStyle}
                            style={{background:data.get('textcolor')}}
                        >{data.get('textColor')}</a>
                    </li>
                    {/* 布局 */}
                    <li className="f-cb">
                        <label className="f-fl">布局</label>
                        <ul className="f-fr">
                            <li className="f-fl">
                                <input 
                                    type="radio" 
                                    name={`textAlign${id}`}
                                    ref="left"
                                    value="left"
                                    id={`left${id}`}
                                    defaultChecked={data.get('textAlign') === "left"}
                                    onClick={()=>unitAction.editUnit(id, 'textAlign', this.refs.left.value)}
                                />
                                <label htmlFor={`left${id}`}>居左</label>
                            </li>
                            <li className="f-fl">
                                <input 
                                    type="radio" 
                                    name={`textAlign${id}`}
                                    ref="center"
                                    value="center"
                                    id={`center${id}`}
                                    defaultChecked={data.get('textAlign') === "center"}
                                    onClick={()=>unitAction.editUnit(id, 'textAlign', this.refs.center.value)}
                                />
                                <label htmlFor={`center${id}`}>居中</label>
                            </li>
                            <li className="f-fl">
                                <input 
                                    type="radio" 
                                    name={`textAlign${id}`}
                                    ref="right"
                                    value="right"
                                    id={`right${id}`}
                                    defaultChecked={data.get('textAlign') === "right"}
                                    onClick={()=>unitAction.editUnit(id, 'textAlign', this.refs.right.value)}
                                />
                                <label htmlFor={`right${id}`}>居右</label>
                            </li>
                        </ul>
                    </li>
                    {/* 字体大小 */}
                    <li className="f-cb">
                        <label className="f-fl">字体大小</label>
                        <ul className="f-fr">
                            <li className="f-fl">
                                <input
                                    type="radio"
                                    name={`fontSize${id}`}
                                    ref="small"
                                    value="small"
                                    id={`small${id}`}
                                    defaultChecked={data.get('fontSize') === "small"}
                                    onClick={()=>unitAction.editUnit(id, 'fontSize', this.refs.small.value)}
                                />
                                <label htmlFor={`small${id}`}>小</label>
                            </li>
                            <li className="f-fl">
                                <input
                                    type="radio"
                                    name={`fontSize${id}`}
                                    ref="middle"
                                    value="middle"
                                    id={`middle${id}`}
                                    defaultChecked={data.get('fontSize') === "middle"}
                                    onClick={()=>unitAction.editUnit(id, 'fontSize', this.refs.middle.value)}
                                />
                                <label htmlFor={`middle${id}`}>中</label>
                            </li>
                            <li className="f-fl">
                                <input
                                    type="radio"
                                    name={`fontSize${id}`}
                                    ref="big"
                                    value="big"
                                    id={`big${id}`}
                                    defaultChecked={data.get('fontSize') === "big"}
                                    onClick={()=>unitAction.editUnit(id, 'fontSize', this.refs.big.value)}
                                />
                                <label htmlFor={`big${id}`}>大</label>
                            </li>
                            <li className="f-fl">
                                <input
                                    type="radio"
                                    name={`fontSize${id}`}
                                    ref="superbig"
                                    value="superbig"
                                    id={`superbig${id}`}
                                    defaultChecked={data.get('fontSize') === "superbig"}
                                    onClick={()=>unitAction.editUnit(id, 'fontSize', this.refs.superbig.value)}
                                />
                              <label htmlFor={`superbig${id}`}>超大</label>
                            </li>
                        </ul>
                    </li>
                    {/* 其他设置 */}
                    <li className="f-cb">
                        <label className="f-fl">其他设置</label>
                        <ul className="f-fr">
                          {/* 这里需要看一下 */}
                            <li className="f-fl">
                                <input
                                    type="checkbox"
                                    name={`moreSettings${id}`}
                                    ref="changeLine"
                                    value="changeLine"
                                    id={`changeLine${id}`}
                                    defaultChecked={data.get('changeLine')}
                                    onClick={()=>unitAction.editUnit(id, 'changeLine', this.refs.changeLine.value)}
                                />
                              <label htmlFor={`changeline${id}`}>回车换行</label>
                            </li>
                            <li className="f-fl">
                                <input
                                    type="checkbox"
                                    name={`moreSettings${id}`}
                                    ref="retract"
                                    value="retract"
                                    id={`retract${id}`}
                                    defaultChecked={data.get('retract')}
                                    onClick={()=>unitAction.editUnit(id, 'retract', this.refs.retract.value)}
                                />
                              <label htmlFor={`retract${id}`}>换行缩进</label>
                            </li>
                            <li className="f-fl">
                                <input
                                    type="checkbox"
                                    name={`moreSettings${id}`}
                                    ref="bigLH"
                                    value="bigLH"
                                    id={`bigLH${id}`}
                                    defaultChecked={data.get('bigLH')}
                                    onClick={()=>unitAction.editUnit(id, 'bigLH', this.refs.bigLH.value)}
                                />
                              <label htmlFor={`retract${id}`}>大行距</label>
                            </li>
                            <li className="f-fl">
                                <input
                                    type="checkbox"
                                    name={`moreSettings${id}`}
                                    ref="bigPD"
                                    value="bigPD"
                                    id={`bigPD${id}`}
                                    defaultChecked={data.get('bigPD')}
                                    onClick={()=>unitAction.editUnit(id, 'bigPD', this.refs.bigPD.value)}
                                />
                              <label htmlFor={`bigPD${id}`}>大段距</label>
                            </li>
                            <li className="f-fl">
                                <input
                                    type="checkbox"
                                    name={`moreSettings${id}`}
                                    ref="noUL"
                                    value="noUL"
                                    id={`noUL${id}`}
                                    defaultChecked={data.get('noUL')}
                                    onClick={()=>unitAction.editUnit(id, 'noUL', this.refs.noUL.value)}
                                />
                              <label htmlFor={`noUL${id}`}>链接无下划线</label>
                            </li>
                            <li className="f-fl">
                                <input
                                    type="checkbox"
                                    name={`moreSettings${id}`}
                                    ref="borderRadius"
                                    value="borderRadius"
                                    id={`borderRadius${id}`}
                                    defaultChecked={data.get('borderRadius')}
                                    onClick={()=>unitAction.editUnit(id, 'borderRadius', this.refs.borderRadius.value)}
                                />
                              <label htmlFor={`borderRadius${id}`}>圆角边框</label>
                            </li>
                        </ul>
                    </li>
                    {/*正文背景颜色 这里是一个取色器的component */}
                    <li className="f-cb">
                        <label className="f-fl">正文背景</label>
                        <a
                            className="text-color"
                            type="text"
                            placeholder={this.state.bgColor}
                            value={data.get('bgColor')}
                            ref="bgColor"
                            onChange={()=>unitAction.editUnit(id, 'bgcolor', this.refs.text.value)}
                            // style={textColorStyle}
                            style={{background:data.get('bgColor')}}
                        >{data.get('bgColor')}</a>
                      {/* <input
                            className="textBgImg"
                            type='text'
                        /> */}
                    </li>
                    <li className="f-cb">
                        <label className="f-fl">组件内边距</label>
                        <ul className="f-fr">
                            <li className="f-fl label-left">
                                <label>上</label>
                                <input
                                    type="text"
                                    ref="paddingTop"
                                    defaultValue={data.getIn(['padding', 0])}
                                    onChange={()=>unitAction.editUnit(id, 'padding', immutable.fromJS([
                                        parseFloat(this.refs.paddingTop.value) || 0,
                                        parseFloat(this.refs.paddingRight.value) || 0,
                                        parseFloat(this.refs.paddingBottom.value) || 0,
                                        parseFloat(this.refs.paddingLeft.value) || 0
                                    ]))}
                                />
                            </li>
                            <li className="f-fl label-left">
                                <label>右</label>
                                <input
                                    type="text"
                                    ref="paddingRight"
                                    defaultValue={data.getIn(['padding', 1])}
                                    onChange={()=>unitAction.editUnit(id, 'padding', immutable.fromJS([
                                        parseFloat(this.refs.paddingTop.value) || 0,
                                        parseFloat(this.refs.paddingRight.value) || 0,
                                        parseFloat(this.refs.paddingBottom.value) || 0,
                                        parseFloat(this.refs.paddingLeft.value) || 0
                                    ]))}
                                />
                            </li>
                            <li className="f-fl label-left">
                                <label>下</label>
                                <input
                                    type="text"
                                    ref="paddingBottom"
                                    defaultValue={data.getIn(['padding', 2])}
                                    onChange={()=>unitAction.editUnit(id, 'padding', immutable.fromJS([
                                        parseFloat(this.refs.paddingTop.value) || 0,
                                        parseFloat(this.refs.paddingRight.value) || 0,
                                        parseFloat(this.refs.paddingBottom.value) || 0,
                                        parseFloat(this.refs.paddingLeft.value) || 0
                                    ]))}
                                />
                            </li>
                            <li className="f-fl label-left">
                                <label>左</label>
                                <input
                                    type="text"
                                    ref="paddingLeft"
                                    defaultValue={data.getIn(['padding', 3])}
                                    onChange={()=>unitAction.editUnit(id, 'padding', immutable.fromJS([
                                        parseFloat(this.refs.paddingTop.value) || 0,
                                        parseFloat(this.refs.paddingRight.value) || 0,
                                        parseFloat(this.refs.paddingBottom.value) || 0,
                                        parseFloat(this.refs.paddingLeft.value) || 0
                                    ]))}
                                />
                            </li>
                        </ul>
                    </li>
                    <li className="f-cb">
                        <label className="f-fl">组件外边距</label>
                        <ul className="f-fr">
                            <li className="f-fl label-left">
                                <label>上</label>
                                <input
                                    type="text"
                                    ref="marginTop"
                                    defaultValue={data.getIn(['margin', 0])}
                                    onChange={()=>unitAction.editUnit(id, 'margin', immutable.fromJS([
                                        parseFloat(this.refs.marginTop.value) || 0,
                                        parseFloat(this.refs.marginRight.value) || 0,
                                        parseFloat(this.refs.marginBottom.value) || 0,
                                        parseFloat(this.refs.marginLeft.value) || 0
                                    ]))}
                                />
                            </li>
                            <li className="f-fl label-left">
                                <label>右</label>
                                <input
                                    type="text"
                                    ref="marginRight"
                                    defaultValue={data.getIn(['margin', 1])}
                                    onChange={()=>unitAction.editUnit(id, 'margin', immutable.fromJS([
                                        parseFloat(this.refs.marginTop.value) || 0,
                                        parseFloat(this.refs.marginRight.value) || 0,
                                        parseFloat(this.refs.marginBottom.value) || 0,
                                        parseFloat(this.refs.marginLeft.value) || 0
                                    ]))}
                                />
                            </li>
                            <li className="f-fl label-left">
                                <label>下</label>
                                <input
                                    type="text"
                                    ref="marginBottom"
                                    defaultValue={data.getIn(['margin', 2])}
                                    onChange={()=>unitAction.editUnit(id, 'margin', immutable.fromJS([
                                        parseFloat(this.refs.marginTop.value) || 0,
                                        parseFloat(this.refs.marginRight.value) || 0,
                                        parseFloat(this.refs.marginBottom.value) || 0,
                                        parseFloat(this.refs.marginLeft.value) || 0
                                    ]))}
                                />
                            </li>
                            <li className="f-fl label-left">
                                <label>左</label>
                                <input
                                    type="text"
                                    ref="marginLeft"
                                    defaultValue={data.getIn(['margin', 3])}
                                    onChange={()=>unitAction.editUnit(id, 'margin', immutable.fromJS([
                                        parseFloat(this.refs.marginTop.value) || 0,
                                        parseFloat(this.refs.marginRight.value) || 0,
                                        parseFloat(this.refs.marginBottom.value) || 0,
                                        parseFloat(this.refs.marginLeft.value) || 0
                                    ]))}
                                />
                            </li>
                        </ul>
                    </li>
                </ul>
            </UnitPanel>
        );
    }
}

export default UnitTextBody;
