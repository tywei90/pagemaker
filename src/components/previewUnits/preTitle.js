/**
 * Created by bjshensiqi on 2017/2/13.
 */
import React, { PropTypes } from 'react';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';

class PreTitle extends React.Component {
	static propTypes = {
        data: ImmutablePropTypes.map
    };
	constructor(props){
		super(props);
		this.state = {
			color: 'green'
		}
	}
	render() {
		var fontSize;
		var style = {}, styleInner = {};
		var localData = JSON.parse(localStorage.getItem('config'));
		var data = localData[this.props.id];
		switch(data.fontSize) {
			case 'small': fontSize = '0.5rem'; break;
			case 'middle': fontSize = '1rem'; break;
			case 'big': fontSize = '1.5rem'; break;
		}
		style = {
			marginTop: data.margin[0],
			marginRight: data.margin[1],
			marginBottom: data.margin[2],
			marginLeft: data.margin[3],
			paddingTop: data.padding[0],
			paddingRight: data.padding[1],
			paddingBottom: data.padding[2],
			paddingLeft: data.padding[3]
		};
		styleInner = {
			color: data.color,				
			fontSize: fontSize,
			textAlign: data.textAlign,
		}
		return (
			<section className={`title`} style={style} >
				<a href= {data.url}  style={styleInner} >
					{data.text}
				</a>
			</section>
		)
	}
}
export default PreTitle;
