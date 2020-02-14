/**
 * 引入createStore 用来创建Store 保留数据的作用
 */
import { createStore } from 'redux'
import reducer from './../reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export default () => createStore(reducer,composeWithDevTools())