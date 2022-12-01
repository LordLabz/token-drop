import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  Web3Button,
} from "@thirdweb-dev/react";
import { utils } from "ethers";
import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const contractAddress = "0xE166c801A0cCb838ACeFFCdd9F4C813574A8E6A4";
  const address = useAddress();
  const [quantity, setQuantity] = useState("2000");
  const { contract } = useContract(contractAddress);
  const { data: price, isLoading } = useContractRead(
    contract,
    "priceForAddress",
    address,
    quantity
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Aura LTE{" "}
          <a href="https://auralte.crd.co/">
            $ZOE claim
          </a>
          !
        </h1>

        <p className={styles.description}>
          Simply connect your wallet and press claim
        </p>

        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        <div>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              min="2000"
              max="2000"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <Web3Button
            accentColor="#5204BF"
            colorMode="dark"
            contractAddress={contractAddress}
            action={(contract) => contract.erc20.claim(quantity)}
            onSuccess={() => alert("Claimed!")}
            onError={(err) => alert(err)}
          >
            {"claim"}
          </Web3Button>
        </div>
      </main>
    </div>
  );
};

export default Home;
