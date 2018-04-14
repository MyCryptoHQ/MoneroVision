const minutesBetweenBlocks = 2;

interface Block {
  size: number;
}

interface Transaction {
  tx_fee: number;
  tx_hash: string;
  tx_size: number;
}

function getNumberOfBlocksToProcessSize(txsTotalSize: number, blockSizeLimit = 350000): number {
  console.log(blockSizeLimit);
  if (blockSizeLimit > txsTotalSize) {
    return 1;
  } else {
    return Math.ceil(txsTotalSize / blockSizeLimit);
  }
}

function findTx(txHash: string, mempool: Transaction[]): Transaction | undefined {
  return mempool.filter(tx => {
    return tx.tx_hash === txHash;
  })[0];
}

const getBlockSizeLimit = (blocks: Block[]) => {
  // max block size is 2x the median size of last 100 blocks
  // confirmed by XMR Core Team https://www.reddit.com/r/Monero/comments/3u3b2x/can_someone_explain_how_monero_deals_with/
  console.log(blocks[49], blocks[49].size * 2);
  return blocks[49].size * 2;
};

export function minutesUntilMined(txHash: string, mempool: Transaction[], blocks: Block[]): number {
  // get the full object representation of the tx
  const fullTx = findTx(txHash, mempool);
  if (!fullTx) {
    throw Error(`Transaction with hash ${txHash} does not exist in supplied mempool`);
  }
  // Sort the mempool by transaction priority (tx_fee / tx_size) to determine highest priority transactions.
  const txPSortedMempool = [...mempool].sort((a, b) => a.tx_fee - b.tx_fee);
  // filter transactions that are lower priority than our desired transaction
  const fTxPSortedMempool = txPSortedMempool.filter(tx => tx.tx_fee > fullTx.tx_fee);
  // determine the cumulative size of transactions that are higher priority than our desired transactions
  const txsTotalSize = fTxPSortedMempool.map(tx => tx.tx_size).reduce((prev, next) => prev + next);
  // determine the blocksize limit
  const blockSizeLimit = getBlockSizeLimit(blocks.sort((a, b) => a.size - b.size));
  // determine the approximate number of blocks before transaction will be mined
  const numOfBlocks = getNumberOfBlocksToProcessSize(txsTotalSize, blockSizeLimit);
  // multiply by 2; average time between blocks is 2 minutes
  return numOfBlocks * minutesBetweenBlocks;
}
