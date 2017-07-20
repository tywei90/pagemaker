import React, { PropTypes } from 'react';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';
import { Modal, Upload, message } from 'antd';

import './index.scss';

import unitAction from '../../../action/unit';

@pureRender
class UnitImage extends React.Component {
    static propTypes = {
        data: ImmutablePropTypes.map,
        id: PropTypes.number
    };
    constructor(props){
        super(props);
        this.state = {
            showDetail: false,
            uploadProps : {
                name: 'file',
                action: '/genpages/upload',
                accept: 'image/*',
                headers: {
                    authorization: 'authorization-text',
                },
                onChange(info) {
                    if (info.file.status !== 'uploading') {
                        console.log('正在上传...');
                    }
                    if (info.file.status === 'done') {
                        console.log('上传完成！');
                        if(info.file.response.file.ok){
                            unitAction.editUnit(props.id, 'address', info.file.response.file.url);
                            message.success(`${info.file.name} 上传成功！`);
                        }else{
                            message.error(`${info.file.response.file.des}，上传失败！`);
                        }
                    } else if (info.file.status === 'error') {
                        console.log('上传失败！');
                        message.error(`${info.file.name} 上传失败！`);
                    }
                }
            }
        }
    }
    showConfirm(id) {
        Modal.confirm({
            title: '删除面板?',
            onOk() {
                unitAction.removeUnit(id)
            },
            onCancel() {},
        });
    }
    render() {
        const { data, id } = this.props;
        const { showDetail, uploadProps } = this.state;
        return (
            <div className="unit-common unit-image" data-id={Math.random()}>
                <div className="header f-cb" onClick={(e) => !e.target.className.indexOf('header') && this.setState({'showDetail': !showDetail})}>
                    <i className="f-fl f-hide2 icon iconfont icon-iconfontbi" onClick={() => this.refs.name.focus()}></i>
                    <input 
                        className="f-fl"
                        type="text"
                        value={data.get('name')}
                        ref="name"
                        onChange={()=>unitAction.editUnit(id, 'name', this.refs.name.value)}
                    />
                    <i className={`f-fr icon iconfont icon-zhankaianniu ${showDetail? "arrow-up": "arrow-down"}`}></i>
                    <i className="f-fr f-hide2 icon iconfont icon-shanchu1" onClick={this.showConfirm.bind(this, id)}></i>
                    <i className="f-fr f-hide2 icon iconfont icon-fuzhi" onClick={()=>unitAction.addUnit(data.get('type'))}></i>
                    <i className="f-fr f-hide2 icon iconfont icon-yidong"></i>
                </div>
                <div className={`content ${showDetail? "show-detail": "hide-detail"}`}>
                    <ul>
                        <li className="f-cb">
                            <label className="f-fl">图片地址</label>
                            <input 
                                className="f-fr"
                                type="text"
                                placeholder="输入完整图片地址，或上传图片"
                                value={data.get('address')}
                                ref="address"
                                onChange={()=>unitAction.editUnit(id, 'address', this.refs.address.value)}
                            />
                            <div className="upload">
                                <Upload {...uploadProps}>
                                    <i className="icon iconfont icon-iosbolt"></i>
                                </Upload>
                            </div>
                        </li>
                        <li className="f-cb">
                            <label className="f-fl">链接</label>
                            <input 
                                className="f-fr"
                                type="text"
                                placeholder="图片点击跳转地址"
                                value={data.get('url')}
                                ref="url"
                                onChange={()=>unitAction.editUnit(id, 'url', this.refs.url.value)}
                            />
                        </li>
                        <li className="f-cb">
                            <label className="f-fl">填充色</label>
                            <input 
                                style={{background:data.get('bgColor')}}
                                className="f-fr"
                                type="text"
                                placeholder="填充色"
                                defaultValue={data.get('bgColor')}
                                ref="bgColor"
                                onChange={()=>unitAction.editUnit(id, 'bgColor', this.refs.bgColor.value)}
                            />
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
                </div>
            </div>
        );
    }
}

export default UnitImage;
