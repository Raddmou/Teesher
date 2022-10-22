import { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import Lock from './artifacts/contracts/Lock.sol/Lock.json';
import './App.css';
import imgUrl from './img/d1a2d30d74c79ea5ad5c62ea746f148f.jpg'

const SmartContractAddress = "0x"

function App() {

  const [error, setError] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData(){
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(SmartContractAddress, Lock.abi, provider);
      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const object = {"cost": String(cost), "totalSupply" : String(totalSupply)};
        setData(object);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  async function mint() {
    if(typeof window.ethereum !== 'undefined'){
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(SmartContractAddress, Lock.abi, signer);
      try {
        let ovverides = {
          from: accounts[0],
          value: data.cost
        }
        const transaction = await contract.mint(accounts[0], 1, ovverides);
        await transaction.wait();
        fetchData();
      } catch (error) {
        setError(error.message);
      }
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='banniere'>
          <img src={imgUrl}/>
        </div>
        {error && <p>{error}</p>}
        <h1>h1</h1>
        <p className='count'>{data.totalSupply} / 1000</p>
        <p className='cost'>Price {data.cost / 10**18}</p>
        <button onClick={mint}>Mint</button>
      </div>
    </div>
  );
}

export default App;
