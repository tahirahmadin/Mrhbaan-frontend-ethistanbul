import WalletConnectProvider from "@walletconnect/web3-provider";

const provider = new WalletConnectProvider({
  infuraId: `${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  qrcodeModalOptions: {
    mobileLinks: ["metamask", "trust"],
  },
});

export default provider;
