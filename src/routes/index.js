import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Mainnet, DAppProvider } from '@usedapp/core';

const MintPage = lazy(() => import('../pages/mint'));
const GalleryNFTs = lazy(() => import('../pages/nfts'));
const ErrorPage = lazy(() => import('../pages/error'));

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
  },
};
const AppRoutes = () => {
  return (
    <DAppProvider config={config}>
      <Routes>
        <Route path='/' element={<MintPage />} />
        <Route path='/nfts' element={<GalleryNFTs />} />
        <Route component={ErrorPage} />
      </Routes>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        autoDismiss={true}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        icon={true}
        theme={'colored'}
        pauseOnHover={false}
        rtl={false}
      />
    </DAppProvider>
  );
};

export default AppRoutes;
