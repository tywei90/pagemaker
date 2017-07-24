import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';

import './preview.css';
import PreTitle from './previewUnits/preTitle';
import PreImg from './previewUnits/preImg';
import PreTextBody from './previewUnits/preTextBody';
import PreButton from './previewUnits/preButton';

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
	}
	release(){
		let htmlContext = this.prepareData();
		let data = {
			html: htmlContext,
			name: 'lmlc'
		}
        fetch('/genpages/release', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        // .then(response => response.json())
        // .then(data => {
            
        // })
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
				<span id="release" onClick={() => this.release()}>发布</span>
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