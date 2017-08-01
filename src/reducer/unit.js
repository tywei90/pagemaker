import immutable from 'immutable';

const unitsConfig = immutable.fromJS({
    META: {
        type: 'META',
        name: 'META信息配置',
        title: '',
        keywords: '',
        desc: '',
        bgColor: '#fff'
    },
    OGP: {
        type: 'OGP',
        name: 'OGP信息配置',
        contents: []
    },
    TITLE: {
        type: 'TITLE',
        name: '标题',
        text: '',
        url: '',
        color: '#000',
        fontSize: "middle",
        textAlign: "center",
        padding: [0, 0, 0, 0],
        margin: [0, 0, 24, 0]
    },
    IMAGE: {
        type: 'IMAGE',
        name: '图片',
        address: '',
        url: '',
        bgColor: 'transparent',
        padding: [0, 0, 0, 0],
        margin: [0, 30, 24, 30]
    },
    BUTTON: {
        type: 'BUTTON',
        name: '按钮',
        address: '',
        url: '',
        txt: '',
        margin: [
            0, 30, 24, 30
        ],
        appOrder: '',
        buttonStyle: "redStyle",
        bigRadius: '',
        address: '',
        style: 'default'
    },
    TEXTBODY: {
        type: 'TEXTBODY',
        name: '正文',
        text: '',
        textColor: '#eee',
        bgColor: '#fff',
        fontSize: "small",
        textAlign: "center",
        padding: [0, 0, 0, 0],
        margin: [0, 30, 24, 30],
        changeLine: true,
        retract: true,
        bigLH: true,
        bigPD: '',
        noUL: '',
        borderRadius: ''
    },
})

const initialState = immutable.fromJS([
    {
        type: 'META',
        name: 'META信息配置',
        title: '',
        keywords: '',
        desc: '',
        bgColor: '#fff'
    }
]);


function reducer(state = initialState, action) {
    let newState, localData
    // 初始化从localstorage取数据
    if (state === initialState) {
        localData = localStorage.getItem('config');
        !!localData && (state = immutable.fromJS(JSON.parse(localData)));
    }
    switch (action.type) {
        case 'AddUnit': {
            newState = state.push(unitsConfig.get(action.name));
            break
        }
        case 'CopyUnit': {
            newState = state.push(state.get(action.id));
            break
        }
        case 'EditUnit': {
            newState = state.setIn([action.id, action.prop], action.value);
            break
        }
        case 'RemoveUnit': {
            newState = state.splice(action.id, 1);
            break
        }
        case 'Clear': {
            newState = initialState;
            break
        }
        case 'Insert': {
            newState = immutable.fromJS(action.data);
            break
        }
        case 'MoveUnit':{
            const {fid, tid} = action;
            const fitem = state.get(fid);
            if (fitem && fid != tid) {
                newState = state.splice(fid, 1).splice(tid, 0, fitem); 
            } else {
                newState = state;
            }
            break;
        }
        default:
            newState = state;
    }
    // console.log(newState.toJS()[4]);
    // 更新localstorage，便于恢复现场
    localStorage.setItem('config', JSON.stringify(newState.toJS()));
    return newState
}

export default reducer;
