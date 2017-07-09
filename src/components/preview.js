/**
 * Created by bjshensiqi on 2017/1/10.
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';

import './preview.css';
import PreTitle from './previewUnits/preTitle';
import PreImg from './previewUnits/preImg';
import PreTextBody from './previewUnits/preTextBody';

var Frame = require('react-frame-component');

const renderUnits = units => {
	return units.map((item, index) => {
		switch (item.get('type')) {
			case 'TITLE' :
				return (
						<PreTitle key={index} id={index} />
				)
			break;
			case 'IMAGE' :
				return (
					<PreImg key={index} id={index} />
				)
			break;
			case 'TEXTBODY' :
				return (
					<PreTextBody key={index} id={index} />
				)
			break;
		}
	});
};

class Preview extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			color: 'green'
		}
	}
	textColor(color) {
		return <div>{color}</div>
	}
	render() {
		const { unit } = this.props;
		//初始化meta部分数据
		var localData = JSON.parse(localStorage.getItem('config'));
		var data = localData[0];
		var initialContent = '<!DOCTYPE html><html><head><title>'
							+ data.title 
							+'</title></head><body style="background-color: '
							+ data.bgColor 
							+'"><div id="framePage"></div></body></html>'
		return (
			<Frame  className="m-preview f-fl" 
  					initialContent= {initialContent}
  					head={
				      <link type='text/css' rel='stylesheet' href='./src/components/iframePage.css' />
				    }
  					mountTarget='#framePage'>
				{renderUnits(unit)}
			</Frame>
		);
	}
}

export default connect(
		state => ({
		unit: state.get('unit'),
	})
)(Preview);