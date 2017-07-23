import React, { PropTypes } from 'react';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';
import { Modal, Upload, message } from 'antd';

import './index.scss';

import unitAction from '../../../action/unit';

@pureRender
class UnitPanel extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        type: PropTypes.string,
        unitName: PropTypes.string,
        editable: PropTypes.bool,
        cls: PropTypes.string
    };
    static defaultProps = {
        type: '',
        editable: true,
        cls: ''
    };
    constructor(props){
        super(props);
        this.state = {
            showDetail: false
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
    copyUnit(id){
        unitAction.copyUnit(id);
        this.success();
    }
    success() {
        const modal = Modal.success({
            title: '温馨提示',
            content: '组件复制成功!',
        });
        setTimeout(() => modal.destroy(), 1000);
    }
    render() {
        const { id, type, unitName, editable, cls, children} = this.props;
        const { showDetail } = this.state;
        return (
            editable?
                <div className={`unit-common unit-${type} ${cls}`} data-id={Math.random()}>
                    <div className="header f-cb" onClick={(e) => !e.target.className.indexOf('header') && this.setState({'showDetail': !showDetail})}>
                        <i className="f-fl f-hide2 icon iconfont icon-iconfontbi" onClick={() => this.refs.name.focus()}></i>
                        <input 
                            className="f-fl"
                            type="text"
                            value={unitName}
                            ref="name"
                            onChange={()=>unitAction.editUnit(id, 'name', this.refs.name.value)}
                        />
                        <i className={`f-fr icon iconfont icon-zhankaianniu ${showDetail? "arrow-up": "arrow-down"}`} onClick={(e) => this.setState({'showDetail': !showDetail})}></i>
                        <i className="f-fr f-hide2 icon iconfont icon-shanchu1" onClick={this.showConfirm.bind(this, id)}></i>
                        <i className="f-fr f-hide2 icon iconfont icon-fuzhi" onClick={this.copyUnit.bind(this, id)}></i>
                        <i className="f-fr f-hide2 icon iconfont icon-yidong"></i>
                    </div>
                    <div className={`content ${showDetail? "show-detail": "hide-detail"}`}>
                        { children }
                    </div>
                </div>
            :
                <div className={`unit-common unit-${type} ${cls}`}>
                    <div className="header f-cb" onClick={(e) => !e.target.className.indexOf('header') && this.setState({'showDetail': !showDetail})}>
                        <span className="f-fl">{unitName}</span>
                        <i className={`f-fr icon iconfont icon-zhankaianniu ${showDetail? "arrow-up": "arrow-down"}`} onClick={(e) => this.setState({'showDetail': !showDetail})}></i>
                    </div>
                    <div className={`content ${showDetail? "show-detail": "hide-detail"}`}>
                        { children }
                    </div>
                </div>
        );
    }
}

export default UnitPanel;
