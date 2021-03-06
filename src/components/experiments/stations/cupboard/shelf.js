import React from 'react'

import {LabContext} from 'components/experiments/db/labContext'




class ExperimentLab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openShelf: false
        }
    }

    toggleOpen = () => {
        this.setState({openShelf: !this.state.openShelf})
    }

    render() {
        const {list, side, itemType} = this.props

        return <div style={{position:'relative'}} className={`shelf ${side}-shelf ${this.state.openShelf ? 'open' : 'close'}-shelf`}>
                
                <div className='shelf-contents'>
                    {list.map(item => 
                    <div 
                        draggable 
                        className="inventory-item" 
                        data-itemType={itemType} 
                        data-id={item.container_id || item.tool_id || item.object_item_id }  
                        data-name={item.container_name || item.tool_name || item.object_name}>
                            <p style={{cursor:'grab',color:'white'}}>+ {item.container_name || item.tool_name || item.object_name}</p>
                    </div>)}

                    
                    
                    </div>

                <div style={{position:'absolute', bottom: '0', width: '100%'}}>
                {this.state.openShelf ?    
                    <span style={{cursor:'pointer', color: 'grey'}} onClick={this.toggleOpen}>  {side === 'left' ? "> Close" : "Close <" }</span>
                : <span  style={{cursor:'pointer'}} onClick={this.toggleOpen}>  {side === 'left' ? "Open <" : "> Open" }</span> 
                }
                </div>

            </div>
    }

}

ExperimentLab.contextType = LabContext
export default ExperimentLab


// <div className="shelf">
// {masterItemList.objects.map(item => <div draggable className="inventory-item" data-itemType='objects' data-id={item.id}  data-name={item.display_name}>
//     <h5 style={{cursor:'grab'}}>+ {item.display_name}</h5>
// </div>)}
// </div>
// <div className="shelf">
// {masterItemList.containers.map(item => <div draggable className="inventory-item" data-itemType='containers' data-id={item.id}  data-name={item.display_name}>
//     <h5>+ {item.display_name}</h5>
// </div>)}
// </div>