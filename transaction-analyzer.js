const { ethers } = require('ethers');

async function getTransactionDetails(txHash) {
  try {
    // 使用公共 RPC 节点
    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161c');

    console.log('正在获取交易详情...');
    const tx = await provider.getTransaction(txHash);
    const receipt = await provider.getTransactionReceipt(txHash);

    if (!tx || !receipt) {
      console.log('交易未找到');
      return;
    }

    console.log('交易详情:');
    console.log('- 哈希:', tx.hash);
    console.log('- 发送方:', tx.from);
    console.log('- 接收方:', tx.to);
    console.log('- 金额:', ethers.utils.formatEther(tx.value), 'ETH');
    console.log('- Gas 价格:', ethers.utils.formatUnits(tx.gasPrice, 'gwei'), 'Gwei');
    console.log('- Gas 限制:', tx.gasLimit.toString());
    console.log('- 交易数据:', tx.data);
    console.log('- 区块号:', receipt.blockNumber);
    console.log('- 交易状态:', receipt.status === 1 ? '成功' : '失败');

    console.log('\\n事件日志:');
    receipt.logs.forEach((log, index) => {
      console.log(`- 事件 ${index + 1}:`);
      console.log('  地址:', log.address);
      console.log('  主题:', log.topics);
      console.log('  数据:', log.data);
    });

    return { tx, receipt };
  } catch (error) {
    console.error('获取交易详情失败:', error.message);
  }
}

// 使用示例交易哈希
const txHash = 'ebe277c8c27719475769ba1e694070eec0ad1a4b041cb9cef17a3f9cbb336b76';
getTransactionDetails(txHash);