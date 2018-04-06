import { nodeReducer, NodeState } from './nodes/reducer'
import { combineReducers } from 'redux'

export interface AppState {
	nodes: NodeState
}

export const rootReducer = combineReducers<AppState>({
	nodes: nodeReducer,
})
