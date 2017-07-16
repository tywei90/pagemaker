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
        bgColor: '#fff',
        padding: [0, 0, 0, 0],
        margin: [0, 30, 24, 30]
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
            // console.table(newState.toJS());
            break
        }
        case 'EditUnit': {
            newState = state.setIn([action.id, action.prop], action.value);
            // console.table(newState.toJS());
            break
        }
        case 'RemoveUnit': {
            newState = state.splice(action.id, 1);
            // console.table(newState.toJS());
            break
        }
        case 'Clear': {
            newState = initialState;
            // console.table(newState.toJS());
            break
        }
        case 'Insert': {
            // console.log(action.data)
            newState = immutable.fromJS(action.data);
            // console.table(newState.toJS());
            break
        }
        default:
            newState = state;
    }
    // 更新localstorage，便于恢复现场
    localStorage.setItem('config', JSON.stringify(newState.toJS()));
    return newState
}

export default reducer;
