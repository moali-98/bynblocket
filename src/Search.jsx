import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input } from 'semantic-ui-react'
export default function Posts() {
    const [APIData, setAPIData] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3000/api/products`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    return (
        <div style={{ padding: 20 }}>
            <Input icon='search'
                placeholder='Search...'
            />
            <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
                {APIData.map((product) => {
                    return (
                        <Card>
                            <Card.Content>
                                <Card.Header>{product.name}</Card.Header>



                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        </div>
    )
}