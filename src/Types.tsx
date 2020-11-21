import React from 'react' 

export interface Product {
    id: string
    attributes: string[]
    created: number
    description: string
    images: string[]
    livemode: boolean 
    metadata: object
    name: string
    statement_descriptor: any
    type: string
    unit_label: any 
    updated: number
}


