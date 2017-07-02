import React, { PropTypes } from 'react';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';

import './index.scss';

import unitAction from '../../../action/unit';

@pureRender
class UnitMeta extends React.Component {
    static propTypes = {
        data: ImmutablePropTypes.map,
        id: PropTypes.number
    };
    constructor(props){
        super(props);
        this.state = {
            showDetail: true
        } 
    }
    render() {
        const { data, id } = this.props;
        const { showDetail } = this.state;
        return (
            <div className="unit-common unit-meta">
            	    <div className="header f-cb" onClick={(e) => !e.target.className.indexOf('header') && this.setState({'showDetail': !showDetail})}>
                    <span className="f-fl">{data.get('name')}</span>
                    <i className={`f-fr icon iconfont icon-zhankaianniu ${showDetail? "arrow-up": "arrow-down"}`}></i>
                </div>
                <div className={`content ${showDetail? "show-detail": "hide-detail"}`}>
                	<ul>
                		<li className="f-cb li-first">
                			<label className="f-fl">页面标题</label>
                			<input 
                                className="f-fr"
                				type="text"
    		                    placeholder="页面标题"
                                defaultValue={data.get('title')}
                                ref="title"
    		                    onChange={()=>unitAction.editUnit(id, 'title', this.refs.title.value)}
                			/>
                		</li>
                		<li className="f-cb">
                			<label className="f-fl">关键词</label>
                			<input 
                                className="f-fr"
                				type="text"
    		                    placeholder="页面关键词"
                                defaultValue={data.get('keywords')}
                                ref="keywords"
    		                    onChange={()=>unitAction.editUnit(id, 'keywords', this.refs.keywords.value)}
                			/>
                		</li>
                		<li className="f-cb">
                			<label className="f-fl">页面描述</label>
                			<input 
                                className="f-fr"
                				type="text"
    		                    placeholder="页面描述"
                                defaultValue={data.get('desc')}
                                ref="desc"
    		                    onChange={()=>unitAction.editUnit(id, 'desc', this.refs.desc.value)}
                			/>
                		</li>
                        <li className="f-cb">
                            <label className="f-fl">页面背景</label>
                            <input 
                                style={{background:data.get('bgColor')}}
                                className="f-fr"
                                type="text"
                                placeholder="页面背景"
                                defaultValue={data.get('bgColor')}
                                ref="bgColor"
                                onChange={()=>unitAction.editUnit(id, 'bgColor', this.refs.bgColor.value)}
                            />
                        </li>
                	</ul>
                </div>
            </div>
        );
    }
}

export default UnitMeta;
