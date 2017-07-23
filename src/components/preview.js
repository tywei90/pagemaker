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

var Frame = require('react-frame-component');

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
	render() {
		const { unit } = this.props;
		//初始化meta部分数据
		var localData = unit.toJS();
		var data = localData[0];
		var initialContent = '<!DOCTYPE html><html><head>'+ 
								'<title>' + data.title +'</title>'+
								'<meta name="keywords" content=' + data.keywords + '>'+
								'<meta name="description" content=' + data.desc + '>'+ 
								'<link type="text/css" rel="stylesheet" href="./src/components/iframePage.css" />' + 
							'</head>'+ 
							'<body style="background-color: '+ data.bgColor +
							'"><div id="framePage"></div></body></html>';
		return (
			<div className="m-preview">
				<Frame  className="iframe" 
	  					initialContent= {initialContent}
	  					mountTarget='#framePage' data-id={Math.random()}>
					{renderUnits(unit)}
				</Frame>
			</div>
		);
	}
}

export default connect(
		state => ({
		unit: state.get('unit'),
	})
)(Preview);