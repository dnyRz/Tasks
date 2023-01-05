import { Text, View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'

export default class Carrousel extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedID: this.props.imageID,
            urls: [
                {id:1, url:require('../../../assets/images/tree.jpg')},
                {id:2, url:require('../../../assets/images/black.jpg')},
                {id:3, url:require('../../../assets/images/cold.jpg')},
                {id:4, url:require('../../../assets/images/forest.jpg')},
                {id:5, url:require('../../../assets/images/ice.jpg')},
                {id:6, url:require('../../../assets/images/river.jpg')}
            ]
        }
    }

    componentDidMount(){
        //console.log(this.props)
    }

    render() {
        const setSelectedIdItem = (id) => {
            this.setState({selectedID:id})
            this.props.setImageID(id)
        }

        const RenderItem = ({item}) => {
            let tam
            if(item.id === this.state.selectedID){
                tam = 1.2
            }
            else{
                tam = 1
            }

            return(
                <Item 
                item={item}
                onPress={() => setSelectedIdItem(item.id)}
                tam={tam}
                />
            )
        }

        const Item = ({item, onPress, tam}) => {
            let image = item.url

            return (
                <TouchableOpacity 
                style={styles.item} 
                onPress={onPress}>
                    <View style={{ overflow:'hidden', borderRadius:20, transform: [{ scale: tam }] }}>
                        <ImageBackground
                            style={styles.image}
                            resizeMode='cover'
                            source={image}
                        />
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.container}>
                <Text>  Image:</Text>
                <FlatList
                    style={{ width: '100%' }} //sin esto da problemas (probar)
                    data={this.state.urls}
                    renderItem={RenderItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    extraData={this.state.selectedID}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        //backgroundColor: 'green',
        minHeight: 150,
    },
    item: {
        margin: 9,
        height: 80,
        width: 80,
        backgroundColor: 'grey',
        alignSelf: 'center',
        borderRadius: 20,
        //overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
    }
})