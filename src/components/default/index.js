import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import api from 'helpers/api'

//Contains the settings for the resource.
import { ResourceContext } from './components/resourceContext'
//Related to search, sort, filter 
import { defaultLoader, checkParams, updatePage, checkLoad } from 'components/shared/search_helpers/search_helpers'
import settingHelper from 'db/settingHelpers'

import { permissionError } from 'helpers/site'

//Related to this component:
//DefaultIndex takes the items & settings and actually lays out the page. Override this file to change search, paginate, etc. 
import DefaultIndex from 'components/default/components/defaultIndex'

//This component is responsible for controlling the state & api for the index route.
class Index extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.settings = this.context
        this.permission = settingHelper.checkResourcePermission('index', this.settings)
        this.state = {
            items: [],
            tags: [],
            loader: defaultLoader(this.settings.loader),
            settings: this.settings
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentDidUpdate = (pProps, pState) => {
        //This make sures there a reason to call the api before doing so.
        if (checkLoad(this, pState, pProps)) { this.loadPage() }
    }

    //Most of the magic happens here. We verify the Loader & params, and do the necessary calls based on the Features for the resource.
    loadPage = async () => {
        //Check permissions before any call.
        if (this.permission) {
            //Makes sure we have the correct params and sets update to false.
            const params = checkParams(this)
            const settings = this.settings
            let updateObj = { settings, items: [] }

            //Make the api call 
            const res = await axios.get(api.apiPath('/' + settings.name.urlPath + '?' + params.toString()))

            //Copy over the settings and store the items in the right place depending on whether or not paginate is active.
            updateObj.items = settings.features.paginate ? res.data.pageOfItems : updateObj.items = res.data

            //Get the tags too, if tags are active.
            if (settings.features.tags) {
                //CURRENTLY COMMENNTED OUT BECAUSE BACKEND TAGS NOT SET YET
                //const resTags = await axios.get(api.apiPath('/' + settings.name.urlPath + `/tag-cloud`))
                //updateObj.tags = resTags.data
            }

            updatePage(this, res, params, updateObj)
        }
    }


    render() {
        const { items } = this.state

        //Very first, check the permissions.
        if (this.permission) {
            //Then, see if we have a custom index display.
            let customDisplay = settingHelper.customResourceDisplay('index', this.settings)
            if (customDisplay) {
                //If so, go ahead and do it.
                return customDisplay(items)
            } else {
                //If not, do the default index.
                return <DefaultIndex settings={this.settings} items={items} mainState={this} />
            }
        } else {
            //Error display
            return permissionError
        }
    }
}

Index.contextType = ResourceContext
export default withRouter(Index)
