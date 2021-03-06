import React from 'react'
import Item from './item'

import { loadingSpinner, permissionError, noResultsError } from 'helpers/site'
class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { items, settings } = this.props

        if (items.length > 0) {
            return items.map(
                (item) => {
                    //Look to see if there is an override for a list-item
                    if (settings.display.listItem) { return settings.display.listItem(item) }
                    //Otherwise do the default Item.
                    else { return <Item item={item} update={this.props.update} settings={settings} /> }
                })
        } else {
            //Display whether its loading or missing results.
            return this.props.loader.loading ? loadingSpinner : noResultsError
        }

    }
}

export default Page
