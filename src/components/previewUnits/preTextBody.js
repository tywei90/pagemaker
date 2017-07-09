/**
 * Created by bjshensiqi on 2017/2/14.
 */
import React, { PropTypes } from 'react';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';

class PreTextBody extends React.Component {
	static propTypes = {
        data: ImmutablePropTypes.map
    };
	constructor(props){
		super(props);
		this.state = {
		}
	}
	render() {
		var fontSize,textIndent,lineHeight,textDecoration,borderRadius;
		var style = {};
		var localData = JSON.parse(localStorage.getItem('config'));
		var data = localData[this.props.id];
		switch(data.fontSize) {
			case 'small': fontSize = '0.5rem'; break;
			case 'middle': fontSize = '1rem'; break;
			case 'big': fontSize = '1.5rem'; break;
			case 'superbig': fontSize = '2.5rem'; break;
		}
		if (data.retract) {
			textIndent = '2em'
		}else {
			textIndent = '0em'
		}
		if(data.bigLH) {
			lineHeight = 2
		}else {
			lineHeight = 1.5
		}
		if(data.noUL) {
			textDecoration = 'none'
		}else {
			textDecoration = 'underline'
		}
		if(data.borderRadius) {
			borderRadius = '4px'
		}else {
			borderRadius = '0'
		}	
		style = {
			textColor: data.textColor,
			backgroundColor: data.bgColor,
			textAlign: data.textAlign,
			fontSize: fontSize,
			marginTop: data.margin[0],
			marginRight: data.margin[1],
			marginBottom: data.margin[2],
			marginLeft: data.margin[3],
			paddingTop: data.padding[0],
			paddingRight: data.padding[1],
			paddingBottom: data.padding[2],
			paddingLeft: data.padding[3],
			textIndent: textIndent,
			lineHeight: lineHeight,
			textDecoration: textDecoration,
			borderRadius: borderRadius
		};
        // changeLine: 'changeLine',
        // retract: 'retract',
        // bigLH: '',
        // bigPD: '',
        // noUL: '',
        // borderRadius: ''
        // console.log(borderRadius)
		return (
			<section className={`textbody`}  style={style}>
				<p>
					{data.text}
				</p>
			</section>
		)
	}
}
export default PreTextBody;
