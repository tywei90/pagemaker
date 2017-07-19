import React, { PropTypes } from 'react';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';

@pureRender
class PreTextBody extends React.Component {
	static propTypes = {
        data: ImmutablePropTypes.map,
        id: PropTypes.number
    };
	constructor(props){
		super(props);
		this.state = {
		}
	}
	render() {
		var fontSize,textIndent,lineHeight,textDecoration,borderRadius;
		var style = {};
		const { data } = this.props;
		let jsdata = data.toJS();
		switch(jsdata.fontSize) {
			case 'small': fontSize = '0.5rem'; break;
			case 'middle': fontSize = '1rem'; break;
			case 'big': fontSize = '1.5rem'; break;
			case 'superbig': fontSize = '2.5rem'; break;
		}
		if (jsdata.retract) {
			textIndent = '2em'
		}else {
			textIndent = '0em'
		}
		if(jsdata.bigLH) {
			lineHeight = 2
		}else {
			lineHeight = 1.5
		}
		if(jsdata.noUL) {
			textDecoration = 'none'
		}else {
			textDecoration = 'underline'
		}
		if(jsdata.borderRadius) {
			borderRadius = '4px'
		}else {
			borderRadius = '0'
		}	
		style = {
			textColor: jsdata.textColor,
			backgroundColor: jsdata.bgColor,
			textAlign: jsdata.textAlign,
			fontSize: fontSize,
			marginTop: jsdata.margin[0],
			marginRight: jsdata.margin[1],
			marginBottom: jsdata.margin[2],
			marginLeft: jsdata.margin[3],
			paddingTop: jsdata.padding[0],
			paddingRight: jsdata.padding[1],
			paddingBottom: jsdata.padding[2],
			paddingLeft: jsdata.padding[3],
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
					{jsdata.text}
				</p>
			</section>
		)
	}
}
export default PreTextBody;
