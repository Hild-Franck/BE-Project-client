import {Provider} from 'react-redux'
import React , { useEffect } from 'react'
import Toolbar from '@material-ui/core/Toolbar'

import MainLayout from '../components/MainLayout'
import Modal from '../components/Modal'
import { wrapper, makeStore } from '../store'

import "swagger-ui-react/swagger-ui.css"

const myStore = makeStore()

const MyApp = props => {
    //pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
    const {Component, pageProps, store} = props

    useEffect(() => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles) {
          jssStyles.parentElement.removeChild(jssStyles)
      }
    }, [])

    return <Provider store={store || myStore}>
        <Modal />
        <MainLayout {...pageProps}>
            <Toolbar />
            <Component {...pageProps}/>
        </MainLayout>
    </Provider>
}

MyApp.getInitialProps = async ({Component, ctx}) => {
    const pageProps = Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}

    //Anything returned here can be accessed by the client
    return {pageProps}
}

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(MyApp)