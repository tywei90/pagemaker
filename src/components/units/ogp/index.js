import './index.scss'

import React, { PropTypes } from 'react'
import autoBind from 'autobind-decorator'
import pureRender from 'pure-render-decorator'
import ImmutablePropTypes from 'react-immutable-proptypes'
import immutable from 'immutable';
import unitAction from '../../../action/unit'
import reactCSS from 'reactcss'
import { Icon, Row, Col, Button, Collapse } from 'antd'

const Panel = Collapse.Panel;

@pureRender
class UnitOgp extends React.Component {
    static propTypes = {
        data: ImmutablePropTypes.map,
        id: PropTypes.number
    }
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.state = {
            contents: data.get('contents').toJS() || []
        }
    }
    addContent = () => {
        const { id } = this.props;
        let { contents } = this.state;
        contents.push({
            property: '',
            content: ''
        });
        unitAction.editUnit(id, 'contents', immutable.fromJS(contents));
    }
    changeContent = (index, type, value) => {
        const { id } = this.props;
        let { contents } = this.state;
        contents[index][type] = value;
        unitAction.editUnit(id, 'contents', immutable.fromJS(contents));
    }
    removeContent = (index) => {
        const { id } = this.props;
        let { contents } = this.state;
        contents.splice(index, 1);
        unitAction.editUnit(id, 'contents', immutable.fromJS(contents));
    }
    renderContents(contents) {
        return contents.map((item, index) => {
            return (
                <Row className="row" key={index}>
                    <Col span={3}>属性</Col>
                    <Col span={8}>
                        <input type="text" placeholder="属性" value={item.property}
                        onChange={(e) => this.changeContent(index, 'property', e.target.value)} />
                    </Col>
                    <Col span={3}>内容</Col>
                    <Col span={8}>
                        <input type="text" placeholder="内容" value={item.content}
                        onChange={(e) => this.changeContent(index, 'content', e.target.value)} />
                    </Col>
                    <Col span={2}>
                        <Icon type="close" 
                        onClick={(e) => this.removeContent(index)} />
                    </Col>
                </Row>
            )
        });
    }
    render() {
        const { data, id } = this.props;
        const { contents } = this.state;
        const styles = reactCSS({
            'default': {
            }
        });
        return (
            <Collapse className="unit-ogp" defaultActiveKey="1">
                <Panel header={data.get('name')} key="1">
                    <Row className="row">
                        <Col span={24}>
                            <Button type="primary" onClick={this.addContent}>
                                添加协议<Icon type="plus" />
                            </Button>
                        </Col>
                    </Row>
                    {this.renderContents(contents)}
                </Panel>
            </Collapse>
        );
    }
}

export default UnitOgp;
