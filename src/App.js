import "./App.css";
import { useState } from "react";
import Account from "./Account";
import { getAccount } from "./stellar";

function App() {
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [accountAddress, setAccountAddress] = useState('GCDTOO2NWAGR4JIT57HVKY4GOCHMFWNWKLHQG2TU6S77SNFWWEBSEYOM');
  const [walletDetails, setWalletDetails] = useState(null);

  const alreadyAccount = async() => {
    setLoading(true);
    const data = await getAccount(accountAddress);
    console.log(JSON.stringify(data, null, 2));
    if (data?.balances) {
      setWalletDetails(data);
      setSubmit(true);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {submit ? (
          <Account setSubmit={setSubmit} wallet={walletDetails} />
        ) : (
          <>
            <h2>Do you already have an account?</h2>
              <div>
                <label htmlFor="publicKey">Enter source account number</label>
                <br />
                <input
                  style={{marginTop: 20, marginBottom: 20, height: 50, width: 300}}
                  type="text"
                  value={accountAddress}
                  onChange={(e) =>
                    setAccountAddress(e.target.value)
                  }
                />
              </div>
              {!loading ? 
                <button onClick={()=>alreadyAccount()} disabled={loading}>Submit
                </button>
              : <button disabled={loading}>Please Wait...
              </button>}
          </>
        )}
      </header>
    </div>
  );
}

export default App;