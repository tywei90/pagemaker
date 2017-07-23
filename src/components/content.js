import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Modal, Upload, message } from 'antd';

import './content.scss';

import unitAction from '../action/unit';

import UnitMeta from './units/meta/index'
import UnitTitle from './units/title/index'
import UnitImage from './units/image/index'
import UnitButton from './units/button/index'
import UnitTextBody from './units/textbody/index'
import Preview from './preview.js'

import 'whatwg-fetch'

const renderUnits = units => {
    return units.map((item, index) => {
        switch (item.get('type')) {
            case 'META' :
                return <li key={index} id={index}><UnitMeta id={index} data={item} /></li>
            case 'TITLE' :
                return <li key={index} id={index}><UnitTitle id={index} data={item} /></li>
            case 'IMAGE' :
                return <li key={index} id={index}><UnitImage id={index} data={item} /></li>
            case 'BUTTON' :
                return <li key={index} id={index}><UnitButton id={index} data={item} /></li>
            case 'TEXTBODY' :
                return <li key={index} id={index}><UnitTextBody id={index} data={item} /></li>
        }
    });
};

@pureRender
class Content extends React.Component {
    static propTypes = {
        unit: ImmutablePropTypes.list,
    };
    constructor(props){
        super(props);
        this.state = {
            uploadProps : {
                name: 'file',
                action: '/genpages/upload',
                accept: '.json',
                headers: {
                    authorization: 'authorization-text',
                },
                onChange(info) {
                    unitAction.clear();
                    if (info.file.status !== 'uploading') {
                        console.log('正在导入...');
                    }
                    if (info.file.status === 'done') {
                        console.log('导入完成！');
                        if(info.file.response.file.ok){
                            console.log(info.file.response.file.data);
                            unitAction.insert(info.file.response.file.data);
                            message.success(`${info.file.name} 导入成功！`);
                        }else{
                            message.error(`${info.file.response.file.des}，导入失败！`);
                        }
                    } else if (info.file.status === 'error') {
                        console.log('导入失败！');
                        message.error(`${info.file.name} 导入失败！`);
                    }
                }
            }
        }
    }
    clearSettings(){
        Modal.confirm({
            title: '确认清空所有配置?',
            onOk() {
                unitAction.clear();
            },
            onCancel() {}
        });
    }
    download(){
        var config = JSON.parse(localStorage.getItem('config') || '');
        fetch('/genpages/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config)
        })
        .then(response => response.json())
        .then(data => {
            var a = document.createElement('a');
            a.href = data.filepath;
            a.download = 'config.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            return data
        })
        // .then((data) => {
        //     fetch('/genpages/delete', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data.filepath)
        //     })
        // })
        .catch(e => console.log("Oops, error", e))
    }
    render() {
        const { unit } = this.props;
        const { uploadProps } = this.state;
        return (
            <section className="m-content f-fl">
                <div>
                    内容配置区(
                    <span className="J_insert">
                        <Upload {...uploadProps}>导入</Upload>
                    </span>|
                    <span className="J_output" onClick={this.download}>导出</span>|
                    <span className="J_clear" onClick={this.clearSettings}>清空</span>)
                </div>
                <ul id="unitMain">
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
