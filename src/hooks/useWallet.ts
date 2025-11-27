import { useState, useCallback } from 'react';
import { BrowserProvider, Contract, formatUnits } from 'ethers';

interface WalletState {
  address: string | null;
  balance: string | null;
  tokenBalance: string | null;
  isConnecting: boolean;
  error: string | null;
}

interface UseWalletReturn {
  address: string | null;
  balance: string | null;
  tokenBalance: string | null;
  isConnecting: boolean;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  getTokenBalance: (tokenAddress: string, decimals: number, symbol: string) => Promise<void>;
}

const ERC20_ABI = [
  'function balanceOf(address account) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

export function useWallet(): UseWalletReturn {
  const [state, setState] = useState<WalletState>({
    address: null,
    balance: null,
    tokenBalance: null,
    isConnecting: false,
    error: null,
  });

  // Fetch ETH balance
  const fetchBalance = useCallback(async (address: string) => {
    try {
      if (typeof window.ethereum === 'undefined') {
        setState(prev => ({ ...prev, error: 'MetaMask không được cài đặt' }));
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      const balanceInEth = formatUnits(balance, 18);
      setState(prev => ({ ...prev, balance: balanceInEth, error: null }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi khi lấy số dư';
      setState(prev => ({ ...prev, error: errorMessage }));
    }
  }, []);

  // Connect wallet
  const connectWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));
    try {
      if (typeof window.ethereum === 'undefined') {
        setState(prev => ({
          ...prev,
          isConnecting: false,
          error: 'MetaMask không được cài đặt. Vui lòng cài đặt MetaMask.',
        }));
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const address = accounts[0];
      setState(prev => ({ ...prev, address, error: null }));
      await fetchBalance(address);

      // Listen for account changes
      window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
        if (newAccounts.length === 0) {
          setState(prev => ({
            ...prev,
            address: null,
            balance: null,
            tokenBalance: null,
          }));
        } else {
          setState(prev => ({ ...prev, address: newAccounts[0] }));
          fetchBalance(newAccounts[0]);
        }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi khi kết nối ví';
      setState(prev => ({ ...prev, error: errorMessage }));
    } finally {
      setState(prev => ({ ...prev, isConnecting: false }));
    }
  }, [fetchBalance]);

  // Get ERC-20 token balance
  const getTokenBalance = useCallback(
    async (tokenAddress: string, decimals: number, symbol: string) => {
      try {
        if (!state.address || typeof window.ethereum === 'undefined') {
          return;
        }

        const provider = new BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        console.log('Network:', network);
        console.log('Chain ID:', network.chainId);
        const contract = new Contract(tokenAddress, ERC20_ABI, provider);

        const code = await provider.getCode(tokenAddress);
        console.log("Code tại địa chỉ contract:", code);

        const balance = await contract.balanceOf(state.address);
        const formattedBalance = formatUnits(balance, decimals);
        setState(prev => ({
          ...prev,
          tokenBalance: `${formattedBalance} ${symbol}`,
        }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Lỗi khi lấy số dư token';
        setState(prev => ({ ...prev, error: errorMessage }));
      }
    },
    [state.address]
  );

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setState({
      address: null,
      balance: null,
      tokenBalance: null,
      isConnecting: false,
      error: null,
    });
  }, []);

  return {
    address: state.address,
    balance: state.balance,
    tokenBalance: state.tokenBalance,
    isConnecting: state.isConnecting,
    error: state.error,
    connectWallet,
    disconnectWallet,
    getTokenBalance,
  };
}

