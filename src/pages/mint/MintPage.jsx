import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import CountUp from 'react-countup';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from 'react-toastify';
import axios from 'axios';
import { utils } from 'ethers';
import { useEthers, shortenAddress, Mainnet, Rinkeby } from '@usedapp/core';
import { useMint, useTotalSupply, useMaxSupply, useCost, useWalletOfOwner, } from '../../hooks';
import { ReactComponent as ConnectIcon } from '../../assets/icons/icon-online.svg';
import { ReactComponent as NotConnectIcon } from '../../assets/icons/icon-offline.svg';
import { ReactComponent as LinkIcon } from '../../assets/icons/icon-link.svg';
import { ReactComponent as CopyIcon } from '../../assets/icons/icon-copy.svg';
import 'react-multi-carousel/lib/styles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';
import './MintPage.scss';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1920 },
    items: 1,
  },
  small: {
    breakpoint: { max: 1920, min: 0 },
    items: 1,
  },
};

const MintPage = () => {
  const navigate = useNavigate();
  const { account, activateBrowserWallet } = useEthers();
  const cost = useCost();
  const totalSupply = useTotalSupply();
  const maxSupply = useMaxSupply();
  const walletOfOwner = useWalletOfOwner(account);
  const { state: mintState, send: mint } = useMint();

  const [minted, setMinted] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [tokenId, setTokenId] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [dna, setDNA] = useState('');
  const [imageURI, setImageURI] = useState('');
  const [desc, setDesc] = useState('');
  const [ani, setAni] = useState('');
  // const tokenURI = useTokenURI(17);

  const [termsAndConditionsChecked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!termsAndConditionsChecked);
    if (termsAndConditionsChecked) {
      var button = document.getElementById("terms_and_conditions");
    }
    else {
      document.getElementById("terms_and_conditions").disabled = true;
    }
  };

  useEffect(() => {
    setMinted(0);
    setProgressValue(0);
  }, []);

  useEffect(() => {
    fetchCurrencyData();

    const currencyDataInterval = setInterval(() => {
      fetchCurrencyData();
    }, 60 * 1000);

    return () => clearInterval(currencyDataInterval);
  }, []);

  useEffect(() => {
    if (mintState.status === 'Exception') {
      toast.error(mintState.errorMessage);
      setMinted(0);
      setProgressValue(0);
    } else if (mintState.status === 'Success') {
      fetchDNAData();
      setProgressValue(100);
      setTimeout(() => toast.info('Mint Success!'), 1000);
    }
  }, [mintState]);

  const fetchCurrencyData = () => {
    axios
      .get(process.env.REACT_APP_ETHERSCAN_URL)
      .then((response) => {
        const price = response.data.result.ethusd;
        setEthPrice(price);
      })
      .catch((err) => console.log(err));
  };

  const fetchDNAData = () => {
    axios
      .get(
        '' +
        process.env.REACT_APP_ALLOW_CORS_URL +
        process.env.REACT_APP_METADATA_URL +
        `${totalSupply}.json`
      )
      .then((response) => {
        setDNA(response.data.dna);
        setTokenName(response.data.name);
        setImageURI(response.data.image);
        setDesc(response.data.description);
        setAni(response.data.animation_url);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleMint = async () => {
    if (account && !termsAndConditionsChecked) {
      return;
    }
    if (window?.ethereum) {
      const chainId = await window?.ethereum?.request({
        method: 'eth_chainId',
      });
      console.log(parseInt(chainId, 16));
      if (
        parseInt(chainId, 16) === Rinkeby.chainId ||
        parseInt(chainId, 16) === Mainnet.chainId
      ) {
        activateBrowserWallet();
      } else {
        toast.error(process.env.REACT_APP_NETWORK_INVALID_ALERT);
      }
    } else {
      toast.error(process.env.REACT_APP_INSTALL_METAMASK_ALERT);
    }

    if (minted === 0 && account) {
      setMinted(1);
      setProgressValue(45);
      const price = parseInt(cost, 10) / 10 ** 18;

      mint(account, 1, {
        value: utils.parseEther(price.toString()),
      });
    }
  };

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(process.env.REACT_APP_URL + `?dna=${dna}`);
    toast.info(process.env.REACT_APP_COPY_DNA_ALERT);
  };

  return (
    <div className='mint-page'>
      <div className='sp-container'>
        <div className='sp-logo'>
          <a href='/'>
            <img src='./assets/images/logo.png' alt='Logo' />
          </a>
        </div>
        <div className='sp-content'>
          <div className='sp-left-content'>
            <h2 className='master-text'>SP21 MTVRSMaster</h2>
            <h2 className='collection-text'> Collection</h2>
            <h3>Pre-sale now </h3>
            <div className='collection-details'>
              <div className='price'>
                <svg
                  width='27'
                  height='27'
                  viewBox='0 0 27 27'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M22.3888 15.2392L13.5148 18.526L4.64062 15.2392L13.5148 0L22.3888 15.2392Z'
                    fill='white'
                  />
                  <path
                    d='M22.0014 17.0701L13.5148 27L5.02832 17.0701L13.5148 20.2132L22.0014 17.0701Z'
                    fill='white'
                  />
                  <path
                    d='M13.5146 20.2132L22.0012 17.0701L13.5146 27V20.2132Z'
                    fill='#9D9D9D'
                  />
                  <path
                    d='M22.3887 15.2392L13.5146 18.526V0L22.3887 15.2392Z'
                    fill='#9D9D9D'
                  />
                </svg>
                {account ? parseInt(cost, 10) / 10 ** 18 : 0} ETH{' '}
                <span>
                  {account
                    ? `{${parseFloat(
                      (ethPrice * parseInt(cost, 10)) / 10 ** 18
                    )}$}`
                    : '(0$)'}
                </span>{' '}
                + Gas Fees
              </div>

              <div className='grid grid-cols-2 gap-2 md:gap-3 mt-[34px]'>
                <div className='column'>
                  {account
                    ?
                    <h3>
                      <CountUp
                        end={account ? maxSupply : 0}
                        duration={1}
                        separator=','
                      /><p>Total Watches</p></h3>
                    : <p>** Please connect your Ethereum wallet first **</p>
                  }

                </div>
                {/* <div className='column'>
                  <h3>
                    <CountUp end={2000} duration={1} separator=',' />
                  </h3>
                  <p>Batch Supplies</p>
                </div> */}
                <div className='column'>
                  <h3>
                    <CountUp
                      end={account ? totalSupply : 0}
                      duration={1}
                      separator=','
                    />
                  </h3>
                  <p>Total Minted</p>
                </div>
              </div>
              <div className='flex items-center my-[27px] text-[10px] md:text-xs gap-2 md:gap-3'>
                {account ? (
                  <>
                    <ConnectIcon /> {`Connected to ${shortenAddress(account)}`}
                  </>
                ) : (
                  <>
                    <NotConnectIcon />{' '}
                    {`Connect to the ${process.env.REACT_APP_NETWORK_NAME} network`}
                  </>
                )}
              </div>
              <div id="terms_and_conditions" className='btn btn-primary' onClick={handleMint}>
                <div
                  className='sp-progress-bar'
                  style={{ width: `${progressValue}%` }}
                ></div>
                {minted === 0 && termsAndConditionsChecked || !account
                  ? account
                    ? 'MINT'
                    : 'CONNECT'
                  : progressValue === 100 && termsAndConditionsChecked
                    ? 'MINTED'
                    : termsAndConditionsChecked ? 'MINTING...'
                      : 'Please accept terms and conditions'
                }
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={termsAndConditionsChecked}
                    onChange={handleChange}
                  />
                  I accept the <a href='https://www.spatial-port.com/terms-conditions' target='_blank'>Terms & Conditions</a> and <a href='https://www.spatial-port.com/privacy-policy' target='_blank'>Privacy Policy</a>.
                </label>
              </div>
            </div>
          </div>
          <div className='sp-nft-content'>
            {minted === 0 ? (
              <img
                className='link-icon'
                src='./assets/images/off-line.png'
                alt='Offline'
              />
            ) : progressValue === 100 ? (
              <Carousel
                responsive={responsive}
                infinite={true}
                draggable={false}
                autoPlaySpeed={3000}
                arrows={false}
              >
                <div className='item'>
                  <LazyLoadImage
                    effect='blur'
                    src={imageURI}
                    alt='carousel-item'
                  />
                </div>
              </Carousel>
            ) : (
              <img
                className='orb-ani'
                src='./assets/images/orb-ani.gif'
                alt='On-line'
              />
            )}

          </div>
          <div className='sp-right-content'>
            {minted === 1 && progressValue === 100 && (
              <>
                <h2 className='edition-text'>{tokenName}</h2>

                <div className='edition-link'>
                  DNA: {dna}
                </div>
                <h4>{desc}</h4>
                <div className='btn-group'>
                  <button
                    className='btn btn-default'
                    onClick={() => {
                      window.open(`${process.env.REACT_APP_URL}?dna=${dna}`);
                    }}
                  >
                    MY WATCH
                  </button>
                  <button
                    className='btn btn-default'
                    onClick={() => {
                      window.open(`https://testnets.opensea.io/assets/${process.env.REACT_APP_CONTRACT_ADDRESS}/${totalSupply}`);
                    }}
                  >
                    OPENSEA
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintPage;