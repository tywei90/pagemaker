import './index.scss'

import React, {PropTypes} from 'react';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';
import {Upload, message} from 'antd';

import unitAction from '../../../action/unit'
import UnitPanel from '../../ui/unitPanel'

@pureRender
class UnitAudio extends React.Component {
    static propTypes = {
        data: ImmutablePropTypes.map,
        id: PropTypes.number
    };
    constructor(props) {
        super(props);
        this.state = {
            uploadProps: {
                name: 'file',
                action: '/api/genpages/upload',
                accept: 'medič/*',
                headers: {
                    authorization: 'authorization-text'
                },
                onChange(info) {
                    if (info.file.status !== 'uploading') {
                        console.log('正在上传...');
                    }
                    if (info.file.status === 'done') {
                        console.log('上传完成！');
                        if (info.file.response.file.ok) {
                            unitAction.editUnit(props.id, 'address', info.file.response.file.url);
                            message.success(`${info.file.name} 上传成功！`);
                        } else {
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
    render() {
        const {data, id} = this.props;
        const {uploadProps} = this.state;
        return (
            <UnitPanel unitId={id} unitName={data.get('name')}>
                <ul>
                    <li className="f-cb">
                        <label className="f-fl">音频地址</label>
                        <input
                            className="f-fr"
                            type="text"
                            placeholder="音频文件或地址，支持wav/mp3格式"
                            value={data.get('address')}
                            ref="address"
                            onChange={() => unitAction.editUnit(id, 'text', this.refs.address.value)}/>
                        <div className="upload">
                            <Upload {...uploadProps}>
                                <i className="icon iconfont icon-iosbolt"></i>
                            </Upload>
                        </div>
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
                                    onChange={() => unitAction.editUnit(id, 'margin', immutable.fromJS([
                                    parseFloat(this.refs.marginTop.value) || 0,
                                    parseFloat(this.refs.marginRight.value) || 0,
                                    parseFloat(this.refs.marginBottom.value) || 0,
                                    parseFloat(this.refs.marginLeft.value) || 0
                                ]))}/>
                            </li>
                            <li className="f-fl label-left">
                                <label>右</label>
                                <input
                                    type="text"
                                    ref="marginRight"
                                    defaultValue={data.getIn(['margin', 1])}
                                    onChange={() => unitAction.editUnit(id, 'margin', immutable.fromJS([
                                    parseFloat(this.refs.marginTop.value) || 0,
                                    parseFloat(this.refs.marginRight.value) || 0,
                                    parseFloat(this.refs.marginBottom.value) || 0,
                                    parseFloat(this.refs.marginLeft.value) || 0
                                ]))}/>
                            </li>
                            <li className="f-fl label-left">
                                <label>下</label>
                                <input
                                    type="text"
                                    ref="marginBottom"
                                    defaultValue={data.getIn(['margin', 2])}
                                    onChange={() => unitAction.editUnit(id, 'margin', immutable.fromJS([
                                    parseFloat(this.refs.marginTop.value) || 0,
                                    parseFloat(this.refs.marginRight.value) || 0,
                                    parseFloat(this.refs.marginBottom.value) || 0,
                                    parseFloat(this.refs.marginLeft.value) || 0
                                ]))}/>
                            </li>
                            <li className="f-fl label-left">
                                <label>左</label>
                                <input
                                    type="text"
                                    ref="marginLeft"
                                    defaultValue={data.getIn(['margin', 3])}
                                    onChange={() => unitAction.editUnit(id, 'margin', immutable.fromJS([
                                    parseFloat(this.refs.marginTop.value) || 0,
                                    parseFloat(this.refs.marginRight.value) || 0,
                                    parseFloat(this.refs.marginBottom.value) || 0,
                                    parseFloat(this.refs.marginLeft.value) || 0
                                ]))}/>
                            </li>
                        </ul>
                    </li>
                </ul>
            </UnitPanel>
        );
    }
}

export default UnitAudio;
