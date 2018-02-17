interface State {
	foo: string
}

const INITIAL_STATE: State = {
	foo: 'bar',
}

export const rootReducer = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
	}
	return state
}
