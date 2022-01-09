import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DAppProvider } from '@usedapp/core';
import { ToastContainer } from 'react-toastify';

const MintPage = lazy(() => import('../pages/mint'));
const GalleryNFTs = lazy(() => import('../pages/nfts'));
const ErrorPage = lazy(() => import('../pages/error'));

const AppRoutes = () => {
  return (
    <DAppProvider config={{}}>
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
        limit={1}
      />
    </DAppProvider>
  );
};

export default AppRoutes;
