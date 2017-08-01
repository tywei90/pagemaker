import './index.scss'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

import React, {PropTypes} from 'react'
import autoBind from 'autobind-decorator'
import pureRender from 'pure-render-decorator'
import ImmutablePropTypes from 'react-immutable-proptypes'
// import reactCSS from 'reactcss'
import CodeMirror from 'codemirror/lib/codemirror.js'
import js from 'codemirror/mode/javascript/javascript.js'
import css from 'codemirror/mode/css/css.js'

import unitAction from '../../../action/unit'
import UnitPanel from '../../ui/unitPanel'

@pureRender
class UnitCode extends React.Component {
    static propTypes = {
        data: ImmutablePropTypes.map,
        id: PropTypes.number
    }
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id
        }
    }
    render() {
        const {data, id} = this.props;
        return (
            <UnitPanel unitId={id} unitName={data.get('name')} editable={true}>
                <div ref="jsdiv"></div>
                <div ref="cssdiv"></div>
                <button onClick={(e) => this.saveCode(e)}>保存编辑</button>
            </UnitPanel>
        );
    }
    saveCode(e) {
        const {id} = this.props;
        unitAction.editUnit(id, 'js', this.jsCodeMirror.getValue());
        unitAction.editUnit(id, 'css', this.cssCodeMirror.getValue());
    }
    componentDidMount() {
        console.log('componentDidMount');
        const {data} = this.props;
        this.jsCodeMirror = CodeMirror(this.refs.jsdiv, {
            value: data.get('js'),
            mode: "javascript",
            lineNumbers: true,
            theme: 'monokai'
        });
        this.cssCodeMirror = CodeMirror(this.refs.cssdiv, {
            value: data.get('css'),
            mode: "css",
            lineNumbers: true,
            theme: 'monokai'
        });
    }
}

export default UnitCode;
