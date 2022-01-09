import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import { useEthers, Mainnet, Rinkeby } from '@usedapp/core';
import { useWalletOfOwner } from '../../hooks';
import Spinner from '../../components/spinner/Spinner';
import { ReactComponent as LinkIcon } from '../../assets/icons/icon-link.svg';
import 'react-multi-carousel/lib/styles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';
import './GalleryNFTs.scss';

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

const GalleryNFTs = () => {
  const { account } = useEthers();
  const walletOfOwner = useWalletOfOwner(account);
  const [isReady, setIsReady] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // if (walletOfOwner?.length === count) return;

    setCount(walletOfOwner?.length);

    const fetchImages = async () => {
      for (let i = 0; i < walletOfOwner?.length; i++) {
        if (walletOfOwner?.length <= nfts?.length && nfts?.length !== 0) {
          setIsReady(true);
          return;
        }
        await fetchImageURI(walletOfOwner[i]);
      }
    };

    fetchImages();
  }, [walletOfOwner]);

  const fetchImageURI = async (token) => {
    try {
      const response = await axios.get(
        '' +
          process.env.REACT_APP_ALLOW_CORS_URL +
          '' +
          process.env.REACT_APP_METADATA_URL +
          '' +
          `${parseInt(token, 10)}.json`
      );

      setNfts((nfts) => {
        if (walletOfOwner?.length <= nfts?.length + 1) setIsReady(true);

        return [
          ...nfts,
          {
            dna: response.data.dna,
            imageURI: response.data.image,
          },
        ];
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='gallery-page'>
      <div className='sp-container'>
        <div className='sp-logo'>
          <a href='/'>
            <img src='./assets/images/logo.png' alt='Logo' />
          </a>
        </div>
        <div className='sp-content'>
          <div className='sp-left-content'></div>
          <div className='sp-nft-content'>
            {isReady ? (
              <>
                <img
                  className='absolute left-2/4 -translate-x-[50%]'
                  src='./assets/images/watch-banner.png'
                  alt='Pedestal'
                />
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  draggable={false}
                  autoPlaySpeed={3000}
                  arrows={true}
                >
                  {nfts.length > 0 &&
                    nfts?.map((nft, index) => {
                      return (
                        <div key={index} className='item'>
                          <LazyLoadImage
                            effect='blur'
                            src={nft.imageURI}
                            alt='carousel-item'
                          />
                        </div>
                      );
                    })}
                </Carousel>
              </>
            ) : (
              <Spinner />
            )}
          </div>
          <div className='sp-right-content'>
            {/* <>
                <h3 className='edition-text'>{tokenName}</h3>
                <div className='edition-link'>
                  {`${process.env.REACT_APP_URL}?dna=${dna}`}
                  <span className='flex' onClick={handleCopyClipboard}>
                    <LinkIcon />
                  </span>
                </div>
               
              </> */}
          </div>
        </div>
        <div className='mt-16'>
          <a className='btn btn-primary' href='/'>
            GO BACK HOME
          </a>
        </div>
      </div>
    </div>
  );
};

export default GalleryNFTs;
