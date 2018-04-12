import { createReducer } from 'utils/functions'
import { TypeKeys } from './constants'
import { Node, AddNodeAction, RemoveNodeAction, EditNodeAction, SelectNodeAction } from './actions'

export interface NodeState {
	selectedNode: string
	nodes: Node[]
}

export const INITIAL_STATE: NodeState = {
	selectedNode: 'Default',
	nodes: [{ name: 'Default', url: 'https://xmrchain.net' }],
}

function addNode(state: NodeState, action: AddNodeAction): NodeState {
	return { ...state, nodes: [...state.nodes, action.payload] }
}
function editNode(state: NodeState, action: EditNodeAction): NodeState {
	const { index, node } = action.payload
	const nodes = [...state.nodes.slice(0, index), node, ...state.nodes.slice(index + 1)]
	return { ...state, nodes }
}
function selectNode(state: NodeState, action: SelectNodeAction): NodeState {
	return { ...state, selectedNode: !!action.payload ? action.payload : 'Default' }
}
function removeNode(state: NodeState, action: RemoveNodeAction): NodeState {
	console.log(action)
	return { ...state }
}

export const nodeReducer = createReducer(INITIAL_STATE, {
	[TypeKeys.ADD_NODE]: addNode,
	[TypeKeys.EDIT_NODE]: editNode,
	[TypeKeys.SELECT_NODE]: selectNode,
	[TypeKeys.REMOVE_NODE]: removeNode,
})
