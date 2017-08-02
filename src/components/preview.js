import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';

import './preview.scss';
import PreTitle from './previewUnits/preTitle';
import PreImg from './previewUnits/preImg';
import PreTextBody from './previewUnits/preTextBody';
import PreButton from './previewUnits/preButton';

import { Modal, Button } from 'antd';
const confirm = Modal.confirm;

let Frame = require('react-frame-component');

const renderUnits = units => {
	return units.map((item, index) => {
		switch (item.get('type')) {
			case 'TITLE' :
				return (
						<PreTitle key={index} id={index} data={item} />
				)
			break;
			case 'IMAGE' :
				return (
					<PreImg key={index} id={index} data={item} />
				)
			break;
			case 'TEXTBODY' :
				return (
					<PreTextBody key={index} id={index} data={item} />
				)
			break;
			case 'BUTTON' :
				return (
					<PreButton key={index} id={index} data={item} />
				)
			break;
		}
	});
};

@pureRender
class Preview extends React.Component {
	static propTypes = {
        unit: ImmutablePropTypes.list,
    };
	constructor(props){
		super(props);
		this.state = {
	    	errTip1: '',
	    	errTip2: '',
	    	stateTip: '',
	    	stateOK: false,
	    	placeholder: '请输入发布密码',
	    	visible: false,
	    	confirmLoading: false,
	    	confirmLoading2: false,
	    	isDirnameExist: false
	  	}
	}
	showModal(){
		this.setState({visible: true});
		setTimeout(()=>{
			this.submitBtn = document.getElementById('releaseBtn');
			this.submitBtn.setAttribute('disabled', 'disabled');
		}, 0)
	}
	handleInput(){
		let dirname = this.refs.dirname.value.trim();
		let password = this.refs.password.value.trim();
		let code = this.refs.code.value.trim();
		if(/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(dirname) && password != '' && code != ''){
			this.setState({stateOK: true});
			this.submitBtn.removeAttribute('disabled');
		}else{
			this.setState({stateOK: false});
			this.submitBtn.setAttribute('disabled', 'disabled');
		}
	}
	handleBlur(){
		let dirname = this.refs.dirname.value.trim();
		if(dirname == ''){
			this.setState({
				errTip1: '',
		    	stateTip: '',
		    	placeholder: '请输入发布密码'
		  	});
			return
		}
		if(!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(dirname)){
			this.setState({
		    	errTip1: '目录名称是以字母或下划线开头，后面跟字母、数字或下划线的字符',
		    	stateTip: '',
		    	placeholder: '请输入发布密码'
		    });
		    return
		}
		fetch('/genpages/checkDirname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({dirname})
        })
        .then(response => response.json())
        .then(data => {
            if(data.retcode == 200){
            	this.setState({
            		errTip1: '',
            		stateTip: '这是一个新的发布目录，请创建您的发布密码并牢记，以便下次更新发布内容',
            		placeholder: '请创建发布密码',
            		isDirnameExist: false
            	});
            }else{
            	this.setState({
            		errTip1: '',
			    	stateTip: '发布目录已存在，确认覆盖请输入发布密码',
			    	placeholder: '请输入发布密码',
			    	isDirnameExist: true
			  	});
            }
        })
        .catch(e => console.log("Oops, error", e))
	}
	handleOk(){
		if(!this.state.stateOK){
			return
		}
		const { unit } = this.props;
		let config = unit.toJS();
		let dirname = this.refs.dirname.value.trim();
		let password = this.refs.password.value.trim();
		let code = this.refs.code.value.trim();
		let html = this.prepareData();
		this.setState({
	    	confirmLoading: true,
	    });
		fetch('/genpages/release', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({dirname, password, code, html, config})
        })
        .then(response => response.json())
        .then(data => {
        	this.setState({
		    	confirmLoading: false,
		    });
            if(data.retcode == 200){
            	this.setState({
            		visible: false
            	});
            	Modal.success({
			    	title: '页面发布成功!',
			    	content: <div>查看发布的页面<a href={`/release/${data.dirname}.html`}>点击这里</a></div>,
			  	});
            }else{
            	this.setState({
			    	errTip2: data.retdesc
			  	});
            }
        })
        .catch(e => console.log("Oops, error", e))
	}
	handleCancel(){
	    this.setState({
	    	visible: false
	    });
	    setTimeout(() => {
	    	this.refs.dirname.value = '';
			this.refs.password.value = '';
			this.refs.code.value = '';
			this.setState({
		        errTip1: '',
		    	errTip2: '',
		    	stateTip: '',
		    	stateOK: false,
		    	placeholder: '请输入发布密码',
		    	confirmLoading: false,
		    	confirmLoading2: false
		    });
	    }, 500);
	}
	confirmDel(){
		var me = this;
		confirm({
		    title: '确认删除已发布页面?',
		    content: '删除之后将不可恢复，请谨慎操作！',
		    onOk() {
		        me.handleDel();
		    },
		    onCancel() {},
		});
	}
	handleDel(){
		if(!this.state.stateOK || !this.state.isDirnameExist){
			return
		}
		const { unit } = this.props;
		let dirname = this.refs.dirname.value.trim();
		let password = this.refs.password.value.trim();
		let code = this.refs.code.value.trim();
		this.setState({
	    	confirmLoading2: true,
	    });
		fetch('/genpages/delDirectory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({dirname, password, code})
        })
        .then(response => response.json())
        .then(data => {
        	this.setState({
		    	confirmLoading2: false,
		    });
            if(data.retcode == 200){
            	this.setState({
            		visible: false
            	});
            	Modal.success({
			    	title: '页面删除成功!',
			    	content: <div>查看已发布的页面<a href="/released">点击这里</a></div>,
			  	});
            }else{
            	this.setState({
			    	errTip2: data.retdesc
			  	});
            }
        })
        .catch(e => console.log("Oops, error", e))
	}
	prepareData(){
		const { unit } = this.props;
		let localData = unit.toJS();
		let data = localData[0];
		let iframe = document.getElementsByTagName('iframe')[0];
		let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
		let bodyContext = iframeDoc.getElementById("framePage").outerHTML;
		let htmlContext = 
			'<!DOCTYPE html>' + 
			'<html>' + 
				'<head>'+ 
					'<title>' + data.title +'</title>'+
					'<link rel="shortcut icon" href="/build/favicon.ico">' + 
					'<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui">'+
					'<meta name="keywords" content=' + data.keywords + '>'+
					'<meta name="description" content=' + data.desc + '>'+ 
					'<link type="text/css" rel="stylesheet" href="/release/index.css" />' + 
				'</head>'+ 
				'<body style="background-color: '+ data.bgColor +'">' + 
					bodyContext + 
				'</body>' + 
			'</html>';
		return encodeURI(htmlContext)
	}
	render() {
		const { unit } = this.props;
		const { visible, confirmLoading, confirmLoading2, stateTip, placeholder, errTip1, errTip2, stateOK, isDirnameExist } = this.state;
		//初始化meta部分数据
		let localData = unit.toJS();
		let data = localData[0];
		let initialContent = '<!DOCTYPE html><html><head>'+ 
								'<title>' + data.title +'</title>'+
								'<link rel="shortcut icon" href="/build/favicon.ico">' + 
								'<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui">'+
								'<meta name="keywords" content=' + data.keywords + '>'+
								'<meta name="description" content=' + data.desc + '>'+ 
								'<link type="text/css" rel="stylesheet" href="/release/index.css" />' + 
							'</head>'+ 
							'<body style="background-color: '+ data.bgColor +
							'"><div id="framePage"></div></body></html>';
		return (
			<section className="m-preview">
			<span id="release" onClick={this.showModal.bind(this)}><i className="iconfont icon-fabu"></i>发布</span>
				<a href="/released" className="see-released"><i className="iconfont icon-chakan"></i>查看</a>
				<Modal title="请输入发布信息"
					wrapClassName="publish-dialog"
					maskClosable={false}
		         	visible={visible}
		         	onOk={this.handleOk.bind(this)}
			        onCancel={this.handleCancel.bind(this)}
		         	footer={[
		            	<Button 
		            		key="back" 
		            		size="large" 
		            		onClick={this.handleCancel.bind(this)}>
		            		取消
		            	</Button>,
		            	<Button 
		            		key="submit" 
		            		id="releaseBtn" 
		            		type="primary" 
		            		size="large" 
		            		loading={confirmLoading} 
		            		onClick={this.handleOk.bind(this)}>
		            		发布
		            	</Button>,
		            	<Button 
		            		style={{float: 'left', display: `${stateOK && isDirnameExist? 'inline-block': 'none'}`}}  
		            		key="danger" 
		            		type="danger" 
		            		size="large" 
		            		loading={confirmLoading2} 
		            		onClick={this.confirmDel.bind(this)}>
		            		删除
		            	</Button>
		          	]}
		         >
			        <div className="dirname f-cb">
			        	<label>发布目录</label>
			        	<input 
			        		ref="dirname" 
			        		name="发布目录" 
			        		type="text" 
			        		placeholder="请输入发布目录"
			        		onInput={this.handleInput.bind(this)}
			        		onFocus={()=>{this.setState({errTip1: '', stateTip: ''})}} 
			        		onBlur={this.handleBlur.bind(this)}/>

			         	<p className={`err-p ${errTip1 == "" && this.refs.dirname != ""? "f-hide" : ""}`}>
			         		<i className={`iconfont icon-cuowu ${errTip1 == ""? "f-hide" : ""}`}></i>{errTip1}
			         	</p>
			         	<p className={`ok-p ${errTip1 == "" && this.refs.dirname != ""? "" : "f-hide"}`}>
			         		<i className={`iconfont icon-dui ${stateTip == ""? "f-hide" : ""}`}></i>{stateTip}
			         	</p>
			        </div>
			        <div className="code">
				        <label>发布密码</label>
			        	<input 
			        		ref="code" 
			        		name="发布密码" 
			        		type="password" 
			        		placeholder={placeholder}
			        		onInput={this.handleInput.bind(this)}
			        		onFocus={()=>{this.setState({errTip2: ''})}}/>
			        </div>
			        <div className="password">
			        	<label>平台密码</label>
			        	<input 
			        		ref="password" 
			        		name="平台密码" 
			        		type="password" 
			        		placeholder="请输入平台密码"
			        		onInput={this.handleInput.bind(this)}
			        		onFocus={()=>{this.setState({errTip2: ''})}}/>
			         	<p className="errTip2"><i className={`iconfont icon-cuowu ${errTip2 == ""? "f-hide" : ""}`}></i>{errTip2}</p>
			        </div>
		        </Modal>
				<Frame  className="iframe" 
	  					initialContent= {initialContent}
	  					mountTarget='#framePage'>
					{renderUnits(unit)}
				</Frame>
			</section>
		);
	}
}

export default connect(
		state => ({
		unit: state.get('unit'),
	})
)(Preview);