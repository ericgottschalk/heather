import Header from './Header'
import Footer from './Footer'
import React from 'react'

class Layout extends React.Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

export default Layout;