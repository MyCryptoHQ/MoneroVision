const minutesBetweenBlocks = 2

interface Transaction {
	tx_fee: number
	tx_hash: string
	tx_size: number
}

function getNumberOfBlocksToProcessSize(txsTotalSize: number): number {
	const blockSizeCap = 350000 // TODO: Retrieve dynamic block size cap via API
	if (blockSizeCap > txsTotalSize) {
		return 1
	} else {
		return Math.ceil(txsTotalSize / blockSizeCap)
	}
}

function findTx(txHash: string, mempool: Transaction[]): Transaction | undefined {
	return mempool.filter((tx) => {
		return tx.tx_hash === txHash
	})[0]
}

export function minutesUntilMined(txHash: string, mempool: Transaction[]): number {
	// get the full object representation of the tx
	const fullTx = findTx(txHash, mempool)
	if (!fullTx) {
		throw Error(`Transaction with hash ${txHash} does not exist in supplied mempool`)
	}
	// Sort the mempool by transaction priority (tx_fee / tx_size) to determine highest priority transactions.
	const txPSortedMempool = [...mempool].sort((a, b) => a.tx_fee - b.tx_fee)
	// filter transactions that are lower priority than our desired transaction
	const fTxPSortedMempool = txPSortedMempool.filter((tx) => tx.tx_fee > fullTx.tx_fee)
	// determine the cumulative size of transactions that are higher priority than our desired transactions
	const txsTotalSize = fTxPSortedMempool.map((tx) => tx.tx_size).reduce((prev, next) => prev + next)
	// determine the approximate number of blocks before transaction will be mined
	const numOfBlocks = getNumberOfBlocksToProcessSize(txsTotalSize)
	// multiply by 2; average time between blocks is 2 minutes
	return numOfBlocks * minutesBetweenBlocks
}
