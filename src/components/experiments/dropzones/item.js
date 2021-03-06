import React from 'react'




class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    displayContents = (contents) => {
        const { masterItemList } = this.props
        let contentCount = {}

        contents.map(c => {
            masterItemList[c.itemType].map(r =>
                (r.substance_id === c.id && c.itemType === 'substances') || (r.object_item_id === c.id && c.itemType === 'objects') ?
                    contentCount = this.countContent(contentCount, (r.object_name || r.substance_name), c.itemType)
                    : null
            )
        })


        return Object.entries(contentCount).map(entry => <div>{entry[0]} {entry[1].itemType === 'objects' ? 'x' + entry[1].count : ""}</div>)
    }

    countContent = (contentCount, display_name, itemType) => {
        if (contentCount[display_name]) { contentCount[display_name].count += 1 }
        else {
            contentCount[display_name] = {
                count: 1,
                itemType,
                display_name
            }
        }
        return contentCount
    }

    render() {
        const { item, masterItemList } = this.props
        let record = {}

        let totalVolume = 0;
        if (item.contents) {
            {
                item.contents.map(c => <div>
                    {masterItemList[c.itemType].map(r =>
                        (r.substance_id === c.id && c.itemType === 'substances') || (r.object_item_id === c.id && c.itemType === 'objects') ?
                            totalVolume += (r.object_volume || r.substance_dispense_volume || 0) : "")}
                </div>)
            }
        }

        let totalMass = 0;
        if (item.usedItem) {
            if (item.usedItem.itemType === 'objects') {
                {
                    masterItemList['objects'].map(r => {
                        return (r.object_item_id === item.usedItem.id) ?
                            totalMass = r.object_weight : null
                    })
                }
            } else if(item.usedItem.itemType === 'containers') {
                
                {
                    masterItemList['containers'].map(r => {
                        return (r.container_id === item.usedItem.id) ?
                            totalMass = r.container_mass : null
                    })
                }

                if(item.usedItem.contents.length > 0) {
                    {
                        item.usedItem.contents.map(c => <div>
                            {masterItemList[c.itemType].map(r =>
                                (r.substance_id === c.id && c.itemType === 'substances') || (r.object_item_id === c.id && c.itemType === 'objects') ?
                                    totalMass += (r.object_weight || (r.substance_dispense_volume * r.substance_density) || 0) : "")}
                        </div>)
                    }
                }

            }
        }



        if (item.name) {
            masterItemList[item.itemType].map(r => (r.tool_id === item.id && item.itemType === 'tools') || (r.container_id === item.id && item.itemType === 'containers') || (r.object_item_id === item.id && item.itemType === 'objects') ? record = r : "")
            console.log(record)
            return <span className='drag-item lab-action' data-itemType={item.itemType} data-instance={item.instance} draggable >
                <span>{item.name}</span>
                <div className="">

                    <div className='item-name'>
                        <img
                            draggable={false}
                            src={`/images/${item.image || record.object_image || record.tool_image || record.container_image}`}
                        />


                        {item.contents ? <span className="content-display">{
                            item.contents.filter(i => i.itemType === 'objects').length
                        }</span>
                            : null}
                        {item.usedItem ? <span className={`content-display ${
                            item.usedItem.name ? "far fa-check-circle" : 'far fa-circle'}`}>
                        </span>
                            : null}

                    </div>
                    <div className='item-volume'>
                        {item.itemType === 'containers' ? <>Total Vol: {record.container_volume}mL</> : ""}
                    </div>
                    <div className='item-description'>
                        <i style={{ fontSize: '14px' }}>{record.object_description || record.container_description}</i>
                    </div>
                    <div className="item-properties">
                        {record.container_properties?.includes('display_volume') ? <div>
                            <hr /> Reading: {totalVolume}mL
                        </div> : ""}
                        {record.tool_properties?.includes('display_mass') ? <div>
                            <hr /> Reading: {totalMass}g
                        </div> : ""}
                        {record.tool_properties?.includes('display_temperature') ? <div>
                            <hr /> Reading: 70 deg F
                        </div> : ""}
                    </div>



                    <div className="item-contents">{
                        item.contents ? <div><hr />
                            <div>Contents:</div>
                            <div style={{ overFlowY: "scroll" }}>
                                {this.displayContents(item.contents)}
                            </div>
                        </div> : ""
                    }</div>


                    <div className="item-used">{
                        item.usedItem ? <div><hr />
                            <div>Item:</div>
                            <div style={{ overFlowY: "scroll" }} className="tool-item">
                                <span className='drag-item'
                                    data-itemType={item.usedItem.itemType}
                                    data-parent-instance={item.instance}
                                    data-instance={item.usedItem.instance} draggable >
                                    {item.usedItem.name}
                                </span>
                            </div>
                        </div> : ""
                    }</div>

                    <div className="item-options">
                        {item.itemType === 'containers' ? <div>
                            <span data-instance={item.instance} className='format-link lab-action fas fa-backspace empty-item'><span>Empty Contents</span></span>
                            <span data-instance={item.instance} className='format-link lab-action fas fa-trash remove-item'><span>Put Away</span></span>
                        </div> : ""}
                        {item.itemType === 'tools' ? <div>
                            <span data-instance={item.instance} className='format-link lab-action fas fa-trash remove-item'><span>Put Away</span></span>
                        </div> : ""}
                        {item.itemType === 'objects' ? <div>
                            <span data-instance={item.instance} className='format-link lab-action fas fa-trash remove-item'><span>Put Away</span></span>
                        </div> : ""}
                    </div>







                </div>
            </span>
        } else {
            return null
        }
    }

}

export default Item