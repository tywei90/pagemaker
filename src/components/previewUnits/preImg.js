/**
 * Created by bjshensiqi on 2017/2/14.
 */
import React, { PropTypes } from 'react';
import autoBind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';

class PreImg extends React.Component {
	static propTypes = {
        data: ImmutablePropTypes.map
    };
	constructor(props){
		super(props);
		this.state = {
		}
	}
	render() {
		var style = {};
		var localData = JSON.parse(localStorage.getItem('config'));
		var data = localData[this.props.id];
		style = {
			backgroundColor: data.bgColor,
			marginTop: data.margin[0],
			marginRight: data.margin[1],
			marginBottom: data.margin[2],
			marginLeft: data.margin[3],
			paddingTop: data.padding[0],
			paddingRight: data.padding[1],
			paddingBottom: data.padding[2],
			paddingLeft: data.padding[3]
		};
		return (
			<section className={`image`} style={style}>
				<a href= {data.url}>
					<img src={data.address} />	
				</a>			
			</section>
		)
	}
}
export default PreImg;
